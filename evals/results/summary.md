# Eval results

- **Model:** `claude-sonnet-5-5`, through the Claude Code login (`claude -p`), for both the answers and the grading.
- **Run:** 2026-10-07, with `promptfoo@0.120.19`.
- **Threshold:** suites A and B pass with at most one failing case; suite C passes only with none.
- **Rubrics:** A passes a job when the need would still exist without this calculator and it names no app, screen or button (retype, message and write down are allowed). B passes criteria when each has a Given, a When and a Then that says what is seen, counting phrases the Decisions define as exact; correct, appropriate, gracefully, or wording the Decisions do not fix, still fail. C is unchanged.

## A. Job statement quality: PASS (7 of 7 cases)

| Case | Result | Why it failed |
|---|---|---|
| A1 shopper weighing an offer | pass |  |
| A2 splitting a bill | pass |  |
| A3 approving an expense claim | pass |  |
| A4 checking a supplier invoice | pass |  |
| A5 checking homework | pass |  |
| A6 awkward, a history list smuggled in | pass |  |
| A7 awkward, a copy button smuggled in | pass |  |

<details><summary>Answers</summary>

**A1 shopper weighing an offer**

```
When I'm standing at a supermarket shelf with a three-for-two offer and the queue is moving, I want to know whether the offer actually costs less than buying the single packs I need, so I can decide on the spot without overpaying.
```

**A2 splitting a bill**

```
When the bill arrives after a group meal where everyone ordered different amounts, I want to work out what each person owes including their fair share of the tip, so I can settle up quickly without anyone overpaying or underpaying.
```

**A3 approving an expense claim**

```
When a colleague submits an expense claim with many receipts for my approval, I want to confirm that the claimed amounts match the receipts and add up correctly, so I can approve the claim knowing the company is paying only what was actually spent.
```

**A4 checking a supplier invoice**

```
When I'm checking a supplier's invoice total before paying it, I want to confirm that the amounts add up correctly, so I can pay the right amount and avoid overpaying or underpaying.
```

**A5 checking homework**

```
When my child finishes a page of long-division homework, I want to confirm which answers are right and which are wrong, so I can help them fix mistakes and trust the work they hand in.
```

**A6 awkward, a history list smuggled in**

```
When I'm checking figures and need a number I worked out earlier, I want to bring that earlier result back into a new calculation, so I can carry on without re-working it or risking a copying mistake.
```

**A7 awkward, a copy button smuggled in**

```
When I have a figure I've worked out, I want to share it with my manager in an email, so I can report the result accurately without retyping it and risking a mistake.
```

</details>

## B. Criteria coverage: FAIL (0 of 4 cases)

