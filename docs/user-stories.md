# User stories

The behaviour these stories describe is fixed by the Decisions section of `CLAUDE.md`; the story says which decisions it covers. A story is **Implemented** only when every one of its criteria is shown by an automated test or by the manual check recorded below; otherwise it is **Not implemented**.

Notation:
- Keys are written as pressed: `2 + 3 =`.
- "Display" is the main number.
- "Expression line" is the line above it.
- A message is a short notice that is not an error.
- Numbers shown on screen are in `code`.
- `+/−` is the change-sign key (previously drawn as `±`).
- `AC-n.k` is acceptance criterion k of story S-n. IDs are fixed once given, like story IDs.

---

## Status

This table is the one record of each story's status; the Status line on each story matches it, and a fitness test fails if they ever disagree. 16 Implemented, 4 Not implemented.

Evidence, as of 2026-10-07: the automated tests (`npm test`), and a manual check by hand in Chrome on macOS, locally and on the hosted copy, and in a phone browser on the hosted copy. `docs/test-plan.md` writes that check up as steps anyone can repeat. A fault cannot be made by hand, so the fault criteria (AC-9.9 to AC-9.11, AC-19.8, AC-20.10) rest on the tests that run the whole app with a deliberately broken engine.

| ID | Title | Status | Reason |
|---|---|---|---|
| S-1 | Type a figure | Implemented |  |
| S-2 | Use the on-screen keys | Implemented |  |
| S-3 | Get exact answers to ordinary sums | Implemented |  |
| S-4 | See the order operations run in | Implemented |  |
| S-5 | Know when a number is not exact | Implemented |  |
| S-6 | Work with very large and very small numbers | Implemented |  |
| S-7 | Correct the figure I am typing | Implemented |  |
| S-8 | Keep going from a result | Implemented |  |
| S-9 | Get out of an error | Implemented |  |
| S-10 | Do everything from the keyboard | Implemented |  |
| S-11 | Paste a figure from a spreadsheet or email | Implemented |  |
| S-12 | See the working on a tape | Implemented |  |
| S-13 | Recall a result from the tape | Implemented |  |
| S-14 | Empty the tape | Implemented |  |
| S-15 | Use the calculator with a screen reader | Not implemented | VoiceOver has been checked for only three of its criteria (AC-15.1 to AC-15.3). |
| S-16 | Correct an earlier step and have the rest recalculate | Not implemented | It needs the tape to store operations instead of text, plus dependency tracking between lines: a second state machine that does not fit this version's time. |
| S-17 | Add or remove a percentage or tax | Not implemented | Percent behaves differently from one calculator to the next, so it needs its own round of decisions before it can be built honestly. |
| S-18 | Export the tape as a CSV file | Not implemented | A file download adds a second output format with its own quoting and number rules. It waits until the tape format has settled. |
| S-19 | Keep a running total in memory | Implemented |  |
| S-20 | Read the calculator at any size | Implemented |  |

Retired: ~~S-21 Hear each key press~~, on 2026-10-07; it will not be built.

---

## S-1 Type a figure

As an Everyday Calculator User, I want to type a number and see exactly what I typed, so that I know the calculator has the figure I meant.

- **Job:** J-1
- **Status:** Implemented
- **Decisions:** 2, 5, 12

### Acceptance criteria

**Normal case**
- **AC-1.1** Given a fresh calculator, when I type `1234.50`, then the display shows `1234.50`, with no comma added.
- **AC-1.2** Given a fresh calculator, when I press `.` then `5`, then the display shows `0.5`.

**Invalid input**
- **AC-1.3** Given the display shows `1.5` being typed, when I press `.`, then the display stays `1.5` and no message appears.
- **AC-1.4** Given a fresh calculator showing `0`, when I press `0` three times, then the display stays `0`.

**Boundaries**
- **AC-1.5** Given I have typed `123456789012345` (15 digits), when I type `6`, then the display is unchanged and the message "15 digits maximum" appears.
- **AC-1.6** Given I have typed `0.12345678901234`, when I type `5`, then the display shows `0.123456789012345`, because the 0 before the point does not count toward the 15.
- **AC-1.7** Given the message "15 digits maximum" is showing, when I press any key, click a key or paste, then the message disappears and that input acts as normal.
- **AC-1.8** Given the message "15 digits maximum" is showing and I do nothing, when any amount of time passes, then the message is still showing.

**Very large and very small**
- **AC-1.9** Given a fresh calculator, when I type `999999999999999`, then the display shows `999999999999999` in plain notation.
- **AC-1.10** Given a fresh calculator, when I type `0.000000000000001`, then the display shows `0.000000000000001` exactly as typed, not in exponential form.

**After a result or an error**
- **AC-1.11** Given the display shows the result `5`, when I type `7`, then the display shows `7` and the expression line is empty.
- **AC-1.12** Given the display shows "Cannot divide by zero", when I type `7`, then the display shows `7`.

---

## S-2 Use the on-screen keys

As an Everyday Calculator User, I want every calculator action on a key I can tap or click, so that I can do a sum on a phone without a keyboard.

- **Job:** J-1
- **Status:** Implemented
- **Decisions:** 6, 13, 15

### Acceptance criteria

**Normal case**
- **AC-2.1** Given a fresh calculator, when I tap `1`, `2`, `+`, `3`, `=`, then the display shows `15`.
- **AC-2.2** Given the calculator, when I look at the keys, then they are six rows of four with no empty cells: `MC MR M− M+`, `C CE ⌫ ÷`, `7 8 9 ×`, `4 5 6 −`, `1 2 3 +`, `+/− 0 . =`.
- **AC-2.3** Given the keypad, when I look at it, then every key is the same size and shape with clear space between keys, the memory row is in a quieter style, and `÷ × − + =` take the accent colour with `=` the strongest.
- **AC-2.4** Given a device with a mouse, when I look at `C`, `CE`, `⌫`, `÷`, `×`, `−`, `+` and `=`, then each shows its keyboard legend (Esc, Del, Bksp, /, *, -, +, Enter) in its own row at the bottom of the key, clear of the centred label.
- **AC-2.5** Given a device with a mouse, when I hover over `+/−`, then a tooltip reads "Change sign".

**Invalid input**
- **AC-2.6** Given the display shows `5`, when I tap `+/−`, `=`, then the display shows `−5`, and `=` does nothing because there is no operator.
- **AC-2.7** Given a touch screen, when I tap the same key twice quickly, then it counts as two presses and the page does not zoom.

