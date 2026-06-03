# Task: Implement Creator Mode v0.1 (Brutally Small)

- [x] Add `pins` list state in `page.tsx` initialized from `localStorage` or defaults.
- [x] Compute route GeoJSON dynamically based on pin locations.
- [x] Add a Mode Selector (`view` vs `edit`) in the application interface.
- [x] Update `MemoryRideMap.tsx`:
  - [x] Make active pin `draggable` in edit mode.
  - [x] Implement click-on-map to reposition the active pin.
  - [x] Render the dynamic route line connecting the current pins.
- [x] Update `MemoryDashboard.tsx` to display the Edit Form when in `edit` mode:
  - [x] Form fields for Title, Year, Location Name, Narrative Text, Image URL.
  - [x] "Add Stop" button to append a new memory pin.
  - [x] "Delete Stop" button to remove the current memory pin.
  - [x] Export Route as JSON file action.
  - [x] Import Route from JSON file action.
  - [x] "Reset Demo" button to reload original 1994 road trip.
- [x] Validate and run build tests.

# Creator Mode v0.1.1 Stability Polish

- [ ] Empty state when no pins exist
- [ ] Safe active-pin fallback after delete/import/reset
- [ ] Broken image placeholder fallback
- [ ] Stronger JSON schema validation
- [ ] localStorage version key
- [ ] Sample route JSON in `/public/demo-routes/`
- [ ] README demo script
- [ ] Final GitHub repo verification

# Creator Mode v0.2

- [ ] Multiple saved routes
- [ ] Route title and description editor
- [ ] Route cover image
- [ ] Image upload or local preview
- [ ] Microphone narration recording
- [ ] Read-only share mode
- [ ] Present Mode for investor/family walkthroughs
