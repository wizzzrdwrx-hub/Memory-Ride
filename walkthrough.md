# Walkthrough: Memory Ride MVP (Project Opal) - v0.3 Light Over Time Foundation

## 🎯 MVP Purpose
Memory Ride is a proof-of-concept for turning family photos, meaningful locations, and personal narration into a shareable guided route experience. 

This slice introduces the **Light Over Time Foundation** which allows a single memory stop to hold multiple time-layered perspective nodes (such as 1994, 2016, and 2024 layers), rendering different descriptions, metadata, and images while keeping geographic coordinates fixed.

---

## 🛠️ File Structure
The project is structured inside the `memory-ride-mvp/` folder as follows:

- [package.json](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/package.json) - Contains React 19, Next.js 16, `@types/mapbox-gl`, `react-map-gl`, and `lucide-react`.
- [mockData.ts](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/data/mockData.ts) - Now pre-populated with Crosby's Seafood temporal perspective layers (1994, 2016, and 2024).
- [MemoryRideMap.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/MemoryRideMap.tsx) - Updated to accept `selectedPerspectiveId` and dynamically transition the Polaroid markers and hover tooltips in sync with dashboard selection.
- [MemoryDashboard.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/MemoryDashboard.tsx) - Updated with the horizontal perspective selector button-pills row, resolved details panel, metadata sub-card displaying Source, Confidence, and Nostalgia percentages, and read-only editor card.
- [page.tsx](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/page.tsx) - App shell coordinating the `selectedPerspectiveId` state and resetting it upon active pin transitions.
- [schemas.ts](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/lib/schemas.ts) - Validation helpers updated with `validateTemporalPerspective`.
- [types/index.ts](file:///c:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/types/index.ts) - TypeScript definitions updated with the `TemporalPerspective` model.
- `/public/images/` - Pre-loaded with Crosby's Seafood era photos (`crosbys_1994.jpg`, `crosbys_2016.jpg`, `crosbys_2024.jpg`).

---

## 📋 Current MVP Scope (v0.3 Light Over Time Foundation Complete)
* **Temporal Models**: Created the `TemporalPerspective` schema representing individual historical perspectives. Added a matching list optional type array on memory stop models.
* **Asset Integrations**: Copied the three custom era images into the public folder and mapped them respectively.
* **Schema Validation**: Implemented strict recursive validation on imported files to safeguard coordinate stability and ensure temporal properties are formatted correctly.
* **Interactive UI Selector**:
  * Displays pills row selection inside the active stop panel.
  * In View and Present modes, clicking pills transitions the Polaroid photo, active stop year, description, and metadata dynamically.
  * Synchronizes the Map view, instantly shifting the Map Marker photo and hover tooltip to match.
  * In Creator Mode, renders a read-only perspective review panel, keeping base stop parameters fully editable.
* **Stability & Backwards Compatibility**: Retains base properties and enables legacy routes to continue validating normally.

---

## 🚀 Build & Lint Status
- **ESLint**: Completed successfully with 0 errors (and only minor Image Optimization warnings on standard img tags).
- **Production Build**: Compiled successfully in Turbopack (`next build`) in 7.5s with zero TypeScript compilation errors or static generation issues.

---

## ✅ QA Checklist

- [x] Default route and Crosby's Seafood stop load successfully.
- [x] Sourcing selector is visible on Crosby's Seafood stop.
- [x] Selecting the 1994, 2016, or 2024 perspective updates the Polaroid image preview and narrative text.
- [x] Location coordinates on the map do not change when changing perspective years.
- [x] The active map marker's Polaroid photo updates to match the selected perspective's image.
- [x] Map marker tooltip reflects the perspective's title on hover.
- [x] Present Mode cleanly displays the perspective switcher and renders perspective text and metadata.
- [x] Creator Mode allows previewing perspectives read-only while editing coordinates/base details.
- [x] Selecting a different stop resets the perspective to the base view (`null`).
- [x] Exporting the route output JSON contains the nested `temporalPerspectives` details.
- [x] Importing a route JSON containing temporal perspectives succeeds.
- [x] Importing old legacy JSON files without perspectives still succeeds.
- [x] `cmd /c npm run lint` passes without errors.
- [x] `cmd /c npm run build` passes.