| Case | Result | Why it failed |
|---|---|---|
| B1 recall from the tape | **fail** | Incomplete: - **Given** the tape is empty, **then** it shows only "Finished calculations appear here", and there is no line to recall. / Several criteria have no When clause, which the rubric requires. Examples: 'Given the tape is empty, then it shows only...'; 'Given a recalled value of more than 15 digits, then the 15-digit typing limit does not apply...'; 'Given a recalled result whose rounded size is ≥ 1e15 or < 1e-9, then it shows as...'; 'Given an error is showing, then the tape lines are unchanged...'. Some Thens also state outcomes that are not something seen, such as 'the 15-digit typing limit does not apply' and 'Only C or Escape is accepted'. Most other criteria are well formed and use the defined phrases such as 'nothing happens', 'a new calculation starts' and 'announced politely'. But the missing Whens mean not every criterion has a Given, a When and a Then. |
| B2 correct the figure being typed | **fail** | The Thens do not all say what is seen, and some state results that are wrong or whose wording is not fixed. (1) 'Given I have typed 12, press Backspace, type 3, press +, type 4 and press =, then the result is 15' is wrong. Backspace gives 1, typing 3 gives 13, and 13 + 4 = 17. (2) 'when I press +/−, then it flips, keeps any ≈, and writes no tape line' does not say what the display shows, and the '≈' wording is not fixed. (3) 'the tape line records only the corrected figures' does not say what the tape line shows. (4) 'I can then correct it with Backspace' and 'I can type another digit' describe ability, not something seen. (5) 'the calculation resets' and 'it replaces the recalled value' are loose, and the Thens that follow are not tied to a stated display. (6) 'Given I have typed `.`, then the display shows `0.`' has a Then with no When before it. These failures mean the criteria do not all meet the rubric. |
| B3 running total in memory | **fail** | Incomplete: - **Given** the user types 0.1, presses M+, C, types 0.2, presses M+, then MR, **Then** the display shows exactly 0.3. / Most criteria have a Given, a When and a Then, and the Thens state what is seen. Several bullets have no When, so they fail the rubric's Given/When/Then requirement. These are: 'Given a memory total of 1234.5, Then...'; 'Given the user types 0.1, presses M+, C, types 0.2, presses M+, then MR, Then...' (the actions sit inside the Given); 'Given the user presses Ctrl+P, Ctrl+R or any other shortcut, Then...'; 'Given the tape is emptied, Then...'; and 'Given the page is reloaded, Then...'. The wording of the Thens is otherwise concrete, with no 'correct', 'appropriate' or 'gracefully'. |
| B4 getting out of an error | **fail** | Incomplete: - Given a result of size ≥ 1e100, then the display shows "Number too large". Given a non-zero result of size < 1e-99, then it shows "Number too small" (never 0). / Most criteria have Given/When/Then with observable outcomes, but several fail the rubric. (1) Some bullets lack a When: 'Given a result of size ≥ 1e100, then the display shows...', 'Given any error, then the message is announced politely... and the calculator is in one error state', 'Given a fault (a bug throws), then...', the Boundaries bullets 'Given a result whose rounded size is exactly 1e100...' and 'Given a non-zero result whose rounded size is exactly 1e-99...', 'Given 5 ÷ 0 followed by a rounding...', and the Very large/small bullets 'Given 9.99999999999999 × 10⁹⁹-scale inputs...' and 'Given 1e-50 × 1e-50...' have no When. (2) Some Thens are not observable: 'the calculator is in one error state', 'the decision uses the rounded size' say nothing the user sees. (3) 'Every route out of an error or fault works with the keyboard alone, and with VoiceOver the error and the new value are each announced' has no Given/When/Then structure. (4) Some Thens state results whose wording the decisions may not fix, e.g. 'not a broken or infinite figure' is vague, and 'the usual error shows' is imprecise. Therefore the output does not meet the rubric. |

<details><summary>Answers</summary>

**B1 recall from the tape**

