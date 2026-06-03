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

## 📋 Current MVP Scope (Creator Mode v0.2 Complete)
* **Mode Switching**: Dual-state toggle ("View Story" and "Creator Mode") floating inside the title card.
* **Interactive Map Placement**: Active pins are draggable in Creator Mode. Clicking on the map surface repositions coordinates instantly.
* **Dynamic Route Tracing**: The connecting route path automatically recalculates and bends when stops are repositioned, added, or deleted.
* **Custom Stop Management**: Creators can add new pins and delete existing stops.
* **Property Editors**: Form fields edit title, year, location text, narrative details, image URL, and audio duration.
* **Route Metadata Editing**: Dedicated form fields for Route Title, Era / Year, Author, Cover Image URL, and Description positioned above the Stop Editor.
* **Route CRUD Controls**: Full local capabilities to **Create New Route**, **Duplicate Current Route** (which deep-copies coordinates and stop properties to prevent mutation), and **Delete Current Route** with safe native confirmation checks.
* **Real-time Polaroid Preview**: Polaroid card displays image URL previews instantly as they are typed. Automatically alternates the preview source (between route cover image and active stop photo) based on input focus.
* **JSON Portability**: Action buttons to download the current route as `memory_ride_route.json` or upload custom route configurations (accepts both v0.2 MemoryRoute JSON and legacy flat pin arrays).
* **Caching & Caching Recovery**: Auto-syncs all edits to `localStorage` under `memory_ride_library` with a fallback "Reset" button to reload the 1994 demo.
* **Cassette Deck & Visual Aesthetics**: Interactive audio controller with dual rotating cassette reels.

## 🚀 Build & Lint Status
- **ESLint**: Completed successfully with 0 errors (and only minor Image Optimization warnings on standard img tags).
- **Production Build**: Compiled successfully in Turbopack (`next build`) in 7.2s with zero TypeScript compilation errors or static generation issues.

---

## ✅ Manual Verification Checklist

Use this checklist after pulling the branch or reviewing the PR.

### App Load
- [ ] App loads without crashing.
- [ ] Default Charleston Battery to Folly Beach route appears.
- [ ] Map renders when `NEXT_PUBLIC_MAPBOX_TOKEN` is present.
- [ ] Missing Mapbox token screen appears when token is absent.

### Route Library & Selector
- [ ] `memory_ride_library` is created in localStorage.
- [ ] `activeRouteId` points to a valid route.
- [ ] Active route metadata appears in the floating map header.
- [ ] Route selector dropdown appears in the map header when more than one route exists.
- [ ] Switching routes changes the visible pins, map center focus, and route line.

### Route CRUD & Focus Preview
- [ ] Focus-aware Polaroid preview dynamically switches to showing the Route Cover when focusing on Route Settings inputs.
- [ ] Focus-aware Polaroid preview dynamically switches to showing the Stop Image when focusing on Stop Editor inputs.
- [ ] Create Route spawns an empty route layout with zero stops and safely falls back to a prompt to add the first stop.
- [ ] Duplicate Route creates a perfect copy of the active route under a new ID and title copy, maintaining fully independent pins list.
- [ ] Delete Route prompts for confirmation. If deleting the last route, it warns and safely resets back to the default Charleston route.

### Creator Mode Stops
- [ ] Add Stop creates a new pin inside the active route.
- [ ] Delete Stop removes only the active route’s selected pin.
- [ ] Editing title, year, location, image, caption, and tape length persists.
- [ ] Dragging the active pin updates its coordinates.
- [ ] Clicking the map in Creator Mode moves the active pin.
- [ ] Empty route / missing active pin states do not crash the app.

### Import / Export
- [ ] Export produces valid JSON.
- [ ] Import accepts valid route/library JSON.
- [ ] Import rejects malformed JSON.
- [ ] Import rejects invalid coordinates.
- [ ] Imported data does not overwrite unrelated routes unless intended.

### Security
- [ ] No hardcoded Mapbox token exists in source.
- [ ] `.env.local` is ignored.
- [ ] `.env.local.example` contains only a placeholder.
- [ ] Image fallbacks work with empty or broken image URLs.

---

## ⚠️ Known Limitations

The following features are intentionally not implemented yet:

- Read-only Present Mode
- Microphone recording
- Audio file storage
- Backend database
- User authentication
- Hosted media storage
- Public/private share links
- Collaboration permissions

This release keeps the app local-first and frontend-only. The goal is to stabilize the multi-route architecture before adding media capture, sharing, or cloud persistence.

---

## 🧭 Next Recommended Slice: Present Mode / Presenter Overlay
The next development branch can target Present Mode for previewing stories in full screen without the dashboard editor controls.

---

## 💼 Investor Demo Framing
When pitching the MVP prototype to stakeholders, use this narrative outline:
1. **The Vision**: *"Memory Ride is a storytelling engine. We link travel memories with physical route lines, enabling you to play back old road trips as interactive media scrapbooks."*
2. **Showcase View Mode**: Play the cassette recorder, observe the reels spin, and click markers to watch the camera fly down the Charleston expressway.
3. **Showcase Creator Mode**: Toggle into Creator Mode. Drag the active marker over the map or click somewhere new, showing how the route path dynamically shifts to connect the pins.
4. **Demonstrate Route CRUD & Customization**: Create a new route, add stops, or duplicate an existing one to show how easy it is to manage multiple separate storyboards.
5. **Demonstrate Portability**: Edit a title, show the real-time polaroid photo preview, and export the file: *"Every ride is fully portable — download it as a single JSON file and mail it to a friend, who can drop it right in."*

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
