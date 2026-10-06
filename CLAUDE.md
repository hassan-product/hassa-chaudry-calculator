# Calculator: working brief

A four-function calculator (+ − × ÷) you can trust with money. Take-home exercise.

## Thesis
- **Exact where possible, marked with ≈ where not.** Every number on screen is either exactly right or carries ≈.
- **A tape shows the working**, so a figure can be checked step by step.
- The alternative is a spreadsheet. We argue from what this product gives (the working and an honest mark), never from what another product gets wrong. We have checked none, so we claim nothing about any.

## Users (full roles in `docs/app-roles.md`)
- **R-1 Everyday Calculator User:** a one-off sum, has never heard of floating point. Gets a plain calculator and no lecture.
- **R-2 Desk Checker:** checks money figures before approving them. Needs the working and an honest mark on any inexact number.
- Accessibility is a rule for both, not a third role.

## Layout
Top level is fixed: `README.md`, `src/`, `docs/` (app-roles, jobs-to-be-done, user-stories), `transcripts/`.

- `src/domain/`: pure calculation. Imports nothing from React, `ui`, or `app`. No DOM.
- `src/app/`: hooks wiring domain to UI. `src/ui/`: components, CSS Modules, tokens.
- `src/shared/`: types used by more than one layer. Imports from no other layer.
- Dependencies point inwards only: `ui → app → domain`, and any layer may use `shared`. A test will enforce this.

## Arithmetic rule
- No user-facing arithmetic uses JS number operators, `Number()`, `parseFloat` or `toFixed`. Values are decimal.js `Decimal` (or strings) from input to display.
- Use one configured clone (`precision: 34`, `ROUND_HALF_UP`). Never mutate the global `Decimal`. JS numbers are fine for non-values (indexes, lengths, digit counts).

## Testing
- Vitest, React Testing Library, jsdom.
- Domain tests are table-driven and pure, and hold most of the coverage, including every boundary in Decisions.
- Hooks are tested with `renderHook`. UI is tested through role and label queries. Each story's Given/When/Then criteria map to tests, and the test name cites the story ID (`S-3: …`).
- Screen reader testing is manual, VoiceOver only, and the docs say so.

## Docs
- Roles, jobs and stories follow `.claude/skills/product-spec`. ADRs follow `.claude/skills/adr` and live in `docs/adr/`.
- The three required docs stay exactly where they are. Extra files beside them (`docs/adr/`, `docs/ux/`, `architecture.md`, `product-brief.md`) are fine.
- Docs must be honest about what was built. A story is Implemented only if its criteria pass.

## Commits (standing rule)
- Commit at the end of each unit of work, never in one lump at the end. Push after every commit.
- Small commits. Subject under 60 characters. Body says why, not what. Reference the story ID where the work maps to one.
- Documents are committed before the code they specify. Never put docs and source in one commit.
- Tell the user each commit message as it is made. Never touch git config.

## Decisions (frozen; anything added later is listed to the user when added)
1. **Maths.** decimal.js, 34 significant digits. Round half up everywhere, internal and display; for negatives that is away from zero (−2.5 → −3). No fractions.
2. **Display.** Results are rounded to 15 significant digits. Plain notation unless the *rounded* value is ≥ 1e15 or < 1e-9 in size, then `1.5 × 10¹⁵`, read as "1.5 times 10 to the power 15". Plain numbers get thousands commas in the integer part. Results drop trailing zeros. Negatives use a true minus sign (−), read as "minus". Never negative zero.
3. **≈** shows whenever the number on screen may not be the exact answer, either because the display cut digits or because any step was rounded at 34 digits. It carries through the rest of the calculation, sign toggle and recall until a new calculation starts, so 100 ÷ 3 × 0 shows `≈ 0`. It appears on the display, the expression line and the tape, and is read aloud as "approximately".
4. **Order.** Each operation runs as entered, so 2 + 3 × 4 = 20. When an operator is pressed the expression line shows the running result: `2 + 3 ×` shows `5 ×`.
5. **Typing.** The figure being typed is shown as typed, keeping the point and trailing zeros. It holds at most 15 digits; every digit counts except a single 0 before the point. A 16th shows "15 digits maximum". "." first gives "0.". Keys with nothing to act on do nothing and show no message: a second point, extra leading zeros, Backspace with nothing to delete, ± on 0.
6. **Correcting.**
   - Backspace edits only the figure being typed; deleting the last digit leaves 0. On a result or a recalled value it does nothing.
   - Delete (clear entry) resets the figure being typed to 0, and on a result starts a new calculation at 0. Escape (clear) clears the whole calculation. Neither touches the tape.
   - A second operator replaces the first. ± while typing flips that figure.
