# Memory Ride MVP (Project Opal) 🚗⏱️
> The next evolution of the family photo album

Memory Ride turns meaningful locations, photos, narration, and personal stories into an interactive guided memory route. Relive journeys chronologically and spatially, exploring how places change over time.

---

## 🎯 Purpose & Vision
Memory Ride is a proof-of-concept for converting traditional family photo albums and cassette tape audio memories into a dynamic driving simulator. By anchoring photos and personal memories to coordinates on a Mapbox canvas, we preserve **emotional geography** rather than just media files.

This demo maps a nostalgic family drive from the **Charleston Battery to Folly Beach, SC**, using historical references and time-layered memories.

---

## 📋 Features

* **Route-First Experience**: Memories are anchored directly to coordinates and connected dynamically via a stitched amber route on a Mapbox canvas.
* **Light Over Time (Decade Slider)**: Focuses on a single coordinate stop (e.g. Crosby's Seafood) and navigates between different time-layered perspective nodes (1994, 2016, 2024, and 1970s) to watch the visual details, captions, and references shift.
* **Hx Strength Meter**: An analog-style dashboard tuner dial built entirely in CSS/Tailwind representing historical integrity and confidence metrics.
* **Confidence Haptics**: Subtle, CSS-only atmospheric visuals (soft blurs, warm pulsing glows, CRT scanlines, and paper-noise overrides) that shift to reflect how strongly a layer is supported by evidence.
* **Dual Presentation Layouts**:
  * **Creator Mode**: Drag stops directly on the map surface, customize coordinates, years, and descriptions, and review temporal perspectives in a dedicated locking panel.
  * **Present Mode**: A distraction-free, read-only presentation theater featuring playback advance handles.
* **Route & Library Portability**: Export/import a single route storyboard or compile and backing up your entire multi-route library using JSON files loaded directly from/to `localStorage`.

---

## ⚙️ Local Setup

1. **Prerequisites**: Make sure Node.js (v18+) is installed.
2. **Navigate to Project**:
   ```bash
   cd memory-ride-mvp
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Environment Setup**:
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your Mapbox Public Access Token:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token_here
   ```
5. **Run Development Server**:
   ```bash
   npm run dev
   ```
6. **Open in Browser**: Open [http://localhost:3000](http://localhost:3000) to view the engine.

---

## 🏗️ Production Build
Verify compilation and Turbopack static compilation by running:
```bash
npm run build
```

---

## 🚀 Technical Milestones
* **v0.1**: Creator Profile and basic Proof-of-Route established.
* **v0.1.1**: Added activePin null guards, JSON schema check, and Polaroid fallback icons.
* **v0.2**: Added Route Library storage, Route CRUD, Import/Export, and Present Mode Foundation.
* **v0.3**: Added Media Metadata Prep, Light Over Time layers, Hx Strength Meter, and Confidence Haptics.
