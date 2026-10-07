# Eval results

- **Model:** `claude-sonnet-5-5`, through the Claude Code login (`claude -p`), for both the answers and the grading.
- **Run:** 2026-10-07, with `promptfoo@0.120.19`.
- **Threshold:** suites A and B pass with at most one failing case; suite C passes only with none.

## A. Job statement quality: FAIL (5 of 7 cases)

| Case | Result | Why it failed |
|---|---|---|
| A1 shopper weighing an offer | pass |  |
| A2 splitting a bill | pass |  |
| A3 approving an expense claim | pass |  |
| A4 checking a supplier invoice | pass |  |
| A5 checking homework | pass |  |
| A6 awkward, a history list smuggled in | **fail** | The underlying need, reusing a figure worked out earlier, could be met on paper. But the statement says 'retyping it by hand' and 'bring that earlier result back into a new calculation'. That implies a keyboard and a device's recall or memory feature, so it implies software rather than a need independent of any device. |
| A7 awkward, a copy button smuggled in | **fail** | The statement describes wanting to get an exact figure into a message to a manager without retyping, to avoid transcription mistakes. This implies copying and pasting between software (a calculator and a messaging app), so it implies a device-based interaction rather than a need that exists independent of software. 'Without retyping' and 'get that exact number into my message' presuppose a digital copy/transfer mechanism. A paper-based need would be simply writing the number down, and transcription errors could occur there too, but the phrasing is tied to a digital workflow. |

<details><summary>Answers</summary>

**A1 shopper weighing an offer**

```
When I'm standing in a supermarket aisle looking at a three-for-two offer, I want to know whether it works out cheaper than buying the single packs, so I can choose the better deal before the queue moves on.
```

**A2 splitting a bill**

```
When the bill arrives and everyone at the table ordered different amounts, I want to work out what each person owes including their fair share of the tip, so I can settle up quickly without anyone overpaying or underpaying.
```

**A3 approving an expense claim**

```
When a colleague submits an expense claim with a dozen receipts for my approval, I want to confirm that the amounts add up and each receipt is legitimate, so I can approve the claim knowing the company is paying exactly what was spent.
```

**A4 checking a supplier invoice**

```
When a supplier's invoice arrives for payment, I want to confirm that its total is correct, so I can pay the right amount and avoid overpaying or having to chase a correction later.
```

**A5 checking homework**

```
When my child hands me their finished long-division homework, I want to check whether each answer is right, so I can confirm what they got correct and help them fix what they got wrong.
```

**A6 awkward, a history list smuggled in**

```
When I'm checking figures and need a number I worked out earlier, I want to bring that earlier result back into a new calculation, so I can carry on without re-working it or retyping it by hand.
```

**A7 awkward, a copy button smuggled in**

```
When I have worked out a figure that my manager needs to see, I want to get that exact number into my message to them without retyping it, so I can report it quickly and without transcription mistakes.
```

</details>

## B. Criteria coverage: FAIL (0 of 4 cases)

