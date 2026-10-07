# Eval results

- **Model:** `claude-sonnet-5-5`, through the Claude Code login (`claude -p`), for both the answers and the grading.
- **Run:** 2026-10-07, with `promptfoo@0.120.19`.
- **Threshold:** suites A and B pass with at most one failing case; suite C passes only with none.
- **Skill change before the latest suite B run (2026-10-07):** the first B runs showed the product-spec skill never said each criterion needs all three parts, and the answers had criteria with no When. The skill now says every criterion has its own Given, When and Then; the rubric and the wrong-result check were not changed.
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

## B. Criteria coverage: FAIL (1 of 4 cases)

| Case | Result | Why it failed |
|---|---|---|
| B1 recall from the tape | **fail** | Every criterion has a Given, When and Then, and many Thens use phrases or quoted messages that the decisions define ("nothing happens", "a new calculation starts", "announced politely", "Number too large", "Number too small"). Several Thens still do not say exactly what is seen. #18 says "`1.5 × 10¹⁵` style notation", which leaves the format loose. #19 says only "exponent notation" and gives no wording. #23 says "the commas are those of a result", which is not observable as written. #1 says "shown as a result" and "I can continue the sum with it", and neither is a concrete display. #8 hedges with "its ≈ if memory has one". #34 refers to "the fault message" without naming its text. These Thens state results whose wording the decisions do not fix. |
| B2 correct the figure being typed | pass |  |
| B3 running total in memory | **fail** | Every criterion has a Given, a When and a Then, and none uses words like 'correct', 'appropriate' or 'gracefully'. However, some Thens do not say what the user sees. The boundary criterion 'memory is updated and the tape gains its line' gives no indicator text or tape wording, and 'just under 1e100' is not a concrete value. The keypad criterion 'each key acts as above' points back to other criteria instead of stating a visible result. 'The calculation continues from the result' and '95 is recalled as the memory total, with its ≈ if memory has one' are also loosely worded. These need exact wording from the decisions, which the output does not show. |
| B4 getting out of an error | **fail** | Every criterion has a Given, When and Then, and most Thens say what is seen with exact wording, such as the quoted error messages, "a new calculation starts" and "nothing happens". Some Thens still rely on vague wording that the decisions do not fix. "the usual error shows" in the memory M+/M− boundary does not say which message appears. "the refusal message appears" does not quote the message. "the result shows normally" and "it calculates normally" do not say what is displayed. "the last failed operation is forgotten" describes internal state rather than something seen. These are in the same family as "correct" or "appropriate". |

<details><summary>Answers</summary>

**B1 recall from the tape**

