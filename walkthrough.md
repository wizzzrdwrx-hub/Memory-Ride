# Walkthrough: Memory Ride MVP (Project Opal)

## 🎯 MVP Purpose
Memory Ride is a proof-of-concept for turning family photos, meaningful locations, and personal narration into a shareable guided route experience. 

This demo uses a Charleston-to-Folly route to show how old memories can be organized spatially, presented visually, and replayed like a modern interactive family photo album.

---

## 🛠️ File Structure
The project is structured inside the `memory-ride-mvp/` folder as follows:

- [package.json](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/package.json) - Contains React 19, Next.js 16, `@types/mapbox-gl`, `react-map-gl`, and `lucide-react`.
- [mockData.ts](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/data/mockData.ts) - Stores hardcoded GeoJSON route points and the 4 default Memory Pins.
- [MemoryRideMap.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/MemoryRideMap.tsx) - Manages the Mapbox map container, custom Polaroid markers, dynamic path routing, active pin dragging, and map click repositioning. Includes a UI error guard if `NEXT_PUBLIC_MAPBOX_TOKEN` is missing.
- [MemoryDashboard.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/MemoryDashboard.tsx) - Renders the photo scrapbook card, location meta, tape recorder audio player, rotating cassette reels (View Mode), and form fields for editing pin attributes, adding, deleting, and importing/exporting JSON configurations (Creator Mode).
- [page.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/page.tsx) - App shell coordinating mode switching, localStorage sync, JSON import/export streams, and CRUD handlers.
- [globals.css](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/globals.css) - Tailwind CSS v4 directives plus URL-encoded paper noise styling.
- [layout.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/layout.tsx) - Bootstraps the application and pre-loads Google Fonts (`Inter`, `Playfair Display`, `Lora`).
- [.env.local](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/.env.local) - Private configuration file storing your active Mapbox token.
- [.env.local.example](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/.env.local.example) - Shared configuration template.

---

## 📋 Current MVP Scope (Creator Mode v0.1 Complete)
* **Mode Switching**: Dual-state toggle ("View Story" and "Creator Mode") floating inside the title card.
* **Interactive Map Placement**: Active pins are draggable in Creator Mode. Clicking on the map surface reposition coordinates instantly.
* **Dynamic Route Tracing**: The connecting route path automatically recalculates and bends when stops are repositioned, added, or deleted.
* **Custom Stop Management**: Creators can add new pins and delete existing stops.
* **Property Editors**: Form fields edit title, year, location text, narrative details, image URL, and audio duration.
* **Real-time Polaroid Preview**: Polaroid card displays image URL previews instantly as they are typed.
* **JSON Portability**: Action buttons to download the current route as `memory_ride_route.json` or upload custom route configurations.
* **Caching & Caching Recovery**: Auto-syncs all edits to `localStorage` with a fallback "Reset" button to reload the 1994 demo.
* **Cassette Deck & Visual Aesthetics**: Interactive audio controller with dual rotating cassette reels.

---

## 🛑 Not Yet Included (Out of Scope)
* Multi-route named drawers
* Dynamic image upload and hosting (relics on external links)
* Microphone-based audio voice notes recording
* User login, database storage, and account persistence
* Live public sharing pages

---

## 🚀 Best Next Technical Milestone: Creator Mode v0.2
To extend the creation platform, the next development sprint will focus on:
1. **Multi-Route Named Drawers**: Manage and switch between multiple named rides stored in `localStorage` through a dropdown selector.
2. **Audio Recorder API**: Utilize the device microphone to record narrative voice logs, encoding them as base64 strings directly in the JSON file.
3. **Local Media Base64 Conversion**: Enable selecting local files and converting them to base64 data URIs so that routes remain self-contained.

---

## 💼 Investor Demo Framing
When pitching the MVP prototype to stakeholders, use this narrative outline:
1. **The Vision**: *"Project Opal is a storytelling engine. We link travel memories with physical route lines, enabling you to play back old road trips as interactive media scrapbooks."*
2. **Showcase View Mode**: Play the cassette recorder, observe the reels spin, and click markers to watch the camera fly down the Charleston expressway.
3. **Showcase Creator Mode**: Toggle into Creator Mode. Drag the active marker over the map or click somewhere new, showing how the route path dynamically shifts to connect the pins.
4. **Demonstrate Portability**: Edit a title, show the real-time polaroid photo preview, and export the file: *"Every ride is fully portable — download it as a single JSON file and mail it to a friend, who can drop it right in."*

---

## ⚙️ How to Setup & Run
1. Verify that your root directory has both `.env.local` and `.gitignore` correctly set up to block environmental token leaks.
2. Install npm dependencies (if not already done):
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm run dev
   ```
4. Access the web app at [http://localhost:3000](http://localhost:3000).