```
## Normal case

- **Given** a tape line `2 + 3 = 5 → × 4 = 20`, **when** I click it, or focus it and press Enter or Space, **then** its final result, 20, is recalled, not an earlier step such as 5.
- **Given** I have entered `7 +` and nothing else, **when** I recall the line above, **then** 20 is the next figure, and `=` shows 27.
- **Given** I am typing `12`, **when** I recall a line, **then** the recalled value replaces the typed figure.
- **Given** a result is showing after `=`, or the calculator is fresh, **when** I recall a line, **then** a new calculation starts with that value.
- **Given** a tape line `100 ÷ 3 = ≈ 33.3333333333333`, **when** I recall it, **then** the full 34-digit value comes back with its ≈, and the display shows `≈ 33.3333333333333`. **When** I then press `× 3 =`, **then** the display shows `≈ 100`.
- **Given** a recalled value that carries ≈, **when** I continue the calculation, **then** every later result in it shows ≈ until a new calculation starts.
- **Given** a memory line `M+ 40, memory 95`, **when** I recall it, **then** the memory total, 95, comes back.
- **Given** the tape holds several lines, **when** I Tab to the tape, **then** it is one Tab stop. Up and Down move between lines, Enter or Space recalls the focused line, and Tab leaves the tape.
- **Given** a recall, **when** it happens, **then** no new tape line is written and the tape is unchanged. The new display value is announced politely.

## Invalid input

- **Given** a recalled value is showing, **when** I press Backspace, **then** nothing happens and nothing is announced.
- **Given** a recalled value is showing, **when** I press a digit, **then** the digit replaces the recalled value and I am typing a new figure.
- **Given** an operator is pending and a recalled value is showing, **when** I press Delete, **then** the figure becomes 0 and the pending operator is kept.
- **Given** focus is in the tape, **when** I press Left or Right, **then** nothing happens. Outside the tape, every arrow key does nothing.
- **Given** the tape is empty, **then** it shows only "Finished calculations appear here", and there is no line to recall.
- **Given** a fault, **when** I click, or press Enter or Space on, a tape line, **then** nothing happens. Only C or Escape is accepted.

## Boundaries

- **Given** a recalled value of more than 15 digits, **then** the 15-digit typing limit does not apply, and the full 34-digit value is kept while the display shows 15 significant digits.
- **Given** a recalled result whose rounded size is ≥ 1e15 or < 1e-9, **then** it shows as `1.5 × 10¹⁵`, read "1.5 times 10 to the power 15". Otherwise it shows in plain notation with thousands commas.
- **Given** a recalled negative result, **when** I use it as the next figure, **then** it shows with a true minus (−), read "minus". Recalling a zero result shows 0, never negative zero.
- **Given** a recalled value, **when** I press +/−, **then** it flips and keeps its ≈.
- **Given** a recalled value, **when** I press an operator, **then** the expression line shows it in result formatting, such as `20 ×`.

## Very large and very small numbers

- **Given** a recalled result near 1e99, **when** I multiply it so the rounded size is ≥ 1e100, **then** the display shows "Number too large", with no tape line.
- **Given** a recalled result near 1e-99, **when** I divide it so the non-zero rounded size is < 1e-99, **then** the display shows "Number too small", never 0.
- **Given** a recalled result of 1e-99 or 1e99 exactly, **when** I recall it, **then** its full value comes back with no error.

## After a result

- **Given** I have recalled a value into `7 +`, **when** I press `=`, **then** the result is a new tape line showing every step.
- **Given** I have recalled a value after an `=`, **when** I press `=` again, **then** nothing is repeated, because a recall forgets the last operation.
- **Given** a recalled value is showing, **when** I press an operator, **then** the calculation continues from that value.
- **Given** a recalled value is showing, **when** I press Escape, **then** the calculation clears, and the tape and memory are kept.
- **Given** a recalled value is showing, **when** I recall another line, **then** the new value replaces it.

## After an error

- **Given** an error is showing, **when** I recall a tape line, **then** I leave the error and start a new calculation with the recalled value, with its ≈ if it had one.
- **Given** a recalled value caused an error, such as `5 ÷ 0`, **when** I press Escape, Delete, a digit, the point, paste, MR or recall, **then** a new calculation starts. Operators, `=`, +/− and Backspace do nothing.
- **Given** an error is showing, **then** the tape lines are unchanged and still recallable.
- **Given** a fault, **when** I press C or Escape, **then** the calculation resets, the tape and memory are kept, and tape lines can be recalled again.
```

**B2 correct the figure being typed**

