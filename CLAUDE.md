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
- `src/app/`: hooks wiring domain to UI. `src/ui/`: components, CSS Modules, tokens. `src/shared/`: types used by more than one layer; imports nothing.
- Dependencies point inwards only: `ui → app → domain`, and any layer may use `shared`. A test will enforce this.

## Arithmetic rule
- No user-facing arithmetic uses JS number operators, `Number()`, `parseFloat` or `toFixed`. Values are decimal.js `Decimal` (or strings) from input to display.
- Use one configured clone (`precision: 34`, `ROUND_HALF_UP`). Never mutate the global `Decimal`. JS numbers are fine for non-values (indexes, lengths, digit counts).

## Testing
- Vitest, React Testing Library, jsdom. Domain tests are table-driven and pure, and hold most of the coverage, including every boundary in Decisions.
- Hooks are tested with `renderHook`. UI is tested through role and label queries. Each story's Given/When/Then criteria map to tests, and the test name cites the story ID (`S-3: …`).
- Screen reader testing is manual, VoiceOver only, and the docs say so.

## Docs
- Roles, jobs and stories follow `.claude/skills/product-spec`. ADRs follow `.claude/skills/adr` and live in `docs/adr/`.
- The three required docs stay exactly where they are; extra files beside them are fine. Docs must be honest about what was built. A story is Implemented only if its criteria pass.

## Commits (standing rule)
- Commit at the end of each unit of work, never in one lump at the end. Push after every commit.
- Small commits. Subject under 60 characters. Body says why, not what. Reference the story ID where the work maps to one.
- Documents are committed before the code they specify. Never put docs and source in one commit.
- Tell the user each commit message as it is made. Never touch git config.

## Unspecified behaviour (standing rule)
Never stop to ask about unspecified behaviour. Decide it with these, in order: (1) the must-never clauses in `docs/app-roles.md`; (2) act on what is showing on screen rather than guessing; (3) a key with nothing to act on does nothing. Add the choice to Decisions and list it at the end of the reply so the user can overrule it. Stop only when two written decisions directly contradict each other.

## Decisions (frozen; anything added later is listed to the user when added. **Changed** marks a reversal.)
1. **Maths.** decimal.js, 34 significant digits. Round half up everywhere, internal and display; for negatives that is away from zero (−2.5 → −3). No fractions.
2. **Display.** Results are rounded to 15 significant digits. Plain notation unless the *rounded* value is ≥ 1e15 or < 1e-9 in size, then `1.5 × 10¹⁵`, read "1.5 times 10 to the power 15". Results (display after =, running result, tape, memory) get thousands commas; a figure being typed or pasted is plain digits. Results drop trailing zeros. Negatives use a true minus (−), read "minus". Never negative zero.
3. **≈** shows whenever the number on screen may not be the exact answer: the display cut digits, or any step was rounded at 34 digits. It carries through the calculation, sign change, recall and memory until a new calculation starts (memory keeps it until MC), so 100 ÷ 3 × 0 shows `≈ 0`. It appears on the display, expression line, tape and M indicator, read "approximately".
4. **Order.** Each operation runs as entered: 2 + 3 × 4 = 20. On an operator the expression line shows the running result (`2 + 3 ×` → `5 ×`); after a power `≈ 9.99999999999998 × 10²⁹ ×` (UX may change spacing and size, not characters). After = it shows the last step (`5 × 4 =`); in an error, the failed step (`5 ÷ 0 =`). An operator on a fresh calculator acts on the 0 showing (`0 +`).
5. **Typing.** The figure being typed is shown as typed, keeping point and trailing zeros. Backspace removes the last character typed, digit or point (`12.` → `12`). At most 15 digits, every digit counting except a single 0 before the point; a 16th shows "15 digits maximum". "." first gives "0.". Keys with nothing to act on do nothing, with no message: a second point, extra leading zeros, Backspace with nothing to delete, +/− on 0.
6. **Correcting.** Backspace edits only the figure being typed; deleting its last character leaves 0; on a result or recalled value it does nothing. Delete (clear entry) resets the figure being typed to 0, and on a result starts a new calculation at 0. Escape (clear) clears the calculation. Neither touches the tape or memory. A second operator replaces the first. +/− while typing flips that figure. With an operator pending and nothing typed, +/− and Delete do nothing. Delete on a recalled value gives 0 and keeps the pending operator.
7. **After a result.** Repeated = repeats the last operation, each a tape line (`8 + 3 = 11`). An operator continues from the result (5 = + 2 = gives 7, own line). A digit, point, paste, recall or MR starts a new calculation, forgetting the last operation. = with no operator (`5 =`) or straight after one (`2 + =`) does nothing. +/− on a result flips it, keeps ≈, writes no line.
8. **Errors.** "Cannot divide by zero" (x ÷ 0, 0 ÷ 0), "Number too large" (rounded size ≥ 1e100), "Number too small" (non-zero rounded size < 1e-99, never 0). One error state, no tape line. Escape, Delete, a digit, the point, paste, recall and MR leave it by starting a new calculation; operators, =, +/−, Backspace, M+ and M− do nothing; MC works.
   - **Fault** (a bug throws anyway): "Something went wrong inside the calculator. It was not caused by anything you entered. Your tape is kept. Press C or Escape to start again." C or Escape resets the calculation and keeps tape and memory; every other input does nothing. Announced like an error. Never needs a reload.
