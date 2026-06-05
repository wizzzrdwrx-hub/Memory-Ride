/* app/page.tsx */
"use client";

import React from "react";
import TemporalLayerSlider from "./components/TemporalLayerSlider";
import StartRideButton from "./components/StartRideButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-screen bg-[#070606] text-stone-100 flex flex-col items-center justify-between p-6 md:p-12 relative overflow-x-hidden font-sans selection:bg-amber-900/30">
      
      {/* Background Vintage Grid & Lens Flares */}
      <div className="absolute inset-0 pointer-events-none opacity-5 paper-noise mix-blend-overlay"></div>
      <div className="absolute top-0 inset-x-0 h-[400px] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.06),transparent_60%)] pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-[400px] bg-[radial-gradient(circle_at_bottom,rgba(245,158,11,0.04),transparent_60%)] pointer-events-none"></div>

      {/* 1. HEADER BRANDING */}
      <header className="flex flex-col items-center text-center mt-4 mb-8 z-10">
        {/* Custom Hexagonal Logo */}
        <div className="mb-4 relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-amber-500 opacity-20 blur-sm group-hover:opacity-45 transition-all"></div>
          <svg className="w-14 h-14 text-stone-300 relative" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M30 35 L50 50 L70 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30 65 L50 50 L70 65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="3" fill="#ef4444" className="animate-pulse" />
          </svg>
        </div>

        {/* Branded Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-stone-100 via-stone-300 to-stone-100 uppercase select-none">
          Memory Engine
        </h1>
        <span className="text-[10px] tracking-[0.4em] text-amber-500 font-bold uppercase mt-1">
          Light Over Time
        </span>
      </header>

      {/* 2. HERO SLIDER */}
      <section className="w-full max-w-4xl flex flex-col items-center justify-center my-6 z-10">
        <TemporalLayerSlider
          beforeImage="/images/fall-creek-winter-layer.jpg"
          afterImage="/images/fall-creek-autumn-layer.jpg"
          beforeLabel="Winter"
          afterLabel="Autumn"
          beforeYear="1984"
          afterYear="2024"
        />

        {/* Tactical Start Ride Control Switch */}
        <div className="mt-8 flex flex-col items-center">
          <StartRideButton href="/ride" label="Start Ride" />
          <span className="text-[9px] text-stone-500 font-mono tracking-widest mt-3.5 uppercase">
            ✦ Depress switch to engage road-trip dashboard
          </span>
        </div>
      </section>

      {/* 3. PROOF-OF-CONCEPT DESCRIPTION */}
      <section className="max-w-2xl text-center flex flex-col items-center my-8 z-10 px-4">
        {/* Cinematic Tagline */}
        <h2 className="text-lg md:text-xl font-bold tracking-[0.12em] uppercase mb-4 leading-normal select-none">
          <span className="text-cyan-400">Ride Anywhere.</span>{" "}
          <span className="text-amber-500">Slide AnyWhen.</span>
        </h2>

        {/* Narrative Copy */}
        <p className="text-stone-400 text-xs md:text-sm leading-relaxed font-mono max-w-lg mb-6">
          Explore roads, places, and moments across layered time.
          A living memory map where the world shifts between eras as you move through it.
        </p>

        {/* Conceptual Focus Quote */}
        <div className="border-y border-stone-850 py-3.5 px-6 my-2 text-center select-none">
          <span className="text-stone-500 text-[10px] font-mono tracking-widest uppercase block mb-1">
            NOT JUST WHERE YOU WERE.
          </span>
          <span className="text-stone-200 text-sm md:text-base font-serif italic tracking-wider font-bold">
            WHEN.
          </span>
        </div>
      </section>

      {/* 4. FOOTER TELEMETRY HUD */}
      <footer className="w-full border-t border-stone-900/60 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center text-[8px] font-mono text-stone-600 tracking-widest uppercase z-10">
        
        {/* HUD Indicator: Left */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500/80 animate-ping"></span>
          <span>PHOTON FORCER CORE v0.4</span>
        </div>

        {/* HUD Indicator: Center (Radar Pulse graphic) */}
        <div className="hidden md:flex flex-col items-center relative h-10 w-24">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Concentric rings representing map sonar */}
            <div className="w-8 h-8 rounded-full border border-stone-800/40 animate-ping absolute" style={{ animationDuration: "3s" }}></div>
            <div className="w-5 h-5 rounded-full border border-stone-800/60 absolute"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500/80 absolute"></div>
          </div>
        </div>

        {/* HUD Indicator: Right */}
        <div className="flex items-center gap-6">
          <div>
            <span>HX SIGNAL:</span>{" "}
            <span className="text-cyan-400 font-bold">98%</span>
          </div>
          <div>
            <span>MEMORY CLARITY:</span>{" "}
            <span className="text-amber-500 font-bold">87%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