**Boundaries**
- **AC-2.8** Given any screen width down to 320px, when I look at the keys, then every key is at least 44 by 44 pixels and none overlap.
- **AC-2.9** Given the default browser text size, when I look at the keys, then every key label is at least 24px.
- **AC-2.10** Given a window wider than 900px, when I look at the calculator, then its column is at least 480px wide and the tape takes the rest.
- **AC-2.11** Given a window too short for full-height keys, when I look at the keypad, then the keys are shorter but not narrower, never below 44px, and the page scrolls.
- **AC-2.12** Given a phone-width screen, when I look at the keypad, then it fills the width minus the safe margins and shows no keyboard legends.
- **AC-2.13** Given I have clicked `7` with the mouse, when I press Enter, then Enter acts as `=` and does not type another 7.
- **AC-2.14** Given a device with a mouse, when I hover over any key, then both its fill and its label colour change.
- **AC-2.15** Given any key, when I press it, then it shows a pressed look that differs from both hover and focus.
- **AC-2.16** Given a touch screen, when I tap a key and lift my finger, then no hover colour stays on that key.

**Very large and very small:** not applicable. The keys enter the same figures as typing, which S-1 covers.

**After a result or an error**
- **AC-2.17** Given the display shows "Cannot divide by zero", when I tap `C`, then the display shows `0`.

---

## S-3 Get exact answers to ordinary sums

As an Everyday Calculator User, I want decimal sums to come out exactly as they would on paper, so that I can trust the answer without checking it.

- **Job:** J-1
- **Status:** Implemented
- **Decisions:** 1, 2, 17

### Acceptance criteria

**Normal case**
- **AC-3.1** Given a fresh calculator, when I enter `0.1 + 0.2 =`, then the display shows exactly `0.3` with no ≈.
- **AC-3.2** Given a fresh calculator, when I enter `1.005 × 100 =`, then the display shows exactly `100.5` with no ≈.
- **AC-3.3** Given a fresh calculator, when I enter `0.1 × 3 =`, then the display shows exactly `0.3` with no ≈.
- **AC-3.4** Given a fresh calculator, when I enter `7 − 10 =`, then the display shows `−3`.
- **AC-3.5** Given a fresh calculator, when I enter `1.5 ÷ 0.5 =`, then the display shows `3`.

**Invalid input**
- **AC-3.6** Given a fresh calculator, when I enter `5 ÷ 0 =`, then the display shows "Cannot divide by zero". S-9 covers the rest.

**Boundaries**
- **AC-3.7** Given a fresh calculator, when I enter `5 +/− + 5 =`, then the display shows `0`, never `−0`.
- **AC-3.8** Given a fresh calculator, when I enter `1.50 + 1.50 =`, then the display shows `3`. Results drop trailing zeros.

**Very large and very small**
- **AC-3.9** Given a fresh calculator, when I enter `999999999999999 × 999999999999999 =`, then the display shows `≈ 9.99999999999998 × 10²⁹`.
- **AC-3.10** Given a fresh calculator, when I enter `0.000000000000001 × 0.000000000000001 =`, then the display shows `1 × 10⁻³⁰` with no ≈.

**After a result or an error**
- **AC-3.11** Given `0.1 + 0.2 =` shows `0.3`, when I enter `+ 0.1 =`, then the display shows exactly `0.4`.

---

## S-4 See the order operations run in

As an Everyday Calculator User, I want to see the running result as soon as I press an operator, so that I understand the answer before I reach it.

- **Job:** J-1
- **Status:** Implemented
- **Decisions:** 4, 6, 7, 17

### Acceptance criteria

**Normal case**
- **AC-4.1** Given a fresh calculator, when I enter `2 + 3 ×`, then the expression line shows `5 ×`.
- **AC-4.2** Given that state, when I enter `4 =`, then the display shows `20`.

**Invalid input**
- **AC-4.3** Given a fresh calculator, when I enter `2 + ×`, then the expression line shows `2 ×`, because the second operator replaces the first.
- **AC-4.4** Given that state, when I enter `4 =`, then the display shows `8`.

**Boundaries**
- **AC-4.5** Given the expression line shows `2 +` and nothing has been typed since, when I press `=`, then nothing changes and no tape line is written.
- **AC-4.6** Given a fresh calculator, when I type `5` and press `=`, then nothing changes and no tape line is written.

**Very large and very small**
- **AC-4.7** Given a fresh calculator, when I enter `999999999999999 × 999999999999999 ×`, then the expression line shows `≈ 9.99999999999998 × 10²⁹ ×`.

**After a result or an error**
- **AC-4.8** Given a fresh calculator, when I enter `5 ÷ 0 +`, then the display shows "Cannot divide by zero" as soon as `+` is pressed, because the division runs then.

---

## S-5 Know when a number is not exact

As a Desk Checker, I want any number that is not the exact answer to carry a ≈, so that I never pass on a rounded figure believing it is exact.

- **Job:** J-3
- **Status:** Implemented
- **Decisions:** 1, 2, 3, 17

### Acceptance criteria

**Normal case**
- **AC-5.1** Given a fresh calculator, when I enter `100 ÷ 3 =`, then the display shows `≈ 33.3333333333333`.
- **AC-5.2** Given that result, when I enter `× 3 =`, then the display shows `≈ 100`.
- **AC-5.3** Given a fresh calculator, when I enter `2 ÷ 3 =`, then the display shows `≈ 0.666666666666667`.
- **AC-5.4** Given a fresh calculator, when I enter `100 ÷ 3 ×`, then the expression line shows `≈ 33.3333333333333 ×`.

**Invalid input:** not applicable. ≈ is a property of results, not something the user enters.

**Boundaries**
- **AC-5.5** Given a fresh calculator, when I enter `123456789012345 + 0.5 =`, then the display shows `≈ 123,456,789,012,346`. A 16th digit of exactly 5 rounds up.
- **AC-5.6** Given a fresh calculator, when I enter `123456789012345 +/− − 0.5 =`, then the display shows `≈ −123,456,789,012,346`. Half up rounds away from zero.
- **AC-5.7** Given a fresh calculator, when I enter `123456789012345 + 0.4 =`, then the display shows `≈ 123,456,789,012,345`.
- **AC-5.8** Given a fresh calculator, when I enter `99999999999999.9 + 0 =`, then the display shows `99,999,999,999,999.9` with no ≈.
- **AC-5.9** Given a fresh calculator, when I enter `100 ÷ 3 × 0 =`, then the display shows `≈ 0`, because ≈ carries until a new calculation starts.
- **AC-5.10** Given the display shows `≈ 33.3333333333333`, when I press `+/−`, then it shows `≈ −33.3333333333333`.

