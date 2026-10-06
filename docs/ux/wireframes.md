# Wireframes

Layout direction C, "Ledger", flipped: calculator on the left, tape on the right (Decision 15). Everything here follows the frozen Decisions in `CLAUDE.md`. Where a drawing had to settle something the Decisions left open, it is marked **(choice)**, and the choice has been added to the Decisions.

The rendered version, with real colours and type, is `mockup.html` in this folder. These values are the ones the app must use.

How to read the drawings:
- A **readout** is the top of the calculator: the expression line, the display and the message line. The keypad does not change between states, so most states show only the readout.
- `▸` marks the element that has keyboard focus.
- Text in the right margin, after `←`, is annotation, not on screen.

---

## 1. Desktop, above 900px

The calculator rail is 400px wide; the tape takes the rest.

### 1.1 Fresh, with an empty tape

```
┌──────────────────────────────────────┬───────────────────────────────────────────┐
│                                      │                                           │
│                                    0 │   Finished calculations appear here       │
│                                      │                                           │
│  ┌───────┐┌───────┐┌───────┐┌───────┐│                                           │
│  │   C   ││  CE   ││   ⌫   ││   ÷   ││                                           │
│  │   Esc ││   Del ││  Bksp ││     / ││                                           │
│  └───────┘└───────┘└───────┘└───────┘│                                           │
│  ┌───────┐┌───────┐┌───────┐┌───────┐│                                           │
│  │   7   ││   8   ││   9   ││   ×   ││                                           │
│  │       ││       ││       ││     * ││                                           │
│  └───────┘└───────┘└───────┘└───────┘│                                           │
│  ┌───────┐┌───────┐┌───────┐┌───────┐│                                           │
│  │   4   ││   5   ││   6   ││   −   ││                                           │
│  │       ││       ││       ││     - ││                                           │
│  └───────┘└───────┘└───────┘└───────┘│                                           │
│  ┌───────┐┌───────┐┌───────┐┌───────┐│                                           │
│  │   1   ││   2   ││   3   ││   +   ││                                           │
│  │       ││       ││       ││     + ││                                           │
│  └───────┘└───────┘└───────┘└───────┘│                                           │
│  ┌───────┐┌───────┐┌───────┐┌───────┐│                                           │
│  │   ±   ││   0   ││   .   ││   =   ││                                           │
│  │       ││       ││       ││ Enter ││                                           │
│  └───────┘└───────┘└───────┘└───────┘│                                           │
└──────────────────────────────────────┴───────────────────────────────────────────┘
```
- The empty tape shows only its one quiet line. **(choice)** The "Tape" heading and the empty-tape control are hidden until the first line exists. The region is still named "Tape" for screen readers.
- The legends sit small and muted in the bottom-right of each key. Digits, `.` and `±` have none: digits and `.` are their own key, and `±` has no key.
- The expression line and the message line keep their height even when empty, so the keypad never moves.

### 1.2 Desktop with a tape in use

