# User stories

The behaviour these stories describe is fixed by the Decisions section of `CLAUDE.md`; the story says which decisions it covers. Every story is **Not implemented** until its criteria pass in the running app.

Notation:
- Keys are written as pressed: `2 + 3 =`.
- "Display" is the main number.
- "Expression line" is the line above it.
- A message is a short notice that is not an error.
- Numbers shown on screen are in `code`.

---

## S-1 Type a figure

As an Everyday Calculator User, I want to type a number and see exactly what I typed, so that I know the calculator has the figure I meant.

- **Job:** J-1
- **Status:** Not implemented
- **Decisions:** 2, 5, 12

**Normal case**
- Given a fresh calculator, when I type `1234.50`, then the display shows `1234.50`, with no comma added.
- Given a fresh calculator, when I press `.` then `5`, then the display shows `0.5`.

**Invalid input**
- Given the display shows `1.5` being typed, when I press `.`, then the display stays `1.5` and no message appears.
- Given a fresh calculator showing `0`, when I press `0` three times, then the display stays `0`.

**Boundaries**
- Given I have typed `123456789012345` (15 digits), when I type `6`, then the display is unchanged and the message "15 digits maximum" appears.
- Given I have typed `0.12345678901234`, when I type `5`, then the display shows `0.123456789012345`, because the 0 before the point does not count toward the 15.
- Given the message "15 digits maximum" is showing, when I press any key, click a key or paste, then the message disappears and that input acts as normal.
- Given the message "15 digits maximum" is showing and I do nothing, when any amount of time passes, then the message is still showing.

**Very large and very small**
- Given a fresh calculator, when I type `999999999999999`, then the display shows `999999999999999` in plain notation.
- Given a fresh calculator, when I type `0.000000000000001`, then the display shows `0.000000000000001` exactly as typed, not in exponential form.

**After a result or an error**
- Given the display shows the result `5`, when I type `7`, then the display shows `7` and the expression line is empty.
- Given the display shows "Cannot divide by zero", when I type `7`, then the display shows `7`.

---

## S-2 Use the on-screen keys

As an Everyday Calculator User, I want every calculator action on a key I can tap or click, so that I can do a sum on a phone without a keyboard.

- **Job:** J-1
- **Status:** Not implemented
- **Decisions:** 6, 13, 15

**Normal case**
- Given a fresh calculator, when I tap `1`, `2`, `+`, `3`, `=`, then the display shows `15`.
- Given the calculator, when I look at the keys, then there is a key for each digit, `.`, `+`, `−`, `×`, `÷`, `=`, `±`, clear, clear entry and backspace.

**Invalid input**
- Given the display shows `5`, when I tap `±`, `=`, then the display shows `−5`, and `=` does nothing because there is no operator.

**Boundaries**
- Given any screen width down to 320px, when I look at the keys, then every key is at least 44 by 44 pixels and none overlap.
- Given I have clicked `7` with the mouse, when I press Enter, then Enter acts as `=` and does not type another 7.

**Very large and very small:** not applicable. The keys enter the same figures as typing, which S-1 covers.

**After a result or an error**
- Given the display shows "Cannot divide by zero", when I tap `C`, then the display shows `0`.

---

## S-3 Get exact answers to ordinary sums

As an Everyday Calculator User, I want decimal sums to come out exactly as they would on paper, so that I can trust the answer without checking it.

- **Job:** J-1
- **Status:** Not implemented
- **Decisions:** 1, 2, 17

**Normal case**
- Given a fresh calculator, when I enter `0.1 + 0.2 =`, then the display shows exactly `0.3` with no ≈.
- Given a fresh calculator, when I enter `1.005 × 100 =`, then the display shows exactly `100.5` with no ≈.
- Given a fresh calculator, when I enter `0.1 × 3 =`, then the display shows exactly `0.3` with no ≈.
- Given a fresh calculator, when I enter `7 − 10 =`, then the display shows `−3`.
- Given a fresh calculator, when I enter `1.5 ÷ 0.5 =`, then the display shows `3`.

