# Calculator: working brief

A four-function calculator (+ − × ÷) you can trust with money. Take-home exercise.

## Thesis
- **Exact where possible, marked with ≈ where not.** Every number on screen is either exactly right or carries ≈.
- **A tape shows the working**, so a figure can be checked step by step.
- The alternative is a spreadsheet. We argue from what this product gives (the working and an honest mark), never from what another product gets wrong. We have checked none, so we claim nothing about any.

## Users
- **Quick sum:** one-off calculation, has never heard of floating point. Should get a plain calculator and no lecture.
- **Desk checker:** verifying money figures before approving them. Needs the working and an honest mark on any inexact number.
- Keep both honest: the tape is always there but quiet, and ≈ is the only precision signal. Accessibility is a rule for both, not a third user.

## Layout
Top level is fixed: `README.md`, `src/`, `docs/` (app-roles, jobs-to-be-done, user-stories), `transcripts/`.

- `src/domain/`: pure calculation. Imports nothing from React, `ui`, or `app`. No DOM.
- `src/app/`: hooks wiring domain to UI.
- `src/ui/`: components, CSS Modules, tokens.
- `src/shared/`: types used by more than one layer. Imports from no other layer.
- Dependencies point inwards only: `ui → app → domain`, and any layer may use `shared`. A test will enforce this.

## Arithmetic rule
- No user-facing arithmetic uses JS number operators, `Number()`, `parseFloat` or `toFixed`. Values are decimal.js `Decimal` (or strings) from input to display.
- Use one configured clone (`precision: 34`, `ROUND_HALF_UP`). Never mutate the global `Decimal`.
- JS numbers are fine for things that are not values: indexes, lengths, digit counts.

## Testing
- Vitest, React Testing Library, jsdom.
- Domain tests are table-driven and pure, and hold most of the coverage, including every boundary in Decisions.
- Hooks are tested with `renderHook`. UI is tested through role and label queries, which double as an accessibility check.
- Each story's Given/When/Then criteria map to tests, and the test name cites the story ID (`S-3: …`).
- Screen reader testing is manual, VoiceOver only, and the docs say so.

## Docs
- Roles, jobs and stories follow `.claude/skills/product-spec`. ADRs follow `.claude/skills/adr`.
- Docs must be honest about what was built. A story is Implemented only if its criteria pass.
- The UI never uses the words "precision" or "floating point".

## Commits (standing rule)
- Commit at the end of each unit of work, never in one lump at the end. Push after every commit.
- Small commits. Subject under 60 characters. Body says why, not what. Reference the story ID where the work maps to one.
- Documents are committed before the code they specify. Never put docs and source in one commit.
- Tell the user each commit message as it is made.
- Never touch git config.

## Decisions
1. **Internal maths.** decimal.js, 34 significant digits. Round half up everywhere, internal and display. For negatives that means away from zero (−2.5 → −3). Fractions were rejected: the screen is decimal anyway, and they mean much more code.
2. **Display.**
   - Plain notation up to 15 significant digits. Exponential only when |x| ≥ 1e15 or |x| < 1e-9.
   - ≈ appears whenever the screen is not the exact value, whether because of the 34-digit limit or the 15-digit display cut. 100 ÷ 3 → `≈ 33.3333333333333`. 100 ÷ 3 × 3 → `≈ 100`.
   - Never show negative zero.
3. **Order.** Each operation runs as the next operator is pressed (adding machine), so 2 + 3 × 4 = 20. The expression line shows the running result as soon as an operator is pressed: `2 + 3 ×` shows `5 ×`. The tape records it the same way.
4. **Keys.**
   - Sign toggle is included.
   - Repeated = repeats the last operation, and each press is its own tape line.
   - A second operator replaces the first.
   - A digit after = starts a new calculation.
5. **Input limit.** At most 15 significant digits can be typed. An extra digit shows a short message and is never dropped silently. A paste over 15 digits is refused with the same message.
6. **Paste.**
   - Currency symbols, spaces and thousands commas are stripped. A comma counts as a thousands separator only when followed by exactly three digits.
   - Anything ambiguous (e.g. `1.234,56`) is refused with a message. Never guess.
   - `-£5` and `£-5` both work.
   - Accounting brackets `(1,234)` are refused with a message.
   - Assumptions: UK/US number style, and no bracket negatives.
7. **Errors.**
   - The messages are "Cannot divide by zero" (x ÷ 0 and 0 ÷ 0), "Number too large" (|result| ≥ 1e100) and "Number too small" (a non-zero |result| < 1e-99, never shown as 0).
   - There is one error state. Clear, clear entry, any digit, the decimal point, paste and tape recall get you out of it. Operators, =, sign toggle and backspace do nothing.
   - Errors never write a tape line.
8. **Tape.**
   - One line per calculation finished with =, showing the full chain and the result.
   - Clear leaves the tape alone; a separate control empties it.
   - It is not persisted, because money figures should not be left on shared machines.
   - Recall brings back the internal 34-digit value with its ≈. Recall replaces memory functions.
9. **Not implemented** (each a story with written criteria): percent, editing earlier tape lines, tape export.
10. **Accessibility.**
    - Every action works without a mouse.
    - Results are announced to screen readers, and ≈ is read as "approximately".
    - The tape is a real list.
    - Tested with VoiceOver only.
11. **UI.** The tape is always visible but quiet; on a phone it sits behind a toggle. No units, no currency mode.
12. **Pinned tests.**
    - 0.1 + 0.2 = 0.3, exact with no ≈.
    - 1.005 × 100 = 100.5.
    - A 16th digit of exactly 5 rounds up, tested for both a positive and a negative number.
13. **Stack.** Vite, React, TypeScript strict, decimal.js, Vitest + React Testing Library + jsdom. CSS Modules with no framework. No backend, env vars or keys. Runs locally on Node 20 from the README; a hosted link is optional.