```
┌──────────────────────────────────────┬───────────────────────────────────────────┐
│                              5 × 4 = │ Tape                          Empty tape  │
│                                   20 │  1  12 + 8                =       20      │
│                                      │  2  100 ÷ 3 = ≈ 33.3333333333333          │
│ [ keypad as in 1.1 ]                 │            → × 3          = ≈    100      │
│                                      │  3  2 + 3 = 5 → × 4       =       20      │
└──────────────────────────────────────┴───────────────────────────────────────────┘
```
- Each line's final `= result` sits in the right-hand columns: `=`, then a narrow ≈ column, then the result, aligned on the decimal point. The characters of the line are unchanged; only the spacing moves.
- A line too long for the working column wraps, indented, and is never cut off.
- Line numbers are muted and for reference only.

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
┌──────────────────────────────────────┐
│                                      │ ← (choice) the expression line is empty: nothing in it can be trusted
│                Something went wrong. │
│    Press C or Escape to start again. │ ← wraps; error colour, long size
│                                      │
└──────────────────────────────────────┘
```

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

## 4. 320px wide

The tape sits behind the toggle. **(choice)** The toggle sits between the readout and the keypad, so an opened tape appears directly under the display where a recalled value lands, and the keys move down.

### 4.1 Tape closed
```
┌──────────────────────────────┐
│                      5 × 4 = │
│                           20 │
│                              │
│ ┌──────────────────────────┐ │
│ │ Show tape                │ │ ← 44px tall, full width
│ └──────────────────────────┘ │
│ ┌─────┐┌─────┐┌─────┐┌─────┐ │
│ │  C  ││ CE  ││  ⌫  ││  ÷  │ │ ← keys about 64px wide at 320px (at least 44 by 44)
│ │ Esc ││ Del ││Bksp ││   / │ │
│ └─────┘└─────┘└─────┘└─────┘ │
│   7  8  9  ×   (rows as 1.1) │
│   4  5  6  −                 │
│   1  2  3  +                 │
│   ±  0  .  =                 │
└──────────────────────────────┘
```

### 4.2 Tape open
```
┌──────────────────────────────┐
│                      5 × 4 = │
│                           20 │
│                              │
│ ┌──────────────────────────┐ │
│ │ Hide tape                │ │
│ └──────────────────────────┘ │
│ Tape              Empty tape │
│  1  12 + 8                   │
│                      =    20 │ ← no columns: the result is right-aligned on its own row
│  2  100 ÷ 3 = ≈ 33.333333333 │
│       33333 → × 3            │
│                    = ≈   100 │
│  3  2 + 3 = 5 → × 4          │
│                      =    20 │ ← the list scrolls within at most half the screen height
│ ┌─────┐┌─────┐┌─────┐┌─────┐ │
│ │  C  ││ CE  ││  ⌫  ││  ÷  │ │ ← the keypad follows, below
└──────────────────────────────┘
```

---

## 5. Keyboard map

| Key | Action | Notes |
|---|---|---|
| `0`–`9`, numpad `0`–`9` | Type a digit | A 16th digit shows "15 digits maximum". In an error or fault, see below. |
| `.`, numpad `.` | Decimal point | First in a figure gives `0.`. A second point does nothing. |
| `+`, numpad `+` | Plus | On most keyboards this is Shift and `=`. That is still a character, not a shortcut. |
| `-`, numpad `-` | Minus | |
| `*`, numpad `*` | Multiply | |
| `/`, numpad `/` | Divide | Calls `preventDefault`, so the browser's quick-find does not open. |
| `Enter`, numpad `Enter`, `=` | Equals | Only when no control has focus. With a control focused, Enter activates that control. |
| `Space` | Activates the focused control | Does nothing when nothing is focused. |
| `Escape` | Clear: the whole calculation | Leaves the tape alone. Leaves an error. In a fault, it is the only key that acts. |
| `Delete` | Clear entry: the figure being typed goes to 0 | On a result it starts a new calculation at 0. On a recalled value it gives 0, keeping the pending operator. With nothing typed it does nothing. |
| `Backspace` | Removes the last character typed | `12.` becomes `12`. Does nothing on a result or a recalled value. |
| `Tab`, `Shift`+`Tab` | Move focus | The order follows the visual order. Above 900px: keypad keys row by row, then the tape (one stop), then the empty-tape control. At 900px and below: the tape toggle, then the tape and its empty-tape control when open, then the keypad keys. |
| `↑`, `↓` | Move between tape lines | Only while the tape has focus. |
| `Enter` or `Space` on a tape line | Recall that line's result | |
| `±` | No key | Reach it with Tab, then Enter or Space. |
| Ctrl, Cmd or Alt with any key | Ignored by the calculator | The browser's own shortcut runs, including paste (Cmd/Ctrl+V). |
| Paste | Pastes one figure | Uses the browser's own paste command. |

- Typing any calculator key while a control has focus moves focus off it, so the next Enter is `=` (Decision 13).
- A mouse click on a keypad key leaves no focus on it.
- During a fault, the on-screen C key and Escape reset the calculation, and every other input does nothing.

---

## 6. Accessibility

- **Live region.** The display is a polite live region; the expression line is not live.
  - In the pending state the display region holds a visually hidden operator word, so pressing `+` after `12` is heard as "12 plus".
  - Errors, the fault message and refusal messages are announced politely, the same way.
  - Keys with no effect announce nothing.
- **Keys are real `<button>` elements, each named with a word:**
  - plus, minus, multiply, divide, equals
  - clear, clear entry, backspace, change sign, decimal point
  - digits are named by their digit
- **Spoken forms.** Symbols are given a hidden spoken form, and the glyph itself is hidden from screen readers:
  - ≈ is "approximately"
  - − is "minus"
  - × is "times"
  - ÷ is "divided by"
  - → is "then"
  - `× 10²⁹` is "times 10 to the power 29"
- **The tape** is an ordered list labelled "Tape". Each line is one item, read in full, and recallable with Enter or Space. The list is a single Tab stop, with ↑ and ↓ moving between lines.
- **Focus** is always visible: a 2px ring in `--color-focus` with a 2px offset, meeting 3:1 against every surface it can sit on. Focus is never trapped. There are no modals, and the tape's scroll area is reached and left with Tab.
- **Targets** are at least 44 by 44px, at every width down to 320px.
- **Colour is never the only carrier of meaning:**
  - Errors are words.
  - ≈ is a character.
  - The waiting empty-tape control changes its label.
  - Messages have a bar at the start as well as text.
  - Focus is a ring, not a colour change.
- **Banned words.** The UI never shows "precision" or "floating point".

---

## 7. Design tokens

These are the values the app must use. The same values are in `mockup.html`, which renders them. Light and dark come from `prefers-color-scheme`; there is no theme switcher.

### Colour

| Token | Light | Dark |
|---|---|---|
| `--color-bg` | `#F6F7F9` | `#101215` |
| `--color-surface` | `#FFFFFF` | `#181B1F` |
| `--color-text` | `#16191D` | `#EEF1F4` |
| `--color-text-muted` | `#545B64` | `#A4ACB6` |
| `--color-key-bg` | `#EEF1F4` | `#23272C` |
| `--color-key-op-bg` | `#E2E7ED` | `#2C3238` |
| `--color-key-border` | `#8A929C` | `#6E7781` |
| `--color-key-equals-bg` | `#1D4F80` | `#8DBDF0` |
| `--color-key-equals-text` | `#FFFFFF` | `#0B1A2A` |
| `--color-legend` | `#5B626B` | `#A0A8B2` |
| `--color-legend-on-equals` | `#D6E4F2` | `#1E3550` |
| `--color-error` | `#A3260F` | `#FF9E8C` |
| `--color-armed-bg` | `#FFF1D6` | `#3A2C0E` |
| `--color-armed-border` | `#8A5A00` | `#D9A441` |
| `--color-focus` | `#0A5CB8` | `#8CC8FF` |
| `--color-rule` | `#DDE1E6` | `#2A2F35` |