```
## Normal case
- **Given** I have typed `123`, **when** I press Backspace (the ⌫ key or the Backspace key), **then** the display shows `12` as plain digits, and the change is announced politely.
- **Given** I have typed `12.`, **when** I press Backspace, **then** the display shows `12`.
- **Given** I have typed `1.50`, **when** I press Backspace, **then** the display shows `1.5`, as typed with no commas.
- **Given** I have typed `7`, **when** I press Backspace, **then** the display shows `0`.
- **Given** I have typed `12`, **when** I press +/−, **then** the display shows `−12`. Pressing +/− again shows `12`.
- **Given** I have typed `2 + 345`, **when** I press Delete (CE) and then type `6` and `=`, **then** the pending `+` is kept, the figure is replaced by `6`, and the result is `8`.
- **Given** I have typed `2 + 345`, **when** I press Escape or C, **then** the whole calculation clears to `0`, and the tape and memory are untouched.
- **Given** I have typed `12`, **when** I press Backspace, type `3`, press `+`, type `4` and press `=`, **then** the result is `15`, and the tape line records only the corrected figures.

## Invalid input
- **Given** a fresh calculator showing `0`, **when** I press Backspace or +/−, **then** nothing changes, with no message and nothing announced.
- **Given** I have typed `1.5`, **when** I press `.` again, **then** nothing changes, with no message.
- **Given** I have typed `0`, **when** I press `0` again, **then** the display still shows `0`, with no message.
- **Given** I have pressed `5 +` and typed nothing further, **when** I press +/− or Delete, **then** nothing changes and the pending operator is kept.
- **Given** I have typed `−0.5`, **when** I press Backspace, **then** the display shows `0.` with no minus sign, never negative zero.
- **Given** I have typed `−5`, **when** I press Backspace, **then** the display shows `0`, with no sign.

## Boundaries
- **Given** I have typed 15 digits, **when** I type a 16th, **then** the figure is unchanged and the message "15 digits maximum" shows. The message stays until my next key press, click or paste.
- **Given** that message is showing, **when** I press Backspace, **then** the message goes, the last digit is removed, and I can type another digit.
- **Given** I have typed `0.123456789012345` (15 digits, the single 0 before the point not counted), **when** I press Backspace, **then** the display shows `0.12345678901234`.
- **Given** I have typed `0.5`, **when** I press Backspace twice, **then** the display shows `0.` and then `0`. A third Backspace does nothing.
- **Given** I have typed `.`, **then** the display shows `0.`. **When** I press Backspace, **then** the display shows `0`.
- **Given** I have typed 15 digits, **when** I press Delete, **then** the figure resets to `0` and I can type a new 15-digit figure.

## Very large and very small numbers
- **Given** I have typed `999999999999999`, **when** I press Backspace, **then** the display shows `99999999999999` in plain digits, with no commas and no `× 10` notation.
- **Given** I have typed `0.000000000000001` (15 digits after the point), **when** I press Backspace, **then** the display shows `0.00000000000000` as typed, with trailing zeros kept and no `× 10` notation.
- **Given** I have typed `−999999999999999`, **when** I press +/−, **then** the display shows `999999999999999`, still within 15 digits.

## What the user can do after a result
- **Given** `2 + 3 =` has shown `5`, **when** I press Backspace, **then** nothing changes.
- **Given** that result, **when** I press Delete, **then** a new calculation starts at `0`, and the tape and memory are untouched.
- **Given** that result, **when** I type a digit, **then** a new calculation starts with that digit, and I can then correct it with Backspace.
- **Given** that result, **when** I press +/−, **then** it flips, keeps any ≈, and writes no tape line.
- **Given** I have recalled a tape line or MR, **when** I press Backspace, **then** nothing changes. **When** I press Delete, **then** the figure becomes `0` and any pending operator is kept. **When** I type a digit, **then** it replaces the recalled value.

## What the user can do after an error
- **Given** `5 ÷ 0 =` shows "Cannot divide by zero", **when** I press Backspace or +/−, **then** nothing changes and the error stays.
- **Given** that error, **when** I press Delete or Escape, **then** the error clears and a new calculation starts at `0`, with the tape and memory kept.
- **Given** that error, **when** I type `7`, **then** the display shows `7` and I can correct it with Backspace.
- **Given** a fault message is showing, **when** I press Backspace, Delete or +/−, **then** nothing changes. **When** I press C or Escape, **then** the calculation resets with the tape and memory kept.
```

**B3 running total in memory**

