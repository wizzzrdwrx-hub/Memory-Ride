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

## 🚀 Build & Lint Status
- **ESLint**: Completed successfully with 0 errors.
- **Production Build**: Compiled successfully in Turbopack (`next build`) in 7.0s with zero TypeScript compilation warnings or issues.

---

## ✅ Manual Verification Checklist

Use this checklist after pulling the branch or reviewing the PR.

### App Load
- [ ] App loads without crashing.
- [ ] Default Charleston Battery to Folly Beach route appears.
- [ ] Map renders when `NEXT_PUBLIC_MAPBOX_TOKEN` is present.
- [ ] Missing Mapbox token screen appears when token is absent.

### Route Library
- [ ] `memory_ride_library` is created in localStorage.
- [ ] `activeRouteId` points to a valid route.
- [ ] Active route metadata appears in the header.
- [ ] Route selector appears when more than one route exists.
- [ ] Switching routes changes the visible pins and route line.

### Legacy Migration
- [ ] Legacy `memory_ride_pins` data migrates into a RouteLibrary.
- [ ] Legacy `memory_ride_route` data migrates into a RouteLibrary.
- [ ] Legacy keys are removed after successful migration.
- [ ] If legacy data is corrupt, the app falls back to the default route safely.

### Creator Mode
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

Creator Mode v0.2 currently establishes the Route Library foundation only.

The following features are intentionally not implemented yet:

- Full route creation UI
- Full route metadata editor UI
- Route duplication
- Route deletion controls
- Route cover image picker
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

## 🧭 Next Recommended Slice: v0.2 Route Metadata UI

The next development branch should be:

```bash
feat/creator-v0.2-route-metadata-ui
```

### Objective

Expose route-level metadata editing in the UI without changing the storage foundation.

### Planned Features

* Edit active route title
* Edit route description
* Edit route era
* Edit route author
* Edit cover image URL
* Preview route cover image using ImageWithFallback
* Add “Create New Route” control
* Add “Duplicate Route” control
* Add “Delete Route” control with confirmation
* Preserve active pin editing behavior

### Deferred

Do not implement audio recording, backend storage, authentication, hosted media, or public sharing in this slice.

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
