# Memory Ride MVP (Project Opal) 🚗⏱️
> The next evolution of the family photo album

Memory Ride turns meaningful locations, photos, narration, and personal stories into an interactive guided memory route. Relive journeys chronologically and spatially, exploring how places change over time.

---

## 🎯 Purpose & Vision
Memory Ride is a proof-of-concept for converting traditional family photo albums and cassette tape audio memories into a dynamic driving simulator. By anchoring photos and personal memories to coordinates on a Mapbox canvas, we preserve **emotional geography** rather than just media files.

This demo maps a nostalgic family drive from the **Charleston Battery to Folly Beach, SC**, using historical references and time-layered memories.

---

## 📋 Features

* **Route Library**: Preloaded memory routes managed as a library. Swapping routes updates the active Map tracks and dashboard details instantly.
* **Creator Mode**: Full developer options to plot/delete stops, edit metadata, coordinates, images, and audio settings. Reposition markers by dragging them directly on the Map canvas or clicking map coordinates.
* **Present Mode**: A distraction-free, read-only presentation view. Hides all editor fields, database controls, and CRUD buttons, providing a clean guided theater flow.
* **Route & Library Portability**: Dynamic JSON serialization. Export routes as portable `.json` files or package/backup the entire local multi-route database.
* **Media Prep**: Metadata structures ready for offline media (URLs, local public file paths, audio duration tags, and source types) with strict validation.
* **Light Over Time**: Time-layered perspectives anchored to a single coordinate stop (e.g. Crosby's Seafood). Navigate through different eras (1994, 2016, 2024, 1970s) to watch descriptions, photos, and references shift.
* **Hx Strength Meter**: An analog-style dashboard instrument dial built in CSS/Tailwind representing historical integrity and confidence levels.
* **Confidence Haptics**: Pure CSS visual filters (scanline grids, pulsing borders, sepia tints, blurs, and opacities) that shift automatically based on the selected layer's historical weight.

---

## 📦 Downloadable Sample JSON Routes
To test route portability without creating data from scratch, you can use the schema-compliant sample JSON files included in this repository:

1. **Sample Single Route**: [sample_route.json](file:///C:/Users/Administrator/Documents/New%2520project/memory-ride-mvp/docs/demo-routes/sample_route.json) (Mirrored at `public/demo-routes/sample_route.json`)
   * *Contains*: The preloaded 4-stop Charleston Battery to Folly Beach route, complete with Crosby's Seafood time perspectives.
   * *How to Import*: In **Creator Mode**, click the **Import Route** button and select this JSON file. It will load as a new route.
2. **Sample Full Library**: [sample_library.json](file:///C:/Users/Administrator/Documents/New%2520project/memory-ride-mvp/docs/demo-routes/sample_library.json) (Mirrored at `public/demo-routes/sample_library.json`)
   * *Contains*: A full multi-route library schema wrapping the default Folly Beach route.
   * *How to Import*: In **Creator Mode**, click **Import Full Library** and select this file. *Warning: This will overwrite your active local storage database.*

---

## ⚙️ Local Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Configure Environment Token**:
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_public_token_here
   ```
   *(Ensure you use a valid public Mapbox token to load the Map canvas correctly).*
3. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
4. **Compile Production Build**:
   ```bash
   npm run build
   ```

---

## 🚀 Technical Milestones
* **v0.1**: Creator Profile and basic Proof-of-Route established.
* **v0.1.1**: Added activePin null guards, JSON schema check, and Polaroid fallback icons.
* **v0.2**: Added Route Library storage, Route CRUD, Import/Export, and Present Mode Foundation.
* **v0.3**: Added Media Metadata Prep, Light Over Time layers, Hx Strength Meter, and Confidence Haptics.
* **v0.3 Handoff**: Completed Demo Export packaging and visual audit checklist.