### Contrast, WCAG AA

Text needs 4.5:1. Non-text parts (outlines and focus rings) need 3:1. Every pairing passed on the first values, so none were changed.

| Foreground | Background | Used for | Needs | Light | Dark |
|---|---|---|---|---|---|
| `text` | `surface` | Display, keys' panel text | 4.5:1 | 17.63 pass | 15.24 pass |
| `text` | `bg` | Tape result column | 4.5:1 | 16.45 pass | 16.55 pass |
| `text-muted` | `surface` | Expression line, messages | 4.5:1 | 6.87 pass | 7.53 pass |
| `text-muted` | `bg` | Tape working, line numbers, empty-tape hint | 4.5:1 | 6.41 pass | 8.18 pass |
| `text` | `key-bg` | Digit key labels | 4.5:1 | 15.55 pass | 13.25 pass |
| `text` | `key-op-bg` | Operator and control key labels | 4.5:1 | 14.18 pass | 11.43 pass |
| `legend` | `key-bg` | Key legends on digit keys (12px) | 4.5:1 | 5.44 pass | 6.25 pass |
| `legend` | `key-op-bg` | Key legends on operator keys (12px) | 4.5:1 | 4.96 pass | 5.39 pass |
| `key-equals-text` | `key-equals-bg` | = key label | 4.5:1 | 8.46 pass | 8.93 pass |
| `legend-on-equals` | `key-equals-bg` | = key legend (Enter) | 4.5:1 | 6.54 pass | 6.35 pass |
| `error` | `surface` | Error and fault text | 4.5:1 | 7.39 pass | 8.66 pass |
| `text` | `armed-bg` | Empty-tape control waiting for second press | 4.5:1 | 15.79 pass | 11.98 pass |
| `key-border` | `surface` | Key outline against panel (non-text) | 3.0:1 | 3.15 pass | 3.80 pass |
| `armed-border` | `bg` | Armed control outline (non-text) | 3.0:1 | 5.53 pass | 8.34 pass |
| `focus` | `surface` | Focus ring on panel (non-text) | 3.0:1 | 6.49 pass | 9.73 pass |
| `focus` | `bg` | Focus ring on tape (non-text) | 3.0:1 | 6.05 pass | 10.56 pass |
| `focus` | `key-bg` | Focus ring against key fill (non-text) | 3.0:1 | 5.72 pass | 8.46 pass |

