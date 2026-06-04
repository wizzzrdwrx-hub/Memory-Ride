"use client";

import React from "react";

interface HxStrengthMeterProps {
  hxStrength?: number;
  confidence?: string;
  sourceNote?: string;
  isBase?: boolean;
}

export default function HxStrengthMeter({
  hxStrength,
  confidence,
  sourceNote,
  isBase = false,
}: HxStrengthMeterProps) {
  // Determine if we have a valid strength to render
  const hasStrength = !isBase && hxStrength !== undefined;
  const displayStrength = hasStrength ? hxStrength! : 0;
  const percentage = Math.round(displayStrength * 100);

  // Derive confidence haptic state internally
  const getConfidenceHapticState = (val?: number): "neutral" | "low" | "medium" | "high" => {
    if (isBase || val === undefined) return "neutral";
    if (val >= 0.85) return "high";
    if (val >= 0.60) return "medium";
    return "low";
  };

  const hapticState = getConfidenceHapticState(hxStrength);

  // Confidence label resolver
  const displayConfidence = isBase 
    ? "Base Memory" 
    : (confidence || "Unrated Layer");

  // Source note resolver
  const displaySource = isBase 
    ? "Primary spatial stop anchor."
    : (sourceNote || "No reference note recorded.");

  // Styling based on haptic state
  let borderClass = "border-stone-950";
  let glowClass = "shadow-inner shadow-black/80";

  if (hapticState === "high") {
    borderClass = "border-emerald-950/60";
    glowClass = "shadow-[inset_0_0_12px_rgba(16,185,129,0.05)]";
  } else if (hapticState === "medium") {
    borderClass = "border-amber-950/80";
    glowClass = "shadow-[inset_0_0_12px_rgba(245,158,11,0.07)]";
  } else if (hapticState === "low") {
    borderClass = "border-red-950/80";
    glowClass = "shadow-[inset_0_0_12px_rgba(239,68,68,0.05)]";
  }

  return (
    <div className={`mt-4 p-3.5 bg-stone-900 border ${borderClass} rounded-lg text-stone-300 font-mono ${glowClass} relative overflow-hidden select-none max-w-xl transition-all duration-500`}>
      {/* Tape Static / Scratch Aesthetic Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]"></div>

      {/* Header Tuning Banner */}
      <div className="flex items-center justify-between text-[8px] uppercase tracking-widest text-stone-500 font-bold mb-2.5">
        <span>Hx Integrity Tuning Meter</span>
        <div className="flex items-center space-x-1">
          <span>TUBE WARMUP</span>
          <span className={`h-1.5 w-1.5 rounded-full border border-amber-600/40 shadow-[0_0_6px_#f59e0b] ${
            !isBase ? "bg-amber-500 animate-pulse" : "bg-amber-950"
          }`}></span>
        </div>
      </div>

      {/* Main Meter Grid */}
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Analog Linear Bar & Needle */}
        <div className="flex-1 space-y-1">
          {/* Dial scale markings */}
          <div className="flex justify-between text-[7px] text-stone-500 px-1 font-mono tracking-widest leading-none">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>

          {/* CSS-based needle dial */}
          <div className="relative w-full h-3 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 rounded border border-stone-950 shadow-inner overflow-hidden">
            {/* Glass shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20"></div>
            
            {/* Horizontal reference tick marks */}
            <div className="absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.15)_1px,transparent_1px)] bg-[size:10%_100%] pointer-events-none"></div>

            {/* Pointer Needle */}
            {hasStrength && (
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_5px_#ffffff] transition-all duration-700 ease-out" 
                style={{ left: `${displayStrength * 100}%` }}
              >
                {/* Needle cap/pivot glow */}
                <div className="absolute -top-0.5 -left-1 w-2.5 h-1 bg-amber-400 rounded-full border border-stone-950 shadow"></div>
              </div>
            )}
          </div>
        </div>

        {/* Numeric / Monospace Stats Readout */}
        <div className="w-full md:w-44 text-[10px] bg-stone-950 border border-stone-850 p-2 rounded flex flex-col justify-center space-y-1.5 text-stone-400 leading-none">
          <div className="flex justify-between">
            <span className="text-stone-500">INTEGRITY:</span>{" "}
            <span className={hasStrength ? "text-amber-400 font-bold" : "text-stone-500 font-bold"}>
              {hasStrength ? `${percentage}%` : "N/A"}
            </span>
          </div>
          <div className="flex justify-between truncate">
            <span className="text-stone-500">CONFIDENCE:</span>{" "}
            <span className={!isBase ? "text-amber-400 uppercase font-semibold text-[8px] tracking-wide" : "text-stone-500 uppercase font-semibold text-[8px] tracking-wide"}>
              {displayConfidence}
            </span>
          </div>
        </div>
      </div>

      {/* Info/Source Footer */}
      <div className="mt-3 pt-2 border-t border-stone-850 text-[9px] text-stone-500 flex flex-col space-y-1">
        <div className="truncate text-stone-400">
          <span className="text-stone-500">📷 Source:</span> {displaySource}
        </div>
        <div>
          <span className="text-stone-600 font-sans italic leading-tight block">
            “Hx Strength reflects how strongly this time-layer is supported by memory, source images, or reference material.”
          </span>
        </div>
        <div className="mt-1 border-t border-stone-850/50 pt-1">
          <span className="text-amber-500/80 font-sans leading-tight block text-[8px] uppercase tracking-wider">
            ✦ Confidence Haptics use subtle visual atmosphere to show how strongly this time-layer is supported.
          </span>
        </div>
      </div>
    </div>
  );
}