**Invalid input**
- Given a fresh calculator, when I enter `5 ÷ 0 =`, then the display shows "Cannot divide by zero". S-9 covers the rest.

**Boundaries**
- Given a fresh calculator, when I enter `5 ± + 5 =`, then the display shows `0`, never `−0`.
- Given a fresh calculator, when I enter `1.50 + 1.50 =`, then the display shows `3`. Results drop trailing zeros.

**Very large and very small**
- Given a fresh calculator, when I enter `999999999999999 × 999999999999999 =`, then the display shows `≈ 9.99999999999998 × 10²⁹`.
- Given a fresh calculator, when I enter `0.000000000000001 × 0.000000000000001 =`, then the display shows `1 × 10⁻³⁰` with no ≈.

**After a result or an error**
- Given `0.1 + 0.2 =` shows `0.3`, when I enter `+ 0.1 =`, then the display shows exactly `0.4`.

---

## S-4 See the order operations run in

As an Everyday Calculator User, I want to see the running result as soon as I press an operator, so that I understand the answer before I reach it.

- **Job:** J-1
- **Status:** Not implemented
- **Decisions:** 4, 6, 7, 17

**Normal case**
- Given a fresh calculator, when I enter `2 + 3 ×`, then the expression line shows `5 ×`.
- Given that state, when I enter `4 =`, then the display shows `20`.

**Invalid input**
- Given a fresh calculator, when I enter `2 + ×`, then the expression line shows `2 ×`, because the second operator replaces the first.
- Given that state, when I enter `4 =`, then the display shows `8`.

**Boundaries**
- Given the expression line shows `2 +` and nothing has been typed since, when I press `=`, then nothing changes and no tape line is written.
- Given a fresh calculator, when I type `5` and press `=`, then nothing changes and no tape line is written.

**Very large and very small**
- Given a fresh calculator, when I enter `999999999999999 × 999999999999999 ×`, then the expression line shows `≈ 9.99999999999998 × 10²⁹ ×`.

**After a result or an error**
- Given a fresh calculator, when I enter `5 ÷ 0 +`, then the display shows "Cannot divide by zero" as soon as `+` is pressed, because the division runs then.

---

## S-5 Know when a number is not exact

As a Desk Checker, I want any number that is not the exact answer to carry a ≈, so that I never pass on a rounded figure believing it is exact.

- **Job:** J-3
- **Status:** Not implemented
- **Decisions:** 1, 2, 3, 17

**Normal case**
- Given a fresh calculator, when I enter `100 ÷ 3 =`, then the display shows `≈ 33.3333333333333`.
- Given that result, when I enter `× 3 =`, then the display shows `≈ 100`.
- Given a fresh calculator, when I enter `2 ÷ 3 =`, then the display shows `≈ 0.666666666666667`.
- Given a fresh calculator, when I enter `100 ÷ 3 ×`, then the expression line shows `≈ 33.3333333333333 ×`.

**Invalid input:** not applicable. ≈ is a property of results, not something the user enters.

**Boundaries**
- Given a fresh calculator, when I enter `123456789012345 + 0.5 =`, then the display shows `≈ 123,456,789,012,346`. A 16th digit of exactly 5 rounds up.
- Given a fresh calculator, when I enter `123456789012345 ± − 0.5 =`, then the display shows `≈ −123,456,789,012,346`. Half up rounds away from zero.
- Given a fresh calculator, when I enter `123456789012345 + 0.4 =`, then the display shows `≈ 123,456,789,012,345`.
- Given a fresh calculator, when I enter `99999999999999.9 + 0 =`, then the display shows `99,999,999,999,999.9` with no ≈.
- Given a fresh calculator, when I enter `100 ÷ 3 × 0 =`, then the display shows `≈ 0`, because ≈ carries until a new calculation starts.
- Given the display shows `≈ 33.3333333333333`, when I press `±`, then it shows `≈ −33.3333333333333`.

