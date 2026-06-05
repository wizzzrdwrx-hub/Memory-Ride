/* app/components/StartRideButton.tsx */
"use client";

import React from "react";
import Link from "next/link";
import styles from "./StartRideButton.module.css";

interface StartRideButtonProps {
  href?: string;
  label?: string;
}

export default function StartRideButton({
  href = "/ride",
  label = "Start Ride",
}: StartRideButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <Link
        href={href}
        className={styles.bezel}
        aria-label="Start interactive memory ride"
      >
        <button className={styles.buttonFace} type="button" tabIndex={-1}>
          {/* Backlit LED glow backdrop */}
          <div className={styles.ledGlow} />

          {/* Active status indicator LED bulb */}
          <div className={styles.indicator} />

          {/* Button Text Label */}
          <span>{label}</span>

          {/* Symmetrical indicator bulb on right */}
          <div className={styles.indicator} />
        </button>
      </Link>
    </div>
  );
}
