"use client";

import React, { useEffect, useRef } from "react";
import Map, { Source, Layer, Marker, MapRef } from "react-map-gl/mapbox";
import { MemoryPin } from "../types";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface MemoryRideMapProps {
  pins: MemoryPin[];
  activePin: MemoryPin | null;
  mode: "view" | "edit" | "present";
  onPinSelect: (pin: MemoryPin) => void;
  onUpdatePinCoordinates: (id: number, coordinates: [number, number]) => void;
}

export default function MemoryRideMap({
  pins,
  activePin,
  mode,
  onPinSelect,
  onUpdatePinCoordinates,
}: MemoryRideMapProps) {
  const mapRef = useRef<MapRef>(null);

  // Automatically fly to active pin when it changes
  useEffect(() => {
    if (mapRef.current && activePin) {
      mapRef.current.flyTo({
        center: activePin.coordinates,
        zoom: 13.5,
        duration: 2000,
        essential: true,
      });
    }
  }, [activePin]);

  // Dynamically compute the route line based on pin coordinates
  const dynamicRouteGeoJson: GeoJSON.Feature<GeoJSON.LineString> | null =
    pins.length >= 2
      ? {
          type: "Feature",
          properties: { name: "Dynamic Memory Route" },
          geometry: {
            type: "LineString",
            coordinates: pins.map((p) => p.coordinates),
          },
        }
      : null;

  // Handle click on map surface to reposition active pin in edit mode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMapClick = (e: any) => {
    if (mode === "edit" && activePin) {
      const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      onUpdatePinCoordinates(activePin.id, coords);
    }
  };

  if (!mapboxToken) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-stone-900 border border-stone-800 text-stone-100 z-50 font-serif">
        <div className="max-w-md text-center space-y-4 p-8 bg-stone-950 rounded-xl shadow-2xl border border-amber-900/30">
          <h2 className="text-xl font-bold text-amber-500">Missing Mapbox Token</h2>
          <p className="text-sm text-stone-400 leading-relaxed font-sans">
            To run this interactive road-trip archive, create a <code className="text-amber-300 font-mono">.env.local</code> file in the project root and add:
          </p>
          <pre className="text-left bg-stone-900 p-3 rounded font-mono text-xs text-amber-200 border border-stone-800">
            NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here
          </pre>
          <p className="text-xs text-stone-500 font-sans">
            You can copy the template configuration from <code className="text-stone-400 font-mono">.env.local.example</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -79.9403,
          latitude: 32.7161,
          zoom: 11,
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={mapboxToken}
        style={{ width: "100%", height: "100%" }}
        onClick={handleMapClick}
        doubleClickZoom={mode === "view" || mode === "present"} // Disable zoom-on-double-click during editing for easier clicking
      >
        {/* Draw Dynamic Route LineString */}
        {dynamicRouteGeoJson && (
          <Source id="route-path" type="geojson" data={dynamicRouteGeoJson}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#d97706", // amber-600
                "line-width": 4,
                "line-dasharray": [2, 2], // nostalgic stitched path style
              }}
            />
          </Source>
        )}

        {/* Draw Memory Pins */}
        {pins.map((pin) => {
          const isActive = activePin?.id === pin.id;
          return (
            <Marker
              key={pin.id}
              longitude={pin.coordinates[0]}
              latitude={pin.coordinates[1]}
              anchor="bottom"
              draggable={mode === "edit" && isActive}
              onDragEnd={(e) => {
                const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
                onUpdatePinCoordinates(pin.id, coords);
              }}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                onPinSelect(pin);
              }}
            >
              <button
                type="button"
                className={`relative flex flex-col items-center group focus:outline-none transition-all duration-300 ${
                  isActive ? "scale-110 -translate-y-1" : "hover:scale-105"
                }`}
              >
                {/* Custom Polaroid-like Marker */}
                <div
                  className={`bg-white p-1 rounded shadow-md border border-stone-200 transition-all duration-300 ${
                    isActive
                      ? "ring-2 ring-amber-600 ring-offset-2 scale-110 shadow-lg"
                      : "group-hover:border-amber-400"
                  }`}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 relative bg-stone-100 overflow-hidden flex items-center justify-center">
                    {pin.image ? (
                      <img
                        src={pin.image}
                        alt={pin.title}
                        className="w-full h-full object-cover grayscale-[30%] contrast-[110%]"
                        onError={(e) => {
                          // Fallback if image URL is invalid or empty
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-amber-500/10 flex items-center justify-center text-[10px] text-amber-800 font-sans">
                        No Img
                      </div>
                    )}
                    <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay"></div>
                  </div>
                  {/* Pin label inside polaroid base */}
                  <div className="text-[9px] md:text-[10px] font-serif font-semibold text-center text-stone-700 pt-0.5 max-w-[40px] truncate">
                    #{pin.id}
                  </div>
                </div>

                {/* Pin stem/pointer */}
                <div
                  className={`w-0.5 h-3 md:h-4 bg-stone-400 group-hover:bg-amber-500 transition-colors ${
                    isActive ? "bg-amber-600 w-1" : ""
                  }`}
                ></div>
                <div
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-stone-600 group-hover:bg-amber-600 transition-colors ${
                    isActive ? "bg-amber-700 ring-2 ring-amber-200" : ""
                  }`}
                ></div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-50 pointer-events-none">
                  <div className="bg-stone-950/90 backdrop-blur-sm text-stone-100 text-xs py-1 px-2.5 rounded shadow-lg whitespace-nowrap font-serif">
                    {pin.title || "Untitled Stop"}
                  </div>
                  <div className="w-2 h-1 border-x-4 border-x-transparent border-t-4 border-t-stone-950/90"></div>
                </div>
              </button>
            </Marker>
          );
        })}
      </Map>

      {/* Decorative Vintage Map Overlay (Vignette & Grain Effect) */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(139,92,26,0.15)] mix-blend-multiply"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.1))]"></div>
      
      {/* Help label overlay in Edit mode */}
      {mode === "edit" && activePin && (
        <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none z-10">
          <span className="bg-amber-950/95 text-amber-200 text-xs font-sans px-4 py-2 rounded-full shadow-lg border border-amber-800/30 inline-block backdrop-blur-sm animate-pulse">
            📍 Edit Mode: Drag the active pin #{activePin.id} or click on the map to set its position
          </span>
        </div>
      )}
    </div>
  );
}