7. **After a result.**
   - Repeated = repeats the last operation; each press is a tape line (`8 + 3 = 11`).
   - An operator continues from the result (5 = then + 2 = gives 7, on its own line).
   - A digit, point, paste or recall starts a new calculation, which forgets the last operation.
   - = with no operator (`5 =`) or straight after one (`2 + =`) does nothing.
   - ± on a result flips it, keeps its ≈ and writes no line; the next operator continues from it.
8. **Errors.**
   - The messages are "Cannot divide by zero" (x ÷ 0, 0 ÷ 0), "Number too large" (rounded size ≥ 1e100) and "Number too small" (non-zero rounded size < 1e-99, never shown as 0).
   - There is one error state, and it writes no tape line. Escape, Delete, a digit, the point, paste and recall leave it by starting a new calculation. Operators, =, ± and Backspace do nothing.
9. **Paste.**
   - One figure, via the browser's own paste; there is no paste button. Surrounding whitespace is trimmed.
   - £ $ € and spaces are stripped, and so are commas followed by exactly three digits. A leading -, + or − (U+2212) is accepted before or after the symbol (`-£5`, `£-5`).
   - Refused with the figure left unchanged:
     - unreadable, or tabs or line breaks inside: "Couldn't read that as a number"
     - not valid UK/US style (`1.234,56`, `1,23`): "Unclear which mark is the decimal point"
     - brackets: "Use a minus sign for negative numbers"
     - over 15 digits: "15 digits maximum"
   - A refused paste in the error state leaves the error in place. An accepted paste lands where a recall does (10) and can be edited with Backspace.
10. **Recall.**
    - A click, or Enter or Space, on a tape line recalls its final result as the full 34-digit value, with its ≈.
    - While a figure is being typed, it replaces that figure. After an operator, it becomes the next figure. After =, at the start or in an error, it starts a new calculation.
    - Backspace does not edit it; a digit replaces it. Recall replaces memory functions.
11. **Tape.**
    - One line per =, showing every step with its running result: `2 + 3 = 5 → × 4 = 20`. Newest last. Long lines wrap and are never cut off.
    - It is a real list. It is not persisted, because money figures should not be left on shared machines.
    - Emptying it: the first press relabels the control "Press again to empty". It reverts when focus leaves or any other key is pressed; there is no timer. It does nothing when the tape is empty. It works in the error state and leaves the error in place.
12. **Messages** (not errors) stay until the next key press, click or paste, with no timer. They are announced like a result.
13. **Keyboard.**
    - Keys: digits, `.`, `+ - * /`, Enter or `=` (equals), Escape (clear), Delete (clear entry), Backspace. The numpad works like the top row. ± has no key. No modifier shortcuts.
    - Enter and Space activate the focused control, keypad keys included. With nothing focused, Enter is =.
    - A mouse click on a keypad key leaves no focus. Typing any calculator key moves focus off the focused control.
14. **Accessibility.** Every action works without a mouse. Changes to the display (figure, running result with its operator, result, error, message) are announced. Keys with no effect announce nothing. Tested with VoiceOver on macOS Safari only.
15. **Layout.** Above 900px wide the tape is visible by default. At 900px and below it sits behind a "Show tape" / "Hide tape" toggle, closed by default. The tape is visually quiet. On-screen keys cover every action except paste, and are at least 44×44px down to 320px wide. No units or currency mode. The UI never says "precision" or "floating point".
16. **Not implemented** (stories with criteria): editing earlier tape lines, percent and tax mode, CSV export of the tape.
17. **Product promise (verbatim tests).**
    - 0.1 + 0.2 shows exactly 0.3.
    - 1.005 × 100 shows exactly 100.5.
    - 0.1 × 3 shows exactly 0.3.
    - 100 ÷ 3 shows ≈ 33.3333333333333.
    - 100 ÷ 3 then × 3 shows ≈ 100.
    - 2 + 3 × 4 shows 20, and the expression line shows 5 × once × is pressed.
    - 5 ÷ 0 shows "Cannot divide by zero", and typing 7 afterwards shows 7.
    - A 16th digit of exactly 5 rounds up, for both a positive and a negative number.
18. **Stack.** Vite, React, TypeScript strict, decimal.js, Vitest + React Testing Library + jsdom. CSS Modules with no framework. No backend, env vars or keys. Runs locally on Node 20.19 or later from the README; a hosted link is optional.
