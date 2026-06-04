# Executive Summary Brief: Memory Ride MVP (Project Opal)
> Preserving emotional geography, not just media files.

---

## 1. The Concept
Memory Ride is a location-aware, dynamic driving simulator and interactive guided tour engine. Instead of organizing family history chronologically in traditional grid photo galleries, Memory Ride anchors memories (photos, year tags, narratives, and audio durations) directly to geographic coordinates on an interactive Mapbox canvas.

---

## 2. Core Features (v0.3)
1. **Route-First Geography**: Dash-stitched roads connect chronological memory pins on Mapbox. Editing routes is as simple as dragging markers or clicking map surfaces.
2. **Light Over Time (Decade Slider)**: Focuses on a single physical landmark (e.g. Crosby's Seafood) and transitions between multiple chronological layer perspectives (1994, 2016, 2024, and 1970s).
3. **Hx Strength Meter**: An analog-style dashboard instrument dial expressing historical reconstruction confidence and data integrity.
4. **Confidence Haptics**: Pure CSS visual filters (scanline noise grids, pulsing shadows, sepia tints, blurs, and opacities) that shift automatically based on the selected layer's historical weight.
5. **Route and Library Portability**: Dynamic JSON serialization that imports/exports individual routes or packages entire local multi-route databases.
6. **Presentation Theater**: Present Mode isolates narratives into a clean, read-only deck panel, hiding database resets and editor tools.

---

## 3. Product Differentiators
* **Emotional Geography**: Preserves the exact physical journey along with media context.
* **Offline Local-First Architecture**: Storage runs entirely on client-side `localStorage`, requiring zero databases, hosted API costs, or authentication overhead.
* **Tuning Aesthetics**: High-fidelity analog chassis styling, vacuum tube warmup glows, and responsive haptics make the digital archive feel tactile, alive, and immersive.

---

## 4. Technical Stack
* **Framework**: Next.js 16 (Turbopack) & React 19
* **Styling**: Tailwind CSS & Vanilla CSS
* **Map Engine**: React-Map-GL & Mapbox GL JS
* **Iconography**: Lucide React

---

## 5. Sample Route Data
We package two pre-configured, schema-compliant sample JSON archives mirrored in the project folders:
* **Route JSON**: [sample_route.json](file:///C:/Users/Administrator/Documents/New%2520project/memory-ride-mvp/docs/demo-routes/sample_route.json) (Single Battery-to-Beach tour)
* **Library JSON**: [sample_library.json](file:///C:/Users/Administrator/Documents/New%2520project/memory-ride-mvp/docs/demo-routes/sample_library.json) (Multi-route catalog)

---

## 6. Known Limitations
* **Storage Limits**: `localStorage` enforces a strict 5MB quota, meaning routes must use image URLs or local static asset directories instead of base64 media blocks.
* **Mapbox Token**: Requires a Mapbox Public Token in `.env.local` to load maps.
* **Media Sourcing**: Local file choosing and cloud vaults are scaffolded and planned but deferred in the current MVP slice.

---

## 7. Next Roadmap Steps
* **GPS Narration Triggers**: Real-time triggering of cassette playbacks when driving coordinates match pins.
* **Voice Recording**: HTML5 microphone integration to write voice narration directly to local archives.
* **Encrypted Sharing Package**: Secure, password-locked shareable packages for family collaborators.
