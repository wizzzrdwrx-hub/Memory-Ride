/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  MapPin,
  Calendar,
  Plus,
  Trash2,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";
import { MemoryPin, MemoryRoute, ImageSourceType, AudioSourceType } from "../types";
import ImageWithFallback from "./ImageWithFallback";
import HxStrengthMeter from "./HxStrengthMeter";

interface MemoryDashboardProps {
  activePin: MemoryPin | null;
  activeRoute: MemoryRoute | null;
  isPlaying: boolean;
  mode: "view" | "edit" | "present";
  onPlayPauseToggle: () => void;
  onNextPin: () => void;
  onPrevPin: () => void;
  onUpdatePinFields: (id: number, fields: Partial<MemoryPin>) => void;
  onAddPin: () => void;
  onDeletePin: (id: number) => void;
  onExportRoute: () => void;
  onImportRoute: (jsonData: string) => void;
  onResetDemo: () => void;
  onUpdateRouteMetadata: (fields: Partial<MemoryRoute>) => void;
  onCreateRoute: () => void;
  onDuplicateRoute: () => void;
  onDeleteRoute: () => void;
  onExportLibrary: () => void;
  onImportLibrary: (jsonData: string) => void;
  selectedPerspectiveId: string | null;
  onSelectPerspective: (id: string | null) => void;
}

