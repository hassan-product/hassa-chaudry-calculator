# Calculator

[![CI](https://github.com/hassan-product/hassa-chaudry-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/hassan-product/hassa-chaudry-calculator/actions/workflows/ci.yml)

A four-function calculator (+ − × ÷) for checking money figures. It is for two kinds of user: someone doing a quick sum who never thinks about how it works, and someone at a desk checking figures before approving them. I chose this kind of calculator because, for money, a number you cannot trust is worse than no number.

The point is precision. The arithmetic is decimal, so ordinary sums come out exactly, and when an answer cannot be exact (100 ÷ 3) it is marked with ≈ instead of being quietly rounded.

A tape records every finished calculation, step by step, so a figure can be checked line by line and any result brought back. Memory holds one running total being built, such as three invoice totals added with M+ and read back with MR; every memory change is also written on the tape, so nothing is hidden.

## An example

In JavaScript, `0.1 + 0.2` is `0.30000000000000004`. Here, `0.1 + 0.2 =` shows exactly `0.3`. `100 ÷ 3 =` shows `≈ 33.3333333333333`, and multiplying that by 3 shows `≈ 100`: the result is close to 100, and the mark says it may not be exactly 100.

## Status

16 of 20 live stories are Implemented, and 4 are Not implemented. Each Implemented story has every acceptance criterion shown by an automated test or by a manual check in a browser. The full table, with reasons, is in [docs/user-stories.md](docs/user-stories.md#status).

- **Implemented (16):** S-1 to S-14, S-19 and S-20.
- **Not implemented (4):** S-15 (screen reader: only three criteria checked with VoiceOver), S-16 (edit an earlier tape line), S-17 (percent and tax), S-18 (export the tape as CSV).
- **Retired:** ~~S-21 Hear each key press~~, on 2026-10-07. It will not be built.

## Prerequisites

Node 20.19 or later (or 22.12 or later). Nothing else: no accounts, no keys, no cloud services.

## Run it

```sh
npm install
npm run dev      # then open the address it prints, usually http://localhost:5173/
npm test
npm run build    # a static build in dist/
```

Optional double-click: `start.command` on a Mac or `start.bat` on Windows. Each checks for Node, installs dependencies on the first run, starts the app and opens it in your browser.

## Tests

- `npm test` runs every automated test: the domain, the app hooks, the screen through role and label queries, and the fitness functions. CI runs them and the build on every push.
- `npx vitest run src/fitness.test.ts` runs the fitness functions on their own: layer boundaries, no native arithmetic on values, story traceability, the error messages, and the bundle budget.
- `node evals/run.mjs` runs the evals. They are optional, test the written documents rather than the calculator, need Claude Code signed in, and need no API key. The results are already in [evals/results/summary.md](evals/results/summary.md); see [evals/README.md](evals/README.md).
- [docs/test-plan.md](docs/test-plan.md) is the manual check, about ten minutes.

## How it was built

- **AI tool:** Claude Code.
- **Model for the build:** Claude Opus 5.5, as the co-author line on each commit records.
- **Model for the evals:** `claude-sonnet-5-5`, for the answers and the grading, as the eval summary records.

Code changed by hand: none.

## Assumptions

From the open questions in [the product brief](docs/product-brief.md):

- Pasted figures are UK/US style. Anything else, such as `1.234,56`, is refused rather than guessed.
- Negative figures use a minus sign. Accounting brackets `(1,234)` are refused with a message saying so.
- People paste one figure at a time.
- `≈ 0` after `100 ÷ 3 × 0` is acceptable: the mark overstates the doubt but never claims something false.
- 15 digits are enough for any money figure a desk checker meets.
- Phones need no paste button.
- Other screen readers behave like VoiceOver. This is untested.

## Repo map

- `src/domain/`: the calculation, a pure reducer with decimal arithmetic. No React, no DOM.
- `src/app/`: hooks that wire the domain to the browser: the keyboard, paste, the fault, the view model.
- `src/ui/`: the screen, in React with CSS Modules and tokens taken from the mockup.
- `src/shared/`: types and message texts used by more than one layer.
- `docs/`: the three required documents (roles, jobs, stories) and the documents beside them.
- `docs/adr/`: decision records, one decision each.
- `docs/ux/`: wireframes and the mockup, the visual source of truth.
- `docs/diagrams/`: user, app and architecture flow diagrams, with their Mermaid sources.
- `evals/`: promptfoo checks of the written documents, with saved results.
- `transcripts/`: the sessions with Claude Code.
- `.github/workflows/`: CI.
- `.claude/skills/`: the formats the documents follow.

The documents beyond the three required ones are there so each part of the build can be checked against something written down. The product brief says what the calculator is and is not for. The architecture and decision records say how it is built and why, including what was rejected. The wireframes and mockup fix how it looks. The test plan lets someone check it by hand. `CLAUDE.md` holds the frozen decisions every session built from.

## Documents

- [App roles](docs/app-roles.md), [jobs to be done](docs/jobs-to-be-done.md), [user stories](docs/user-stories.md)
- [Product brief](docs/product-brief.md), [architecture](docs/architecture.md), [decision records](docs/adr/), [test plan](docs/test-plan.md)
- [Wireframes](docs/ux/wireframes.md), [mockup](docs/ux/mockup.html) (open it in a browser), [diagrams](docs/diagrams/)
- [Session 1](transcripts/session-01.md): agreeing what to build, then the roles, jobs, stories, brief, architecture, decision records, wireframes and mockup. No code.
- [Session 2](transcripts/session-02.md): the engine, the screen, the guardrails (fitness functions, CI and evals) and this audit.

## Browsers checked

- Chrome on macOS, by hand, locally and on the hosted copy.
- A phone browser, by hand, on the hosted copy.
- Headless Chrome, for layout measurements at 320px, 900px, 1440px and at 200% and 400% zoom.

Edge, Firefox and Safari have not been checked.

## Hosting

The hosted copy is at https://hassa-chaudry-calculator.vercel.app/. It is a convenience, not a requirement: the app runs locally with the commands above.

Vercel settings:
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variables:** none

## Known limits

- **Four stories are Not implemented.**
  - S-15: VoiceOver has confirmed only "12", "12 plus" and "15".
  - S-16, S-17 and S-18 are out of scope for this version, with their reasons in the [status table](docs/user-stories.md#status).
- **Only the browsers above have been checked.** [docs/test-plan.md](docs/test-plan.md) says where Safari and Firefox are most likely to differ, starting with Safari's Tab key skipping buttons by default.
- **2 + 3 × 4 is 20, not 14.** Each operation runs as it is entered, like an adding machine, and the line above the display shows `5 ×` as soon as × is pressed. See [ADR 0004](docs/adr/0004-immediate-execution-over-precedence.md).
- **≈ can appear on answers that look exact.** `100 ÷ 3 × 3 =` shows `≈ 100`, and `100 ÷ 3 × 0 =` shows `≈ 0`. Once a step has been rounded, the rest of that calculation stays marked, because its exactness can no longer be shown (Decision 3 in `CLAUDE.md`).
- **`start.command` may be blocked on a Mac if the repository was downloaded as a zip.** macOS can refuse to open a downloaded script, or the download can drop its permission to run. Right-click it and choose Open, or run `npm install` and `npm run dev` instead. A `git clone` keeps it runnable.