```
## Normal case

- **Given** memory is empty and 40 is showing, **When** the user presses M+, **Then** memory holds 40, the M indicator shows `M 40` and is announced as "memory" and its total, and the tape gets a quiet line `M+ 40, memory 40` with no `=`. The calculation is unchanged.
- **Given** the user adds three part totals of 40, 15 and 30.25 with M+, pressing C between them, **When** they press MR, **Then** the display shows 85.25 and the tape holds `M+ 40, memory 40`, `M+ 15, memory 55` and `M+ 30.25, memory 85.25`.
- **Given** memory holds 95, **When** the user types 40 and presses M−, **Then** memory is 55, the indicator shows `M 55`, and the tape gets `M− 40, memory 55`.
- **Given** a result such as 2 + 3 = 5 is showing, **When** M+ is pressed, **Then** 5 is added to memory and the display and expression line stay as they were.
- **Given** an operator is pending (`2 + 3 ×`, display 5), **When** M+ is pressed, **Then** the running result 5 is added, and the pending operator and expression line are unchanged.
- **Given** the user is typing `12.50`, **When** M+ is pressed, **Then** the display still shows `12.50` as typed, 12.5 is added, and the tape line reads `M+ 12.5, memory 12.5`.
- **Given** the user types 0.1, presses M+, C, types 0.2, presses M+, then MR, **Then** the display shows exactly 0.3.
- **Given** memory holds 85.25 and 100 − is entered, **When** the user presses MR then =, **Then** the result is 14.75. MR after an operator is the next figure.
- **Given** memory holds a value, **When** the user presses C or Escape, **Then** memory and the M indicator are unchanged.
- **Given** memory holds a value, **When** the user presses MC, **Then** memory is cleared, the M indicator disappears, and no tape line is written.
- **Given** the memory keys, **When** the user presses any keyboard key, **Then** none of them activates. They are reached by Tab, activated with Enter or Space, and named "memory clear", "memory recall", "memory minus" and "memory plus".
- **Given** a tape line `M+ 40, memory 95`, **When** the user clicks it or presses Enter or Space on it, **Then** the memory total 95 is recalled, not the 40.
- **Given** a memory total of 1234.5, **Then** the indicator and tape show `1,234.5` with thousands commas.

## Invalid input

- **Given** memory is empty, **When** the user presses MR or MC, **Then** nothing happens, with no message, no tape line and no announcement.
- **Given** an error is showing, **When** the user presses M+ or M−, **Then** nothing happens, and memory and the tape are unchanged.
- **Given** a fault is showing, **When** the user presses any memory key (MC included), **Then** nothing happens.
- **Given** the user presses Ctrl+P, Ctrl+R or any other shortcut, **Then** no memory action occurs. The browser handles the keys.

## Boundaries

- **Given** a fresh calculator showing 0, **When** the user presses M+ or M−, **Then** memory is set to 0, `M 0` shows, and the tape gets `M+ 0, memory 0` or `M− 0, memory 0`.
- **Given** memory holds 40 and 40 is showing, **When** M− is pressed, **Then** memory is 0, `M 0` stays visible until MC, and zero is never shown as negative.
- **Given** memory is empty and 10 is showing, **When** M− is pressed, **Then** memory is −10, the indicator shows `M −10` with a true minus (read "minus"), and the tape line is `M− 10, memory −10`.
- **Given** memory holds 999,999,999,999,999 and 1 is showing, **When** M+ is pressed, **Then** the total is exactly 1 × 10¹⁵ and is shown as `M 1 × 10¹⁵` with no ≈.
- **Given** the total is 5 × 10⁹⁹ after M+ with 4 × 10⁹⁹ showing, **When** M+ is pressed again with 4 × 10⁹⁹ showing, **Then** the total is 9 × 10⁹⁹ and is accepted, because 1e100 is the first rejected size.
- **Given** the tape is emptied, **Then** memory and the M indicator are unchanged and MR still works.

## Very large and very small numbers

- **Given** memory holds 5 × 10⁹⁹ and 5 × 10⁹⁹ is showing, **When** M+ is pressed, **Then** the total would reach 1e100, so "Number too large" shows, memory stays 5 × 10⁹⁹, no tape line is written, and the expression line shows `M+ 5 × 10⁹⁹`.
- **Given** memory holds 1.5 × 10⁻⁹⁹ and 1 × 10⁻⁹⁹ is showing, **When** M− is pressed, **Then** the total would be 5 × 10⁻¹⁰⁰, so "Number too small" shows, memory is unchanged and not set to 0, and no tape line is written.
- **Given** memory holds 1 × 10⁻⁹⁹ and 1 × 10⁻⁹⁹ is showing, **When** M− is pressed, **Then** the total is exactly 0 and is accepted, not an error.
- **Given** 100 ÷ 3 shows `≈ 33.3333333333333`, **When** M+ is pressed, **Then** memory holds the full 34-digit value, the indicator and the tape line show ≈ (read "approximately"), and ≈ stays on memory until MC, even after exact amounts such as 5 are added.
- **Given** memory holds ≈ 33.3333333333333, **When** MR is pressed then × 3 =, **Then** the result is `≈ 100`.
- **Given** memory held ≈ and MC was pressed, **When** 5 is added with M+, **Then** the indicator shows `M 5` with no ≈.

## After a result

- **Given** a result is showing and M+ was pressed, **When** the user presses a digit, the point or MR, **Then** a new calculation starts. **When** the user presses an operator or =, **Then** it continues or repeats as it would have without M+.
- **Given** a result is showing, **When** MR is pressed, **Then** a new calculation starts with the memory total, and the last operation is forgotten.
- **Given** the user is typing a figure, **When** MR is pressed, **Then** the memory total replaces that figure. Backspace then does nothing, a digit replaces it, and Delete gives 0 and keeps any pending operator.
- **Given** the memory total was recalled, **When** the user presses +/−, **Then** the total is flipped in the calculation only. Memory is unchanged.
- **Given** the page is reloaded, **Then** memory and the tape are both lost.

## After an error

- **Given** "Number too large" or "Number too small" was caused by M+ or M−, **When** the user presses Escape, Delete, a digit, the point, paste, recall or MR, **Then** a new calculation starts, and a typed 7 shows 7.
- **Given** that error is showing, **When** the user presses an operator, =, +/− or Backspace, **Then** nothing happens.
- **Given** that error is showing, **When** the user presses MR, **Then** the error is left and the unchanged memory total is recalled.
- **Given** an error is showing, **When** the user presses MC, **Then** memory is cleared and no tape line is written.
- **Given** a fault is showing ("Something went wrong inside the calculator. It was not caused by anything you entered. Your tape and memory are kept. Press C or Escape to start again."), **When** the user presses C or Escape, **Then** the calculation resets, the tape and the memory total are kept, and the M indicator and MR work again.
```

