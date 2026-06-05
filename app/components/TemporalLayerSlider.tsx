/* app/components/TemporalLayerSlider.tsx */
"use client";

import React, { useState, useRef } from "react";
import styles from "./TemporalLayerSlider.module.css";

export type TemporalLayerSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeYear?: string;
  afterYear?: string;
  title?: string;
  subtitle?: string;
  initialPosition?: number;
  hxStrength?: number;
  confidenceLabel?: "Verified" | "Partially Verified" | "Inferred" | "Low Hx" | "Memory Static";
};

export default function TemporalLayerSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Winter",
  afterLabel = "Autumn",
  beforeYear = "1984",
  afterYear = "2024",
  initialPosition = 50,
  hxStrength = 87,
  confidenceLabel = "Partially Verified",
}: TemporalLayerSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle pointer down to start dragging and capture pointer
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  // Handle pointer move to update position
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  // Release pointer capture
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Calculate position as percentage based on pointer coordinates
  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setPosition((prev) => Math.max(0, prev - 2));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setPosition((prev) => Math.min(100, prev + 2));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  };

  // Map pre-defined decades to slider positions for tuner interactivity
  const tunerPresets = [
    { label: "1970s", pos: 100, description: "Hearsay lore layer (Winter/1984 perspective)" },
    { label: "1994", pos: 75, description: "Nostalgic family road-trip layer" },
    { label: "2016", pos: 35, description: "Modern reference overview" },
    { label: "2024", pos: 0, description: "Current-day absolute reference" },
    { label: "Present", pos: 50, description: "50/50 temporal composite state" },
  ];

  // Find active tuner preset based on current slider position
  const getActivePreset = () => {
    // Return matching preset if position is within close range (tolerance of 5%)
    return tunerPresets.find((preset) => Math.abs(preset.pos - position) < 5.0)?.label || "";
  };

  const activePreset = getActivePreset();

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Interactive Comparison Canvas */}
      <div
        ref={containerRef}
        className={styles.sliderContainer}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Temporal slider. Use left and right arrow keys to shift time perspectives between winter and autumn."
        role="slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Bottom Image (Autumn / 2024) - Revealed on Right */}
        <div className={styles.imageWrapper}>
          <img
            src={afterImage}
            alt={`${afterLabel} perspective of the scene`}
            className={`${styles.image} ${styles.afterImage}`}
            draggable={false}
          />
        </div>

        {/* Top Image (Winter / 1984) - Clipped on Left */}
        <div
          className={styles.imageWrapper}
          style={{
            clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
          }}
        >
          <img
            src={beforeImage}
            alt={`${beforeLabel} perspective of the scene`}
            className={`${styles.image} ${styles.beforeImage}`}
            draggable={false}
          />
        </div>

        {/* Seam Glow Divider */}
        <div className={styles.seam} style={{ left: `${position}%` }} />

        {/* Cinematic Glare & Scanlines */}
        <div className={styles.glassGlance} />
        <div className={styles.scanlines} />

        {/* HUD Time Labels */}
        <div className={`${styles.hudOverlay} ${styles.hudLeft}`}>
          {beforeLabel} • {beforeYear}
        </div>
        <div className={`${styles.hudOverlay} ${styles.hudRight}`}>
          {afterLabel} • {afterYear}
        </div>
      </div>

      {/* 2. Analog Tuner Dashboard Console */}
      <div className={styles.tunerConsole}>
        <div className={styles.tunerHeader}>
          <span>Light Over Time Tuner</span>
          <span>
            DIAL: <span className={styles.tunerHeaderValue}>{Math.round(position)}%</span>
          </span>
        </div>

        {/* Stepped Scale Tracker */}
        <div className={styles.tunerTrack}>
          {/* Scale ticks */}
          <div className={styles.tunerTicks}>
            {Array.from({ length: 21 }).map((_, i) => {
              const isMajor = i % 5 === 0;
              return (
                <div
                  key={i}
                  className={`${styles.tunerTickMark} ${isMajor ? styles.tunerTickMarkMajor : ""}`}
                />
              );
            })}
          </div>

          {/* Glowing Dial Needle */}
          <div className={styles.tunerNeedle} style={{ left: `${position}%` }}>
            <div className={styles.tunerNeedlePivot} />
          </div>
        </div>

        {/* Tuner Preset Buttons */}
        <div className={styles.tunerLabels}>
          {tunerPresets.map((preset) => {
            const isActive = activePreset === preset.label;
            return (
              <button
                key={preset.label}
                onClick={() => setPosition(preset.pos)}
                className={`${styles.tunerLabelBtn} ${isActive ? styles.tunerLabelBtnActive : ""}`}
                type="button"
                title={preset.description}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Instrument Metadata Panel */}
        <div className={styles.metadataPanel}>
          <div className={styles.metadataItem}>
            <span>Hx INTEGRITY:</span>
            <span className={styles.metadataValue}>{hxStrength}%</span>
          </div>
          <div className={styles.metadataItem}>
            <span>CONFIDENCE:</span>
            <span className={styles.metadataValue}>{confidenceLabel.toUpperCase()}</span>
          </div>
          <div className={styles.metadataItem}>
            <span>PERSPECTIVE:</span>
            <span className={styles.metadataValue}>
              {position === 100
                ? "PAST HISTORIC"
                : position === 0
                ? "PRESENT REFERENCE"
                : "TEMPORAL MERGE"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