| Case | Result | Why it failed |
|---|---|---|
| B1 recall from the tape | **fail** | Incomplete: - Given I am typing `5` and I recall a line, then the recalled value replaces the 5. / Many criteria are concrete (exact values like 33.33333333333333333333333333333333, '≈ 100', 'Number too large'). But several rely on unspecified or judgement-based wording: 'the display change is announced politely' (no exact text or mechanism), 'nothing happens' for some cases is vague about observable state, 'a fault' is undefined, 'a very small result such as 1e-99' and 'a recalled value of 1.5 × 10¹⁵ or more, or below 1e-9' leave specific values and display strings unspecified (e.g., the exact display for a recalled value is not given), 'behaves like recalling a tape line' is not an exact observable result, and 'the full value is used in the calculation' gives no specific check. Also 'Given a recalled value, then I can press an operator and continue' has no When or exact result. A tester would need to make judgement calls. |
| B2 correct the figure being typed | **fail** | Many criteria are exact, but several leave values or observable results unspecified or rely on judgement. 'The change is announced politely' (polite aria-live) is not an observable exact result. 'the matching message is shown' for pasted `1.234,56` or `£5£` does not give the exact text. 'a fault' is undefined, and 'Only C or Escape resets the calculation' conflicts with the earlier error criterion where Delete, Escape or a digit clears. 'the message clears' and 'the error clears' use the vague word 'clear'. 'Any correction', 'any key' and 'a recalled tape line or MR value' leave the setup state and values unspecified. 'Neither shows a message' is fine, but 'The same applies to a second point in `1.5`' is loosely specified. The `−0.5` Backspace example says it shows `0.` while the later 'same applies' sentence is ambiguous about `−5`. 'Cannot divide by zero' is exact, but 'the error stays' is somewhat loose. A tester would need judgement calls on several items. |
| B3 running total in memory | **fail** | Incomplete: - **Given** I type 1200 and press M+, **then** the tape line reads `M+ 1,200, memory 1,200`, with commas on results only. The figure being typed stays plain digits. / Most criteria are concrete, but several rely on unspecified or vague wording that requires a tester's judgement. Examples: 'the calculation clears' (C/Escape) does not say what the display shows; 'a new calculation starts' (MR, overflow cases) does not specify the display or expression line; 'the display, expression line and tape result are unchanged' is not concrete; 'a fault' is never defined as a reproducible state, so a tester cannot set it up; 'announced like any error' gives no exact text; 'the error is left' and 'nothing happens' are loosely defined; 'when I empty the tape' names no specific input; the screen reader criterion lacks the exact announcement string; the pasted/refused figure case does not say what was showing before; and 'it still shows' (M indicator at 0) omits the exact text. Because of these gaps and unspecified values, the output fails. |
| B4 getting out of an error | **fail** | Incomplete: - **Given** any error, **then** only one error state exists, with one message at a time. / Most criteria name exact inputs and exact text, but several rely on vague or unspecified wording a tester would have to interpret. 'The message is announced politely' does not say what a tester observes (aria-live=polite?). 'Announced like an error' is similarly undefined. 'A new calculation starts' and 'the error clears' are not tied to a specific observable result in most cases (only the 7 example is exact). 'Nothing changes' and 'nothing happens' leave the checked state implicit. 'Just below 1e100' and 'just below that' give no exact value. 'The paste message shows' does not give the text. 'Every recovery action works from the keyboard' is open-ended. 'Rounded size' depends on a 15-digit rule that is stated only in one place. 'Leaves it' and 'the user leaves it' are undefined. 'Fault' has no stated way to trigger it as a Given. The fault message text is exact, but the setup is not reproducible. 'Display shows in × 10⁻ⁿ notation' leaves n unspecified. 'Within range' is not a concrete value. Because multiple criteria need a judgement call or leave values unspecified, the rubric is not met. |

<details><summary>Answers</summary>

**B1 recall from the tape**