9. **Paste.** One figure via the browser's own paste, no paste button; surrounding whitespace trimmed. £ $ € and spaces stripped, and commas followed by exactly three digits. Leading -, + or − accepted before or after the symbol (`-£5`, `£-5`). Refused with the figure unchanged: unreadable, or tabs/line breaks inside, "Couldn't read that as a number"; not UK/US style (`1.234,56`, `1,23`) "Unclear which mark is the decimal point"; brackets "Use a minus sign for negative numbers"; over 15 digits "15 digits maximum". A refused paste in an error leaves the error. An accepted paste lands where a recall does and can be edited with Backspace.
10. **Recall.** A click, or Enter or Space, on a tape line recalls its final result as the full 34-digit value with its ≈. While typing it replaces the figure; after an operator it is the next figure; after =, at the start or in an error it starts a new calculation. Backspace does not edit it; a digit replaces it.
11. **Tape.** One line per =, every step with its running result: `2 + 3 = 5 → × 4 = 20`. Newest last; long lines wrap, never cut. An ordered list with an explicit `role="list"` (CSS can strip list semantics in Safari). Not persisted; the browser keeping the page in memory on Back is not persistence. Emptying: first press relabels "Press again to empty"; reverts when focus leaves or another key is pressed, no timer; does nothing when empty; works in an error and leaves it. Emptying the tape does not clear memory.
12. **Messages** (not errors) stay until the next key press, click or paste, no timer, announced like a result.
13. **Keyboard.** Digits, `.`, `+ - * /` on the top row and the numpad; Enter, numpad Enter, `=` and the Apple numpad `=` are equals; Escape and the Apple numpad Clear are clear; Delete is clear entry; Backspace. A character that needs Shift (`*`, `+`) counts as that character. The numpad decimal key is the point whatever character it reports. With Num Lock off, the browser's reported key is followed (navigation keys do nothing). No shortcuts with Ctrl, Cmd or Alt. +/− and the memory keys have no key: Tab to them. Enter and Space activate the focused control; with nothing focused, Enter is =. A mouse click on a key leaves no focus; typing a calculator key moves focus off a focused control.
14. **Accessibility.** Every action works without a mouse. Display changes (figure, running result with its operator, result, error, message) are announced politely; the expression line is not live. The M indicator is announced as "memory" and its total. Keys with no effect announce nothing. Tested with VoiceOver on macOS Safari only; that check includes the tape being read as a list.
15. **Layout.** Direction C, "Ledger", flipped: calculator left, tape right; visual, Tab and screen-reader order calculator first. Above 900px the calculator column is never narrower than 480px (30rem) and the tape takes the rest; at 900px and below the same calculator fills the width minus safe margins (at most 40rem, centred), with the tape behind a "Show tape" / "Hide tape" toggle, closed by default, between readout and keypad. The tape is quiet: results in a right-hand column aligned on the point, ≈ in its own column, line numbers, characters unchanged. An empty tape shows only "Finished calculations appear here". No units or currency mode. The UI never says "precision" or "floating point". Visual source of truth: `docs/ux/mockup.html` and its tokens; if the app and that file disagree, one of them is a bug.
   - **Keypad**, six rows of four, no empty cells, clear spacing: `MC MR M− M+` / `C CE ⌫ ÷` / `7 8 9 ×` / `4 5 6 −` / `1 2 3 +` / `+/− 0 . =`. All keys the same size and shape. Memory row in a quieter style. **Changed:** the five operators down the right take the accent colour, = strongest (previously = was the only accent key). The sign key is labelled `+/−`, named "change sign", with a "Change sign" tooltip on hover.
   - **Keys.** Labels at least 24px (1.5rem), centred. Keyboard legends sit in their own row at the bottom of the key, clear of the label, and show only on devices with a mouse and hover. Every key at least 44px at 320px wide. On a short window keys get shorter, never narrower (not below 44px), and the page scrolls. Hover changes the label colour as well as the fill; pressed and focused each have their own look; focus is a ring, never colour alone. Every hover and pressed pairing passes WCAG AA in both themes.
   - **Phones.** No separate build: the 900px-and-below layout. Keys do not double-tap zoom (`touch-action: manipulation`), and hover styles apply only on hover devices so none sticks after a tap. Only 320px in a desktop browser has been checked; no promise is made for phone browsers or landscape.
   - **Themes.** Light and dark follow `prefers-color-scheme`. No theme menu, no other theme.
