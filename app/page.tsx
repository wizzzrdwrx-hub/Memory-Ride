"use client";

import React, { useState, useEffect } from "react";
import MemoryRideMap from "./components/MemoryRideMap";
import MemoryDashboard from "./components/MemoryDashboard";
import { memoryPins, MemoryPin } from "./data/mockData";
import { Compass, Disc, RefreshCw } from "lucide-react";

export default function Home() {
  const [pins, setPins] = useState<MemoryPin[]>([]);
  const [activePin, setActivePin] = useState<MemoryPin | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [ambientStatic, setAmbientStatic] = useState<boolean>(true);
  const [mode, setMode] = useState<"view" | "edit">("view");

  // Load pins on mount from localStorage or fallback to mock defaults
  useEffect(() => {
    const saved = localStorage.getItem("memory_ride_pins");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPins(parsed);
          setActivePin(parsed[0]);
        } else {
          loadDefaults();
        }
      } catch (e) {
        loadDefaults();
      }
    } else {
      loadDefaults();
    }
  }, []);

  const loadDefaults = () => {
    setPins(memoryPins);
    setActivePin(memoryPins[0]);
    localStorage.setItem("memory_ride_pins", JSON.stringify(memoryPins));
  };

  // State update wrapper to sync with localStorage
  const savePins = (newPins: MemoryPin[]) => {
    setPins(newPins);
    localStorage.setItem("memory_ride_pins", JSON.stringify(newPins));
  };

  // Playback control handlers
  const handlePlayPauseToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNextPin = () => {
    if (pins.length === 0 || !activePin) return;
    const currentIndex = pins.findIndex((p) => p.id === activePin.id);
    const nextIndex = (currentIndex + 1) % pins.length;
    setActivePin(pins[nextIndex]);
  };

  const handlePrevPin = () => {
    if (pins.length === 0 || !activePin) return;
    const currentIndex = pins.findIndex((p) => p.id === activePin.id);
    const prevIndex = (currentIndex - 1 + pins.length) % pins.length;
    setActivePin(pins[prevIndex]);
  };

  const handlePinSelect = (pin: MemoryPin) => {
    setActivePin(pin);
  };

  // Creator Mode Handlers: Add, Update fields, Update coords, Delete, Reset, Export, Import
  const handleUpdatePinFields = (id: number, fields: Partial<MemoryPin>) => {
    const updatedPins = pins.map((p) => (p.id === id ? { ...p, ...fields } : p));
    savePins(updatedPins);
    // Keep activePin synced
    if (activePin && activePin.id === id) {
      setActivePin({ ...activePin, ...fields });
    }
  };

  const handleUpdatePinCoordinates = (id: number, coordinates: [number, number]) => {
    const updatedPins = pins.map((p) => (p.id === id ? { ...p, coordinates } : p));
    savePins(updatedPins);
    if (activePin && activePin.id === id) {
      setActivePin({ ...activePin, coordinates });
    }
  };

  const handleAddPin = () => {
    const nextId = pins.length > 0 ? Math.max(...pins.map((p) => p.id)) + 1 : 1;
    // Calculate a slight coordinate offset from the current active pin, or default to Charleston
    const baseCoords: [number, number] = activePin
      ? [activePin.coordinates[0] - 0.008, activePin.coordinates[1] - 0.008]
      : [-79.9403, 32.7161];

    const newPin: MemoryPin = {
      id: nextId,
      title: `Memory Stop #${nextId}`,
      coordinates: baseCoords,
      text: "Click here to edit this memory. Drag the pin on the map or click the map surface to change its coordinates.",
      image: "",
      locationName: "New stop along the ride",
      year: "1994",
      audioDuration: "1:00",
    };

    const newPinsList = [...pins, newPin];
    savePins(newPinsList);
    setActivePin(newPin);
  };

  const handleDeletePin = (id: number) => {
    const indexToDelete = pins.findIndex((p) => p.id === id);
    if (indexToDelete === -1) return;

    const newPinsList = pins.filter((p) => p.id !== id);
    savePins(newPinsList);

    if (newPinsList.length === 0) {
      setActivePin(null);
    } else {
      // Select nearest remaining stop
      const nextActiveIndex = Math.min(indexToDelete, newPinsList.length - 1);
      setActivePin(newPinsList[nextActiveIndex]);
    }
  };

  const handleExportRoute = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pins, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "memory_ride_route.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportRoute = (jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Minimal schema verification
        const isValid = parsed.every(
          (p) =>
            typeof p.id === "number" &&
            Array.isArray(p.coordinates) &&
            p.coordinates.length === 2 &&
            typeof p.title === "string"
        );

        if (isValid) {
          savePins(parsed);
          setActivePin(parsed[0]);
          alert("Route imported successfully!");
        } else {
          alert("Invalid route JSON schema structure. Import aborted.");
        }
      } else {
        alert("JSON must contain an array of memory pins.");
      }
    } catch (e) {
      alert("Error parsing JSON file. Make sure it is valid JSON.");
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
          activePin={activePin as MemoryPin}
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
            The Battery to The Beach
          </h1>
          <p className="text-[11px] md:text-xs text-stone-500 font-sans mt-0.5">
            Summer Road Trip • Charleston, SC • June 1994
          </p>

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
          activePin={activePin}
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
