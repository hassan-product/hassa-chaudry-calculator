# App roles

There are two roles. Accessibility is not a third role. It is a requirement on both, so it appears in both sets of "must never" clauses.

## R-1 Everyday Calculator User

An Everyday Calculator User is someone midway through something else (shopping, splitting a bill, helping a child with homework) when a number comes up that they cannot do in their head. They have no training and no interest in how the calculator works, they are often on a phone, and they will mistype and press keys in orders that make no sense.

They can enter a sum by touch, mouse or keyboard, see the running result after each operator, correct what they are typing, read the answer, and reuse it in the next sum.

They must never:
- be shown a number as exact when it is not
- have a value rounded or cut without being able to tell
- have a key press or pasted value silently ignored or reinterpreted
- end up in an error they cannot leave without reloading the page
- need to understand how the arithmetic works in order to use it, or meet words like "precision" or "floating point"
- be unable to complete a sum because they use a keyboard only or a screen reader

### Where R-1's needs conflict with R-2's, and how it is resolved

- **One bare screen vs a tape always visible.** R-1 wants nothing but the number. R-2 wants the working on screen at all times. *Resolved:* the tape is always present but visually quiet. On a phone, where R-1 mostly is, it sits behind a toggle. R-1 gives up a perfectly bare screen on larger displays.
- **Tidy answers vs honest ones.** R-1 would rather see `100` than `≈ 100` after 100 ÷ 3 × 3. *Resolved in R-2's favour:* the ≈ stays, because a tidy wrong answer is the problem this product exists to fix. ≈ is the only signal, and it needs no explanation to be ignored safely.
- **Phone-calculator order vs adding-machine order.** Someone used to phone calculators may expect 2 + 3 × 4 to give 14. *Resolved in R-2's favour:* operations run as entered, giving 20. The cost to R-1 is reduced, not removed, by showing the running result (`5 ×`) as soon as an operator is pressed, so the rule is visible before the answer.

## R-2 Desk Checker

A Desk Checker is someone who works with money figures as part of their job: invoices, expense claims, quotes. The figures arrive from elsewhere, so they paste or retype them, often with currency symbols and thousands separators attached. They work keyboard-first and resent reaching for the mouse. They are not calculating to find an answer. They are calculating to check someone else's answer, so they care about seeing every step.

They can paste or type figures, including ones with currency symbols and separators, work entirely from the keyboard, see each finished calculation on a tape with its full chain and result, recall any tape result into a new calculation, and empty the tape when they are done.

They must never:
- be shown a number as exact when it is not, including a recalled tape value
- have a value rounded or cut without being able to tell
- have pasted input silently stripped, guessed at or misread; an ambiguous figure like `1.234,56` is refused, never interpreted
- end up in an error they cannot leave without reloading the page
- have to use a mouse for any action, or be unable to read the tape with a screen reader
- have their figures left in the browser for the next person at a shared desk

### Where R-2's needs conflict with R-1's, and how it is resolved

- **Tape always visible vs one bare screen.** *Resolved:* as above. R-2 gives up an always-visible tape on a phone, where it is one toggle away.
- **A tape that survives vs a shared machine.** R-2 would like their working back after a reload. *Resolved against it:* the tape is cleared on reload, because money figures left in a shared browser are a worse failure than lost working.
- **Correcting an earlier step vs a simple, predictable calculator.** R-2 would benefit most from editing a tape line and having everything after it recompute. *Not in this version:* it is written up as a Not implemented story. Until then R-2 recalls a line and redoes the steps after it.
- **Pasting any format vs never guessing.** Figures in European style (`1.234,56`) or with accounting brackets (`(1,234)`) are refused with a message, not converted. R-2 retypes those. This assumes UK/US number style.