```
## Normal case

1. **Given** the tape has `2 + 3 = 5` and I have typed 12, **When** I click that line, **Then** the figure I was typing is replaced by 5, shown as a result, and I can continue the sum with it.
2. **Given** I have entered `7 +` and the tape has `100 ÷ 3 = ≈ 33.3333333333333`, **When** I click that line, **Then** the display shows `≈ 33.3333333333333`, and the recalled figure is the full 34-digit value `33.33333333333333333333333333333333`.
3. **Given** the recalled `≈ 33.3333333333333` is the next figure after `7 +`, **When** I press =, **Then** the display shows `≈ 40.3333333333333`, computed from all 34 digits rather than the 15 shown, and the tape gets a new line.
4. **Given** the tape has `0.1 + 0.2 = 0.3` and I have entered `10 ×`, **When** I recall that line and press =, **Then** the display shows exactly 3 with no ≈.
5. **Given** the tape has several lines and focus is on the calculator, **When** I Tab to the tape, press Down to move to a line, and press Enter, **Then** that line's final result is recalled. Space does the same.
6. **Given** focus is inside the tape, **When** I press Tab, **Then** focus leaves the tape. The tape is one Tab stop, and Up and Down move between its lines.
7. **Given** I recall a line, **When** the display changes, **Then** the new value is announced politely, with ≈ read as "approximately" and − read as "minus".
8. **Given** the tape has the memory line `M+ 40, memory 95`, **When** I recall it, **Then** the memory total 95 is brought back, with its ≈ if memory has one.
9. **Given** the tape has `5 + 2 = 7` and I have typed 3, **When** I recall that line, **Then** the tape and memory are unchanged and recalling writes no tape line.
10. **Given** I am typing and recall a value, **When** I then press a digit, **Then** the recalled value is replaced by that digit.

## Invalid input

11. **Given** the tape is empty, **When** I look for something to recall, **Then** there is no line to act on. Only "Finished calculations appear here" shows, and the calculation is unchanged.
12. **Given** focus is on a tape line, **When** I press Left or Right, **Then** nothing happens, with no message and no announcement.
13. **Given** focus is outside the tape, **When** I press any arrow key, **Then** nothing happens.
14. **Given** a value has just been recalled, **When** I press Backspace, **Then** nothing happens and the recalled value is unchanged. Backspace does not edit it.
15. **Given** I have entered `7 +` and recalled a value, **When** I press Delete, **Then** the display shows 0 and the pending `+` is kept.
16. **Given** I have entered `7 +` and nothing is typed, **When** I recall a value and press +/−, **Then** the value is flipped and keeps its ≈.

## Boundaries

17. **Given** the recalled value has 34 digits, **When** it is recalled, **Then** no "15 digits maximum" message appears. That limit applies only to typing and pasting.
18. **Given** a tape line whose rounded result is ≥ 1e15, **When** I recall it, **Then** the display shows `1.5 × 10¹⁵` style notation, and the next calculation uses the full value, not the rounded one.
19. **Given** a tape line with a result below 1e-9 in size, **When** I recall it, **Then** the display shows exponent notation and the full value is kept.
20. **Given** a tape line with a negative result such as −2.5, **When** I recall it, **Then** the display shows a true minus (−) and the value is kept. A recalled zero is never negative zero.
21. **Given** I have recalled a value after `7 +`, **When** I press +/− twice, **Then** the value returns to its original sign and ≈ is unchanged.
22. **Given** the tape has a result that is exact (no ≈), **When** I recall it, **Then** no ≈ appears.
23. **Given** a result with trailing zeros was dropped on the tape, **When** I recall it, **Then** the display shows no trailing zeros and the commas are those of a result.

## Very large and very small numbers

24. **Given** the tape has a result just under 1e100 and I have entered `× 10`, **When** I recall a line holding that value and press =, **Then** I see "Number too large", the error leaves no tape line, and the tape keeps its earlier lines.
25. **Given** the tape has a non-zero result just above 1e-99 in size and I have entered `÷ 10`, **When** I recall it and press =, **Then** I see "Number too small", never 0.
26. **Given** a tape line has a result of 34 significant digits, **When** I recall it and add 0, **Then** the result keeps the digits beyond the 15 shown, with ≈.

## After a result

27. **Given** I have just pressed = and the display shows a result, **When** I recall a tape line, **Then** a new calculation starts with the recalled value and the last operation is forgotten.
28. **Given** I have just recalled a value after =, **When** I press =, **Then** nothing happens, because there is no operator.
29. **Given** a value has been recalled onto the display, **When** I press an operator, **Then** the calculation continues from the recalled value and the expression line shows it with that operator.
30. **Given** I have just recalled a line at the start of a calculation, **When** I press +, type 2 and press =, **Then** the result is the recalled value plus 2 and the tape gets a new line.
31. **Given** a value has been recalled, **When** I press a digit, the point, or paste, **Then** a new calculation starts and the recalled value is forgotten.

## After an error

32. **Given** the calculator shows "Cannot divide by zero", **When** I recall a tape line, **Then** the error clears, a new calculation starts with the recalled value, and the tape is unchanged.
33. **Given** I have recalled a value after an error, **When** I carry on, **Then** operators, =, and the rest behave as in a normal calculation.
34. **Given** the calculator shows the fault message, **When** I click a tape line or press Enter or Space on it, **Then** nothing happens, and only C or Escape resets the calculation, keeping the tape and memory.
```

**B2 correct the figure being typed**