**Very large and very small**
- **AC-5.11** Given a fresh calculator, when I enter `1 ÷ 3 ÷ 1000000000 =`, then the display shows `≈ 3.33333333333333 × 10⁻¹⁰`.

**After a result or an error**
- **AC-5.12** Given the display shows `≈ 100`, when I enter `2 + 2 =`, then the display shows `4` with no ≈.
- **AC-5.13** Given the display shows "Cannot divide by zero", when I type `4`, then the display shows `4` with no ≈.

---

## S-6 Work with very large and very small numbers

As a Desk Checker, I want very large and very small results shown in a readable form or refused outright, so that I am never shown a number that has quietly lost its size.

- **Job:** J-3
- **Status:** Implemented
- **Decisions:** 2, 8

### Acceptance criteria

**Normal case**
- **AC-6.1** Given a fresh calculator, when I enter `999999999999999 + 1 =`, then the display shows `1 × 10¹⁵` with no ≈.
- **AC-6.2** Given a fresh calculator, when I enter `1 ÷ 1000000000 =`, then the display shows `0.000000001` in plain notation.
- **AC-6.3** Given that result, when I enter `÷ 10 =`, then the display shows `1 × 10⁻¹⁰`.

**Invalid input:** not applicable. Typing is capped (S-1) and paste is checked (S-11), so very large or very small values can only arise as results.

**Boundaries**
- **AC-6.4** Given a fresh calculator, when I enter `999999999999999 + 0.5 =`, then the display shows `≈ 1 × 10¹⁵`. The rounded value decides the notation.
- **AC-6.5** Given `10000000000 × 10000000000 =` has shown `1 × 10²⁰`, when I press `=` seven more times, then the display shows `1 × 10⁹⁰`.
- **AC-6.6** Given that state, when I press `=` once more, then the display shows "Number too large" and no tape line is written.
- **AC-6.7** Given `0.000000001 × 0.000000001 =` has shown `1 × 10⁻¹⁸`, when I press `=` nine more times, then the display shows `1 × 10⁻⁹⁹`.
- **AC-6.8** Given that state, when I press `=` once more, then the display shows "Number too small", never `0`, and no tape line is written.
- **AC-6.9** Given an internal result that rounds to 1e100 at 15 digits, when it is shown, then the display shows "Number too large". This is checked at domain level.

**Very large and very small:** the whole story.

**After a result or an error**
- **AC-6.10** Given the display shows "Number too large", when I type `3`, then the display shows `3`.
- **AC-6.11** Given the display shows "Number too small", when I press `+`, then nothing changes.

---

## S-7 Correct the figure I am typing

As an Everyday Calculator User, I want to fix a slip in the figure I am typing without losing the rest of the sum, so that one wrong key does not cost me the whole calculation.

- **Job:** J-2
- **Status:** Implemented
- **Decisions:** 5, 6

**Limit in this version:** only the figure being typed can be corrected. Once a figure is followed by an operator it has been folded into the running result and cannot be changed. The only way back is to start again. S-16 exists to close this gap.

### Acceptance criteria

**Normal case**
- **AC-7.1** Given I have typed `123`, when I press Backspace, then the display shows `12`.
- **AC-7.2** Given I have entered `5 + 12`, when I press Delete, type `3` and press `=`, then the display shows `8`.
- **AC-7.3** Given I have typed `12`, when I press `+/−`, then the display shows `−12`.
- **AC-7.4** Given I have entered `5 + 3`, when I press Escape, then the display shows `0`, the expression line is empty, and the tape is unchanged.

**Invalid input**
- **AC-7.5** Given the display shows `0` and nothing is being typed, when I press Backspace, then nothing changes and no message appears.
- **AC-7.6** Given the display shows `0`, when I press `+/−`, then the display stays `0`.
- **AC-7.7** Given I have entered `5 + 3 ×`, when I press Backspace, then nothing changes and the expression line still shows `8 ×`. The 3 has already been folded in.

**Boundaries**
- **AC-7.8** Given I have typed `7`, when I press Backspace, then the display shows `0`.
- **AC-7.9** Given I have typed `5 +/−` (showing `−5`), when I press Backspace, then the display shows `0`, not `−`.
- **AC-7.10** Given I have typed `1.50`, when I press Backspace, then the display shows `1.5`.

**Very large and very small**
- **AC-7.11** Given I have typed 15 digits, when I press Backspace and type another digit, then the digit is accepted with no message.
- **AC-7.12** Given I have typed `0.000000000000001`, when I press Backspace, then the display shows `0.00000000000000`.

**After a result or an error**
- **AC-7.13** Given the display shows the result `5`, when I press Backspace, then nothing changes.
- **AC-7.14** Given the display shows the result `5`, when I press Delete, then the display shows `0` and a new calculation starts.
- **AC-7.15** Given the display shows "Cannot divide by zero", when I press Backspace, then nothing changes.
- **AC-7.16** Given the display shows "Cannot divide by zero", when I press Delete, then the display shows `0`.

---

## S-8 Keep going from a result

As an Everyday Calculator User, I want to build on an answer I already have, so that I do not retype it to take the next step.

- **Job:** J-1
- **Status:** Implemented
- **Decisions:** 7, 11

### Acceptance criteria

**Normal case**
- **AC-8.1** Given `5 + 3 =` shows `8`, when I press `=`, then the display shows `11` and the tape gains the line `8 + 3 = 11`.
- **AC-8.2** Given `2 + 3 =` shows `5`, when I enter `+ 2 =`, then the display shows `7` and the tape gains the line `5 + 2 = 7`.
- **AC-8.3** Given `2 + 3 =` shows `5`, when I type `9`, then the display shows `9` and the expression line is empty.
- **AC-8.4** Given that state, when I press `=`, then nothing changes, because a new calculation forgets the last operation.
- **AC-8.5** Given `2 + 3 =` shows `5`, when I press `+/−` then enter `+ 1 =`, then the display shows `−4` and the `+/−` itself wrote no tape line.

