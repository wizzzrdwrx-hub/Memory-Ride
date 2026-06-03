/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import MemoryRideMap from "./components/MemoryRideMap";
import MemoryDashboard from "./components/MemoryDashboard";
import { defaultMemoryRoute } from "./data/mockData";
import { MemoryPin, MemoryRoute, RouteLibrary } from "./types";
import { normalizeImportedRoute, validateRouteLibrary } from "./lib/schemas";
import { loadLibrary, saveLibrary } from "./lib/storage";
import { Compass, Disc } from "lucide-react";

export default function Home() {
  const [library, setLibrary] = useState<RouteLibrary>({
    version: 2,
    activeRouteId: "",
    routes: []
  });
  const [activePin, setActivePin] = useState<MemoryPin | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [ambientStatic, setAmbientStatic] = useState<boolean>(true);
  const [mode, setMode] = useState<"view" | "edit">("view");

  const activeRoute = library.routes.find((r) => r.id === library.activeRouteId) || library.routes[0];
  const pins = activeRoute ? activeRoute.pins : [];

  // Load library state on mount using schema validator and migration helpers
  useEffect(() => {
    const fallbackLibrary: RouteLibrary = {
      version: 2,
      activeRouteId: defaultMemoryRoute.id,
      routes: [defaultMemoryRoute],
    };
    const loaded = loadLibrary(fallbackLibrary);
    setLibrary(loaded);

    const currentActiveRoute = loaded.routes.find((r) => r.id === loaded.activeRouteId) || loaded.routes[0];
    if (currentActiveRoute && currentActiveRoute.pins.length > 0) {
      setActivePin(currentActiveRoute.pins[0]);
    }
  }, []);

  const loadDefaults = () => {
    const fallbackLibrary: RouteLibrary = {
      version: 2,
      activeRouteId: defaultMemoryRoute.id,
      routes: [defaultMemoryRoute],
    };
    setLibrary(fallbackLibrary);
    saveLibrary(fallbackLibrary);
    if (defaultMemoryRoute.pins.length > 0) {
      setActivePin(defaultMemoryRoute.pins[0]);
    } else {
      setActivePin(null);
    }
  };

  // State update wrapper to sync with localStorage via versioned schemas
  const updateActiveRoutePins = (newPins: MemoryPin[]) => {
    if (!activeRoute) return;
    const updatedRoutes = library.routes.map((r) =>
      r.id === activeRoute.id
        ? { ...r, pins: newPins, updatedAt: new Date().toISOString() }
        : r
    );
    const updatedLibrary = {
      ...library,
      routes: updatedRoutes,
    };
    setLibrary(updatedLibrary);
    saveLibrary(updatedLibrary);
  };

  // Safe active pin selection fallback helper
  const safeActivePin = activeRoute
    ? (activeRoute.pins.find((p) => p.id === activePin?.id) || activeRoute.pins[0] || null)
    : null;

  // Playback control handlers
  const handlePlayPauseToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNextPin = () => {
    if (pins.length === 0 || !safeActivePin) return;
    const currentIndex = pins.findIndex((p) => p.id === safeActivePin.id);
    const nextIndex = (currentIndex + 1) % pins.length;
    setActivePin(pins[nextIndex]);
  };

  const handlePrevPin = () => {
    if (pins.length === 0 || !safeActivePin) return;
    const currentIndex = pins.findIndex((p) => p.id === safeActivePin.id);
    const prevIndex = (currentIndex - 1 + pins.length) % pins.length;
    setActivePin(pins[prevIndex]);
  };

  const handlePinSelect = (pin: MemoryPin) => {
    setActivePin(pin);
  };

  // Creator Mode Handlers: Add, Update fields, Update coords, Delete, Reset, Export, Import
  const handleUpdatePinFields = (id: number, fields: Partial<MemoryPin>) => {
    const updatedPins = pins.map((p) => (p.id === id ? { ...p, ...fields } : p));
    updateActiveRoutePins(updatedPins);
    if (activePin && activePin.id === id) {
      setActivePin({ ...activePin, ...fields });
    }
  };

  const handleUpdatePinCoordinates = (id: number, coordinates: [number, number]) => {
    const updatedPins = pins.map((p) => (p.id === id ? { ...p, coordinates } : p));
    updateActiveRoutePins(updatedPins);
    if (activePin && activePin.id === id) {
      setActivePin({ ...activePin, coordinates });
    }
  };

  const handleAddPin = () => {
    const nextId = pins.length > 0 ? Math.max(...pins.map((p) => p.id)) + 1 : 1;
    // Calculate a slight coordinate offset from the current active pin, or default to Charleston
    const baseCoords: [number, number] = safeActivePin
      ? [safeActivePin.coordinates[0] - 0.008, safeActivePin.coordinates[1] - 0.008]
      : [-79.9403, 32.7161];

    const newPin: MemoryPin = {
      id: nextId,
      title: `Memory Stop #${nextId}`,
      coordinates: baseCoords,
      text: "Click here to edit this memory. Drag the pin on the map or click the map surface to change its coordinates.",
      image: "",
      locationName: "New stop along the ride",
      year: activeRoute?.era || "1994",
      audioDuration: "1:00",
    };

    const newPinsList = [...pins, newPin];
    updateActiveRoutePins(newPinsList);
    setActivePin(newPin);
  };

  const handleDeletePin = (id: number) => {
    const indexToDelete = pins.findIndex((p) => p.id === id);
    if (indexToDelete === -1) return;

    const newPinsList = pins.filter((p) => p.id !== id);
    updateActiveRoutePins(newPinsList);

    if (newPinsList.length === 0) {
      setActivePin(null);
    } else {
      // Select nearest remaining stop
      const nextActiveIndex = Math.min(indexToDelete, newPinsList.length - 1);
      setActivePin(newPinsList[nextActiveIndex]);
    }
  };

  const handleExportRoute = () => {
    if (!activeRoute) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeRoute, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeRoute.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}_route.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportRoute = (jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      const normalizedRoute = normalizeImportedRoute(parsed);

      if (normalizedRoute) {
        const updatedRoutes = [
          ...library.routes.filter((r) => r.id !== normalizedRoute.id),
          normalizedRoute,
        ];
        const updatedLibrary: RouteLibrary = {
          version: 2,
          activeRouteId: normalizedRoute.id,
          routes: updatedRoutes,
        };
        setLibrary(updatedLibrary);
        saveLibrary(updatedLibrary);
        if (normalizedRoute.pins.length > 0) {
          setActivePin(normalizedRoute.pins[0]);
        } else {
          setActivePin(null);
        }
        alert("Route imported successfully!");
      } else {
        alert("Invalid route JSON schema structure. Import aborted.");
      }
    } catch {
      alert("Error parsing JSON file. Make sure it is valid JSON.");
    }
  };

  const handleExportLibrary = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(library, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "memory_ride_library.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportLibrary = (jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!validateRouteLibrary(parsed)) {
        alert("Invalid library JSON schema structure. Import aborted.");
        return;
      }

      if (
        confirm(
          "This will replace your entire local route library, including all custom saved routes. This action cannot be undone. Are you sure you want to proceed?"
        )
      ) {
        setLibrary(parsed);
        saveLibrary(parsed);
        const importedActiveRoute = parsed.routes.find((r) => r.id === parsed.activeRouteId) || parsed.routes[0];
        if (importedActiveRoute && importedActiveRoute.pins.length > 0) {
          setActivePin(importedActiveRoute.pins[0]);
        } else {
          setActivePin(null);
        }
        alert("Route library imported successfully!");
      }
    } catch {
      alert("Error parsing JSON file. Make sure it is valid JSON.");
    }
  };

  const handleUpdateRouteMetadata = (fields: Partial<MemoryRoute>) => {
    if (!activeRoute) return;
    const updatedRoutes = library.routes.map((r) =>
      r.id === activeRoute.id
        ? { ...r, ...fields, updatedAt: new Date().toISOString() }
        : r
    );
    const updatedLibrary = {
      ...library,
      routes: updatedRoutes,
    };
    setLibrary(updatedLibrary);
    saveLibrary(updatedLibrary);
  };

  const handleCreateRoute = () => {
    const newId = `route-${Date.now()}`;
    const newRoute: MemoryRoute = {
      id: newId,
      title: "New Memory Ride",
      description: "A brand new nostalgic memory ride storyboard.",
      era: "2026",
      author: "Family Archivist",
      coverImage: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pins: [],
    };
    const updatedLibrary = {
      version: 2,
      activeRouteId: newId,
      routes: [...library.routes, newRoute],
    };
    setLibrary(updatedLibrary);
    saveLibrary(updatedLibrary);
    setActivePin(null);
  };

  const handleDuplicateRoute = () => {
    if (!activeRoute) return;
    const newId = `route-${Date.now()}`;
    const duplicatedRoute: MemoryRoute = {
      ...activeRoute,
      id: newId,
      title: `${activeRoute.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pins: activeRoute.pins.map((p) => ({ ...p })),
    };
    const updatedLibrary = {
      version: 2,
      activeRouteId: newId,
      routes: [...library.routes, duplicatedRoute],
    };
    setLibrary(updatedLibrary);
    saveLibrary(updatedLibrary);
    if (duplicatedRoute.pins.length > 0) {
      setActivePin(duplicatedRoute.pins[0]);
    } else {
      setActivePin(null);
    }
  };

  const handleDeleteRoute = () => {
    if (!activeRoute) return;

    if (library.routes.length <= 1) {
      if (confirm("This is the last route in your library. Deleting it will reset the library to the default Charleston Battery to Folly Beach route. Proceed?")) {
        loadDefaults();
      }
      return;
    }

    if (!confirm(`Are you sure you want to delete the route "${activeRoute.title}"?`)) {
      return;
    }

    const remainingRoutes = library.routes.filter((r) => r.id !== activeRoute.id);
    const deletedIndex = library.routes.findIndex((r) => r.id === activeRoute.id);
    const nextActiveIndex = Math.min(deletedIndex, remainingRoutes.length - 1);
    const nextActiveRoute = remainingRoutes[nextActiveIndex];

    const updatedLibrary = {
      version: 2,
      activeRouteId: nextActiveRoute.id,
      routes: remainingRoutes,
    };

    setLibrary(updatedLibrary);
    saveLibrary(updatedLibrary);

    if (nextActiveRoute.pins.length > 0) {
      setActivePin(nextActiveRoute.pins[0]);
    } else {
      setActivePin(null);
    }
  };

  const handleResetDemo = () => {
    if (confirm("Reset to default 1994 demo route? Any custom edits will be lost.")) {
      loadDefaults();
    }
  };

  return (
    <main className="flex flex-col h-screen w-screen bg-stone-900 overflow-hidden select-none">
      {/* 1. TOP 60%: Interactive Mapbox Map */}
      <div className="h-[60vh] w-full relative">
        <MemoryRideMap
          pins={pins}
          activePin={safeActivePin}
          mode={mode}
          onPinSelect={handlePinSelect}
          onUpdatePinCoordinates={handleUpdatePinCoordinates}
        />

        {/* Floating Glassmorphic Header with Mode Controls */}
        <div className="absolute top-4 left-4 z-10 max-w-[calc(100%-2rem)] md:max-w-md bg-stone-50/80 backdrop-blur-md border border-stone-200/50 p-4 rounded-lg shadow-xl font-serif">
          <div className="flex items-center space-x-2 text-[10px] uppercase font-sans text-amber-800 font-bold tracking-widest mb-1">
            <Compass className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
            <span>Interactive Road-Trip Archive</span>
          </div>
          <h1 className="text-lg md:text-xl font-extrabold text-stone-900 leading-tight">
            {activeRoute?.title || "Untitled Memory Ride"}
          </h1>
          <p className="text-[11px] md:text-xs text-stone-500 font-sans mt-0.5">
            {activeRoute?.description || "A custom nostalgic memory ride."}
            {activeRoute?.era || activeRoute?.author ? " • " : ""}
            {[activeRoute?.era, activeRoute?.author].filter(Boolean).join(" • ")}
          </p>

          {/* Minimal Route Selector UI */}
          {library.routes.length > 1 && (
            <div className="mt-3 pt-2 border-t border-stone-200/50">
              <label className="block text-[9px] uppercase font-sans text-stone-400 font-bold tracking-widest mb-1">
                Select Memory Ride
              </label>
              <select
                value={library.activeRouteId}
                onChange={(e) => {
                  const newActiveId = e.target.value;
                  const newLibrary = { ...library, activeRouteId: newActiveId };
                  setLibrary(newLibrary);
                  saveLibrary(newLibrary);
                  const selectedRoute = library.routes.find((r) => r.id === newActiveId);
                  if (selectedRoute && selectedRoute.pins.length > 0) {
                    setActivePin(selectedRoute.pins[0]);
                  } else {
                    setActivePin(null);
                  }
                }}
                className="w-full text-xs font-sans p-1.5 bg-stone-100/80 border border-stone-300/65 rounded text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-700"
              >
                {library.routes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title} ({r.era})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Mode Toggles */}
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-stone-200/50">
            <button
              onClick={() => setMode("view")}
              className={`flex-1 text-center py-1.5 px-3 rounded text-[10px] uppercase tracking-wider font-sans font-bold transition-all shadow-sm ${
                mode === "view"
                  ? "bg-amber-700 text-stone-50"
                  : "bg-stone-200/60 text-stone-600 hover:text-stone-800 hover:bg-stone-200"
              }`}
            >
              View Story
            </button>
            <button
              onClick={() => setMode("edit")}
              className={`flex-1 text-center py-1.5 px-3 rounded text-[10px] uppercase tracking-wider font-sans font-bold transition-all shadow-sm ${
                mode === "edit"
                  ? "bg-amber-700 text-stone-50"
                  : "bg-stone-200/60 text-stone-600 hover:text-stone-800 hover:bg-stone-200"
              }`}
            >
              Creator Mode
            </button>
          </div>
        </div>

        {/* Floating Ambient Console Button (Top-Right) */}
        <button
          onClick={() => setAmbientStatic((prev) => !prev)}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full border shadow-lg backdrop-blur-md flex items-center justify-center transition-all ${
            ambientStatic
              ? "bg-amber-500/20 border-amber-600/30 text-amber-800"
              : "bg-stone-50/80 border-stone-200/50 text-stone-400"
          }`}
          title={ambientStatic ? "Mute Tape Static Hiss" : "Enable Tape Static Hiss"}
        >
          <Disc className={`w-4 h-4 ${ambientStatic && isPlaying && mode === "view" ? "animate-spin" : ""}`} />
          {ambientStatic && (
            <span className="absolute -bottom-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* 2. BOTTOM 40%: Memory Dashboard Controller */}
      <div className="h-[40vh] w-full">
        <MemoryDashboard
          activePin={safeActivePin}
          activeRoute={activeRoute}
          isPlaying={isPlaying}
          mode={mode}
          onPlayPauseToggle={handlePlayPauseToggle}
          onNextPin={handleNextPin}
          onPrevPin={handlePrevPin}
          onUpdatePinFields={handleUpdatePinFields}
          onAddPin={handleAddPin}
          onDeletePin={handleDeletePin}
          onExportRoute={handleExportRoute}
          onImportRoute={handleImportRoute}
          onResetDemo={handleResetDemo}
          onUpdateRouteMetadata={handleUpdateRouteMetadata}
          onCreateRoute={handleCreateRoute}
          onDuplicateRoute={handleDuplicateRoute}
          onDeleteRoute={handleDeleteRoute}
          onExportLibrary={handleExportLibrary}
          onImportLibrary={handleImportLibrary}
        />
      </div>

      {/* Simulated tape noise node */}
      {ambientStatic && isPlaying && mode === "view" && (
        <audio
          autoPlay
          loop
          className="hidden"
          src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAAA"
        />
      )}
    </main>
  );
}