15a. **Screen details.** With an operator pending, the display shows the running result. Figures on the expression line, tape and memory use result formatting. An error triggered by an operator ends the failed step with that operator (`5 ÷ 0 +`). In a fault the expression line is empty. Expression and message lines keep their height when empty; messages use text colour with a leading bar. The display steps down by length (≤12, ≤18, longer) but is never smaller than the key labels; past that it wraps, never cuts. An empty tape hides its heading and control; the region is still named "Tape". A new line scrolls the tape to show it. Spoken forms: ≈ "approximately", − "minus", × "times", ÷ "divided by", → "then", `× 10²⁹` "times 10 to the power 29"; keys are named with words.
16. **Not implemented** (stories with criteria): editing earlier tape lines, percent and tax (no % key), CSV export, sound.
17. **Product promise (verbatim tests).** 0.1 + 0.2 shows exactly 0.3. 1.005 × 100 shows exactly 100.5. 0.1 × 3 shows exactly 0.3. 100 ÷ 3 shows ≈ 33.3333333333333. 100 ÷ 3 then × 3 shows ≈ 100. 2 + 3 × 4 shows 20, and the expression line shows 5 × once × is pressed. 5 ÷ 0 shows "Cannot divide by zero", and typing 7 afterwards shows 7. A 16th digit of exactly 5 rounds up, positive and negative.
18. **Stack.** Vite, React, TypeScript strict, decimal.js, Vitest + React Testing Library + jsdom. CSS Modules, no framework. No backend, env vars or keys. Runs locally on Node 20.19+ from the README; a hosted link is optional.
19. **Memory. Changed:** memory was taken off the table; it is back, alongside the tape. The tape is the record of everything; memory holds one running total being built (three invoice totals added with M+, read with MR). The two original reasons, answered: recall brings back one value while memory keeps adding; and memory is no longer hidden state, because every M+ and M− writes a tape line and an M indicator shows while memory holds a value.
   - M+ adds the full internal value showing to memory; M− subtracts it. A ≈ value gives memory ≈ until MC. They leave the calculation as it is. Each writes a quiet tape line, `M+ 40, memory 95`; recalling that line brings back the memory total. A memory total that would be ≥ 1e100 or a non-zero size < 1e-99 gives the usual error, memory unchanged, no line.
   - MR behaves like recalling a tape line, including leaving an error. MC clears memory and works at any time. With memory empty, MR and MC do nothing. In an error M+ and M− do nothing; in a fault every memory key does nothing.
   - The M indicator (`M 95`, with ≈ when it has one) shows from the first M+ or M− until MC, even at 0. Memory survives C and Escape and is lost on reload.
   - Memory keys have no keyboard key: the usual shortcuts clash with the browser's (Ctrl+P, Ctrl+R). Cost: a keyboard user Tabs to them.
20. **Low vision.** Sizes in rem, so a larger browser default text size is followed. At 200% zoom nothing is cut off or overlaps. At 400% zoom it reflows to one column with no sideways scrolling.
