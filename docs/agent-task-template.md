# Agent Task Prompt Template

Use this template to start a focused Memory Ride / Memory Engine task.

## Branch
`[branch-name]`

## Goal
[Describe the desired outcome in one or two sentences.]

## Scope
* [In-scope change 1]
* [In-scope change 2]
* [In-scope change 3]

## Constraints
Follow `AGENTS.md`. Do not add backend services, Firebase, Supabase, auth, database, hosted media, public sharing, microphone recording, AI reconstruction, historical map overlays, new dependencies, or deployment changes unless explicitly requested.

## Files to Inspect
* `[path/to/file-or-folder]`
* `[path/to/file-or-folder]`

## Implementation Requirements
* [Requirement 1]
* [Requirement 2]
* Preserve `memory_ride_library` localStorage compatibility and JSON import/export behavior when touching data flows.
* Do not store base64 images/audio or blob URLs in localStorage.

## Verification Commands
* `git diff`
* `npm run lint`
* `npm run build`

## Required Final Report
1. Verdict
2. Changed files
3. Behavior or documentation implemented
4. Safety/data compatibility notes
5. Test/build results
6. Warnings/bugs/deferred items
7. Recommended commit message
8. Next branch suggestion

## Merge/Tag Instructions Placeholder
[Add explicit merge, squash, tag, and push instructions here only when the task is approved for that work.]

## Deferred Items
* [Deferred item or known non-goal]
