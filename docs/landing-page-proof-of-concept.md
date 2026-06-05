# Documentation: Landing Page Proof-of-Concept

The Landing Page represents the conceptual front door for the **Memory Engine: Light Over Time** project. It translates traditional linear routes into an interactive temporal simulation through a high-fidelity comparison slider.

---

## 🛠️ Files Modified & Created

* **[`app/page.tsx`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/page.tsx) [REPLACED]**: Swaps the default dashboard view with a dark cinematic landing page containing branding headers, custom hexagonal SVGs, HUD telemetry trackers, and page layouts.
* **[`app/ride/page.tsx`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/ride/page.tsx) [NEW/MOVE]**: Holds the complete interactive road-trip dashboard layout previously located at `/`. Import dependencies have been updated cleanly to match the new nested folder path.
* **[`app/components/TemporalLayerSlider.tsx`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/TemporalLayerSlider.tsx) [NEW]**: A reusable React image comparison slider component equipped with:
  * Stepped radio-tuner dashboard dial console.
  * Pointer event drag capture for responsive mouse and touch controls.
  * Arrow key accessibility increments (Left/Down decreases, Right/Up increases).
  * Hover preset snap-anchors (`1970s`, `1994`, `2016`, `2024`, `Present`).
* **[`app/components/TemporalLayerSlider.module.css`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/TemporalLayerSlider.module.css) [NEW]**: Handles CSS polygon clipping paths, linear color gradient tracks, glare layers, scanlines, and glowing seam filters.
* **[`app/components/StartRideButton.tsx`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/StartRideButton.tsx) [NEW]**: Tactile, backlight-illuminated console switch routing users to the simulator.
* **[`app/components/StartRideButton.module.css`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/components/StartRideButton.module.css) [NEW]**: Style definitions containing concentric metal bezels, hover scaling transitions, and backlight red LED glows.

---

## ⚓ Start Ride Navigation Target

* **Target URL**: The "Start Ride" button is hardcoded to navigate the Next.js router directly to the `/ride` route.
* **Redirection Control**: To update the entry point later, modify the `href` prop in [`app/page.tsx`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/page.tsx) at line 37:
  ```tsx
  <StartRideButton href="/ride" label="Start Ride" />
  ```

---

## 🖼️ How to Replace Hero Images

The temporal comparison slider loads its assets from the `/public/images` folder.
* **To swap the slider images**, overwrite these files:
  1. **Winter (Past) Layer**: Overwrite [`public/images/fall-creek-winter-layer.jpg`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/public/images/fall-creek-winter-layer.jpg)
  2. **Autumn (Present) Layer**: Overwrite [`public/images/fall-creek-autumn-layer.jpg`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/public/images/fall-creek-autumn-layer.jpg)
* Alternatively, supply custom relative file paths or absolute web URLs directly to the `beforeImage` and `afterImage` props on the `<TemporalLayerSlider />` element in [`app/page.tsx`](file:///C:/Users/Administrator/Documents/New%20project/memory-ride-mvp/app/page.tsx).

---

## 🔗 Evolving Connections to the Decade Slider & Hx System

The `TemporalLayerSlider` is currently structured as a standalone front-page component, but its visual parameters are aligned with the dashboard's design variables:
1. **Decade Slider Binding**: The tuner presets (`1970s`, `1994`, `2016`, `2024`, `Present`) map directly to the active route's available year layers. When a user selects a stop inside the simulator, we can swap the simple static image comparison container with a local instance of the `TemporalLayerSlider`, letting them slide and fade between specific stop perspectives.
2. **Hx Strength Calibration**: The bottom HUD display in the tuner console binds `hxStrength` (default: 87%) and `confidenceLabel` (default: "Partially Verified") props. This can easily be hooked up to active state bindings from the `TemporalPerspective` schemas to update live telemetry dynamically as the slider shifts.

---

## 🚀 Recommended Next Onboarding Steps

To convert this landing page into a full onboarding journey, we recommend the following feature slices:
1. **Onboarding Tutorial Overlays**: Introduce translucent HUD coachmark markers guiding the user to drag the slider handle or test arrow keys to explain "Light Over Time" before they launch into the map.
2. **Ignition Sound FX**: Wire local audio playback (e.g. tape load click, motor rev, vacuum hum) that fires when "Start Ride" is pressed to reinforce the mechanical instrument feel.
3. **Demo Pre-selection**: Allow the user to select their starting route directly from the landing page using a vintage route list selection drawer before loading the main simulation map.