**B4 getting out of an error**

```
**Normal case**
- Given 5 ÷ 0, when I press =, then the display shows "Cannot divide by zero", the expression line shows `5 ÷ 0 =`, and no tape line is written.
- Given 0 ÷ 0, when I press =, then the display shows "Cannot divide by zero".
- Given 5 ÷ 0, when I press + instead of =, then the expression line shows `5 ÷ 0 +`.
- Given a result of size ≥ 1e100, then the display shows "Number too large". Given a non-zero result of size < 1e-99, then it shows "Number too small" (never 0).
- Given any error, then the message is announced politely, like a result, and the calculator is in one error state.
- Given a memory step that would take the total to ≥ 1e100 or a non-zero size < 1e-99, when I press M+ or M−, then the usual error shows, memory is unchanged, no tape line is written, and the expression line shows the failed step (`M+ 40`).

**Invalid input**
- Given an error, when I press an operator, =, +/−, Backspace, M+ or M−, then nothing changes and nothing is announced.
- Given an error, when I paste something refused (e.g. `abc`), then the error stays, with the refusal message for that paste (e.g. "Couldn't read that as a number").
- Given a fault (a bug throws), then the display shows "Something went wrong inside the calculator. It was not caused by anything you entered. Your tape and memory are kept. Press C or Escape to start again.", the expression line is empty, and it is announced like an error.
- Given a fault, when I press any key other than C or Escape (memory keys and MC included), then nothing happens.

**Boundaries**
- Given a result whose rounded size is exactly 1e100, then "Number too large" shows. Given one just under (rounded < 1e100), then the result shows normally.
- Given a non-zero result whose rounded size is exactly 1e-99, then it shows normally. Given one just under, then "Number too small" shows.
- Given 5 ÷ 0 followed by a rounding that makes a value land on the limit, then the decision uses the rounded size.
- Given an error, when I press a digit, the point, paste a valid figure, recall a tape line, or press MR (with memory held), then the error is left and a new calculation starts with that value.

**Very large and very small numbers**
- Given 9.99999999999999 × 10⁹⁹-scale inputs multiplied so the rounded size reaches 1e100, then "Number too large" shows, not a broken or infinite figure.
- Given 1e-50 × 1e-50 (size 1e-100), then "Number too small" shows, not 0.
- Given memory at a very large total, when M+ would push it to ≥ 1e100, then the error shows and memory keeps its old value and its M indicator.

**After a result / after an error**
- Given 5 ÷ 0 showing the error, when I type 7, then the display shows 7 as a new calculation.
- Given an error, when I press Escape or Delete, then a new calculation starts at 0.
- Given an error, when I press MC, then memory clears and the error stays; with memory empty, MC does nothing.
- Given an error, when I press MR, then the memory total becomes the new calculation's figure and the error is left.
- Given an error, when I click, or press Enter or Space on, a tape line, then its full value is recalled and a new calculation starts.
- Given an error, when I use the tape-emptying control, then the tape empties and the error is left; the tape and memory are otherwise untouched by the error.
- Given a fault, when I press C or Escape, then the calculation resets, the tape and memory are kept, and no reload is needed.
- Every route out of an error or fault works with the keyboard alone, and with VoiceOver the error and the new value are each announced.

**Categories left out**
- None; every category applies.
```