**Very large and very small**
- Given a fresh calculator, when I enter `1 ÷ 3 ÷ 1000000000 =`, then the display shows `≈ 3.33333333333333 × 10⁻¹⁰`.

**After a result or an error**
- Given the display shows `≈ 100`, when I enter `2 + 2 =`, then the display shows `4` with no ≈.
- Given the display shows "Cannot divide by zero", when I type `4`, then the display shows `4` with no ≈.

---

## S-6 Work with very large and very small numbers

As a Desk Checker, I want very large and very small results shown in a readable form or refused outright, so that I am never shown a number that has quietly lost its size.

- **Job:** J-3
- **Status:** Not implemented
- **Decisions:** 2, 8

**Normal case**
- Given a fresh calculator, when I enter `999999999999999 + 1 =`, then the display shows `1 × 10¹⁵` with no ≈.
- Given a fresh calculator, when I enter `1 ÷ 1000000000 =`, then the display shows `0.000000001` in plain notation.
- Given that result, when I enter `÷ 10 =`, then the display shows `1 × 10⁻¹⁰`.

**Invalid input:** not applicable. Typing is capped (S-1) and paste is checked (S-11), so very large or very small values can only arise as results.

**Boundaries**
- Given a fresh calculator, when I enter `999999999999999 + 0.5 =`, then the display shows `≈ 1 × 10¹⁵`. The rounded value decides the notation.
- Given `10000000000 × 10000000000 =` has shown `1 × 10²⁰`, when I press `=` seven more times, then the display shows `1 × 10⁹⁰`.
- Given that state, when I press `=` once more, then the display shows "Number too large" and no tape line is written.
- Given `0.000000001 × 0.000000001 =` has shown `1 × 10⁻¹⁸`, when I press `=` nine more times, then the display shows `1 × 10⁻⁹⁹`.
- Given that state, when I press `=` once more, then the display shows "Number too small", never `0`, and no tape line is written.
- Given an internal result that rounds to 1e100 at 15 digits, when it is shown, then the display shows "Number too large". This is checked at domain level.

**Very large and very small:** the whole story.

**After a result or an error**
- Given the display shows "Number too large", when I type `3`, then the display shows `3`.
- Given the display shows "Number too small", when I press `+`, then nothing changes.

---

## S-7 Correct the figure I am typing

As an Everyday Calculator User, I want to fix a slip in the figure I am typing without losing the rest of the sum, so that one wrong key does not cost me the whole calculation.

- **Job:** J-2
- **Status:** Not implemented
- **Decisions:** 5, 6

**Limit in this version:** only the figure being typed can be corrected. Once a figure is followed by an operator it has been folded into the running result and cannot be changed. The only way back is to start again. S-16 exists to close this gap.

**Normal case**
- Given I have typed `123`, when I press Backspace, then the display shows `12`.
- Given I have entered `5 + 12`, when I press Delete, type `3` and press `=`, then the display shows `8`.
- Given I have typed `12`, when I press `±`, then the display shows `−12`.
- Given I have entered `5 + 3`, when I press Escape, then the display shows `0`, the expression line is empty, and the tape is unchanged.

**Invalid input**
- Given the display shows `0` and nothing is being typed, when I press Backspace, then nothing changes and no message appears.
- Given the display shows `0`, when I press `±`, then the display stays `0`.
- Given I have entered `5 + 3 ×`, when I press Backspace, then nothing changes and the expression line still shows `8 ×`. The 3 has already been folded in.

**Boundaries**
- Given I have typed `7`, when I press Backspace, then the display shows `0`.
- Given I have typed `5 ±` (showing `−5`), when I press Backspace, then the display shows `0`, not `−`.
- Given I have typed `1.50`, when I press Backspace, then the display shows `1.5`.