```
**Normal case**

- Given a tape line `100 ÷ 3 = ≈ 33.3333333333333`, when I click it (or focus it and press Enter or Space), then its final result is recalled as the full 34-digit value (33.33333333333333333333333333333333), with its ≈.
- Given I have typed `2 +` and then recall a tape line showing 11, when I type `3 =`, then the recalled 11 is the next figure and the result is 14.
- Given I am typing `5` and I recall a line, then the recalled value replaces the 5.
- Given I have just pressed =, or the calculator is at its start, when I recall a line, then a new calculation starts with that value.
- Given I recall 100 ÷ 3 (≈) and press × 3 =, then the display shows `≈ 100`.
- Given I press MR with memory holding 95, then it behaves like recalling a tape line, and recalling an `M+ 40, memory 95` line brings back the memory total 95.
- Given a recalled value, then it shows with thousands commas, as a result does, and the full value is used in the calculation, not the 15-digit display.

**Invalid input**

- Given the tape is empty, then there is nothing to recall, and the only text shown is "Finished calculations appear here".
- Given I press a digit after a recall, then the digit replaces the recalled value and starts a new figure.
- Given a recalled value, when I press Backspace, then nothing happens and no message shows.
- Given focus is on the tape, when I press Left or Right, then nothing happens. Outside the tape, every arrow key does nothing.
- Given memory is empty, when I press MR, then nothing happens.
- Given an operator is pending with nothing typed, when I press +/− or Delete, then nothing happens.

**Boundaries**

- Given the tape has several lines, when I Tab into it, then the tape is one Tab stop, Up and Down move between lines, Enter or Space recalls the focused line, and Tab leaves the tape.
- Given a recalled value carries ≈, then ≈ carries through the rest of the calculation, the sign change, and memory until a new calculation starts (memory keeps it until MC).
- Given I recall a value and press +/−, then the value flips and keeps its ≈.
- Given I recall a value then press Delete, then the figure becomes 0 and any pending operator is kept.
- Given a recalled value of 1.5 × 10¹⁵ or more, or below 1e-9 in size, then it displays in `1.5 × 10¹⁵` form but the full value is used in the sum.
- Given a recalled value of exactly 15 digits, then it is accepted in full, because recall is not limited by the typing limit.

**Very large and very small numbers**

- Given I recall a result of 1e99 and press × 10 =, then "Number too large" shows.
- Given I recall a very small result such as 1e-99 and press ÷ 10 =, then "Number too small" shows, never 0.
- Given a recalled 34-digit value, then every digit is used in the next step, with rounding half up at 34 significant digits.

**After a result**

- Given I have recalled a value and completed a sum, then the result is written as its own tape line, and the tape is unchanged by the recall itself.
- Given I recall a value and press =, then nothing happens, because there is no operator.
- Given a recalled value, then I can press an operator and continue from it, or press a digit to start a new calculation and forget the last operation.
- Given I recall after `=`, then the last operation is forgotten, so repeated = does not repeat it.
- Given a recalled value, then the tape and memory are untouched until I press =, M+ or M−.

**After an error**

- Given the calculator shows "Cannot divide by zero", when I recall a tape line or press MR, then the error is left and a new calculation starts with that value.
- Given a fault, when I try to recall, then nothing happens until I press C or Escape, which keeps the tape and memory, and then recall works.
- Given an error, then operators, =, +/−, Backspace, M+ and M− do nothing, and recalling is one of the ways out, along with Escape, Delete, a digit, the point and paste.
- Given a recall, then the display change is announced politely, with ≈ read "approximately" and − read "minus".
```

**B2 correct the figure being typed**

```
## Normal case
- **Given** I have typed `12.5`, **when** I press Backspace, **then** the display shows `12.`, and pressing it again shows `12`. The figure stays plain digits with no commas.
- **Given** I have typed `1234`, **when** I press Backspace, **then** the display shows `123`. The change is announced politely.
- **Given** I have typed `5 + 37`, **when** I press Backspace and then `4`, **then** the figure is `34`, the pending `+` is kept, and `=` gives `39`.
- **Given** I am typing a figure, **when** I press Delete (clear entry), **then** the figure resets to `0` and any pending operator is kept.
- **Given** I am typing `−0.5`, **when** I press +/−, **then** the figure becomes `0.5`. +/− flips only the figure being typed.
- **Given** I have pasted `£1,250.5`, **when** I press Backspace, **then** the figure is `1250.` and then `1250`, as with a typed figure.
- **Given** the ⌫ and CE keys, **when** I use only the keyboard (Backspace and Delete keys, or Tab to the keys and Enter or Space), **then** both work. With Num Lock off, the numpad point reports Delete and acts as clear entry.
- **Given** a corrected figure, **when** I calculate, **then** the result uses the corrected figure only. For example, typing `0.15`, Backspace, `+ 0.2 =` shows `0.3`.

## Invalid input
- **Given** a fresh calculator showing `0`, **when** I press Backspace, **then** nothing changes, with no message and no announcement.
- **Given** I am typing `0`, **when** I press `0` again, **then** nothing changes. The same applies to a second point in `1.5`. Neither shows a message.
- **Given** the display shows `0`, **when** I press +/−, **then** nothing changes and I never see negative zero.
- **Given** an operator is pending and I have typed nothing, **when** I press +/− or Delete, **then** nothing changes.
- **Given** I am typing `42`, **when** I paste `1.234,56` or `£5£`, **then** the figure stays `42` and the matching message is shown. Backspace then edits `42` as normal.

## Boundaries
- **Given** I have typed 15 digits, **when** I press a 16th digit, **then** it is not added and "15 digits maximum" is shown. The figure is unchanged.
- **Given** that message is showing, **when** I press Backspace, **then** the message goes, the last digit is removed, and I can type another digit.
- **Given** I have typed `0.` followed by 15 digits, **when** I count digits, **then** the single 0 before the point does not count and the 15 digits are accepted.
- **Given** I have typed one character, **when** I press Backspace, **then** the figure becomes `0`.
- **Given** I have typed `−0.5`, **when** I press Backspace, **then** it shows `0.` with no sign. The same applies to `−5`, which becomes `0`.
- **Given** I have typed `12.`, **when** I press Backspace, **then** the point is removed and the display shows `12`.

## Very large and very small numbers
- **Given** I have typed `999999999999999` (15 digits), **when** I press Backspace, **then** the display shows `99999999999999` in plain digits, with no commas and no exponent.
- **Given** I have typed `0.00000000000001`, **when** I press Backspace repeatedly, **then** each step shows exactly what remains, in plain digits, never in `× 10` form and never with ≈.
- **Given** a figure typed or corrected to 15 digits, **when** I use it in a calculation, **then** it enters as an exact value, so a correction never adds ≈.

## After a result
- **Given** the display shows a result (`2 + 3 =` → `5`), **when** I press Backspace, **then** nothing changes. The same applies to a recalled tape line or MR value.
- **Given** a result is showing, **when** I press Delete, **then** a new calculation starts at `0`. The tape and memory are untouched.
- **Given** a result is showing, **when** I type a digit, **then** a new calculation starts with that digit, and Backspace then edits it.
- **Given** an operator is pending and I recalled a value, **when** I press Delete, **then** the value becomes `0` and the operator is kept.
- **Given** any correction, **when** I make it, **then** the tape and memory are never changed.

## After an error
- **Given** the calculator shows "Cannot divide by zero", **when** I press Backspace, **then** nothing happens and the error stays.
- **Given** that error, **when** I press Delete, Escape, or a digit, **then** the error clears and a new calculation starts. A digit shows as the typed figure (`5 ÷ 0 =` then `7` shows `7`), and Backspace then edits it.
- **Given** the "15 digits maximum" message or a refused paste, **when** I press any key, **then** the message clears and I can keep correcting the same figure, which was not lost.
- **Given** a fault, **when** I press Backspace or Delete, **then** nothing happens. Only C or Escape resets the calculation, and the tape and memory are kept.
```

