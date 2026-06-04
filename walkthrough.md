# Walkthrough: Memory Ride MVP (Project Opal) - v0.3 Complete

## 🎯 Purpose & Scope
Memory Ride is a proof-of-concept for turning family photos, meaningful locations, and personal narration into a shareable guided route experience.

This walkthrough outlines the complete feature stack compiled as of **v0.3 Route Demo Polish**, including multi-route libraries, Light Over Time layers, Hx Strength meters, Confidence Haptics atmosphere, and a detailed showcase script.

---

## 🛠️ Complete Feature Stack (v0.3)
1. **Interactive Mapbox Canvas**:
   * Stitched, nostalgic dashed-line amber route connects chronological stops.
   * Auto-fly logic centers and zooms active stops.
   * Markers render inside physical custom Polaroid frames.
   * Edit Mode allows re-routing paths via marker dragging or clicking map surfaces.
2. **Light Over Time (Decade Switcher)**:
   * Stop 3 (Crosby's Seafood) holds time-layered perspectives (1994, 2016, 2024, and 1970s).
   * Shifting years updates descriptions, metadata, and photos, leaving location coordinates static.
3. **Hx Strength Meter**:
   * Custom CSS/HTML tuner chassis representing historical integrity percentage (e.g. 72%, 84%, 92%, 48%).
   * Smooth white dial needle sliding transitions.
   * Pulsing amber TUBE WARMUP neon glow (active when perspective is selected; dark in base stop).
4. **Confidence Haptics**:
   * **High Hx** (`hxStrength >= 0.85`): Emerald glowing frame border, sharp grayscale-0 photo display.
   * **Medium Hx** (`0.60 <= hxStrength < 0.85`): Pulsing amber glow, mild image softness (`blur-[0.3px]`), and fine amber scanlines.
   * **Low Hx** (`hxStrength < 0.60`): Pulsing red/orange glow, heavy image blur (`blur-[0.8px]`), sepia tint overlay (`sepia-[15%]`), and paper-noise scanline overlay representing signal decay.
   * **Neutral/Base**: Standard view, pointer needle hidden, tube light dark, showing "Base Memory / N/A".
5. **Mode Panels & Portability**:
   * **View Mode**: Clean dashboard reading narratives with dynamic haptic wrappers.
   * **Present Mode**: Read-only, presentation-friendly view hiding Creator settings, database, and import/export controls.
   * **Creator Mode**: Full access to drag markers, update titles/years, write narratives, import/export route JSONs, and back up library JSONs to/from local storage.

---

## 🎙️ Suggested Demo Showcase Script
Use this script to demonstrate the engine to reviewers or stakeholders:

1. **Setup**: Start on the home screen. Make sure the Charleston Battery demo is loaded.
2. **Explain the Vision**: 
   * *“This is Memory Ride. Instead of organizing family history chronologically in directories, we organize it spatially as a guided driving simulator.”*
3. **Show the Route**: 
   * Click through the stops (leaving the Battery, crossing the Expressway) using the tape player playback arrows. Explain the nostalgic scrapbook layout.
4. **Demonstrate Light Over Time**:
   * Select Stop 3: **Crosby's Seafood**.
   * Click the year pills to switch layers:
     * **1994** (Family road trip memory): Shows the original nostalgic snapshot.
     * **2016** (Recent memory layer): Watch the image update to a newer reference view.
     * **2024** (Current-day reference): Visual updates to the modern view.
     * **1970s** (Family hearsay lore): Shows the faded legend of Uncle Robert's ghost boat.
5. **Explain Hx Strength & Confidence Haptics**:
   * Focus on the **Hx Strength Meter** under the narration:
     * Explain that `92%` (2024) is a direct, verified current reference (High Hx, sharp photo, emerald border).
     * Explain that `72%` (1994) represents personal memories supported by photos (Medium Hx, pulsing amber outline, slight scanline grain).
     * Explain that `48%` (1970s) is unverified family lore (Low Hx, pulsing red border, sepia fade, blurred memory decay).
     * Show that the text remains sharp and highly readable regardless of haptic decay.
6. **Enter Present Mode**:
   * Click **Present Mode** in the header toggle.
   * Show that all route creator controls disappear, leaving a clean, distraction-free playback window ideal for driving or sharing.
7. **Show Portability**:
   * Exit Present Mode and point out the **Route Portability** and **Library Portability** buttons in Creator Mode.
   * Explain that users can export their custom road-trip archives as single JSON files or backup their whole multi-route library locally.
8. **Plot a Stop**:
   * Click **Add Stop** in Creator Mode.
   * Drag the new stop marker on the map to place it, type a custom title, and show how users can build their own guided memory journey.
