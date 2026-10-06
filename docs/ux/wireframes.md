# Wireframes

Layout direction C, "Ledger", flipped: calculator on the left, tape on the right (Decision 15). Everything here follows the frozen Decisions in `CLAUDE.md`. Where a drawing had to settle something the Decisions left open, it is marked **(choice)**, and the choice has been added to the Decisions.

The rendered version, with real colours and type, is `mockup.html` in this folder. These values are the ones the app must use.

How to read the drawings:
- A **readout** is the top of the calculator: the expression line, the display and the message line. The keypad does not change between states, so most states show only the readout.
- `▸` marks the element that has keyboard focus.
- Text in the right margin, after `←`, is annotation, not on screen.

---

## 1. Desktop, above 900px

The calculator column is never narrower than 480px (30rem); the tape takes the rest of the width.

The border style shows the key type: dotted `┄` for memory (quiet), light `─` for digits and `C CE ⌫ +/−`, heavy `━` for the four operators (accent), and double `═` for `=` (strongest accent). Every key is the same size and shape, with a 12px gap on every side.

### 1.1 Fresh, with an empty tape

```
┌─────────────────────────────────────────────────┬───────────────────────────────────────────┐
│                                                 │                                           │
│                                               0 │ Finished calculations appear here         │
│                                                 │                                           │
│                                                 │                                           │
│ ┌┄┄┄┄┄┄┄┄┄┐ ┌┄┄┄┄┄┄┄┄┄┐ ┌┄┄┄┄┄┄┄┄┄┐ ┌┄┄┄┄┄┄┄┄┄┐ │                                           │
│ ┆         ┆ ┆         ┆ ┆         ┆ ┆         ┆ │                                           │
│ ┆    MC   ┆ ┆    MR   ┆ ┆    M−   ┆ ┆    M+   ┆ │                                           │
│ ┆         ┆ ┆         ┆ ┆         ┆ ┆         ┆ │                                           │
│ ┆         ┆ ┆         ┆ ┆         ┆ ┆         ┆ │                                           │
│ └┄┄┄┄┄┄┄┄┄┘ └┄┄┄┄┄┄┄┄┄┘ └┄┄┄┄┄┄┄┄┄┘ └┄┄┄┄┄┄┄┄┄┘ │                                           │
│                                                 │                                           │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓ │                                           │
│ │         │ │         │ │         │ ┃         ┃ │                                           │
│ │    C    │ │    CE   │ │    ⌫    │ ┃    ÷    ┃ │                                           │
│ │         │ │         │ │         │ ┃         ┃ │                                           │
│ │     Esc │ │     Del │ │    Bksp │ ┃       / ┃ │                                           │
│ └─────────┘ └─────────┘ └─────────┘ ┗━━━━━━━━━┛ │                                           │
│                                                 │                                           │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓ │                                           │
│ │         │ │         │ │         │ ┃         ┃ │                                           │
│ │    7    │ │    8    │ │    9    │ ┃    ×    ┃ │                                           │
│ │         │ │         │ │         │ ┃         ┃ │                                           │
│ │         │ │         │ │         │ ┃       * ┃ │                                           │
│ └─────────┘ └─────────┘ └─────────┘ ┗━━━━━━━━━┛ │                                           │
│                                                 │                                           │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓ │                                           │
│ │         │ │         │ │         │ ┃         ┃ │                                           │
│ │    4    │ │    5    │ │    6    │ ┃    −    ┃ │                                           │
│ │         │ │         │ │         │ ┃         ┃ │                                           │
│ │         │ │         │ │         │ ┃       - ┃ │                                           │
│ └─────────┘ └─────────┘ └─────────┘ ┗━━━━━━━━━┛ │                                           │
│                                                 │                                           │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓ │                                           │
│ │         │ │         │ │         │ ┃         ┃ │                                           │
│ │    1    │ │    2    │ │    3    │ ┃    +    ┃ │                                           │
│ │         │ │         │ │         │ ┃         ┃ │                                           │
│ │         │ │         │ │         │ ┃       + ┃ │                                           │
│ └─────────┘ └─────────┘ └─────────┘ ┗━━━━━━━━━┛ │                                           │
│                                                 │                                           │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ╔═════════╗ │                                           │
│ │         │ │         │ │         │ ║         ║ │                                           │
│ │   +/−   │ │    0    │ │    .    │ ║    =    ║ │                                           │
│ │         │ │         │ │         │ ║         ║ │                                           │
│ │         │ │         │ │         │ ║   Enter ║ │                                           │
│ └─────────┘ └─────────┘ └─────────┘ ╚═════════╝ │                                           │
└─────────────────────────────────────────────────┴───────────────────────────────────────────┘
```
- The legends (Esc, Del, Bksp, /, *, -, +, Enter) sit in their own row at the bottom of each key, with a blank row between them and the centred label. They show only on devices with a mouse and hover.
- Key labels are at least 24px. The display is always larger.
- `+/−` has the accessible name "change sign". On a mouse device, hovering over it shows a "Change sign" tooltip.
- The empty tape shows only its one quiet line.