**B3 running total in memory**

```
### Normal case
- **Given** a fresh calculator, **when** I type 120.50 and press M+, **then** the display still shows `120.50`, the M indicator shows `M 120.5`, and the tape gains a quiet line `M+ 120.5, memory 120.5` with no `=`.
- **Given** memory holds 120.5, **when** I press Delete, type 79.25 and press M+, then press Delete, type 300 and press M+, **then** the M indicator shows `M 499.75` and the tape ends with `M+ 300, memory 499.75`.
- **Given** memory holds 499.75, **when** I press MR, **then** the display shows `499.75`, a new calculation starts, and I did not retype any part.
- **Given** memory holds 95, **when** I type 30 and press M−, **then** memory becomes 65 and the tape gains `M− 30, memory 65`.
- **Given** I have worked out 2 + 3 = 5, **when** I press M+, **then** 5 is added to memory and the display, expression line and tape result are unchanged except for the new memory line.
- **Given** I have typed 2 + 3 with 3 as the figure being typed, **when** I press M+, **then** memory gains 3, the pending operator is kept, and pressing = gives 5.
- **Given** an operator is pending and nothing is typed (`5 +`), **when** I press M+, **then** the running result showing (5) is added to memory.
- **Given** memory holds a value, **when** I press C or Escape, **then** the calculation clears, and the M indicator and total stay.
- **Given** memory holds a value, **when** I empty the tape, **then** the M indicator and total stay.
- **Given** a screen reader is running, **when** memory changes, **then** the M indicator is announced as "memory" and its total, and the keys are named "memory plus", "memory minus", "memory recall" and "memory clear".
- **Given** memory is in use, **when** I use only the keyboard, **then** I can Tab to each memory key and activate it with Enter or Space. No letter key or Ctrl/Cmd/Alt combination triggers a memory key.
- **Given** a tape line `M+ 40, memory 95`, **when** I click it, or press Enter or Space on it, **then** it recalls the memory total 95, not 40.
- **Given** 0.1 is added with M+ and then 0.2 with M+, **when** I press MR, **then** the display shows exactly `0.3` with no ≈.

### Invalid input
- **Given** a fresh calculator, **when** I press M+ or M−, **then** it acts on the 0 showing: the M indicator shows `M 0` and the tape gains `M+ 0, memory 0` (or `M− 0, memory 0`).
- **Given** memory is empty, **when** I press MR or MC, **then** nothing happens, with no message, no tape line and no announcement.
- **Given** the calculator is in an error, **when** I press M+ or M−, **then** nothing happens: memory and the error are unchanged, and there is no tape line.
- **Given** the calculator is in a fault, **when** I press any memory key, MC included, **then** nothing happens.
- **Given** any state, **when** I press a keyboard key such as `m`, `M`, Ctrl+M, Ctrl+P or Ctrl+R, **then** memory is not affected.
- **Given** a figure pasted and refused (for example `1.234,56`), **when** I press M+, **then** the figure showing before the paste is what is added.

### Boundaries
- **Given** memory holds 5, **when** I type 5 and press M−, **then** memory is 0, the indicator shows `M 0` (never a negative zero), and no error appears.
- **Given** memory has been used and then reaches 0, **when** I look at the indicator, **then** it still shows until MC is pressed.
- **Given** memory holds 9.9 × 10⁹⁹, **when** I add a value that keeps the total below 1e100, **then** it is accepted.
- **Given** memory holds 6 × 10⁹⁹ and the display shows 4 × 10⁹⁹, **when** I press M+, **then** the total would be 1e100, so "Number too large" is shown, memory is unchanged, no tape line is written, and the expression line shows `M+ 4 × 10⁹⁹`.
- **Given** memory holds 1 × 10⁻⁹⁹ and the display shows 9 × 10⁻¹⁰⁰, **when** I press M−, **then** the non-zero total would be below 1e-99, so "Number too small" is shown, memory is unchanged, and no tape line is written. Memory never rounds to 0 here.
- **Given** the value showing carries ≈, **when** I press M+, **then** memory carries ≈ (`M ≈ …`) until MC, even if later values added are exact.
- **Given** 100 ÷ 3 is showing as `≈ 33.3333333333333`, **when** I press M+ three times, **then** the full internal values are added and the indicator shows `M ≈ 100`.
- **Given** memory has been used, **when** I reload the page, **then** memory is gone and no M indicator shows.

### Very large and very small numbers
- **Given** memory holds 999,999,999,999,999, **when** I add 1 with M+, **then** the indicator and tape line show `1 × 10¹⁵`, read "1 times 10 to the power 15".
- **Given** a total of 999,999,999,999,999, **when** it is shown, **then** it uses plain notation with thousands commas.
- **Given** I type 1200 and press M+, **then** the tape line reads `M+ 1,200, memory 1,200`, with commas on results only. The figure being typed stays plain digits.
- **Given** I type 0.0000000001 and press M+, **then** memory shows `M 1 × 10⁻¹⁰`, read "1 times 10 to the power minus 10".
- **Given** memory holds 0.000000001, **then** the indicator shows it in plain notation (`0.000000001`), because it is not below 1e-9.
- **Given** a negative total, **when** it is shown, **then** it uses a true minus (−), read "minus".

### After a result
- **Given** I have just pressed M+ or M−, **when** I continue (type, press an operator or press =), **then** the calculation carries on as if the memory key had not been pressed.
- **Given** memory holds 95, **when** I press MR, **then** a new calculation starts at 95, the last operation is forgotten, and a following operator continues from 95 (MR, + 5 = gives 100).
- **Given** MR has put 95 on the display, **when** I press Backspace, **then** nothing happens; a digit replaces the value.
- **Given** memory holds a total, **when** I press MC, **then** the M indicator disappears, no tape line is written, and the display and calculation are unchanged.
- **Given** memory has been cleared, **when** I press M+, **then** a new total begins from the value showing.
- **Given** a result I want to correct, **when** I press +/−, **then** the result flips and I can send the flipped value to memory with M+.

### After an error
- **Given** memory overflow gave "Number too large", **when** I press MC, **then** memory clears and the error stays on screen.
- **Given** a memory overflow error, **when** I press MR with memory holding a value, **then** the error is left and a new calculation starts at the memory total.
- **Given** a memory overflow error, **when** I press Escape, Delete, a digit, the point or paste, **then** a new calculation starts and memory still holds its earlier total.
- **Given** a memory overflow error, **when** I press an operator, =, +/− or Backspace, **then** nothing happens.
- **Given** an error, **when** I press MC, **then** it works, and **when** I empty the tape, **then** the error is left and memory is kept.
- **Given** a fault, **when** I press C or Escape, **then** the calculation resets and the tape and memory are kept, so I can press MR to read my total. Every other input does nothing, and no reload is needed.
- **Given** an error or a fault, **when** it appears, **then** it is announced like any error. A key with no effect announces nothing.
```

