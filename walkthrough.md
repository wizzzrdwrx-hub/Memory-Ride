# Walkthrough: Memory Ride MVP (Project Opal) - v0.3 Hx Strength UI

## 🎯 MVP Purpose
Memory Ride is a proof-of-concept for turning family photos, meaningful locations, and personal narration into a shareable guided route experience. 

This slice introduces the **v0.3 Hx Strength UI** which provides a visual, analog-style indicator (gauge/meter) communicating the historical integrity and reconstruction confidence of stops and temporal layers.

---

## 🛠️ File Structure
The project is structured inside the `memory-ride-mvp/` folder as follows:

- [package.json](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/package.json) - Contains React 19, Next.js 16, `@types/mapbox-gl`, `react-map-gl`, and `lucide-react`.
- [HxStrengthMeter.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/HxStrengthMeter.tsx) - [NEW] Contains the dial gauge layout, CSS transition-based white needle, linear gradient confidence scale, warm glowing tube bulb (active for temporal layers, dark for base memories), and monospace stats dashboard.
- [MemoryDashboard.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/MemoryDashboard.tsx) - [MODIFY] Integrates the `HxStrengthMeter` component across View, Present, and Creator modes (replacing raw metadata boxes with a cohesive instrument UI).
- [mockData.ts](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/data/mockData.ts) - Pre-populated with Crosby's Seafood temporal perspective layers (1994, 2016, and 2024), containing valid `hxStrength`, `confidence` labels, and `sourceNote` records.
- [MemoryRideMap.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/MemoryRideMap.tsx) - Visual map representation displaying stop pins.
- [page.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/page.tsx) - App shell coordinating state hooks and active route switches.

---

## 📋 Current MVP Scope (v0.3 Hx Strength UI Complete)
* **Analog Dashboard / Tuner Meter**:
  * Designed using pure CSS/HTML/Tailwind (no external charting dependencies).
  * Styled with a dark scratched-metal/tape-scanline background, linear color scale (red $\rightarrow$ amber $\rightarrow$ green), and subtle layout marking ticks.
  * Incorporates a white indicator needle with dynamic `style={{ left: ... }}` offset transitions for smooth shifting motion.
  * Warm orange status bulb representing tube warmup (active and pulsating for temporal layers; dark for base memories).
* **View & Present Modes**:
  * Renders the `HxStrengthMeter` component at the base of the active stop narrative cards.
  * Transitioning between temporal years slides the dial pointer needle to the target strength (e.g. 72%, 84%, 92%) and swaps the info panel readouts.
  * In base stop view, renders a neutral/inactive state with the pointer hidden, reading "Base Memory" and showing default reference sourcing.
* **Creator Mode Preview**:
  * Integrates the read-only `HxStrengthMeter` component within the temporal perspective review panel.
  * Safely displays perspective integrity details without providing editing controls for `hxStrength` yet (read-only alignment).

---

## 🚀 Build & Lint Status
- **ESLint**: Completed successfully with 0 errors (with minor Next.js image optimization warnings on standard img tags in map elements).
- **Production Build**: Compiled successfully in Next.js Turbopack (`next build`) in ~50s with zero TypeScript compilation errors or static generation issues.

---

## ✅ QA Checklist

- [x] Selecting a stop with temporal perspectives (Crosby's Seafood) displays the new analog dial meter.
- [x] Switching between perspective pills (1994, 2016, 2024) triggers:
  - [x] Smooth slider needle transition to the respective percent value.
  - [x] Tube warmup bulb pulses with amber neon glow.
  - [x] Readout panels show the correct percentage (e.g. 1994 = 72%, 2016 = 84%, 2024 = 92%).
  - [x] Sourcing note updates dynamically to display the image origin info.
- [x] Selecting "Base Memory" or switching to a stop without temporal perspectives triggers:
  - [x] Inactive state where the pointer needle is completely hidden/rested.
  - [x] Tube warmup indicator goes dark.
  - [x] Stats panel reads "Base Memory" and "N/A" for integrity.
- [x] Present Mode displays the gauge exactly as intended (read-only, responsive layout).
- [x] Creator Mode renders the exact same gauge layout within the read-only perspective review card.
- [x] `cmd /c npm run lint` completes with 0 errors.
- [x] `cmd /c npm run build` succeeds cleanly.