```
## Normal case

- **Given** I have typed `125`, **when** I press Backspace, **then** the display shows `12`, and the new figure is announced politely.
- **Given** I have typed `12.50`, **when** I press Backspace, **then** the display shows `12.5`, still plain digits as typed with no commas.
- **Given** I have typed `12.`, **when** I press Backspace, **then** the point is removed and the display shows `12`.
- **Given** I have typed `7`, **when** I press Backspace, **then** the display shows `0`.
- **Given** I have typed `5 + 12`, **when** I press Backspace, **then** the display shows `1` and the expression line still reads `5 +`.
- **Given** I have typed `5 + 12` and then Backspace to `1`, **when** I type `3` and press =, **then** the result is 8, and the tape gets the line `5 + 3 = 8`.
- **Given** I have typed `4.75` with an operator pending, **when** I press Delete, **then** the figure resets to `0` and the pending operator is kept.
- **Given** I have typed `45`, **when** I press +/−, **then** the figure shows `−45`, and Backspace then gives `−4`.
- **Given** I have pasted `£1,234` and the paste was accepted, **when** I press Backspace, **then** the figure becomes `123`.

## Invalid input

- **Given** a fresh calculator showing `0`, **when** I press Backspace, **then** nothing changes, no message appears and nothing is announced.
- **Given** I have typed `1.5`, **when** I press `.`, **then** nothing changes and no message appears.
- **Given** the figure is `0`, **when** I press `0` or +/−, **then** nothing changes and no message appears.
- **Given** I have typed `5 +` with nothing typed since, **when** I press Backspace, +/− or Delete, **then** nothing changes and nothing is announced.
- **Given** I have typed `−0.5`, **when** I press Backspace, **then** the display shows `0.`, not negative zero.
- **Given** I have typed `−5`, **when** I press Backspace, **then** the display shows `0`, without the sign.

## Boundaries

- **Given** I have typed 15 digits, **when** I type a 16th, **then** the figure is unchanged and the message "15 digits maximum" is shown.
- **Given** the "15 digits maximum" message is showing, **when** I press Backspace, **then** the message clears and the figure loses its last character.
- **Given** the "15 digits maximum" message is showing after Backspace, **when** I type a digit, **then** it is accepted as the 15th digit.
- **Given** I have typed `0.12345678901234` (15 digits, not counting the single 0 before the point), **when** I press Backspace, **then** the display shows `0.1234567890123`, and a further digit is accepted.
- **Given** I have typed `0.`, **when** I press Backspace, **then** the point is removed and the display shows `0`.
- **Given** the figure is `0` after deleting its last character, **when** I press Backspace again, **then** nothing changes and no message appears.

## Very large and very small numbers

- **Given** I have typed `999999999999999`, **when** I press Backspace, **then** the display shows `99999999999999` in plain digits, with no commas and no `× 10` form.
- **Given** I have typed `0.000000000000001`, **when** I press Backspace, **then** the display shows `0.00000000000000` as typed, and I can keep deleting to `0`.
- **Given** I have typed `0.000000000000001`, **when** I press Delete, **then** the figure resets to `0`.

## What the user can do after a result, and after an error

- **Given** I have pressed = and the result is showing, **when** I press Backspace, **then** nothing changes, and the result and any ≈ stay.
- **Given** a result is showing, **when** I press Delete, **then** a new calculation starts at `0`, and the tape and memory are untouched.
- **Given** a result is showing, **when** I type a digit, **then** a new calculation starts with that digit.
- **Given** I have recalled a tape line or MR, **when** I press Backspace, **then** nothing changes.
- **Given** I have recalled a tape line or MR after an operator, **when** I press Delete, **then** the figure becomes `0` and the pending operator is kept.
- **Given** I have recalled a tape line or MR, **when** I type a digit, **then** the digit replaces the recalled value.
- **Given** the display shows "Cannot divide by zero", **when** I press Backspace, **then** nothing changes and the error stays.
- **Given** the display shows an error, **when** I press Delete, Escape or a digit, **then** the error clears and a new calculation starts, and the tape and memory are untouched.
- **Given** the display shows the fault message, **when** I press Backspace, **then** nothing changes, and pressing C or Escape resets the calculation while keeping the tape and memory.
```

**B3 running total in memory**