**Invalid input**
- **AC-8.6** Given the result `5` is showing, when I enter `+ =`, then nothing changes after the `+`.

**Boundaries**
- **AC-8.7** Given the result is `0`, when I press `+/−`, then the display stays `0`.
- **AC-8.8** Given `100 ÷ 3 =` shows `≈ 33.3333333333333`, when I press `+/−`, then the display shows `≈ −33.3333333333333`.

**Very large and very small**
- **AC-8.9** Given `999999999999999 × 999999999999999 =`, when I press `=` four more times, then each press adds a tape line.
- **AC-8.10** Given that state, when I press `=` a fifth time, then the display shows "Number too large", no line is added, and the earlier lines remain.

**After a result or an error**
- **AC-8.11** Given the display shows "Number too large", when I press `=`, then nothing changes.

---

## S-9 Get out of an error

As an Everyday Calculator User, I want a clear message when a sum cannot be done and an obvious way to carry on, so that I am never stuck.

- **Job:** J-1
- **Status:** Implemented
- **Decisions:** 8, 17, 19

### Acceptance criteria

**Normal case**
- **AC-9.1** Given a fresh calculator, when I enter `5 ÷ 0 =`, then the display shows "Cannot divide by zero".
- **AC-9.2** Given that state, when I type `7`, then the display shows `7`.
- **AC-9.3** Given a fresh calculator, when I enter `0 ÷ 0 =`, then the display shows "Cannot divide by zero".

**Invalid input**
- **AC-9.4** Given the display shows "Cannot divide by zero", when I press `+`, `−`, `×`, `÷`, `=`, `+/−`, Backspace, `M+` or `M−`, then nothing changes.
- **AC-9.5** Given the display shows "Cannot divide by zero", when I look at the tape, then it has no new line.

**Boundaries**
- **AC-9.6** Given the display shows "Cannot divide by zero":
  - when I press Escape, then the display shows `0`
  - when I press Delete, then the display shows `0`
  - when I press `.`, then the display shows `0.`
  - when I paste `12`, then the display shows `12`
  - when I recall a tape line, then the display shows that line's result
  - when I press `MR` with memory holding `95`, then the display shows `95`
  - when I press `MC`, then memory is cleared and the error stays
- **AC-9.7** Given I left the error by typing `7`, when I press `=`, then nothing changes, because a new calculation has started.

**Very large and very small**
- **AC-9.8** Given the display shows "Number too large" or "Number too small", when I try each key above, then it behaves exactly like "Cannot divide by zero".

**After a result or an error**
- **AC-9.9** Given a fault inside the calculator, when it happens, then the display shows "Something went wrong inside the calculator. It was not caused by anything you entered. Your tape and memory are kept. Press C or Escape to start again."
- **AC-9.10** Given the fault message is showing, when I tap `C` or press Escape, then the display shows `0`, and the tape and memory are unchanged.
- **AC-9.11** Given the fault message is showing, when I press any other key, paste, recall a line or use a memory key, then nothing changes.

---

## S-10 Do everything from the keyboard

As a Desk Checker, I want to do every part of a calculation from the keyboard, so that I can check figures at speed without reaching for the mouse.

- **Job:** J-3
- **Status:** Implemented
- **Decisions:** 13, 14, 19

### Acceptance criteria

**Normal case**
- **AC-10.1** Given a fresh calculator, when I type `12.5*4` and press Enter, then the display shows `50`.
- **AC-10.2** Given a fresh calculator, when I type the same thing on the numpad and press numpad Enter, then the display shows `50`.
- **AC-10.3** Given a fresh calculator, when I type `12.5*4=`, then the display shows `50`.
- **AC-10.4** Given a fresh calculator, when I type `12+3` using Shift for `+`, then the expression line shows `12 +` after the `+`, because a character that needs Shift counts as that character.
- **AC-10.5** Given an Apple keyboard with a numpad, when I press the numpad Clear key, then the calculation clears, as with Escape.
- **AC-10.6** Given an Apple keyboard with a numpad, when I type `2+3` and press the numpad `=`, then the display shows `5`.
- **AC-10.7** Given a calculation is in progress:
  - when I press Escape, then it clears
  - when I press Delete, then the figure being typed resets to `0`
  - when I press Backspace, then the last digit is removed
- **AC-10.8** Given I press Tab until the `+/−` key has focus, when I press Enter or Space, then the sign of the figure flips.
- **AC-10.9** Given I press Tab until `M+` has focus, when I press Enter or Space, then the value showing is added to memory. The memory keys have no keyboard key of their own.
- **AC-10.10** Given any on-screen control, when I press Tab repeatedly, then I can reach it and activate it with Enter or Space. This includes the tape toggle, the empty-tape control and each tape line.

**Invalid input**
- **AC-10.11** Given a fresh calculator, when I press a letter, `,` or Space with nothing focused, then nothing changes.
- **AC-10.12** Given a fresh calculator, when I press a key with Ctrl, Cmd or Alt held, then the calculator does nothing and the browser's own shortcut runs.
- **AC-10.13** Given Num Lock is off, when I press numpad keys that the browser reports as navigation keys, then the calculator does nothing.

**Boundaries**
- **AC-10.14** Given the `7` key has keyboard focus, when I press Enter, then `7` is typed.
- **AC-10.15** Given the `7` key has keyboard focus, when I type `3` and then press Enter, then `3` is typed and Enter acts as `=`, because typing moved focus off the key.
- **AC-10.16** Given I clicked `7` with the mouse, when I press Enter, then Enter acts as `=`.
- **AC-10.17** Given a tape line has focus, when I press Enter, then that line is recalled rather than `=` being pressed.
- **AC-10.18** Given I hold down `9`, when the key repeats, then digits are added up to 15 and then "15 digits maximum" appears.
- **AC-10.19** Given a keyboard whose numpad decimal key reports `,`, when I press it, then a decimal point is typed.
- **AC-10.20** Given I press Tab to any key or control, when it has focus, then a visible ring shows round it, not a change of colour alone.
- **AC-10.21** Given I keep pressing Tab, when focus reaches the last control, then the next Tab leaves the calculator. Focus is never trapped, including in the tape.

**Very large and very small:** not applicable. The keyboard enters the same figures as the keys, which S-1 covers.

**After a result or an error**
- **AC-10.22** Given the display shows "Cannot divide by zero", when I press Enter, then nothing changes.
- **AC-10.23** Given that state, when I type `4`, then the display shows `4`.