</details>

## C. Specification ambiguity: PASS (9 of 9 cases)

| Case | Result | Why it failed |
|---|---|---|
| C1 an operator pressed twice | pass |  |
| C2 equals three times | pass |  |
| C3 an operator during an error | pass |  |
| C4 a digit during an error | pass |  |
| C5 a decimal point twice | pass |  |
| C6 backspace on the last digit | pass |  |
| C7 paste while an operator is pending | pass |  |
| C8 MR during an error with memory held | pass |  |
| C9 MR with memory empty | pass |  |

<details><summary>Answers</summary>

**C1 an operator pressed twice**

```
The second operator replaces the first (Decision 6; Pending state: "operator, replaces operator"), so the pending operation becomes × instead of +. The display keeps showing the running result, 2, and the expression line shows `2 ×`. No tape line is written, since only = and memory keys write lines.
```

**C2 equals three times**

```
The display shows 14 after the third =. The first = gives 8 (tape line `5 + 3 = 8`), the second repeats the last operation (8 + 3 = 11) and the third does it again (11 + 3 = 14), each writing its own tape line (`8 + 3 = 11`, `11 + 3 = 14`), so three lines in total.
```

**C3 an operator during an error**

```
Nothing happens: in the error state, operators do nothing (Decision 8 and the Error → Error transition), so the display still shows "Cannot divide by zero". No tape line is written, since an error never writes one and this key press changes nothing.
```

**C4 a digit during an error**

```
The error is left by starting a new calculation (Decision 8; Error → Entering), so the display shows `7`, typed as a plain figure with no ≈ and no error message. No tape line is written, since only = and memory changes write lines, and a digit does neither.
```

**C5 a decimal point twice**

```
The display stays `1.5`, because a second point is a key with nothing to act on (Decision 5). It does nothing, with no message and no announcement, and no tape line is written since no `=` or memory key was pressed.
```

**C6 backspace on the last digit**

```
The display shows `0`, since deleting the last character of the figure being typed leaves 0 (Decision 6). The state stays Entering, and no tape line is written, because only = and memory keys write lines. Whether the display reads `0` or `0.` isn't a concern here: `0.` only arises when a point remains, as in `−0.5` → `0.`, and a lone 7 has no point.
```

**C7 paste while an operator is pending**

```
The accepted paste lands where a recall does, so from the Pending state it becomes the next figure (Pending → Entering). The display shows `2`, a plain-digit figure being typed, and the expression line stays `5 +`. No tape line is written, because that happens only on = (or a memory key), and nothing has been calculated yet.
```

**C8 MR during an error with memory held**

```
MR leaves the error by starting a new calculation (Decision 8, Decision 19, and the diagram's "Error → Recalled: MR with memory held"). The display shows the recalled memory total, 95, as the full 34-digit value with its ≈ if memory carries one (shown as plain "95" with no ≈ here, since nothing says it has one), and the error is gone. No tape line is written, since MR is a recall and only `=` and M+/M− write lines.
```

**C9 MR with memory empty**

```
Nothing happens: with memory empty, MR does nothing (Decision 19), so the display still shows 12 as typed, still editable with Backspace. No tape line is written, and no message or announcement is made.
```

</details>