```
## Normal case

- **Given** a fresh calculator, **When** the user enters 10 + 30 = and presses M+, **Then** the display still shows 40, an indicator `M 40` appears (announced "memory" and its total), and the tape gains a quiet line `M+ 40, memory 40` with no `=`.
- **Given** memory holds 40, **When** the user enters 5 × 11 = and presses M+, **Then** memory becomes 95, the indicator shows `M 95`, and the tape gains `M+ 55, memory 95`.
- **Given** memory holds 95, **When** the user enters 20 + 5 = and presses M+, then presses MR, **Then** the display shows 120 as a new calculation, and the indicator still shows `M 120`.
- **Given** memory holds 120, **When** the user presses M− with 20 showing, **Then** memory becomes 100, the tape gains `M− 20, memory 100`, and the calculation is unchanged.
- **Given** a fresh calculator, **When** the user types 0.1, presses M+, types 0.2 after pressing C, presses M+, then MR, **Then** the display shows exactly 0.3.
- **Given** a fresh calculator, **When** the user presses M+ with only the 0 showing, **Then** memory is 0, the indicator shows `M 0`, and the tape gains `M+ 0, memory 0`.
- **Given** the user is on the keypad, **When** they Tab to the memory keys and press Enter or Space, **Then** each key acts as above and is named "memory clear", "memory recall", "memory minus" or "memory plus".

## Invalid input

- **Given** memory is empty, **When** the user presses MR or MC, **Then** nothing changes, there is no tape line and nothing is announced.
- **Given** any state, **When** the user presses a keyboard key such as M, Ctrl+M or Ctrl+P, **Then** no memory action happens, because memory keys have no keyboard shortcut.
- **Given** the calculator is in an error, **When** the user presses M+ or M−, **Then** nothing changes, memory stays as it was, and there is no tape line.
- **Given** the calculator is in a fault, **When** the user presses any memory key, MC included, **Then** nothing changes and memory is kept.

## Boundaries

- **Given** memory holds 40, **When** the user presses M− with 40 showing, **Then** memory is 0, the indicator stays as `M 0`, and the tape gains `M− 40, memory 0`.
- **Given** memory holds 999,999,999,999,999, **When** the user presses M+ with 1 showing, **Then** memory becomes 1,000,000,000,000,000, and the indicator shows `M 1 × 10¹⁵` with no ≈, because no digit was cut.
- **Given** memory holds 123,456,789,012,345, **When** the user presses M+ with 0.6 showing, **Then** the indicator shows `M ≈ 123,456,789,012,346`, rounded half up, because the display cut digits.
- **Given** memory holds a total just under 1e100, **When** the user presses M+ with a value that keeps the rounded total below 1e100, **Then** memory is updated and the tape gains its line.
- **Given** memory is empty, **When** the user presses MC, **Then** nothing happens (see Invalid input); **and Given** memory holds a value, **When** the user presses MC, **Then** memory clears, the M indicator disappears, and the tape gains no line.

## Very large and very small numbers

- **Given** memory holds 9 × 10⁹⁹, **When** the user presses M+ with 9 × 10⁹⁹ showing, **Then** the display shows "Number too large", memory stays 9 × 10⁹⁹, there is no tape line, and the expression line shows the failed step `M+ 9 × 10⁹⁹`.
- **Given** memory holds 1.5 × 10⁻⁹⁹, **When** the user presses M− with 1 × 10⁻⁹⁹ showing, **Then** the display shows "Number too small", memory is unchanged, there is no tape line, and the memory is never set to 0.
- **Given** memory holds 1 × 10⁻⁹⁹, **When** the user presses M+ with 1 × 10⁻⁹⁹ showing, **Then** memory becomes 2 × 10⁻⁹⁹, because the size is not below 1e-99.
- **Given** memory is empty and the display shows ≈ 33.3333333333333 (from 100 ÷ 3 =), **When** the user presses M+, **Then** the indicator shows `M ≈ 33.3333333333333`, and the tape line carries ≈ too.
- **Given** memory carries ≈, **When** the user presses M+ with an exact 1 showing, **Then** memory still shows ≈ until MC is pressed.

## What the user can do after a result

- **Given** the user has just pressed M+ after a result, **When** they press an operator, **Then** the calculation continues from the result, because M+ leaves the calculation as it is.
- **Given** memory holds 95, **When** the user presses C or Escape, **Then** the calculation clears and the indicator still shows `M 95`.
- **Given** memory holds 95 and the tape has lines, **When** the user empties the tape, **Then** the indicator still shows `M 95`.
- **Given** the tape has the line `M+ 55, memory 95`, **When** the user clicks it, or presses Enter or Space on it, **Then** 95 is recalled as the memory total, with its ≈ if memory has one.
- **Given** memory holds 120 and 20 + 5 = just finished, **When** the user presses MR and then × 2 =, **Then** the display shows 240, and memory is unchanged.
- **Given** memory holds ≈ 33.3333333333333, **When** the user presses MC and then adds an exact 2 with M+, **Then** the indicator shows `M 2` with no ≈.
- **Given** memory holds a value, **When** the page is reloaded, **Then** memory is empty and the M indicator is gone.

## What the user can do after an error

- **Given** memory holds 95 and 5 ÷ 0 = has shown "Cannot divide by zero", **When** the user presses MR, **Then** the error is left, a new calculation starts with 95, and memory is unchanged.
- **Given** the calculator is in an error and memory holds 95, **When** the user presses MC, **Then** memory clears, the M indicator disappears, and the error stays showing.
- **Given** an M+ overflow showed "Number too large", **When** the user types 7, presses Escape, Delete or the point, or pastes a figure, **Then** a new calculation starts and memory keeps its earlier total.
- **Given** an M+ error, **When** the user presses an operator, =, +/− or Backspace, **Then** nothing happens and the error stays.
- **Given** a fault with memory holding 95 and tape lines, **When** the user presses C or Escape, **Then** the calculation resets, and memory and tape are kept.
```