---

## S-11 Paste a figure from a spreadsheet or email

As a Desk Checker, I want to paste a figure with its currency symbol and separators still attached, so that I use it exactly as sent without retyping it.

- **Job:** J-5
- **Status:** Implemented
- **Decisions:** 5, 9, 12

### Acceptance criteria

**Normal case**
- **AC-11.1** Given a fresh calculator, when I paste:
  - `£1,234.56`, then the display shows `1234.56`
  - `  42` followed by a line break, then the display shows `42`
  - `$1,000,000`, then the display shows `1000000`
  - `-£5`, `£-5` or `−5` (true minus sign), then the display shows `−5`
  - `+3`, then the display shows `3`
  - `1 234`, then the display shows `1234`, because spaces are stripped
- **AC-11.2** Given I have entered `5 +`, when I paste `2` and press `=`, then the display shows `7`.
- **AC-11.3** Given I am typing `12`, when I paste `34`, then the display shows `34`.
- **AC-11.4** Given I pasted `12.5`, when I press Backspace, then the display shows `12.`.
- **AC-11.5** Given I pasted `£1,234.56`, when I press `+`, then the expression line shows `1,234.56 +`. Commas appear once the figure becomes a result.

**Invalid input.** Each of these leaves the display unchanged:
- **AC-11.6** Given a fresh calculator, when I paste `1.234,56`, `1,23` or `12,3456`, then the message "Unclear which mark is the decimal point" appears.
- **AC-11.7** Given a fresh calculator, when I paste `(1,234)`, then the message "Use a minus sign for negative numbers" appears.
- **AC-11.8** Given a fresh calculator, when I paste `abc`, `5+3`, `¥500`, an empty clipboard, or `12` and `34` separated by a tab or a line break, then the message "Couldn't read that as a number" appears.

**Boundaries**
- **AC-11.9** Given a fresh calculator, when I paste `123,456,789,012,345`, then the display shows `123456789012345`.
- **AC-11.10** Given a fresh calculator, when I paste `1,234,567,890,123,456`, then the display is unchanged and "15 digits maximum" appears.
- **AC-11.11** Given a fresh calculator, when I paste `1,234`, then the display shows `1234`. This relies on the UK/US assumption.
- **AC-11.12** Given a refusal message is showing, when I press any key, click or paste, then it disappears.

**Very large and very small**
- **AC-11.13** Given a fresh calculator, when I paste `0.000000000000001`, then the display shows it as pasted.
- **AC-11.14** Given a fresh calculator, when I paste `0.0000000000000001`, then "15 digits maximum" appears.

**After a result or an error**
- **AC-11.15** Given the result `5` is showing, when I paste `9`, then a new calculation starts with `9`.
- **AC-11.16** Given the display shows "Cannot divide by zero", when I paste `9`, then the display shows `9`.
- **AC-11.17** Given the display shows "Cannot divide by zero", when I paste `abc`, then the error stays and "Couldn't read that as a number" also appears.

---

## S-12 See the working on a tape

As a Desk Checker, I want every finished calculation written down with each step and its running result, so that I can find the step where a total went wrong.

- **Job:** J-4
- **Status:** Implemented
- **Decisions:** 3, 7, 8, 11, 15, 19

### Acceptance criteria

**Normal case**
- **AC-12.1** Given an empty tape, when I enter `2 + 3 × 4 =`, then the tape shows `2 + 3 = 5 → × 4 = 20`.
- **AC-12.2** Given that state, when I enter `12 + 8 =`, then a second line `12 + 8 = 20` appears below the first.
- **AC-12.3** Given an empty tape, when I enter `100 ÷ 3 × 3 =`, then the tape shows `100 ÷ 3 = ≈ 33.3333333333333 → × 3 = ≈ 100`.
- **AC-12.4** Given memory holds `55` and the display shows `40`, when I press `M+`, then the tape gains the quiet line `M+ 40, memory 95`.
- **AC-12.5** Given memory holds `95` and the display shows `20`, when I press `M−`, then the tape gains the quiet line `M− 20, memory 75`.
- **AC-12.6** Given the tape has lines, when a screen reader or the accessibility tree reads it, then it is a list, with an explicit list role whatever the styling does.

**Invalid input**
- **AC-12.7** Given the tape, when I press `=` with nothing to do (`5 =`, `2 + =`) or an error occurs, then no line is written.

**Boundaries**
- **AC-12.8** Given the tape has lines, when I press Escape, Delete or `+/−` on a result, then the tape is unchanged.
- **AC-12.9** Given a window wider than 900px, when the page loads, then the tape is visible with no action needed.
- **AC-12.10** Given a window 900px wide or narrower, when the page loads, then the tape is hidden behind a closed "Show tape" toggle.
- **AC-12.11** Given that state, when I activate the toggle, then the tape shows and the toggle reads "Hide tape".
- **AC-12.12** Given the tape has lines, when I reload the page, then the tape is empty.

**Very large and very small**
- **AC-12.13** Given an empty tape, when I enter `10000000000 × 10000000000 =`, then the line shows `10,000,000,000 × 10,000,000,000 = 1 × 10²⁰`.
- **AC-12.14** Given a long line, when the tape is narrow, then the line wraps and nothing is cut off.

**After a result or an error**
- **AC-12.15** Given the tape has lines, when an error occurs, then the existing lines remain unchanged.

---

## S-13 Recall a result from the tape

As a Desk Checker, I want to bring an earlier result back into the sum I am doing, with every digit it really has, so that I carry it forward without retyping it or losing digits.

- **Job:** J-6
- **Status:** Implemented
- **Decisions:** 1, 3, 10, 19

### Acceptance criteria

**Normal case**
- **AC-13.1** Given the tape line `100 ÷ 3 = ≈ 33.3333333333333` and a cleared display, when I click that line, then the display shows `≈ 33.3333333333333`.
- **AC-13.2** Given that state, when I enter `× 3 =`, then the display shows `≈ 100`. Retyping `33.3333333333333 × 3 =` would give exactly `99.9999999999999`, which shows the full value was carried.
- **AC-13.3** Given the tape has lines, when I Tab into the tape, move between lines with the arrow keys and press Enter or Space, then that line's result is recalled.
- **AC-13.4** Given I am typing `12`, when I recall a line showing `20`, then the display shows `20` in place of `12`.
- **AC-13.5** Given I have entered `5 +`, when I recall a line showing `20` and press `=`, then the display shows `25`.