**Very large and very small**
- Given I have typed 15 digits, when I press Backspace and type another digit, then the digit is accepted with no message.
- Given I have typed `0.000000000000001`, when I press Backspace, then the display shows `0.00000000000000`.

**After a result or an error**
- Given the display shows the result `5`, when I press Backspace, then nothing changes.
- Given the display shows the result `5`, when I press Delete, then the display shows `0` and a new calculation starts.
- Given the display shows "Cannot divide by zero", when I press Backspace, then nothing changes.
- Given the display shows "Cannot divide by zero", when I press Delete, then the display shows `0`.

---

## S-8 Keep going from a result

As an Everyday Calculator User, I want to build on an answer I already have, so that I do not retype it to take the next step.

- **Job:** J-1
- **Status:** Not implemented
- **Decisions:** 7, 11

**Normal case**
- Given `5 + 3 =` shows `8`, when I press `=`, then the display shows `11` and the tape gains the line `8 + 3 = 11`.
- Given `2 + 3 =` shows `5`, when I enter `+ 2 =`, then the display shows `7` and the tape gains the line `5 + 2 = 7`.
- Given `2 + 3 =` shows `5`, when I type `9`, then the display shows `9` and the expression line is empty.
- Given that state, when I press `=`, then nothing changes, because a new calculation forgets the last operation.
- Given `2 + 3 =` shows `5`, when I press `±` then enter `+ 1 =`, then the display shows `−4` and the `±` itself wrote no tape line.

**Invalid input**
- Given the result `5` is showing, when I enter `+ =`, then nothing changes after the `+`.

**Boundaries**
- Given the result is `0`, when I press `±`, then the display stays `0`.
- Given `100 ÷ 3 =` shows `≈ 33.3333333333333`, when I press `±`, then the display shows `≈ −33.3333333333333`.

**Very large and very small**
- Given `999999999999999 × 999999999999999 =`, when I press `=` four more times, then each press adds a tape line.
- Given that state, when I press `=` a fifth time, then the display shows "Number too large", no line is added, and the earlier lines remain.

**After a result or an error**
- Given the display shows "Number too large", when I press `=`, then nothing changes.

---

## S-9 Get out of an error

As an Everyday Calculator User, I want a clear message when a sum cannot be done and an obvious way to carry on, so that I am never stuck.

- **Job:** J-1
- **Status:** Not implemented
- **Decisions:** 8, 17

**Normal case**
- Given a fresh calculator, when I enter `5 ÷ 0 =`, then the display shows "Cannot divide by zero".
- Given that state, when I type `7`, then the display shows `7`.
- Given a fresh calculator, when I enter `0 ÷ 0 =`, then the display shows "Cannot divide by zero".

**Invalid input**
- Given the display shows "Cannot divide by zero", when I press `+`, `−`, `×`, `÷`, `=`, `±` or Backspace, then nothing changes.
- Given the display shows "Cannot divide by zero", when I look at the tape, then it has no new line.

**Boundaries**
- Given the display shows "Cannot divide by zero":
  - when I press Escape, then the display shows `0`
  - when I press Delete, then the display shows `0`
  - when I press `.`, then the display shows `0.`
  - when I paste `12`, then the display shows `12`
  - when I recall a tape line, then the display shows that line's result
- Given I left the error by typing `7`, when I press `=`, then nothing changes, because a new calculation has started.

**Very large and very small**
- Given the display shows "Number too large" or "Number too small", when I try each key above, then it behaves exactly like "Cannot divide by zero".

**After a result or an error:** the whole story.

---

## S-10 Do everything from the keyboard

As a Desk Checker, I want to do every part of a calculation from the keyboard, so that I can check figures at speed without reaching for the mouse.

- **Job:** J-3
- **Status:** Not implemented
- **Decisions:** 13, 14

