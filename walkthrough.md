# Walkthrough: Memory Ride MVP (Project Opal) - v0.3 Confidence Haptics Foundation

## 🎯 MVP Purpose
Memory Ride is a proof-of-concept for turning family photos, meaningful locations, and personal narration into a shareable guided route experience. 

This slice introduces **v0.3 Confidence Haptics Foundation**, which visually degrades or sharpens Polaroid photos and dashboard review cards depending on the historical integrity and reconstruction confidence (`hxStrength`) of active time-layers.

---

## 🛠️ File Structure
The project is structured inside the `memory-ride-mvp/` folder as follows:

- [package.json](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/package.json) - Contains React 19, Next.js 16, `@types/mapbox-gl`, `react-map-gl`, and `lucide-react`.
- [globals.css](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/globals.css) - [MODIFY] Added visual scanline gradients for Medium and Low Hx, pulse animations for amber and red glow borders, and prefers-reduced-motion media query overrides.
- [HxStrengthMeter.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/HxStrengthMeter.tsx) - [MODIFY] Derived `hapticState` internally, styled the outer chassis borders/inner shadows matching the tier, and added a microcopy disclaimer.
- [MemoryDashboard.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/MemoryDashboard.tsx) - [MODIFY] Computed the haptic state at the top level and dynamically applied CSS classes/filters/overlays to the Polaroid frame wrapper, inner photo container, image elements, and Creator Mode Perspective review card.
- [mockData.ts](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/data/mockData.ts) - [MODIFY] Inserted a fourth Crosby's Seafood temporal perspective (1970s Hearsay) with a low `hxStrength` (0.48) to demonstrate the Low Hx haptic state.

---

## 📋 Current MVP Scope (v0.3 Confidence Haptics Complete)
* **Confidence Haptics Thresholds**:
  * **Neutral** (Base Stop): Clear image, no degradation, instrument shows N/A, tube warmup indicator remains dark.
  * **High Hx** (`hxStrength >= 0.85`, e.g. 2024 at 92%): Emerald highlighted outline wrapper, sharp grayscale-0 image.
  * **Medium Hx** (`0.60 <= hxStrength < 0.85`, e.g. 2016 at 84%, 1994 at 72%): Pulsing amber glow border around the Polaroid, mild image softness (`blur-[0.3px]`, `contrast-[98%]`), and fine-grain amber scanlines.
  * **Low Hx** (`hxStrength < 0.60`, e.g. 1970 at 48%): Faint red pulsing glow border, pronounced image blur (`blur-[0.8px]`), sepia fade mix (`sepia-[15%]`), reduced opacity, and paper-noise scanline overlay representing temporal decay.
* **UI copy**:
  * Added the following warning label to the Hx Strength Meter footer:
    > "✦ Confidence Haptics use subtle visual atmosphere to show how strongly this time-layer is supported."
* **Accessibility & Usability Safeguards**:
  * Visual effects apply strictly to image containers and background frames; no blur or opacity changes affect narrative text blocks.
  * Animation pulses check for user preferences via `@media (prefers-reduced-motion: reduce)` to disable layout transitions if necessary.
  * Avoided any strobe, flicker, or high-frequency animations.

---

## 🚀 Build & Lint Status
- **ESLint**: Completed successfully with 0 errors (standard native image warnings in fallback elements only).
- **Production Build**: Compiled successfully in Turbopack (`next build`) in ~23s with zero TypeScript compilation errors or static generation issues.

---

## ✅ QA Checklist

- [x] Base Stop shows neutral haptic state (sharp image, dark tube light, N/A meter).
- [x] Crosby’s 1994 layer (`hxStrength` = 0.72) displays Medium haptic state (amber pulsing outline, scanlines, blur 0.3px).
- [x] Crosby’s 2016 layer (`hxStrength` = 0.84) displays Medium haptic state.
- [x] Crosby’s 2024 layer (`hxStrength` = 0.92) displays High haptic state (emerald highlighted outline, sharp photo).
- [x] Crosby's 1970 layer (`hxStrength` = 0.48) displays Low haptic state (red outline, blur 0.8px, sepia tone, paper noise overlay).
- [x] Text elements remain sharp and readable across all views.
- [x] Changing perspective tabs updates visual haptic elements instantly.
- [x] Changing active stop resets selected perspective to base memory.
- [x] View, Present, and Creator modes function normally.
- [x] `cmd /c npm run lint` passes.
- [x] `cmd /c npm run build` passes.