### 1.2 In use, with memory holding a running total

```
┌─────────────────────────────────────────────────┬───────────────────────────────────────────┐
│M 95                                  27.5 × 2 = │ Tape                          Empty tape  │
│                                              55 │                                           │
│                                                 │  1  12 + 8                =       20      │
│                                                 │  2  100 ÷ 3 = ≈ 33.3333333333333          │
│                                                 │            → × 3          = ≈    100      │
│                                                 │  3  30 + 10               =       40      │
│                                                 │  4  M+ 40, memory                 40      │
│                                                 │  5  27.5 × 2              =       55      │
│                                                 │  6  M+ 55, memory                 95      │
└─────────────────────────────────────────────────┴───────────────────────────────────────────┘
```
- `M 95` is the M indicator. It shows from the first M+ or M− until MC, and is announced as "memory 95".
- Memory lines (4 and 6) are quiet, the same muted colour as the working, with no `=`. Their result column holds the new memory total, which is what recalling the line brings back.
- The keypad is as in 1.1.

### 1.3 Desktop at 200% zoom

A 1440px window at 200% zoom lays out at 720 CSS pixels, so it gets the layout for 900px and below. The calculator is centred at up to 40rem wide, and the tape sits behind the toggle. A mouse is present, so legends still show. Nothing is cut off or overlaps; the page scrolls vertically.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                              5 × 4 =        │
│                                                   20        │
│                                                             │
│     ┌───────────────────────────────────────────────┐       │
│     │ Show tape                                     │       │
│     └───────────────────────────────────────────────┘       │
│                                                             │
│      ┌┄┄┄┄┄┄┄┄┄┐ ┌┄┄┄┄┄┄┄┄┄┐ ┌┄┄┄┄┄┄┄┄┄┐ ┌┄┄┄┄┄┄┄┄┄┐        │
│      ┆         ┆ ┆         ┆ ┆         ┆ ┆         ┆        │
│      ┆    MC   ┆ ┆    MR   ┆ ┆    M−   ┆ ┆    M+   ┆        │
│      ┆         ┆ ┆         ┆ ┆         ┆ ┆         ┆        │
│      ┆         ┆ ┆         ┆ ┆         ┆ ┆         ┆        │
│      └┄┄┄┄┄┄┄┄┄┘ └┄┄┄┄┄┄┄┄┄┘ └┄┄┄┄┄┄┄┄┄┘ └┄┄┄┄┄┄┄┄┄┘        │
│                                                             │
│      ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓        │
│      │         │ │         │ │         │ ┃         ┃        │
│      │    C    │ │    CE   │ │    ⌫    │ ┃    ÷    ┃        │
│      │         │ │         │ │         │ ┃         ┃        │
│      │     Esc │ │     Del │ │    Bksp │ ┃       / ┃        │
│      └─────────┘ └─────────┘ └─────────┘ ┗━━━━━━━━━┛        │
│                                                             │
│      ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓        │
│      │         │ │         │ │         │ ┃         ┃        │
│      │    7    │ │    8    │ │    9    │ ┃    ×    ┃        │
│      │         │ │         │ │         │ ┃         ┃        │
│      │         │ │         │ │         │ ┃       * ┃        │
│      └─────────┘ └─────────┘ └─────────┘ ┗━━━━━━━━━┛        │
│                                                             │
│      ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓        │
│      │         │ │         │ │         │ ┃         ┃        │
│      │    4    │ │    5    │ │    6    │ ┃    −    ┃        │
│      │         │ │         │ │         │ ┃         ┃        │
│      │         │ │         │ │         │ ┃       - ┃        │
│      └─────────┘ └─────────┘ └─────────┘ ┗━━━━━━━━━┛        │
│                                                             │
│      ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓        │
│      │         │ │         │ │         │ ┃         ┃        │
│      │    1    │ │    2    │ │    3    │ ┃    +    ┃        │
│      │         │ │         │ │         │ ┃         ┃        │
│      │         │ │         │ │         │ ┃       + ┃        │
│      └─────────┘ └─────────┘ └─────────┘ ┗━━━━━━━━━┛        │
│                                                             │
│      ┌─────────┐ ┌─────────┐ ┌─────────┐ ╔═════════╗        │
│      │         │ │         │ │         │ ║         ║        │
│      │   +/−   │ │    0    │ │    .    │ ║    =    ║        │
│      │         │ │         │ │         │ ║         ║        │
│      │         │ │         │ │         │ ║   Enter ║        │
│      └─────────┘ └─────────┘ └─────────┘ ╚═════════╝        │
└─────────────────────────────────────────────────────────────┘
```
- At 400% zoom the same window lays out at 360 CSS pixels: one column, the 320px layout below, and no sideways scrolling.

---

## 2. Calculator states (readout)

### 2.1 Fresh
```
┌──────────────────────────────────────┐
│                                      │ ← expression line, empty
│                                    0 │ ← display
│                                      │ ← message line, empty
└──────────────────────────────────────┘
```

### 2.2 Typing a figure
```
┌──────────────────────────────────────┐
│                                      │
│                              1234.50 │ ← as typed: no commas, trailing zero kept
│                                      │
└──────────────────────────────────────┘
```

### 2.3 Operator pending, running result on the expression line (after `2 + 3 ×`)
```
┌──────────────────────────────────────┐
│                                  5 × │
│                                    5 │ ← (choice) the display shows the running result
│                                      │
└──────────────────────────────────────┘
```

### 2.4 A result, with the last step on the expression line (after `2 + 3 × 4 =`)
```
┌──────────────────────────────────────┐
│                              5 × 4 = │ ← the last step only; the full chain is on the tape
│                                   20 │
│                                      │
└──────────────────────────────────────┘
```

### 2.5 A result with ≈

After `100 ÷ 3 =`:
```
┌──────────────────────────────────────┐
│                            100 ÷ 3 = │
│                   ≈ 33.3333333333333 │ ← medium display size (18 characters)
│                                      │
└──────────────────────────────────────┘
```
Then `× 3 =`:
```
┌──────────────────────────────────────┐
│             ≈ 33.3333333333333 × 3 = │
│                                ≈ 100 │
│                                      │
└──────────────────────────────────────┘
```

### 2.6 Exponential

Pending, after `999999999999999 × 999999999999999 ×`:
```
┌──────────────────────────────────────┐
│          ≈ 9.99999999999998 × 10²⁹ × │ ← characters fixed (Decision 4); only spacing and size may change
│            ≈ 9.99999999999998 × 10²⁹ │ ← long display size (25 characters)
│                                      │
└──────────────────────────────────────┘
```
A result, after `10000000000 × 10000000000 =`:
```
┌──────────────────────────────────────┐
│    10,000,000,000 × 10,000,000,000 = │ ← (choice) figures on the expression line and tape use result formatting
│                             1 × 10²⁰ │
│                                      │
└──────────────────────────────────────┘
```

### 2.7 Errors, each with the failed step on the expression line

After `5 ÷ 0 =`:
```
┌──────────────────────────────────────┐
│                              5 ÷ 0 = │
│                Cannot divide by zero │ ← error colour, long size. The words carry the meaning, not the colour.
│                                      │
└──────────────────────────────────────┘
```
After `5 ÷ 0 +`, where the error comes on the operator press:
```
┌──────────────────────────────────────┐
│                              5 ÷ 0 + │ ← (choice) the failed step ends with the key that triggered it
│                Cannot divide by zero │
│                                      │
└──────────────────────────────────────┘
```
After recalling `1 × 10⁹⁰` and entering `× 10000000000 =`:
```
┌──────────────────────────────────────┐
│          1 × 10⁹⁰ × 10,000,000,000 = │
│                     Number too large │
│                                      │
└──────────────────────────────────────┘
```
After `1 × 10⁻⁹⁹` (from the tape) `× 0.000000001 =`:
```
┌──────────────────────────────────────┐
│           1 × 10⁻⁹⁹ × 0.000000001 =  │
│                     Number too small │ ← never shown as 0
│                                      │
└──────────────────────────────────────┘
```

### 2.8 The fault message
```
┌─────────────────────────────────────────────────┐
│                                                 │
│                                                 │
│                 Something went wrong inside the │
│                calculator. It was not caused by │
│              anything you entered. Your tape is │
│                kept. Press C or Escape to start │
│                                          again. │
│                                                 │
└─────────────────────────────────────────────────┘
```
- The expression line is empty, because nothing in it can be trusted. The text is in the error colour at the long display size, and wraps; it is never cut.
- Only `C` and Escape act on it. They keep both the tape and memory.

### 2.9 Refusal messages

None of these is an error. The display is unchanged, and the message stays until the next key press, click or paste.

```
┌──────────────────────────────────────┐
│                                      │
│                      123456789012345 │
│ ▌ 15 digits maximum                  │ ← message line: text colour, with a bar at the start
└──────────────────────────────────────┘
```
```
┌──────────────────────────────────────┐
│                                  5 + │
│                                    5 │
│ ▌ Couldn't read that as a number     │
└──────────────────────────────────────┘
```
```
┌──────────────────────────────────────┐
│                                      │
│                                    0 │
│ ▌ Unclear which mark is the decimal  │
│   point                              │ ← wraps, never cut
└──────────────────────────────────────┘
```
```
┌──────────────────────────────────────┐
│                                      │
│                                    0 │
│ ▌ Use a minus sign for negative      │
│   numbers                            │
└──────────────────────────────────────┘
```
A refusal during an error. The error stays, and the message joins it:
```
┌──────────────────────────────────────┐
│                              5 ÷ 0 = │
│                Cannot divide by zero │
│ ▌ Couldn't read that as a number     │
└──────────────────────────────────────┘
```

### 2.10 A recalled value (`5 +`, then line 2 recalled from the keyboard)
```
┌──────────────────────────────────────┬───────────────────────────────────────────┐
│                                  5 + │ Tape                          Empty tape  │
│                                ≈ 100 │  1  12 + 8                =       20      │
│                                      │▸ 2  100 ÷ 3 = ≈ 33.3333333333333          │
│                                      │            → × 3          = ≈    100      │
│                                      │  3  2 + 3 = 5 → × 4       =       20      │
└──────────────────────────────────────┴───────────────────────────────────────────┘
```
- Focus stays on the recalled line, shown by the focus ring (`▸`). There is no extra "recalled" badge, because the Decisions define none.
- Line 2's final result, ≈ 100, is what was recalled, and it carries its ≈. Backspace does nothing on it, and a digit replaces it.

---

### 2.11 The M indicator

Memory holding an exact total:
```
┌─────────────────────────────────────────────────┐
│M 95                                     5 × 4 = │
│                                              20 │
│                                                 │
└─────────────────────────────────────────────────┘
```
Memory holding a total with ≈ (after `100 ÷ 3 =` then `M+`):
```
┌─────────────────────────────────────────────────┐
│M ≈ 33.3333333333333                   100 ÷ 3 = │
│                              ≈ 33.3333333333333 │
│                                                 │
└─────────────────────────────────────────────────┘
```
Memory at 0 after `M+ 5` then `M− 5`. The indicator stays until MC:
```
┌─────────────────────────────────────────────────┐
│M 0                                              │
│                                               5 │
│                                                 │
└─────────────────────────────────────────────────┘
```
- The indicator sits at the left of the expression line, in the muted colour. It is a word plus a number, not a colour or an icon.

---

## 3. Tape states

### 3.1 Empty
```
┌───────────────────────────────────────────┐
│                                           │
│   Finished calculations appear here       │ ← muted; the only thing shown
│                                           │
└───────────────────────────────────────────┘
```

### 3.2 A dozen lines, scrolled to the newest
```
┌───────────────────────────────────────────┐
│ Tape                          Empty tape  │  ← heading row stays put; only the list scrolls
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← fade: lines 1–4 are above
│  5  1,323.66 × 1.2        =    1,588.392  │
│  6  1,588.392 × 1.2       =    1,906.0704 │
│  7  450 ÷ 12              =       37.5    │
│  8  37.5 × 7              =      262.5    │
│  9  0.1 + 0.2             =        0.3    │
│ 10  1.005 × 100           =      100.5    │
│ 11  999,999,999,999,999 ×                 │
│       999,999,999,999,999                 │
│               = ≈ 9.99999999999998 × 10²⁹ │
│ 12  2,500 − 312.75 = 2,187.25             │
│       → − 99.99           =    2,087.26   │
└───────────────────────────────────────────┘
```
- Newest is last. **(choice)** When a line is added, the list scrolls to show it.
- Lines 1 to 4 are `12 + 8 = 20`, `100 ÷ 3 = ≈ 33.3333333333333 → × 3 = ≈ 100`, `2 + 3 = 5 → × 4 = 20` and `1,234.56 + 89.1 = 1,323.66`.
- Line 6 comes from a repeated `=`.

### 3.3 The empty-tape control waiting for its second press
```
┌───────────────────────────────────────────┐
│ Tape             ┏━━━━━━━━━━━━━━━━━━━━━━┓ │
│                  ┃ Press again to empty ┃ │  ← new label, warm fill and solid border
│                  ┗━━━━━━━━━━━━━━━━━━━━━━┛ │
│  1  12 + 8                =       20      │
│  2  …                                     │
└───────────────────────────────────────────┘
```
It reverts when focus leaves or any other key is pressed. There is no timer.

---

### 3.4 Memory lines
```
┌───────────────────────────────────────────┐
│ Tape                          Empty tape  │
│                                           │
│  1  12 + 8                =       20      │
│  2  100 ÷ 3 = ≈ 33.3333333333333          │
│            → × 3          = ≈    100      │
│  3  30 + 10               =       40      │
│  4  M+ 40, memory                 40      │
│  5  27.5 × 2              =       55      │
│  6  M+ 55, memory                 95      │
└───────────────────────────────────────────┘
```
- A memory line has the characters `M+ 40, memory 40`. Only the spacing moves the total into the result column.
- Recalling line 6 brings back `95`, the memory total on that line.

---

## 4. 320px wide

The tape sits behind the toggle, between the readout and the keypad. The keypad fills the width minus the safe margins, and keys are about 63px wide by 56px tall (at least 44 by 44). There are no keyboard legends, because a phone has no hover. On a short screen the keys get shorter, never narrower and never below 44px, and the page scrolls.

### 4.1 Tape closed
```
┌──────────────────────────────────┐
│M 20                     5 × 4 =  │
│                              20  │
│                                  │
│┌───────────────────────────────┐ │
││ Show tape                     │ │
│└───────────────────────────────┘ │
│ ┌┄┄┄┄┄┐ ┌┄┄┄┄┄┐ ┌┄┄┄┄┄┐ ┌┄┄┄┄┄┐  │
│ ┆  MC ┆ ┆  MR ┆ ┆  M− ┆ ┆  M+ ┆  │
│ └┄┄┄┄┄┘ └┄┄┄┄┄┘ └┄┄┄┄┄┘ └┄┄┄┄┄┘  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┏━━━━━┓  │
│ │  C  │ │  CE │ │  ⌫  │ ┃  ÷  ┃  │
│ └─────┘ └─────┘ └─────┘ ┗━━━━━┛  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┏━━━━━┓  │
│ │  7  │ │  8  │ │  9  │ ┃  ×  ┃  │
│ └─────┘ └─────┘ └─────┘ ┗━━━━━┛  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┏━━━━━┓  │
│ │  4  │ │  5  │ │  6  │ ┃  −  ┃  │
│ └─────┘ └─────┘ └─────┘ ┗━━━━━┛  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┏━━━━━┓  │
│ │  1  │ │  2  │ │  3  │ ┃  +  ┃  │
│ └─────┘ └─────┘ └─────┘ ┗━━━━━┛  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ╔═════╗  │
│ │ +/− │ │  0  │ │  .  │ ║  =  ║  │
│ └─────┘ └─────┘ └─────┘ ╚═════╝  │
└──────────────────────────────────┘
```

### 4.2 Tape open
```
┌──────────────────────────────────┐
│M 20                     5 × 4 =  │
│                              20  │
│                                  │
│┌───────────────────────────────┐ │
││ Hide tape                     │ │
│└───────────────────────────────┘ │
│ Tape                 Empty tape  │
│  1  12 + 8                       │
│                            = 20  │
│  2  100 ÷ 3 = ≈ 33.3333333       │
│     333333 → × 3                 │
│                         = ≈ 100  │
│  3  M+ 20, memory                │
│                              20  │
│                                  │
│ ┌┄┄┄┄┄┐ ┌┄┄┄┄┄┐ ┌┄┄┄┄┄┐ ┌┄┄┄┄┄┐  │
│ ┆  MC ┆ ┆  MR ┆ ┆  M− ┆ ┆  M+ ┆  │
│ └┄┄┄┄┄┘ └┄┄┄┄┄┘ └┄┄┄┄┄┘ └┄┄┄┄┄┘  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┏━━━━━┓  │
│ │  C  │ │  CE │ │  ⌫  │ ┃  ÷  ┃  │
│ └─────┘ └─────┘ └─────┘ ┗━━━━━┛  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┏━━━━━┓  │
│ │  7  │ │  8  │ │  9  │ ┃  ×  ┃  │
│ └─────┘ └─────┘ └─────┘ ┗━━━━━┛  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┏━━━━━┓  │
│ │  4  │ │  5  │ │  6  │ ┃  −  ┃  │
│ └─────┘ └─────┘ └─────┘ ┗━━━━━┛  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┏━━━━━┓  │
│ │  1  │ │  2  │ │  3  │ ┃  +  ┃  │
│ └─────┘ └─────┘ └─────┘ ┗━━━━━┛  │
│                                  │
│ ┌─────┐ ┌─────┐ ┌─────┐ ╔═════╗  │
│ │ +/− │ │  0  │ │  .  │ ║  =  ║  │
│ └─────┘ └─────┘ └─────┘ ╚═════╝  │
└──────────────────────────────────┘
```
- With no room for columns, each line's result is right-aligned on its own row. The tape list scrolls within at most half the screen height.

---

## 5. Key states

Each state is distinct, and none relies on colour alone. Hover changes the label colour as well as the fill. Pressed adds an inset shadow. Focus adds a 3px ring with a 2px offset. Hover styles apply only on devices with hover, so nothing stays highlighted after a tap. Tokens are in section 8; every pairing is in the contrast table.

| Key type | Default (fill / label) | Hover (fill / label) | Pressed (fill / label) | Focused |
|---|---|---|---|---|
| Memory `MC MR M− M+` | `mem-bg` / `mem-text`, dotted outline | `mem-hover-bg` / `mem-hover-text` | `mem-pressed-bg` / `mem-hover-text`, inset shadow | ring in `focus`, 3px, offset 2px |
| Digits `0–9 .` | `key-bg` / `key-text` | `key-hover-bg` / `key-hover-text` | `key-pressed-bg` / `key-hover-text`, inset shadow | ring |
| Controls `C CE ⌫ +/−` | `ctrl-bg` / `key-text` | `ctrl-hover-bg` / `key-hover-text` | `ctrl-pressed-bg` / `key-hover-text`, inset shadow | ring |
| Operators `÷ × − +` | `op-bg` / `op-text` | `op-hover-bg` / `op-hover-text` | `op-pressed-bg` / `op-hover-text`, inset shadow | ring |
| Equals `=` | `eq-bg` / `eq-text` | `eq-hover-bg` / `eq-hover-text` | `eq-pressed-bg` / `eq-text`, inset shadow | ring |

```
 default       hover         pressed       focused
