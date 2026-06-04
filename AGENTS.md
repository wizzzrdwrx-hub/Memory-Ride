# Agent Workflow Instructions: Memory Ride

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Identity
Memory Ride / Memory Engine: Light Over Time is a route-first historical memory simulator that turns real routes, personal memory anchors, temporal perspectives, Hx Strength, and Confidence Haptics into guided memory rides.

## Current Stack
Next.js, React, TypeScript, Mapbox / react-map-gl, Tailwind CSS, localStorage, JSON import/export, and static assets in `public/images`.

## Core Product Pillars
Route Library, Creator Mode, Present Mode, Light Over Time, Hx Strength, Confidence Haptics, Media Prep, and Route and Library Portability.

## Hard Constraints
Do not add backend services, Firebase, Supabase, auth, database, hosted media, public sharing, microphone recording, AI reconstruction, historical map overlays, new dependencies, or deployment changes unless explicitly requested.

## Data Safety Rules
* Keep `memory_ride_library` as the localStorage source of truth.
* Preserve JSON import/export compatibility.
* Validate imported data strictly.
* Do not store base64 images/audio or blob URLs in localStorage.
* Never commit `.env.local`, private keys, Mapbox private tokens, secrets, or personal/private route data.

## Required Checks
Run these before final handoff when code or workflow files change:
* `npm run lint`
* `npm run build`

## Required Final Report Format
1. Verdict
2. Changed files
3. Behavior or documentation implemented
4. Safety/data compatibility notes
5. Test/build results
6. Warnings/bugs/deferred items
7. Recommended commit message
8. Next branch suggestion