export default function MemoryDashboard({
  activePin,
  activeRoute,
  isPlaying,
  mode,
  onPlayPauseToggle,
  onNextPin,
  onPrevPin,
  onUpdatePinFields,
  onAddPin,
  onDeletePin,
  onExportRoute,
  onImportRoute,
  onResetDemo,
  onUpdateRouteMetadata,
  onCreateRoute,
  onDuplicateRoute,
  onDeleteRoute,
  onExportLibrary,
  onImportLibrary,
  selectedPerspectiveId,
  onSelectPerspective,
}: MemoryDashboardProps) {
  const activePerspective = activePin && selectedPerspectiveId
    ? activePin.temporalPerspectives?.find((p) => p.id === selectedPerspectiveId)
    : null;

  // Simulated playback time tracking
  const [playProgress, setPlayProgress] = useState(0); // 0 to 100
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const libraryInputRef = useRef<HTMLInputElement>(null);
  const [previewSource, setPreviewSource] = useState<"route" | "stop">("stop");

  // Reset progress and set preview source when the pin changes
  useEffect(() => {
    setPlayProgress(0);
    setCurrentTimeSec(0);
    setPreviewSource(activePin ? "stop" : "route");
  }, [activePin]);

  // Parse duration "M:SS" into total seconds
  const parseDuration = (dur: string) => {
    if (!dur) return 60;
    const parts = dur.split(":");
    if (parts.length < 2) return 60;
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const totalDurationSec = activePin ? parseDuration(activePin.audioDuration) : 60;

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && activePin && (mode === "view" || mode === "present")) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) {
            onNextPin(); // Auto-advance to next pin when audio completes
            return 0;
          }
          const nextTime = prev + 1;
          setPlayProgress((nextTime / totalDurationSec) * 100);
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, totalDurationSec, activePin, mode]);

  // Format seconds to M:SS
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPlayProgress(value);
    setCurrentTimeSec(Math.floor((value / 100) * totalDurationSec));
  };

  const handleRouteFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImportRoute(event.target.result as string);
        }
      };
      reader.readAsText(files[0]);
      e.target.value = "";
    }
  };

  const triggerRouteFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleLibraryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImportLibrary(event.target.result as string);
        }
      };
      reader.readAsText(files[0]);
      e.target.value = "";
    }
  };

  const triggerLibraryFileInput = () => {
    libraryInputRef.current?.click();
  };

  return (
    <div className="w-full h-full bg-stone-50 border-t border-stone-200 flex flex-col font-serif md:flex-row relative overflow-hidden">
      {/* Tape Static Overlay/Nostalgic Paper Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5 paper-noise mix-blend-overlay"></div>

      {/* LEFT: Polaroid Photo (Scrapbook Vibe) */}
      <div className="w-full md:w-1/3 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-stone-200 bg-stone-100/50">
        {(() => {
          const showRoutePreview = previewSource === "route" || !activePin;
          const previewImage = showRoutePreview 
            ? (activeRoute?.coverImage || "") 
            : (activePerspective ? activePerspective.image : (activePin?.image || ""));
          const previewTitle = showRoutePreview 
            ? (activeRoute?.title || "Route Cover") 
            : (activePerspective ? activePerspective.title : (activePin?.title || "Stop Image"));
          const previewCaption = showRoutePreview 
            ? "Route Cover"
            : (activePin?.locationName ? activePin.locationName.split(",")[0] : `Stop #${activePin?.id}`);

          return (
            <div className="relative bg-white p-3 pb-8 rounded shadow-xl border border-stone-200/60 max-w-[220px] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Faded Photo Container */}
              <div className="relative aspect-square w-48 bg-stone-200 overflow-hidden shadow-inner border border-stone-100 flex items-center justify-center">
                <ImageWithFallback
                  src={previewImage}
                  alt={previewTitle}
                  className="w-full h-full object-cover transition-opacity duration-500 grayscale-[15%] contrast-[105%]"
                  fallbackClassName="aspect-square"
                />
                {/* Retro Film Light Leak & Tint */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-red-400/5 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,237,213,0.15),transparent)]"></div>
              </div>
              {/* Polaroid Title/Caption */}
              <div className="absolute bottom-2 left-0 right-0 text-center font-sans text-[10px] text-stone-400 tracking-widest uppercase font-bold max-w-[90%] mx-auto truncate">
                {previewCaption}
              </div>
            </div>
          );
        })()}
      </div>

      {/* RIGHT/BOTTOM: Narrative or Creator Edit Fields */}
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between overflow-y-auto">
        {mode === "view" || mode === "present" ? (
          /* ================== READ/VIEW MODE ================== */
          !activePin ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-600 font-serif">
              <p className="text-center italic mb-4">No stops in this memory ride yet.</p>
              <div className="flex space-x-3">
                <button
                  onClick={onAddPin}
                  className="flex items-center px-4 py-2 bg-amber-700 text-stone-50 text-xs font-sans font-bold uppercase tracking-wider rounded hover:bg-amber-800 transition-colors shadow"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add First Stop
                </button>
                <button
                  onClick={onResetDemo}
                  className="flex items-center px-4 py-2 border border-stone-300 text-stone-700 text-xs font-sans font-bold uppercase tracking-wider rounded hover:bg-stone-100 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" />
                  Reset Demo
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                {/* Perspective selector pills row (Only shown if perspectives exist) */}
                {activePin.temporalPerspectives && activePin.temporalPerspectives.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-3 font-sans">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400 mr-1">
                      Time Layer:
                    </span>
                    <button
                      onClick={() => onSelectPerspective(null)}
                      className={`px-2.5 py-0.5 text-[9px] font-sans font-bold uppercase tracking-wider rounded-full border transition-all ${
                        selectedPerspectiveId === null
                          ? "bg-amber-700 border-amber-700 text-stone-50 shadow-sm"
                          : "bg-white border-stone-200 text-stone-600 hover:text-stone-850 hover:bg-stone-100"
                      }`}
                    >
                      🕰️ Base Stop
                    </button>
                    {activePin.temporalPerspectives.map((tp) => (
                      <button
                        key={tp.id}
                        onClick={() => onSelectPerspective(tp.id)}
                        className={`px-2.5 py-0.5 text-[9px] font-sans font-bold uppercase tracking-wider rounded-full border transition-all ${
                          selectedPerspectiveId === tp.id
                            ? "bg-amber-700 border-amber-700 text-stone-50 shadow-sm"
                            : "bg-white border-stone-200 text-stone-600 hover:text-stone-850 hover:bg-stone-100"
                        }`}
                        title={tp.label}
                      >
                        {tp.year} ({tp.label.split(" ")[0]})
                      </button>
                    ))}
                  </div>
                )}

                {/* Metadata Row */}
                <div className="flex items-center space-x-4 text-xs font-sans text-amber-800 font-semibold uppercase tracking-wider mb-2">
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {activePerspective ? activePerspective.year : (activePin.year || "1994")}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-amber-600" />
                    {activePin.locationName || "Somewhere along the ride"}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-stone-900 leading-tight mb-2 tracking-tight">
                  {activePerspective ? activePerspective.title : (activePin.title || "Untitled Stop")}
                </h2>

                <p className="text-stone-700 text-sm md:text-base leading-relaxed font-serif italic text-justify pr-2">
                  {activePerspective ? `"${activePerspective.text}"` : (activePin.text ? `"${activePin.text}"` : "No description written yet.")}
                </p>

                {/* Hx Strength Instrument Panel */}
                <HxStrengthMeter
                  hxStrength={activePerspective?.hxStrength}
                  confidence={activePerspective?.confidence}
                  sourceNote={activePerspective?.sourceNote}
                  isBase={!activePerspective}
                />
              </div>

              {/* Cassette/Audio Controller Player */}
              <div className="mt-4 md:mt-0 pt-4 border-t border-stone-200/80">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Playback Controls & Progress bar */}
                  <div className="flex-1">
                    {/* Progress Slider & Timers */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                      <span>{formatTime(currentTimeSec)}</span>
                      <span>{activePin.audioDuration || "1:00"}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={playProgress}
                      onChange={handleProgressChange}
                      className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-700 hover:accent-amber-800 transition-colors"
                      style={{
                        background: `linear-gradient(to right, #b45309 ${playProgress}%, #e7e5e4 ${playProgress}%)`
                      }}
                    />
                  </div>

                  {/* Simulated Cassette Graphic */}
                  <div className="hidden lg:flex items-center space-x-2 bg-stone-900 text-amber-500 border border-stone-800 rounded p-1.5 px-3 font-mono text-[9px] shadow-md w-40">
                    <div className="flex flex-col items-center">
                      <span className="text-[7px] text-stone-500">TAPE REC</span>
                      <span className="text-stone-300 font-bold">MR-94</span>
                    </div>
                    <div className="flex space-x-2 items-center flex-1 justify-center relative">
                      <div
                        className={`w-4 h-4 rounded-full border-2 border-dashed border-amber-500/80 flex items-center justify-center ${
                          isPlaying ? "animate-spin" : ""
                        }`}
                        style={{ animationDuration: "3s" }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-900"></div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 border-dashed border-amber-500/80 flex items-center justify-center ${
                          isPlaying ? "animate-spin" : ""
                        }`}
                        style={{ animationDuration: "3s" }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-900"></div>
                      </div>
                    </div>
                  </div>

                  {/* Play Button Panel */}
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={onPrevPin}
                      className="p-2 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded transition-all active:scale-95"
                      title="Previous Pin"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={onPlayPauseToggle}
                      className="p-3 bg-amber-700 text-stone-50 rounded-full hover:bg-amber-800 shadow-md transition-all active:scale-95 flex items-center justify-center"
                      title={isPlaying ? "Pause Tape" : "Play Tape"}
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>

                    <button
                      onClick={onNextPin}
                      className="p-2 text-stone-500 hover:text-amber-800 hover:bg-stone-100 rounded transition-all active:scale-95"
                      title="Next Pin"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            </>
          )
        ) : (
          /* ================== CREATOR / EDIT MODE ================== */
          <div className="flex flex-col h-full justify-between gap-4 font-sans text-xs text-stone-700">
            {/* Scrollable Form Fields */}
            <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-1">

              {/* 1. Route Settings */}
              <div className="flex flex-col space-y-3 pb-4 border-b border-stone-200">
                <h3 className="font-sans font-bold uppercase tracking-wider text-[10px] text-amber-800">
                  Route Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex flex-col space-y-1">
                    <label className="font-semibold text-[11px] text-stone-600">Route Title</label>
                    <input
                      type="text"
                      value={activeRoute?.title || ""}
                      onChange={(e) => onUpdateRouteMetadata({ title: e.target.value })}
                      onFocus={() => setPreviewSource("route")}
                      className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                      placeholder="e.g., The Battery to The Beach"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-semibold text-[11px] text-stone-600">Era / Year</label>
                    <input
                      type="text"
                      value={activeRoute?.era || ""}
                      onChange={(e) => onUpdateRouteMetadata({ era: e.target.value })}
                      onFocus={() => setPreviewSource("route")}
                      className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                      placeholder="e.g., Summer 1994"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-semibold text-[11px] text-stone-600">Author</label>
                    <input
                      type="text"
                      value={activeRoute?.author || ""}
                      onChange={(e) => onUpdateRouteMetadata({ author: e.target.value })}
                      onFocus={() => setPreviewSource("route")}
                      className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                      placeholder="e.g., Henry Family"
                    />
                  </div>
                  <div className="flex flex-col space-y-1 md:col-span-2">
                    <label className="font-semibold text-[11px] text-stone-600">Cover Image URL or Path</label>
                    <input
                      type="text"
                      value={activeRoute?.coverImage || ""}
                      onChange={(e) => onUpdateRouteMetadata({ coverImage: e.target.value })}
                      onFocus={() => setPreviewSource("route")}
                      className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                      placeholder="e.g., /images/battery.png or web URL"
                    />
                    <p className="text-[9px] text-stone-500 font-sans mt-0.5 leading-tight">
                      Current MVP supports image URLs and local public paths (e.g., <code>/images/battery.png</code>). Do not paste base64 image strings.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="font-semibold text-[11px] text-stone-600">Cover Image Sourcing</label>
                    <select
                      value={activeRoute?.media?.coverImageSourceType || "url"}
                      onChange={(e) => {
                        const val = e.target.value as ImageSourceType;
                        onUpdateRouteMetadata({
                          media: {
                            ...activeRoute?.media,
                            coverImageSourceType: val,
                          },
                        });
                      }}
                      onFocus={() => setPreviewSource("route")}
                      className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs font-sans"
                    >
                      <option value="url">🔗 External URL / Path</option>
                      <option value="local-preview" disabled>🖥️ Local Preview (Deferred)</option>
                      <option value="future-upload" disabled>☁️ Cloud Vault (Deferred)</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-1 md:col-span-3">
                    <label className="font-semibold text-[11px] text-stone-600">Description</label>
                    <textarea
                      value={activeRoute?.description || ""}
                      onChange={(e) => onUpdateRouteMetadata({ description: e.target.value })}
                      onFocus={() => setPreviewSource("route")}
                      rows={1}
                      className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                      placeholder="Describe this nostalgic memory ride..."
                    />
                  </div>
                </div>
              </div>

              {/* 2. Stop Editor */}
              <div className="flex flex-col space-y-3 pt-1">
                <h3 className="font-sans font-bold uppercase tracking-wider text-[10px] text-amber-800">
                  Memory Stop Editor {activePin && `(Stop #${activePin.id})`}
                </h3>
                {activePin ? (
                  <>
                    {/* Perspective Selector for Creator Mode Preview */}
                    {activePin.temporalPerspectives && activePin.temporalPerspectives.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 mb-2 font-sans">
                        <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400 mr-1">
                          Preview Perspective:
                        </span>
                        <button
                          onClick={() => onSelectPerspective(null)}
                          className={`px-2.5 py-0.5 text-[9px] font-sans font-bold uppercase tracking-wider rounded-full border transition-all ${
                            selectedPerspectiveId === null
                              ? "bg-amber-700 border-amber-700 text-stone-50 shadow-sm"
                              : "bg-white border-stone-200 text-stone-600 hover:text-stone-850 hover:bg-stone-100"
                          }`}
                        >
                          🕰️ Base Stop
                        </button>
                        {activePin.temporalPerspectives.map((tp) => (
                          <button
                            key={tp.id}
                            onClick={() => onSelectPerspective(tp.id)}
                            className={`px-2.5 py-0.5 text-[9px] font-sans font-bold uppercase tracking-wider rounded-full border transition-all ${
                              selectedPerspectiveId === tp.id
                                ? "bg-amber-700 border-amber-700 text-stone-50 shadow-sm"
                                : "bg-white border-stone-200 text-stone-600 hover:text-stone-850 hover:bg-stone-100"
                            }`}
                            title={tp.label}
                          >
                            {tp.year} ({tp.label.split(" ")[0]})
                          </button>
                        ))}
                      </div>
                    )}

                    {activePerspective && (
                      <div className="p-2.5 bg-amber-50/60 border border-amber-200/80 rounded space-y-1.5 text-[10px] font-sans mb-2 shadow-sm">
                        <div className="font-bold text-amber-900 flex items-center">
                          <span className="mr-1">👁️</span> Perspective Review Card: {activePerspective.title} ({activePerspective.year})
                        </div>
                        <p className="italic text-stone-700 font-serif leading-relaxed">
                          &ldquo;{activePerspective.text}&rdquo;
                        </p>
                        <HxStrengthMeter
                          hxStrength={activePerspective.hxStrength}
                          confidence={activePerspective.confidence}
                          sourceNote={activePerspective.sourceNote}
                          isBase={false}
                        />
                        <p className="text-[8px] text-stone-400 leading-tight">
                          *Editing is locked on this perspective preview. Modifications to coordinates or properties below will write directly to the base stop anchor.
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col space-y-1">
                      <label className="font-semibold text-[11px] text-stone-600">Stop Title</label>
                      <input
                        type="text"
                        value={activePin.title}
                        onChange={(e) => onUpdatePinFields(activePin.id, { title: e.target.value })}
                        onFocus={() => setPreviewSource("stop")}
                        className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                        placeholder="e.g., Crosby's Seafood"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="font-semibold text-[11px] text-stone-600">Year / Era</label>
                      <input
                        type="text"
                        value={activePin.year}
                        onChange={(e) => onUpdatePinFields(activePin.id, { year: e.target.value })}
                        onFocus={() => setPreviewSource("stop")}
                        className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                        placeholder="e.g., 1994"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="font-semibold text-[11px] text-stone-600">Location Name</label>
                      <input
                        type="text"
                        value={activePin.locationName}
                        onChange={(e) => onUpdatePinFields(activePin.id, { locationName: e.target.value })}
                        onFocus={() => setPreviewSource("stop")}
                        className="p-2 border border-stone-300 bg-white text-stone-950 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                        placeholder="e.g., Folly Road, Crosby's Seafood"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="font-semibold text-[11px] text-stone-600">Image Sourcing</label>
                      <select
                        value={activePin.media?.imageSourceType || "url"}
                        onChange={(e) => {
                          const val = e.target.value as ImageSourceType;
                          onUpdatePinFields(activePin.id, {
                            media: {
                              ...activePin.media,
                              imageSourceType: val,
                            },
                          });
                        }}
                        onFocus={() => setPreviewSource("stop")}
                        className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs font-sans"
                      >
                        <option value="url">🔗 External URL / Path</option>
                        <option value="local-preview" disabled>🖥️ Local Preview (Deferred)</option>
                        <option value="future-upload" disabled>☁️ Cloud Vault (Deferred)</option>
                      </select>
                    </div>
                    <div className="flex flex-col space-y-1 md:col-span-2">
                      <label className="font-semibold text-[11px] text-stone-600">Image URL or Path</label>
                      <input
                        type="text"
                        value={activePin.image}
                        onChange={(e) => onUpdatePinFields(activePin.id, { image: e.target.value })}
                        onFocus={() => setPreviewSource("stop")}
                        className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                        placeholder="e.g., /images/crosbys.png or web URL"
                      />
                      <p className="text-[9px] text-stone-500 font-sans mt-0.5 leading-tight">
                        Current MVP supports image URLs and local /public image paths (e.g., <code>/images/crosbys.png</code>). Do not paste base64 images. Local file preview, cloud upload, and audio recording are planned future features.
                      </p>
                    </div>
                    <div className="flex flex-col space-y-1 md:col-span-2">
                      <label className="font-semibold text-[11px] text-stone-600">Memory Narrative</label>
                      <textarea
                        value={activePin.text}
                        onChange={(e) => onUpdatePinFields(activePin.id, { text: e.target.value })}
                        onFocus={() => setPreviewSource("stop")}
                        rows={2}
                        className="p-2 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 font-serif italic text-xs"
                        placeholder="Write the narrative memory..."
                      />
                    </div>
                    <div className="md:col-span-2 border border-stone-200 rounded p-2.5 bg-stone-100/50 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-stone-500 font-sans">
                        <div>
                          <span className="font-semibold">Coordinates:</span> [
                          {activePin.coordinates[0].toFixed(5)}, {activePin.coordinates[1].toFixed(5)}]
                        </div>
                        <div className="flex items-center space-x-1">
                          <label className="font-semibold text-stone-600">Tape Length:</label>
                          <input
                            type="text"
                            value={activePin.audioDuration}
                            onChange={(e) => onUpdatePinFields(activePin.id, { audioDuration: e.target.value })}
                            onFocus={() => setPreviewSource("stop")}
                            className="w-12 p-0.5 border border-stone-300 bg-white text-stone-900 rounded text-center text-xs"
                            placeholder="1:30"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-stone-200/60 text-[10px]">
                        <div className="flex flex-col space-y-1">
                          <label className="font-semibold text-stone-600">Audio Source Type</label>
                          <select
                            value={activePin.media?.audioSourceType || "none"}
                            onChange={(e) => {
                              const val = e.target.value as AudioSourceType;
                              onUpdatePinFields(activePin.id, {
                                media: {
                                  ...activePin.media,
                                  audioSourceType: val,
                                },
                              });
                            }}
                            onFocus={() => setPreviewSource("stop")}
                            className="p-1 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs font-sans"
                          >
                            <option value="none">🔇 None / Silent</option>
                            <option value="future-recording" disabled>🎙️ Voice Recorder (Deferred)</option>
                            <option value="future-upload" disabled>📤 Audio Upload (Deferred)</option>
                          </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="font-semibold text-stone-600">Audio Label / Title</label>
                          <input
                            type="text"
                            value={activePin.media?.audioLabel || ""}
                            onChange={(e) => {
                              onUpdatePinFields(activePin.id, {
                                media: {
                                  ...activePin.media,
                                  audioLabel: e.target.value,
                                },
                              });
                            }}
                            onFocus={() => setPreviewSource("stop")}
                            className="p-1 border border-stone-300 bg-white text-stone-900 rounded focus:outline-none focus:ring-1 focus:ring-amber-700 text-xs"
                            placeholder="e.g., Shoreline Waves (Planning)"
                          />
                        </div>
                      </div>

                      <p className="text-[9px] text-stone-500 font-sans leading-tight mt-1">
                        Microphone voice recording and audio uploads are deferred future features. Do not paste base64 audio strings into this field.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                  <div className="p-4 bg-stone-100/50 border border-stone-300/40 rounded flex flex-col items-center justify-center text-stone-500">
                    <p className="italic text-xs mb-2">No stop selected. Add your first memory stop to begin plotting.</p>
                    <button
                      onClick={onAddPin}
                      className="flex items-center px-3 py-1.5 bg-amber-700 text-stone-50 text-[10px] font-bold uppercase tracking-wider rounded hover:bg-amber-800 transition-colors shadow"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add First Stop
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Actions Panel */}
            <div className="pt-3 border-t border-stone-200 flex flex-wrap gap-3 items-center justify-between">

              {/* Stop CRUD */}
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400 mr-1">Stops:</span>
                <button
                  onClick={onAddPin}
                  className="flex items-center px-2.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-stone-50 font-bold uppercase tracking-wider rounded transition-colors shadow text-[10px]"
                  title="Add new stop"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Stop
                </button>
                {activePin && (
                  <button
                    onClick={() => onDeletePin(activePin.id)}
                    className="flex items-center px-2.5 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold uppercase tracking-wider rounded transition-colors shadow text-[10px]"
                    title="Delete current stop"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete Stop
                  </button>
                )}
              </div>

              {/* Route CRUD */}
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400 mr-1">Rides:</span>
                <button
                  onClick={onCreateRoute}
                  className="flex items-center px-2.5 py-1.5 bg-stone-700 hover:bg-stone-800 text-stone-50 font-bold uppercase tracking-wider rounded transition-colors shadow text-[10px]"
                  title="Create new empty memory ride"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Create Route
                </button>
                <button
                  onClick={onDuplicateRoute}
                  className="flex items-center px-2.5 py-1.5 bg-stone-700 hover:bg-stone-800 text-stone-50 font-bold uppercase tracking-wider rounded transition-colors shadow text-[10px]"
                  title="Duplicate current memory ride"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Duplicate Route
                </button>
                <button
                  onClick={onDeleteRoute}
                  className="flex items-center px-2.5 py-1.5 bg-red-900 hover:bg-red-955 text-white font-bold uppercase tracking-wider rounded transition-colors shadow text-[10px]"
                  title="Delete current memory ride storyboard"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete Route
                </button>
              </div>

              {/* Hidden File Inputs */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleRouteFileChange}
                accept=".json"
                className="hidden"
              />
              <input
                type="file"
                ref={libraryInputRef}
                onChange={handleLibraryFileChange}
                accept=".json"
                className="hidden"
              />

              {/* Route Portability */}
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400 mr-1">Route Portability:</span>
                <button
                  onClick={triggerRouteFileInput}
                  className="flex items-center px-2 py-1.2 border border-stone-300 text-stone-600 rounded hover:bg-stone-100 hover:text-stone-850 transition-colors text-[10px]"
                  title="Import Route JSON"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Import Route
                </button>
                <button
                  onClick={onExportRoute}
                  className="flex items-center px-2 py-1.2 border border-stone-300 text-stone-600 rounded hover:bg-stone-100 hover:text-stone-850 transition-colors text-[10px]"
                  title="Export Current Route as JSON"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export Current Route
                </button>
              </div>

              {/* Library Portability */}
              <div className="flex items-center space-x-2">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-stone-400 mr-1">Library Portability:</span>
                <button
                  onClick={triggerLibraryFileInput}
                  className="flex items-center px-2 py-1.2 border border-stone-300 text-stone-600 rounded hover:bg-stone-100 hover:text-stone-850 transition-colors text-[10px]"
                  title="Import Full Library JSON"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  Import Full Library
                </button>
                <button
                  onClick={onExportLibrary}
                  className="flex items-center px-2 py-1.2 border border-stone-300 text-stone-600 rounded hover:bg-stone-100 hover:text-stone-850 transition-colors text-[10px]"
                  title="Export Full Library as JSON"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export Full Library
                </button>
                <button
                  onClick={onResetDemo}
                  className="flex items-center px-2 py-1.2 border border-stone-300 text-stone-600 rounded hover:bg-stone-100 hover:text-stone-850 transition-colors text-[10px]"
                  title="Reset Route to Default Demo"
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset Demo
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
