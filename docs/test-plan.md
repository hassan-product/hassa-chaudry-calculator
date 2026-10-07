# Manual test plan

A check by hand of the 16 Implemented stories (see the status table in `user-stories.md`), for someone who has never seen the app. It takes under ten minutes. Each step names the criteria it shows.

**Before you start**
- Open the app: run `npm run dev` and go to the address it prints (usually http://localhost:5173/), or use the hosted copy at https://hassa-chaudry-calculator.vercel.app/.
- Use Chrome on a computer with a mouse, in a window wider than 900px. Steps 26 to 30 change the window, zoom and settings; step 31 needs a phone.
- "Type" means use the keyboard; "click" means use the mouse on the on-screen key. Press Escape between steps unless the step carries on from the one before.
- The fault (S-9, AC-9.9 to AC-9.11) cannot be caused by hand. It is covered by automated tests that run the whole app with a deliberately broken engine.

## Typing and exact sums

- [ ] **1.** Type `1234.50`. **Expect:** the display shows `1234.50`, with no comma. (AC-1.1)
- [ ] **2.** Escape, then type `1234567890123456`. **Expect:** the display stops at `123456789012345` and "15 digits maximum" appears below it, with a bar at its left. Press Shift: the message goes. (AC-1.5, AC-1.7)
- [ ] **3.** Type `0.1+0.2=`. **Expect:** `0.3`, with no ≈. Then type `1.005*100=`. **Expect:** `100.5`. (AC-3.1, AC-3.2)
- [ ] **4.** Type `5`, click **+/−**, then type `+5=`. **Expect:** `0`, never `−0`. (AC-3.7)

## Order of operations and ≈

- [ ] **5.** Type `2+3*`. **Expect:** the small line above the display reads `5 ×`. Type `4=`. **Expect:** `20`. (AC-4.1, AC-4.2)
- [ ] **6.** Type `2+*4=`. **Expect:** `8`; the second operator replaced the first. (AC-4.3, AC-4.4)
- [ ] **7.** Type `100/3=`. **Expect:** `≈ 33.3333333333333`, with ≈ drawn bold in a small outlined box. Type `*3=`. **Expect:** `≈ 100`. (AC-5.1, AC-5.2)
- [ ] **8.** Type `123456789012345+0.5=`. **Expect:** `≈ 123,456,789,012,346`. (AC-5.5)

## Very large and very small

- [ ] **9.** Type `999999999999999+1=`. **Expect:** `1 × 10¹⁵`, with no ≈. (AC-6.1)
- [ ] **10.** Type `10000000000*10000000000=`, then press `=` seven more times. **Expect:** `1 × 10⁹⁰`. Press `=` once more. **Expect:** "Number too large", and no new line on the tape. (AC-6.5, AC-6.6)

## Correcting and carrying on

- [ ] **11.** Type `123`, then Backspace. **Expect:** `12`. Escape, type `5+12`, press Delete, type `3=`. **Expect:** `8`. (AC-7.1, AC-7.2)
- [ ] **12.** Type `5+3*`, then Backspace. **Expect:** nothing changes; the small line still reads `8 ×`. (AC-7.7)
- [ ] **13.** Type `5+3==`. **Expect:** `11`, and the newest tape line reads `8 + 3 = 11`. Then type `9`. **Expect:** `9`, and the small line is empty. (AC-8.1, AC-8.3)

## Errors and the ways out

- [ ] **14.** Type `5/0=`. **Expect:** "Cannot divide by zero" in red. Press `+`, `=`, Backspace, and click **+/−** and **M+**: **expect** nothing changes. Type `7`. **Expect:** `7`. (AC-9.1, AC-9.2, AC-9.4)
- [ ] **15.** Type `5/0=`, then Escape. **Expect:** `0`. Repeat with Delete (`0`) and with `.` (`0.`). (AC-9.6)

## Keyboard

- [ ] **16.** Click **5**, **+**, **7** with the mouse, then press Enter. **Expect:** `12`; Enter acted as =, not as another 7. (AC-2.13)
- [ ] **17.** Type `12.5*4` and press Enter. **Expect:** `50`. If there is a numpad: do the same on the numpad with numpad Enter (`50`); on an Apple keyboard, numpad Clear clears. (AC-10.1, AC-10.2, AC-10.5)
- [ ] **18.** Press Tab repeatedly from the top of the page. **Expect:** a blue ring round each key in turn, row by row, then the tape and its controls; after the last one, focus leaves the page. (AC-10.10, AC-10.20, AC-10.21)
- [ ] **19.** Tab to **+/−** with `5` showing and press Enter. **Expect:** `−5`. Tab to **M+** and press Space. **Expect:** `M −5` appears top left. (AC-10.8, AC-10.9)
- [ ] **20.** Escape, then hold down `9`. **Expect:** nines up to 15 digits, then "15 digits maximum". (AC-10.18)

## Paste

- [ ] **21.** Select and copy `£1,234.56` from this page. Click an empty part of the calculator and paste (Cmd+V or Ctrl+V). **Expect:** `1234.56`. Type `+`. **Expect:** the small line reads `1,234.56 +`. (AC-11.1, AC-11.5)
- [ ] **22.** Copy `1.234,56` and paste. **Expect:** "Unclear which mark is the decimal point", and the figure is unchanged. (AC-11.6)

## Tape, recall and memory

- [ ] **23.** Type `2+3*4=`. **Expect:** the tape on the right gains `2 + 3 = 5 → × 4 = 20`, with `20` in the right-hand column. (AC-12.1)
- [ ] **24.** Type `100/3=`, Escape, then click that tape line. **Expect:** `≈ 33.3333333333333`. Tab into the tape: Up and Down move between lines, Left and Right do nothing, Enter recalls. (AC-13.1, AC-13.3)
- [ ] **25.** Escape. Type `120.5+30=` and click **M+**; `75*2=` and **M+**; `9.99*3=` and **M+**. **Expect:** `M 330.47` top left, and a quiet `M+ …, memory …` line on the tape for each. Click **MR**. **Expect:** `330.47`. (AC-19.1 to AC-19.3)
- [ ] **26.** Click **Empty tape**. **Expect:** it reads "Press again to empty" and the tape is unchanged. Click elsewhere: it reverts. Click it twice: the tape shows "Finished calculations appear here", and `M 330.47` is still there. Reload the page. **Expect:** no tape and no M indicator. (AC-14.1 to AC-14.3, AC-14.5, AC-12.12, AC-19.15)

## Look, layout and size

- [ ] **27.** Look at the keypad. **Expect:** six rows of four keys, all the same size; the memory row outlined and lighter; ÷ × − + in blue, = darkest; small grey legends (Esc, Del, Bksp, /, *, -, +, Enter) centred at the bottom of those keys. Hover a key: its fill and label colour change. Hold the mouse down on a key: it looks pressed, unlike hover. Hover **+/−**: a "Change sign" tooltip. (AC-2.2 to AC-2.5, AC-2.14, AC-2.15)
- [ ] **28.** Narrow the window below 900px. **Expect:** one centred column, with a "Show tape" button between the display and the keys, closed. Click it: the tape opens there and reads "Hide tape"; clicking a line recalls it. (AC-12.10, AC-12.11, AC-13.13)
- [ ] **29.** In Chrome DevTools, turn on the device toolbar and set the width to 320. **Expect:** every key at least 44px, no legends, nothing overlapping. (AC-2.8, AC-2.12)
- [ ] **30.** Back at full width, zoom to 200% (Cmd/Ctrl and +). **Expect:** nothing cut off or overlapping; keys shorter, page scrolls. Zoom to 400%. **Expect:** one column, no sideways scrolling; type `5/0=` and the message is readable. Reset zoom. Switch the computer to dark mode: the page follows. In Chrome settings set the font size to Large: all text and keys grow. (AC-20.2 to AC-20.5, AC-20.9, AC-2.11)
- [ ] **31.** On a phone, open the hosted copy. Tap a digit twice quickly. **Expect:** two digits, and the page does not zoom. After a tap, no key stays highlighted. (AC-2.7, AC-2.16)

## Where Safari and Firefox are most likely to differ from Chrome

Only Chrome on macOS and a phone browser have been checked by hand.

- **Focus rings (`:focus-visible`).** Safari does not move focus to a button on click, and by default Tab in Safari skips buttons unless "Press Tab to highlight each item on a webpage" is on (Safari settings, Advanced). Step 18 may then reach only the tape. Firefox shows the ring like Chrome, but its own default ring may appear on the "Empty tape" control, which uses the browser's ring rather than the blue one.
- **The live announcement.** The display is a polite live region. VoiceOver with Safari, NVDA with Firefox and screen readers with Chrome time and phrase polite announcements differently, and may skip one that changes quickly, such as holding a key down. Only "12", "12 plus" and "15" have been heard, in VoiceOver.
- **Light and dark (`prefers-color-scheme`).** Chrome and Safari follow the operating system. Firefox has its own "Website appearance" setting that can override the system, so the page can be light while macOS is dark.

## Screenshots worth taking

None are committed; the README stands without them. If you take them, these show the most for the least:

| Screenshot | Width | Why |
|---|---|---|
| Desktop with a working tape, light | 1440px | Calculator and tape side by side, results aligned on the point, ≈ chips |
| The same, dark | 1440px | The dark tokens |
| An error with a message | 320px | Reserved space: the keypad does not move |
| Tape open behind the toggle | 320px | The narrow layout and stacked tape lines |
| 200% zoom | 720px (a 1440px window at 200%) | Legends hidden, keys shortened, page scrolling |
| A wrapped exponential result | 360px (400% zoom) | Long results wrap and are never cut |