**B4 getting out of an error**

```
## Normal case
- **Given** 5 ÷ 0 has been entered, **when** = is pressed, **then** the display shows "Cannot divide by zero", the expression line shows `5 ÷ 0 =`, the message is announced politely, and no tape line is written.
- **Given** 0 ÷ 0 has been entered, **when** = is pressed, **then** the display shows "Cannot divide by zero".
- **Given** 5 ÷ 0 is pending, **when** an operator such as + is pressed, **then** the error shows and the expression line shows `5 ÷ 0 +`.
- **Given** a result whose rounded size is ≥ 1e100, **when** it is calculated, **then** the display shows "Number too large".
- **Given** a non-zero result whose rounded size is < 1e-99, **when** it is calculated, **then** the display shows "Number too small" and never shows 0.
- **Given** any error, **then** only one error state exists, with one message at a time.
- **Given** an error is showing, **when** time passes, **then** it stays until the user leaves it (no timer).

## Invalid input
- **Given** an error is showing, **when** an operator, =, +/−, Backspace, M+ or M− is pressed, **then** nothing changes, no message appears, and nothing is announced.
- **Given** an error is showing, **when** a paste is refused (for example `1.234,56`), **then** the paste message shows and the error stays.
- **Given** a fault is showing, **when** any input other than C or Escape is made, MC and every memory key included, **then** nothing happens.
- **Given** an error caused by a memory step (M+ or M− pushing the total to ≥ 1e100 or a non-zero size < 1e-99), **then** the usual error shows, memory is unchanged, no tape line is written, and the expression line shows the failed step (for example `M+ 40`).

## Boundaries
- **Given** a result whose rounded size is just below 1e100, **when** it is calculated, **then** it displays normally as `× 10⁹⁹` notation, with no error.
- **Given** a result that rounds up to exactly 1e100 at 15 significant digits, **when** it is calculated, **then** "Number too large" shows, because the rounded value is what is tested.
- **Given** a non-zero result whose rounded size is exactly 1e-99, **when** it is calculated, **then** it displays normally; just below that, "Number too small" shows.
- **Given** a divisor typed as `0.00`, **when** = is pressed, **then** "Cannot divide by zero" shows.
- **Given** a zero numerator and a non-zero divisor (0 ÷ 5), **when** = is pressed, **then** 0 shows with no error.

## Very large and very small numbers
- **Given** repeated multiplication takes a result beyond 1e100 in size, positive or negative, **when** = or an operator is pressed, **then** "Number too large" shows.
- **Given** repeated division takes a non-zero result below 1e-99 in size, positive or negative, **when** = or an operator is pressed, **then** "Number too small" shows.
- **Given** a very small non-zero result within range, **then** it shows in `× 10⁻ⁿ` notation and not as 0.

## What the user can do after a result and after an error
- **Given** an error is showing, **when** Escape, Delete, a digit, the point, a paste, a recall or MR is used, **then** the error clears and a new calculation starts. For example, typing 7 after 5 ÷ 0 shows 7.
- **Given** an error is showing and memory holds a value, **when** MC is pressed, **then** memory clears and the error stays. With memory empty, MC and MR do nothing.
- **Given** an error is showing, **when** the user leaves it, **then** the tape and memory are untouched.
- **Given** an error is showing, **when** the tape is emptied, **then** it empties and the error clears; if the tape is already empty, nothing happens.
- **Given** an error was cleared, **when** a valid sum such as 7 + 2 = is entered, **then** 9 shows and a tape line is written.
- **Given** a fault, **then** the message reads "Something went wrong inside the calculator. It was not caused by anything you entered. Your tape and memory are kept. Press C or Escape to start again." It is announced like an error, the expression line is empty, and no reload is needed.
- **Given** a fault, **when** C or Escape is pressed, **then** the calculation resets, and tape and memory are kept.
- **Given** any error or fault, **then** every recovery action works from the keyboard without a mouse.
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
