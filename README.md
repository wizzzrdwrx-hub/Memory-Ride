# Memory Ride MVP

> The next evolution of the family photo album

Memory Ride turns meaningful routes, photos, captions, and personal stories into an interactive guided memory route. 

---

## 🎯 MVP Purpose
Memory Ride is a proof-of-concept for turning family photos, meaningful locations, and personal narration into a shareable guided route experience.

This demo uses a Charleston-to-Folly route to show how old memories can be organized spatially, presented visually, and replayed like a modern interactive family photo album.

---

## 📋 Current MVP Scope
* **Charleston-to-Folly Demo Route**: Preloaded road trip from the Charleston Battery to Center Street (1994).
* **Dynamic Memory Pins**: Interactive stops along the road with photo representations.
* **View/Edit Creator Mode**: Dual modes to consume memory playbacks or edit paths.
* **Polaroid-style Memory Cards**: Retro physical frames displaying visual memories in real-time.
* **Mapbox Route Visualization**: Dynamically connecting paths with customized dashed-road styling.
* **Draggable/Repositionable Stops**: Relocate pins by dragging them on the map canvas or clicking any coordinate point.
* **localStorage Route Persistence**: Cache your custom edits automatically.
* **JSON Import/Export**: Export routes as portable `.json` files or import existing layouts.
* **Safe Mapbox Token Handling**: Environment config variables via `.env.local` to prevent source leaks.

---

## 🛡️ Stability Features Added (v0.1.1)
* **Safe activePin Null Guard**: Intercepts map rendering and panel states to prevent page crashes if all pins are deleted, or when files are imported/reset.
* **JSON Schema Verification**: Parses uploaded JSON objects and checks data structure and type mappings for all keys before committing to state.
* **Polaroid Image Fallbacks**: Gracefully degrades broken, empty, or unresolvable URLs to a styled preview card with an `ImageOff` icon.
* **localStorage Migrations**: Migrates legacy v0.1 flat array formats to standard versioned route structures automatically on boot.

---

## 🛑 Not Yet Included (Future Targets)
* Cloud accounts / centralized hosting
* Hosted image upload integration
* Multi-route libraries
* Microphone narration recordings
* Public sharing link generation
* Multiplayer co-op riding
* VR mode

---

## ⚙️ Local Setup

1. Clone or download this project workspace.
2. Navigate to the project root:
   ```bash
   cd memory-ride-mvp
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Copy the sample environment file to create `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
5. Open `.env.local` and add your Mapbox Public Access Token:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_public_token_here
   ```
6. Run the local development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Production Build
To test the production build locally:
```bash
npm run build
```

---

## 🚀 Technical Milestones
* **Current Status**: Creator Mode v0.1 complete and build-verified.
* **Next Target**: Creator Mode v0.1.1 stability polish (improved schema validation and UI fallback cards) followed by Creator Mode v0.2.