**Invalid input**
- **AC-13.6** Given a recalled `20`, when I press Backspace, then nothing changes.
- **AC-13.7** Given a recalled `20`, when I type `7`, then the display shows `7`.

**Boundaries**
- **AC-13.8** Given the tape is empty, when I Tab through the page, then there is no line to focus and nothing to recall.
- **AC-13.9** Given a line with an exact result, when I recall it, then it shows with no ≈.
- **AC-13.10** Given the memory line `M+ 40, memory 95`, when I recall it, then the display shows `95`, the memory total on that line.
- **AC-13.11** Given the memory line `M+ ≈ 33.3333333333333, memory ≈ 33.3333333333333`, when I recall it, then the display shows `≈ 33.3333333333333`.
- **AC-13.12** Given a recalled `≈ 33.3333333333333`, when I press `+/−`, then the display shows `≈ −33.3333333333333`.
- **AC-13.13** Given the tape is behind the toggle, when I open it and recall a line, then recall works the same.

**Very large and very small**
- **AC-13.14** Given the tape line `… = 1 × 10⁹⁰`, when I recall it and enter `× 10000000000 =`, then the display shows "Number too large".

**After a result or an error**
- **AC-13.15** Given the display shows "Cannot divide by zero", when I recall a line, then the error clears and a new calculation starts from that line's result.

---

## S-14 Empty the tape

As a Desk Checker, I want to empty the tape when I move on to a new set of figures, so that the working in front of me belongs only to the check I am doing.

- **Job:** J-8
- **Status:** Implemented
- **Decisions:** 11, 13, 15a, 19

### Acceptance criteria

**Normal case**
- **AC-14.1** Given the tape has lines, when I activate "Empty tape", then its label changes to "Press again to empty" and the tape is unchanged.
- **AC-14.2** Given that state, when I activate it again, then the tape is empty and the label returns to "Empty tape".

**Invalid input**
- **AC-14.3** Given the label reads "Press again to empty", when I press any other key, click elsewhere or move focus away, then the label returns to "Empty tape" and the tape is unchanged.

**Boundaries**
- **AC-14.4** Given the tape is empty, when I look at it, then there is no "Empty tape" control to activate.
- **AC-14.5** Given memory holds `95`, when I empty the tape, then the M indicator still shows `M 95`.
- **AC-14.6** Given the label reads "Press again to empty", when any amount of time passes, then it still reads "Press again to empty". There is no timer.

**Very large and very small:** not applicable. This story does not deal with numbers.

**After a result or an error**
- **AC-14.7** Given the display shows a result or "Cannot divide by zero", when I empty the tape, then the display and calculation are unchanged.

---

## S-15 Use the calculator with a screen reader

As an Everyday Calculator User who uses a screen reader, I want to hear each figure, running result, answer and message as it appears, so that I can do a sum without seeing the screen.

- **Job:** J-1
- **Status:** Not implemented
- **Reason:** VoiceOver has been checked for only three of its criteria (AC-15.1 to AC-15.3).
- **Decisions:** 2, 3, 12, 14, 19

### Acceptance criteria

**Normal case**
- **AC-15.1** Given VoiceOver is on and the calculator is fresh, when I type `12`, then I hear "12".
- **AC-15.2** Given that state, when I press `+`, then I hear "12 plus".
- **AC-15.3** Given that state, when I enter `3 =`, then I hear "15".
- **AC-15.4** Given VoiceOver is on and the calculator is fresh, when I enter `100 ÷ 3 =`, then I hear "approximately 33.3333333333333".
- **AC-15.5** Given the tape has lines, when I move into it, then VoiceOver reports a list with the number of items, and reads each line in full.
- **AC-15.6** Given memory holds `95`, when the M indicator appears or changes, then I hear "memory 95".
- **AC-15.7** Given VoiceOver is on, when I move to the `+/−` key, then I hear "change sign".

**Invalid input**
- **AC-15.8** Given VoiceOver is on, when an error occurs or a paste is refused, then I hear the error or the message.
- **AC-15.9** Given VoiceOver is on, when I press a key that has no effect, then nothing is announced.

**Boundaries**
- **AC-15.10** Given VoiceOver is on, when the display shows `−5`, then I hear "minus 5".

**Very large and very small**
- **AC-15.11** Given VoiceOver is on, when the display shows `1 × 10¹⁵`, then I hear "1 times 10 to the power 15".

**After a result or an error**
- **AC-15.12** Given I heard "Cannot divide by zero", when I type `7`, then I hear "7".

Manual check: VoiceOver on macOS Safari only, including that the tape is still read as a list. Automated tests check the roles, names and live regions, not speech.

---

## S-19 Keep a running total in memory

As a Desk Checker, I want to add each part total into memory as I work it out and read the sum back at the end, so that I reach the overall figure without retyping any part.

- **Job:** J-9
- **Status:** Implemented
- **Decisions:** 3, 8, 11, 19

### Acceptance criteria

**Normal case**
- **AC-19.1** Given memory is empty and `120.5 + 30 =` shows `150.5`, when I press `M+`, then the display still shows `150.5`, the M indicator shows `M 150.5`, and the tape gains `M+ 150.5, memory 150.5`.
- **AC-19.2** Given that state, when I enter `75 × 2 =`, press `M+`, enter `9.99 × 3 =` and press `M+`, then the M indicator shows `M 330.47`.
- **AC-19.3** Given memory holds `330.47`, when I press `MR`, then the display shows `330.47` and a new calculation starts from it.
- **AC-19.4** Given memory holds `95` and the display shows `20`, when I press `M−`, then the M indicator shows `M 75` and the tape gains `M− 20, memory 75`.
- **AC-19.5** Given memory holds `75`, when I press `MC`, then the M indicator disappears and no tape line is written.

**Invalid input**
- **AC-19.6** Given memory is empty, when I press `MR` or `MC`, then nothing changes.
- **AC-19.7** Given the display shows "Cannot divide by zero", when I press `M+` or `M−`, then nothing changes and no tape line is written.
- **AC-19.8** Given the fault message is showing, when I press any memory key, then nothing changes.