**B4 getting out of an error**

```
## Normal case

- **Given** a fresh calculator, **when** the user presses 5, ÷, 0, =, **then** the display shows "Cannot divide by zero", the expression line shows `5 ÷ 0 =`, no tape line is written, and the error is announced politely.
- **Given** a fresh calculator, **when** the user presses 0, ÷, 0, =, **then** the display shows "Cannot divide by zero".
- **Given** the user has typed 5 ÷ 0, **when** they press +, **then** the display shows "Cannot divide by zero" and the expression line shows `5 ÷ 0 +`.
- **Given** the display shows "Cannot divide by zero", **when** the user presses 7, **then** the display shows 7 and a new calculation has started.
- **Given** the display shows an error, **when** the user presses Escape, **then** the error clears and a new calculation starts at 0.

## Invalid input

- **Given** an error is showing, **when** the user presses an operator, =, +/−, Backspace, M+ or M−, **then** nothing changes, the error stays, and nothing is announced.
- **Given** an error is showing, **when** the user pastes something refused (for example `1.234,56`), **then** the refusal message appears and the error stays.
- **Given** an error is showing, **when** the user pastes an accepted figure (for example `£5`), **then** the error clears and a new calculation starts with 5.
- **Given** a fault has occurred, **when** the user presses any input other than C or Escape (memory keys and MC included), **then** nothing happens.

## Boundaries

- **Given** a calculation whose result is just under 1e100 in size after rounding to 15 significant digits, **when** the user presses =, **then** the result shows normally with no error.
- **Given** a calculation whose result rounds to a size of 1e100 or more (for example 9.999999999999995 × 10⁹⁹), **when** the user presses =, **then** the display shows "Number too large".
- **Given** a calculation whose non-zero result has a rounded size of exactly 1e-99, **when** the user presses =, **then** the result shows normally.
- **Given** a calculation whose non-zero result has a rounded size below 1e-99, **when** the user presses =, **then** the display shows "Number too small".
- **Given** a calculation whose result is exactly 0 (for example 0 × 5), **when** the user presses =, **then** the display shows 0 with no error.
- **Given** memory holds a total and an M+ or M− would make it ≥ 1e100 in size or non-zero and below 1e-99, **when** the user presses M+ or M−, **then** the usual error shows, memory is unchanged, no tape line is written, and the expression line shows the failed memory step (for example `M+ 40`).

## Very large and very small numbers

- **Given** a product of very large figures that reaches 1e100 or more, **when** the user presses =, **then** the display shows "Number too large" and no tape line is written.
- **Given** a calculation of very small figures whose non-zero result is below 1e-99, **when** the user presses =, **then** the display shows "Number too small" and never shows 0.

## After a result

- **Given** earlier calculations have written tape lines, **when** a later calculation produces an error, **then** the earlier tape lines remain unchanged and no line is added for the error.
- **Given** the user has just left an error with a digit, **when** they complete a valid sum, **then** it calculates normally, the last failed operation is forgotten, and a tape line is written.

## After an error

- **Given** an error is showing, **when** the user presses Escape, Delete, a digit, the point, or pastes an accepted figure, **then** a new calculation starts and tape and memory are kept.
- **Given** an error is showing and the tape has a line, **when** the user recalls that line or presses MR with memory holding a value, **then** the error clears and a new calculation starts with that value.
- **Given** an error is showing and memory holds a value, **when** the user presses MC, **then** memory clears and the error stays.
- **Given** an error is showing and the tape has lines, **when** the user empties the tape, **then** the tape empties, the error clears, and memory is not cleared.
- **Given** a fault (a bug throws), **when** it occurs, **then** the display shows "Something went wrong inside the calculator. It was not caused by anything you entered. Your tape and memory are kept. Press C or Escape to start again.", the expression line is empty, and the message is announced like an error.
- **Given** a fault is showing, **when** the user presses C or Escape, **then** the calculation resets, tape and memory are kept, and no reload is needed.
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