**Normal case**
- Given a fresh calculator, when I type `12.5*4` and press Enter, then the display shows `50`.
- Given a fresh calculator, when I type the same thing on the numpad and press numpad Enter, then the display shows `50`.
- Given a fresh calculator, when I type `12.5*4=`, then the display shows `50`.
- Given a calculation is in progress:
  - when I press Escape, then it clears
  - when I press Delete, then the figure being typed resets to `0`
  - when I press Backspace, then the last digit is removed
- Given I press Tab until the `±` key has focus, when I press Enter or Space, then the sign of the figure flips.
- Given any on-screen control, when I press Tab repeatedly, then I can reach it and activate it with Enter or Space. This includes the tape toggle, the empty-tape control and each tape line.

**Invalid input**
- Given a fresh calculator, when I press a letter, `,` or Space with nothing focused, then nothing changes.
- Given a fresh calculator, when I press a key with Ctrl, Cmd or Alt held, then the calculator does nothing and the browser's own shortcut runs.

**Boundaries**
- Given the `7` key has keyboard focus, when I press Enter, then `7` is typed.
- Given the `7` key has keyboard focus, when I type `3` and then press Enter, then `3` is typed and Enter acts as `=`, because typing moved focus off the key.
- Given I clicked `7` with the mouse, when I press Enter, then Enter acts as `=`.
- Given a tape line has focus, when I press Enter, then that line is recalled rather than `=` being pressed.
- Given I hold down `9`, when the key repeats, then digits are added up to 15 and then "15 digits maximum" appears.

**Very large and very small:** not applicable. The keyboard enters the same figures as the keys, which S-1 covers.

**After a result or an error**
- Given the display shows "Cannot divide by zero", when I press Enter, then nothing changes.
- Given that state, when I type `4`, then the display shows `4`.

---

## S-11 Paste a figure from a spreadsheet or email

As a Desk Checker, I want to paste a figure with its currency symbol and separators still attached, so that I use it exactly as sent without retyping it.

- **Job:** J-5
- **Status:** Not implemented
- **Decisions:** 5, 9, 12

**Normal case**
- Given a fresh calculator, when I paste:
  - `£1,234.56`, then the display shows `1234.56`
  - `  42` followed by a line break, then the display shows `42`
  - `$1,000,000`, then the display shows `1000000`
  - `-£5`, `£-5` or `−5` (true minus sign), then the display shows `−5`
  - `+3`, then the display shows `3`
  - `1 234`, then the display shows `1234`, because spaces are stripped
- Given I have entered `5 +`, when I paste `2` and press `=`, then the display shows `7`.
- Given I am typing `12`, when I paste `34`, then the display shows `34`.
- Given I pasted `12.5`, when I press Backspace, then the display shows `12.`.
- Given I pasted `£1,234.56`, when I press `+`, then the expression line shows `1,234.56 +`. Commas appear once the figure becomes a result.

**Invalid input.** Each of these leaves the display unchanged:
- Given a fresh calculator, when I paste `1.234,56`, `1,23` or `12,3456`, then the message "Unclear which mark is the decimal point" appears.
- Given a fresh calculator, when I paste `(1,234)`, then the message "Use a minus sign for negative numbers" appears.
- Given a fresh calculator, when I paste `abc`, `5+3`, `¥500`, an empty clipboard, or `12` and `34` separated by a tab or a line break, then the message "Couldn't read that as a number" appears.

**Boundaries**
- Given a fresh calculator, when I paste `123,456,789,012,345`, then the display shows `123456789012345`.
- Given a fresh calculator, when I paste `1,234,567,890,123,456`, then the display is unchanged and "15 digits maximum" appears.
- Given a fresh calculator, when I paste `1,234`, then the display shows `1234`. This relies on the UK/US assumption.
- Given a refusal message is showing, when I press any key, click or paste, then it disappears.

**Very large and very small**
- Given a fresh calculator, when I paste `0.000000000000001`, then the display shows it as pasted.
- Given a fresh calculator, when I paste `0.0000000000000001`, then "15 digits maximum" appears.