**Boundaries**
- **AC-19.9** Given memory holds `5` and the display shows `5`, when I press `M−`, then the M indicator shows `M 0` and stays until `MC`.
- **AC-19.10** Given I am typing `1234.50`, when I press `M+`, then memory gains `1234.5`, the tape line reads `M+ 1,234.5, memory 1,234.5`, and the figure I am typing is unchanged.
- **AC-19.11** Given `5 +` is pending and the display shows the running result `5`, when I press `M+`, then memory gains `5` and the pending operator stays.
- **AC-19.12** Given `100 ÷ 3 =` shows `≈ 33.3333333333333`, when I press `M+`, then the M indicator shows `M ≈ 33.3333333333333`.
- **AC-19.13** Given memory has a ≈, when I add an exact `1` with `M+`, then memory keeps its ≈. Given I then press `MC` and `M+` an exact `1`, then the M indicator shows `M 1` with no ≈.
- **AC-19.14** Given memory holds `95`, when I press `C` or Escape, or empty the tape, then memory still holds `95`.
- **AC-19.15** Given memory holds `95`, when I reload the page, then memory is empty.

**Very large and very small**
- **AC-19.16** Given memory and a value whose sum rounds to 1e100 or more, when I press `M+`, then the display shows "Number too large", memory is unchanged and no tape line is written. This is checked at domain level.
- **AC-19.17** Given memory and a value whose difference is non-zero but smaller than 1e-99, when I press `M−`, then the display shows "Number too small", memory is unchanged and no tape line is written. This is checked at domain level.

**After a result or an error**
- **AC-19.18** Given the display shows "Cannot divide by zero" and memory holds `95`, when I press `MR`, then the display shows `95`.
- **AC-19.19** Given I pressed `M+` on the result `40`, when I type `7`, then a new calculation starts with `7`, as after any result.
- **AC-19.20** Given a keyboard user, when they press Ctrl+P or Ctrl+R, then the browser's own command runs and memory is unchanged. Memory keys are reached with Tab.

---

## S-20 Read the calculator at any size

As an Everyday Calculator User with weak eyesight, I want the figures and keys large and clear at any zoom or text size, so that I do not misread a digit.

- **Job:** J-11
- **Status:** Implemented
- **Decisions:** 2, 15, 15a, 20

### Acceptance criteria

**Normal case**
- **AC-20.1** Given the default browser text size, when I look at the calculator, then the display is the largest type on screen and every key label is at least 24px.
- **AC-20.2** Given a browser default text size larger than 16px, when I load the calculator, then every text size and key grows in proportion.
- **AC-20.3** Given a 1280px window at 200% zoom, when I use the calculator, then nothing is cut off or overlaps and every key can be reached.
- **AC-20.4** Given a 1280px window at 400% zoom, when I use the calculator, then it is one column with no sideways scrolling.
- **AC-20.5** Given light or dark set on the device, when I load the calculator, then it follows that setting and every text pairing passes WCAG AA.

**Invalid input:** not applicable. This story has no input of its own.

**Boundaries**
- **AC-20.6** Given a 320px wide screen, when the display shows `≈ 9.99999999999998 × 10²⁹`, then it wraps onto a second line rather than shrinking below the key labels, and nothing is cut off.
- **AC-20.7** Given a window just above 900px, when I look at the calculator, then its column is still at least 480px wide.
- **AC-20.8** Given a short window, when I look at the keypad, then keys are shorter but not narrower, never below 44px, and the page scrolls.

**Very large and very small**
- **AC-20.9** Given 400% zoom, when the display shows "Number too large", then the full text is readable, wrapped if needed.

**After a result or an error**
- **AC-20.10** Given 400% zoom, when the fault message shows, then all of its text is readable without sideways scrolling.

---

## Not implemented in this version

These have full criteria so they are ready to build. For S-16 to S-18 the reason is scope, not importance. S-21 is retired and kept struck through below.

## S-16 Correct an earlier step and have the rest recalculate

As a Desk Checker, I want to change a figure in an earlier tape line and have every result that depended on it recalculate, so that I fix the one wrong step instead of redoing the chain.

- **Job:** J-4. It also closes the gap J-2 leaves in S-7.
- **Status:** Not implemented
- **Reason:** It needs the tape to store operations instead of text, plus dependency tracking between lines. That is a second state machine and does not fit this version's time.

### Acceptance criteria

**Normal case**
- **AC-16.1** Given the line `2 + 3 = 5 → × 4 = 20`, when I edit the `3` to `4` and confirm, then the line reads `2 + 4 = 6 → × 4 = 24` and is marked "edited".
- **AC-16.2** Given a later line `20 + 1 = 21` that continued from that result, when the edit is confirmed, then it reads `24 + 1 = 25`.
- **AC-16.3** Given a later line that started a new calculation, when the edit is confirmed, then it is unchanged.
- **AC-16.4** Given a line that recalled the edited result, when the edit is confirmed, then it recalculates too.
- **AC-16.5** Given a tape line, when I use its "Edit" control by Tab and Enter or by click, then only its figures become editable. Operators cannot be changed.

**Invalid input**
- **AC-16.6** Given I am editing a figure, when I enter a 16th digit or a second point, then the same rules as typing apply (S-1).
- **AC-16.7** Given I am editing a figure, when I press Escape, then the edit is abandoned and the line is unchanged.

**Boundaries**
- **AC-16.8** Given I edit a divisor to `0`, when I confirm, then that line shows "Cannot divide by zero" and every line that depended on it shows the same error. No line is deleted.
- **AC-16.9** Given an edit removes the only inexact step, when it is confirmed, then ≈ disappears from that line and its dependents.

**Very large and very small**
- **AC-16.10** Given an edit makes a dependent result ≥ 1e100, when it is confirmed, then that line shows "Number too large".

**After a result or an error**
- **AC-16.11** Given the display holds the current calculation, when an earlier line is edited, then the display is unchanged.

## S-17 Add or remove a percentage or tax

As a Desk Checker, I want to add or take off a percentage and apply a set tax rate, so that I can check VAT, discounts and margins without working out the multiplier.

- **Job:** J-3
- **Status:** Not implemented
- **Reason:** Percent behaves differently from one calculator to the next, so it needs its own round of decisions before it can be built honestly.

### Acceptance criteria