┌─────────┐   ┌─────────┐   ┌─────────┐   ╭───────────╮
│         │   │░░░░░░░░░│   │▓▓▓▓▓▓▓▓▓│   │┌─────────┐│
│    7    │   │░░░░7░░░░│   │▓▓▓▓7▓▓▓▓│   ││    7    ││
│         │   │░░░░░░░░░│   │▓▓▓▓▓▓▓▓▓│   │└─────────┘│
└─────────┘   └─────────┘   └─────────┘   ╰───────────╯
                label colour   inset shadow   ring outside the key
                changes too
```

---

## 6. Keyboard map

The calculator follows the key the browser reports (`event.key`), with `event.code` used only to recognise the numpad decimal key.

| Key | Action | Notes |
|---|---|---|
| `0`–`9`, top row or numpad | Type a digit | A 16th digit shows "15 digits maximum". |
| `.`, top row or numpad | Decimal point | The numpad decimal key is the point whatever character it reports, including `,`. |
| `+` `-` `*` `/`, top row or numpad | Plus, minus, multiply, divide | A character that needs Shift, such as `*` or `+`, counts as that character. `/` calls `preventDefault`, so quick-find does not open. |
| `Enter`, numpad `Enter`, `=`, Apple numpad `=` | Equals | Only when no control has focus. With a control focused, Enter activates it. |
| `Escape`, Apple numpad `Clear` | Clear the calculation | Tape and memory are untouched. It leaves an error, and with C it is the only way out of a fault. |
| `Delete` | Clear entry | |
| `Backspace` | Remove the last character typed | |
| `Space` | Activate the focused control | Does nothing when nothing has focus. |
| `Tab`, `Shift`+`Tab` | Move focus | Follows visual order. Above 900px: keypad row by row (memory row first), then the tape (one stop), then the empty-tape control. At 900px and below: the toggle, then the tape when open, then the keypad. Focus is never trapped. |
| `↑` `↓` | Move between tape lines | While the tape has focus. Enter or Space recalls. |
| `+/−`, `MC`, `MR`, `M−`, `M+` | No key | Tab to them, then Enter or Space. The usual memory shortcuts clash with the browser's (Ctrl+P prints, Ctrl+R reloads), so there are none. The cost: memory is slower from the keyboard than everything else. |
| Ctrl, Cmd or Alt with any key | Ignored by the calculator | The browser's own shortcut runs, including paste. |
| Numpad with Num Lock off | Whatever the browser reports | Navigation keys such as End or ArrowDown do nothing. |

---

## 7. Accessibility

- **Live region.** The display is a polite live region; the expression line is not live.
  - In the pending state the display holds a hidden operator word, so pressing `+` after `12` is heard as "12 plus".
  - Errors, the fault message and refusal messages are announced politely.
  - The M indicator is announced as "memory" and its total ("memory 95").
  - Keys with no effect announce nothing.
- **Keys** are real `<button>` elements named with words: plus, minus, multiply, divide, equals, clear, clear entry, backspace, change sign, decimal point, memory clear, memory recall, memory minus, memory plus. Digits are named by their digit.
  - The `+/−` key's "Change sign" tooltip is extra, for mouse users. Its accessible name does not depend on the tooltip.
- **Spoken forms.** ≈ is "approximately", − is "minus", × is "times", ÷ is "divided by", → is "then", and `× 10²⁹` is "times 10 to the power 29". The glyphs are hidden from screen readers.
- **The tape** is an `<ol>` with an explicit `role="list"`, because Safari can drop list semantics once the bullet styling is removed. It is labelled "Tape" and is one Tab stop, with ↑ and ↓ between lines. The VoiceOver check includes confirming it is read as a list.
- **Focus** is always visible: a 3px ring in `--color-focus` with a 2px offset. It is a shape, so it never relies on colour alone, and it meets 3:1 against the panel and the page. Focus is never trapped.
- **Targets** are at least 44 by 44px at every width down to 320px. Taps do not double-tap zoom (`touch-action: manipulation`).
- **Colour is never the only carrier of meaning.** Errors are words. ≈ is a character. The waiting empty-tape control changes its label. Messages have a leading bar. Key types differ by position and outline as well as fill.
- **Low vision:**
  - All sizes are in rem, so a larger default text size set in the browser is followed.
  - At 200% zoom nothing is cut off or overlaps (section 1.3).
  - At 400% zoom the page reflows to one column with no sideways scrolling.
  - The display is never smaller than the key labels; past that, it wraps.
- **Banned words.** The UI never shows "precision" or "floating point".

---

## 8. Design tokens

These are the values the app must use. `mockup.html` renders the same values. Light and dark follow `prefers-color-scheme`. There is no theme menu.

### Colour

| Token | Light | Dark |
|---|---|---|
| `--color-bg` | `#F6F7F9` | `#101215` |
| `--color-surface` | `#FFFFFF` | `#181B1F` |
| `--color-text` | `#16191D` | `#EEF1F4` |
| `--color-text-muted` | `#545B64` | `#A4ACB6` |
| `--color-rule` | `#DDE1E6` | `#2A2F35` |
| `--color-key-bg` | `#EEF1F4` | `#23272C` |
| `--color-key-text` | `#16191D` | `#EEF1F4` |
| `--color-key-hover-bg` | `#DCE2E9` | `#30363D` |
| `--color-key-hover-text` | `#000000` | `#FFFFFF` |
| `--color-key-pressed-bg` | `#C6CFDA` | `#3D454E` |
| `--color-ctrl-bg` | `#E2E7ED` | `#2C3238` |
| `--color-ctrl-hover-bg` | `#D0D8E1` | `#3A4249` |
| `--color-ctrl-pressed-bg` | `#BAC5D1` | `#48515B` |
| `--color-mem-bg` | `#FFFFFF` | `#181B1F` |
| `--color-mem-text` | `#4A515A` | `#B3BAC3` |
| `--color-mem-hover-bg` | `#EEF1F4` | `#23272C` |
| `--color-mem-hover-text` | `#16191D` | `#FFFFFF` |
| `--color-mem-pressed-bg` | `#DCE2E9` | `#30363D` |
| `--color-op-bg` | `#DCE8F5` | `#1E3550` |
| `--color-op-text` | `#123A63` | `#CFE3F8` |
| `--color-op-hover-bg` | `#C3D8EF` | `#284669` |
| `--color-op-hover-text` | `#071F38` | `#FFFFFF` |
| `--color-op-pressed-bg` | `#A9C6E6` | `#315682` |
| `--color-eq-bg` | `#1D4F80` | `#8DBDF0` |
| `--color-eq-text` | `#FFFFFF` | `#0B1A2A` |
| `--color-eq-hover-bg` | `#143C63` | `#B0D3F7` |
| `--color-eq-hover-text` | `#FFF6D6` | `#000000` |
| `--color-eq-pressed-bg` | `#0D2B49` | `#6FA6DD` |
| `--color-key-border` | `#808892` | `#6E7781` |
| `--color-legend` | `#545B64` | `#A0A8B2` |
| `--color-legend-hover` | `#3B4148` | `#C4CAD1` |
| `--color-legend-on-op` | `#2F5378` | `#A9C6E6` |
| `--color-legend-on-equals` | `#D6E4F2` | `#1E3550` |
| `--color-error` | `#A3260F` | `#FF9E8C` |
| `--color-armed-bg` | `#FFF1D6` | `#3A2C0E` |
| `--color-armed-border` | `#8A5A00` | `#D9A441` |
| `--color-focus` | `#0A5CB8` | `#8CC8FF` |
| `--color-tooltip-bg` | `#16191D` | `#EEF1F4` |
| `--color-tooltip-text` | `#FFFFFF` | `#101215` |
| `--color-mem-line` | `#545B64` | `#A4ACB6` |