**After a result or an error**
- Given the result `5` is showing, when I paste `9`, then a new calculation starts with `9`.
- Given the display shows "Cannot divide by zero", when I paste `9`, then the display shows `9`.
- Given the display shows "Cannot divide by zero", when I paste `abc`, then the error stays and "Couldn't read that as a number" also appears.

---

## S-12 See the working on a tape

As a Desk Checker, I want every finished calculation written down with each step and its running result, so that I can find the step where a total went wrong.

- **Job:** J-4
- **Status:** Not implemented
- **Decisions:** 3, 7, 8, 11, 15

**Normal case**
- Given an empty tape, when I enter `2 + 3 × 4 =`, then the tape shows `2 + 3 = 5 → × 4 = 20`.
- Given that state, when I enter `12 + 8 =`, then a second line `12 + 8 = 20` appears below the first.
- Given an empty tape, when I enter `100 ÷ 3 × 3 =`, then the tape shows `100 ÷ 3 = ≈ 33.3333333333333 → × 3 = ≈ 100`.

**Invalid input**
- Given the tape, when I press `=` with nothing to do (`5 =`, `2 + =`) or an error occurs, then no line is written.

**Boundaries**
- Given the tape has lines, when I press Escape, Delete or `±` on a result, then the tape is unchanged.
- Given a window wider than 900px, when the page loads, then the tape is visible with no action needed.
- Given a window 900px wide or narrower, when the page loads, then the tape is hidden behind a closed "Show tape" toggle.
- Given that state, when I activate the toggle, then the tape shows and the toggle reads "Hide tape".
- Given the tape has lines, when I reload the page, then the tape is empty.

**Very large and very small**
- Given an empty tape, when I enter `10000000000 × 10000000000 =`, then the line shows `10,000,000,000 × 10,000,000,000 = 1 × 10²⁰`.
- Given a long line, when the tape is narrow, then the line wraps and nothing is cut off.

**After a result or an error**
- Given the tape has lines, when an error occurs, then the existing lines remain unchanged.

---

## S-13 Recall a result from the tape

As a Desk Checker, I want to bring an earlier result back into the sum I am doing, with every digit it really has, so that I carry it forward without retyping it or losing digits.

- **Job:** J-6
- **Status:** Not implemented
- **Decisions:** 1, 3, 10

**Normal case**
- Given the tape line `100 ÷ 3 = ≈ 33.3333333333333` and a cleared display, when I click that line, then the display shows `≈ 33.3333333333333`.
- Given that state, when I enter `× 3 =`, then the display shows `≈ 100`. Retyping `33.3333333333333 × 3 =` would give exactly `99.9999999999999`, which shows the full value was carried.
- Given the tape has lines, when I Tab into the tape, move between lines with the arrow keys and press Enter or Space, then that line's result is recalled.
- Given I am typing `12`, when I recall a line showing `20`, then the display shows `20` in place of `12`.
- Given I have entered `5 +`, when I recall a line showing `20` and press `=`, then the display shows `25`.

**Invalid input**
- Given a recalled `20`, when I press Backspace, then nothing changes.
- Given a recalled `20`, when I type `7`, then the display shows `7`.

**Boundaries**
- Given the tape is empty, when I Tab through the page, then there is no line to focus and nothing to recall.
- Given a line with an exact result, when I recall it, then it shows with no ≈.
- Given a recalled `≈ 33.3333333333333`, when I press `±`, then the display shows `≈ −33.3333333333333`.
- Given the tape is behind the toggle, when I open it and recall a line, then recall works the same.

**Very large and very small**
- Given the tape line `… = 1 × 10⁹⁰`, when I recall it and enter `× 10000000000 =`, then the display shows "Number too large".

**After a result or an error**
- Given the display shows "Cannot divide by zero", when I recall a line, then the error clears and a new calculation starts from that line's result.

---

## S-14 Empty the tape

As a Desk Checker, I want to empty the tape when I move on to a new set of figures, so that the working in front of me belongs only to the check I am doing.

