# Walkthrough: Memory Ride MVP (Project Opal) - v0.3 Media Prep

## 🎯 MVP Purpose
Memory Ride is a proof-of-concept for turning family photos, meaningful locations, and personal narration into a shareable guided route experience. 

This demo uses a Charleston-to-Folly route to show how old memories can be organized spatially, presented visually, and replayed like a modern interactive family photo album.

---

## 🛠️ File Structure
The project is structured inside the `memory-ride-mvp/` folder as follows:

- [package.json](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/package.json) - Contains React 19, Next.js 16, `@types/mapbox-gl`, `react-map-gl`, and `lucide-react`.
- [mockData.ts](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/data/mockData.ts) - Stores hardcoded GeoJSON route points and the 4 default Memory Pins, now pre-populated with safe media metadata.
- [MemoryRideMap.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/MemoryRideMap.tsx) - Manages the Mapbox map container, custom Polaroid markers, dynamic path routing, active pin dragging, and map click repositioning.
- [MemoryDashboard.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/MemoryDashboard.tsx) - Renders the photo scrapbook card, location meta, tape recorder audio player, and form fields for editing pin attributes, adding, deleting, and importing/exporting JSON. Now updated with image and audio sourcing options and helper microcopy.
- [page.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/page.tsx) - App shell coordinating mode switching, localStorage sync, JSON import/export streams, and CRUD handlers.
- [schemas.ts](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/lib/schemas.ts) - Validation logic and schema normalize/migration helpers. Now updated with media schema verification rules.
- [types/index.ts](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/types/index.ts) - Global TypeScript types. Now updated with media structure definitions.

---

## 📋 Current MVP Scope (v0.3 Media Prep Complete)
* **Media Types**: Extended models with `ImageSourceType`, `AudioSourceType`, `MemoryPinMedia`, and `MemoryRouteMedia` types, integrated optionally on routes and pins.
* **Strict Validation**: Added `validateMemoryPinMedia` and `validateMemoryRouteMedia`. Ensures imported route files containing `media` properties are rigorously checked for matching schemas (rejecting invalid source strings), while successfully retaining backward-compatibility for legacy data missing these blocks.
* **Mock Data Updates**: Enhanced the default Charleston route and stop nodes with base `"url"` and `"none"` configurations.
* **Dynamic Defaults**: Initialized empty default metadata blocks on pin/route addition events inside the page manager state.
* **Sourcing Selectors & Microcopy**:
  * Added "Cover Image Sourcing" dropdown in Route Settings.
  * Added "Image Sourcing" dropdown inside the Stop Editor, renamed Image URL input to "Image URL or Path", and added clear explanation text warning against pasting base64 image strings.
  * Added a consolidated "Audio Settings" sub-form enclosing coordinate statistics, tape length sliders/inputs, an "Audio Source Type" selector dropdown, an "Audio Label / Title" text input, and explicit helper disclaimers pointing out that microphone and recording options are deferred.
* **Present Mode**: A clean distraction-free playback presentation view that hides route settings forms, stop editor text inputs, CRUD buttons, and file portability utilities, displaying only the dynamic Map, Polaroid photo, active stop narration, and cassette deck audio console.
* **Backwards Compatibility**: Fully preserved existing simple fields rendering behaviour (`MemoryPin.image`, `MemoryPin.audioDuration`, `MemoryRoute.coverImage`), keeping the application robust and preventing bloat inside `localStorage`.

---

## 🚀 Build & Lint Status
- **ESLint**: Completed successfully with 0 errors (and only minor Image Optimization warnings on standard img tags).
- **Production Build**: Compiled successfully in Turbopack (`next build`) in 7.2s with zero TypeScript compilation errors or static generation issues.

---

## ✅ Media Prep QA Checklist

- [x] Existing default route loads.
- [x] Existing old routes without media fields still validate and load.
- [x] New routes include safe default media metadata.
- [x] Route metadata editing still works.
- [x] Stop editing still works.
- [x] Image URL/path preview still works.
- [x] Invalid media source type values are rejected during import.
- [x] Exported route JSON includes media metadata when present.
- [x] Imported route JSON with valid media metadata succeeds.
- [x] Imported route JSON without media metadata still succeeds.
- [x] No file picker was added.
- [x] No blob URLs are stored.
- [x] No base64 media storage was added.
- [x] No microphone APIs were added.
- [x] No backend/auth/storage dependency was added.
- [x] `cmd /c npm run lint` passes.
- [x] `cmd /c npm run build` passes.
