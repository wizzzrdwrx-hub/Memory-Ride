# Audit Checklist: Memory Ride MVP Screens & Visuals

Use this visual checklist to capture and audit screenshots/screencasts of the Memory Ride application for demo slide decks, portfolios, or documentation.

---

## 1. Landing & Home Screens
- [ ] **Home / Default Route**: View of the Charleston Battery to Folly Beach route on startup. Active Stop #1 (Leaving the Battery) loaded. Dash stitched amber path connecting the route visible on the Map.
- [ ] **Cassette Console Panel**: Active tape player controller at the bottom with play/pause icons, tape reels, progress track, and duration.
- [ ] **Ambient Static Light**: Top-right floating amber Disc console active (pulsating).

---

## 2. Light Over Time (Decade Slider)
- [ ] **Crosby’s Seafood - Base Stop**: Stop #3 active with no temporal perspective selected (針 needle rested, tube warmup light dark, stats read "Base Memory").
- [ ] **Crosby’s Seafood - 1994 Perspective**: Year pill `1994` selected. Polaroid displays the nostalgic gravel lot image. Hx Integrity shows `72%` (pulsing amber glow, medium scanlines, mild blur).
- [ ] **Crosby’s Seafood - 2016 Perspective**: Year pill `2016` selected. Polaroid displays the updated recent reference view. Hx Integrity shows `84%` (same styling).
- [ ] **Crosby’s Seafood - 2024 Perspective**: Year pill `2024` selected. Polaroid displays the sharp modern view. Hx Integrity shows `92%` (emerald highlight, clear sharp photo).
- [ ] **Crosby’s Seafood - 1970s Perspective (Low Hx)**: Year pill `1970` selected. Polaroid displays the faded local lore image. Hx Integrity shows `48%` (pulsing red glow, heavy blur, sepia fade, signal decay scanline overlay).

---

## 3. Instrument Panel Closeups
- [ ] **Hx Strength Meter (High Hx)**: Emerald highlighted border chassis, stable needle aligned to `92%`, confidence reading `CURRENT-REFERENCE`.
- [ ] **Hx Strength Meter (Medium Hx)**: Amber border, needle aligned to `72%` or `84%`, confidence reading `PERSONAL` or `REFERENCE`.
- [ ] **Hx Strength Meter (Low Hx)**: Red/dark red border, needle aligned to `48%`, confidence reading `HEARSAY / UNVERIFIED`.

---

## 4. UI Modes
- [ ] **Present Mode**: View story window in Present Mode. Hides route selector, Creator settings, CRUD buttons, and import/export controls, showing a clean read-only presenter layout.
- [ ] **Creator Mode - Stop Editor**: Creator Mode active with Folly Beach stop selected. Inputs for title, year, location name, image paths, coordinates block, tape length, audio labels, and description text area.
- [ ] **Creator Mode - Light Over Time Review**: The lock-warning card active:
  > *"👁️ Light Over Time Layer Review: Crosby's Seafood, 1970s"* (displays color themes matching the tier).

---

## 5. Portability & Serialization
- [ ] **Portability Controls**: Visual of the bottom Action panel showing the "Route Portability" and "Library Portability" columns.
- [ ] **JSON Import Dialogue**: Clicking "Import Route" or "Import Full Library" displaying the local file selection prompt.