- **Job:** J-8
- **Status:** Not implemented
- **Decisions:** 11, 13

**Normal case**
- Given the tape has lines, when I activate "Empty tape", then its label changes to "Press again to empty" and the tape is unchanged.
- Given that state, when I activate it again, then the tape is empty and the label returns to "Empty tape".

**Invalid input**
- Given the label reads "Press again to empty", when I press any other key, click elsewhere or move focus away, then the label returns to "Empty tape" and the tape is unchanged.

**Boundaries**
- Given the tape is empty, when I activate "Empty tape", then nothing changes.
- Given the label reads "Press again to empty", when any amount of time passes, then it still reads "Press again to empty". There is no timer.

**Very large and very small:** not applicable. This story does not deal with numbers.

**After a result or an error**
- Given the display shows a result or "Cannot divide by zero", when I empty the tape, then the display and calculation are unchanged.

---

## S-15 Use the calculator with a screen reader

As an Everyday Calculator User who uses a screen reader, I want to hear each figure, running result, answer and message as it appears, so that I can do a sum without seeing the screen.

- **Job:** J-1
- **Status:** Not implemented
- **Decisions:** 2, 3, 12, 14

**Normal case**
- Given VoiceOver is on and the calculator is fresh, when I type `12`, then I hear "12".
- Given that state, when I press `+`, then I hear "12 plus".
- Given that state, when I enter `3 =`, then I hear "15".
- Given VoiceOver is on and the calculator is fresh, when I enter `100 ÷ 3 =`, then I hear "approximately 33.3333333333333".
- Given the tape has lines, when I move into it, then VoiceOver reports a list with the number of items, and reads each line in full.

**Invalid input**
- Given VoiceOver is on, when an error occurs or a paste is refused, then I hear the error or the message.
- Given VoiceOver is on, when I press a key that has no effect, then nothing is announced.

**Boundaries**
- Given VoiceOver is on, when the display shows `−5`, then I hear "minus 5".

**Very large and very small**
- Given VoiceOver is on, when the display shows `1 × 10¹⁵`, then I hear "1 times 10 to the power 15".

**After a result or an error**
- Given I heard "Cannot divide by zero", when I type `7`, then I hear "7".

Manual check: VoiceOver on macOS Safari only. Automated tests check the roles, names and live regions, not speech.

---

## Not implemented in this version

These have full criteria so they are ready to build. Each reason is about scope, not importance.

## S-16 Correct an earlier step and have the rest recalculate

As a Desk Checker, I want to change a figure in an earlier tape line and have every result that depended on it recalculate, so that I fix the one wrong step instead of redoing the chain.

- **Job:** J-4. It also closes the gap J-2 leaves in S-7.
- **Status:** Not implemented
- **Reason:** It needs the tape to store operations instead of text, plus dependency tracking between lines. That is a second state machine and does not fit this version's time.

**Normal case**
- Given the line `2 + 3 = 5 → × 4 = 20`, when I edit the `3` to `4` and confirm, then the line reads `2 + 4 = 6 → × 4 = 24` and is marked "edited".
- Given a later line `20 + 1 = 21` that continued from that result, when the edit is confirmed, then it reads `24 + 1 = 25`.
- Given a later line that started a new calculation, when the edit is confirmed, then it is unchanged.
- Given a line that recalled the edited result, when the edit is confirmed, then it recalculates too.
- Given a tape line, when I use its "Edit" control by Tab and Enter or by click, then only its figures become editable. Operators cannot be changed.

**Invalid input**
- Given I am editing a figure, when I enter a 16th digit or a second point, then the same rules as typing apply (S-1).
- Given I am editing a figure, when I press Escape, then the edit is abandoned and the line is unchanged.

**Boundaries**
- Given I edit a divisor to `0`, when I confirm, then that line shows "Cannot divide by zero" and every line that depended on it shows the same error. No line is deleted.
- Given an edit removes the only inexact step, when it is confirmed, then ≈ disappears from that line and its dependents.