### Contrast, WCAG AA

Text needs 4.5:1. Non-text parts (outlines, key edges and focus rings) need 3:1. Every pairing is checked in light and in dark.

One value changed on recheck. Light `--color-key-border` was #8A929C. Against the page background it measured 2.94, which fails; it is now #808892. That pairing is new: at 900px and below, keys sit on the page background rather than the panel. Every other pairing passed as first set.

| Foreground | Background | Used for | Needs | Light | Dark |
|---|---|---|---|---|---|
| `text` | `surface` | Display, readout text | 4.5:1 | 17.63 pass | 15.24 pass |
| `text` | `bg` | Tape result column | 4.5:1 | 16.45 pass | 16.55 pass |
| `text-muted` | `surface` | Expression line, M indicator label | 4.5:1 | 6.87 pass | 7.53 pass |
| `text-muted` | `bg` | Tape working, line numbers, empty-tape hint | 4.5:1 | 6.41 pass | 8.18 pass |
| `mem-line` | `bg` | Memory tape lines | 4.5:1 | 6.41 pass | 8.18 pass |
| `key-text` | `key-bg` | Digit keys | 4.5:1 | 15.55 pass | 13.25 pass |
| `key-hover-text` | `key-hover-bg` | Digit keys, hover | 4.5:1 | 16.10 pass | 12.20 pass |
| `key-hover-text` | `key-pressed-bg` | Digit keys, pressed | 4.5:1 | 13.34 pass | 9.72 pass |
| `key-text` | `ctrl-bg` | C, CE, ⌫, +/− keys | 4.5:1 | 14.18 pass | 11.43 pass |
| `key-hover-text` | `ctrl-hover-bg` | C, CE, ⌫, +/−, hover | 4.5:1 | 14.59 pass | 10.22 pass |
| `key-hover-text` | `ctrl-pressed-bg` | C, CE, ⌫, +/−, pressed | 4.5:1 | 12.00 pass | 8.07 pass |
| `mem-text` | `mem-bg` | Memory keys | 4.5:1 | 8.03 pass | 8.83 pass |
| `mem-hover-text` | `mem-hover-bg` | Memory keys, hover | 4.5:1 | 15.55 pass | 15.02 pass |
| `mem-hover-text` | `mem-pressed-bg` | Memory keys, pressed | 4.5:1 | 13.52 pass | 12.20 pass |
| `op-text` | `op-bg` | ÷ × − + keys | 4.5:1 | 9.33 pass | 9.52 pass |
| `op-hover-text` | `op-hover-bg` | ÷ × − +, hover | 4.5:1 | 11.40 pass | 9.68 pass |
| `op-hover-text` | `op-pressed-bg` | ÷ × − +, pressed | 4.5:1 | 9.43 pass | 7.54 pass |
| `eq-text` | `eq-bg` | = key | 4.5:1 | 8.46 pass | 8.93 pass |
| `eq-hover-text` | `eq-hover-bg` | = key, hover | 4.5:1 | 10.45 pass | 13.51 pass |
| `eq-text` | `eq-pressed-bg` | = key, pressed | 4.5:1 | 14.39 pass | 6.84 pass |
| `legend` | `ctrl-bg` | Legends on C, CE, ⌫ (12px) | 4.5:1 | 5.52 pass | 5.39 pass |
| `legend-hover` | `ctrl-hover-bg` | Legends on C, CE, ⌫, hover | 4.5:1 | 7.17 pass | 6.19 pass |
| `legend-on-op` | `op-bg` | Legends on ÷ × − + | 4.5:1 | 6.43 pass | 7.09 pass |
| `legend-on-op` | `op-hover-bg` | Legends on ÷ × − +, hover | 4.5:1 | 5.47 pass | 5.49 pass |
| `legend-on-equals` | `eq-bg` | Legend on = (Enter) | 4.5:1 | 6.54 pass | 6.35 pass |
| `legend-on-equals` | `eq-hover-bg` | Legend on =, hover | 4.5:1 | 8.75 pass | 8.04 pass |
| `tooltip-text` | `tooltip-bg` | Change sign tooltip | 4.5:1 | 17.63 pass | 16.55 pass |
| `error` | `surface` | Error and fault text | 4.5:1 | 7.39 pass | 8.66 pass |
| `text` | `armed-bg` | Empty-tape control waiting | 4.5:1 | 15.79 pass | 11.98 pass |
| `key-border` | `surface` | Key outline on panel (non-text) | 3.0:1 | 3.59 pass | 3.80 pass |
| `key-border` | `bg` | Key outline on page at 900px and below (non-text) | 3.0:1 | 3.35 pass | 4.13 pass |
| `eq-bg` | `surface` | = key edge on panel (non-text) | 3.0:1 | 8.46 pass | 8.78 pass |
| `armed-border` | `bg` | Armed control outline (non-text) | 3.0:1 | 5.53 pass | 8.34 pass |
| `focus` | `surface` | Focus ring on panel (non-text) | 3.0:1 | 6.49 pass | 9.73 pass |
| `focus` | `bg` | Focus ring on page and tape (non-text) | 3.0:1 | 6.05 pass | 10.56 pass |

