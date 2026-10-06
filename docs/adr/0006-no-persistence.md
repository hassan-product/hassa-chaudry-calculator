# 0006. No persistence in this version

- **Status:** Accepted
- **Date:** 2026-10-06

## Context
The tape holds money figures. A desk checker often works on a shared machine. Anything the page saves in the browser can be seen by the next person at that desk. Losing the tape on reload, on the other hand, loses the user's working.

## Decision
Nothing is stored. The tape and the calculation live in memory only and are gone on reload. No `localStorage`, `sessionStorage`, IndexedDB or cookies.

## Alternatives rejected
- **`localStorage` with a "clear" control.** The working would survive reloads. It was rejected because the figures stay on disk until someone remembers to clear them, and on a shared machine that someone may not be the person who entered them.
- **`sessionStorage`.** It survives a reload but is gone when the tab closes, which looks like a middle ground. It was rejected because tabs on shared desk machines are often left open, so the figures would still be there for the next person.

## Consequences
- No figure outlives the page, and there is no storage code to test or get wrong.
- **Cost:** an accidental reload (a stray Cmd+R, or a crashed tab) wipes a long check with no way back. This is the decision the desk checker will like least.
- **Cost:** there is no way to pause a check and resume it later.
- **Cost:** the browser's back/forward cache may keep the page in memory and restore it, tape included, when someone navigates back. This is not persistence, because nothing is written to storage (Decision 11). But it is the same exposure as a tab left open on a shared machine, which this decision already accepts.