**Very large and very small**
- Given an edit makes a dependent result ≥ 1e100, when it is confirmed, then that line shows "Number too large".

**After a result or an error**
- Given the display holds the current calculation, when an earlier line is edited, then the display is unchanged.

## S-17 Add or remove a percentage or tax

As a Desk Checker, I want to add or take off a percentage and apply a set tax rate, so that I can check VAT, discounts and margins without working out the multiplier.

- **Job:** J-3
- **Status:** Not implemented
- **Reason:** Percent behaves differently from one calculator to the next, so it needs its own round of decisions before it can be built honestly.

**Normal case**
- Given a fresh calculator, when I enter `200 + 20 % =`, then the display shows `240`.
- Given a fresh calculator, when I enter `200 − 10 % =`, then the display shows `180`.
- Given a fresh calculator, when I enter `200 × 15 % =`, then the display shows `30`.
- Given a tax rate of 20 and a display of `100`, when I use "Add tax", then the display shows `120`.
- Given a tax rate of 20 and a display of `120`, when I use "Remove tax", then the display shows exactly `100`.
- Given a fresh calculator, when I enter `200 + 20 % =`, then the tape shows `200 + 20% (40) = 240`.

**Invalid input**
- Given a fresh calculator, when I type `50 %` with no operator, then nothing changes.
- Given I am setting the tax rate, when I enter a value below 0 or above 100, then it is refused with a message.

**Boundaries**
- Given a tax rate of 20 and a display of `100`, when I use "Remove tax", then the display shows `≈ 83.3333333333333`.
- Given a tax rate of 0, when I use "Add tax", then the value is unchanged.
- Given `200 + 0 % =`, then the display shows `200`.
- Given `200 + 100 % =`, then the display shows `400`.

**Very large and very small**
- Given a percentage pushes a result to ≥ 1e100, when it is applied, then the display shows "Number too large".

**After a result or an error**
- Given the display shows "Cannot divide by zero", when I press `%` or a tax control, then nothing changes.

## S-18 Export the tape as a CSV file

As a Desk Checker, I want to save the tape as a file, so that I can attach my working to the approval.

- **Job:** J-7
- **Status:** Not implemented
- **Reason:** A file download adds a second output format with its own quoting and number rules. It waits until the tape format has settled.

**Normal case**
- Given the tape has lines, when I use "Export CSV", then a file `tape.csv` downloads.
- The file has columns Line, Working, Result and Approximate, with one row per tape line in tape order.
- The file is UTF-8 with a byte-order mark, so ≈, × and ÷ survive opening in a spreadsheet.

**Invalid input**
- Given the tape is empty, when I use "Export CSV", then nothing downloads and the control says nothing to export.

**Boundaries**
- Given a line whose working starts with `−`, `+`, `=` or `@`, when it is exported, then the cell is written so that a spreadsheet treats it as text and never as a formula.
- Given a result with thousands commas, when it is exported, then the Result column holds plain digits with no commas, and Approximate holds `yes` or `no`.

**Very large and very small**
- Given a result of `1 × 10⁹⁰`, when it is exported, then the Result column holds `1E+90`.

**After a result or an error**
- Given an error is showing, when I export, then the file contains the tape as it stands and the error stays.
- Given I have exported, when I look at the tape, then it is unchanged.

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
| 8 Errors | S-6, S-9, S-12 |
| 9 Paste | S-11 |
| 10 Recall | S-13 |
| 11 Tape | S-8, S-12, S-14 |
| 12 Messages | S-1, S-11, S-15 |
| 13 Keyboard | S-2, S-10, S-14 |
| 14 Accessibility | S-10, S-15 |
| 15 Layout | S-2, S-12 |
| 16 Not implemented | S-16, S-17, S-18 |
| 17 Product promise | S-3, S-4, S-5, S-9 |
| 18 Stack | Not behaviour. It is checked by running the README, not by a story. |