### Type

- **Family:** `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. No web fonts.
- **Digits:** `font-variant-numeric: tabular-nums` on the display, expression line and tape.

| Token | Size | Weight | Used for |
|---|---|---|---|
| `--font-size-display` | 2.5rem (40px) | 500 | Display, up to 12 characters |
| `--font-size-display-medium` | 2rem (32px) | 500 | Display, 13 to 18 characters |
| `--font-size-display-long` | 1.625rem (26px) | 500 | Display, 19 or more characters, errors and fault. This is the floor at every width: past it the display wraps. |
| `--font-size-key` | 1.5rem (24px) | 500 | Key labels, at every width |
| `--font-size-expression` | 1rem (16px) | 400 | Expression line, M indicator |
| `--font-size-tape` | 1rem (16px) | 400 | Tape lines |
| `--font-size-message` | 1rem (16px) | 400 | Message line |
| `--font-size-label` | 0.875rem (14px) | 500 | Toggle, empty-tape control, tape heading, tooltip |
| `--font-size-legend` | 0.75rem (12px) | 400 | Key legends, tape line numbers |

The display (26px at its smallest) is always larger than the key labels (24px).

### Spacing, radius, size

| Token | Value |
|---|---|
| `--space-1` … `--space-7` | 0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem, 2rem, 3rem (4–48px) |
| `--radius-sm`, `--radius-md`, `--radius-lg` | 4px, 8px, 12px |
| `--size-key-gap` | 0.75rem (12px) between keys, every side |
| `--size-key-min` | 2.75rem (44px) |
| `--size-key-height` | 4.5rem (72px) with legends (mouse devices); 3.5rem (56px) without. On a short window it shrinks toward `--size-key-min`, and the page scrolls. |
| `--size-rail-min` | 30rem (480px), the calculator column above 900px |
| `--size-narrow-max` | 40rem (640px), the calculator's width at 900px and below, centred |
| `--size-gutter` | 1rem (16px), or the device safe-area inset if larger |
| `--focus-ring` | 3px solid `--color-focus`, offset 2px |
| `--shadow-pressed` | inset 0 2px 4px rgba(0, 0, 0, 0.25) |
| `--key-operator-glyph-scale` | 1.35. The ÷ × − + = glyphs are drawn small in system fonts, so the glyph alone is scaled to match the digits' ink height. Their font size stays 24px, so the display is still the largest type. |
| Breakpoint | 900px. It is a constant in the CSS, because variables cannot be used in media queries. |