**Normal case**
- **AC-17.1** Given a fresh calculator, when I enter `200 + 20 % =`, then the display shows `240`.
- **AC-17.2** Given a fresh calculator, when I enter `200 − 10 % =`, then the display shows `180`.
- **AC-17.3** Given a fresh calculator, when I enter `200 × 15 % =`, then the display shows `30`.
- **AC-17.4** Given a tax rate of 20 and a display of `100`, when I use "Add tax", then the display shows `120`.
- **AC-17.5** Given a tax rate of 20 and a display of `120`, when I use "Remove tax", then the display shows exactly `100`.
- **AC-17.6** Given a fresh calculator, when I enter `200 + 20 % =`, then the tape shows `200 + 20% (40) = 240`.

**Invalid input**
- **AC-17.7** Given a fresh calculator, when I type `50 %` with no operator, then nothing changes.
- **AC-17.8** Given I am setting the tax rate, when I enter a value below 0 or above 100, then it is refused with a message.

**Boundaries**
- **AC-17.9** Given a tax rate of 20 and a display of `100`, when I use "Remove tax", then the display shows `≈ 83.3333333333333`.
- **AC-17.10** Given a tax rate of 0, when I use "Add tax", then the value is unchanged.
- **AC-17.11** Given a fresh calculator, when I enter `200 + 0 % =`, then the display shows `200`.
- **AC-17.12** Given a fresh calculator, when I enter `200 + 100 % =`, then the display shows `400`.

**Very large and very small**
- **AC-17.13** Given a percentage pushes a result to ≥ 1e100, when it is applied, then the display shows "Number too large".

**After a result or an error**
- **AC-17.14** Given the display shows "Cannot divide by zero", when I press `%` or a tax control, then nothing changes.

## S-18 Export the tape as a CSV file

As a Desk Checker, I want to save the tape as a file, so that I can attach my working to the approval.

- **Job:** J-7
- **Status:** Not implemented
- **Reason:** A file download adds a second output format with its own quoting and number rules. It waits until the tape format has settled.

### Acceptance criteria

**Normal case**
- **AC-18.1** Given the tape has lines, when I use "Export CSV", then a file `tape.csv` downloads.
- **AC-18.2** Given the tape has lines, when I use "Export CSV", then the file has columns Line, Working, Result and Approximate, with one row per tape line in tape order.
- **AC-18.3** Given the tape has lines, when I use "Export CSV", then the file is UTF-8 with a byte-order mark, so ≈, × and ÷ survive opening in a spreadsheet.

**Invalid input**
- **AC-18.4** Given the tape is empty, when I use "Export CSV", then nothing downloads and the control says nothing to export.

**Boundaries**
- **AC-18.5** Given a line whose working starts with `−`, `+`, `=` or `@`, when it is exported, then the cell is written so that a spreadsheet treats it as text and never as a formula.
- **AC-18.6** Given a result with thousands commas, when it is exported, then the Result column holds plain digits with no commas, and Approximate holds `yes` or `no`.

**Very large and very small**
- **AC-18.7** Given a result of `1 × 10⁹⁰`, when it is exported, then the Result column holds `1E+90`.

**After a result or an error**
- **AC-18.8** Given an error is showing, when I export, then the file contains the tape as it stands and the error stays.
- **AC-18.9** Given I have exported, when I look at the tape, then it is unchanged.

---

## ~~S-21 Hear each key press~~

**Retired 2026-10-07.** It will not be built: its own reason said it would be built only once users asked for it. The ID is kept and not reused.

~~As a Desk Checker, I want a short sound when a key press registers, so that I can enter figures from paper without looking up to check each press.~~

- ~~**Job:** J-10~~
- ~~**Status:** Not implemented~~
- ~~**Reason:** It would be built only off by default, only once users ask for it, and only after testing alongside VoiceOver. Sound would have to be off by default in an office or beside a screen reader, so most people would never hear it. It competes with VoiceOver's speech. It behaves differently across devices: the iPhone silent switch can mute it, and browsers hold audio back until the first tap, and a feature that works on some devices and not others undermines trust. It can only be checked by ear, not by an automated test. And the need is already met by the display and the tape. See ADR 0009.~~

### ~~Acceptance criteria~~

~~**Normal case**~~
- ~~**AC-21.1** Given sound is switched on, when a key press changes the display, then one short click plays.~~
- ~~**AC-21.2** Given a fresh page, when it loads, then sound is off.~~

~~**Invalid input**~~
- ~~**AC-21.3** Given sound is on, when I press a key that has no effect, then no sound plays.~~
- ~~**AC-21.4** Given sound is on, when a figure is refused ("15 digits maximum") or an error shows, then a different, lower tone plays once.~~

~~**Boundaries**~~
- ~~**AC-21.5** Given a device whose silent switch is on, when I press keys with sound on, then nothing is heard and the calculator otherwise behaves exactly the same.~~
- ~~**AC-21.6** Given the browser holds audio until the first tap, when I switch sound on, then that switch counts as the first tap, so the next key press is heard.~~
- ~~**AC-21.7** Given VoiceOver is on, when a click plays, then it does not delay or cut off speech. Checked by ear only.~~

~~**Very large and very small:** not applicable. Sound does not depend on the number.~~

~~**After a result or an error**~~
- ~~**AC-21.8** Given sound is on and an error shows, when I type a digit to leave it, then the normal click plays.~~

---

## Decision coverage

| Decision | Covered by |
|---|---|
| 1 Maths | S-3, S-5, S-13 |
| 2 Display | S-1, S-3, S-5, S-6, S-15 |
| 3 ≈ | S-5, S-12, S-13, S-15 |
| 4 Order | S-4 |
| 5 Typing | S-1, S-7, S-11 |
| 6 Correcting | S-2, S-4, S-7 |
| 7 After a result | S-4, S-8, S-12 |
| 8 Errors | S-6, S-9, S-12, S-19 |
| 9 Paste | S-11 |
| 10 Recall | S-13 |
| 11 Tape | S-8, S-12, S-14 |
| 12 Messages | S-1, S-11, S-15 |
| 13 Keyboard | S-2, S-10, S-14 |
| 14 Accessibility | S-10, S-15 |
| 15 Layout | S-2, S-10, S-12, S-20 |
| 15a Screen details | S-14, S-20 |
| 16 Not implemented | S-16, S-17, S-18. S-21 was retired on 2026-10-07. |
| 17 Product promise | S-3, S-4, S-5, S-9 |
| 18 Stack | Not behaviour. It is checked by running the README, not by a story. |
| 19 Memory | S-9, S-10, S-12, S-13, S-14, S-15, S-19 |
| 20 Low vision | S-20 |
