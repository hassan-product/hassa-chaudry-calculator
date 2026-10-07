# Product brief

Roles, jobs and stories are in `app-roles.md`, `jobs-to-be-done.md` and `user-stories.md`. This brief covers what those do not: why the product exists, what it is not, and what is still unknown.

## The problem

When a calculator rounds its display, a correct answer and a slightly wrong one can look identical. For a quick sum that rarely matters. For someone about to approve an invoice, it means the number on screen cannot be trusted on its own. They either accept it on faith or rework it another way. The problem is not that arithmetic is hard. It is that the person cannot see whether the figure in front of them is exact, or how it was reached.

## What they would otherwise use, and why switch

The person checking money figures would otherwise use a spreadsheet. This calculator gives them three things for that particular check:

- **The working is written down as they go.** Every finished calculation lands on a tape with each step and its running result. There are no formulas to write and no cells to lay out, and nothing to reconstruct afterwards.
- **An honest mark on every number.** A number shown without ≈ is exactly the answer to what was entered. A number with ≈ was rounded somewhere, and the mark follows it through every later step, including a value brought back from the tape.
- **Figures go in as they arrive.** A figure copied with its £, $ or € and thousands commas can be pasted straight in. Anything that could be read two ways is refused with a reason, not interpreted. The whole thing works from the keyboard.

We make no claim about how any spreadsheet handles arithmetic. The case for switching rests only on the above.

## Why there is both a tape and memory

They do different jobs.

- **The tape** is the record of everything that happened. It shows where a number came from, and lets you bring any earlier result back.
- **Memory** holds one running total that you are building. For example, you work out the totals of three invoices one at a time, add each into memory with M+, and read the sum back with MR without retyping any of them.

Recalling tape lines one by one can reach the same total, but it takes more steps, and it is easy to miss one.

Memory was first taken off the table for two reasons. Both are now answered:

1. **"Recalling a tape line does the same job."** It does not. Recall brings back one value, while memory keeps adding.
2. **"A stored value nobody can see is hidden state."** It no longer is. Every M+ and M− writes a line on the tape, and an M indicator shows the total whenever memory holds a value.

## Who it is not for

- **Scientific or engineering work.** There are no powers, roots, functions or constants.
- **Anyone who needs brackets or precedence.** Operations run in the order entered, like an adding machine, so 2 + 3 × 4 is 20.
- **Anyone who needs a spreadsheet.** It does not store figures, name them, sum columns or keep anything after the page is closed.

## What success looks like

- A desk checker re-keys a ten-line invoice from the keyboard alone. When the total disagrees, they find the line that caused it from the tape without starting again.
- No number ever appears without ≈ unless it is exactly the answer to what was entered. Every product-promise case in the Decisions passes as a test.
- No input is silently dropped or guessed at. Every refusal says why, in plain words.
- No one is ever stuck. Every error can be left with one key, and nothing needs a reload.
- A VoiceOver user completes a sum, hears ≈ as "approximately", and can read the tape as a list.
- Someone with weak eyesight can use it at 200% zoom with nothing cut off, and at 400% zoom it reflows to one column with no sideways scrolling. Key labels are at least 24px, and a larger default text size set in the browser is followed. Low-vision support is in scope, not an extra.
- A reviewer clones the repository and runs it from the README with Node 20.19 or later and nothing else.

## Taken off the table, and why

- **Exact fractions.** The screen shows decimals regardless, so ≈ is needed anyway. Fractions add a lot of code for a case people rarely hit.
- **Precedence and brackets.** The adding-machine model matches how a desk checker works, and keeps the logic simple enough to trust.
- **Keeping the tape after a reload.** Money figures left in a shared browser are a worse failure than lost working.
- **Currency or units mode.** Plain numbers only. A unit price like 0.0125 must not be forced to two places.
- **European number formats and accounting brackets.** These are refused, not converted, because converting them would mean guessing.
- **A hosted service or backend.** Nothing leaves the browser.
- **Sound on key presses.** S-21 was retired on 2026-10-07, and J-10 with it. It would have had to be off by default in an office or beside a screen reader, so most people would never hear it; it competes with VoiceOver's speech; it behaves differently across devices, because the iPhone silent switch can mute it and browsers hold audio back until the first tap; it can only be checked by ear; and the display and the tape already confirm each key press. See ADR 0009.

## Roadmap for the cut stories, in build order

1. **S-16 Edit an earlier tape line.** This comes first because it closes the gap S-7 admits, and serves J-4 directly. It also requires the tape to store operations rather than text, which the next item builds on.
2. **S-18 Export the tape as CSV.** It is small once the tape format is settled by S-16, and serves J-7.
3. **S-17 Percent and tax.** It needs a fresh round of decisions on what percent means after each operator, and those decisions should not be rushed in alongside the others. There is no % key until then.

## Open questions, and the assumption we are running on

| Question | Assumption for now |
|---|---|
| Will users paste figures in styles other than UK/US, such as `1.234,56`? | UK/US only. Anything else is refused with "Unclear which mark is the decimal point". |
| Do finance users need accounting brackets `(1,234)` for negatives? | They will accept a minus sign. Brackets are refused with a message that says so. |
| Spaces are stripped from pasted figures, so `12 34` becomes 1234. Could that join two figures? | Users paste one figure at a time. Tabs and line breaks inside a paste are refused, which covers copying several cells at once. |
| Will R-1 be confused by `≈ 0` after, for example, 100 ÷ 3 × 0? | Honest beats tidy. The mark overstates the doubt but never claims something false. |
| Will R-1 expect 2 + 3 × 4 to give 14? | Some will. Showing the running result (`5 ×`) as soon as the operator is pressed makes the rule visible early enough. |
| Do 15 digits cover every money figure a desk checker meets? | Yes. Up to 9,999,999,999,999.99 fits, with pence. |
| Do all browsers deliver a paste to a page with no text field? | Yes. Safari is checked first, and if it does not, this becomes a build decision recorded as an ADR. |
| Do phone users need to paste? | No. There is no paste button. R-1 on a phone types. |
| Will other screen readers behave like VoiceOver on macOS Safari? | Probably, but untested. The docs say VoiceOver is the only one checked. |
| In exponential form the expression line shows two × signs (`≈ 9.99999999999998 × 10²⁹ ×`). How readable is it? | The characters are decided and stay. UX work may change spacing and type size only. |
| Phones have been checked only at 320px wide in a desktop browser. Will real phone browsers, and landscape, behave the same? | Unknown. The narrow layout and the touch safeguards are built in, but we make no promise for phone browsers or landscape until they have been tried on real devices. |