### Type

- **Family:** `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. No web fonts, so nothing is downloaded.
- **Digits:** `font-variant-numeric: tabular-nums` on the display, expression line and tape, so every digit is the same width.

| Token | Size | Weight | Used for |
|---|---|---|---|
| `--font-size-display` | 2.5rem (40px) | 500 | Display, up to 12 characters |
| `--font-size-display-medium` | 2rem (32px) | 500 | Display, 13 to 18 characters |
| `--font-size-display-long` | 1.5rem (24px) | 500 | Display, 19 or more characters, errors and fault |
| `--font-size-display-long-compact` | 1.1875rem (19px) | 500 | Display long size at 900px and below |
| `--font-size-key` | 1.25rem (20px) | 500 | Key labels |
| `--font-size-key-compact` | 1.125rem (18px) | 500 | Key labels at 900px and below |
| `--font-size-expression` | 1rem (16px) | 400 | Expression line |
| `--font-size-tape` | 1rem (16px) | 400 | Tape lines |
| `--font-size-message` | 1rem (16px) | 400 | Message line |
| `--font-size-label` | 0.875rem (14px) | 500 | Toggle, empty-tape control, tape heading |
| `--font-size-legend` | 0.75rem (12px) | 400 | Key legends, tape line numbers |

- The display is the largest type at every size step and width, as Decision 15 requires: 19px compact long display against 18px compact keys.
- If a display value is still too wide, it wraps rather than being cut.

### Spacing, radius, size

| Token | Value |
|---|---|
| `--space-1` … `--space-7` | 4px, 8px, 12px, 16px, 24px, 32px, 48px |
| `--radius-sm`, `--radius-md`, `--radius-lg` | 4px, 8px, 12px |
| `--size-key-min` | 44px |
| `--size-key-height` | 56px (48px at 900px and below) |
| `--size-rail` | 400px |
| `--size-gutter` | 16px |
| `--focus-ring` | 2px solid `--color-focus`, offset 2px |
| Breakpoint | 900px. CSS variables cannot be used in media queries, so this one is a constant in the CSS. |
