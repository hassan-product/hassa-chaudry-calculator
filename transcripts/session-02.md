
❯ <ide_opened_file>The user opened the file /Users/chaudry/Desktop/2026-10-07-0
  30424-before-any-code-i-want-to-agree-what-we-are-buil.txt in the IDE. This
  may or may not be related to the current task.</ide_opened_file>

❯ Read the repo and the transcript shared and see if you have the complete
  context of where the things stand, what was built and whats pending

⏺ I'll start by looking at the repo layout, git history and the transcript's
  size.

  Ran 1 shell command (ctrl+o to expand)

⏺ No source code yet, only docs and a scaffold. Now the transcript.

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ The transcript ends with the mockup updated and the user about to review it.
  Now I'll check the repo docs against it.

  Searched for 2 patterns (ctrl+o to expand)

⏺ Let me check the decision coverage table and the planned module list, since
  those drive the build.

  Searched for 1 pattern, ran 2 shell commands (ctrl+o to expand)

⏺ I have the full context. Every step in the transcript has a matching commit in
  the repo, the working tree is clean, and main matches origin/main (35
  commits, all pushed).

  Where things stand

  Specification and design are done. No app code exists yet. src/ has only
  .gitkeep placeholders. There is no index.html or main.tsx, so npm run dev and
  npm run build don't work yet. npm test passes only because passWithNoTests is
  set in vite.config.ts, and that flag is marked for removal once real tests
  exist.

  What's been written

  - CLAUDE.md: the working brief and 20 frozen Decisions (plus 15a). It includes
    the two reversals marked Changed (memory is back; all five operators take
    the accent colour) and the standing rule for unspecified behaviour.
  - docs/app-roles.md: R-1 and R-2. Each must-never clause is its own sentence,
    and each role has a section on where the two roles' needs conflict.
  - docs/jobs-to-be-done.md: J-1 to J-11. All pass the no-app rule.
  - docs/user-stories.md: 21 stories and 271 criteria with AC IDs, all marked
    Not implemented.
    - In scope: S-1 to S-15, S-19 (memory) and S-20 (low vision).
    - Cut: S-16 (edit tape line), S-17 (percent/tax), S-18 (CSV), S-21 (sound).
    - A decision-coverage table sits at the end.
  - docs/product-brief.md, docs/architecture.md and ADRs 0001–0009:
    - Architecture has the layer rules, the planned modules, three Mermaid
      diagrams, the error model, memory placement and 9 fitness functions.
    - Gaps G-1 to G-6 are all resolved.
  - docs/ux/wireframes.md and docs/ux/mockup.html: layout C "Ledger", flipped,
    with the 6×4 keypad, memory, key states, the 320px view, 200% zoom, tokens
    and 35 contrast pairings per theme, all passing AA.

  What's pending

  Where the transcript stopped: you were about to review the rebuilt mockup. You
  said no app code until you approve it, and the flow diagrams are on hold
  until then.

  Waiting on your review:
  1. The mockup itself, including the fix for the state name bar overlapping the
     cards. That fix is unconfirmed: it never appeared in Chrome, and the guess
     was that CSS zoom misbehaves in Safari, so please check it in your
     browser.
  2. The 11 choices from the last round (memory edge cases, numpad decimal, the
     40rem cap, key heights and others). They're already in Decisions but open
     for you to overrule.
  3. The brief is about 1,475 words, over its two-page limit. It's waiting on
     whether you want it trimmed.

  After approval:
  4. The flow diagrams.
  5. The build: domain → app → ui, with tests named by story ID, a layer-import
  test, and the other fitness functions. The first thing to check is whether
  Safari delivers a paste to a page with no text field (an open question in the
  brief; if it doesn't, it becomes an ADR).
  6. Flip each story to Implemented as its criteria pass, and do the VoiceOver
  check.
  7. Write the final README. It currently says "project setup only".
  8. transcripts/session-01.md is empty (0 lines). It's one of the fixed
  required files. The Desktop transcript looks like its source, but it has
  collapsed tool output and an [Image #1] placeholder, so you may want to decide
  how it gets cleaned up first.

  Small inconsistencies I noticed

  - Tape arrow keys. Moving between tape lines with ↑/↓ was accepted under "all
    recommendations", and it's in AC-13.3 and the wireframes. Decision 10 in
    CLAUDE.md only mentions click, Enter and Space, so the arrow-key rule isn't
    written into Decisions.
  - Memory indicator component. The layer diagram in architecture.md has no
    component for the M indicator or the tooltip. Presumably Display covers
    them, but it isn't stated.

  Neither one blocks review. I can fix both whenever you want.

❯ Checked the mockup. Your summary matches where things stand, and you are
  right on both inconsistencies. Fixes first, then the transcript, then the
  diagrams. The eleven choices from the last round all stand.

  Three things from the mockup itself.

  Legends. They sit in the bottom right corner, they are tiny, and Enter is
  almost touching the =. Centre each legend horizontally under the main label,
  in its own row at the bottom of the key, with clear space between the label
  and the legend and some margin from the key edge. Legends are at least 14px
  (0.875rem), still muted. Recheck their contrast at the new size on every key
  type, in light and dark, and show the results in the table.

  The ≈ on the tape is hard to tell from =. Line 2 reads like "100 ÷ 3 = =
  33.33" and "= = 100", and line 11 the same. ≈ is the only signal that a
  number is not exact, so it must never be mistaken for =, least of all by
  someone with weak eyesight. Make ≈ clearly different from = at every size it
  appears, on the tape, the expression line, the display and the M indicator.
  Check it at actual size, not in the frames drawn at 50%.

  The dashed borders on the memory row look like disabled keys, and someone
  could think MR does not work. Keep the memory row quieter, but use a solid
  style, for example a lighter fill or a lighter border, not a dashed one.
  Check the pairings still pass AA.

  Update Decision 15, the wireframes and the mockup for all three.

  Fixes.

  1. The fault text leaves out memory, but memory is kept too. Change it
  everywhere to: "Something went wrong inside the calculator. It was not caused
  by anything you entered. Your tape and memory are kept. Press C or Escape to
  start again." That is CLAUDE.md, AC-9.9, the wireframes and the mockup.

  2. architecture.md still has the old fault text in the FAULT_TEXT comment in
  the error model. Update it to the text above. Then search every document for
  any other copy of an old fault text, the old keypad or ± used as a key label,
  and fix what you find. Leave the gaps table as it is, that is history.

  3. The state diagram shows memory going out of range only from Result.
  Decision 19 says it can happen wherever M+ or M− works, so add that
  transition from Ready, Entering, Recalled and Pending as well.

  4. Decision 19 says MC works at any time, and the next line says every memory
  key does nothing during a fault. Reword it to say MC works at any time
  except during a fault, so the two lines agree.

  5. The tape arrow keys. Add them to Decision 10: the tape is one Tab stop, Up
  and Down move between lines, Enter or Space recalls the line, Tab leaves the
  tape. Outside the tape the arrow keys do nothing. Add the same to the
  keyboard map in the wireframes.

  6. The layer diagram. Say the M indicator is part of Display and the Change
  sign tooltip is part of Keypad, unless the documents already put them
  somewhere else.

  The brief at about 1,475 words is fine, keep it. The two page limit was mine
  and the additions need the space.

  Commit the mockup changes, then the fixes, each on its own. Tell me when the
  mockup is ready so I can open it again.

  Transcript. Take the file on my Desktop named
  2026-10-07-030424-before-any-code-i-want-to-agree-what-we-are-buil.txt and
  place it in the repo as transcripts/session-01.md, replacing the empty file
  that is there now. Do not edit, tidy or summarise it. The collapsed tool
  output and the image placeholder stay as they are, because that is what the
  export produced. Before committing, scan it for passwords, API keys and
  tokens. If you find any, show me the line and stop. Otherwise commit it on
  its own.

  Then three flow diagrams as high resolution PNG images in docs/diagrams.

  1. User flow. How each role moves through the calculator. For the Everyday
  user, a quick sum, a slip corrected while typing, and getting out of an
  error. For the Desk Checker, pasting a figure, a chain of steps, reading the
  tape, recalling a line, seeing ≈, and building a running total with M+ across
  separate calculations and reading it back with MR. Show the refusal, error
  and fault paths, not only the happy path.

  2. App flow. The engine from the state diagram in architecture.md: every
  state, every transition, the ways out of each error, where ≈ is set and
  cleared, which transitions write a calculation line and which write a memory
  line. Show the path a key press takes, from the keyboard listener in app,
  through the reducer in domain, to what the view shows.

  3. Architecture flow. The layers, every dependency arrow pointing inwards,
  decimal.js behind its single wrapper, memory in the domain, the tape and
  memory held only in page memory, and the browser as the only runtime, with no
  server, no storage and no network.

  Every diagram must match what the documents already say. Do not add
  behaviour. If a diagram shows something the documents do not, change the
  diagram, not the documents.

  Write each one as a Mermaid source file in docs/diagrams, styled with the
  design tokens from docs/ux so the colours, type and spacing match the mockup.
  Readability comes first: clear labels, consistent shapes per kind of thing,
  a small legend, and nothing cramped.

  Render them with npx -y @mermaid-js/mermaid-cli at three times scale on a
  white background, as PNG, without adding it to package.json. Check that each
  PNG is sharp enough to read every label at normal zoom. If one is not, fix
  the layout before you commit.

  Embed all three in architecture.md, and add the regenerate command to a short
  README inside docs/diagrams. Commit the sources and the images together.

⏺ I'll start with the files I need to change: the mockup, the wireframes, and
  the generator script from the earlier session, if it still exists.

  Read 1 file, listed 1 directory (ctrl+o to expand)

⏺ The generator from the last session is still in its scratchpad. I'll check
  that it reproduces the committed mockup exactly before using it.

  Ran 3 shell commands (ctrl+o to expand)

⏺ The generator reproduces the committed mockup byte for byte, so I'll edit it
  rather than patch the HTML.

  Read 2 files (ctrl+o to expand)

⏺ Next, the documents these changes touch: CLAUDE.md with line numbers, then the
  parts of the wireframes and architecture I'll edit.

  Searched for 1 pattern, ran 2 shell commands (ctrl+o to expand)

⏺ Now the wireframes: the keypad legend, key states, keyboard map, accessibility
  and tokens sections.

  Ran 3 shell commands (ctrl+o to expand)

⏺ I've settled on the plan: legends centered in a bottom row at 14px with taller
  keys, ≈ shown as a bold mark in an outlined chip for shape/weight
  distinction, and the memory row given a solid outline with no fill instead of
  a dashed border. Now I'll check the candidate colours before implementing.

  Ran 1 shell command (ctrl+o to expand)

⏺ The pressed-key legends weren't in the contrast table and three pairings fail
  AA, though the ≈ chip candidates all pass. I'll find a passing color for the
  operator legend when pressed.

  Ran 1 shell command (ctrl+o to expand)

⏺ I'll edit the token file: a new pressed-operator legend colour, the three ≈
  chip colours, and the extra pairings.

  Ran 1 shell command (ctrl+o to expand)

⏺ All 41 pairings now pass in both themes. Next I'll update the generator:
  centered 14px legends, 5rem keys with legends, a solid memory row, the ≈ chip
  wherever it appears, and a new section showing ≈ at actual size.

  Searched for 1 pattern (ctrl+o to expand)

⏺ Now the generator edits.

  Ran 1 shell command (ctrl+o to expand)

⏺ Now the new "≈ at actual size" section and the page text that describes the
  tokens.

  Ran 1 shell command (ctrl+o to expand)

⏺ The M indicator sample shows a cut-down total (M ≈ 33.3), which breaks result
  formatting. I'll split it into its own state with the full figure, then
  render.

  Ran 2 shell commands (ctrl+o to expand)

⏺ I'll write a helper that cuts chosen states out of the mockup into a small
  page, then screenshot that page in headless Chrome at actual size.

  Ran 2 shell commands (ctrl+o to expand)
⏺ Chrome writes the screenshot but never exits. I'll stop the stuck process and
  switch to a small Python wrapper that ends Chrome once the file appears.

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ The chip's class name approx collides with the existing .line.approx class on
  tape lines, which wrecks the tape grid. I'll rename the chip class to
  approx-mark and re-render.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Background command "Build selection pages and take screenshots" completed
(exit code 0)

  Read 1 file (ctrl+o to expand)

⏺ ≈ now reads clearly differently from = at actual size, on the tape, expression
  line, display and M indicator, in both themes. Next, the stacked 320px tape
  (cut off above) and the keys.

  Read 2 files, ran 1 shell command (ctrl+o to expand)

⏺ The stacked 320px tape renders correctly, and I'll keep the empty legend row
  for keys without one so labels stay aligned with operators in the same row.
  Next I'll check the whole keypad at actual size rather than the 50% view.

  Read 2 files, ran 1 shell command (ctrl+o to expand)

⏺ Keys without a legend currently look top-heavy since their label sits above an
  empty row. At 5rem there's enough room to center every label and pin legends
  to the bottom with ~8px clearance, so I'll adjust the layout to keep all
  labels centered and level.

  Read 2 files, ran 1 shell command (ctrl+o to expand)

⏺ Still on the mockup. With every label centred, the legend now sits only about
  7px under the label, which is the cramped look you objected to. I'm testing a
  taller key to open that gap.

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ I'll revert the key height to 5rem and instead shift all labels uniformly
  above center to free up legend space while keeping rows level.

  Read 2 files, ran 2 shell commands (ctrl+o to expand)

⏺ Labels are now level across every row and legends are properly centered with
  consistent spacing in both themes. I'll save the mockup to the repo and update
  the wireframes to match.

⏺ Bash(cd /private/tmp/claude-501/-Users-chaudry-code-hassa-chaudry-calculator/8
      addebae-dd19-48e8-9f54-c93fb821e2e5/scratchpad/ux && python3
      gen_mockup2.py /Users/chau…)
  ⎿  1 file changed (binary, mode only or too large to show)

⏺ Mockup written. Now updating the wireframes: memory keys drawn solid, legends
  centred, the ≈ chip noted, and the token and contrast tables regenerated from
  the same token file.

⏺ Bash(grep -c '┆' docs/ux/wireframes.md && python3 - <<'EOF'
      import re…)
  ⎿  Updated docs/ux/wireframes.md (+63 -42)
       8  - A **readout** is the top of the calculator: the expression li
          ne, the display and the message line. The keypad does not chang
          e between states, so most states show only the readout.
       9  - `▸` marks the element that has keyboard focus.
      10  - Text in the right margin, after `←`, is annotation, not on sc
          reen.
      11 +- ≈ is drawn as a plain character here. On screen it is always 
         +the ≈ chip: bold, 15% larger than the text around it, in an out
         +lined box (section 8), so it can never be read as `=`. The char
         +acter itself is unchanged.                                     
      12  
      13  ---
      14  
     ...
      16  
      17  The calculator column is never narrower than 480px (30rem); the
           tape takes the rest of the width.
      18  
      18 -The border style shows the key type: dotted `┄` for memory (qui
         -et), light `─` for digits and `C CE ⌫ +/−`, heavy `━` for the f
         -our operators (accent), and double `═` for `=` (strongest accen
         -t). Every key is the same size and shape, with a 12px gap on ev
         -ery side.                                                      
      19 +The border style shows the key type: rounded corners `╭╮` for m
         +emory (quiet: a solid outline, no fill of its own and a regular
         +-weight label; never dashed, which reads as disabled), light `─
         +` for digits and `C CE ⌫ +/−`, heavy `━` for the four operators
         + (accent), and double `═` for `=` (strongest accent). Every key
         + is the same size and shape, with a 12px gap on every side.    
      20  
      21  ### 1.1 Fresh, with an empty tape
      22  
     ...
      26  │                                               0 │ Finished ca
          lculations appear here         │
      27  │                                                 │            
                                         │
      28  │                                                 │            
                                         │
      28 -│ ┌┄┄┄┄┄┄┄┄┄┐ ┌┄┄┄┄┄┄┄┄┄┐ ┌┄┄┄┄┄┄┄┄┄┐ ┌┄┄┄┄┄┄┄┄┄┐ │            
         -                               │                               
      29 -│ ┆         ┆ ┆         ┆ ┆         ┆ ┆         ┆ │            
         -                               │                               
      30 -│ ┆    MC   ┆ ┆    MR   ┆ ┆    M−   ┆ ┆    M+   ┆ │            
         -                               │                               
      31 -│ ┆         ┆ ┆         ┆ ┆         ┆ ┆         ┆ │            
         -                               │                               
      32 -│ ┆         ┆ ┆         ┆ ┆         ┆ ┆         ┆ │            
         -                               │                               
      33 -│ └┄┄┄┄┄┄┄┄┄┘ └┄┄┄┄┄┄┄┄┄┘ └┄┄┄┄┄┄┄┄┄┘ └┄┄┄┄┄┄┄┄┄┘ │            
         -                               │                               
      29 +│ ╭─────────╮ ╭─────────╮ ╭─────────╮ ╭─────────╮ │            
         +                               │                               
      30 +│ │         │ │         │ │         │ │         │ │            
         +                               │                               
      31 +│ │    MC   │ │    MR   │ │    M−   │ │    M+   │ │            
         +                               │                               
      32 +│ │         │ │         │ │         │ │         │ │            
         +                               │                               
      33 +│ │         │ │         │ │         │ │         │ │            
         +                               │                               
      34 +│ ╰─────────╯ ╰─────────╯ ╰─────────╯ ╰─────────╯ │            
         +                               │                               
      35  │                                                 │            
                                         │
      36  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓ │            
                                         │
      37  │ │         │ │         │ │         │ ┃         ┃ │            
                                         │
      38  │ │    C    │ │    CE   │ │    ⌫    │ ┃    ÷    ┃ │            
                                         │
      39  │ │         │ │         │ │         │ ┃         ┃ │            
                                         │
      39 -│ │     Esc │ │     Del │ │    Bksp │ ┃       / ┃ │            
         -                               │                               
      40 +│ │   Esc   │ │   Del   │ │   Bksp  │ ┃    /    ┃ │            
         +                               │                               
      41  │ └─────────┘ └─────────┘ └─────────┘ ┗━━━━━━━━━┛ │            
                                         │
      42  │                                                 │            
                                         │
      43  │ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┏━━━━━━━━━┓ │            
                                         │
     … 221 more lines (ctrl+o to expand)

⏺ The wireframe frames keep their widths, since every replacement is the same
  length. Next, Decision 15 in CLAUDE.md.

⏺ Bash(python3 - <<'EOF'
      p='CLAUDE.md'; s=open(p).read()…)
  ⎿  Updated CLAUDE.md (+3 -2)
      58  13. **Keyboard.** Digits, `.`, `+ - * /` on the top row and the
           numpad; Enter, numpad Enter, `=` and the Apple numpad `=` are 
          equals; Escape and the Apple numpad Clear are clear; Delete is 
          clear entry; Backspace. A character that needs Shift (`*`, `+`)
           counts as that character. The numpad decimal key is the point 
          whatever character it reports. With Num Lock off, the browser's
           reported key is followed (navigation keys do nothing). No shor
          tcuts with Ctrl, Cmd or Alt. +/− and the memory keys have no ke
          y: Tab to them. Enter and Space activate the focused control; w
          ith nothing focused, Enter is =. A mouse click on a key leaves 
          no focus; typing a calculator key moves focus off a focused con
          trol.
      59  14. **Accessibility.** Every action works without a mouse. Disp
          lay changes (figure, running result with its operator, result, 
          error, message) are announced politely; the expression line is 
          not live. The M indicator is announced as "memory" and its tota
          l. Keys with no effect announce nothing. Tested with VoiceOver 
          on macOS Safari only; that check includes the tape being read a
          s a list.
      60  15. **Layout.** Direction C, "Ledger", flipped: calculator left
          , tape right; visual, Tab and screen-reader order calculator fi
          rst. Above 900px the calculator column is never narrower than 4
          80px (30rem) and the tape takes the rest; at 900px and below th
          e same calculator fills the width minus safe margins (at most 4
          0rem, centred), with the tape behind a "Show tape" / "Hide tape
          " toggle, closed by default, between readout and keypad. The ta
          pe is quiet: results in a right-hand column aligned on the poin
          t, ≈ in its own column, line numbers, characters unchanged. An 
          empty tape shows only "Finished calculations appear here". No u
          nits or currency mode. The UI never says "precision" or "floati
          ng point". Visual source of truth: `docs/ux/mockup.html` and it
          s tokens; if the app and that file disagree, one of them is a b
          ug.
      61 -   - **Keypad**, six rows of four, no empty cells, clear spacin
         -g: `MC MR M− M+` / `C CE ⌫ ÷` / `7 8 9 ×` / `4 5 6 −` / `1 2 3 
         -+` / `+/− 0 . =`. All keys the same size and shape. Memory row 
         -in a quieter style. **Changed:** the five operators down the ri
         -ght take the accent colour, = strongest (previously = was the o
         -nly accent key). The sign key is labelled `+/−`, named "change 
         -sign", with a "Change sign" tooltip on hover.                  
      62 -   - **Keys.** Labels at least 24px (1.5rem), centred. Keyboard
         - legends sit in their own row at the bottom of the key, clear o
         -f the label, and show only on devices with a mouse and hover. E
         -very key at least 44px at 320px wide. On a short window keys ge
         -t shorter, never narrower (not below 44px), and the page scroll
         -s. Hover changes the label colour as well as the fill; pressed 
         -and focused each have their own look; focus is a ring, never co
         -lour alone. Every hover and pressed pairing passes WCAG AA in b
         -oth themes. The ÷ × − + = glyphs are scaled (`--key-operator-gl
         -yph-scale`) to match the digits' ink height; their font size st
         -ays 24px.                                                      
      61 +   - **Keypad**, six rows of four, no empty cells, clear spacin
         +g: `MC MR M− M+` / `C CE ⌫ ÷` / `7 8 9 ×` / `4 5 6 −` / `1 2 3 
         ++` / `+/− 0 . =`. All keys the same size and shape. Memory row 
         +in a quieter style: solid outline, no fill of its own, regular-
         +weight label; never dashed, which reads as disabled. **Changed:
         +** the five operators down the right take the accent colour, = 
         +strongest (previously = was the only accent key). The sign key 
         +is labelled `+/−`, named "change sign", with a "Change sign" to
         +oltip on hover.                                                
      62 +   - **Keys.** Labels at least 24px (1.5rem), centred. Keyboard
         + legends sit in their own row at the bottom of the key, centred
         + under the label, at least 14px (0.875rem), muted, with clear s
         +pace from the label and a margin from the key edge, and show on
         +ly on devices with a mouse and hover. With legends showing, eve
         +ry label sits the same small step above centre, so rows stay le
         +vel. Every key at least 44px at 320px wide. On a short window k
         +eys get shorter, never narrower (not below 44px), and the page 
         +scrolls. Hover changes the label colour as well as the fill; pr
         +essed and focused each have their own look; focus is a ring, ne
         +ver colour alone. Every hover and pressed pairing passes WCAG A
         +A in both themes. The ÷ × − + = glyphs are scaled (`--key-opera
         +tor-glyph-scale`) to match the digits' ink height; their font s
         +ize stays 24px.                                                
      63 +   - **≈ mark.** ≈ must never be mistaken for =. It is drawn bo
         +ld, larger than the text around it, in an outlined chip, the sa
         +me on the display, expression line, tape and M indicator at eve
         +ry size. Shape and weight tell it apart, not colour alone; the 
         +character is unchanged.                                        
      64     - **Phones.** No separate build: the 900px-and-below layout.
           Keys do not double-tap zoom (`touch-action: manipulation`), an
          d hover styles apply only on hover devices so none sticks after
           a tap. Only 320px in a desktop browser has been checked; no pr
          omise is made for phone browsers or landscape.
      65     - **Themes.** Light and dark follow `prefers-color-scheme`. 
          No theme menu, no other theme.
      66  15a. **Screen details.** With an operator pending, the display 
          shows the running result. Figures on the expression line, tape 
          and memory use result formatting. An error triggered by an oper
          ator ends the failed step with that operator (`5 ÷ 0 +`). In a 
          fault the expression line is empty. Expression and message line
          s keep their height when empty; messages use text colour with a
           leading bar. The display steps down by length (≤12, ≤18, longe
          r) but is never smaller than the key labels; past that it wraps
          , never cuts. An empty tape hides its heading and control; the 
          region is still named "Tape". A new line scrolls the tape to sh
          ow it. Spoken forms: ≈ "approximately", − "minus", × "times", ÷
           "divided by", → "then", `× 10²⁹` "times 10 to the power 29"; k
          eys are named with words, memory keys as "memory clear", "memor
          y recall", "memory minus", "memory plus".

⏺ Before committing, one look at the top of the full page to check nothing
  overlaps.

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ Nothing overlaps, and the taller keys still fit inside each frame. Committing
  the mockup changes as one unit.

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed: 9e73000 "Make legends, ≈ and the memory row legible". Now fix 1, the
  fault text, in CLAUDE.md, AC-9.9, the wireframes and the mockup.

  Ran 1 shell command (ctrl+o to expand)

⏺ Bash(python3 - <<'EOF'
      import textwrap…)
  ⎿  Updated CLAUDE.md (+1 -1)
      50  6. **Correcting.** Backspace edits only the figure being typed;
           deleting its last character leaves 0; on a result or recalled 
          value it does nothing. Delete (clear entry) resets the figure b
          eing typed to 0, and on a result starts a new calculation at 0.
           Escape (clear) clears the calculation. Neither touches the tap
          e or memory. A second operator replaces the first. +/− while ty
          ping flips that figure. With an operator pending and nothing ty
          ped, +/− and Delete do nothing. Delete on a recalled value give
          s 0 and keeps the pending operator.
      51  7. **After a result.** Repeated = repeats the last operation, e
          ach a tape line (`8 + 3 = 11`). An operator continues from the 
          result (5 = + 2 = gives 7, own line). A digit, point, paste, re
          call or MR starts a new calculation, forgetting the last operat
          ion. = with no operator (`5 =`) or straight after one (`2 + =`)
           does nothing. +/− on a result flips it, keeps ≈, writes no lin
          e.
      52  8. **Errors.** "Cannot divide by zero" (x ÷ 0, 0 ÷ 0), "Number 
          too large" (rounded size ≥ 1e100), "Number too small" (non-zero
           rounded size < 1e-99, never 0). One error state, no tape line.
           Escape, Delete, a digit, the point, paste, recall and MR leave
           it by starting a new calculation; operators, =, +/−, Backspace
          , M+ and M− do nothing; MC works.
      53 -   - **Fault** (a bug throws anyway): "Something went wrong ins
         -ide the calculator. It was not caused by anything you entered. 
         -Your tape is kept. Press C or Escape to start again." C or Esca
         -pe resets the calculation and keeps tape and memory; every othe
         -r input does nothing. Announced like an error. Never needs a re
         -load.                                                          
      53 +   - **Fault** (a bug throws anyway): "Something went wrong ins
         +ide the calculator. It was not caused by anything you entered. 
         +Your tape and memory are kept. Press C or Escape to start again
         +." C or Escape resets the calculation and keeps tape and memory
         +; every other input does nothing. Announced like an error. Neve
         +r needs a reload.                                              
      54  9. **Paste.** One figure via the browser's own paste, no paste 
          button; surrounding whitespace trimmed. £ $ € and spaces stripp
          ed, and commas followed by exactly three digits. Leading -, + o
          r − accepted before or after the symbol (`-£5`, `£-5`). Refused
           with the figure unchanged: unreadable, or tabs/line breaks ins
          ide, "Couldn't read that as a number"; not UK/US style (`1.234,
          56`, `1,23`) "Unclear which mark is the decimal point"; bracket
          s "Use a minus sign for negative numbers"; over 15 digits "15 d
          igits maximum". A refused paste in an error leaves the error. A
          n accepted paste lands where a recall does and can be edited wi
          th Backspace.
      55  10. **Recall.** A click, or Enter or Space, on a tape line reca
          lls its final result as the full 34-digit value with its ≈. Whi
          le typing it replaces the figure; after an operator it is the n
          ext figure; after =, at the start or in an error it starts a ne
          w calculation. Backspace does not edit it; a digit replaces it.
      56  11. **Tape.** One line per =, every step with its running resul
          t: `2 + 3 = 5 → × 4 = 20`. Newest last; long lines wrap, never 
          cut. An ordered list with an explicit `role="list"` (CSS can st
          rip list semantics in Safari). Not persisted; the browser keepi
          ng the page in memory on Back is not persistence. Emptying: fir
          st press relabels "Press again to empty"; reverts when focus le
          aves or another key is pressed, no timer; does nothing when emp
          ty; works in an error and leaves it. Emptying the tape does not
           clear memory.
  ⎿  Updated docs/user-stories.md (+1 -1)
      324  - **AC-9.8** Given the display shows "Number too large" or "Nu
           mber too small", when I try each key above, then it behaves ex
           actly like "Cannot divide by zero".
      325  
      326  **After a result or an error**
      327 -- **AC-9.9** Given a fault inside the calculator, when it happ
          -ens, then the display shows "Something went wrong inside the c
          -alculator. It was not caused by anything you entered. Your tap
          -e is kept. Press C or Escape to start again."                 
      327 +- **AC-9.9** Given a fault inside the calculator, when it happ
          +ens, then the display shows "Something went wrong inside the c
          +alculator. It was not caused by anything you entered. Your tap
          +e and memory are kept. Press C or Escape to start again."     
      328  - **AC-9.10** Given the fault message is showing, when I tap `
           C` or press Escape, then the display shows `0`, and the tape a
           nd memory are unchanged.
      329  - **AC-9.11** Given the fault message is showing, when I press
            any other key, paste, recall a line or use a memory key, then
            nothing changes.
      330  
  ⎿  Updated docs/ux/mockup.html (+1 -1)
      310  <section class="state"><h3>Error triggered by an operator (5 ÷
            0 +)</h3><div class="pair"><div class="theme theme-light"><p 
           class="theme-name">Light</p><div class="screen rail"><div clas
           s="calc"><div class="readout"><div class="expr-row"><span clas
           s="mem-ind"></span><span class="expr">5 ÷ 0 +</span></div><div
            class="display size-l error">Cannot divide by zero</div><div 
           class="msg"></div></div></div></div></div><div class="theme th
           eme-dark"><p class="theme-name">Dark</p><div class="screen rai
           l"><div class="calc"><div class="readout"><div class="expr-row
           "><span class="mem-ind"></span><span class="expr">5 ÷ 0 +</spa
           n></div><div class="display size-l error">Cannot divide by zer
           o</div><div class="msg"></div></div></div></div></div></div></
           section>
      311  <section class="state"><h3>Error: Number too large</h3><div cl
           ass="pair"><div class="theme theme-light"><p class="theme-name
           ">Light</p><div class="screen rail"><div class="calc"><div cla
           ss="readout"><div class="expr-row"><span class="mem-ind"></spa
           n><span class="expr">1 × 10⁹⁰ × 10,000,000,000 =</span></div><
           div class="display size-l error">Number too large</div><div cl
           ass="msg"></div></div></div></div></div><div class="theme them
           e-dark"><p class="theme-name">Dark</p><div class="screen rail"
           ><div class="calc"><div class="readout"><div class="expr-row">
           <span class="mem-ind"></span><span class="expr">1 × 10⁹⁰ × 10,
           000,000,000 =</span></div><div class="display size-l error">Nu
           mber too large</div><div class="msg"></div></div></div></div><
           /div></div></section>
      312  <section class="state"><h3>Error: Number too small</h3><div cl
           ass="pair"><div class="theme theme-light"><p class="theme-name
           ">Light</p><div class="screen rail"><div class="calc"><div cla
           ss="readout"><div class="expr-row"><span class="mem-ind"></spa
           n><span class="expr">1 × 10⁻⁹⁹ × 0.000000001 =</span></div><di
           v class="display size-l error">Number too small</div><div clas
           s="msg"></div></div></div></div></div><div class="theme theme-
           dark"><p class="theme-name">Dark</p><div class="screen rail"><
           div class="calc"><div class="readout"><div class="expr-row"><s
           pan class="mem-ind"></span><span class="expr">1 × 10⁻⁹⁹ × 0.00
           0000001 =</span></div><div class="display size-l error">Number
            too small</div><div class="msg"></div></div></div></div></div
           ></div></section>
      313 -<section class="state"><h3>Fault</h3><div class="pair"><div cl
          -ass="theme theme-light"><p class="theme-name">Light</p><div cl
          -ass="screen rail"><div class="calc"><div class="readout"><div 
          -class="expr-row"><span class="mem-ind">M 95</span><span class=
          -"expr"></span></div><div class="display size-l error">Somethin
          -g went wrong inside the calculator. It was not caused by anyth
          -ing you entered. Your tape is kept. Press C or Escape to start
          - again.</div><div class="msg"></div></div></div></div></div><d
          -iv class="theme theme-dark"><p class="theme-name">Dark</p><div
          - class="screen rail"><div class="calc"><div class="readout"><d
          -iv class="expr-row"><span class="mem-ind">M 95</span><span cla
          -ss="expr"></span></div><div class="display size-l error">Somet
          -hing went wrong inside the calculator. It was not caused by an
          -ything you entered. Your tape is kept. Press C or Escape to st
          -art again.</div><div class="msg"></div></div></div></div></div
          -></div></section>                                             
      313 +<section class="state"><h3>Fault</h3><div class="pair"><div cl
          +ass="theme theme-light"><p class="theme-name">Light</p><div cl
          +ass="screen rail"><div class="calc"><div class="readout"><div 
          +class="expr-row"><span class="mem-ind">M 95</span><span class=
          +"expr"></span></div><div class="display size-l error">Somethin
          +g went wrong inside the calculator. It was not caused by anyth
          +ing you entered. Your tape and memory are kept. Press C or Esc
          +ape to start again.</div><div class="msg"></div></div></div></
          +div></div><div class="theme theme-dark"><p class="theme-name">
          +Dark</p><div class="screen rail"><div class="calc"><div class=
          +"readout"><div class="expr-row"><span class="mem-ind">M 95</sp
          +an><span class="expr"></span></div><div class="display size-l 
          +error">Something went wrong inside the calculator. It was not 
          +caused by anything you entered. Your tape and memory are kept.
          + Press C or Escape to start again.</div><div class="msg"></div
          +></div></div></div></div></div></section>                     
      314  <section class="state"><h3>Refusal: 15 digits maximum</h3><div
            class="pair"><div class="theme theme-light"><p class="theme-n
           ame">Light</p><div class="screen rail"><div class="calc"><div 
           class="readout"><div class="expr-row"><span class="mem-ind"></
           span><span class="expr"></span></div><div class="display size-
           m">123456789012345</div><div class="msg"><span class="bar" ari
           a-hidden="true"></span>15 digits maximum</div></div></div></di
           v></div><div class="theme theme-dark"><p class="theme-name">Da
           rk</p><div class="screen rail"><div class="calc"><div class="r
           eadout"><div class="expr-row"><span class="mem-ind"></span><sp
           an class="expr"></span></div><div class="display size-m">12345
           6789012345</div><div class="msg"><span class="bar" aria-hidden
           ="true"></span>15 digits maximum</div></div></div></div></div>
           </div></section>
      315  <section class="state"><h3>Refusal: Couldn&#x27;t read that as
            a number</h3><div class="pair"><div class="theme theme-light"
           ><p class="theme-name">Light</p><div class="screen rail"><div 
           class="calc"><div class="readout"><div class="expr-row"><span 
           class="mem-ind"></span><span class="expr">5 +</span></div><div
            class="display size-s">5</div><div class="msg"><span class="b
           ar" aria-hidden="true"></span>Couldn&#x27;t read that as a num
           ber</div></div></div></div></div><div class="theme theme-dark"
           ><p class="theme-name">Dark</p><div class="screen rail"><div c
           lass="calc"><div class="readout"><div class="expr-row"><span c
           lass="mem-ind"></span><span class="expr">5 +</span></div><div 
           class="display size-s">5</div><div class="msg"><span class="ba
           r" aria-hidden="true"></span>Couldn&#x27;t read that as a numb
           er</div></div></div></div></div></div></section>
      316  <section class="state"><h3>Refusal: Unclear which mark is the 
           decimal point</h3><div class="pair"><div class="theme theme-li
           ght"><p class="theme-name">Light</p><div class="screen rail"><
           div class="calc"><div class="readout"><div class="expr-row"><s
           pan class="mem-ind"></span><span class="expr"></span></div><di
           v class="display size-s">0</div><div class="msg"><span class="
           bar" aria-hidden="true"></span>Unclear which mark is the decim
           al point</div></div></div></div></div><div class="theme theme-
           dark"><p class="theme-name">Dark</p><div class="screen rail"><
           div class="calc"><div class="readout"><div class="expr-row"><s
           pan class="mem-ind"></span><span class="expr"></span></div><di
           v class="display size-s">0</div><div class="msg"><span class="
           bar" aria-hidden="true"></span>Unclear which mark is the decim
           al point</div></div></div></div></div></div></section>
  ⎿  Updated docs/ux/wireframes.md (+4 -5)
      271  ┌─────────────────────────────────────────────────┐
      272  │                                                 │
      273  │                                                 │
      274 -│                 Something went wrong inside the │           
      275 -│                calculator. It was not caused by │           
      276 -│              anything you entered. Your tape is │           
      277 -│                kept. Press C or Escape to start │           
      278 -│                                          again. │           
      274 +│  Something went wrong inside the calculator. It │           
      275 +│    was not caused by anything you entered. Your │           
      276 +│  tape and memory are kept. Press C or Escape to │           
      277 +│                                    start again. │           
      278  │                                                 │
      279  └─────────────────────────────────────────────────┘
      280  ```

⏺ The old drawing wrapped at about 32 characters to suggest the larger display
  type. I'll keep that width so the frame still reads as display-sized text.

⏺ Bash(python3 - <<'EOF'
      import textwrap…)
  ⎿  Updated docs/ux/wireframes.md (+5 -4)
      271  ┌─────────────────────────────────────────────────┐
      272  │                                                 │
      273  │                                                 │
      274 -│  Something went wrong inside the calculator. It │           
      275 -│    was not caused by anything you entered. Your │           
      276 -│  tape and memory are kept. Press C or Escape to │           
      277 -│                                    start again. │           
      274 +│                 Something went wrong inside the │           
      275 +│                calculator. It was not caused by │           
      276 +│                 anything you entered. Your tape │           
      277 +│                 and memory are kept. Press C or │           
      278 +│                          Escape to start again. │           
      279  │                                                 │
      280  └─────────────────────────────────────────────────┘
      281  ```

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed: 924e569 "Say memory is kept in the fault message (S-9)". Now fix 2.
  I'll look at every keypad description across the docs for leftovers of the old
  layout.

  Searched for 1 pattern (ctrl+o to expand)

⏺ I've confirmed the old keypad layout no longer exists outside the wireframes,
  which already reflect the new design. I'll now fix the remaining issues: the
  fault text in architecture.md and ADR 0005, plus a mislabeled M± shorthand in
  architecture.md.
⏺ Bash(sed -n '22p' docs/adr/0005-errors-as-values.md && python3 - <<'EOF'
      NEW="Something went wrong inside the calculator. It was not caused by
      anything you entered.…)
  ⎿  Updated docs/adr/0005-errors-as-values.md (+1 -1)
      19  - The type checker forces every caller to handle failure. Error
          s and notices cannot be confused, because they are different ty
          pes.
      20  - **Cost:** every arithmetic call site unwraps a `Result`, whic
          h is wordier than a `try` around a block.
      21  - **Cost:** decimal.js itself throws on malformed strings. The 
          domain has to validate before constructing a `Decimal`, and `do
          main/decimal.ts` is the one place that has to get this right.
      22 -- **Cost:** a genuine bug can still throw. That needs a second,
         - separate path: the app hook and an error boundary catch it and
         - show "Something went wrong. Press Escape to start again." (Dec
         -ision 8). The code then has two failure paths, and the one for 
         -bugs is only exercised when something is already wrong.        
      22 +- **Cost:** a genuine bug can still throw. That needs a second,
         + separate path: the app hook and an error boundary catch it and
         + show "Something went wrong inside the calculator. It was not c
         +aused by anything you entered. Your tape and memory are kept. P
         +ress C or Escape to start again." (Decision 8). The code then h
         +as two failure paths, and the one for bugs is only exercised wh
         +en something is already wrong.                                 
  ⎿  Updated docs/architecture.md (+2 -2)
      155  
      156  - A `≈` is a flag on the running value. It is set when a step 
           is rounded at 34 digits, when the result is cut for display, o
           r when an operand already carried one (Decision 3). A new calc
           ulation clears it.
      157  - **▶ tape** marks the transitions that write a calculation li
           ne. **▶ memory line** marks those that write a memory line.
      158 -- MC, and MR or M± with memory empty, change only memory, or n
          -othing, in every state. Every memory key does nothing during a
          - fault.                                                       
      158 +- MC changes only memory, in every state. MR with memory empty
          + does nothing. Every memory key does nothing during a fault.  
      159  - **notice** marks a refusal that leaves the state unchanged.
      160  
      161  ```mermaid
     ...
      253  export type NoticeCode = 'DIGIT_LIMIT' | 'PASTE_UNREADABLE' | 
           'PASTE_AMBIGUOUS_DECIMAL' | 'PASTE_BRACKETS'
      254  export const ERROR_TEXT: Record<ErrorCode, string>   // "Canno
           t divide by zero", …
      255  export const NOTICE_TEXT: Record<NoticeCode, string> // "15 di
           gits maximum", …
      256 -export const FAULT_TEXT: string // "Something went wrong. Pres
          -s Escape to start again."                                     
      256 +export const FAULT_TEXT: string // "Something went wrong insid
          +e the calculator. It was not caused by anything you entered. Y
          +our tape and memory are kept. Press C or Escape to start again
          +."                                                            
      257  
      258  // domain/result.ts
      259  export type Result<T, E> = { ok: true; value: T } | { ok: fals
           e; error: E }

⏺ The remaining ± occurrences are just in the gaps history table and the
  user-stories.md note explaining the relabel—I'm leaving those as-is since they
  document the change rather than use ± as an actual label.

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed: 2c45a7e "Replace stale fault text in architecture and ADR". Fix 3 adds
  the memory-out-of-range transition to the other four states.

⏺ Bash(python3 - <<'EOF'
      p="docs/architecture.md"; s=open(p).read()…)
  ⎿  Updated docs/architecture.md (+4 -0)
      223      Recalled --> Recalled : M+ or M− ▶ memory line
      224      Pending --> Pending : M+ or M− on the running result ▶ mem
           ory line
      225      Result --> Result : M+ or M− ▶ memory line, memory takes ≈
            if the value has it
      226 +    Ready --> Error : M+ or M− would push memory out of range 
      227 +    Entering --> Error : M+ or M− would push memory out of ran
          +ge                                                            
      228 +    Recalled --> Error : M+ or M− would push memory out of ran
          +ge                                                            
      229 +    Pending --> Error : M+ or M− would push memory out of rang
          +e                                                             
      230      Result --> Error : M+ or M− would push memory out of range
      231      Ready --> Recalled : MR with memory held
      232      Entering --> Recalled : MR replaces the figure

  Ran 3 shell commands (ctrl+o to expand)

⏺ Pushed: 428b2f6 "Show memory overflow from every state M+ works in (S-19)".
  All three diagrams still parse. Fix 4 is the MC wording in Decision 19.

⏺ Bash(python3 - <<'EOF'
      p="CLAUDE.md"; s=open(p).read()…)
  ⎿  Updated CLAUDE.md (+1 -1)
      69  18. **Stack.** Vite, React, TypeScript strict, decimal.js, Vite
          st + React Testing Library + jsdom. CSS Modules, no framework. 
          No backend, env vars or keys. Runs locally on Node 20.19+ from 
          the README; a hosted link is optional.
      70  19. **Memory. Changed:** memory was taken off the table; it is 
          back, alongside the tape. The tape is the record of everything;
           memory holds one running total being built (three invoice tota
          ls added with M+, read with MR). The two original reasons, answ
          ered: recall brings back one value while memory keeps adding; a
          nd memory is no longer hidden state, because every M+ and M− wr
          ites a tape line and an M indicator shows while memory holds a 
          value.
      71     - M+ adds the full internal value showing to memory; M− subt
          racts it. A ≈ value gives memory ≈ until MC. They leave the cal
          culation as it is. Each writes a quiet tape line, `M+ 40, memor
          y 95`, with no `=`; recalling that line brings back the memory 
          total. On a fresh calculator M+ and M− act on the 0 showing. MC
           writes no tape line. A memory total that would be ≥ 1e100 or a
           non-zero size < 1e-99 gives the usual error, memory unchanged,
           no line.
      72 -   - MR behaves like recalling a tape line, including leaving a
         -n error. MC clears memory and works at any time. With memory em
         -pty, MR and MC do nothing. In an error M+ and M− do nothing; in
         - a fault every memory key does nothing.                        
      72 +   - MR behaves like recalling a tape line, including leaving a
         +n error. MC clears memory and works at any time except during a
         + fault. With memory empty, MR and MC do nothing. In an error M+
         + and M− do nothing; in a fault every memory key, MC included, d
         +oes nothing.                                                   
      73     - The M indicator (`M 95`, with ≈ when it has one) shows fro
          m the first M+ or M− until MC, even at 0. Memory survives C and
           Escape and is lost on reload.
      74     - Memory keys have no keyboard key: the usual shortcuts clas
          h with the browser's (Ctrl+P, Ctrl+R). Cost: a keyboard user Ta
          bs to them.
      75  20. **Low vision.** Sizes in rem, so a larger browser default t
          ext size is followed. At 200% zoom nothing is cut off or overla
          ps. At 400% zoom it reflows to one column with no sideways scro
          lling.

  Searched for 1 pattern, ran 1 shell command (ctrl+o to expand)

⏺ Pushed: 35c3475 "Except the fault from 'MC works at any time' (S-19)". Fix 5
  adds the tape arrow keys to Decision 10 and the keyboard map.

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b):…)
  ⎿  Updated CLAUDE.md (+1 -1)
      52  8. **Errors.** "Cannot divide by zero" (x ÷ 0, 0 ÷ 0), "Number 
          too large" (rounded size ≥ 1e100), "Number too small" (non-zero
           rounded size < 1e-99, never 0). One error state, no tape line.
           Escape, Delete, a digit, the point, paste, recall and MR leave
           it by starting a new calculation; operators, =, +/−, Backspace
          , M+ and M− do nothing; MC works.
      53     - **Fault** (a bug throws anyway): "Something went wrong ins
          ide the calculator. It was not caused by anything you entered. 
          Your tape and memory are kept. Press C or Escape to start again
          ." C or Escape resets the calculation and keeps tape and memory
          ; every other input does nothing. Announced like an error. Neve
          r needs a reload.
      54  9. **Paste.** One figure via the browser's own paste, no paste 
          button; surrounding whitespace trimmed. £ $ € and spaces stripp
          ed, and commas followed by exactly three digits. Leading -, + o
          r − accepted before or after the symbol (`-£5`, `£-5`). Refused
           with the figure unchanged: unreadable, or tabs/line breaks ins
          ide, "Couldn't read that as a number"; not UK/US style (`1.234,
          56`, `1,23`) "Unclear which mark is the decimal point"; bracket
          s "Use a minus sign for negative numbers"; over 15 digits "15 d
          igits maximum". A refused paste in an error leaves the error. A
          n accepted paste lands where a recall does and can be edited wi
          th Backspace.
      55 -10. **Recall.** A click, or Enter or Space, on a tape line reca
         -lls its final result as the full 34-digit value with its ≈. Whi
         -le typing it replaces the figure; after an operator it is the n
         -ext figure; after =, at the start or in an error it starts a ne
         -w calculation. Backspace does not edit it; a digit replaces it.
      55 +10. **Recall.** A click, or Enter or Space, on a tape line reca
         +lls its final result as the full 34-digit value with its ≈. Whi
         +le typing it replaces the figure; after an operator it is the n
         +ext figure; after =, at the start or in an error it starts a ne
         +w calculation. Backspace does not edit it; a digit replaces it.
         + From the keyboard the tape is one Tab stop: Up and Down move b
         +etween lines, Enter or Space recalls the line, Tab leaves the t
         +ape. Left and Right do nothing in the tape, and outside the tap
         +e every arrow key does nothing.                                
      56  11. **Tape.** One line per =, every step with its running resul
          t: `2 + 3 = 5 → × 4 = 20`. Newest last; long lines wrap, never 
          cut. An ordered list with an explicit `role="list"` (CSS can st
          rip list semantics in Safari). Not persisted; the browser keepi
          ng the page in memory on Back is not persistence. Emptying: fir
          st press relabels "Press again to empty"; reverts when focus le
          aves or another key is pressed, no timer; does nothing when emp
          ty; works in an error and leaves it. Emptying the tape does not
           clear memory.
      57  12. **Messages** (not errors) stay until the next key press, cl
          ick or paste, no timer, announced like a result.
      58  13. **Keyboard.** Digits, `.`, `+ - * /` on the top row and the
           numpad; Enter, numpad Enter, `=` and the Apple numpad `=` are 
          equals; Escape and the Apple numpad Clear are clear; Delete is 
          clear entry; Backspace. A character that needs Shift (`*`, `+`)
           counts as that character. The numpad decimal key is the point 
          whatever character it reports. With Num Lock off, the browser's
           reported key is followed (navigation keys do nothing). No shor
          tcuts with Ctrl, Cmd or Alt. +/− and the memory keys have no ke
          y: Tab to them. Enter and Space activate the focused control; w
          ith nothing focused, Enter is =. A mouse click on a key leaves 
          no focus; typing a calculator key moves focus off a focused con
          trol.
  ⎿  Updated docs/ux/wireframes.md (+2 -1)
      564  | `Backspace` | Remove the last character typed | |
      565  | `Space` | Activate the focused control | Does nothing when n
           othing has focus. |
      566  | `Tab`, `Shift`+`Tab` | Move focus | Follows visual order. Ab
           ove 900px: keypad row by row (memory row first), then the tape
            (one stop), then the empty-tape control. At 900px and below: 
           the toggle, then the tape when open, then the keypad. Focus is
            never trapped. |
      567 -| `↑` `↓` | Move between tape lines | While the tape has focus
          -. Enter or Space recalls. |                                   
      567 +| `↑` `↓` | Move between tape lines | Only while the tape has 
          +focus; the tape is one Tab stop. Enter or Space recalls the li
          +ne, and Tab leaves the tape. |                                
      568 +| `←` `→`, and `↑` `↓` outside the tape | Nothing | Left and R
          +ight do nothing in the tape either. |                         
      569  | `+/−`, `MC`, `MR`, `M−`, `M+` | No key | Tab to them, then E
           nter or Space. The usual memory shortcuts clash with the brows
           er's (Ctrl+P prints, Ctrl+R reloads), so there are none. The c
           ost: memory is slower from the keyboard than everything else. 
           |
      570  | Ctrl, Cmd or Alt with any key | Ignored by the calculator | 
           The browser's own shortcut runs, including paste. |
      571  | Numpad with Num Lock off | Whatever the browser reports | Na
           vigation keys such as End or ArrowDown do nothing. |

⏺ Pushed commit cd89281 for fix 5. For fix 6, I verified no other document
  places the M indicator or tooltip elsewhere—the wireframes consistently show
  it on the readout's expression row, so Display checks out.

⏺ Bash(python3 - <<'EOF'
      p="docs/architecture.md"; s=open(p).read()…)
  ⎿  Updated docs/architecture.md (+3 -3)
      79  
      80  ## Layers and modules
      81  
      82 -Every arrow is an import, and every arrow points inwards.      
      82 +Every arrow is an import, and every arrow points inwards. The M
         + indicator is part of `Display`, on the readout's top row besid
         +e the expression line. The "Change sign" tooltip is part of `Ke
         +ypad`, on the `+/−` key.                                       
      83  
      84  ```mermaid
      85  flowchart TB
     ...
      87  
      88      subgraph ui["ui"]
      89          App["App.tsx"]
      90 -        Display["Display.tsx"]                                 
      91 -        Keypad["Keypad.tsx"]                                   
      90 +        Display["Display.tsx<br/>readout and M indicator"]     
      91 +        Keypad["Keypad.tsx<br/>keys and Change sign tooltip"]  
      92          Tape["Tape.tsx"]
      93          TapeToggle["TapeToggle.tsx"]
      94          Announcer["Announcer.tsx"]

⏺ Pushed: 9d44306 "Place the M indicator and tooltip in the layer diagram". All
  six fixes are in. Next, the transcript: a secret scan before anything is
  copied.

  Ran 1 shell command (ctrl+o to expand)

⏺ Every hit is the word "token" or "key" in ordinary prose. No passwords, API
  keys or tokens. I'll also check for email addresses and local paths before
  copying.

  Ran 1 shell command (ctrl+o to expand)

⏺ Two public repo URLs and one temporary scratchpad path (line 1910, which
  contains your macOS username) turned up. None is a secret, and you said not to
  edit, so the file goes in verbatim.

⏺ Bash(cp /Users/chaudry/Desktop/2026-10-07-030424-before-any-code-i-want-to-agr
      ee-what-we-are-buil.txt transcripts/session-01.md && cmp
      transcripts/session-01.md /Use…)
  ⎿  1 file changed (binary, mode only or too large to show)

⏺ Pushed commit 2fc7318 with the session 1 transcript, confirmed byte-identical
  to the Desktop file. Next, I'll re-read the docs on the key-press path,
  context, and remaining layer details to ensure the three diagrams match
  exactly.

  Ran 1 shell command (ctrl+o to expand)

⏺ I've found the key-press path: Announcer.tsx manages the live region while
  tape and memory state live in useCalculator. I'll start fetching mermaid-cli
  in the background while drafting the diagram sources.

  Ran 1 shell command (ctrl+o to expand)

⏺ While that installs, I'll re-read the stories the user flow draws from (S-7
  slips, S-11 paste, S-13 recall, S-19 memory) so the diagram uses their exact
  behaviour.

  Ran 1 shell command (ctrl+o to expand)

⏺ I'll use the exact figures from the stories—the 150.5 → 300.5 → 330.47 running
  total from S-19, £1,234.56 from S-11, and the S-7 limit—in the user flow.
  Checking now whether mermaid-cli has finished installing.

  Read 1 file (ctrl+o to expand)

⏺ Background command "Fetch mermaid-cli via npx and check version" completed
(exit code 0)

⏺ mermaid-cli 11.17.0 is ready. Writing the user flow source first.

⏺ Write(docs/diagrams/user-flow.mmd)
  ⎿  Wrote 190 lines to docs/diagrams/user-flow.mmd
       1 ---
       2 title: User flow — how each role moves through the calculator
       3 config:
       4   theme: base
       5   themeVariables:
         s-serif"
       7     fontSize: 16px
       8     primaryColor: "#FFFFFF"
       9     primaryTextColor: "#16191D"
      10     primaryBorderColor: "#808892"
     … +215 lines (ctrl+o to expand)

⏺ Rendering it at 3× on white:

⏺ Bash(cd /Users/chaudry/code/hassa-chaudry-calculator/docs/diagrams && time npx
      -y @mermaid-js/mermaid-cli -i user-flow.mmd -o user-flow.png -s 3 -b
      white 2>&1 | tail…)
  ⎿  1 file changed (binary, mode only or too large to show)
  ⎿  (timeout 5m)
⏺ That rendered tall and narrow (784 × 4604 at 1×), so the lanes stacked instead
  of sitting side by side. Taking a look:

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ Two problems. The lanes stack in one tall column instead of sitting in rows,
  and the text looks like a serif face rather than the system font. Checking the
  font at full size:

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ The text is sharp, but the font token isn't being applied. I'll run two quick
  experiments: one for the font, one for laying the lanes out in rows.

  Ran 1 shell command (ctrl+o to expand)

⏺ Mermaid ignores the font set in the front matter and falls back to its
  default, Trebuchet. I'll try the other ways of passing the font.

  Ran 1 shell command (ctrl+o to expand)

⏺ The font only takes effect as a top-level fontFamily, so I'll set it there.
  Now the layout experiment: two role groups, each meant to hold lanes side by
  side.

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ Dagre handles the nested directions oddly: it puts the role groups side by
  side and stacks the lanes in reverse. Trying the inverse arrangement and the
  ELK layout engine:

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ Switching to ELK with an invisible link between role groups to get R-1 above
  R-2 with side-by-side lanes, and setting the top-level font plus declaring
  lanes in reverse order since they render reversed.

⏺ Bash(cd /Users/chaudry/code/hassa-chaudry-calculator/docs/diagrams && python3
      - <<'EOF'
      import re…)
  ⎿  Updated docs/diagrams/user-flow.mmd (+50 -82)
      2  title: User flow — how each role moves through the calculator
      3  config:
      4    theme: base
      5 +  layout: elk                                                   
      6 +  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-
        +serif"                                                          
      7    themeVariables:
      8      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, san
         s-serif"
      9      fontSize: 16px
     ...
      28    subgraph R1["R-1 Everyday Calculator User"]
      29      direction LR
      30  
      29 -    subgraph R1a["A quick sum (S-3, S-4)"]                     
      31 +    subgraph R1c["Getting out of an error (S-9)"]              
      32        direction TB
      31 -      a1("A number comes up mid-task.<br/>Types 12, presses +")
      32 -      a2["Expression: 12 +<br/>Display: 12"]                   
      33 -      a3("Types 8, presses =")                                 
      34 -      a4["Expression: 12 + 8 =<br/>Display: 20"]               
      35 -      a5[["Tape: 12 + 8 = 20"]]                                
      36 -      a6("Back to what they were doing")                       
      37 -      a1 --> a2 --> a3 --> a4 --> a5 --> a6                    
      33 +      c1("Types 5 ÷ 0 =")                                      
      34 +      c2["Cannot divide by zero<br/>Expression: 5 ÷ 0 =<br/>No 
         +tape line"]                                                    
      35 +      c3("Types 7")                                            
      36 +      c4["Display: 7<br/>a new calculation"]                   
      37 +      c5("C, Escape or Delete")                                
      38 +      c6["Display: 0"]                                         
      39 +      c7["Operators, =, +/−, Backspace,<br/>M+ and M− do nothin
         +g here"]                                                       
      40 +      c1 --> c2 --> c3 --> c4                                  
      41 +      c2 --> c5 --> c6                                         
      42 +      c2 -.- c7                                                
      43      end
      44  
      45      subgraph R1b["A slip while typing (S-7)"]
     ...
       54        b3 -.->|"the figure was already<br/>followed by an opera
           tor"| b5
       55      end
       56  
       52 -    subgraph R1c["Getting out of an error (S-9)"]             
       53 -      direction TB                                            
       54 -      c1("Types 5 ÷ 0 =")                                     
     … 131 more lines (ctrl+o to expand)
  ⎿  … 1 more file changed

⏺ My lane-reversal script accidentally dropped the last lane of each group
  (digit cap, running total, legend). Since the file isn't committed yet, I'll
  rewrite it entirely with the lanes correctly ordered.

⏺ Write(docs/diagrams/user-flow.mmd)
  ⎿  Added 39 lines, removed 3 lines
      22      wrappingWidth: 300
      23  ---
      24  %% Source of docs/diagrams/user-flow.png. Behaviour comes from 
          CLAUDE.md Decisions and docs/user-stories.md only.
      25 -%% Colours are the light-theme tokens in docs/ux/mockup.html.  
      25 +%% Colours and type are the light-theme tokens in docs/ux/mocku
         +p.html.                                                        
      26 +%% The ELK layout places sibling lanes right to left, so each r
         +ow's lanes are declared last-first.                            
      27  flowchart TB
      28  
      29    subgraph R1["R-1 Everyday Calculator User"]
      30      direction LR
      31  
      32 +    subgraph R1d["Too many digits (S-1)"]                      
      33 +      direction TB                                             
      34 +      d1("Has typed 15 digits,<br/>types a 16th")              
      35 +      d2["15 digits maximum<br/>The figure is unchanged.<br/>Th
         +e message stays until<br/>the next key, click or paste."]      
      36 +      d1 --> d2                                                
      37 +    end                                                        
      38 +                                                               
      39      subgraph R1c["Getting out of an error (S-9)"]
      40        direction TB
      41        c1("Types 5 ÷ 0 =")
     ...
      77    subgraph R2["R-2 Desk Checker"]
      78      direction LR
      79  
      80 +    subgraph R2e["A running total in memory (S-19)"]           
      81 +      direction TB                                             
      82 +      m1("Part 1: 120.5 + 30 =<br/>then M+")                   
      83 +      m2[["Tape: M+ 150.5, memory 150.5<br/>Indicator: M 150.5"
         +]]                                                             
      84 +      m3("Part 2: 75 × 2 =, M+<br/>Part 3: 9.99 × 3 =, M+")    
      85 +      m4[["Tape: M+ 150, memory 300.5<br/>M+ 29.97, memory 330.
         +47<br/>Indicator: M 330.47"]]                                  
      86 +      m5("MR")                                                 
      87 +      m6["Display: 330.47<br/>a new calculation starts from it"
         +]                                                              
      88 +      m7["Number too large<br/>Memory unchanged, no tape line"]
      89 +      m1 --> m2 --> m3 --> m4 --> m5 --> m6                    
      90 +      m3 -.->|"the total would be<br/>1e100 or more"| m7       
      91 +    end                                                        
      92 +                                                               
      93      subgraph R2d["Recall a line (S-13)"]
      94        direction TB
      95        r1("Tab to the tape, ↑ ↓ to the line<br/>100 ÷ 3 = ≈ 33.3
          333333333333,<br/>Enter or Space, or a click")
     ...
      142    subgraph Both["Either role"]
      143      direction LR
      144  
      145 +    subgraph L["Legend"]                                      
      146 +      direction TB                                            
      147 +      l1("What the person does")                              
      148 +      l2["What the screen shows"]                             
      149 +      l3[["A line written on the tape"]]                      
      150 +      l4["≈ : the number may not be exact"]                   
      151 +      l5["A refusal message, not an error"]                   
      152 +      l6["An error state"]                                    
      153 +      l7["A fault"]                                           
      154 +      l8["Not built in this version"]                         
      155 +      l9{"A branch"}                                          
      156 +      l10["A note on the step it hangs from"]                 
      157 +      l1 ~~~ l2 ~~~ l3 ~~~ l4 ~~~ l5 ~~~ l6 ~~~ l7 ~~~ l8 ~~~ 
          +l9 ~~~ l10                                                    
      158 +    end                                                       
      159 +                                                              
      160      subgraph F["A fault: a bug inside the calculator (S-9)"]
      125 -      direction LR                                            
      161 +      direction TB                                            
      162        f1("Something throws<br/>despite the error model")
      163        f2["Something went wrong inside the calculator.<br/>It w
           as not caused by anything you entered.<br/>Your tape and memor
           y are kept.<br/>Press C or Escape to start again."]
      164        f3("C or Escape")
     ...
      191    class f2,l7 fault
      192    class b5,l8 notbuilt
      193    class p2,r3,l9 branch
      158 -  class c7,p5,r7,f5 note                                      
      194 +  class c7,p5,r7,f5,l10 note                                  

⏺ Bash(npx -y @mermaid-js/mermaid-cli -i user-flow.mmd -o user-flow.png -s 3 -b
      white -q && python3 -c "
      from PIL import Image; im=Image.open('user-flow.png'); print(i…)
  ⎿  1 file changed (binary, mode only or too large to show)

  Read 1 file (ctrl+o to expand)

⏺ The font fix worked—all lanes now render cleanly—but ELK is still jumbling
  lane order and mermaid-cli's 800px viewport is shrinking the text. I'll fix
  the order with invisible links and widen the viewport.

⏺ Bash(python3 - <<'EOF'
      import re…)
  ⎿  Updated docs/diagrams/user-flow.mmd (+78 -72)
      23  ---
      24  %% Source of docs/diagrams/user-flow.png. Behaviour comes from 
          CLAUDE.md Decisions and docs/user-stories.md only.
      25  %% Colours and type are the light-theme tokens in docs/ux/mocku
          p.html.
      26 -%% The ELK layout places sibling lanes right to left, so each r
         -ow's lanes are declared last-first.                            
      26 +%% Invisible links (~~~) between lanes fix their left-to-right 
         +order.                                                         
      27  flowchart TB
      28  
      29    subgraph R1["R-1 Everyday Calculator User"]
      30      direction LR
      31  
      32 -    subgraph R1d["Too many digits (S-1)"]                      
      32 +    subgraph R1a["A quick sum (S-3, S-4)"]                     
      33        direction TB
      34 -      d1("Has typed 15 digits,<br/>types a 16th")              
      35 -      d2["15 digits maximum<br/>The figure is unchanged.<br/>Th
         -e message stays until<br/>the next key, click or paste."]      
      36 -      d1 --> d2                                                
      34 +      a1("A number comes up mid-task.<br/>Types 12, presses +")
      35 +      a2["Expression: 12 +<br/>Display: 12"]                   
      36 +      a3("Types 8, presses =")                                 
      37 +      a4["Expression: 12 + 8 =<br/>Display: 20"]               
      38 +      a5[["Tape: 12 + 8 = 20"]]                                
      39 +      a6("Back to what they were doing")                       
      40 +      a1 --> a2 --> a3 --> a4 --> a5 --> a6                    
      41 +    end                                                        
      42 +                                                               
      43 +    subgraph R1b["A slip while typing (S-7)"]                  
      44 +      direction TB                                             
      45 +      b1("Means 12, types 123")                                
      46 +      b2("Backspace")                                          
      47 +      b3["Display: 12"]                                        
      48 +      b4("Or Delete (CE):<br/>the figure goes back to 0, retype
         + it")                                                          
      49 +      b5["Not in this version: after 5 + 3 ×,<br/>the 3 is alre
         +ady folded in (8 ×).<br/>Backspace does nothing; only Escape,<b
         +r/>starting again. Closing this is S-16."]                     
      50 +      b1 --> b2 --> b3                                         
      51 +      b1 -.-> b4                                               
      52 +      b3 -.->|"the figure was already<br/>followed by an operat
         +or"| b5                                                        
      53      end
      54  
      55      subgraph R1c["Getting out of an error (S-9)"]
     ...
       66        c2 -.- c7
       67      end
     … 158 more lines (ctrl+o to expand)

⏺ All twelve lanes are present and in order. Rendering with a wide viewport:

⏺ Bash(npx -y @mermaid-js/mermaid-cli -i user-flow.mmd -o user-flow.png -s 3 -b
      white -w 2400 -q && python3 -c "
      from PIL import Image; im=Image.open('user-flow.png');…)
  ⎿  1 file changed (binary, mode only or too large to show)

  Read 1 file (ctrl+o to expand)

⏺ I found three issues to fix: the fault text wraps awkwardly, the paste diamond
  is oversized from holding the stripping rule, and the overall image is too
  wide to read when embedded. I'll split the stripping rule into its own step,
  widen the text wrap, and spread R-2 across two rows of lanes.

  Ran 1 shell command (ctrl+o to expand)

⏺ The script stopped before writing anything: there's a blank line before the
  group's end. Loosening that match and re-running:

⏺ Bash(python3 - <<'EOF'
      import re…)
  ⎿  Updated docs/diagrams/user-flow.mmd (+74 -62)
      19      nodeSpacing: 36
      20      rankSpacing: 44
      21      padding: 14
      22 -    wrappingWidth: 300                                         
      22 +    wrappingWidth: 420                                         
      23  ---
      24  %% Source of docs/diagrams/user-flow.png. Behaviour comes from 
          CLAUDE.md Decisions and docs/user-stories.md only.
      25  %% Colours and type are the light-theme tokens in docs/ux/mocku
          p.html.
     ...
       77    end
       78  
       79    subgraph R2["R-2 Desk Checker"]
       80 -    direction LR                                              
       81 -                                                              
       82 -    subgraph R2a["Paste a figure (S-11)"]                     
       83 -      direction TB                                            
       84 -      p1("Pastes £1,234.56<br/>with Ctrl+V or Cmd+V")         
       85 -      p2{"Strip £ $ €, spaces, and commas<br/>followed by thre
          -e digits.<br/>One readable UK/US figure?"}                    
       86 -      p3["Display: 1234.56<br/>as pasted, no commas;<br/>Backs
          -pace can edit it"]                                            
       87 -      p4["Refused, figure unchanged:<br/>Couldn't read that as
          - a number<br/>Unclear which mark is the decimal point<br/>Use 
          -a minus sign for negative numbers<br/>15 digits maximum"]     
       88 -      p5["In an error, a refused paste<br/>leaves the error sh
          -owing"]                                                       
       89 -      p1 --> p2                                               
       90 -      p2 -->|yes| p3                                          
       91 -      p2 -->|no| p4                                           
       92 -      p4 -.- p5                                               
       80 +    direction TB                                              
       81 +    subgraph R2r1[" "]                                        
       82 +      direction LR                                            
       83 +                                                              
       84 +      subgraph R2a["Paste a figure (S-11)"]                   
       85 +        direction TB                                          
       86 +        p1("Pastes £1,234.56<br/>with Ctrl+V or Cmd+V")       
       87 +        p1b["The calculator strips £ $ €, spaces,<br/>and comm
          +as followed by three digits"]                                 
       88 +        p2{"One readable<br/>UK/US figure?"}                  
       89 +        p3["Display: 1234.56<br/>as pasted, no commas;<br/>Bac
          +kspace can edit it"]                                          
       90 +        p4["Refused, figure unchanged:<br/>Couldn't read that 
          +as a number<br/>Unclear which mark is the decimal point<br/>Us
          +e a minus sign for negative numbers<br/>15 digits maximum"]   
       91 +        p5["In an error, a refused paste<br/>leaves the error 
          +showing"]                                                     
       92 +        p1 --> p1b --> p2                                     
       93 +        p2 -->|yes| p3                                        
       94 +        p2 -->|no| p4                                         
       95 +        p4 -.- p5                                             
     … 121 more lines (ctrl+o to expand)
  ⎿  … 1 more file changed

  Read 1 file (ctrl+o to expand)

⏺ The layout reads well now: R-1's lanes in one row, R-2 on two rows, the fault
  and legend below. I'll check a region at full resolution for sharpness.

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ Sharp at full size. The user flow is done. Now the app flow: the key-press
  path on top, then every engine state and transition.

⏺ Write(docs/diagrams/app-flow.mmd)
  ⎿  Wrote 120 lines to docs/diagrams/app-flow.mmd
       1 ---
       2 title: App flow — one key press, and the engine's states
       3 config:
       5   layout: elk
       6   fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-
         serif"
       7   themeVariables:
         s-serif"
       9     fontSize: 16px
      10     primaryColor: "#FFFFFF"
     … +166 lines (ctrl+o to expand)

⏺ I'll colour the edges that matter: arrows that write a tape line in the accent
  blue, arrows into the error state in the error red.
⏺ Bash(python3 - <<'EOF'
      p="app-flow.mmd"; s=open(p).read()…)
  ⎿  Updated docs/diagrams/app-flow.mmd (+5 -1)
      92      g2["An engine state, with the inputs that keep it there (↺)
          "]
      93      g3["The error state"]
      94      g4["The fault: outside the engine"]
      95 -    g5["▶ tape: writes a calculation line<br/>▶ memory line: wr
         -ites a memory line<br/>thick arrows write a calculation line"] 
      95 +    g5["▶ tape: writes a calculation line<br/>▶ memory line: wr
         +ites a memory line<br/>thick blue arrows write a calculation li
         +ne;<br/>red arrows lead into the error state"]                 
      96      g6["≈ is a flag on the running value. It is set when a step
          <br/>is rounded at 34 digits, cut for display, or uses a value<
          br/>that already had ≈. A new calculation clears it."]
      97      g7["Every state: MC changes only memory;<br/>MR with memory
           empty does nothing.<br/>In a fault every memory key does nothi
          ng.<br/>A notice is a refusal message; the state is unchanged."
          ]
      98      g1 ~~~ g2 ~~~ g3 ~~~ g4 ~~~ g5 ~~~ g6 ~~~ g7
     ...
      118    class g6 approx
      119    class g7 note
      120    class start start
      121 +                                                              
      122 +  %% Link indices count every link in order, invisible ones in
          +cluded.                                                       
      123 +  linkStyle 14,19 stroke:#1D4F80,stroke-width:3.5px           
      124 +  linkStyle 11,15,20,24,29 stroke:#A3260F,stroke-width:1.5px  
  ⎿  … 1 more file changed
  ⎿  (timeout 3m)

  Read 1 file (ctrl+o to expand)

⏺ The engine diagram has too many crossing edges, making it hard to match labels
  to transitions. I'll redraw it as one panel per state, with clear arrows and
  labels right next to the transitions they describe.

⏺ Bash(python3 - <<'EOF'
      p="app-flow.mmd"; s=open(p).read()…)
  ⎿  Updated docs/diagrams/app-flow.mmd (+97 -46)
       40      k3 -. "a throw is caught" .-> kf
       41    end
       42  
       43 -  subgraph Engine["Engine states · domain/engine.ts · ↺ = stay
          -s in this state"]                                             
       43 +  subgraph Engine["Engine states · domain/engine.ts · each pan
          +el is one state: ↺ keeps it there, arrows are every way out"] 
       44      direction TB
       45 -    start(("page<br/>load"))                                  
       46 -                                                              
       47 -    Ready["<b>Ready</b><br/>↺ Escape, Delete, Backspace, +/−, 
          -= (no change)<br/>↺ paste refused (notice)<br/>↺ M+ or M− on t
          -he 0 showing ▶ memory line"]                                  
       48 -    Entering["<b>Entering</b><br/>↺ digit, point, Backspace, +
          -/−, Delete to 0<br/>↺ paste accepted, replaces the figure<br/>
          -↺ 16th digit or paste refused (notice)<br/>↺ = with nothing pe
          -nding (no change)<br/>↺ M+ or M− on the figure ▶ memory line"]
       49 -    Recalled["<b>Recalled</b><br/>↺ +/−, ≈ kept<br/>↺ Backspac
          -e (no change)<br/>↺ recall, replaces the value<br/>↺ paste ref
          -used (notice)<br/>↺ M+ or M− ▶ memory line"]                  
       50 -    Pending["<b>Pending</b><br/>↺ operator, replaces the opera
          -tor<br/>↺ =, Backspace, +/−, Delete (no change)<br/>↺ paste re
          -fused (notice)<br/>↺ M+ or M− on the running result ▶ memory l
          -ine"]                                                         
       51 -    Result["<b>Result</b><br/>↺ = repeats the last operation ▶
          - tape<br/>↺ +/−, ≈ kept, no tape line<br/>↺ Backspace (no chan
          -ge)<br/>↺ paste refused (notice)<br/>↺ M+ or M− ▶ memory line;
          -<br/>memory takes ≈ if the value has it"]                     
       52 -    Error["<b>Error</b><br/>Cannot divide by zero · Number too
          - large · Number too small<br/>↺ operator, =, +/−, Backspace (n
          -o change)<br/>↺ paste refused (notice), the error stays<br/>↺ 
          -M+ or M− (no change)<br/>↺ MC clears memory"]                 
       53 -                                                              
       54 -    start -->|"tape empty"| Ready                             
       55 -                                                              
       56 -    Ready -->|"digit, point or paste accepted<br/>≈ cleared"| 
          -Entering                                                      
       57 -    Ready -->|"recall, ≈ taken from the line<br/>MR with memor
          -y held"| Recalled                                             
       58 -    Ready -->|"operator, acts on the 0 showing"| Pending      
       59 -    Ready -->|"M+ or M− would push<br/>memory out of range"| E
          -rror                                                          
       60 -                                                              
       61 -    Entering -->|"recall or MR,<br/>replaces the figure"| Reca
          -lled                                                          
       62 -    Entering -->|"operator: nothing pending, or the step<br/>s
          -ucceeds; ≈ set if rounded, cut or carried"| Pending           
       63 -    Entering ==>|"= with an operator pending ▶ tape<br/>≈ set 
          -if rounded, cut or carried"| Result                           
       64 -    Entering -->|"operator or = and the step fails<br/>M+ or M
          -− out of range"| Error                                        
       65 -    Entering -->|"Escape"| Ready                              
       66 -                                                              
       67 -    Recalled -->|"digit, point or paste accepted<br/>Delete: v
          -alue becomes 0, pending operator kept"| Entering              
       68 -    Recalled -->|"operator: step succeeds<br/>or nothing pendi
          -ng"| Pending                                                  
       69 -    Recalled ==>|"= with an operator pending ▶ tape"| Result  
       70 -    Recalled -->|"operator or = and the step fails<br/>M+ or M
          -− out of range"| Error                                        
       71 -    Recalled -->|"Escape"| Ready                              
       72 -                                                              
       73 -    Pending -->|"digit, point or paste accepted"| Entering    
       74 -    Pending -->|"recall or MR,<br/>becomes the next figure"| R
          -ecalled                                                       
       75 -    Pending -->|"M+ or M− out of range"| Error                
       76 -    Pending -->|"Escape"| Ready                               
       77 -                                                              
       78 -    Result -->|"operator, continues from the result<br/>≈ kept
          -"| Pending                                                    
     … 129 more lines (ctrl+o to expand)
  ⎿  … 1 more file changed
  ⎿  (timeout 3m)

⏺ The edge-colour indices are off by one: my counter skipped the dotted fault
  arrow, which comes before all the engine edges. Shifting them all by one:

⏺ Bash(sed -i '' -e 's/^  linkStyle 13,18 /  linkStyle 14,19 /' -e 's/^
      linkStyle 10,14,19,25,30 /  linkStyle 11,15,20,26,31 /' app-flow.mmd &&
      grep -n 'linkStyle' ap…)
  ⎿  Updated docs/diagrams/app-flow.mmd (+2 -2)
      171    class start start
      172  
      173    %% Link indices count every link in order, invisible ones in
           cluded.
      174 -  linkStyle 13,18 stroke:#1D4F80,stroke-width:3.5px           
      175 -  linkStyle 10,14,19,25,30 stroke:#A3260F,stroke-width:1.5px  
      174 +  linkStyle 14,19 stroke:#1D4F80,stroke-width:3.5px           
      175 +  linkStyle 11,15,20,26,31 stroke:#A3260F,stroke-width:1.5px  
  ⎿  … 1 more file changed

⏺ My grep check was misleading since it counts lines, not links—counting
  manually, I confirm links 14 and 19 are the = ▶ tape arrows, and 11, 15, 20,
  26, and 31 are the five arrows into Error. Now I'll view the render.

  Read 1 file (ctrl+o to expand)

⏺ Much clearer: each label sits on its own arrow, the tape-writing arrows are
  blue and thick, and the arrows into Error are red. That one's done. Now the
  architecture flow.

⏺ Write(docs/diagrams/architecture-flow.mmd)
  ⎿  Wrote 134 lines to docs/diagrams/architecture-flow.mmd
       1 ---
       2 title: Architecture flow — layers, dependencies and where state
       3 config:
       4   theme: base
       5   layout: elk
         serif"
       7   themeVariables:
       8     fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, san
       9     fontSize: 16px
      10     primaryColor: "#FFFFFF"
     … +150 lines (ctrl+o to expand)

⏺ Bash(python3 - <<'EOF'
      p="architecture-flow.mmd"; s=open(p).read()…)
  ⎿  Updated docs/diagrams/architecture-flow.mmd (+7 -5)
      88      k4["Something the app never uses"]
      89      k5["Thick arrows: imports between layers.<br/>All point inw
          ards, ui → app → domain,<br/>and any layer may use shared."]
      90      k6["Red dotted arrow with a cross:<br/>an import the rules 
          forbid"]
      91 -    k1 ~~~ k2 ~~~ k3 ~~~ k4 ~~~ k5 ~~~ k6                      
      91 +    k7["Called out: memory logic sits in the domain;<br/>decima
         +l.ts is the single wrapper round decimal.js"]                  
      92 +    k1 ~~~ k7 ~~~ k2 ~~~ k3 ~~~ k4 ~~~ k5 ~~~ k6               
      93    end
      94  
      95    person -->|"keys, clicks, taps"| UI
     ...
      122    classDef door fill:#FFFFFF,stroke:#1D4F80,stroke-width:2px,c
           olor:#123A63
      123  
      124    class uApp,uDisplay,uKeypad,uTape,uToggle,uAnn,uCss,aCalc,aK
           ey,aPaste,aEmpty,dEngine,dEntry,dPaste,dArith,dFormat,dTape,dV
           alue,dResult,sMessages,sView,sKeys,main,k1 module
      124 -  class dMemory,pageMem,k2 memory                             
      125 -  class dDecimal door                                         
      125 +  class pageMem,k2 memory                                     
      126 +  class dMemory,dDecimal,k7 door                              
      127    class decimaljs,k3 pkg
      128    class none,k4 never
      129    class person,clip,files outside
     ...
      131    class UI,APP,DOMAIN,SHARED layer
      132    class Tab runtime
      133  
      133 -  linkStyle 5,6,7,8,9,10 stroke:#1D4F80,stroke-width:3px      
      134 -  linkStyle 11 stroke:#A3260F,stroke-width:2px,stroke-dasharra
          -y:4 4                                                         
      134 +  %% Link indices count every link in order: the six legend li
          +nks come first.                                               
      135 +  linkStyle 11,12,13,14,15,16 stroke:#1D4F80,stroke-width:3px 
      136 +  linkStyle 17 stroke:#A3260F,stroke-width:2px,stroke-dasharra
          +y:4 4                                                         
  ⎿  … 1 more file changed

  Read 1 file (ctrl+o to expand)

⏺ It's mostly correct, but a few edges wrap around the whole picture
  unnecessarily. I'll restructure the layers into a top-to-bottom column with
  shared off to the side, and replace the two person-UI arrows with a single
  two-way arrow.

⏺ Bash(python3 - <<'EOF'
      import re…)
  ⎿  Updated docs/diagrams/architecture-flow.mmd (+14 -6)
      31    files["Static files: HTML · JS · CSS<br/>loaded once, from th
          e local dev server or dist/"]
      32  
      33    subgraph Tab["Browser tab: the only runtime"]
      34 +    direction LR                                               
      35 +                                                               
      36 +    subgraph Stack[" "]                                        
      37      direction TB
      38      main["main.tsx<br/>mounts ui/App"]
      39  
     ...
      71        dDecimal["decimal.ts<br/>the only door to decimal.js:<br/
          >one clone, precision 34, ROUND_HALF_UP"]
      72      end
      73  
      74 +                                                               
      75 +    decimaljs[("decimal.js 10.6.0<br/>npm package")]           
      76 +    end                                                        
      77 +                                                               
      78      subgraph SHARED["shared · types and constant tables; import
          s nothing"]
      72 -      direction LR                                             
      79 +      direction TB                                             
      80        sMessages["messages.ts"]
      81        sView["view.ts"]
      82        sKeys["keys.ts"]
      83      end
      84  
      78 -    decimaljs[("decimal.js 10.6.0<br/>npm package")]           
      85 +    Stack ~~~ SHARED                                           
      86    end
      87  
      88    none["Not used anywhere<br/>server · network requests · cooki
          es<br/>localStorage · sessionStorage · IndexedDB"]
     ...
       99      k1 ~~~ k7 ~~~ k2 ~~~ k3 ~~~ k4 ~~~ k5 ~~~ k6
      100    end
      101  
       95 -  person -->|"keys, clicks, taps"| UI                         
       96 -  UI -->|"display, tape,<br/>live-region announcements"| perso
          -n                                                             
      102 +  person <-->|"in: keys, clicks, taps<br/>out: display, tape, 
          +live-region announcements"| UI                                
      103    clip -->|"browser paste event"| aPaste
      104    files -->|"loaded once at page load"| main
      105    main --> uApp
     ...
      125    classDef never fill:#FFFFFF,stroke:#A3260F,stroke-width:1.5p
           x,stroke-dasharray:6 4,color:#A3260F
      126    classDef outside fill:#EEF1F4,stroke:#808892,stroke-width:1p
           x,color:#16191D
     … 16 more lines (ctrl+o to expand)
  ⎿  … 1 more file changed

⏺ One more index slip: the new Stack ~~~ SHARED link comes before the legend's
  links, so every edge shifts by one. Correcting and re-rendering:

⏺ Bash(sed -i '' -e 's/^  linkStyle 10,11,12,13,14,15 /  linkStyle
      11,12,13,14,15,16 /' -e 's/^  linkStyle 16 stroke:#A3260F/  linkStyle 17
      stroke:#A3260F/' -e 's/^  %…)
  ⎿  Updated docs/diagrams/architecture-flow.mmd (+3 -3)
      139    class Stack stack
      140    class Tab runtime
      141  
      142 -  %% Link indices count every link in order: the six legend li
          -nks come first.                                               
      143 -  linkStyle 10,11,12,13,14,15 stroke:#1D4F80,stroke-width:3px 
      144 -  linkStyle 16 stroke:#A3260F,stroke-width:2px,stroke-dasharra
          -y:4 4                                                         
      142 +  %% Link indices count every link in order: Stack ~~~ SHARED,
          + then the six legend links, come first.                       
      143 +  linkStyle 11,12,13,14,15,16 stroke:#1D4F80,stroke-width:3px 
      144 +  linkStyle 17 stroke:#A3260F,stroke-width:2px,stroke-dasharra
          +y:4 4                                                         
  ⎿  … 1 more file changed

  Read 1 file (ctrl+o to expand)

⏺ All three diagrams are done, with the layered structure clean and the
  forbidden ui → domain import flagged with a red dotted cross. Now I'll write
  the README for the diagrams folder and add the embeds into architecture.md.

  Ran 1 shell command (ctrl+o to expand)

⏺ Write(docs/diagrams/README.md)
  ⎿  Wrote 25 lines to docs/diagrams/README.md
      1 # Diagrams
      2
        endered from it. They are embedded in `../architecture.md`.
      4
      5 | File | Shows |
      7 | `user-flow` | How each role moves through the calculator, inclu
        ding the refusal, error and fault paths |
      8 | `app-flow` | The path of one key press through the layers, then
      9 | `architecture-flow` | The layers, every import arrow, decimal.j
        s behind its one wrapper, and where the tape and memory live |
     … +26 lines (ctrl+o to expand)

⏺ Update(docs/architecture.md)
  ⎿  Added 16 lines
       2  
       3  This document records decisions already made; it adds no behavi
          our. The behaviour itself is in the Decisions section of `CLAUD
          E.md` and in `user-stories.md`. ADRs for individual choices are
           in `docs/adr/`. Module names below are the planned layout. `sr
          c/` is empty until the first story is built.
       4  
       5 +## Flow diagrams                                               
       6 +                                                               
       7 +Three diagrams draw what this document and the stories already 
         +say. They are large, so open an image on its own to read it at 
         +full size. The Mermaid sources and the command that regenerates
         + them are in `diagrams/`.                                      
       8 +                                                               
       9 +**User flow.** How each role moves through the calculator, incl
         +uding the refusal, error and fault paths.                      
      10 +                                                               
      11 +![User flow: the Everyday Calculator User's quick sum, slip, er
         +ror and digit cap, and the Desk Checker's paste, chain, tape, ≈
         +, recall and running total in memory](diagrams/user-flow.png)  
      12 +                                                               
      13 +**App flow.** The path of one key press from the browser event 
         +to the screen, then each engine state with every way out of it.
      14 +                                                               
      15 +![App flow: a key press passing through useKeyboard, useCalcula
         +tor, engine.step and the view model to the ui, then the six eng
         +ine states and their transitions](diagrams/app-flow.png)       
      16 +                                                               
      17 +**Architecture flow.** The layers and their imports, decimal.js
         + behind its one wrapper, memory in the domain, and the tape and
         + memory held only in page memory.                              
      18 +                                                               
      19 +![Architecture flow: ui, app, domain and shared inside the brow
         +ser tab, imports pointing inwards, decimal.ts as the only impor
         +t of decimal.js, and no server, network or storage](diagrams/ar
         +chitecture-flow.png)                                           
      20 +                                                               
      21  ## Layer model
      22  
      23  ```

⏺ I'll run the regenerate command exactly as the README gives it, so the
  committed images come from it.

⏺ Bash(cd /Users/chaudry/code/hassa-chaudry-calculator/docs/diagrams && for f in
      user-flow app-flow architecture-flow; do
        npx -y @mermaid-js/mermaid-cli -i "$f.mmd"…)
  ⎿  1 file changed (binary, mode only or too large to show)
  ⎿  (timeout 5m)

  Ran 1 shell command (ctrl+o to expand)

⏺ All done and pushed: 9 commits, and docs/ux/mockup.html is ready to open
  again.

  Commits

  1. 9e73000 Make legends, ≈ and the memory row legible
  2. 924e569 Say memory is kept in the fault message (S-9)
  3. 2c45a7e Replace stale fault text in architecture and ADR
  4. 428b2f6 Show memory overflow from every state M+ works in (S-19)
  5. 35c3475 Except the fault from "MC works at any time" (S-19)
  6. cd89281 Put the tape's arrow keys into the Decisions (S-13)
  7. 9d44306 Place the M indicator and tooltip in the layer diagram
  8. 2fc7318 Add the session 1 transcript as exported
  9. c56fcc6 Add user, app and architecture flow diagrams

  Mockup

  - Legends are now 14px and centred in their own row at the bottom of the key,
    with about 14px clear of the label. Keys with legends grew from 4.5rem to
    5rem. Every label sits the same 6px above the key's centre, so each row
    stays level whether or not its keys have a legend.
  - ≈ is drawn bold, 15% larger than the text around it, in an outlined chip.
    That applies on the display, expression line, tape and M indicator. I
    checked it at actual size: a new section near the top of the mockup shows
    tape lines 2 and 11 at 100%.
  - Memory row now has a solid outline, no fill of its own and a regular-weight
    label.
  - Contrast. The pressed-key legends had never been measured, and three
    pairings failed AA:
    - pressed C, CE and ⌫: 3.92 in light, 3.36 in dark
    - pressed operators: 4.28 in dark

    Each now has a passing colour. All 41 pairings pass in both themes, and the
    table shows them.

  Fix 2: what the search found

  - The old fault text was still in architecture.md and ADR 0005. Both are
    fixed.
  - An M± shorthand in architecture.md said M+ and M− do nothing when memory is
    empty. They do act; only MR does nothing. Fixed.
  - No old keypad drawing survives anywhere.
  - I kept one ± in the notation section of user-stories.md, because that line
    records the relabel to +/−.

  Transcript

  No passwords, API keys or tokens. The file is byte-identical to the Desktop
  export. Line 1910 does contain a temporary scratchpad path that includes your
  macOS username. That isn't a secret, and you said not to edit, so it's in as
  exported.

  Diagrams

  - Each PNG is about 1,900–2,400px wide at 1× and sharp when zoomed. Embedded
    in architecture.md they shrink to the page width, so the doc says to open an
    image on its own to read it.
  - In the app flow, the engine is drawn as one panel per state, each showing
    every way out. My first attempt as a single graph had around 30 crossing
    edges, and labels drifted away from their arrows.
  - I added -w 2400 to the render command. At the default 800px, mermaid-cli
    shrinks wide diagrams and the labels come out smaller than 16px. The
    diagrams README explains this.

  Choices made under the standing rule (in Decisions; overrule any)

  1. Left and Right do nothing in the tape, and no arrow key does anything
     outside it.
  2. Every label sits slightly above centre on mouse devices, so rows stay
     level.

  Noticed, not changed

  - The state diagram in architecture.md has no MR transition from Recalled to
    Recalled, though Decision 19 says MR behaves like recall. The app flow
    follows the document, so it is missing there too.
  - ADR 0007 still says "about twenty elements"; the keypad alone now has 24
    keys.

❯ Two small fixes before any code, each its own commit.

  1. The state diagram in architecture.md has no MR transition from Recalled.
  Decision 19 says MR behaves like recalling a tape line, and recall on a
  recalled value replaces it, so add Recalled to Recalled for MR. Check the
  other MR arrows are all there: from Ready, Entering, Pending, Result and
  Error. Then update the app flow diagram to match, source and PNG, using the
  same render command as before.
  2. ADR 0007 says about twenty elements. The keypad alone is now 24 keys.
  Update that sentence to the real count. The decision itself does not change.

  Then start building. Domain only, no React, nothing visual. There is still no
  page, so do not try to make npm run dev work.

  Test first. Write failing tests from the acceptance criteria before the
  implementation, and put the story ID in the test name wherever one maps.

  The behaviour is the Decisions in CLAUDE.md and the criteria in
  docs/user-stories.md. Build exactly that. If the two disagree, stop and tell
  me rather than picking one.

  Part one, the arithmetic, in the modules architecture.md already names.

  - domain/decimal.ts is the only file that imports decimal.js. One configured
  clone, 34 significant digits, round half up, and only the operations I need.
  Nothing else imports the library.
  - Four operations, each returning a result or an error value. Never throws,
  never returns NaN or Infinity.
  - The formatter. Plain notation up to 15 significant digits, exponential only
  at 1e15 and above or below 1e-9, written as 1.5 × 10¹⁵. Round half up, away
  from zero for negatives. No trailing zeros unless typed. Never negative zero.
  Refuses a rounded value at or above 1e100, and any non zero rounded value
  below 1e-99, with "Number too large" and "Number too small".
  - An exactness flag on every result. True only when what is displayed equals
  the exact value, worked out from the full precision value rather than the
  displayed text.
  - The paste parser. The rules and the exact refusal messages are in
  Decision 9.
  - One error type, a code plus the message written for a person. Returned,
  never thrown. Notices such as "15 digits maximum" are not errors.

  Part two, the engine.

  - The states are the ones in the diagram: Ready, Entering, Recalled, Pending,
  Result and Error. A discriminated union, so adding a state breaks the build
  until every transition handles it.
  - One pure reducer. No side effects, no dates, no randomness, no DOM. It must
  be unable to throw.
  - Events are semantic: digit, decimal, operator, equals, clear, clearEntry,
  backspace, signToggle, paste, recall, memoryPlus, memoryMinus, memoryRecall,
  memoryClear. No key codes. Those stop at the UI boundary.
  - The tape is append only and built by the reducer. A finished calculation
  writes a calculation line. M+ and M− write a memory line, and recalling that
  line brings back the memory total on it. An error writes no line.
  - Memory lives in domain/memory.ts, as architecture.md describes. It survives
  clear and is cleared only by MC.

  Test every transition, including the ones that do nothing. I want a test for
  every way out of the error state, and for M+ and M− doing nothing during an
  error while MC still works. The fault message is not a domain state. It is
  the UI's fallback for a bug, and it comes later.

  Real tests exist once these land, so remove the setting that lets Vitest pass
  with no tests.

  Comments only where they earn their place: why a decision was made, not what
  the line does. Name the story ID where behaviour comes from a criterion. Flag
  anything deliberate that looks wrong, especially the rounding mode and the
  precision limit.

  Commit the arithmetic and the engine separately, and never in the same commit
  as a document. Then show me the transition table so I can check it against
  the diagram. If the diagram is wrong, fix the diagram.

⏺ Starting with fix 1. I'll check every MR arrow in the state diagram.

  Searched for 1 pattern (ctrl+o to expand)

⏺ MR arrows from Ready, Entering, Pending, Result and Error are all present.
  Only Recalled → Recalled is missing. Adding it to both diagrams:

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b):…)  ⎿  Updated docs/architecture.md (+1 -0)
      247      Ready --> Recalled : MR with memory held
      248      Entering --> Recalled : MR replaces the figure
      249      Pending --> Recalled : MR becomes the next figure
      250 +    Recalled --> Recalled : MR replaces the value             
      251      Result --> Recalled : MR, new calculation
      252  
      253  ```
  ⎿  Updated docs/diagrams/app-flow.mmd (+1 -1)
      74        end
      75        subgraph PRecalled["Recalled"]
      76          direction LR
      77 -        Recalled["<b>Recalled</b><br/>↺ +/−, ≈ kept<br/>↺ Backs
         -pace (no change)<br/>↺ recall, replaces the value<br/>↺ paste r
         -efused (notice)<br/>↺ M+ or M− ▶ memory line"]                 
      77 +        Recalled["<b>Recalled</b><br/>↺ +/−, ≈ kept<br/>↺ Backs
         +pace (no change)<br/>↺ recall or MR, replaces the value<br/>↺ p
         +aste refused (notice)<br/>↺ M+ or M− ▶ memory line"]           
      78          Recalled_Entering["→ Entering"]
      79          Recalled_Pending["→ Pending"]
      80          Recalled_Result["→ Result"]
  ⎿  … 1 more file changed
  ⎿  (timeout 3m)

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ The Recalled panel now reads "↺ recall or MR, replaces the value", and every
  state diagram still parses.

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed 8009254. I counted 33 elements from the wireframes (24 keys, the
  readout, tape, toggle, and tooltip), so I'll update the "about twenty
  elements" claim in architecture.md's tech stack table to match.

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b):…)
  ⎿  Updated docs/adr/0007-no-css-framework.md (+1 -1)
       4  - **Date:** 2026-10-06
       5  
       6  ## Context
       7 -The UI is one screen of about twenty elements: a display, an ex
         -pression line, a keypad, a tape and a few controls. Reviewers w
         -ill read the code, and the styling should be as easy to follow 
         -as the logic.                                                  
       7 +The UI is one screen of 33 elements: a keypad of 24 keys, a dis
         +play, an expression line, a message line, an M indicator, a tap
         +e with its heading and empty-tape control, a tape toggle and a 
         +tooltip. Reviewers will read the code, and the styling should b
         +e as easy to follow as the logic.                              
       8  
       9  ## Decision
      10  Style with CSS Modules, which Vite supports with no extra depen
          dency. Colours, spacing and type sizes come from design tokens 
          defined as CSS custom properties in `tokens.css`.
  ⎿  Updated docs/architecture.md (+1 -1)
      56  | Vite | 8.3.3, with `@vitejs/plugin-react` 6.1.2 | The app is 
          fully static: no server, no routing, no data fetching. A framew
          ork built for server rendering and routing pays for things this
           app does not use. It has to run on a reviewer's machine with n
          o accounts, and a static build is the shortest path to that. | 
          Next.js and Create React App |
      57  | React + TypeScript, strict | React 19.3.0, TypeScript 5.9.3 |
           The calculator is a state machine, and its states are a discri
          minated union. With `strict` and an exhaustive `switch` ending 
          in a `never` check, adding a state breaks the build until every
           transition handles it. | Plain JavaScript, or TypeScript witho
          ut `strict` |
      58  | decimal.js | 10.6.0 | See below. | Native numbers, and big.js
           |
      59 -| CSS Modules + design tokens | built into Vite | One screen an
         -d about twenty elements. A dependency with its own config to st
         -yle twenty elements is not worth it, and a reviewer should be a
         -ble to read the CSS. | Tailwind, or a component library |      
      59 +| CSS Modules + design tokens | built into Vite | One screen of
         + 33 elements, 24 of them keys. A dependency with its own config
         + to style 33 elements is not worth it, and a reviewer should be
         + able to read the CSS. | Tailwind, or a component library |    
      60  | Vitest + React Testing Library | Vitest 4.1.11, RTL 16.3.3, j
          sdom 29.1.1 | Vitest uses the same transform pipeline as the bu
          ild, so there is no second toolchain. Testing through the DOM m
          akes the tests read like the acceptance criteria. | Jest. It ne
          eds its own TypeScript and ESM transform setup alongside Vite, 
          while Vitest reuses the Vite config. |
      61  
      62  Vitest 4 and jsdom 29 are the newest versions whose `engines` a
          ccept Node 20.19. Vitest 5 and jsdom 30 require Node 22, which 
          the run-with-Node-20 rule excludes.

⏺ Line 13 of the same ADR still says "twenty elements". The commit is already
  pushed, so I'll fix it in a follow-up commit rather than rewrite history.

⏺ Bash(python3 - <<'EOF'
      p="docs/adr/0007-no-css-framework.md"; s=open(p).read()…)
  ⎿  Updated docs/adr/0007-no-css-framework.md (+1 -1)
      10  Style with CSS Modules, which Vite supports with no extra depen
          dency. Colours, spacing and type sizes come from design tokens 
          defined as CSS custom properties in `tokens.css`.
      11  
      12  ## Alternatives rejected
      13 -- **Tailwind.** It is fast to write. It was rejected because it
         - brings its own config and build step to style twenty elements,
         - and class-heavy markup is harder for a reviewer to read than a
         - short stylesheet.                                             
      13 +- **Tailwind.** It is fast to write. It was rejected because it
         + brings its own config and build step to style 33 elements, and
         + class-heavy markup is harder for a reviewer to read than a sho
         +rt stylesheet.                                                 
      14  - **A component library** (for example MUI or Radix). It comes 
          with accessible primitives and focus handling. It was rejected 
          because it is a large dependency for a handful of buttons and a
           list, and its styling and behaviour would have to be bent to f
          it the keypad.
      15  
      16  ## Consequences

⏺ Both fixes are pushed: b264081 and 6cd1a21. Now the build. Tests come from the
  acceptance criteria, so I'll read the whole of user-stories.md first.

  Read 1 file (ctrl+o to expand)

⏺ Both fixes are complete. Before writing tests, I need to confirm a few
  details: the expression line behavior on M+/M− overflow, the exact message
  strings, and how the architecture defines the tape and value types.

  Ran 1 shell command (ctrl+o to expand)

⏺ I need to settle a few open points before coding: making the tape append-only
  and part of the reducer state, and deciding several unspecified behaviors
  (sign on zero, paste edge cases, memory overflow display, ≈ precision) under
  the standing rule. I'll start by updating the Decisions doc with these calls.

⏺ Bash(python3 - <<'EOF'
      p="CLAUDE.md"; s=open(p).read()…)
  ⎿  Updated CLAUDE.md (+4 -4)
      44  ## Decisions (frozen; anything added later is listed to the use
          r when added. **Changed** marks a reversal.)
      45  1. **Maths.** decimal.js, 34 significant digits. Round half up 
          everywhere, internal and display; for negatives that is away fr
          om zero (−2.5 → −3). No fractions.
      46  2. **Display.** Results are rounded to 15 significant digits. P
          lain notation unless the *rounded* value is ≥ 1e15 or < 1e-9 in
           size, then `1.5 × 10¹⁵`, read "1.5 times 10 to the power 15". 
          Results (display after =, running result, tape, memory) get tho
          usands commas; a figure being typed or pasted is plain digits. 
          Results drop trailing zeros. Negatives use a true minus (−), re
          ad "minus". Never negative zero.
      47 -3. **≈** shows whenever the number on screen may not be the exa
         -ct answer: the display cut digits, or any step was rounded at 3
         -4 digits. It carries through the calculation, sign change, reca
         -ll and memory until a new calculation starts (memory keeps it u
         -ntil MC), so 100 ÷ 3 × 0 shows `≈ 0`. It appears on the display
         -, expression line, tape and M indicator, read "approximately". 
      47 +3. **≈** shows whenever the number on screen may not be the exa
         +ct answer: the display cut digits, or any step was rounded at 3
         +4 digits. It carries through the calculation, sign change, reca
         +ll and memory until a new calculation starts (memory keeps it u
         +ntil MC), so 100 ÷ 3 × 0 shows `≈ 0`. It appears on the display
         +, expression line, tape and M indicator, read "approximately". 
         +Carrying covers both causes: once any figure in a calculation h
         +as shown ≈, every later result in it shows ≈ too.              
      48  4. **Order.** Each operation runs as entered: 2 + 3 × 4 = 20. O
          n an operator the expression line shows the running result (`2 
          + 3 ×` → `5 ×`); after a power `≈ 9.99999999999998 × 10²⁹ ×` (U
          X may change spacing and size, not characters). After = it show
          s the last step (`5 × 4 =`); in an error, the failed step (`5 ÷
           0 =`). An operator on a fresh calculator acts on the 0 showing
           (`0 +`).
      49 -5. **Typing.** The figure being typed is shown as typed, keepin
         -g point and trailing zeros. Backspace removes the last characte
         -r typed, digit or point (`12.` → `12`). At most 15 digits, ever
         -y digit counting except a single 0 before the point; a 16th sho
         -ws "15 digits maximum". "." first gives "0.". Keys with nothing
         - to act on do nothing, with no message: a second point, extra l
         -eading zeros, Backspace with nothing to delete, +/− on 0.      
      49 +5. **Typing.** The figure being typed is shown as typed, keepin
         +g point and trailing zeros. Backspace removes the last characte
         +r typed, digit or point (`12.` → `12`). At most 15 digits, ever
         +y digit counting except a single 0 before the point; a 16th sho
         +ws "15 digits maximum". "." first gives "0.". Keys with nothing
         + to act on do nothing, with no message: a second point, extra l
         +eading zeros, Backspace with nothing to delete, +/− on 0. A fig
         +ure that becomes zero loses its sign (`−0.5`, Backspace → `0.`)
         +.                                                              
      50  6. **Correcting.** Backspace edits only the figure being typed;
           deleting its last character leaves 0; on a result or recalled 
          value it does nothing. Delete (clear entry) resets the figure b
          eing typed to 0, and on a result starts a new calculation at 0.
           Escape (clear) clears the calculation. Neither touches the tap
          e or memory. A second operator replaces the first. +/− while ty
          ping flips that figure. With an operator pending and nothing ty
          ped, +/− and Delete do nothing. Delete on a recalled value give
          s 0 and keeps the pending operator.
      51  7. **After a result.** Repeated = repeats the last operation, e
          ach a tape line (`8 + 3 = 11`). An operator continues from the 
          result (5 = + 2 = gives 7, own line). A digit, point, paste, re
          call or MR starts a new calculation, forgetting the last operat
          ion. = with no operator (`5 =`) or straight after one (`2 + =`)
           does nothing. +/− on a result flips it, keeps ≈, writes no lin
          e.
      52  8. **Errors.** "Cannot divide by zero" (x ÷ 0, 0 ÷ 0), "Number 
          too large" (rounded size ≥ 1e100), "Number too small" (non-zero
           rounded size < 1e-99, never 0). One error state, no tape line.
           Escape, Delete, a digit, the point, paste, recall and MR leave
           it by starting a new calculation; operators, =, +/−, Backspace
          , M+ and M− do nothing; MC works.
      53     - **Fault** (a bug throws anyway): "Something went wrong ins
          ide the calculator. It was not caused by anything you entered. 
          Your tape and memory are kept. Press C or Escape to start again
          ." C or Escape resets the calculation and keeps tape and memory
          ; every other input does nothing. Announced like an error. Neve
          r needs a reload.
      54 -9. **Paste.** One figure via the browser's own paste, no paste 
         -button; surrounding whitespace trimmed. £ $ € and spaces stripp
         -ed, and commas followed by exactly three digits. Leading -, + o
         -r − accepted before or after the symbol (`-£5`, `£-5`). Refused
         - with the figure unchanged: unreadable, or tabs/line breaks ins
         -ide, "Couldn't read that as a number"; not UK/US style (`1.234,
         -56`, `1,23`) "Unclear which mark is the decimal point"; bracket
         -s "Use a minus sign for negative numbers"; over 15 digits "15 d
         -igits maximum". A refused paste in an error leaves the error. A
         -n accepted paste lands where a recall does and can be edited wi
         -th Backspace.                                                  
      54 +9. **Paste.** One figure via the browser's own paste, no paste 
         +button; surrounding whitespace trimmed. £ $ € and spaces stripp
         +ed, and commas followed by exactly three digits. Leading -, + o
         +r − accepted before or after the symbol (`-£5`, `£-5`). Refused
         + with the figure unchanged: unreadable, or tabs/line breaks ins
         +ide, "Couldn't read that as a number"; not UK/US style (`1.234,
         +56`, `1,23`) "Unclear which mark is the decimal point"; bracket
         +s "Use a minus sign for negative numbers"; over 15 digits "15 d
         +igits maximum". A refused paste in an error leaves the error. A
         +n accepted paste lands where a recall does and can be edited wi
         +th Backspace. A currency symbol is accepted only at the start, 
         +before or after the sign; a symbol elsewhere, or a bracket that
         + does not wrap the whole figure, is unreadable. More than one p
         +oint is "Unclear which mark is the decimal point". Leading zero
         +s are dropped (`007` → `7`) and `.5` becomes `0.5`.            
      55  10. **Recall.** A click, or Enter or Space, on a tape line reca
          lls its final result as the full 34-digit value with its ≈. Whi
          le typing it replaces the figure; after an operator it is the n
          ext figure; after =, at the start or in an error it starts a ne
          w calculation. Backspace does not edit it; a digit replaces it.
           From the keyboard the tape is one Tab stop: Up and Down move b
          etween lines, Enter or Space recalls the line, Tab leaves the t
          ape. Left and Right do nothing in the tape, and outside the tap
          e every arrow key does nothing.
      56  11. **Tape.** One line per =, every step with its running resul
          t: `2 + 3 = 5 → × 4 = 20`. Newest last; long lines wrap, never 
          cut. An ordered list with an explicit `role="list"` (CSS can st
          rip list semantics in Safari). Not persisted; the browser keepi
          ng the page in memory on Back is not persistence. Emptying: fir
          st press relabels "Press again to empty"; reverts when focus le
          aves or another key is pressed, no timer; does nothing when emp
          ty; works in an error and leaves it. Emptying the tape does not
           clear memory.
      57  12. **Messages** (not errors) stay until the next key press, cl
          ick or paste, no timer, announced like a result.
     ...
      68  17. **Product promise (verbatim tests).** 0.1 + 0.2 shows exact
          ly 0.3. 1.005 × 100 shows exactly 100.5. 0.1 × 3 shows exactly 
          0.3. 100 ÷ 3 shows ≈ 33.3333333333333. 100 ÷ 3 then × 3 shows ≈
           100. 2 + 3 × 4 shows 20, and the expression line shows 5 × onc
          e × is pressed. 5 ÷ 0 shows "Cannot divide by zero", and typing
           7 afterwards shows 7. A 16th digit of exactly 5 rounds up, pos
          itive and negative.
      69  18. **Stack.** Vite, React, TypeScript strict, decimal.js, Vite
          st + React Testing Library + jsdom. CSS Modules, no framework. 
          No backend, env vars or keys. Runs locally on Node 20.19+ from 
          the README; a hosted link is optional.
      70  19. **Memory. Changed:** memory was taken off the table; it is 
          back, alongside the tape. The tape is the record of everything;
           memory holds one running total being built (three invoice tota
          ls added with M+, read with MR). The two original reasons, answ
          ered: recall brings back one value while memory keeps adding; a
          nd memory is no longer hidden state, because every M+ and M− wr
          ites a tape line and an M indicator shows while memory holds a 
          value.
      71 -   - M+ adds the full internal value showing to memory; M− subt
         -racts it. A ≈ value gives memory ≈ until MC. They leave the cal
         -culation as it is. Each writes a quiet tape line, `M+ 40, memor
         -y 95`, with no `=`; recalling that line brings back the memory 
         -total. On a fresh calculator M+ and M− act on the 0 showing. MC
         - writes no tape line. A memory total that would be ≥ 1e100 or a
         - non-zero size < 1e-99 gives the usual error, memory unchanged,
         - no line.                                                      
      71 +   - M+ adds the full internal value showing to memory; M− subt
         +racts it. A ≈ value gives memory ≈ until MC. They leave the cal
         +culation as it is. Each writes a quiet tape line, `M+ 40, memor
         +y 95`, with no `=`; recalling that line brings back the memory 
         +total. On a fresh calculator M+ and M− act on the 0 showing. MC
         + writes no tape line. A memory total that would be ≥ 1e100 or a
         + non-zero size < 1e-99 gives the usual error, memory unchanged,
         + no line; the expression line shows the failed memory step (`M+
         + 40`).                                                         
      72     - MR behaves like recalling a tape line, including leaving a
          n error. MC clears memory and works at any time except during a
           fault. With memory empty, MR and MC do nothing. In an error M+
           and M− do nothing; in a fault every memory key, MC included, d
          oes nothing.
      73     - The M indicator (`M 95`, with ≈ when it has one) shows fro
          m the first M+ or M− until MC, even at 0. Memory survives C and
           Escape and is lost on reload.
      74     - Memory keys have no keyboard key: the usual shortcuts clas
          h with the browser's (Ctrl+P, Ctrl+R). Cost: a keyboard user Ta
          bs to them.

⏺ Pushed: bd13a75. Now architecture.md: the tape moves into the engine state,
  and the engine gains a readout() for the screen text.

  Searched for 1 pattern, ran 1 shell command (ctrl+o to expand)

⏺ Bash(python3 - <<'EOF'
      p="docs/architecture.md"; s=open(p).read()…)
  ⎿  Updated docs/architecture.md (+9 -7)
      32  | Layer | What belongs here | What it may import |
      33  |---|---|---|
      34  | `domain` | The engine (a pure reducer over a discriminated un
          ion of states), typing and paste rules, arithmetic, memory, dis
          play formatting, tape-line building. Every value is a `Decimal`
           from the one configured clone. | `domain`, `shared`, and `deci
          mal.js` (only from `domain/decimal.ts`) |
      35 -| `app` | Hooks that hold engine state and the in-memory tape. 
         -They turn browser events (keys, paste) into engine events, turn
         - engine output into a view model of strings, and keep the empty
         --tape confirmation. | `app`, `domain`, `shared`, `react` |     
      35 +| `app` | Hooks that hold the engine state, which includes the 
         +tape and memory. They turn browser events (keys, paste) into en
         +gine events, turn engine output into a view model of strings, a
         +nd keep the empty-tape confirmation. | `app`, `domain`, `shared
         +`, `react` |                                                   
      36  | `ui` | Components that render the view model and report press
          es back to hooks. Also CSS Modules and design tokens. | `ui`, `
          app`, `shared`, `react`, `react-dom`, `*.module.css`, `tokens.c
          ss` |
      37  | `shared` | Type definitions and constant tables only: error a
          nd notice codes with their text, the view-model types, the key 
          identifiers. | nothing |
      38  | `main.tsx` | Mounting the app. | `ui`, `react-dom`, `react` |
     ...
      156      paste --> entry
      157      arithmetic --> value & decimal & result
      158      format --> value & decimal
      159 +    engine --> format                                         
      160      tape --> format
      161      value --> decimal
      162      entry --> result
     ...
      168  
      169  ## Engine states
      170  
      170 -The engine is a pure function `step(state, event) → { state, t
          -apeLine?, notice? }`. In the diagram:                         
      171 +The engine is a pure function `step(state, event) → { state, n
          +otice? }`. Its state is `{ calc, memory, tape }`: `calc` is on
          +e of the states in the diagram. The tape is append-only and bu
          +ilt by the engine, so a finished calculation or a memory chang
          +e returns a state whose tape has one more line. `engine.ts` al
          +so exports `readout(state)`, which uses `format.ts` to give th
          +e display, expression line and M indicator as strings. In the 
          +diagram:                                                      
      172  
      173  - A `≈` is a flag on the running value. It is set when a step 
           is rounded at 34 digits, when the result is cut for display, o
           r when an operand already carried one (Decision 3). A new calc
           ulation clears it.
      174  - **▶ tape** marks the transitions that write a calculation li
           ne. **▶ memory line** marks those that write a memory line.
     ...
      257  
      258  ## Memory
      259  
      259 -Memory lives in the domain, in `domain/memory.ts`. It is part 
          -of the engine's state (`{ calc, memory }`) but separate from t
          -he calculator states in the diagram, so C and Escape reset `ca
          -lc` and leave `memory` alone.                                 
      260 +Memory lives in the domain, in `domain/memory.ts`. It is part 
          +of the engine's state (`{ calc, memory, tape }`) but separate 
          +from the calculator states in the diagram, so C and Escape res
          +et `calc` and leave `memory` alone.                           
      261  
      262  - **Shape.** Memory is `null` (empty) or a `Value`: a 34-digit
            `Decimal` with its ≈ flag. MC sets it to `null`. A total of 0
            is still a `Value`, so the M indicator shows `M 0`.
      263  - **M+ and M−** take the value showing in the current state. T
           hat is the typed figure, the recalled value, the running resul
           t or the result, and on a fresh calculator the 0 showing. They
            add or subtract it with the same `arithmetic.ts` used for cal
           culations, returning `Result<Value, CalcError>`. If the step f
           ails ("Number too large" or "Number too small"), the engine en
           ters the error state and memory is unchanged. ≈ is the OR of t
           he old memory flag and the value's flag, so it stays until MC.
      263 -- **Tape lines.** On success the engine returns a `tapeLine` o
          -f kind `memory`, next to the unchanged calculator state. The l
          -ine carries the operation, the value and the new total, and is
          - formatted by `tape.ts` as `M+ 40, memory 95`. The line's reca
          -ll value is the new total, so recalling it brings back the mem
          -ory total.                                                    
      264 +- **Tape lines.** On success the engine appends a tape line of
          + kind `memory` and leaves the calculator state unchanged. The 
          +line carries the operation, the value and the new total, and i
          +s formatted by `tape.ts` as `M+ 40, memory 95`. The line's rec
          +all value is the new total, so recalling it brings back the me
          +mory total.                                                   
      265  - **MR** is the same event as recalling a tape line, with memo
           ry as the source. It fails quietly (does nothing) when memory 
           is empty.
      265 -- **No storage.** Memory is held in React state inside `useCal
          -culator`, next to the tape. Nothing is written to `localStorag
          -e`, `sessionStorage`, IndexedDB or cookies, and nothing is sen
          -t anywhere. Fitness function 5 covers memory as it covers the 
          -tape.                                                         
      266 +- **No storage.** The engine state, memory and tape included, 
          +is held in React state inside `useCalculator`. Nothing is writ
          +ten to `localStorage`, `sessionStorage`, IndexedDB or cookies,
          + and nothing is sent anywhere. Fitness function 5 covers memor
          +y as it covers the tape.                                      
      267  
      268  ## Error model
      269  
     ...
      286    | { kind: 'ready' } | { kind: 'entering'; /* … */ } | { kind
           : 'recalled'; /* … */ }
     … 16 more lines (ctrl+o to expand)
  ⎿  Updated docs/diagrams/app-flow.mmd (+2 -2)
      31      k1("Browser event<br/>keydown or paste,<br/>or a click on a
           Keypad key")
      32      k2["app · useKeyboard / usePaste<br/>reads event.key (event
          .code only for the<br/>numpad point); Ctrl, Cmd and Alt ignored
          ;<br/>Enter or Space on a focused control<br/>activates that co
          ntrol instead"]
      33      k3["app · useCalculator<br/>calls engine.step(state, event)
          "]
      34 -    k4["domain · engine.step<br/>a pure function, never throws<
         -br/>returns { state, tapeLine?, notice? }"]                    
      35 -    k5["app · useCalculator<br/>keeps the new state and memory,
         -<br/>appends tapeLine to the tape,<br/>holds notice until the n
         -ext event"]                                                    
      34 +    k4["domain · engine.step<br/>a pure function, never throws<
         +br/>returns { state, notice? };<br/>the state holds the tape an
         +d memory"]                                                     
      35 +    k5["app · useCalculator<br/>keeps the new state, tape and<b
         +r/>memory included; holds notice<br/>until the next event"]    
      36      k6["app → shared/view.ts<br/>a view model of display string
          s,<br/>made by format.ts"]
      37      k7["ui · Display, Tape, Keypad, Announcer<br/>render the vi
          ew model;<br/>display changes are announced politely"]
      38      kf["Fault, held in useCalculator, not an engine state<br/>A
           throw from the engine, or a render failure caught<br/>by the e
          rror boundary in ui/App, shows FAULT_TEXT,<br/>announced like a
          n error. Only C or Escape act:<br/>engine back to Ready, tape a
          nd memory kept."]
  ⎿  … 1 more file changed
  ⎿  (timeout 3m)

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ Pushed commit 6695472 with both doc commits included. Next, I'll write tests
  first for decimal.ts, value/arithmetic, the formatter, the paste parser, and a
  boundary check ensuring only decimal.ts imports decimal.js.

⏺ Write(src/domain/decimal.test.ts)
  ⎿  Wrote 97 lines to src/domain/decimal.test.ts
       1 import Decimal from 'decimal.js'
       2 import { describe, expect, it } from 'vitest'
       3 import {
       4   add,
       5   divide,
       6   figure,
       7   isZero,
       8   multiply,
       9   negate,
      10   plainText,
     … +102 lines (ctrl+o to expand)

⏺ Write(src/domain/arithmetic.test.ts)
  ⎿  Wrote 101 lines to src/domain/arithmetic.test.ts
       1 import { describe, expect, it } from 'vitest'
       2 import type { Operator } from '../shared/keys'
       3 import { operate } from './arithmetic'
       4 import { plainText } from './decimal'
       5 import { isMarked, value, type Value } from './value'
       6
       7 function run(a: Value, op: Operator, b: Value) {
       8   const r = operate(a, op, b)
       9   if (!r.ok) throw new Error(`unexpected error ${r.error.code}`)
      10   return r.value
     … +108 lines (ctrl+o to expand)

⏺ Writing the part-one tests first. decimal.ts and arithmetic are done; the
  formatter and paste parser are next.

⏺ Write(src/domain/format.test.ts)
  ⎿  Wrote 108 lines to src/domain/format.test.ts
      1 import { describe, expect, it } from 'vitest'
      2 import { formatEntry, formatValue, withMark } from './format'
      3 import { value } from './value'
      4
      5 function shown(text: string, approx = false) {
      6   const f = formatValue(value(text, approx))
      7   if (!f.ok) throw new Error(`unexpected error ${f.error.code}`)
      8   return withMark(f.value)
      9 }
     … +115 lines (ctrl+o to expand)

⏺ Write(src/domain/paste.test.ts)
  ⎿  Wrote 62 lines to src/domain/paste.test.ts
       1 import { describe, expect, it } from 'vitest'
       2 import { NOTICE_TEXT } from '../shared/messages'
       3 import { parsePaste } from './paste'
       4
       5 describe('paste: one figure, UK/US style (Decision 9)', () => {
       6   it.each([
       7     ['£1,234.56', false, '1234.56'],
       8     ['  42\n', false, '42'],
       9     ['$1,000,000', false, '1000000'],
      10     ['-£5', true, '5'],
     … +65 lines (ctrl+o to expand)

⏺ Write(src/domain/boundaries.test.ts)
  ⎿  Wrote 36 lines to src/domain/boundaries.test.ts
       1 import { readdirSync, readFileSync, statSync } from 'node:fs'
       2 import { join, relative } from 'node:path'
       3 import { describe, expect, it } from 'vitest'
       4
       5 // Fitness functions 2, 3 and 4 in docs/architecture.md, for the
       6 const SRC = join(__dirname, '..')
       7
       8 function sourceFiles(dir: string): string[] {
       9   return readdirSync(dir).flatMap((name) => {
      10     const path = join(dir, name)
     … +33 lines (ctrl+o to expand)

⏺ Part-one tests are written. One fix first: a test name cites "AC-2" where it
  means Decision 2. Then I'll run the suite to confirm it fails before any
  implementation exists.

⏺ Bash(sed -i '' "s/'AC-2: results get thousands commas/'Decision 2: results get
      thousands commas/" src/domain/format.test.ts && npx vitest run 2>&1 |
      tail -15)
  ⎿  Updated src/domain/format.test.ts (+1 -1)
      17      ['999', '999'],
      18      ['1000', '1,000'],
      19      ['-0.5', '−0.5'],
      20 -  ])('AC-2: results get thousands commas and a true minus: %s →
         - %s', (a, out) => {                                            
      20 +  ])('Decision 2: results get thousands commas and a true minus
         +: %s → %s', (a, out) => {                                      
      21      expect(shown(a)).toBe(out)
      22    })
      23  

⏺ The tests fail because nothing exists yet, which is what test-first should
  look like. Now the implementation, starting with the shared codes and
  decimal.ts.

⏺ Write(src/shared/messages.ts)
  ⎿  Wrote 22 lines to src/shared/messages.ts
       1 // Codes and the words a person sees, taken word for word from D
       2 // Errors are states the calculator is in; notices are refusals
         that leave the state as it was.
       3
         'NUMBER_TOO_SMALL'
       5
         ASTE_AMBIGUOUS_DECIMAL' | 'PASTE_BRACKETS'
       7
       8 export const ERROR_TEXT: Readonly<Record<ErrorCode, string>> = {
      10   NUMBER_TOO_LARGE: 'Number too large',
     … +19 lines (ctrl+o to expand)
⏺ Write(src/shared/keys.ts)
  ⎿  Wrote 4 lines to src/shared/keys.ts
      1 // The four operators, written with the characters the screen sho
        ws.
      2 export type Operator = '+' | '−' | '×' | '÷'
      3
      4 export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7'
         | '8' | '9'

⏺ Write(src/domain/decimal.ts)
  ⎿  Wrote 93 lines to src/domain/decimal.ts
       1 import Decimal from 'decimal.js'
       3 // The only file that imports decimal.js. Every value in the cal
         culator is built by Value34.
       5 // Precision 34 is deliberate: it is the precision of IEEE 754 d
       6 // multiply to at most 30 digits, so ordinary sums are exact; on
         ly division and long chains of
          as if exact (Decision 1).
       8 //
          what an ordinary person expects,
         roduct brief keeps banker's
     … +103 lines (ctrl+o to expand)

⏺ I'll simplify the helper in decimal.ts: its constructor parameter isn't
  needed.

⏺ Bash(python3 - <<'EOF'
      p="src/domain/decimal.ts"; s=open(p).read()…)
  ⎿  Updated src/domain/decimal.ts (+6 -6)
      38  
      39  type Step = (a: Decimal, b: Decimal) => Decimal
      40  
      41 -function exactly(a: Dec, b: Dec, step: Step, Ctor: typeof Value
         -34): Exacting {                                                
      41 +function exactly(a: Dec, b: Dec, step: Step): Exacting {       
      42    const exact = step(new TowardZero(a), b).eq(step(new AwayFrom
          Zero(a), b))
      43 -  return { value: step(new Ctor(a), b), exact }                
      43 +  return { value: step(a, b), exact }                          
      44  }
      45  
      46  export function add(a: Dec, b: Dec): Exacting {
      47 -  return exactly(a, b, (x, y) => x.plus(y), Value34)           
      47 +  return exactly(a, b, (x, y) => x.plus(y))                    
      48  }
      49  
      50  export function subtract(a: Dec, b: Dec): Exacting {
      51 -  return exactly(a, b, (x, y) => x.minus(y), Value34)          
      51 +  return exactly(a, b, (x, y) => x.minus(y))                   
      52  }
      53  
      54  export function multiply(a: Dec, b: Dec): Exacting {
      55 -  return exactly(a, b, (x, y) => x.times(y), Value34)          
      55 +  return exactly(a, b, (x, y) => x.times(y))                   
      56  }
      57  
      58  // The caller checks for a zero divisor first; arithmetic.ts re
          turns "Cannot divide by zero".
      59  export function divide(a: Dec, b: Dec): Exacting {
      60 -  return exactly(a, b, (x, y) => x.dividedBy(y), Value34)      
      60 +  return exactly(a, b, (x, y) => x.dividedBy(y))               
      61  }
      62  
      63  export function negate(a: Dec): Dec {

⏺ Now result.ts, value.ts and arithmetic.ts.

⏺ Write(src/domain/result.ts)
  ⎿  Wrote 18 lines to src/domain/result.ts
       1 import { ERROR_TEXT, type ErrorCode } from '../shared/messages'
       2
       3 // Errors are returned, never thrown (ADR 0005).
         T } | { readonly ok: false; readonly error: E }
       5
       6 export type CalcError = { readonly code: ErrorCode; readonly mes
         sage: string }
       8 export function ok<T>(value: T): Result<T, never> {
       9   return { ok: true, value }
      10 }
     … +10 lines (ctrl+o to expand)

⏺ Write(src/domain/value.ts)
  ⎿  Wrote 40 lines to src/domain/value.ts
       1 import type { ErrorCode } from '../shared/messages'
         recision, type Dec } from './decimal'
       3
         ther ≈ has been carried into it.
       5 // approx is set when a step was rounded at 34 digits, or when a
       6 // showed ≈ (Decision 3). It never clears; a new calculation sta
         rts from new values instead.
         lean }
       8
      10   return { amount: figure(text), approx }
     … +39 lines (ctrl+o to expand)

⏺ Write(src/domain/arithmetic.ts)
  ⎿  Wrote 27 lines to src/domain/arithmetic.ts
       1 import type { Operator } from '../shared/keys'
       2 import { add, divide, isZero, multiply, subtract, type Dec, type
          Exacting } from './decimal'
          './result'
       4 import { isMarked, rangeError, type Value } from './value'
       5
       6 function apply(a: Dec, op: Operator, b: Dec): Exacting {
       8     case '+':
       9       return add(a, b)
      10     case '−':
     … +24 lines (ctrl+o to expand)

⏺ Next, entry.ts (the figure being typed), format.ts and paste.ts.

⏺ Write(src/domain/entry.ts)
  ⎿  Wrote 16 lines to src/domain/entry.ts
       1 // A figure being typed or pasted, kept exactly as entered: digi
       2 // no leading zeros, trailing zeros kept (Decision 5). The sign
         is held apart, so the text
         .
       4 export type Entry = { readonly negative: boolean; readonly text:
       5
       6 export const DIGIT_LIMIT = 15
       8 // Every digit counts toward the 15, except a single 0 before th
         e point (Decision 5, AC-1.6).
      10   const digits = text.replace(/[^0-9]/g, '').length
     … +10 lines (ctrl+o to expand)

⏺ Write(src/domain/format.ts)
  ⎿  Wrote 62 lines to src/domain/format.ts
       1 import { atLeastInSize, exponentText, figure, isZero, plainText,
          toDisplayPrecision, type Dec } from './decimal'
       3 import { calcError, fail, ok, type CalcError, type Result } from
          './result'
       4 import { isMarked, rangeError, type Value } from './value'
       6 export type Formatted = { readonly text: string; readonly approx
         : boolean }
       7
       9 const EXPONENTIAL_FROM = figure('1e15')
      10 const PLAIN_FROM = figure('1e-9')
     … +67 lines (ctrl+o to expand)

⏺ Write(src/domain/paste.ts)
  ⎿  Wrote 57 lines to src/domain/paste.ts
      1 import type { NoticeCode } from '../shared/messages'
      2 import { countedDigits, DIGIT_LIMIT, isZeroText, type Entry } fro
        m './entry'
      4
      5 // Spaces, including the no-break and thin spaces some sources us
        e as thousands separators.
      6 const SPACES = /[    ]/g
      8 // An optional sign before or after an optional £ $ €, never both
         signs (Decision 9).
      9 const SIGN_SYMBOL_BODY = /^([-+−]?)([£$€]?)([-+−]?)(.*)$/
     … +64 lines (ctrl+o to expand)

⏺ Bash(python3 - <<'EOF'
      p="src/domain/paste.ts"; s=open(p).read()…)
  ⎿  Updated src/domain/paste.ts (+2 -1)
      52    const figure = normalised(body.replace(/,/g, ''))
      53    if (countedDigits(figure) > DIGIT_LIMIT) return fail('DIGIT_L
          IMIT')
      54  
      55 -  const negative = (before || after) !== '' && (before || after
         -) !== '+' && !isZeroText(figure)                               
      55 +  const sign = before || after                                 
      56 +  const negative = (sign === '-' || sign === '−') && !isZeroTex
         +t(figure)                                                      
      57    return ok({ negative, text: figure })
      58  }
  ⎿  Updated vite.config.ts (+0 -2)
       6    test: {
       7      environment: 'jsdom',
       8      setupFiles: ['./vitest.setup.ts'],
       9 -    // src is empty until the first story lands; remove once te
         -sts exist.                                                     
      10 -    passWithNoTests: true,                                     
       9    },
      10  })

⏺ Two failures. The TypeScript error suggests paste.ts holds a raw
  line-separator character inside a regex, and one format case for a negative
  number fails. Inspecting both:

  Ran 1 shell command (ctrl+o to expand)

⏺ Found two bugs: paste.ts has raw line/paragraph separator characters in a
  regex that need to be escape sequences, and format.ts is incorrectly grouping
  the minus sign with digits. I'll fix the regex escaping and strip the sign
  before grouping in the formatter.

⏺ Bash(python3 - <<'EOF'
      p="src/domain/paste.ts"; s=open(p).read()…)
  ⎿  Updated src/domain/format.ts (+6 -8)
      30    return `${mantissa} × 10${power}`
      31  }
      32  
      33 -function sized(shown: Dec): string {                           
      34 -  // Notation is decided by the rounded value, so 999,999,999,9
         -99,999.5 shows as ≈ 1 × 10¹⁵.                                  
      35 -  const exponentialForm = atLeastInSize(shown, EXPONENTIAL_FROM
         -) || !atLeastInSize(shown, PLAIN_FROM)                         
      36 -  return exponentialForm ? exponential(exponentText(shown)) : g
         -rouped(plainText(shown))                                       
      37 -}                                                              
      38 -                                                               
      33  function text(shown: Dec): string {
      34    // Never negative zero: a zero has no sign to show (Decision 
          2).
      35    if (isZero(shown)) return '0'
      42 -  const body = sized(shown)                                    
      43 -  return body.startsWith('-') ? MINUS + body.slice(1) : body   
      36 +  // Notation is decided by the rounded value, so 999,999,999,9
         +99,999.5 shows as ≈ 1 × 10¹⁵.                                  
      37 +  const exponentialForm = atLeastInSize(shown, EXPONENTIAL_FROM
         +) || !atLeastInSize(shown, PLAIN_FROM)                         
      38 +  const raw = exponentialForm ? exponentText(shown) : plainText
         +(shown)                                                        
      39 +  const negative = raw.startsWith('-')                         
      40 +  const unsigned = negative ? raw.slice(1) : raw               
      41 +  return (negative ? MINUS : '') + (exponentialForm ? exponenti
         +al(unsigned) : grouped(unsigned))                              
      42  }
      43  
      44  // A result as the screen shows it: 15 significant digits round
          ed half up, no trailing zeros,
  ⎿  Updated src/domain/paste.ts (+1 -1)
       4  
       5  // Spaces, including the no-break and thin spaces some sources 
          use as thousands separators.
       6  const SPACES = /[    ]/g
       7 -const LINE_BREAK_OR_TAB = /[\t\n\r\v\f  ]/                     
       7 +const LINE_BREAK_OR_TAB = /[\t\n\r\v\f\u2028\u2029]/           
       8  // An optional sign before or after an optional £ $ €, never bo
          th signs (Decision 9).
       9  const SIGN_SYMBOL_BODY = /^([-+−]?)([£$€]?)([-+−]?)(.*)$/
      10  

⏺ All 136 tests pass and the typecheck is clean. I'll remove the now-unneeded
  .gitkeep placeholders and commit part one.

⏺ Bash(git rm -q src/domain/.gitkeep src/shared/.gitkeep && git add src/domain
      src/shared vite.config.ts && git status --short && git commit -q -F -
      <<'EOF'
      Add decima…)
  ⎿  Deleted src/domain/.gitkeep (+0 -0)
  ⎿  Deleted src/shared/.gitkeep (+0 -0)

⏺ Pushed commit 62d03da for the decimal arithmetic, formatter, and paste parser.
  Moving to part two, I'll write engine tests covering the full state
  transition table and each acceptance criterion as a story test.

⏺ Write(src/domain/engine.test.ts)
  ⎿  Wrote 908 lines to src/domain/engine.test.ts
       1 import { describe, expect, it } from 'vitest'
       2 import type { Digit } from '../shared/keys'
       4 import { initial, readout, step, type Engine, type Event } from
         './engine'
       5 import { lineText } from './tape'
       7 // Test notation follows docs/user-stories.md: keys as pressed,
         separated by spaces.
       8 // Esc is clear, Del is clear entry, Bksp is backspace. A run of
       9 const NAMED: Readonly<Record<string, Event>> = {
      10   '+': { type: 'operator', operator: '+' },
     … +1135 lines (ctrl+o to expand)

⏺ I left a placeholder assertion in the AC-9.5 and AC-13.14 tests. I'll replace
  both with real checks.

⏺ Bash(python3 - <<'EOF'
      p="src/domain/engine.test.ts"; s=open(p).read()…)
  ⎿  Updated src/domain/engine.test.ts (+7 -6)
      589        expectNoChange(s, (x) => x.keys(key))
      590      })
      591  
      592 -    it('AC-9.5: no tape line is written for the error', () => 
          -{                                                             
      593 -      const before = calc(`95 M+ Esc ${keys}`.replace(/ =$/, '
          -')).tape.length                                               
      594 -      const s = calc(`95 M+ Esc ${keys}`)                     
      595 -      expect(s.tape.length).toBeLessThanOrEqual(before + 1)   
      596 -      expect(s.tape.every((line) => !line.includes(message))).
          -toBe(true)                                                    
      592 +    it('AC-9.5: the step that fails writes no tape line', () =
          +> {                                                           
      593 +      const s = calc(`95 M+ Esc ${keys.replace(/ =$/, '')}`)  
      594 +      const lines = s.state.tape                              
      595 +      s.keys('=')                                             
      596 +      expect(s.display).toBe(message)                         
      597 +      expect(s.state.tape).toBe(lines)                        
      598      })
      599  
      600      it.each<[string, (s: Session) => void, string]>([
     ...
      766    })
      767    it('AC-13.14: recalling 1 × 10⁹⁰ and × 10000000000 = shows "
           Number too large"', () => {
      768      const s = calc('10000000000 × 10000000000 = = = = = = = = 
           Esc')
      768 -    expect(s.tape.at(-1)).toBe('10⁸⁰ placeholder'.length ? s.t
          -ape.at(-1) : '')                                              
      769 +    expect(s.tape.at(-1)).toBe('1 × 10⁸⁰ × 10,000,000,000 = 1 
          +× 10⁹⁰')                                                      
      770      expect(s.recall(8).display).toBe('1 × 10⁹⁰')
      771      expect(s.keys('× 10000000000 =').display).toBe('Number too
            large')
      772    })

⏺ The engine tests fail because there's no engine yet, as they should. Now the
  implementation: typing rules in entry.ts, then tape.ts, memory.ts and a show()
  helper in the formatter.

⏺ Bash(cat >> src/domain/entry.ts <<'EOF'…)
  ⎿  Updated src/domain/entry.ts (+32 -0)
      14  export function isZeroText(text: string): boolean {
      15    return !/[1-9]/.test(text)
      16  }
      17 +                                                               
      18 +export const EMPTY_ENTRY: Entry = { negative: false, text: '0' 
         +}                                                              
      19 +                                                               
      20 +// A figure that becomes zero loses its sign, so −0 is never sh
         +own (Decisions 2 and 5).                                       
      21 +function signed(negative: boolean, text: string): Entry {      
      22 +  return { negative: negative && !isZeroText(text), text }     
      23 +}                                                              
      24 +                                                               
      25 +// Returns the same entry when the key has nothing to act on: a
         +n extra leading zero (AC-1.4).                                 
      26 +// A 16th digit is refused with "15 digits maximum", never drop
         +ped silently (AC-1.5).                                         
      27 +export function typeDigit(e: Entry, digit: string): Entry | 'DI
         +GIT_LIMIT' {                                                   
      28 +  if (e.text === '0') return digit === '0' ? e : signed(e.negat
         +ive, digit)                                                    
      29 +  const text = e.text + digit                                  
      30 +  return countedDigits(text) > DIGIT_LIMIT ? 'DIGIT_LIMIT' : si
         +gned(e.negative, text)                                         
      31 +}                                                              
      32 +                                                               
      33 +// A second point has nothing to act on (AC-1.3).              
      34 +export function typePoint(e: Entry): Entry {                   
      35 +  return e.text.includes('.') ? e : signed(e.negative, `${e.tex
         +t}.`)                                                          
      36 +}                                                              
      37 +                                                               
      38 +// Removes the last character typed, digit or point; the last o
         +ne leaves 0 (AC-7.8, AC-7.9).                                  
      39 +export function deleteLast(e: Entry): Entry {                  
      40 +  if (e === EMPTY_ENTRY || (e.text === '0' && !e.negative)) ret
         +urn e                                                          
      41 +  const text = e.text.slice(0, -1)                             
      42 +  return text === '' ? EMPTY_ENTRY : signed(e.negative, text)  
      43 +}                                                              
      44 +                                                               
      45 +// +/− on zero has nothing to act on (Decision 5).             
      46 +export function toggleSign(e: Entry): Entry {                  
      47 +  return isZeroText(e.text) ? e : signed(!e.negative, e.text)  
      48 +}                                                              
  ⎿  Updated src/domain/format.ts (+9 -0)
      1 +import { ERROR_TEXT } from '../shared/messages'                 
      2  import { atLeastInSize, exponentText, figure, isZero, plainText,
          toDisplayPrecision, type Dec } from './decimal'
      3  import type { Entry } from './entry'
      4  import { calcError, fail, ok, type CalcError, type Result } from
          './result'
     ...
      59  export function formatEntry(e: Entry): string {
      60    return (e.negative ? MINUS : '') + e.text
      61  }
      62 +                                                               
      63 +// A stored value with its ≈, as the expression line, tape and 
         +M indicator show it. Values reach                              
      64 +// the engine only through checks that keep them in range, so t
         +he fallback is never seen; it                                  
      65 +// exists so that showing a value can never fail.              
      66 +export function show(v: Value): string {                       
      67 +  const f = formatValue(v)                                     
      68 +  return f.ok ? withMark(f.value) : ERROR_TEXT[f.error.code]   
      69 +}                                                              
⏺ Bash(python3 - <<'EOF'
      p="src/domain/entry.ts"; s=open(p).read()…)
  ⎿  Updated src/domain/entry.ts (+1 -1)
      37  
      38  // Removes the last character typed, digit or point; the last o
          ne leaves 0 (AC-7.8, AC-7.9).
      39  export function deleteLast(e: Entry): Entry {
      40 -  if (e === EMPTY_ENTRY || (e.text === '0' && !e.negative)) ret
         -urn e                                                          
      40 +  if (e.text === '0') return e                                 
      41    const text = e.text.slice(0, -1)
      42    return text === '' ? EMPTY_ENTRY : signed(e.negative, text)
      43  }

⏺ Write(src/domain/tape.ts)
  ⎿  Wrote 50 lines to src/domain/tape.ts
       1 import type { Operator } from '../shared/keys'
       2 import { formatValue, show } from './format'
       3 import { isMarked, type Value } from './value'
       4
       5 // One finished step of a calculation: left op right = result.
       6 export type Step = {
       7   readonly left: Value
       8   readonly op: Operator
       9   readonly right: Value
      10   readonly result: Value
     … +51 lines (ctrl+o to expand)

⏺ Write(src/domain/memory.ts)
  ⎿  Wrote 14 lines to src/domain/memory.ts
       1 import { operate } from './arithmetic'
       2 import type { CalcError, Result } from './result'
       3 import type { MemoryKey } from './tape'
       5
       6 // Memory is empty (null) or one running total. A total of 0 is
         still a total, so the
       7 // M indicator shows M 0 until MC (Decision 19, AC-19.9).
       9
      10 // M+ and M− use the same arithmetic as a calculation, so the to
         tal keeps any ≈ it is given
     … +8 lines (ctrl+o to expand)

⏺ Write(src/shared/view.ts)
  ⎿  Wrote 9 lines to src/shared/view.ts
      1 // What the readout shows, as display strings only. The UI never
        sees a value or an error object.
      2 export type Readout = {
      3   // The figure, running result or result, with "≈ " in front whe
        n it has one, or the error text.
      5   readonly expression: string
      6   // "M 95" while memory holds a value, otherwise null.
      7   readonly memory: string | null
      8   readonly error: boolean
      9 }
     … +1 line (ctrl+o to expand)

⏺ MemoryKey belongs with the other key names in shared/keys.ts, so neither
  tape.ts nor memory.ts depends on the other. Moving it, then writing engine.ts.

⏺ Bash(cat >> src/shared/keys.ts <<'EOF'…)
  ⎿  Updated src/domain/memory.ts (+1 -1)
      1 +import type { MemoryKey } from '../shared/keys'                 
      2  import { operate } from './arithmetic'
      3  import type { CalcError, Result } from './result'
      3 -import type { MemoryKey } from './tape'                         
      4  import { ZERO, type Value } from './value'
      5  
      6  // Memory is empty (null) or one running total. A total of 0 is 
         still a total, so the
  ⎿  Updated src/domain/tape.ts (+1 -3)
      1 -import type { Operator } from '../shared/keys'                  
      1 +import type { MemoryKey, Operator } from '../shared/keys'       
      2  import { formatValue, show } from './format'
      3  import { isMarked, type Value } from './value'
      4  
     ...
      10    readonly result: Value
      11  }
      12  
      13 -export type MemoryKey = 'M+' | 'M−'                            
      14 -                                                               
      13  // A tape line keeps its working and its result apart, so the t
          ape can put results in their own
      14  // column aligned on the point, with ≈ in a column of its own (
          Decision 15).
      15  export type TapeLine = {
  ⎿  Updated src/shared/keys.ts (+2 -0)
      2  export type Operator = '+' | '−' | '×' | '÷'
      3  
      4  export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7
         ' | '8' | '9'
      5 +                                                                
      6 +export type MemoryKey = 'M+' | 'M−'                             

⏺ Write(src/domain/engine.ts)
  ⎿  Wrote 342 lines to src/domain/engine.ts
       1 import type { Digit, MemoryKey, Operator } from '../shared/keys'
       2 import type { NoticeCode } from '../shared/messages'
       3 import type { Readout } from '../shared/view'
       4 import { operate } from './arithmetic'
       5 import { isZero } from './decimal'
         nt, type Entry } from './entry'
       7 import { formatEntry, show } from './format'
       8 import { changeMemory, type Memory } from './memory'
       9 import { parsePaste } from './paste'
      10 import type { CalcError } from './result'
     … +398 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ All 480 tests pass and typechecking is clean, but since everything passed
  first try I want to confirm the tests aren't just vacuous—so I'll introduce
  three deliberate breakages (letting operators act during an error, adding a
  seventh state to the union, and flagging every value as exact in formatValue)
  to verify they actually fail, then revert all three.

  Ran 1 shell command (ctrl+o to expand)

⏺ Each attempted change (operators during error, a seventh state, dropping the
  exactness flag) broke tests—14, 8, and 35 respectively—so I reverted them all,
  confirmed all 480 tests pass, and I'm now committing the engine.

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed: 7e2bb5b "Add the calculator engine as a pure reducer". Now I'll check
  the diagrams against the code. First, the real import graph against the module
  diagram in architecture.md:

  Ran 1 shell command (ctrl+o to expand)

⏺ Comparing the planned diagrams to the actual code, I found several missing and
  extra import arrows in the module diagram, plus a missing transition in the
  state diagram for = on a recalled value with no pending operator. I'll update
  both diagrams to match the real implementation.

⏺ Bash(python3 - <<'EOF'
      p="docs/architecture.md"; s=open(p).read()…)
  ⎿  Updated docs/architecture.md (+9 -10)
       95  
       96  ## Layers and modules
       97  
       98 -Every arrow is an import, and every arrow points inwards. The 
          -M indicator is part of `Display`, on the readout's top row bes
          -ide the expression line. The "Change sign" tooltip is part of 
          -`Keypad`, on the `+/−` key.                                   
       98 +Every arrow is an import, and every arrow points inwards. The 
          +domain arrows are the imports in `src/domain/` as built; the `
          +app` and `ui` arrows are still the plan. The M indicator is pa
          +rt of `Display`, on the readout's top row beside the expressio
          +n line. The "Change sign" tooltip is part of `Keypad`, on the 
          +`+/−` key.                                                    
       99  
      100  ```mermaid
      101  flowchart TB
     ...
      151      useKeyboard --> useCalculator
      152      useCalculator --> view & messages
      153  
      154 -    engine --> entry & paste & arithmetic & tape & memory & va
          -lue & result                                                  
      154 +    engine --> entry & paste & arithmetic & tape & memory & va
          +lue & result & format & decimal                               
      155      memory --> arithmetic & value & result
      156 -    paste --> entry                                           
      156 +    paste --> entry & result                                  
      157      arithmetic --> value & decimal & result
      158 -    format --> value & decimal                                
      159 -    engine --> format                                         
      160 -    tape --> format                                           
      158 +    format --> value & decimal & entry & result               
      159 +    tape --> format & value                                   
      160      value --> decimal
      162 -    entry --> result                                          
      163 -    paste --> result                                          
      161      decimal --> decimaljs
      165 -    engine --> messages                                       
      166 -    format --> view                                           
      162 +    engine & memory & arithmetic & tape --> keys              
      163 +    engine & paste & format & value & result --> messages     
      164 +    engine --> view                                           
      165  ```
      166  
      167  ## Engine states
     ...
      199      Recalled --> Entering : paste accepted
      200      Recalled --> Recalled : +/−, ≈ kept
      201      Recalled --> Recalled : Backspace (no change)
      202 +    Recalled --> Recalled : = with nothing pending (no change)
      203      Recalled --> Entering : Delete, value becomes 0, pending o
           perator kept
      204      Recalled --> Recalled : recall, replaces value
     … 1 more lines (ctrl+o to expand)
  ⎿  Updated docs/diagrams/app-flow.mmd (+1 -1)
      74        end
      75        subgraph PRecalled["Recalled"]
      76          direction LR
      77 -        Recalled["<b>Recalled</b><br/>↺ +/−, ≈ kept<br/>↺ Backs
         -pace (no change)<br/>↺ recall or MR, replaces the value<br/>↺ p
         -aste refused (notice)<br/>↺ M+ or M− ▶ memory line"]           
      77 +        Recalled["<b>Recalled</b><br/>↺ +/−, ≈ kept<br/>↺ Backs
         +pace (no change)<br/>↺ = with nothing pending (no change)<br/>↺
         + recall or MR, replaces the value<br/>↺ paste refused (notice)<
         +br/>↺ M+ or M− ▶ memory line"]                                 
      78          Recalled_Entering["→ Entering"]
      79          Recalled_Pending["→ Pending"]
      80          Recalled_Result["→ Result"]
  ⎿  … 1 more file changed
  ⎿  (timeout 3m)

  Read 1 file (ctrl+o to expand)

⏺ The Recalled panel now lists = with nothing pending (no change), and all
  diagrams parse.

  Ran 1 shell command (ctrl+o to expand)

⏺ Domain built: 480 tests pass, the typecheck is clean and everything is pushed.
  Writing the tests turned up no disagreement between the Decisions and the
  acceptance criteria, so I didn't need to stop. All stories stay Not
  implemented, because none can be checked until there is a screen.

  Commits

  1. 8009254 Add MR on a recalled value to the state diagrams (S-19)
  2. b264081 Give the real element count in ADR 0007
  3. 6cd1a21 Correct the second element count in ADR 0007. My first commit
     missed a second "twenty" in the same ADR.
  4. bd13a75 Decide four details the engine tests need
  5. 6695472 Move the tape into the engine state. architecture.md had the app
     holding the tape; you asked for the reducer to build it.
  6. 62d03da Add decimal arithmetic, formatter and paste parser
  7. 7e2bb5b Add the calculator engine as a pure reducer
  8. 7633839 Match the diagrams to the engine as built

  Transition table

  "—" means no change and no message. Each cell is tested.

  Event: digit
  Ready: Entering
  Entering: Entering; a 16th digit gives a notice
  Recalled: Entering, replaces it
  Pending: Entering
  Result: Entering, new calculation
  Error: Entering, new calculation
  ────────────────────────────────────────
  Event: point
  Ready: Entering 0.
  Entering: Entering; a second point is —
  Recalled: Entering 0.
  Pending: Entering 0.
  Result: Entering, new calculation
  Error: Entering, new calculation
  ────────────────────────────────────────
  Event: operator
  Ready: Pending on the 0
  Entering: Pending; with an operator pending the step runs, a failure → Error
  Recalled: as Entering
  Pending: Pending, operator replaced
  Result: Pending from the result
  Error: —
  ────────────────────────────────────────
  Event: =
  Ready: —
  Entering: with an operator pending → Result ▶ tape, a failure → Error;
  otherwise —
  Recalled: as Entering
  Pending: —
  Result: Result, repeats the step ▶ tape; a failure → Error
  Error: —
  ────────────────────────────────────────
  Event: Escape
  Ready: —
  Entering: Ready
  Recalled: Ready
  Pending: Ready
  Result: Ready
  Error: Ready
  ────────────────────────────────────────
  Event: Delete
  Ready: —
  Entering: Entering 0
  Recalled: Entering 0, operator kept
  Pending: —
  Result: Ready
  Error: Ready
  ────────────────────────────────────────
  Event: Backspace
  Ready: —
  Entering: Entering, last character removed
  Recalled: —
  Pending: —
  Result: —
  Error: —
  ────────────────────────────────────────
  Event: +/−
  Ready: —
  Entering: sign flipped (on 0, —)
  Recalled: sign flipped, ≈ kept (on 0, —)
  Pending: —
  Result: sign flipped, no tape line (on 0, —)
  Error: —
  ────────────────────────────────────────
  Event: paste accepted
  Ready: Entering
  Entering: Entering, replaces
  Recalled: Entering, replaces
  Pending: Entering
  Result: Entering, new calculation
  Error: Entering, new calculation
  ────────────────────────────────────────
  Event: paste refused
  Ready: notice
  Entering: notice
  Recalled: notice
  Pending: notice
  Result: notice
  Error: notice, error stays
  ────────────────────────────────────────
  Event: recall, or MR with memory held
  Ready: Recalled
  Entering: Recalled, replaces
  Recalled: Recalled, replaces
  Pending: Recalled, becomes the next figure
  Result: Recalled, new calculation
  Error: Recalled, new calculation
  ────────────────────────────────────────
  Event: M+ / M−
  Ready: ▶ memory line, on 0
  Entering: ▶ memory line
  Recalled: ▶ memory line
  Pending: ▶ memory line, on the running result
  Result: ▶ memory line
  Error: —
  ────────────────────────────────────────
  Event: M+ / M− out of range
  Ready: Error
  Entering: Error
  Recalled: Error
  Pending: Error
  Result: Error
  Error: n/a
  ────────────────────────────────────────
  Event: MR with memory empty
  Ready: —
  Entering: —
  Recalled: —
  Pending: —
  Result: —
  Error: —
  ────────────────────────────────────────
  Event: MC
  Ready: clears memory
  Entering: clears memory
  Recalled: clears memory
  Pending: clears memory
  Result: clears memory
  Error: clears memory, error stays

  Checking this table against the diagram found one gap: = on a recalled value
  with no operator pending. The diagram didn't list it, so I added it (commit
  8). The module diagram's domain arrows now match the real imports.

  Things that look wrong but are deliberate

  - Two extra decimal.js clones. This departs from "one configured clone" in
    CLAUDE.md, so it's your call. A step's exactness is judged by computing it
    rounded toward zero and away from zero: equal results mean nothing was
    rounded. The extra clones never produce a value that leaves decimal.ts, and
    every value still comes from the one 34-digit, half-up clone. The only
    one-clone alternatives were hand-written BigInt maths, which you ruled out,
    or a check that sometimes gets it wrong.
  - Rounding mode: ROUND_HALF_UP, away from zero for negatives, not banker's
    rounding. Commented in decimal.ts.
  - Precision limit: 34 digits, the precision of IEEE 754 decimal128. Two
    15-digit figures multiply to at most 30 digits, so only division and long
    chains get ≈.
  - The tests can fail. I broke the code three ways on purpose:
    - letting operators act during an error broke 14 tests
    - adding a seventh state failed the typecheck in 8 places
    - dropping the exactness flag broke 35 tests

  Choices made under the standing rule (in Decisions; overrule any)

  1. Carrying ≈. A ≈ from a cut display carries like one from rounding. So
     123456789012345 + 0.5 − 0.5 = shows ≈ 123,456,789,012,345, even though that
     answer is exact.
  2. Sign of zero. A figure that becomes zero loses its sign: −0.5, then
     Backspace, gives 0..
  3. Paste edge cases:
     - £ $ € are accepted only at the start of the figure.
     - A bracket that doesn't wrap the whole figure is unreadable.
     - More than one point gets "Unclear which mark is the decimal point".
     - 007 becomes 7, and .5 becomes 0.5.
  4. Memory overflow. The expression line shows the failed memory step, for
     example M+ 5 × 10⁹⁹.

  Still open

  - Emptying the tape (S-14) isn't one of the events you listed, so the engine
    can't do it yet. It will need an emptyTape event when the app is built.
  - Not yet tested here: the fault, the keyboard mapping and the screen-reader
    criteria. Those belong to the app and UI.
  - Layer test. A boundaries test already checks that only decimal.ts imports
    decimal.js, that no source file uses native number parsing or rounding, and
    that nothing in the domain throws. The full layer test is still to come.

❯ Keep the four choices from the engine. They already match Decisions 3, 5, 9
  and 19. Leave them.

  The two extra decimal.js clones stay. They only answer whether a step was
  rounded, and no value they produce leaves decimal.ts. Every stored value
  still comes from the one 34-digit, half-up clone. Before any UI, change the
  arithmetic rule in CLAUDE.md so it says that, in its own commit. While you
  are there, if the product brief still calls banker's rounding an open
  question, close it: Decision 1 already chose round half up, away from zero
  for negatives.

  Then build the screen. The engine is done. Wire the app to it. Do not
  reimplement the arithmetic.

  One missing event. Emptying the tape (Decision 11) needs an emptyTape event
  on the reducer, with tests first. It does not clear memory. It works during
  an error and leaves the error. The button's first press only relabels to
  "Press again to empty", and that reverts when focus leaves or another key is
  pressed, with no timer. On an empty tape it does nothing.

  src/app holds the engine state and the keyboard listener. That listener is
  the only file that knows key codes. It turns a key into a domain event and
  nothing else. The mapping is Decision 13, including the numpad, both Enter
  keys, the Apple numpad equals and Clear, and Num Lock off. preventDefault
  where the browser would do its own thing, including slash in Firefox. Memory
  keys and +/− have no shortcut.

  The fault is an error boundary around the calculator, for a throw the engine
  is not supposed to make. Use the fault sentence from Decision 8. Only C and
  Escape work, and they reset the calculation while keeping the tape and
  memory. Every other input, including MC, does nothing.

  src/ui follows docs/ux/mockup.html. That file is the visual source. If the
  app and the mockup disagree, the app is wrong, unless the mockup contradicts
  a Decision, in which case stop and tell me.

  Include the display, the expression line, the message line, the M indicator,
  the six-by-four keypad, and the tape. CSS Modules, tokens taken from the
  mockup, light and dark only through prefers-color-scheme. No theme menu.

  Things I will check:
  - every key is a button, same size, accessible name in words, memory keys
  "memory clear", "memory recall", "memory minus", "memory plus", the sign key
  "change sign" with a Change sign tooltip
  - the memory row is a solid outline with no fill and a regular-weight label
  - the five operators on the right use the accent, and = is the strongest
  - keyboard legends sit in their own row, centred, at least 14px, only on
  hover with a mouse, and the rows of labels stay level
  - ≈ is bold, larger, and in an outlined chip on the display, the expression
  line, the tape and the M indicator
  - the result region is aria-live polite, the expression line is not, and the
  M indicator is announced as memory plus its total
  - the tape is an explicit role="list", one Tab stop, Up and Down move between
  lines, Enter or Space recalls, Left and Right do nothing, and a new line
  scrolls into view
  - a long result wraps, never cuts, and is never smaller than the key labels
  - an error or a message uses space that is already reserved, so the keypad
  does not jump
  - at 900px and below the tape sits behind Show tape / Hide tape, between the
  readout and the keypad, closed by default, and the calculator is centred at
  most 40rem
  - above 900px the calculator column is at least 30rem
  - keys are at least 44px at 320px wide, get shorter on a short window, and
  the page scrolls
  - 200% zoom cuts nothing off, 400% reflows to one column with no sideways
  scroll
  - hover styles apply only on hover devices, and touch-action is manipulation
  - focus is a ring, a click on a key leaves no focus, and typing a calculator
  key moves focus off a focused control

  Tests through role and label queries, story ID in the test name. Leave every
  story Not implemented. A screen reader check is still to come, and the last
  prompt is where a story gets flipped.

  Comments only for why, especially an accessible choice someone might tidy
  away.

  Get it running with npm run dev and give me the address. Then add
  start.command and start.bat. Each checks for Node, tells the person to
  install Node 20.19 or later if it is missing, installs dependencies on the
  first run, opens the browser, and starts the app. Neither signs in to
  anything or calls Claude. Commit those two separately from the UI.

  Tell me which parts you have not tested yourself.

⏺ I'll start with the two doc changes you asked for, each in its own commit.
  First, what currently mentions the rule and banker's rounding:

  Searched for 1 pattern (ctrl+o to expand)

⏺ Bash(sed -n '34p' docs/architecture.md | cut -c150-400; python3 - <<'EOF'
      p="CLAUDE.md"; s=open(p).read()…)
  ⎿  Updated CLAUDE.md (+1 -1)
      21  
      22  ## Arithmetic rule
      23  - No user-facing arithmetic uses JS number operators, `Number()
          `, `parseFloat` or `toFixed`. Values are decimal.js `Decimal` (
          or strings) from input to display.
      24 -- Use one configured clone (`precision: 34`, `ROUND_HALF_UP`). 
         -Never mutate the global `Decimal`. JS numbers are fine for non-
         -values (indexes, lengths, digit counts).                       
      24 +- Every stored value comes from one configured clone (`precisio
         +n: 34`, `ROUND_HALF_UP`). `domain/decimal.ts` also holds two cl
         +ones that round toward and away from zero: they only answer whe
         +ther a step was rounded, and no value they produce leaves that 
         +file. Never mutate the global `Decimal`. JS numbers are fine fo
         +r non-values (indexes, lengths, digit counts).                 
      25  
      26  ## Testing
      27  - Vitest, React Testing Library, jsdom. Domain tests are table-
          driven and pure, and hold most of the coverage, including every
           boundary in Decisions.

⏺ Pushed: 70aed56. architecture.md's "every value is a Decimal from the one
  configured clone" is still true, so it stays. Now the brief:

⏺ Bash(grep -n -i 'rounding\|half up' docs/product-brief.md | cut -c1-200;
      python3 - <<'EOF'
      p="docs/product-brief.md"; s=open(p).read()…)
  ⎿  Updated docs/product-brief.md (+0 -1)
      74  | Will users paste figures in styles other than UK/US, such as 
          `1.234,56`? | UK/US only. Anything else is refused with "Unclea
          r which mark is the decimal point". |
      75  | Do finance users need accounting brackets `(1,234)` for negat
          ives? | They will accept a minus sign. Brackets are refused wit
          h a message that says so. |
      76  | Spaces are stripped from pasted figures, so `12 34` becomes 1
          234. Could that join two figures? | Users paste one figure at a
           time. Tabs and line breaks inside a paste are refused, which c
          overs copying several cells at once. |
      77 -| Do some finance teams expect banker's rounding rather than ha
         -lf up? | Half up, because it is what an ordinary person expects
         -. |                                                            
      77  | Will R-1 be confused by `≈ 0` after, for example, 100 ÷ 3 × 0
          ? | Honest beats tidy. The mark overstates the doubt but never 
          claims something false. |
      78  | Will R-1 expect 2 + 3 × 4 to give 14? | Some will. Showing th
          e running result (`5 ×`) as soon as the operator is pressed mak
          es the rule visible early enough. |
      79  | Do 15 digits cover every money figure a desk checker meets? |
           Yes. Up to 9,999,999,999,999.99 fits, with pence. |

⏺ Pushed commit 24f6231 and updated the docs: noted that emptyTape is the sole
  exception to the append-only tape in architecture.md, and documented the
  Decision that numpad Delete (Num Lock off) maps to clear entry, per Decision
  13's rule of following the browser's reported key.

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b):…)
  ⎿  Updated CLAUDE.md (+1 -1)
      55  10. **Recall.** A click, or Enter or Space, on a tape line reca
          lls its final result as the full 34-digit value with its ≈. Whi
          le typing it replaces the figure; after an operator it is the n
          ext figure; after =, at the start or in an error it starts a ne
          w calculation. Backspace does not edit it; a digit replaces it.
           From the keyboard the tape is one Tab stop: Up and Down move b
          etween lines, Enter or Space recalls the line, Tab leaves the t
          ape. Left and Right do nothing in the tape, and outside the tap
          e every arrow key does nothing.
      56  11. **Tape.** One line per =, every step with its running resul
          t: `2 + 3 = 5 → × 4 = 20`. Newest last; long lines wrap, never 
          cut. An ordered list with an explicit `role="list"` (CSS can st
          rip list semantics in Safari). Not persisted; the browser keepi
          ng the page in memory on Back is not persistence. Emptying: fir
          st press relabels "Press again to empty"; reverts when focus le
          aves or another key is pressed, no timer; does nothing when emp
          ty; works in an error and leaves it. Emptying the tape does not
           clear memory.
      57  12. **Messages** (not errors) stay until the next key press, cl
          ick or paste, no timer, announced like a result.
      58 -13. **Keyboard.** Digits, `.`, `+ - * /` on the top row and the
         - numpad; Enter, numpad Enter, `=` and the Apple numpad `=` are 
         -equals; Escape and the Apple numpad Clear are clear; Delete is 
         -clear entry; Backspace. A character that needs Shift (`*`, `+`)
         - counts as that character. The numpad decimal key is the point 
         -whatever character it reports. With Num Lock off, the browser's
         - reported key is followed (navigation keys do nothing). No shor
         -tcuts with Ctrl, Cmd or Alt. +/− and the memory keys have no ke
         -y: Tab to them. Enter and Space activate the focused control; w
         -ith nothing focused, Enter is =. A mouse click on a key leaves 
         -no focus; typing a calculator key moves focus off a focused con
         -trol.                                                          
      58 +13. **Keyboard.** Digits, `.`, `+ - * /` on the top row and the
         + numpad; Enter, numpad Enter, `=` and the Apple numpad `=` are 
         +equals; Escape and the Apple numpad Clear are clear; Delete is 
         +clear entry; Backspace. A character that needs Shift (`*`, `+`)
         + counts as that character. The numpad decimal key is the point 
         +whatever character it reports. With Num Lock off, the browser's
         + reported key is followed (navigation keys do nothing; the nump
         +ad point then reports Delete and is clear entry). No shortcuts 
         +with Ctrl, Cmd or Alt. +/− and the memory keys have no key: Tab
         + to them. Enter and Space activate the focused control; with no
         +thing focused, Enter is =. A mouse click on a key leaves no foc
         +us; typing a calculator key moves focus off a focused control. 
      59  14. **Accessibility.** Every action works without a mouse. Disp
          lay changes (figure, running result with its operator, result, 
          error, message) are announced politely; the expression line is 
          not live. The M indicator is announced as "memory" and its tota
          l. Keys with no effect announce nothing. Tested with VoiceOver 
          on macOS Safari only; that check includes the tape being read a
          s a list.
      60  15. **Layout.** Direction C, "Ledger", flipped: calculator left
          , tape right; visual, Tab and screen-reader order calculator fi
          rst. Above 900px the calculator column is never narrower than 4
          80px (30rem) and the tape takes the rest; at 900px and below th
          e same calculator fills the width minus safe margins (at most 4
          0rem, centred), with the tape behind a "Show tape" / "Hide tape
          " toggle, closed by default, between readout and keypad. The ta
          pe is quiet: results in a right-hand column aligned on the poin
          t, ≈ in its own column, line numbers, characters unchanged. An 
          empty tape shows only "Finished calculations appear here". No u
          nits or currency mode. The UI never says "precision" or "floati
          ng point". Visual source of truth: `docs/ux/mockup.html` and it
          s tokens; if the app and that file disagree, one of them is a b
          ug.
      61     - **Keypad**, six rows of four, no empty cells, clear spacin
          g: `MC MR M− M+` / `C CE ⌫ ÷` / `7 8 9 ×` / `4 5 6 −` / `1 2 3 
          +` / `+/− 0 . =`. All keys the same size and shape. Memory row 
          in a quieter style: solid outline, no fill of its own, regular-
          weight label; never dashed, which reads as disabled. **Changed:
          ** the five operators down the right take the accent colour, = 
          strongest (previously = was the only accent key). The sign key 
          is labelled `+/−`, named "change sign", with a "Change sign" to
          oltip on hover.
  ⎿  Updated docs/architecture.md (+1 -1)
      166  
      167  ## Engine states
      168  
      169 -The engine is a pure function `step(state, event) → { state, n
          -otice? }`. Its state is `{ calc, memory, tape }`: `calc` is on
          -e of the states in the diagram. The tape is append-only and bu
          -ilt by the engine, so a finished calculation or a memory chang
          -e returns a state whose tape has one more line. `engine.ts` al
          -so exports `readout(state)`, which uses `format.ts` to give th
          -e display, expression line and M indicator as strings. In the 
          -diagram:                                                      
      169 +The engine is a pure function `step(state, event) → { state, n
          +otice? }`. Its state is `{ calc, memory, tape }`: `calc` is on
          +e of the states in the diagram. The tape is append-only and bu
          +ilt by the engine, so a finished calculation or a memory chang
          +e returns a state whose tape has one more line. The one except
          +ion is `emptyTape` (Decision 11), which empties the tape and l
          +eaves the calculation, an error included, and memory alone. It
          +s two-press confirmation lives in the app, in `useEmptyTapeCon
          +firm`. `engine.ts` also exports `readout(state)`, which uses `
          +format.ts` to give the display, expression line and M indicato
          +r as strings. In the diagram:                                 
      170  
      171  - A `≈` is a flag on the running value. It is set when a step 
           is rounded at 34 digits, when the result is cut for display, o
           r when an operand already carried one (Decision 3). A new calc
           ulation clears it.
      172  - **▶ tape** marks the transitions that write a calculation li
           ne. **▶ memory line** marks those that write a memory line.

⏺ Pushed commit d096bfc. Next I'll write tests for the domain additions: the
  emptyTape event across all states, and a pendingOperator field on the readout
  so the display announces values like "12 plus" per the screen-reader wireframe
  note.

⏺ Bash(python3 - <<'EOF'
      p="src/domain/engine.test.ts"; s=open(p).read()…)  ⎿  Updated src/domain/engine.test.ts (+61 -15)
       86    expect(session.notice).toBeUndefined()
       87  }
       88  
       89 +// Tape after the prefix: 1 "2 + 3 = 5", 2 "M+ 5, memory 5", 3
          + "M+ 1, memory 6". Memory holds 6.                            
       90 +const PREFIX = '2 + 3 = M+ 1 M+ Esc'                          
       91 +const setups: Record<string, () => Session> = {               
       92 +  Ready: () => calc(PREFIX),                                  
       93 +  Entering: () => calc(`${PREFIX} 12`),                       
       94 +  'Entering, operator pending': () => calc(`${PREFIX} 5 + 12`)
          +,                                                             
       95 +  Recalled: () => calc(PREFIX).recall(3),                     
       96 +  'Recalled, operator pending': () => calc(`${PREFIX} 7 +`).re
          +call(3),                                                      
       97 +  Pending: () => calc(`${PREFIX} 7 +`),                       
       98 +  Result: () => calc(`${PREFIX} 7 + 1 =`),                    
       99 +  Error: () => calc(`${PREFIX} 7 ÷ 0 =`),                     
      100 +}                                                             
      101 +const setup = (state: string) => (setups[state] ?? (() => calc
          +()))()                                                        
      102 +                                                              
      103  describe('the transition table: every state against every even
           t', () => {
       90 -  // Tape after the prefix: 1 "2 + 3 = 5", 2 "M+ 5, memory 5",
          - 3 "M+ 1, memory 6". Memory holds 6.                          
       91 -  const PREFIX = '2 + 3 = M+ 1 M+ Esc'                        
       92 -  const setups: Record<string, () => Session> = {             
       93 -    Ready: () => calc(PREFIX),                                
       94 -    Entering: () => calc(`${PREFIX} 12`),                     
       95 -    'Entering, operator pending': () => calc(`${PREFIX} 5 + 12
          -`),                                                           
       96 -    Recalled: () => calc(PREFIX).recall(3),                   
       97 -    'Recalled, operator pending': () => calc(`${PREFIX} 7 +`).
          -recall(3),                                                    
       98 -    Pending: () => calc(`${PREFIX} 7 +`),                     
       99 -    Result: () => calc(`${PREFIX} 7 + 1 =`),                  
      100 -    Error: () => calc(`${PREFIX} 7 ÷ 0 =`),                   
      101 -  }                                                           
      104  
      105    type Expect = { kind: string; display: string; expression: s
           tring; line?: string; memory?: string | null }
      106    type Row = [state: string, event: string, act: (s: Session) 
           => void, expected: Expect | 'unchanged' | NoticeCode]
     ...
      261    })
      262  
      263    it.each(rows)('%s, %s', (state, _event, run, expected) => {
      262 -    const session = (setups[state] ?? (() => calc()))()       
      264 +    const session = setup(state)                              
      265      const before = session.state
      266      run(session)
     … 66 more lines (ctrl+o to expand)

⏺ Failing as expected. Now the implementation, plus the stale banker's-rounding
  note in decimal.ts:

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b):…)
  ⎿  Updated src/domain/decimal.ts (+3 -4)
       7  // steps can need more, and those are marked ≈ rather than show
          n as if exact (Decision 1).
       8  //
       9  // ROUND_HALF_UP is deliberate too, not banker's rounding: it i
          s what an ordinary person expects,
      10 -// and for negatives it rounds away from zero (−2.5 → −3). The 
         -product brief keeps banker's                                   
      11 -// rounding as an open question.                               
      10 +// and for negatives it rounds away from zero (−2.5 → −3), as D
         +ecision 1 chose.                                               
      11  //
      12  // toExpNeg and toExpPos are at their limits so toString() neve
          r switches to exponent notation;
      13  // format.ts decides notation from the rounded value instead.
     ...
      18    toExpPos: 9e15,
      19  })
      20  
      22 -// Deliberate, and a departure from "one configured clone" in C
         -LAUDE.md: two more clones, used                                
      23 -// only to tell whether a step was rounded. If rounding toward 
         -zero and away from zero give the                               
      21 +// Deliberate, and allowed by the arithmetic rule in CLAUDE.md:
         + two more clones, used only to                                 
      22 +// tell whether a step was rounded. If rounding toward zero and
         + away from zero give the                                       
      23  // same 34 digits, the exact answer has at most 34 digits and n
          othing was rounded. Their results
      24  // are compared and thrown away here; no value they produce lea
          ves this file.
      25  const TowardZero = Value34.clone({ rounding: Decimal.ROUND_DOWN
           })
  ⎿  Updated src/domain/engine.ts (+12 -1)
      33  export type Engine = {
      34    readonly calc: Calc
      35    readonly memory: Memory
      36 -  // Append-only: lines are added, never changed or removed, by
         - the engine (Decision 11).                                     
      36 +  // Append-only: lines are added, never changed. The one excep
         +tion is emptyTape, which                                       
      37 +  // removes them all (Decision 11).                           
      38    readonly tape: readonly TapeLine[]
      39  }
      40  
     ...
      54    | { readonly type: 'memoryMinus' }
      55    | { readonly type: 'memoryRecall' }
      56    | { readonly type: 'memoryClear' }
      57 +  | { readonly type: 'emptyTape' }                             
      58  
      59  export type StepOutput = { readonly state: Engine; readonly not
          ice?: NoticeCode }
      60  
     ...
      268    return state.memory ? { state: { ...state, memory: null } } 
           : unchanged(state)
      269  }
      270  
      271 +// Empties the tape and nothing else: memory stays, and so doe
          +s an error (Decision 11, AC-14.7).                            
      272 +// The first press that only relabels the button belongs to th
          +e app, not here.                                              
      273 +function emptyTape(state: Engine): StepOutput {               
      274 +  return state.tape.length === 0 ? unchanged(state) : { state:
          + { ...state, tape: [] } }                                     
      275 +}                                                             
      276 +                                                              
      277  export function step(state: Engine, event: Event): StepOutput 
           {
      278    switch (event.type) {
      279      case 'digit':
     ...
      304        return memoryRecall(state)
      305      case 'memoryClear':
      306        return memoryClear(state)
      307 +    case 'emptyTape':                                         
      308 +      return emptyTape(state)                                 
      309    }
      310  }
      311  
     ...
      348      expression: expression(state.calc),
      349      memory: state.memory ? `M ${show(state.memory)}` : null,
      350      error: state.calc.kind === 'error',
      351 +    pendingOperator: state.calc.kind === 'pending' ? state.cal
          +c.pending.op : null,                                          
     … 2 more lines (ctrl+o to expand)
  ⎿  Updated src/shared/view.ts (+5 -0)
      1 +import type { Operator } from './keys'                          
      2 +                                                                
      3  // What the readout shows, as display strings only. The UI never
          sees a value or an error object.
      4  export type Readout = {
      5    // The figure, running result or result, with "≈ " in front wh
         en it has one, or the error text.
     ...
       8    // "M 95" while memory holds a value, otherwise null.
       9    readonly memory: string | null
      10    readonly error: boolean
      11 +  // The operator just pressed while it waits for a figure, so 
         +the display can be heard as                                    
      12 +  // "12 plus" rather than a bare "12" (Decision 14). Null at e
         +very other moment.                                             
      13 +  readonly pendingOperator: Operator | null                    
      14  }

⏺ shared/view.ts now imports from shared/keys.ts, but layer rule 6 says shared
  imports nothing at all. I'll inline the operator union instead.

⏺ Bash(python3 - <<'EOF'
      p="src/shared/view.ts"; s=open(p).read()…)
  ⎿  Updated src/shared/view.ts (+2 -3)
      1 -import type { Operator } from './keys'                          
      2 -                                                                
      1  // What the readout shows, as display strings only. The UI never
          sees a value or an error object.
      2  export type Readout = {
      3    // The figure, running result or result, with "≈ " in front wh
         en it has one, or the error text.
     ...
       8    readonly error: boolean
       9    // The operator just pressed while it waits for a figure, so 
          the display can be heard as
      10    // "12 plus" rather than a bare "12" (Decision 14). Null at e
          very other moment.
      13 -  readonly pendingOperator: Operator | null                    
      11 +  // Spelled out rather than imported, because shared/ imports 
         +nothing (layer rule 6).                                        
      12 +  readonly pendingOperator: '+' | '−' | '×' | '÷' | null       
      13  }
  ⎿  (timeout 3m)

⏺ Pushed commit 5d69040 with the emptyTape engine addition, and all 498 domain
  tests pass. Now moving to the app layer—I'll design useCalculator,
  useKeyboard, usePaste, and useEmptyTapeConfirm hooks, starting with the shared
  types.

⏺ Bash(cat >> src/shared/keys.ts <<'EOF'…)
  ⎿  Updated src/shared/keys.ts (+10 -0)
       4  export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '
          7' | '8' | '9'
       5  
       6  export type MemoryKey = 'M+' | 'M−'
       7 +                                                               
       8 +// The 24 on-screen keys, by the label each shows (Decision 15)
         +. The UI reports these; the app                                
       9 +// turns them into engine events, so the UI never needs to know
         + the engine.                                                   
      10 +export type KeyId =                                            
      11 +  | 'MC' | 'MR' | 'M−' | 'M+'                                  
      12 +  | 'C' | 'CE' | '⌫' | '÷'                                     
      13 +  | '7' | '8' | '9' | '×'                                      
      14 +  | '4' | '5' | '6' | '−'                                      
      15 +  | '1' | '2' | '3' | '+'                                      
      16 +  | '+/−' | '0' | '.' | '='                                    
  ⎿  Updated src/shared/view.ts (+24 -0)
      11    // Spelled out rather than imported, because shared/ imports 
          nothing (layer rule 6).
      12    readonly pendingOperator: '+' | '−' | '×' | '÷' | null
      13  }
      14 +                                                               
      15 +// Text as it is shown, and as a screen reader should say it (D
         +ecision 15a spoken forms).                                     
      16 +// The UI shows `text` with ≈ drawn as its chip and gives `spok
         +en` to assistive technology.                                   
      17 +export type Spoken = { readonly text: string; readonly spoken: 
         +string }                                                       
      18 +                                                               
      19 +export type TapeLineView = {                                   
      20 +  readonly kind: 'calculation' | 'memory'                      
      21 +  readonly working: string                                     
      22 +  readonly result: string                                      
      23 +  readonly approx: boolean                                     
      24 +  readonly spoken: string                                      
      25 +}                                                              
      26 +                                                               
      27 +// Everything the screen needs, as strings. No value, Decimal o
         +r Error object reaches the UI.                                 
      28 +export type ViewModel = {                                      
      29 +  readonly display: Spoken                                     
      30 +  readonly expression: Spoken                                  
      31 +  readonly message: Spoken | null                              
      32 +  readonly memory: Spoken | null                               
      33 +  // An error or the fault: the display uses the error colour a
         +nd its long size.                                              
      34 +  readonly error: boolean                                      
      35 +  readonly fault: boolean                                      
      36 +  readonly tape: readonly TapeLineView[]                       
      37 +}                                                              

⏺ Now the app tests, written before the hooks: the full Decision 13 key map, the
  tape keys, the fault and message behaviour, the spoken forms, and the
  two-press empty.

⏺ Write(src/app/useKeyboard.test.ts)
  ⎿  Wrote 101 lines to src/app/useKeyboard.test.ts
       1 import { describe, expect, it } from 'vitest'
       2 import { keyToEvent, tapeKey } from './useKeyboard'
       3
         taKey?: boolean; altKey?: boolean; shiftKey?: boolean }
       5 const press = (p: Press) =>
       6   keyToEvent({ code: '', ctrlKey: false, metaKey: false, altKey:
          false, shiftKey: false, ...p })
       8 describe('Decision 13: the keyboard map', () => {
       9   it.each([
      10     ['0', 'Digit0'],
     … +107 lines (ctrl+o to expand)

⏺ Write(src/app/useCalculator.test.ts)
  ⎿  Wrote 139 lines to src/app/useCalculator.test.ts
       1 import { describe, expect, it } from 'vitest'
       2 import type { Event } from '../domain/engine'
       3 import { step } from '../domain/engine'
       5 import { FAULT_TEXT } from '../shared/messages'
       6 import { INITIAL_MODEL, keyEvent, next, speak, toView, type Mode
         l } from './useCalculator'
       7
         {
       9   return keys.reduce((m, k) => next(m, keyEvent(k)), from)
      10 }
     … +151 lines (ctrl+o to expand)

⏺ Write(src/app/useEmptyTapeConfirm.test.ts)
  ⎿  Wrote 62 lines to src/app/useEmptyTapeConfirm.test.ts
      1 import { act, renderHook } from '@testing-library/react'
      2 import { describe, expect, it, vi } from 'vitest'
      3 import { useEmptyTapeConfirm } from './useEmptyTapeConfirm'
      4
      5 function setup(lines = 3) {
      6   const emptyTape = vi.fn()
      7   const hook = renderHook(({ n }) => useEmptyTapeConfirm(n, empty
        Tape), { initialProps: { n: lines } })
      8   return { emptyTape, hook }
      9 }
     … +59 lines (ctrl+o to expand)

⏺ One mistake in those tests: after 9 5 M+, typing 1 appends to the figure,
  because M+ leaves the calculation as it was, giving 951. I'll insert C after
  M+.

⏺ Bash(sed -i '' "s/\['9', '5', 'M+', '1', '+', '1', '='\]/['9', '5', 'M+', 'C',
      '1', '+', '1', '=']/g" src/app/useCalculator.test.ts && grep -c "'M+',
      'C', '1'" src/a…)
  ⎿  Updated src/app/useCalculator.test.ts (+3 -3)
      48    })
      49  
      50    it('AC-9.9: a throw from the engine becomes the fault, worded
           as Decision 8 says', () => {
      51 -    const before = run(['9', '5', 'M+', '1', '+', '1', '='])   
      51 +    const before = run(['9', '5', 'M+', 'C', '1', '+', '1', '='
         +])                                                             
      52      const fault = next(before, { type: 'digit', digit: '7' }, t
          hrowing)
      53      const view = toView(fault)
      54      expect(fault.fault).toBe(true)
     ...
      73      { type: 'memoryClear' },
      74      { type: 'emptyTape' },
      75    ])('AC-9.11, AC-19.8: in the fault, %o does nothing', (event)
           => {
      76 -    const fault = next(run(['9', '5', 'M+', '1', '+', '1', '=']
         -), { type: 'equals' }, throwing)                               
      76 +    const fault = next(run(['9', '5', 'M+', 'C', '1', '+', '1',
         + '=']), { type: 'equals' }, throwing)                          
      77      expect(next(fault, event)).toBe(fault)
      78    })
      79  
      80    it('AC-9.10: C or Escape leaves the fault at 0, keeping the t
          ape and memory', () => {
      81 -    const fault = next(run(['9', '5', 'M+', '1', '+', '1', '=']
         -), { type: 'equals' }, throwing)                               
      81 +    const fault = next(run(['9', '5', 'M+', 'C', '1', '+', '1',
         + '=']), { type: 'equals' }, throwing)                          
      82      const after = next(fault, { type: 'clear' })
      83      const view = toView(after)
      84      expect(after.fault).toBe(false)

⏺ Now the four hooks.

⏺ Write(src/app/useCalculator.ts)
  ⎿  Wrote 148 lines to src/app/useCalculator.ts
       1 import { useCallback, useMemo, useState } from 'react'
       2 import { initial, readout, step, type Engine, type Event } from
       3 import { lineText } from '../domain/tape'
       4 import type { KeyId } from '../shared/keys'
       5 import { FAULT_TEXT, NOTICE_TEXT, type NoticeCode } from '../sha
       6 import type { Spoken, ViewModel } from '../shared/view'
       7
       8 export type Model = {
      10   // A refusal message, shown until the next input (Decision 12)
         .
     … +169 lines (ctrl+o to expand)

⏺ Write(src/app/useKeyboard.ts)
  ⎿  Wrote 90 lines to src/app/useKeyboard.ts
       1 import { useEffect } from 'react'
       2 import type { Event } from '../domain/engine'
       3 import type { Digit } from '../shared/keys'
       5 // The only file that knows key names (Decision 13). It turns a
         key into an engine event and
       6 // nothing else; everything after that is the engine's business.
       7
         'metaKey' | 'altKey' | 'shiftKey'>
       9
      10 const OPERATORS: Readonly<Record<string, Event>> = {
     … +96 lines (ctrl+o to expand)

⏺ Write(src/app/usePaste.ts)
  ⎿  Wrote 15 lines to src/app/usePaste.ts
       1 import { useEffect } from 'react'
       3
       4 // Paste comes only from the browser's own paste command; there
         is no paste button (Decision 9).
         e window.
       6 export function usePaste(dispatch: (event: Event) => void): void
       7   useEffect(() => {
       8     function onPaste(e: ClipboardEvent) {
       9       e.preventDefault()
         text/plain') ?? '' })
     … +8 lines (ctrl+o to expand)

⏺ Write(src/app/useEmptyTapeConfirm.ts)
  ⎿  Wrote 35 lines to src/app/useEmptyTapeConfirm.ts
       1 import { useCallback, useEffect, useRef, useState } from 'react'
       2
         ith no dialog (Decision 11).
       4 // The first only relabels the control. It reverts when focus le
         aves or any other key is pressed,
       6 export function useEmptyTapeConfirm(lines: number, emptyTape: ()
          => void) {
       7   const [armed, setArmed] = useState(false)
       9
      10   const reset = useCallback(() => setArmed(false), [])
     … +30 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ All 106 app tests pass and the typecheck is clean. Committing the app layer on
  its own before the UI:

⏺ Bash(git rm -q src/app/.gitkeep && git add src/app src/shared && git commit -q
      -F - <<'EOF'
      Wire the engine to the browser in the app layer…)
  ⎿  Deleted src/app/.gitkeep (+0 -0)

⏺ Pushed: d24e4f2. Now the UI. I'll generate tokens.css from the same token
  source the mockup was built from, and add a test that fails if tokens.css and
  mockup.html ever disagree.

⏺ Bash(cd /private/tmp/claude-501/-Users-chaudry-code-hassa-chaudry-calculator/8
      addebae-dd19-48e8-9f54-c93fb821e2e5/scratchpad/ux && python3 - <<'EOF'
      from tokens2 imp…)
  ⎿  Created src/ui/tokens.css (+157 -0)
        1 +/*                                                            
        2 +  Design tokens. These are the values in docs/ux/mockup.html, 
          +with the same names, and a test                               
        3 +  (tokens.test.ts) fails if the two ever disagree. Light is th
          +e default; dark follows the device                            
        4 +  setting through prefers-color-scheme. There is no theme menu
          + (Decision 15).                                               
        5 +*/                                                            
        6 +:root {                                                       
        7 +  --font-family-ui: system-ui, -apple-system, "Segoe UI", Robo
          +to, sans-serif;                                               
        8 +  --font-size-display: 2.5rem;                                
        9 +  --font-size-display-medium: 2rem;                           
       10 +  --font-size-display-long: 1.625rem;                         
       11 +  --font-size-key: 1.5rem;                                    
       12 +  --font-size-expression: 1rem;                               
       13 +  --font-size-tape: 1rem;                                     
       14 +  --font-size-message: 1rem;                                  
       15 +  --font-size-label: 0.875rem;                                
       16 +  --font-size-legend: 0.875rem;                               
       17 +  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem; -
          +-space-4: 1rem;                                               
       18 +  --space-5: 1.5rem; --space-6: 2rem; --space-7: 3rem;        
       19 +  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px;      
       20 +  --size-key-gap: 0.75rem;                                    
       21 +  --size-key-min: 2.75rem;                                    
       22 +  --size-key-height: 5rem;                                    
       23 +  --size-key-height-no-legend: 3.5rem;                        
       24 +  --size-rail-min: 30rem;                                     
       25 +  --size-narrow-max: 40rem;                                   
       26 +  --size-gutter: 1rem;                                        
       27 +  --focus-ring-width: 3px;                                    
       28 +  --focus-ring-offset: 2px;                                   
       29 +  --shadow-pressed: inset 0 2px 4px rgba(0, 0, 0, 0.25);      
       30 +  --key-operator-glyph-scale: 1.35;                           
       31 +  --approx-scale: 1.15;                                       
       32 +  --color-bg: #F6F7F9;                                        
       33 +  --color-surface: #FFFFFF;                                   
       34 +  --color-text: #16191D;                                      
       35 +  --color-text-muted: #545B64;                                
       36 +  --color-rule: #DDE1E6;                                      
       37 +  --color-key-bg: #EEF1F4;                                    
       38 +  --color-key-text: #16191D;                                  
       39 +  --color-key-hover-bg: #DCE2E9;                              
       40 +  --color-key-hover-text: #000000;                            
     … 117 more lines (ctrl+o to expand)

⏺ tokens.css now matches the mockup's exact values. Next I'll build out the
  components—App (with error boundary), Display, Keypad, Tape, TapeToggle, and
  Announcer—each with its own CSS module.

⏺ Write(src/ui/Announcer.tsx)
  ⎿  Wrote 33 lines to src/ui/Announcer.tsx
       1 import { Fragment } from 'react'
       2 import type { Spoken } from '../shared/view'
       3 import styles from './Announcer.module.css'
       4
       5 // Draws each ≈ as its outlined chip so it can never be read as
       6 // are unchanged; only how ≈ is drawn differs.
       7 export function Marked({ text }: { text: string }) {
       8   const parts = text.split('≈')
       9   return (
      10     <>
     … +27 lines (ctrl+o to expand)

⏺ Write(src/ui/Announcer.module.css)  ⎿  Wrote 14 lines to src/ui/Announcer.module.css
       1 /* The ≈ chip: bold, larger than the text around it and outlined
         , at every size it appears.
       2    Shape and weight tell it from =, not colour alone (Decision 1
       3 .approx {
       4   display: inline-block;
       5   font-size: calc(var(--approx-scale) * 1em);
       6   font-weight: 700;
       8   padding: 0.04em 0.16em 0.1em;
       9   margin: 0 0.04em;
      10   border: max(1px, 0.06em) solid var(--color-approx-border);
     … +6 lines (ctrl+o to expand)

⏺ Write(src/ui/Display.tsx)
  ⎿  Wrote 48 lines to src/ui/Display.tsx
       1 import type { ViewModel } from '../shared/view'
       2 import { SpokenText } from './Announcer'
       3 import styles from './Display.module.css'
       5 // The display steps down by length but never below the long siz
         e, which is still larger than
       6 // the key labels; past that it wraps (Decision 15a).
       7 function sizeClass(view: ViewModel): string | undefined {
       9   const n = view.display.text.length
      10   return n <= 12 ? styles.short : n <= 18 ? styles.medium : styl
         es.long
     … +45 lines (ctrl+o to expand)

⏺ Write(src/ui/Display.module.css)
  ⎿  Wrote 84 lines to src/ui/Display.module.css
       1 .readout {
       2   text-align: right;
       3   font-variant-numeric: tabular-nums;
       4 }
       5
       6 .topRow {
       7   display: flex;
       8   flex-wrap: wrap;
       9   justify-content: space-between;
      10   align-items: baseline;
     … +78 lines (ctrl+o to expand)

⏺ Write(src/ui/Keypad.tsx)
  ⎿  Wrote 78 lines to src/ui/Keypad.tsx
       1 import type { MouseEvent } from 'react'
       2 import type { KeyId } from '../shared/keys'
       3 import styles from './Keypad.module.css'
       5 type Kind = 'memory' | 'digit' | 'control' | 'operator' | 'equal
         s'
       6
       7 type KeyDef = {
       9   // Named with words, so a screen reader says "divide", not "sl
         ash" (Decision 15a).
      10   readonly name: string
     … +75 lines (ctrl+o to expand)

⏺ Write(src/ui/Keypad.module.css)
  ⎿  Wrote 228 lines to src/ui/Keypad.module.css
       1 .keypad {
       2   display: grid;
       3   grid-template-columns: repeat(4, minmax(var(--size-key-min), 1
         fr));
       4   gap: var(--size-key-gap);
       6 }
       7
       8 .key {
       9   position: relative;
      10   display: grid;
     … +230 lines (ctrl+o to expand)

⏺ Write(src/ui/Tape.tsx)
  ⎿  Wrote 122 lines to src/ui/Tape.tsx
       1 import { useEffect, useRef, useState, type KeyboardEvent, type R
         efObject } from 'react'
       2 import { tapeKey } from '../app/useKeyboard'
       3 import type { TapeLineView } from '../shared/view'
       4 import { Marked } from './Announcer'
       6
       7 type Confirm = {
       8   readonly armed: boolean
       9   readonly label: string
      10   readonly press: () => void
     … +125 lines (ctrl+o to expand)

⏺ Write(src/ui/Tape.module.css)
  ⎿  Wrote 140 lines to src/ui/Tape.module.css
      1 .tape {
      2   padding: var(--space-5);
      3   color: var(--color-text-muted);
      4 }
      5
      6 .empty {
      7   margin: 0;
      8   font-size: var(--font-size-tape);
      9 }
     … +134 lines (ctrl+o to expand)

⏺ Write(src/ui/TapeToggle.tsx)
  ⎿  Wrote 16 lines to src/ui/TapeToggle.tsx
       1 import styles from './TapeToggle.module.css'
       2
       3 // At 900px and below the tape sits behind this toggle, closed b
       4 export function TapeToggle({ open, onToggle }: { open: boolean;
         onToggle: () => void }) {
       5   return (
       6     <button
       8       className={styles.toggle}
       9       aria-expanded={open}
      10       {...(open ? { 'aria-controls': 'tape' } : {})}
     … +8 lines (ctrl+o to expand)

⏺ Write(src/ui/TapeToggle.module.css)
  ⎿  Wrote 18 lines to src/ui/TapeToggle.module.css
       1 .toggle {
       2   width: 100%;
       3   min-height: var(--size-key-min);
       4   margin-top: var(--space-3);
       5   padding: 0 var(--space-3);
       6   text-align: left;
       7   font: 500 var(--font-size-label) var(--font-family-ui);
       8   color: var(--color-text);
       9   background: var(--color-surface);
      10   border: 1px solid var(--color-key-border);
     … +8 lines (ctrl+o to expand)

⏺ Now App with the error boundary, plus index.html and main.tsx. I'm also
  guarding the view-model step: if formatting throws, the user sees the fault
  rather than a blank page.

⏺ Write(src/ui/App.tsx)
  ⎿  Wrote 118 lines to src/ui/App.tsx
       1 import { Component, StrictMode, useCallback, useEffect, useState
         , type ReactNode } from 'react'
       2 import { useCalculator } from '../app/useCalculator'
       3 import { useEmptyTapeConfirm } from '../app/useEmptyTapeConfirm'
       4 import { useKeyboard } from '../app/useKeyboard'
       6 import type { KeyId } from '../shared/keys'
       7 import type { ViewModel } from '../shared/view'
       8 import styles from './App.module.css'
       9 import { Display } from './Display'
      10 import { Keypad } from './Keypad'
     … +127 lines (ctrl+o to expand)

⏺ Write(src/ui/App.module.css)
  ⎿  Wrote 41 lines to src/ui/App.module.css
       1 /* Above 900px: the calculator on the left, never narrower than
         30rem, and the tape takes the
       2    rest (Decision 15, layout C flipped). */
       3 .layout {
       4   display: grid;
       6   align-items: start;
       7   min-height: 100vh;
       8 }
       9
      10 .calc {
     … +36 lines (ctrl+o to expand)

⏺ Write(index.html)
  ⎿  Wrote 13 lines to index.html
       1 <!doctype html>
       2 <html lang="en-GB">
       3   <head>
       4     <meta charset="utf-8" />
       5     <meta name="viewport" content="width=device-width, initial-s
       6     <meta name="color-scheme" content="light dark" />
       7     <title>Calculator</title>
       8   </head>
       9   <body>
      10     <div id="root"></div>
     … +4 lines (ctrl+o to expand)

⏺ Write(src/main.tsx)
  ⎿  Wrote 5 lines to src/main.tsx
      1 import { createRoot } from 'react-dom/client'
      2 import { Root } from './ui/App'
      3
      4 const container = document.getElementById('root')
      5 if (container) createRoot(container).render(<Root />)

⏺ Adding the safe view to useCalculator, then a typecheck:

⏺ Bash(python3 - <<'EOF'
      p="src/app/useCalculator.ts"; s=open(p).read()…)
  ⎿  Updated src/app/useCalculator.ts (+26 -1)
      131    }
      132  }
      133  
      134 +const BARE_FAULT: ViewModel = {                               
      135 +  display: { text: FAULT_TEXT, spoken: FAULT_TEXT },          
      136 +  expression: { text: '', spoken: '' },                       
      137 +  message: null,                                              
      138 +  memory: null,                                               
      139 +  error: true,                                                
      140 +  fault: true,                                                
      141 +  tape: [],                                                   
      142 +}                                                             
      143 +                                                              
      144 +// The view is built during render, above the error boundary, 
          +so a throw here would take the                                
      145 +// whole page down. Instead it becomes the fault; if even the 
          +tape and memory cannot be shown,                              
      146 +// the fault shows without them. Both are still held, and come
          + back once C or Escape works.                                 
      147 +export function safeView(m: Model): ViewModel {               
      148 +  try {                                                       
      149 +    return toView(m)                                          
      150 +  } catch {                                                   
      151 +    try {                                                     
      152 +      return toView({ ...m, fault: true })                    
      153 +    } catch {                                                 
      154 +      return BARE_FAULT                                       
      155 +    }                                                         
      156 +  }                                                           
      157 +}                                                             
      158 +                                                              
      159  export function useCalculator() {
      160    const [model, setModel] = useState<Model>(INITIAL_MODEL)
      161  
     ...
      168    // For a render failure caught by the error boundary in ui/A
           pp.
      169    const reportFault = useCallback(() => setModel((m) => ({ ...
           m, notice: null, fault: true })), [])
      170  
      146 -  const view = useMemo(() => toView(model), [model])          
      171 +  const view = useMemo(() => safeView(model), [model])        
      172    return { view, dispatch, press, recall, emptyTape, dismissMe
           ssage, reportFault }
      173  }

⏺ One gap: if building the view throws, the screen shows the fault but the model
  doesn't know it, so other keys would still act. I'll have the hook record the
  fault too.

⏺ Bash(python3 - <<'EOF'
      p="src/app/useCalculator.ts"; s=open(p).read()…)
  ⎿  Updated src/app/useCalculator.ts (+5 -1)
      1 -import { useCallback, useMemo, useState } from 'react'          
      1 +import { useCallback, useEffect, useMemo, useState } from 'react
        +'                                                               
      2  import { initial, readout, step, type Engine, type Event } from 
         '../domain/engine'
      3  import { lineText } from '../domain/tape'
      4  import type { KeyId } from '../shared/keys'
     ...
      169    const reportFault = useCallback(() => setModel((m) => ({ ...
           m, notice: null, fault: true })), [])
      170  
      171    const view = useMemo(() => safeView(model), [model])
      172 +  // If the view could only be drawn as the fault, the fault's
          + rules apply too: only C and Escape.                          
      173 +  useEffect(() => {                                           
      174 +    if (view.fault && !model.fault) reportFault()             
      175 +  }, [view.fault, model.fault, reportFault])                  
      176    return { view, dispatch, press, recall, emptyTape, dismissMe
           ssage, reportFault }
      177  }

  Ran 1 shell command (ctrl+o to expand)

⏺ Dev server's running at localhost:5173 and returning 200. I'll use the
  Puppeteer install already cached by mermaid-cli to visually test dark mode,
  hover/touch states, and various viewport sizes.

  Listed 1 directory, ran 1 shell command (ctrl+o to expand)

⏺ Measurements check out across all breakpoints: 320px keys at 63×55px with a
  stable keypad, no horizontal scroll at 200%/400% zoom with labels holding at
  24px, a centered 640px calculator at 900px, and 64px keys with scrolling on
  short windows. Now I'll pull up the screenshots.

  Read 2 files (ctrl+o to expand)

⏺ I spotted two layout bugs: line numbers overlapping their content and the = /
  ≈ columns touching, caused by a padding rule that resets right padding along
  with vertical spacing. I'll fix it by switching that rule to use padding-block
  only.

⏺ Bash(python3 - <<'EOF'
      p="src/ui/Tape.module.css"; s=open(p).read()…)
  ⎿  Updated src/ui/Tape.module.css (+1 -1)
      62  }
      63  
      64  .line > span:not(:global(.sr-only)) {
      65 -  padding: var(--space-1) 0;                                   
      65 +  padding-block: var(--space-1);                               
      66    border-bottom: 1px solid var(--color-rule);
      67  }
      68  
  ⎿  (timeout 3m)
  Ran 1 shell command (ctrl+o to expand)

⏺ Status: the desktop and dark layouts render, and I fixed the tape spacing. Now
  checking the tape crop and the 320px phone views.

  Read 2 files (ctrl+o to expand)

⏺ Everything matches the mockup except one flaw: tapping the toggle leaves
  Chrome's blue tap highlight visible. I'll disable the tap highlight site-wide
  and re-check the zoom views.

⏺ Bash(python3 - <<'EOF'
      p="src/ui/tokens.css"; s=open(p).read()…)
  ⎿  Updated src/ui/tokens.css (+2 -0)
      133  html {
      134    /* No double-tap zoom on a page made of buttons; pinch zoom 
           still works (Decision 15). */
      135    touch-action: manipulation;
      136 +  /* The pressed look is drawn by the styles; the browser's ow
          +n tap flash would linger. */                                  
      137 +  -webkit-tap-highlight-color: transparent;                   
      138  }
      139  
      140  body {

  Read 1 file (ctrl+o to expand)

⏺ I'll set legends to only display when the window is tall enough for 4.5rem
  keys (~744px), since shorter windows caused "Esc" and "/" to crowd their
  labels at 200%/400% zoom—shorter windows will just use the clean keypad with
  shrinking keys per Decision 15, consistent with the mockup's assumed
  720px-tall frame.

⏺ Bash(python3 - <<'EOF'
      p="src/ui/Keypad.module.css"; s=open(p).read()…)
  ⎿  Updated src/ui/Keypad.module.css (+6 -3)
      214    }
      215  }
      216  
      217 -/* Keyboard legends only with a mouse and hover; a phone gets 
          -a clean keypad (Decision 15). */                              
      218 -@media (hover: hover) and (pointer: fine) {                   
      217 +/* Keyboard legends only with a mouse and hover; a phone gets 
          +a clean keypad (Decision 15).                                 
      218 +   They also need a key at least 4.5rem tall to sit clear of t
          +he label, which the formula below                             
      219 +   gives from a 46.5rem window. On a shorter window, at 200% z
          +oom for example, the legends go and                           
      220 +   the keys shrink instead, rather than crowding the label. */
      221 +@media (hover: hover) and (pointer: fine) and (min-height: 46.
          +5rem) {                                                       
      222    .key {
      220 -    height: clamp(4rem, calc((100vh - 15rem) / 6 - var(--size-
          -key-gap)), var(--size-key-height));                           
      223 +    height: clamp(4.5rem, calc((100vh - 15rem) / 6 - var(--siz
          +e-key-gap)), var(--size-key-height));                         
      224      /* Every label sits the same step above centre, so rows st
           ay level with or without a legend. */
      225      padding-bottom: calc(var(--space-2) + var(--space-3));
      226    }
  ⎿  (timeout 3m)

⏺ Legends now only show when there's room—keys shrink to a 44px minimum without
  legends at 200% zoom on short windows, and expand to 80px with legends at full
  height, with no horizontal scrolling anywhere. Next, I'll run the UI tests
  using roles, labels, and story IDs.

⏺ Write(src/ui/App.test.tsx)
  ⎿  Wrote 449 lines to src/ui/App.test.tsx
       1 import { act, fireEvent, render, screen, within } from '@testing
         -library/react'
       3 import { afterEach, beforeEach, describe, expect, it, vi } from
         'vitest'
       4 import { App } from './App'
       6 function setWidth(narrow: boolean) {
       7   window.matchMedia = vi.fn().mockImplementation((media: string)
          => ({
       9     media,
      10     onchange: null,
     … +515 lines (ctrl+o to expand)

⏺ Write(src/ui/Fault.test.tsx)
  ⎿  Wrote 99 lines to src/ui/Fault.test.tsx
       1 import { act, fireEvent, render, screen, within } from '@testing
         -library/react'
       2 import userEvent from '@testing-library/user-event'
       4 import { FAULT_TEXT } from '../shared/messages'
       5 import { App, FaultBoundary } from './App'
       6
       7 // A bug the engine is not supposed to have: typing 9 throws.
       9   const real = await importOriginal<typeof import('../domain/eng
         ine')>()
      10   return {
     … +102 lines (ctrl+o to expand)

⏺ Write(src/ui/tokens.test.ts)
  ⎿  Wrote 33 lines to src/ui/tokens.test.ts
      1 import { readFileSync } from 'node:fs'
      2 import { join } from 'node:path'
      4
      5 // docs/ux/mockup.html is the visual source of truth. If the app
        and that file disagree, one of
        red.
      7 const root = join(__dirname, '..', '..')
      8 const mockup = readFileSync(join(root, 'docs/ux/mockup.html'), 'u
      9 const tokens = readFileSync(join(__dirname, 'tokens.css'), 'utf8'
        )
     … +31 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ Status: UI built and running; 650 of 656 tests pass. I'm working through the
  six failures now.

  Ran 1 shell command (ctrl+o to expand)

⏺ Found four test bugs, not app issues: ambiguous "+" query, duplicate "12 plus"
  text, missing Escape before a new figure, and a fault mock triggered by digit
  9. I'll fix each by targeting the hidden legend spans, asserting on the
  display, adding Escape, and swapping to 85.

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b,n=1):…)
  ⎿  Updated src/ui/App.test.tsx (+4 -4)
      71        ['multiply', '*'], ['minus', '-'], ['plus', '+'], ['equal
          s', 'Enter'],
      72      ]
      73      for (const [name, legend] of legends) {
      74 -      const el = within(key(name)).getByText(legend)           
      75 -      expect(el).toHaveAttribute('aria-hidden', 'true')        
      74 +      const hidden = [...key(name).querySelectorAll('[aria-hidd
         +en="true"]')].map((el) => el.textContent)                      
      75 +      expect(hidden).toEqual([legend])                         
      76      }
      77      expect(key('memory plus').querySelectorAll('[aria-hidden]')
          ).toHaveLength(0)
      78    })
     ...
      164      fireEvent.keyDown(window, { key: '1' })
      165      fireEvent.keyDown(window, { key: '2' })
      166      fireEvent.keyDown(window, { key: '+', code: 'Equal', shift
           Key: true })
      167 -    expect(screen.getByText('12 plus', { selector: '.sr-only' 
          -})).toBeInTheDocument()                                       
      167 +    expect(display()).toHaveTextContent('12 plus')            
      168    })
      169  
      170    it('AC-10.5: the Apple numpad Clear key clears', () => {
     ...
      426      await user.keyboard('5')
      427      await user.click(key('change sign'))
      428      expect(display()).toHaveTextContent('minus 5')
      429 -    await user.keyboard('999999999999999+1=')                 
      429 +    await user.keyboard('{Escape}999999999999999+1=')         
      430      expect(display()).toHaveTextContent('1 times 10 to the pow
           er 15')
      431    })
      432  })
  ⎿  Updated src/ui/Fault.test.tsx (+4 -4)
      30  async function intoFault() {
      31    const user = userEvent.setup()
      32    render(<App />)
      33 -  await user.keyboard('95')                                    
      33 +  await user.keyboard('85')                                    
      34    await user.click(key('memory plus'))
      35    await user.keyboard('{Escape}1+1=9')
      36    return user
     ...
      40    it('AC-9.9: shows the fault sentence from Decision 8, with an
           empty expression line', async () => {
      41      await intoFault()
      42      expect(display()).toHaveTextContent(FAULT_TEXT)
      43 -    expect(screen.getByText('memory 95')).toBeInTheDocument()  
      43 +    expect(screen.getByText('memory 85')).toBeInTheDocument()  
      44      expect(tapeLines()).toHaveLength(2)
      45    })
      46  
     ...
      49      await user.click(key('clear'))
      50      expect(display()).toHaveTextContent('0')
      51      expect(display()).not.toHaveTextContent(FAULT_TEXT)
      52 -    expect(screen.getByText('memory 95')).toBeInTheDocument()  
      52 +    expect(screen.getByText('memory 85')).toBeInTheDocument()  
      53      expect(tapeLines()).toHaveLength(2)
      54    })
      55  
     ...
      74      await user.click(key('Empty tape'))
      75      await user.click(key('Press again to empty'))
      76      expect(display()).toHaveTextContent(FAULT_TEXT)
      77 -    expect(screen.getByText('memory 95')).toBeInTheDocument()  
      77 +    expect(screen.getByText('memory 85')).toBeInTheDocument()  
      78      expect(tapeLines()).toHaveLength(2)
      79    })
      80  })
  ⎿  (timeout 5m)

⏺ All 656 tests pass, but I found a real bug: pressing Empty tape during a fault
  still relabels it, violating the rule that only C and Escape should work
  then. I'll disable that control's first press during a fault and tighten the
  test to catch it.

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b,n=1):…)
  ⎿  Updated src/app/useEmptyTapeConfirm.ts (+5 -4)
       3  // Emptying the tape cannot be undone, so it takes two presses 
          with no dialog (Decision 11).
       4  // The first only relabels the control. It reverts when focus l
          eaves or any other key is pressed,
       5  // and never on a timer, so nobody is rushed.
       6 -export function useEmptyTapeConfirm(lines: number, emptyTape: (
         -) => void) {                                                   
       6 +// During the fault every input but C and Escape does nothing, 
         +so `disabled` stops even the first press.                      
       7 +export function useEmptyTapeConfirm(lines: number, emptyTape: (
         +) => void, disabled = false) {                                 
       8    const [armed, setArmed] = useState(false)
       9    const buttonRef = useRef<HTMLButtonElement>(null)
      10  
      11    const reset = useCallback(() => setArmed(false), [])
      12  
      13    const press = useCallback(() => {
      13 -    if (lines === 0) return                                    
      14 +    if (lines === 0 || disabled) return                        
      15      if (!armed) {
      16        setArmed(true)
      17        return
      18      }
      19      setArmed(false)
      20      emptyTape()
      20 -  }, [armed, emptyTape, lines])                                
      21 +  }, [armed, disabled, emptyTape, lines])                      
      22  
      23    useEffect(() => {
      24      if (!armed) return
     ...
      30      return () => window.removeEventListener('keydown', onKeyDow
          n)
      31    }, [armed])
      32  
      32 -  if (armed && lines === 0) setArmed(false)                    
      33 +  if (armed && (lines === 0 || disabled)) setArmed(false)      
      34  
      35    return { armed, label: armed ? 'Press again to empty' : 'Empt
          y tape', press, reset, buttonRef }
      36  }
  ⎿  Updated src/ui/App.tsx (+1 -1)
      81  
      82  export function App() {
      83    const calc = useCalculator()
      84 -  const confirm = useEmptyTapeConfirm(calc.view.tape.length, ca
         -lc.emptyTape)                                                  
      84 +  const confirm = useEmptyTapeConfirm(calc.view.tape.length, ca
         +lc.emptyTape, calc.view.fault)                                 
      85    const narrow = useNarrow()
      86    useKeyboard(calc.dispatch, calc.dismissMessage)
      87    usePaste(calc.dispatch)
  ⎿  Updated src/ui/Fault.test.tsx (+2 -1)
      72      })
      73      await user.click(tapeLines()[0] as HTMLElement)
      74      await user.click(key('Empty tape'))
      75 -    await user.click(key('Press again to empty'))              
      75 +    expect(key('Empty tape')).toBeInTheDocument()              
      76 +    await user.click(key('Empty tape'))                        
      77      expect(display()).toHaveTextContent(FAULT_TEXT)
      78      expect(screen.getByText('memory 85')).toBeInTheDocument()
      79      expect(tapeLines()).toHaveLength(2)
  ⎿  (timeout 5m)

⏺ Disabled, and all 656 tests pass. A final look at the fresh desktop screen
  before committing:

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ It matches the mockup. Committing in two parts: the app-layer changes made
  while building the screen (the safe view and fault-proof empty-tape), then the
  UI.

⏺ Bash(git add src/app && git commit -q -F - <<'EOF'
      Keep the fault safe while the view is built…)
  ⎿  Deleted src/ui/.gitkeep (+0 -0)

⏺ Pushed: b890559 (app) and aec6b1f (UI). Before the start scripts, I'll confirm
  the production build also works:

  Ran 1 shell command (ctrl+o to expand)

⏺ The build works and dist/ stays ignored. Now the two start scripts. Vite's own
  --open flag opens the browser once the server is ready, and finds the right
  port if 5173 is taken.

⏺ Write(start.command)
  ⎿  Wrote 31 lines to start.command
       1 #!/bin/bash
       2 # Double-click to run the calculator on a Mac.
       3 # It checks for Node, installs this project's dependencies on th
       4 # and opens it in your browser. It signs in to nothing and sends
          nothing anywhere.
       5
       6 cd "$(dirname "$0")" || exit 1
       8 fail() {
       9   echo
      10   echo "$1"
     … +32 lines (ctrl+o to expand)

⏺ Write(start.bat)
  ⎿  Wrote 40 lines to start.bat
       1 @echo off
       2 rem Double-click to run the calculator on Windows.
       3 rem It checks for Node, installs this project's dependencies on
       4 rem app and opens it in your browser. It signs in to nothing and
          sends nothing anywhere.
       5
       6 cd /d "%~dp0"
       8 where node >nul 2>nul
       9 if errorlevel 1 (
      10   echo.
     … +39 lines (ctrl+o to expand)

⏺ Now testing what I can on this Mac: syntax, the missing-Node path, and the
  version check against a range of versions.

⏺ Bash(chmod +x start.command && bash -n start.command && echo syntax-ok && echo
      '--- no node:' && env -i PATH=/usr/bin:/bin HOME=$HOME /bin/bash
      start.command </dev/n…)  ⎿  1 file changed (binary, mode only or too large to show)

⏺ The missing-Node message and version range checks both work. Next I'll test
  the happy path, including a first run with no node_modules, using a fresh copy
  of the repo with BROWSER=none so no browser window opens.

  Ran 1 shell command (ctrl+o to expand)
  ⎿  Invalid tool parameters

  Ran 1 shell command (ctrl+o to expand)

⏺ Vite ended up on port 5174 since 5173 was in use, and that page loads fine.
  I'll stop the test server, fix start.bat's line endings for cmd, and commit
  the scripts separately.

⏺ Bash(pkill -f "scratchpad/fresh/node_modules/.bin/vite" ; pkill -f
      "scratchpad/fresh.*vite" ; cd /Users/chaudry/code/hassa-chaudry-calculator
      && printf '# cmd.exe ne…)
  ⎿  Created .gitattributes (+3 -0)
      1 +# cmd.exe needs CRLF line endings in batch files; the shell scri
        +pt needs LF.                                                    
      2 +*.bat text eol=crlf                                             
      3 +*.command text eol=lf                                           
  ⎿  Updated start.bat (+40 -40)
       1 -@echo off                                                      
       2 -rem Double-click to run the calculator on Windows.             
       3 -rem It checks for Node, installs this project's dependencies on
         - the first run, then starts the                                
       4 -rem app and opens it in your browser. It signs in to nothing an
         -d sends nothing anywhere.                                      
       5 -                                                               
       6 -cd /d "%~dp0"                                                  
       7 -                                                               
       8 -where node >nul 2>nul                                          
       9 -if errorlevel 1 (                                              
      10 -  echo.                                                        
      11 -  echo Node.js is not installed. Install Node 20.19 or later fr
         -om https://nodejs.org, then double-click start.bat again.      
      12 -  echo.                                                        
      13 -  pause                                                        
      14 -  exit /b 1                                                    
      15 -)                                                              
      16 -                                                               
      17 -rem The same range as "engines" in package.json: 20.19 or later
         - in 20, or 22.12 and up.                                       
      18 -node -e "const [a, b] = process.versions.node.split('.').map(Nu
         -mber); process.exit((a === 20 && b >= 19) || (a === 22 && b >= 
         -12) || a > 22 ? 0 : 1)"                                        
      19 -if errorlevel 1 (                                              
      20 -  echo.                                                        
      21 -  echo This needs Node 20.19 or later, or 22.12 or later. Insta
         -ll a newer one from https://nodejs.org, then try again.        
      22 -  node --version                                               
      23 -  echo.                                                        
      24 -  pause                                                        
      25 -  exit /b 1                                                    
      26 -)                                                              
      27 -                                                               
      28 -if not exist node_modules (                                    
      29 -  echo First run: installing dependencies. This takes a minute 
         -and only happens once.                                         
      30 -  call npm install                                             
      31 -  if errorlevel 1 (                                            
      32 -    echo.                                                      
      33 -    echo Installing dependencies failed. Check the messages abo
         -ve.                                                            
      34 -    pause                                                      
      35 -    exit /b 1                                                  
      36 -  )                                                            
      37 -)                                                              
      38 -                                                               
      39 -echo Starting the calculator. It opens in your browser; close t
         -his window to stop it.                                         
      40 -call npm run dev -- --open                                     
     … 40 more lines (ctrl+o to expand)

⏺ Pushed: cf00b03. The README still says "The calculator has not been built
  yet", which is no longer true, and the docs must be honest about what was
  built. A short correction:

  Read 1 file (ctrl+o to expand)

⏺ Bash(python3 - <<'EOF'
      p="README.md"; s=open(p).read()…)
  ⎿  Updated README.md (+8 -3)
      2  
      3  A four-function calculator you can trust with money. It is exact
          where possible, marks a number with ≈ where it is not, and keep
         s a tape that shows the working.
      4  
      5 -**Status:** project setup only. The calculator has not been buil
        -t yet.                                                          
      5 +**Status:** built and running, with automated tests passing. Eve
        +ry story in `docs/user-stories.md` is still marked Not implement
        +ed: the VoiceOver check has not been done yet, and a story is ma
        +rked Implemented only after it.                                 
      6  
      7  ## Tape and memory
      8  
     ...
      10  
      11  ## Run it
      12  
      13 -Requires Node 20.19 or later (`.nvmrc` pins 20).               
      13 +Requires Node 20.19 or later, or 22.12 or later (`.nvmrc` pins 
         +20).                                                           
      14 +                                                               
      15 +The quickest way is to double-click `start.command` on a Mac or
         + `start.bat` on Windows. Each checks for Node, installs depende
         +ncies on the first run, starts the app and opens it in your bro
         +wser.                                                          
      16 +                                                               
      17 +Or from a terminal:                                            
      18  
      19  ```sh
      20  npm install
      17 -npm test                                                       
      21 +npm run dev    # then open the address it prints, usually http:
         +//localhost:5173/                                              
      22 +npm test       # the automated tests                           
      23  ```
  ⎿  (timeout 3m)

⏺ All 656 tests pass and everything is pushed. One choice I made while building
  isn't in the Decisions yet: legends hide on windows too short for them.
  Recording it under the standing rule:

⏺ Bash(python3 - <<'EOF'
      p="CLAUDE.md"; s=open(p).read()…)
  ⎿  Updated CLAUDE.md (+1 -1)
      59  14. **Accessibility.** Every action works without a mouse. Disp
          lay changes (figure, running result with its operator, result, 
          error, message) are announced politely; the expression line is 
          not live. The M indicator is announced as "memory" and its tota
          l. Keys with no effect announce nothing. Tested with VoiceOver 
          on macOS Safari only; that check includes the tape being read a
          s a list.
      60  15. **Layout.** Direction C, "Ledger", flipped: calculator left
          , tape right; visual, Tab and screen-reader order calculator fi
          rst. Above 900px the calculator column is never narrower than 4
          80px (30rem) and the tape takes the rest; at 900px and below th
          e same calculator fills the width minus safe margins (at most 4
          0rem, centred), with the tape behind a "Show tape" / "Hide tape
          " toggle, closed by default, between readout and keypad. The ta
          pe is quiet: results in a right-hand column aligned on the poin
          t, ≈ in its own column, line numbers, characters unchanged. An 
          empty tape shows only "Finished calculations appear here". No u
          nits or currency mode. The UI never says "precision" or "floati
          ng point". Visual source of truth: `docs/ux/mockup.html` and it
          s tokens; if the app and that file disagree, one of them is a b
          ug.
      61     - **Keypad**, six rows of four, no empty cells, clear spacin
          g: `MC MR M− M+` / `C CE ⌫ ÷` / `7 8 9 ×` / `4 5 6 −` / `1 2 3 
          +` / `+/− 0 . =`. All keys the same size and shape. Memory row 
          in a quieter style: solid outline, no fill of its own, regular-
          weight label; never dashed, which reads as disabled. **Changed:
          ** the five operators down the right take the accent colour, = 
          strongest (previously = was the only accent key). The sign key 
          is labelled `+/−`, named "change sign", with a "Change sign" to
          oltip on hover.
      62 -   - **Keys.** Labels at least 24px (1.5rem), centred. Keyboard
         - legends sit in their own row at the bottom of the key, centred
         - under the label, at least 14px (0.875rem), muted, with clear s
         -pace from the label and a margin from the key edge, and show on
         -ly on devices with a mouse and hover. With legends showing, eve
         -ry label sits the same small step above centre, so rows stay le
         -vel. Every key at least 44px at 320px wide. On a short window k
         -eys get shorter, never narrower (not below 44px), and the page 
         -scrolls. Hover changes the label colour as well as the fill; pr
         -essed and focused each have their own look; focus is a ring, ne
         -ver colour alone. Every hover and pressed pairing passes WCAG A
         -A in both themes. The ÷ × − + = glyphs are scaled (`--key-opera
         -tor-glyph-scale`) to match the digits' ink height; their font s
         -ize stays 24px.                                                
      62 +   - **Keys.** Labels at least 24px (1.5rem), centred. Keyboard
         + legends sit in their own row at the bottom of the key, centred
         + under the label, at least 14px (0.875rem), muted, with clear s
         +pace from the label and a margin from the key edge, and show on
         +ly on devices with a mouse and hover, and only on a window tall
         + enough (46.5rem) for keys of 4.5rem; on a shorter one, such as
         + 200% zoom, they hide so the keys can shrink without crowding t
         +he label. With legends showing, every label sits the same small
         + step above centre, so rows stay level. Every key at least 44px
         + at 320px wide. On a short window keys get shorter, never narro
         +wer (not below 44px), and the page scrolls. Hover changes the l
         +abel colour as well as the fill; pressed and focused each have 
         +their own look; focus is a ring, never colour alone. Every hove
         +r and pressed pairing passes WCAG AA in both themes. The ÷ × − 
         ++ = glyphs are scaled (`--key-operator-glyph-scale`) to match t
         +he digits' ink height; their font size stays 24px.             
      63     - **≈ mark.** ≈ must never be mistaken for =. It is drawn bo
          ld, larger than the text around it, in an outlined chip, the sa
          me on the display, expression line, tape and M indicator at eve
          ry size. Shape and weight tell it apart, not colour alone; the 
          character is unchanged.
      64     - **Phones.** No separate build: the 900px-and-below layout.
           Keys do not double-tap zoom (`touch-action: manipulation`), an
          d hover styles apply only on hover devices so none sticks after
           a tap. Only 320px in a desktop browser has been checked; no pr
          omise is made for phone browsers or landscape.
      65     - **Themes.** Light and dark follow `prefers-color-scheme`. 
          No theme menu, no other theme.

⏺ The calculator is running at http://localhost:5173/. All 656 tests pass, the
  production build works, and everything is pushed. Every story is still Not
  implemented.

  Commits

  1. 70aed56 Allow the two rounding-check clones in the maths rule
  2. 24f6231 Close banker's rounding as an open question
  3. d096bfc Specify emptyTape and the numpad point with Num Lock off
  4. 5d69040 Add emptyTape to the engine (S-14). Tests came first. It also adds
     a field so the display can be read as "12 plus".
  5. d24e4f2 Wire the engine to the browser in the app layer
  6. b890559 Keep the fault safe while the view is built
  7. aec6b1f Build the calculator screen from the mockup
  8. cf00b03 Add double-click start scripts for Mac and Windows. A small
     .gitattributes came with them so start.bat keeps Windows line endings.
  9. 5f5de02 Say in the README how to run what is now built. It still said the
     calculator hadn't been built.
  10. 856a947 Record when keyboard legends hide on short windows

  Mockup and Decisions

  Nothing in the mockup contradicts a Decision. A test now fails if tokens.css
  and mockup.html disagree on any colour or size.

  One choice under the standing rule, now in Decision 15: at 200% zoom on a
  normal screen the window is short, so keys shrink to 44px. With legends
  showing, "Esc" and "/" crowded their labels, which is what you rejected on the
  mockup. Legends now show only when the window is about 744px tall or more;
  below that they hide and the keys shrink. Overrule it if you'd rather keep
  legends and let the page scroll.

  A gap the tests caught: during a fault, Empty tape still relabelled on its
  first press. It now does nothing, like every other input except C and Escape.

  What I checked by measuring the running app

  I drove it in headless Chrome (Puppeteer from the npx cache):

  - Above 900px: the calculator column is 480px.
  - At 900px: the calculator is 640px wide and centred.
  - At 320px with touch: keys are 63 × 55 px with no legends. The keypad doesn't
    move for an error or a two-line message.
  - 200% and 400% zoom: no sideways scroll, and labels stay 24px.
  - Short window: keys shrink to 44px.
  - Legends and ≈: legends are centred, and the ≈ chip shows on the display,
    expression line, tape and M indicator, in light and dark.
  - Start scripts: start.command passed a first-run test in a fresh clone
    (installed dependencies, served the page) and shows the right message when
    Node is missing.

  What I have not tested myself

  - VoiceOver, and any screen reader at all. The tests check roles, names, live
    regions and the spoken text, not what is actually heard.
  - Real phones and Safari. All the visual checks ran in headless Chrome.
  - Real browser zoom and a real touch screen. I emulated zoom with smaller
    viewports and touch through Chrome's emulation. Whether hover styles stick
    after a real tap, and whether double-tap zoom is really off, are unchecked.
  - Real keyboards. These were never pressed for real:
    - the numpad
    - the Apple numpad Clear and = keys
    - Num Lock off
    - a layout whose numpad point reports a comma

    The tests send the key values a browser should report, which may differ from
    what one actually sends.
  - Paste from a real clipboard, and whether Safari delivers a paste to a page
    with no text field. That is still an open question in the brief.
  - Focus rings, hover colours and pressed looks. I didn't screenshot the
    interactive states one by one. The contrast of those colours was checked on
    the mockup.
  - A render error inside the running app. The boundary is tested on its own;
    the engine-throw fault is tested through the whole app.
  - start.bat, which I couldn't run on this Mac. start.command opening the
    browser: I suppressed that with BROWSER=none, so only the server start was
    confirmed.

  The dev server runs from this session and stops when it ends. npm run dev or
  start.command brings it back.

❯ I have used the running app. The sums, the tape, memory, paste, the errors,
  the keyboard and the layout match the decisions. Do not change that
  behaviour. If a check below says the code and a decision disagree, stop and
  show me the disagreement before you change either one.

  Two kinds of guardrail. One for the code, one for the written context.

  Fitness functions, in their own test file, run with the suite.

  1. Layer boundaries. Walk the import graph. Anything in src/domain importing
  react, ui, app, or touching window or document fails. app importing ui fails.
  ui importing domain fails. Only decimal.ts may import decimal.js. Name the
  offending file and import.

  2. No native arithmetic on user-facing values. Nothing in src/domain outside
  decimal.ts may use parseFloat, Number, or arithmetic operators on anything
  that reaches a result. Use the TypeScript AST, not a regex. Allow a
  documented escape-hatch comment and make the test list every place it is
  used.

  3. Story traceability. Parse docs/user-stories.md. Fail if any story marked
  Implemented has no test whose name cites that story ID. Fail if a test cites
  a story ID that does not exist. Every story is still Not implemented, on
  purpose, so say plainly if the Implemented half is green only because that
  set is empty. Do not flip any story.

  4. Error surface. Every error code has a message, none empty, none containing
  a stack trace, a type name, or the word undefined.

  5. Bundle budget. Gzipped JS under 150kb. Print the actual number when it
  fails.

  Run them. For each failure, tell me whether to fix the code or change the
  rule. Leave a rule that is suppressed everywhere. I would rather delete it.

  Then CI, because architecture.md claims these run in CI. GitHub Actions on
  push and pull request. Node 20, npm ci, the full suite including the fitness
  functions, then the build. No deploy, no secrets, no keys. One screen long.
  Add the badge to the README.

  Then promptfoo, in an evals folder at the root. What is under test is the
  written context, the product-spec skill and the rules in CLAUDE.md. The
  calculator has no model in it, and you are not adding one.

  Not part of npm test, and not in CI. A reviewer runs the app with Node only.

  Run the evals through the Claude Code login already in this terminal. A small
  wrapper calls claude -p. Promptfoo uses that wrapper as the provider, and
  the same wrapper as the grader for the rubric assertions. No API key, nothing
  written into a file, nothing echoed. Try one case before the full run. If
  the grader cannot work that way, stop and tell me. Do not add a key.

  These runs are not the project transcript. Do not copy them into
  transcripts/.

  Three suites, kept small.

  A. Job statement quality. Input is a plain situation. Output is a job written
  from the skill alone. Assert the When / I want to / so I can shape. Assert
  in JavaScript that it contains none of button, screen, click, tap, keypad,
  field, display, app, press. Then a rubric asking whether the need would exist
  if no software existed. Six or seven cases, two of them awkward ones where
  the obvious phrasing smuggles a feature in.

  B. Criteria coverage. Input is a story. Output is criteria from the skill.
  Assert Given, When, Then. Assert at least one invalid-input case and one
  boundary case. Then a rubric asking whether a tester could run each one
  without a judgement call.

  C. Specification ambiguity. Give the model only the engine rules from
  CLAUDE.md and architecture.md, then ask what should happen for: an operator
  pressed twice, equals three times, an operator during an error, a digit
  during an error, a decimal point twice, backspace on the last digit, paste
  while an operator is pending, MR during an error with memory held, and MR
  with memory empty. Assert the answers match the documents.

  Suite C tests my writing. When one fails, fix the document first, and tell me
  which it was. Do not loosen the assertion, and do not change the calculator.

  evals/README.md: what is under test, how to run it, that it needs Claude Code
  signed in and no API key, which model produced the saved results, the pass
  threshold and why, and that a run uses some of that person's plan. Commit the
  raw results and a readable summary, so someone with no Claude login can
  still read what happened.

  Add a decision record for running the evals this way. Name the three rejected
  options: an API key, a free local model, and checking the documents with no
  model at all. Say the two costs: the model checking the documents is the same
  family as the model that wrote them, and a later run can differ, which is
  why the saved results name the model and the threshold.

  Add a short evals section to architecture.md next to the fitness functions,
  with a line on why the two exist for different reasons.

  Then show me which suite C cases failed, and what was ambiguous in the
  documents.

⏺ Before writing these, I'll check the claude CLI's flags, since the eval
  wrapper depends on them, and look for a user-level CLAUDE.md that would leak
  into the eval prompts.

  Ran 2 shell commands (ctrl+o to expand)

⏺ The wrapper avoids CLAUDE.md and memory by running claude -p from an empty
  temp folder with no tools and a strict MCP config, leaving just the prompt and
  a minimal system prompt. Now I'll write the fitness function test file and
  see what it reveals.

⏺ Write(src/fitness.test.ts)
  ⎿  Wrote 322 lines to src/fitness.test.ts
       1 import { execFileSync } from 'node:child_process'
       2 import { mkdtempSync, readdirSync, readFileSync, rmSync, statSyn
       3 import { tmpdir } from 'node:os'
       4 import { dirname, join, relative, resolve } from 'node:path'
       5 import { gzipSync } from 'node:zlib'
       7 import { describe, expect, it } from 'vitest'
       8 import { ERROR_TEXT, FAULT_TEXT, NOTICE_TEXT } from './shared/me
         ssages'
      10 // Fitness functions: checks on the code's shape that run with t
         he suite and in CI, so
     … +396 lines (ctrl+o to expand)

⏺ I've guessed the escape-hatch list in advance; the first run will show whether
  the domain code agrees.

  Ran 3 shell commands (ctrl+o to expand)

⏺ Both issues point to code fixes, not rule changes: I'll add escape-hatch
  comments explaining the nine native arithmetic uses (all safe string/count
  operations), and correct four test names that mistakenly cite non-existent
  criterion IDs instead of the story.

  Ran 1 shell command (ctrl+o to expand)

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b):…)
  ⎿  Updated src/app/useCalculator.test.ts (+1 -1)
      116      ['2 + 3 = 5 → × 4 = 20', '2 plus 3 equals 5 then times 4 e
           quals 20'],
      117      ['M+ 40, memory 95', 'memory plus 40, memory 95'],
      118      ['M− 20, memory 75', 'memory minus 20, memory 75'],
      119 -  ])('AC-15: %j is read %j', (text, spoken) => {              
      119 +  ])('S-15: %j is read %j', (text, spoken) => {               
      120      expect(speak(text)).toBe(spoken)
      121    })
      122  
  ⎿  Updated src/domain/entry.ts (+1 -0)
       8  // Every digit counts toward the 15, except a single 0 before t
          he point (Decision 5, AC-1.6).
       9  export function countedDigits(text: string): number {
      10    const digits = text.replace(/[^0-9]/g, '').length
      11 +  // fitness: not a value — the 0 before the point is not count
         +ed (a digit count)                                             
      12    return text.startsWith('0.') ? digits - 1 : digits
      13  }
      14  
  ⎿  Updated src/domain/format.test.ts (+3 -3)
      45      ['1e90', '1 × 10⁹⁰'],
      46      ['1e-99', '1 × 10⁻⁹⁹'],
      47      ['1e-30', '1 × 10⁻³⁰'],
      48 -  ])('AC-6: plain below 1e15 and from 1e-9, exponential outside
         -: %s → %s', (a, out) => {                                      
      48 +  ])('S-6: plain below 1e15 and from 1e-9, exponential outside:
         + %s → %s', (a, out) => {                                       
      49      expect(shown(a)).toBe(out)
      50    })
      51  
     ...
      66      ['0.6666666666666666666666666666666667', '≈ 0.6666666666666
          67'],
      67      ['999999999999998000000000000001', '≈ 9.99999999999998 × 10
          ²⁹'],
      68      ['3.333333333333333333333333333333333e-10', '≈ 3.3333333333
          3333 × 10⁻¹⁰'],
      69 -  ])('AC-5: ≈ when the display cuts digits, worked out from the
         - full value: %s → %s', (a, out) => {                           
      69 +  ])('S-5: ≈ when the display cuts digits, worked out from the 
         +full value: %s → %s', (a, out) => {                            
      70      expect(shown(a)).toBe(out)
      71    })
      72  
     ...
      102      [{ negative: true, text: '12' }, '−12'],
      103      [{ negative: false, text: '0.000000000000001' }, '0.000000
           000000001'],
      104      [{ negative: false, text: '999999999999999' }, '9999999999
           99999'],
      105 -  ])('AC-1: %o → %s, no commas, point and trailing zeros kept'
          -, (entry, out) => {                                           
      105 +  ])('S-1: %o → %s, no commas, point and trailing zeros kept',
          + (entry, out) => {                                            
      106      expect(formatEntry(entry)).toBe(out)
      107    })
      108  })
  ⎿  Updated src/domain/format.ts (+2 -0)
      17  function grouped(digits: string): string {
      18    const [whole = '', fraction] = digits.split('.')
      19    let out = ''
      20 +  // fitness: not a value — position in the whole-number part, 
         +for commas                                                     
      21    for (let i = 0; i < whole.length; i++) {
      22 +    // fitness: not a value — digits left of this position, for
         + commas                                                        
      23      if (i > 0 && (whole.length - i) % 3 === 0) out += ','
      24      out += whole[i]
      25    }
  ⎿  Updated src/domain/paste.ts (+3 -0)
      16  // follow, then the point, another comma or the end. Anything e
          lse might be a decimal comma.
      17  function commasAreThousands(body: string): boolean {
      18    const point = body.indexOf('.')
      19 +  // fitness: not a value — position of a character in the past
         +ed text                                                        
      20    for (let i = 0; i < body.length; i++) {
      21      if (body[i] !== ',') continue
      22      if (point !== -1 && i > point) return false
      23 +    // fitness: not a value — the character after the three dig
         +its that follow a comma                                        
      24      const next = body[i + 4]
      25 +    // fitness: not a value — positions of the three digits aft
         +er a comma                                                     
      26      const three = isDigit(body[i + 1]) && isDigit(body[i + 2]) 
          && isDigit(body[i + 3])
      27      if (!three || (next !== undefined && next !== ',' && next !
          == '.')) return false
      28    }
  ⎿  (timeout 3m 20s)

  Ran 1 shell command (ctrl+o to expand)

⏺ Status: the fitness functions are written and run. Two rules caught real
  things, both now fixed in code. Last step: recording the six escape hatches in
  the test's list.

⏺ Bash(python3 - <<'EOF'
      p="src/fitness.test.ts"; s=open(p).read()…)
  ⎿  Updated src/fitness.test.ts (+4 -2)
      135  
      136  const ALLOWED_HATCHES = [
      137    'domain/entry.ts:11 the 0 before the point is not counted (a
            digit count)',
      138 -  'domain/format.ts:21 position in the whole-number part, for 
          -commas',                                                      
      139 -  'domain/paste.ts:20 position of a comma in the pasted text',
      138 +  'domain/format.ts:20 position in the whole-number part, for 
          +commas',                                                      
      139 +  'domain/format.ts:22 digits left of this position, for comma
          +s',                                                           
      140 +  'domain/paste.ts:19 position of a character in the pasted te
          +xt',                                                          
      141 +  'domain/paste.ts:23 the character after the three digits tha
          +t follow a comma',                                            
      142    'domain/paste.ts:25 positions of the three digits after a co
           mma',
      143  ]
      144  
  ⎿  (timeout 5m)

⏺ All 679 tests pass; the Implemented half of fitness 3 only passes trivially
  since no story is implemented yet, and the bundle stays under budget. I'll
  remove the duplicate decimal.js import assertion from the old domain
  boundaries test while keeping its other two checks.

⏺ Bash(python3 - <<'EOF'
      p="src/domain/boundaries.test.ts"; s=open(p).read()…)
  ⎿  Updated src/domain/boundaries.test.ts (+2 -6)
      2  import { join, relative } from 'node:path'
      3  import { describe, expect, it } from 'vitest'
      4  
      5 -// Fitness functions 2, 3 and 4 in docs/architecture.md, for the
        - domain built so far.                                           
      5 +// Fitness functions 3 and 4 in docs/architecture.md: no native 
        +number APIs anywhere in src, and                                
      6 +// nothing in domain throws. The import rules are in src/fitness
        +.test.ts.                                                       
      7  const SRC = join(__dirname, '..')
      8  
      9  function sourceFiles(dir: string): string[] {
     ...
      20  }))
      21  
      22  describe('domain boundaries', () => {
      22 -  it('only domain/decimal.ts imports decimal.js', () => {      
      23 -    const importers = files.filter((f) => /from ['"]decimal\.js
         -['"]/.test(f.text)).map((f) => f.path)                         
      24 -    expect(importers).toEqual(['domain/decimal.ts'])           
      25 -  })                                                           
      26 -                                                               
      23    it('no production file uses native number parsing or rounding
           on values', () => {
      24      const banned = /\b(parseFloat|parseInt|Number\(|toFixed|toP
          recision|Math\.)/
      25      expect(files.filter((f) => banned.test(f.text)).map((f) => 
          f.path)).toEqual([])
  ⎿  (timeout 5m)

⏺ Pushed: 85b9989. Now CI:

⏺ Bash(mkdir -p .github/workflows && cat > .github/workflows/ci.yml <<'EOF'
      # Runs the full test suite, fitness functions included, and the build on
      every push and pul…)
  ⎿  Created .github/workflows/ci.yml (+24 -0)
       1 +# Runs the full test suite, fitness functions included, and the
         + build on every push and pull                                  
       2 +# request. No deploy, no secrets, no keys. The evals in evals/ 
         +are not run here (ADR 0010).                                   
       3 +name: CI                                                       
       4 +                                                               
       5 +on:                                                            
       6 +  push:                                                        
       7 +  pull_request:                                                
       8 +                                                               
       9 +permissions:                                                   
      10 +  contents: read                                               
      11 +                                                               
      12 +jobs:                                                          
      13 +  test-and-build:                                              
      14 +    runs-on: ubuntu-latest                                     
      15 +    steps:                                                     
      16 +      - uses: actions/checkout@v4                              
      17 +      - uses: actions/setup-node@v4                            
      18 +        with:                                                  
      19 +          node-version: 20                                     
      20 +          cache: npm                                           
      21 +      - run: npm ci                                            
      22 +      - run: npm run typecheck                                 
      23 +      - run: npm test                                          
      24 +      - run: npm run build                                     

  Ran 1 shell command (ctrl+o to expand)
⏺ CI passed in 30 seconds, with one annotation: the checkout and setup-node
  actions are on v4, which uses a deprecated Node 20 runtime internally. I'll
  bump both to v5 to clear that, then add the badge.

⏺ Bash(sed -i '' -e 's#actions/checkout@v4#actions/checkout@v5#' -e
      's#actions/setup-node@v4#actions/setup-node@v5#' .github/workflows/ci.yml
      && git add .github && git…)
  ⎿  Updated .github/workflows/ci.yml (+2 -2)
      13    test-and-build:
      14      runs-on: ubuntu-latest
      15      steps:
      16 -      - uses: actions/checkout@v4                              
      17 -      - uses: actions/setup-node@v4                            
      16 +      - uses: actions/checkout@v5                              
      17 +      - uses: actions/setup-node@v5                            
      18          with:
      19            node-version: 20
      20            cache: npm
  ⎿  (timeout 10m)

⏺ That showed the previous run, because the new one hadn't registered yet.
  Checking again:

  Ran 1 shell command (ctrl+o to expand)

⏺ Green, and the deprecation warning is gone. Only a notice remains, about
  ubuntu-latest moving to Ubuntu 26. Now the README badge:

⏺ Bash(python3 - <<'EOF'
      p="README.md"; s=open(p).read()…)
  ⎿  Updated README.md (+3 -1)
      1  # Calculator
      2  
      3 +[![CI](https://github.com/hassan-product/hassa-chaudry-calculato
        +r/actions/workflows/ci.yml/badge.svg)](https://github.com/hassan
        +-product/hassa-chaudry-calculator/actions/workflows/ci.yml)     
      4 +                                                                
      5  A four-function calculator you can trust with money. It is exact
          where possible, marks a number with ≈ where it is not, and keep
         s a tape that shows the working.
      6  
      7  **Status:** built and running, with automated tests passing. Eve
         ry story in `docs/user-stories.md` is still marked Not implement
         ed: the VoiceOver check has not been done yet, and a story is ma
         rked Implemented only after it.
     ...
      21  ```sh
      22  npm install
      23  npm run dev    # then open the address it prints, usually http:
          //localhost:5173/
      22 -npm test       # the automated tests                           
      24 +npm test       # the automated tests, fitness functions include
         +d; CI runs these and the build                                 
      25  ```

⏺ Pushed 0dd1865. Before writing any docs, I'll verify the grader can run
  through Claude Code login by testing the promptfoo provider wrapper (which
  pipes prompts into claude -p from an empty temp folder, no tools/MCP, and with
  ANTHROPIC_API_KEY stripped) with one direct call.

⏺ Bash(mkdir -p evals && cat > evals/claude-provider.mjs <<'EOF'
      // A promptfoo provider that answers through the Claude Code login already
      on this machine, by…)
  ⎿  Created evals/claude-provider.mjs (+53 -0)
       1 +// A promptfoo provider that answers through the Claude Code lo
         +gin already on this machine, by                                
       2 +// running `claude -p`. It uses no API key: ANTHROPIC_API_KEY i
         +s removed from the child's                                     
       3 +// environment so the login is the only way in. Nothing is writ
         +ten to disk except a temporary                                 
       4 +// empty folder, used as the working directory so no project CL
         +AUDE.md or memory is read.                                     
       5 +import { spawn } from 'node:child_process'                     
       6 +import { mkdtempSync, rmSync } from 'node:fs'                  
       7 +import { tmpdir } from 'node:os'                               
       8 +import { join } from 'node:path'                               
       9 +                                                               
      10 +export const MODEL = 'claude-sonnet-5-5'                       
      11 +                                                               
      12 +// A plain system prompt instead of Claude Code's own, so the d
         +ocuments under test are the only                               
      13 +// guidance the model gets.                                    
      14 +const SYSTEM =                                                 
      15 +  'You are helping write and check product documents. Answer th
         +e request directly and briefly, ' +                            
      16 +  'using only what the request gives you. Do not ask questions 
         +back.'                                                         
      17 +                                                               
      18 +function run(prompt, cwd) {                                    
      19 +  return new Promise((resolve, reject) => {                    
      20 +    const env = { ...process.env }                             
      21 +    delete env.ANTHROPIC_API_KEY                               
      22 +    const child = spawn(                                       
      23 +      'claude',                                                
      24 +      ['-p', '--model', MODEL, '--output-format', 'text', '--to
         +ols', '', '--strict-mcp-config',                               
      25 +        '--no-session-persistence', '--system-prompt', SYSTEM],
      26 +      { cwd, env, stdio: ['pipe', 'pipe', 'pipe'] },           
      27 +    )                                                          
      28 +    let out = ''                                               
      29 +    let err = ''                                               
      30 +    child.stdout.on('data', (d) => (out += d))                 
      31 +    child.stderr.on('data', (d) => (err += d))                 
      32 +    child.on('error', reject)                                  
      33 +    child.on('close', (code) => (code === 0 ? resolve(out.trim(
         +)) : reject(new Error(`claude exited ${code}: ${err.trim().slic
         +e(0, 300)}`))))                                                
      34 +    child.stdin.end(prompt)                                    
      35 +  })                                                           
      36 +}                                                              
      37 +                                                               
      38 +export default class ClaudeCodeProvider {                      
      39 +  id() {                                                       
      40 +    return `claude-code:${MODEL}`                              
     … 13 more lines (ctrl+o to expand)
  ⎿  (timeout 3m)

⏺ The login works through the wrapper, and the model sees no CLAUDE.md. Next,
  the grader: one rubric case through promptfoo, using the same wrapper as the
  grader.

  Ran 1 shell command (ctrl+o to expand)

⏺ The latest promptfoo requires Node 22.22, but this machine and project are on
  Node 20. Instead of requiring a Node upgrade, I'll find the newest promptfoo
  version that still supports Node 20.

  Ran 2 shell commands (ctrl+o to expand)

⏺ The grader works correctly, and I've pinned promptfoo to 0.120.19 for Node 20
  compatibility. Next, I'll write the docs—an ADR and an evals section in
  architecture.md, following the existing ADR format.

  Ran 2 shell commands (ctrl+o to expand)

⏺ That section inaccurately claims all nine checks run in CI and references an
  assertNever the code doesn't use. I'll correct it to accurately reflect which
  checks actually run and where, add the evals section, then move on to the ADR.

⏺ Bash(python3 - <<'EOF'
      p="docs/architecture.md"; s=open(p).read()…)
  ⎿  Created docs/adr/0010-evals-through-claude-code-login.md (+22 -0)
       1 +# 0010. Run the evals through the Claude Code login            
       2 +                                                               
       3 +- **Status:** Accepted                                         
       4 +- **Date:** 2026-10-07                                         
       5 +                                                               
       6 +## Context                                                     
       7 +The product rests on written context: the Decisions in `CLAUDE.
         +md`, the engine rules in `architecture.md`, and the product-spe
         +c skill that later sessions follow. If that writing can be read
         + two ways, a later session will build the wrong thing, and no t
         +est of the code catches it. Checking the writing means giving i
         +t to a reader and seeing what comes back. The calculator has no
         + model in it, a reviewer runs it with Node only, and the projec
         +t has no secrets, keys or backend.                             
       8 +                                                               
       9 +## Decision                                                    
      10 +Evals live in `evals/` as promptfoo suites. A small wrapper run
         +s `claude -p` through the Claude Code login already on the mach
         +ine, and the same wrapper grades the rubric assertions. The wra
         +pper removes any API key from the environment, works from an em
         +pty folder so no project memory leaks in, and writes nothing bu
         +t the results. The evals are not part of `npm test` and do not 
         +run in CI. The raw results and a readable summary are committed
         +, naming the model and the pass threshold.                     
      11 +                                                               
      12 +## Alternatives rejected                                       
      13 +- **An API key.** It would make runs repeatable in CI. It was r
         +ejected because it puts a secret into a project that has none, 
         +and a reviewer would need a paid key just to run the checks.   
      14 +- **A free local model.** No key, no cost. It was rejected beca
         +use a model small enough to run on a laptop misreads plain rule
         +s often enough that a failure would say more about the model th
         +an about the writing.                                          
      15 +- **Checking the documents with no model at all**, with linting
         +, keyword rules and structure checks. It is free and exact. It 
         +was rejected because it can check shape, such as Given/When/The
         +n and the banned words, but not meaning: whether two rules can 
         +be read two ways is a question only a reader can answer.       
      16 +                                                               
      17 +## Consequences                                                
      18 +- The written context has a check that can fail, and a failure 
         +in the ambiguity suite is fixed in the document first.         
      19 +- Anyone with no Claude login can still read what happened, fro
         +m the committed results.                                       
      20 +- **Cost:** the model checking the documents is the same family
         + as the model that wrote them, so it may share the writer's bli
         +nd spots and read an ambiguity the way the writer meant it.    
      21 +- **Cost:** a later run can differ from a saved one, because th
         +e model changes and its answers vary. That is why the saved res
         +ults name the model and the threshold, and why one run is evide
         +nce, not proof.                                                
      22 +- **Cost:** each run uses some of the runner's Claude plan, and
         + needs Claude Code signed in.                                  
  ⎿  Updated docs/architecture.md (+24 -13)
      310  - It receives only the view model in `shared/view.ts`. Every f
           ield there is a display string already produced by `format.ts`
           , or text looked up from `ERROR_TEXT` or `NOTICE_TEXT`.
      311  - There is no field of type `Error` or `unknown` anywhere in t
           he view model.
      312  
      313 -## Fitness functions to enforce                               
      314 -                                                              
      315 -Each of these will be a test, so this document and the code ca
          -nnot drift apart:                                             
      316 -                                                              
      317 -1. **Layer imports.** Rules 1 to 7 above are checked by parsin
          -g every import in `src/`, test files excluded.                
      318 -2. **One door to decimal.js.** Only `domain/decimal.ts` import
          -s `decimal.js`, and only it calls `Decimal.clone` or `Decimal.
          -set`.                                                         
      319 -3. **No native number maths on values.** Production files in `
          -src/` contain no `parseFloat`, `parseInt`, `Number(`, `toFixed
          -`, `toPrecision` or `Math.` calls. Operators on values cannot 
          -be grepped for, so this rule is backed by the domain tests and
          - by values being typed as `Decimal`.                          
      320 -4. **No throw in domain.** `domain/**` contains no `throw`.   
      321 -5. **No persistence and no network.** `src/**` references none
          - of `localStorage`, `sessionStorage`, `indexedDB`, `document.c
          -ookie`, `fetch`, `XMLHttpRequest`, `WebSocket` or `sendBeacon`
          -.                                                             
      322 -6. **Messages are verbatim.** `ERROR_TEXT`, `NOTICE_TEXT` and 
          -`FAULT_TEXT` match the strings in Decisions 8 and 9 exactly.  
      323 -7. **No raw errors in the UI.** No type in `shared/view.ts` in
          -cludes `Error`, `unknown` or `Decimal`.                       
      324 -8. **Banned words.** No file in `src/ui/` and no rendered text
          - contains "precision" or "floating point".                    
      325 -9. **Exhaustive states.** The engine's `switch` on `state.kind
          -` ends in an `assertNever`, so `npm run typecheck` fails when 
          -a state is added and not handled.                             
      313 +## Fitness functions                                          
      314 +                                                              
      315 +These are tests on the code's shape, so this document and the 
          +code cannot drift apart. They run with `npm test`, and CI (`.g
          +ithub/workflows/ci.yml`) runs them on every push and pull requ
          +est.                                                          
      316 +                                                              
      317 +| Check | Where | Status |                                    
      318 +|---|---|---|                                                 
      319 +| Layer imports: rules 1 to 7 above, read from the import grap
          +h, test files excluded | `src/fitness.test.ts`, fitness 1 | En
          +forced |                                                      
      320 +| One door to decimal.js: only `domain/decimal.ts` imports it 
          +| fitness 1 | Enforced. That only it calls `Decimal.clone` fol
          +lows, but is not checked separately. |                        
      321 +| No native arithmetic on values: in `src/domain` outside `dec
          +imal.ts`, no `parseFloat`, `Number`, `Math` or arithmetic oper
          +ator on a number, read from the TypeScript AST. A use that is 
          +not a value carries a `fitness: not a value` comment, and the 
          +test lists every one. | fitness 2; `src/domain/boundaries.test
          +.ts` for the number APIs across all of `src` | Enforced, with 
          +six listed uses, all string positions and digit counts |      
      322 +| No throw in domain | `src/domain/boundaries.test.ts` | Enfor
          +ced |                                                         
      323 +| Story traceability: a story marked Implemented needs a test 
          +citing it, and no test cites a story or criterion that does no
          +t exist | fitness 3 | Enforced. The first half passes only bec
          +ause no story is Implemented yet. |                           
      324 +| Error surface: every error and notice code has a message, wr
          +itten as words | fitness 4 | Enforced |                       
      325 +| Bundle budget: gzipped JavaScript under 150 kB | fitness 5 |
          + Enforced (about 89 kB today) |                               
      326 +| Messages verbatim: the texts match Decisions 8 and 9 | the a
          +rithmetic, paste and fault tests | Enforced in those tests |  
      327 +| Exhaustive states: every `switch` on `calc.kind` lists every
          + state with no default, so `npm run typecheck` fails when a st
          +ate is added and not handled | the type check, run in CI | Enf
          +orced |                                                       
      328 +| No persistence and no network: `src/**` references no storag
          +e or network API | none yet | Not yet a test |                
      329 +| No raw errors in the UI: no type in `shared/view.ts` include
          +s `Error`, `unknown` or `Decimal` | none yet | Not yet a test;
          + the types keep it true today |                               
      330 +| Banned words: no UI text says "precision" or "floating point
          +" | none yet | Not yet a test |                               
      331 +                                                              
      332 +## Evals                                                      
      333 +                                                              
      334 +`evals/` holds promptfoo suites that test the written context,
          + not the calculator: whether the product-spec skill produces j
          +obs and criteria in the required shape, and whether the engine
          + rules in `CLAUDE.md` and this document answer edge cases with
          + one reading. They run through the Claude Code login of whoeve
          +r runs them, are not part of `npm test` and are not run in CI 
          +(ADR 0010).                                                   
      335 +                                                              
      336 +The two exist for different reasons. Fitness functions guard t
          +he code: they are exact, free and run on every change. Evals g
          +uard the writing: whether a reader, here a model, takes the do
          +cuments the way they were meant. That can only be judged by a 
          +reader, so it is slower, costs plan usage and can vary between
          + runs.                                                        
     … 3 more lines (ctrl+o to expand)

⏺ Pushed commit 550a9b2. Next I'll check the evals harness, where each suite's
  prompt is built at run time from current documents—Suite C uses only the
  Decisions plus the engine-state and memory sections of architecture.md.

⏺ Bash(cd /Users/chaudry/code/hassa-chaudry-calculator/evals && mkdir -p prompts
      results && cat > prompts/docs.mjs <<'EOF'
      // Reads the documents under test fresh on e…)
  ⎿  Created evals/prompts/ambiguity.mjs (+15 -0)
       1 +import { engineRules } from './docs.mjs'                       
       2 +                                                               
       3 +export default function ({ vars }) {                           
       4 +  return `These are the rules for a calculator's engine. They a
         +re the only source of truth.                                   
       5 +                                                               
       6 +<rules>                                                        
       7 +${engineRules()}                                               
       8 +</rules>                                                       
       9 +                                                               
      10 +Using only these rules, what should happen in this situation? S
         +ay what the display shows afterwards, and whether a tape line i
         +s written. Answer in at most three sentences. If the rules do n
         +ot settle it, say so plainly instead of guessing.              
      11 +                                                               
      12 +<situation>                                                    
      13 +${vars.situation}                                              
      14 +</situation>`                                                  
      15 +}                                                              
  ⎿  Created evals/prompts/criteria.mjs (+19 -0)
       1 +import { decisions, skill } from './docs.mjs'                  
       2 +                                                               
       3 +export default function ({ vars }) {                           
       4 +  return `You are writing acceptance criteria for a user story.
         + Follow this skill exactly, and take the behaviour from the dec
         +isions.                                                        
       5 +                                                               
       6 +<skill>                                                        
       7 +${skill()}                                                     
       8 +</skill>                                                       
       9 +                                                               
      10 +<decisions>                                                    
      11 +${decisions()}                                                 
      12 +</decisions>                                                   
      13 +                                                               
      14 +<story>                                                        
      15 +${vars.story}                                                  
      16 +</story>                                                       
      17 +                                                               
      18 +Write the acceptance criteria for this story, following the ski
         +ll. Output only the criteria, grouped under the skill's categor
         +y headings.`                                                   
      19 +}                                                              
  ⎿  Created evals/prompts/docs.mjs (+24 -0)
       1 +// Reads the documents under test fresh on every run, so a fix 
         +to a document is what gets tested.                             
       2 +import { readFileSync } from 'node:fs'                         
       3 +import { dirname, join } from 'node:path'                      
       4 +import { fileURLToPath } from 'node:url'                       
       5 +                                                               
       6 +const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..'
         +, '..')                                                        
       7 +const read = (path) => readFileSync(join(ROOT, path), 'utf8')  
       8 +                                                               
       9 +// From a heading to the next heading of the same level or high
         +er.                                                            
      10 +function section(text, heading) {                              
      11 +  const start = text.indexOf(heading)                          
      12 +  if (start === -1) throw new Error(`missing section: ${heading
         +}`)                                                            
      13 +  const level = heading.match(/^#+/)[0].length                 
      14 +  const rest = text.slice(start + heading.length)              
      15 +  const next = rest.search(new RegExp(`\\n#{1,${level}} `))    
      16 +  return heading + (next === -1 ? rest : rest.slice(0, next))  
      17 +}                                                              
      18 +                                                               
      19 +export const skill = () => read('.claude/skills/product-spec/SK
         +ILL.md')                                                       
      20 +export const decisions = () => section(read('CLAUDE.md'), '## D
         +ecisions')                                                     
      21 +export const engineRules = () => {                             
      22 +  const arch = read('docs/architecture.md')                    
      23 +  return [decisions(), section(arch, '## Engine states'), secti
         +on(arch, '## Memory')].join('\n\n')                            
      24 +}                                                              
  ⎿  Created evals/prompts/job.mjs (+15 -0)
       1 +import { skill } from './docs.mjs'                             
       2 +                                                               
       3 +export default function ({ vars }) {                           
       4 +  return `You are writing one entry for a jobs-to-be-done docum
         +ent. Follow this skill exactly.                                
       5 +                                                               
       6 +<skill>                                                        
       7 +${skill()}                                                     
       8 +</skill>                                                       
       9 +                                                               
      10 +<situation>                                                    
      11 +${vars.situation}                                              
      12 +</situation>                                                   
      13 +                                                               
      14 +Write the one job this situation describes, following the skill
         +. Output only the job statement itself, as one sentence: no ID,
         + no role line, no heading, no commentary.`                     
      15 +}                                                              

⏺ Before the suite B assertions, I'll check what category headings the skill
  prescribes:

  Ran 1 shell command (ctrl+o to expand)

⏺ The skill names the categories ("invalid input", "boundaries"), so suite B's
  checks look for a criterion under each. Writing the shared assertions and the
  three suite configs:

⏺ Bash(cd /Users/chaudry/code/hassa-chaudry-calculator/evals && cat >
      assertions.mjs <<'EOF'
      // Deterministic checks, written in JavaScript so they cannot be argued
      wi…)
  ⎿  Created evals/assertions.mjs (+50 -0)
       1 +// Deterministic checks, written in JavaScript so they cannot b
         +e argued with.                                                 
       2 +                                                               
       3 +const result = (pass, reason) => ({ pass, score: pass ? 1 : 0, 
         +reason })                                                      
       4 +                                                               
       5 +// Suite A: the skill's job shape.                             
       6 +export function jobShape(output) {                             
       7 +  const text = output.trim()                                   
       8 +  const pass = /^When\s.+,\s*I want to\s.+,\s*so I can\s.+$/s.t
         +est(text)                                                      
       9 +  return result(pass, pass ? 'When / I want to / so I can' : `N
         +ot in the job shape: ${text.slice(0, 160)}`)                   
      10 +}                                                              
      11 +                                                               
      12 +// Suite A: words that mean the job has turned into a feature. 
      13 +const FEATURE_WORDS = ['button', 'screen', 'click', 'tap', 'key
         +pad', 'field', 'display', 'app', 'press']                      
      14 +export function noFeatureWords(output) {                       
      15 +  const found = FEATURE_WORDS.filter((w) => new RegExp(`\\b${w}
         +(s|es|ed|ing)?\\b`, 'i').test(output))                         
      16 +  return result(found.length === 0, found.length ? `Contains: $
         +{found.join(', ')}` : 'No feature words')                      
      17 +}                                                              
      18 +                                                               
      19 +// Suite B: every criterion line has Given, when and then.     
      20 +export function givenWhenThen(output) {                        
      21 +  const lines = output.split('\n').filter((l) => /\bgiven\b/i.t
         +est(l))                                                        
      22 +  const bad = lines.filter((l) => !/\bwhen\b/i.test(l) || !/\bt
         +hen\b/i.test(l))                                               
      23 +  const pass = lines.length > 0 && bad.length === 0            
      24 +  return result(pass, pass ? `${lines.length} criteria in Given
         + / When / Then` : lines.length ? `Incomplete: ${bad[0]}` : 'No 
         +Given lines')                                                  
      25 +}                                                              
      26 +                                                               
      27 +const CATEGORY = /^\s*(#+\s*|\*\*|__)?\s*(normal case|invalid i
         +nput|boundar(y|ies)|very large|after a result|after an error)/i
      28 +                                                               
      29 +// Suite B: at least one criterion under a named category headi
         +ng.                                                            
      30 +function criteriaUnder(output, heading) {                      
      31 +  const lines = output.split('\n')                             
      32 +  const start = lines.findIndex((l) => CATEGORY.test(l) && head
         +ing.test(l))                                                   
      33 +  if (start === -1) return 0                                   
      34 +  let n = 0                                                    
      35 +  for (const line of lines.slice(start + 1)) {                 
      36 +    if (CATEGORY.test(line)) break                             
      37 +    if (/\bgiven\b/i.test(line)) n++                           
      38 +  }                                                            
      39 +  return n                                                     
      40 +}                                                              
     … 10 more lines (ctrl+o to expand)
  ⎿  Created evals/suite-a-jobs.yaml (+41 -0)
       1 +# Suite A: does the product-spec skill alone produce jobs, not 
         +features?                                                      
       2 +description: A. Job statement quality                          
       3 +prompts:                                                       
       4 +  - file://prompts/job.mjs                                     
       5 +providers:                                                     
       6 +  - id: file://claude-provider.mjs                             
       7 +defaultTest:                                                   
       8 +  options:                                                     
       9 +    provider: file://claude-provider.mjs                       
      10 +  assert:                                                      
      11 +    - type: javascript                                         
      12 +      value: file://assertions.mjs:jobShape                    
      13 +    - type: javascript                                         
      14 +      value: file://assertions.mjs:noFeatureWords              
      15 +    - type: llm-rubric                                         
      16 +      value: >-                                                
      17 +        The statement describes a need that would exist even if
         + no software existed: it could be                              
      18 +        met with paper, a person or a printed document. It does
         + not describe a feature, a control,                            
      19 +        or an interaction with a device. Fail it if it names or
         + implies a piece of software.                                  
      20 +tests:                                                         
      21 +  - description: A1 shopper weighing an offer                  
      22 +    vars:                                                      
      23 +      situation: A shopper in a supermarket wants to know wheth
         +er a three-for-two offer is cheaper than buying the single pack
         +s, before the queue moves on.                                  
      24 +  - description: A2 splitting a bill                           
      25 +    vars:                                                      
      26 +      situation: Friends at a restaurant are splitting a bill, 
         +with a tip, between people who ordered different amounts.      
      27 +  - description: A3 approving an expense claim                 
      28 +    vars:                                                      
      29 +      situation: A manager is approving an expense claim of twe
         +lve receipts submitted by a colleague.                         
      30 +  - description: A4 checking a supplier invoice                
      31 +    vars:                                                      
      32 +      situation: An accounts clerk is checking a supplier's inv
         +oice total before paying it.                                   
      33 +  - description: A5 checking homework                          
      34 +    vars:                                                      
      35 +      situation: A parent is helping a child check the answers 
         +to long-division homework.                                     
      36 +  - description: A6 awkward, a history list smuggled in        
      37 +    vars:                                                      
      38 +      situation: A desk checker wants a history list of past ca
         +lculations, so they can tap an old result and reuse it in a new
         + sum.                                                          
      39 +  - description: A7 awkward, a copy button smuggled in         
      40 +    vars:                                                      
     … 1 more lines (ctrl+o to expand)
  ⎿  Created evals/suite-b-criteria.yaml (+35 -0)
       1 +# Suite B: does the skill produce criteria a tester could run? 
       2 +description: B. Criteria coverage                              
       3 +prompts:                                                       
       4 +  - file://prompts/criteria.mjs                                
       5 +providers:                                                     
       6 +  - id: file://claude-provider.mjs                             
       7 +defaultTest:                                                   
       8 +  options:                                                     
       9 +    provider: file://claude-provider.mjs                       
      10 +  assert:                                                      
      11 +    - type: javascript                                         
      12 +      value: file://assertions.mjs:givenWhenThen               
      13 +    - type: javascript                                         
      14 +      value: file://assertions.mjs:hasInvalidInput             
      15 +    - type: javascript                                         
      16 +      value: file://assertions.mjs:hasBoundary                 
      17 +    - type: llm-rubric                                         
      18 +      value: >-                                                
      19 +        A tester could run every criterion exactly as written, 
         +without a judgement call: each Given                           
      20 +        sets up a specific state, each When names specific inpu
         +ts, and each Then names an                                     
      21 +        observable result with exact values or exact text. Fail
         + it if any criterion relies on words                           
      22 +        such as appropriate, correct, sensible, clear or reason
         +able, or leaves a value unspecified.                           
      23 +tests:                                                         
      24 +  - description: B1 recall from the tape                       
      25 +    vars:                                                      
      26 +      story: As a Desk Checker, I want to bring an earlier resu
         +lt back into the sum I am doing, with every digit it really has
         +, so that I carry it forward without retyping it.              
      27 +  - description: B2 correct the figure being typed             
      28 +    vars:                                                      
      29 +      story: As an Everyday Calculator User, I want to fix a sl
         +ip in the figure I am typing, so that one wrong key does not co
         +st me the whole calculation.                                   
      30 +  - description: B3 running total in memory                    
      31 +    vars:                                                      
      32 +      story: As a Desk Checker, I want to add each part total i
         +nto memory as I work it out and read the sum back at the end, s
         +o that I reach the overall figure without retyping any part.   
      33 +  - description: B4 getting out of an error                    
      34 +    vars:                                                      
      35 +      story: As an Everyday Calculator User, I want a clear mes
         +sage when a sum cannot be done and an obvious way to carry on, 
         +so that I am never stuck.                                      
  ⎿  Created evals/suite-c-ambiguity.yaml (+90 -0)
       1 +# Suite C: do the engine rules in CLAUDE.md and architecture.md
         + give one answer to each edge case?                            
       2 +# A failure here is fixed in the document first, never by loose
         +ning the expected answer.                                      
       3 +description: C. Specification ambiguity                        
       4 +prompts:                                                       
       5 +  - file://prompts/ambiguity.mjs                               
       6 +providers:                                                     
       7 +  - id: file://claude-provider.mjs                             
       8 +defaultTest:                                                   
       9 +  options:                                                     
      10 +    provider: file://claude-provider.mjs                       
      11 +tests:                                                         
      12 +  - description: C1 an operator pressed twice                  
      13 +    vars:                                                      
      14 +      situation: The person types 2, presses +, then presses × 
         +straight away.                                                 
      15 +    assert:                                                    
      16 +      - type: llm-rubric                                       
      17 +        value: >-                                              
      18 +          The answer says the second operator replaces the firs
         +t, so the pending operation becomes                            
      19 +          2 ×; nothing is calculated, the display still shows 2
         +, and no tape line is written. Fail                            
      20 +          it if it says the operators are combined, that 2 + 2 
         +or any result is calculated, or that                           
      21 +          the rules do not settle it.                          
      22 +  - description: C2 equals three times                         
      23 +    vars:                                                      
      24 +      situation: The person types 5 + 3 and then presses = thre
         +e times.                                                       
      25 +    assert:                                                    
      26 +      - type: llm-rubric                                       
      27 +        value: >-                                              
      28 +          The answer says the first = gives 8 and each further 
         += repeats + 3, giving 11 and then 14,                          
      29 +          so the display ends on 14, and each of the three pres
         +ses writes its own tape line. Fail it                          
      30 +          if it says the later presses do nothing, or that only
         + one tape line is written.                                     
      31 +  - description: C3 an operator during an error                
      32 +    vars:                                                      
      33 +      situation: The display shows "Cannot divide by zero" and 
         +the person presses +.                                          
      34 +    assert:                                                    
      35 +      - type: llm-rubric                                       
      36 +        value: >-                                              
      37 +          The answer says nothing happens: the error stays on t
         +he display and no tape line is                                 
      38 +          written. Fail it if it says + starts a calculation, c
         +lears the error or acts on 0.                                  
      39 +  - description: C4 a digit during an error                    
      40 +    vars:                                                      
     … 50 more lines (ctrl+o to expand)

⏺ Now I'll build the runner, which executes each suite with the pinned
  promptfoo, saves raw JSON, and writes a readable summary including model,
  date, and threshold—disabling telemetry/sharing and storing promptfoo's
  database in a temp folder.

⏺ Bash(cat > run.mjs <<'EOF'
      // Runs the eval suites and writes results/<suite>.json and
      results/summary.md.…)
  ⎿  Created evals/results/suite-a.json (+284 -0)
        1 +{                                                             
        2 +  "evalId": "eval-0M5-2026-10-07T11:04:52",                   
        3 +  "results": {                                                
        4 +    "version": 3,                                             
        5 +    "timestamp": "2026-10-07T11:04:52.345Z",                  
        6 +    "prompts": [                                              
        7 +      {                                                       
        8 +        "raw": "function ({ vars }) {\n  return `You are writi
          +ng one entry for a jobs-to-be-done document. Follow this skill
          + exactly.\n\n<skill>\n${skill()}\n</skill>\n\n<situation>\n${v
          +ars.situation}\n</situation>\n\nWrite the one job this situati
          +on describes, following the skill. Output only the job stateme
          +nt itself, as one sentence: no ID, no role line, no heading, n
          +o commentary.`\n}",                                           
        9 +        "label": "prompts/job.mjs",                           
       10 +        "config": {},                                         
       11 +        "id": "36c063570731951162699e1faeabbff6901c29f33d21973
          +70fd87e7bfd759191",                                           
       12 +        "provider": "claude-code:claude-sonnet-5-5",          
       13 +        "metrics": {                                          
       14 +          "score": 1,                                         
       15 +          "testPassCount": 1,                                 
       16 +          "testFailCount": 0,                                 
       17 +          "testErrorCount": 0,                                
       18 +          "assertPassCount": 3,                               
       19 +          "assertFailCount": 0,                               
       20 +          "totalLatencyMs": 3841,                             
       21 +          "tokenUsage": {                                     
       22 +            "prompt": 0,                                      
       23 +            "completion": 0,                                  
       24 +            "cached": 0,                                      
       25 +            "total": 0,                                       
       26 +            "numRequests": 1,                                 
       27 +            "completionDetails": {                            
       28 +              "reasoning": 0,                                 
       29 +              "acceptedPrediction": 0,                        
       30 +              "rejectedPrediction": 0                         
       31 +            },                                                
       32 +            "assertions": {                                   
       33 +              "total": 0,                                     
       34 +              "prompt": 0,                                    
       35 +              "completion": 0,                                
       36 +              "cached": 0,                                    
       37 +              "numRequests": 0,                               
       38 +              "completionDetails": {                          
       39 +                "reasoning": 0,                               
       40 +                "acceptedPrediction": 0,                      
     … 244 more lines (ctrl+o to expand)
  ⎿  Created evals/run.mjs (+88 -0)
       1 +// Runs the eval suites and writes results/<suite>.json and res
         +ults/summary.md.                                               
       2 +//   node evals/run.mjs            all three suites            
       3 +//   node evals/run.mjs c          one suite                   
       4 +//   node evals/run.mjs a --first  only the first case, to chec
         +k the setup before a full run                                  
       5 +// Needs Claude Code signed in. Uses no API key, and each run u
         +ses some of that person's plan.                                
       6 +import { execFileSync } from 'node:child_process'              
       7 +import { existsSync, mkdtempSync, readFileSync, writeFileSync }
         + from 'node:fs'                                                
       8 +import { tmpdir } from 'node:os'                               
       9 +import { dirname, join } from 'node:path'                      
      10 +import { fileURLToPath } from 'node:url'                       
      11 +import { MODEL } from './claude-provider.mjs'                  
      12 +                                                               
      13 +const HERE = dirname(fileURLToPath(import.meta.url))           
      14 +// The last promptfoo release that runs on Node 20, the project
         +'s Node.                                                       
      15 +const PROMPTFOO = 'promptfoo@0.120.19'                         
      16 +                                                               
      17 +// A, B: generated writing, where one stray case is variance in
         + the model, so one miss is allowed.                            
      18 +// C: one right reading per case; any miss is a question about 
         +the documents.                                                 
      19 +const SUITES = {                                               
      20 +  a: { file: 'suite-a-jobs.yaml', name: 'A. Job statement quali
         +ty', allowedFailures: 1 },                                     
      21 +  b: { file: 'suite-b-criteria.yaml', name: 'B. Criteria covera
         +ge', allowedFailures: 1 },                                     
      22 +  c: { file: 'suite-c-ambiguity.yaml', name: 'C. Specification 
         +ambiguity', allowedFailures: 0 },                              
      23 +}                                                              
      24 +                                                               
      25 +const args = process.argv.slice(2)                             
      26 +const first = args.includes('--first')                         
      27 +const chosen = args.filter((a) => a in SUITES)                 
      28 +const keys = chosen.length ? chosen : Object.keys(SUITES)      
      29 +                                                               
      30 +const env = {                                                  
      31 +  ...process.env,                                              
      32 +  PROMPTFOO_DISABLE_TELEMETRY: '1',                            
      33 +  PROMPTFOO_DISABLE_SHARING: '1',                              
      34 +  PROMPTFOO_DISABLE_UPDATE: '1',                               
      35 +  // promptfoo keeps its own database of runs; keep it out of t
         +he home folder.                                                
      36 +  PROMPTFOO_CONFIG_DIR: mkdtempSync(join(tmpdir(), 'promptfoo-'
         +)),                                                            
      37 +}                                                              
      38 +delete env.ANTHROPIC_API_KEY                                   
      39 +                                                               
      40 +for (const key of keys) {                                      
     … 48 more lines (ctrl+o to expand)
  ⎿  (timeout 6m 40s)

⏺ One full case passed end to end: both JavaScript checks, and the rubric graded
  through the same login. Writing evals/README.md, then committing the harness
  before the full run:

⏺ Bash(rm -f results/suite-a.json && cat > README.md <<'EOF'
      # Evals…)
  ⎿  Created evals/README.md (+41 -0)
       1 +# Evals                                                        
       2 +                                                               
       3 +These test the **written context**, not the calculator. The cal
         +culator has no model in it and gets none. What is under test is
         + whether the documents a later session builds from are clear en
         +ough to be followed one way:                                   
       4 +                                                               
       5 +| Suite | Under test | Checks |                                
       6 +|---|---|---|                                                  
       7 +| A. Job statement quality | `.claude/skills/product-spec/SKILL
         +.md` | A job written from the skill alone has the *When / I wan
         +t to / so I can* shape, uses none of *button, screen, click, ta
         +p, keypad, field, display, app, press*, and describes a need th
         +at would exist without software. Two of the seven cases are awk
         +ward: the obvious phrasing smuggles a feature in. |            
       8 +| B. Criteria coverage | the skill and the Decisions in `CLAUDE
         +.md` | Criteria written for a story are Given / When / Then, in
         +clude at least one invalid-input and one boundary case, and cou
         +ld be run by a tester without a judgement call. |              
       9 +| C. Specification ambiguity | the Decisions in `CLAUDE.md`, an
         +d the Engine states and Memory sections of `docs/architecture.m
         +d` | Given only those, the model answers nine edge cases the wa
         +y the documents mean. A failure here is fixed **in the document
         +**, never by loosening the expected answer. |                  
      10 +                                                               
      11 +The JavaScript checks are exact. The rubric checks are graded b
         +y a model.                                                     
      12 +                                                               
      13 +## How it runs                                                 
      14 +                                                               
      15 +Through the Claude Code login already on your machine. `claude-
         +provider.mjs` runs `claude -p` for each answer, and the same wr
         +apper grades the rubric checks.                                
      16 +                                                               
      17 +- **No API key.** The wrapper removes `ANTHROPIC_API_KEY` from 
         +the child's environment, so the login is the only way in. Nothi
         +ng is written into a file and nothing is echoed.               
      18 +- **Nothing else leaks in.** Each call runs from an empty tempo
         +rary folder, with no tools, no MCP servers and a plain system p
         +rompt, so the documents in the prompt are the only guidance.   
      19 +- **It uses your plan.** One full run is 20 answers and 20 grad
         +ings, about 40 calls on `claude-sonnet-5-5`.                   
      20 +- **Not part of `npm test`, and not in CI.** A reviewer runs th
         +e app with Node only (ADR 0010).                               
      21 +                                                               
      22 +## Run it                                                      
      23 +                                                               
      24 +Needs Node 20.19 or later and Claude Code signed in (`claude` o
         +n the path). promptfoo is fetched by `npx`, pinned to 0.120.19,
         + the last release that runs on Node 20.                        
      25 +                                                               
      26 +```sh                                                          
      27 +node evals/run.mjs a --first   # one case, to check the setup  
      28 +node evals/run.mjs             # all three suites              
      29 +node evals/run.mjs c           # one suite                     
      30 +```                                                            
      31 +                                                               
      32 +## Results                                                     
      33 +                                                               
      34 +`results/suite-a.json`, `suite-b.json` and `suite-c.json` are p
         +romptfoo's raw output. `results/summary.md` is the readable ver
         +sion: each case, its result, why it failed, and the answer itse
         +lf. Both are committed so anyone without a Claude login can rea
         +d what happened.                                               
      35 +                                                               
      36 +- **Model:** `claude-sonnet-5-5` produced the saved answers and
         + graded them.                                                  
      37 +- **Threshold:** suites A and B pass with at most one failing c
         +ase; suite C passes only with none.                            
      38 +  - A and B judge generated writing, where one stray case is va
         +riance in the model rather than a fault in the skill.          
      39 +  - C has one right reading per case, so any miss is a question
         + about the documents.                                          
      40 +- **A later run can differ.** The model changes and its answers
         + vary. A saved result is evidence about the documents as they s
         +tood, with the model and threshold named, not a guarantee.     
     … 1 more lines (ctrl+o to expand)
  ⎿  Deleted evals/results/suite-a.json (+0 -284)
        1 -{                                                             
        2 -  "evalId": "eval-0M5-2026-10-07T11:04:52",                   
        3 -  "results": {                                                
        4 -    "version": 3,                                             
        5 -    "timestamp": "2026-10-07T11:04:52.345Z",                  
        6 -    "prompts": [                                              
        7 -      {                                                       
        8 -        "raw": "function ({ vars }) {\n  return `You are writi
          -ng one entry for a jobs-to-be-done document. Follow this skill
          - exactly.\n\n<skill>\n${skill()}\n</skill>\n\n<situation>\n${v
          -ars.situation}\n</situation>\n\nWrite the one job this situati
          -on describes, following the skill. Output only the job stateme
          -nt itself, as one sentence: no ID, no role line, no heading, n
          -o commentary.`\n}",                                           
        9 -        "label": "prompts/job.mjs",                           
       10 -        "config": {},                                         
       11 -        "id": "36c063570731951162699e1faeabbff6901c29f33d21973
          -70fd87e7bfd759191",                                           
       12 -        "provider": "claude-code:claude-sonnet-5-5",          
       13 -        "metrics": {                                          
       14 -          "score": 1,                                         
       15 -          "testPassCount": 1,                                 
       16 -          "testFailCount": 0,                                 
       17 -          "testErrorCount": 0,                                
       18 -          "assertPassCount": 3,                               
       19 -          "assertFailCount": 0,                               
       20 -          "totalLatencyMs": 3841,                             
       21 -          "tokenUsage": {                                     
       22 -            "prompt": 0,                                      
       23 -            "completion": 0,                                  
       24 -            "cached": 0,                                      
       25 -            "total": 0,                                       
       26 -            "numRequests": 1,                                 
       27 -            "completionDetails": {                            
       28 -              "reasoning": 0,                                 
       29 -              "acceptedPrediction": 0,                        
       30 -              "rejectedPrediction": 0                         
       31 -            },                                                
       32 -            "assertions": {                                   
       33 -              "total": 0,                                     
       34 -              "prompt": 0,                                    
       35 -              "completion": 0,                                
       36 -              "cached": 0,                                    
       37 -              "numRequests": 0,                               
       38 -              "completionDetails": {                          
       39 -                "reasoning": 0,                               
       40 -                "acceptedPrediction": 0,                      
     … 244 more lines (ctrl+o to expand)

⏺ Pushed: 7364944. Now the full run: three suites, about 40 calls through your
  plan.

⏺ Bash(node evals/run.mjs 2>&1 | grep -E '^== |Results:|Duration' )
  ⎿  Created evals/results/summary.md (+351 -0)
        1 +# Eval results                                                
        2 +                                                              
        3 +- **Model:** `claude-sonnet-5-5`, through the Claude Code logi
          +n (`claude -p`), for both the answers and the grading.        
        4 +- **Run:** 2026-10-07, with `promptfoo@0.120.19`.             
        5 +- **Threshold:** suites A and B pass with at most one failing 
          +case; suite C passes only with none.                          
        6 +                                                              
        7 +## A. Job statement quality: FAIL (5 of 7 cases)              
        8 +                                                              
        9 +| Case | Result | Why it failed |                             
       10 +|---|---|---|                                                 
       11 +| A1 shopper weighing an offer | pass |  |                    
       12 +| A2 splitting a bill | pass |  |                             
       13 +| A3 approving an expense claim | pass |  |                   
       14 +| A4 checking a supplier invoice | pass |  |                  
       15 +| A5 checking homework | pass |  |                            
       16 +| A6 awkward, a history list smuggled in | **fail** | The unde
          +rlying need, reusing a figure worked out earlier, could be met
          + on paper. But the statement says 'retyping it by hand' and 'b
          +ring that earlier result back into a new calculation'. That im
          +plies a keyboard and a device's recall or memory feature, so i
          +t implies software rather than a need independent of any devic
          +e. |                                                          
       17 +| A7 awkward, a copy button smuggled in | **fail** | The state
          +ment describes wanting to get an exact figure into a message t
          +o a manager without retyping, to avoid transcription mistakes.
          + This implies copying and pasting between software (a calculat
          +or and a messaging app), so it implies a device-based interact
          +ion rather than a need that exists independent of software. 'W
          +ithout retyping' and 'get that exact number into my message' p
          +resuppose a digital copy/transfer mechanism. A paper-based nee
          +d would be simply writing the number down, and transcription e
          +rrors could occur there too, but the phrasing is tied to a dig
          +ital workflow. |                                              
       18 +                                                              
       19 +<details><summary>Answers</summary>                           
       20 +                                                              
       21 +**A1 shopper weighing an offer**                              
       22 +                                                              
       23 +```                                                           
       24 +When I'm standing in a supermarket aisle looking at a three-fo
          +r-two offer, I want to know whether it works out cheaper than 
          +buying the single packs, so I can choose the better deal befor
          +e the queue moves on.                                         
       25 +```                                                           
       26 +                                                              
       27 +**A2 splitting a bill**                                       
       28 +                                                              
       29 +```                                                           
       30 +When the bill arrives and everyone at the table ordered differ
          +ent amounts, I want to work out what each person owes includin
          +g their fair share of the tip, so I can settle up quickly with
          +out anyone overpaying or underpaying.                         
       31 +```                                                           
       32 +                                                              
       33 +**A3 approving an expense claim**                             
       34 +                                                              
       35 +```                                                           
       36 +When a colleague submits an expense claim with a dozen receipt
          +s for my approval, I want to confirm that the amounts add up a
          +nd each receipt is legitimate, so I can approve the claim know
          +ing the company is paying exactly what was spent.             
       37 +```                                                           
       38 +                                                              
       39 +**A4 checking a supplier invoice**                            
       40 +                                                              
     … 311 more lines (ctrl+o to expand)
  ⎿  … 3 more files changed
  ⎿  (timeout 10m)

  Ran 1 shell command (ctrl+o to expand)

⏺ Suite C passed 9 of 9. Suite A failed on exactly the two awkward cases. Suite
  B failed all four, so I need its reasons before deciding anything:

  Ran 2 shell commands (ctrl+o to expand)
⏺ Before judging A and B, I'll read suite C's answers in full. It passed 9 of 9,
  and I want to see whether any answer hedged or added behaviour the grader let
  through.

  Ran 1 shell command (ctrl+o to expand)

⏺ Suite C's answers are clean: each cites the Decision or transition it relies
  on, none hedges, and none adds behaviour. I'll scan the raw results for
  anything secret before committing them:

  Ran 1 shell command (ctrl+o to expand)

⏺ Everything is pushed, all 678 tests pass, and CI is green.

  Suite C: no case failed. All nine edge cases were answered the way the
  documents mean. Each answer cited the Decision or diagram transition it relied
  on, and none hedged or added behaviour. So these nine cases turned up nothing
  ambiguous, and no document needed fixing. One limit, also recorded in ADR
  0010: the reader is the same model family that helped write the documents, so
  it may read a gap the way the writer meant.

  Fitness functions

  They're in src/fitness.test.ts and run with npm test. Three of the five passed
  on the first run. Two found real problems, both fixed in the code; the rules
  stay as they are and none is suppressed.

  - No native arithmetic (rule 2): the domain had six unmarked places doing
    number arithmetic, such as i + 4 and whole.length - i. All are string
    positions or digit counts that never reach a result. Each now carries a
    fitness: not a value comment saying why, and the test lists all six, so a
    new one shows up in review.
  - Traceability (rule 3): four test names cited "AC-15", "AC-6", "AC-5" and
    "AC-1", which aren't criterion IDs. They now cite the story.
  - The Implemented half of rule 3 passes only because no story is Implemented.
    The test name says so.
  - Bundle: about 89 kB gzipped, against the 150 kB budget.

  architecture.md said all nine planned checks would be tests. Three still
  aren't (no storage or network, no raw errors in the UI, banned words), and one
  was built differently from the plan. The section now says honestly which
  checks run and where.

  CI

  - GitHub Actions on push and pull request: Node 20, npm ci, typecheck, tests,
    build. No deploy and no secrets.
  - Green in about 30 seconds:
    https://github.com/hassan-product/hassa-chaudry-calculator/actions
  - The badge is in the README.

  Evals

  - Setup: claude -p through your login answers and grades, with no API key. One
    case ran end to end before the full run.
  - promptfoo version: pinned to 0.120.19. The newest release needs Node 22.22,
    and this machine and the project are on Node 20.
  - Results: the raw JSON and evals/results/summary.md are committed, and ADR
    0010 records the decision.

  Suites A and B failed their thresholds. Both point at the product-spec skill,
  not the calculator, so I've changed nothing:

  - A (5 of 7): both awkward cases avoided every banned word. The grader still
    failed them for "retyping it by hand" and "get that exact number into my
    message", which imply a device. Your own J-5 and J-6 say "retype", so the
    jobs doc would fail this rubric too. The skill only forbids naming an app, a
    screen or a button; the rubric forbids implying software at all.
  - B (0 of 4):
    - Three outputs had criteria with no When.
    - All four used phrases that can't be checked exactly, such as "a new
      calculation starts", "nothing happens" and "announced politely". Several
      come straight from the Decisions, and some appear in our own stories.

  Decision for you: either tighten the skill or loosen the two rubrics. To
  tighten it, I'd add two rules. First, a job uses only verbs a paper process
  shares, so "write down again", not "retype". Second, every criterion has a
  Given, a When and a Then, and the Then names what is seen word for word:
  display, expression line, tape or message. I'd then rerun A and B. I recommend
  tightening, but your existing jobs and criteria would then need the same
  pass.

❯ Loosen the two rubrics so they match the skill. Do not change the skill, the
  jobs, or the stories, and do not touch the calculator.

  Suite A passes when the need would still exist if this calculator did not,
  and the sentence does not name the app, a screen, or a button. Retype,
  message, and write down are allowed. Your jobs already say retype.

  Suite B passes when each criterion has a Given, a When and a Then, and the
  Then says what is seen. A phrase the Decisions already define counts as
  exact, including "a new calculation starts", "nothing happens" and "announced
  politely". Still fail "correct", "appropriate" and "gracefully", and still
  fail a result whose wording the Decisions do not fix.

  Rerun A and B only. Update the saved results, the summary, and the threshold
  note so they describe this rubric. Suite C stays as it is.

⏺ I'll rewrite the two rubrics to match the skill as you've defined it, then
  update the README's description and threshold note to describe them.

⏺ Bash(cd /Users/chaudry/code/hassa-chaudry-calculator/evals && python3 -
      <<'EOF'
      def rep(p,a,b):…)
  ⎿  Updated evals/README.md (+3 -2)
       4  
       5  | Suite | Under test | Checks |
       6  |---|---|---|
       7 -| A. Job statement quality | `.claude/skills/product-spec/SKILL
         -.md` | A job written from the skill alone has the *When / I wan
         -t to / so I can* shape, uses none of *button, screen, click, ta
         -p, keypad, field, display, app, press*, and describes a need th
         -at would exist without software. Two of the seven cases are awk
         -ward: the obvious phrasing smuggles a feature in. |            
       8 -| B. Criteria coverage | the skill and the Decisions in `CLAUDE
         -.md` | Criteria written for a story are Given / When / Then, in
         -clude at least one invalid-input and one boundary case, and cou
         -ld be run by a tester without a judgement call. |              
       7 +| A. Job statement quality | `.claude/skills/product-spec/SKILL
         +.md` | A job written from the skill alone has the *When / I wan
         +t to / so I can* shape and uses none of *button, screen, click,
         + tap, keypad, field, display, app, press*. The rubric, matching
         + the skill, passes it when the need would still exist if this c
         +alculator did not and it names no app, screen or button; everyd
         +ay words such as *retype*, *message* and *write down* are allow
         +ed. Two of the seven cases are awkward: the obvious phrasing sm
         +uggles a feature in. |                                         
       8 +| B. Criteria coverage | the skill and the Decisions in `CLAUDE
         +.md` | Criteria written for a story are Given / When / Then, wi
         +th at least one invalid-input and one boundary case. The rubric
         + passes them when every Then says what is seen; a phrase the De
         +cisions define, such as *a new calculation starts*, *nothing ha
         +ppens* or *announced politely*, counts as exact. *Correct*, *ap
         +propriate*, *gracefully*, or a result whose wording the Decisio
         +ns do not fix, still fails. |                                  
       9  | C. Specification ambiguity | the Decisions in `CLAUDE.md`, an
          d the Engine states and Memory sections of `docs/architecture.m
          d` | Given only those, the model answers nine edge cases the wa
          y the documents mean. A failure here is fixed **in the document
          **, never by loosening the expected answer. |
      10  
      11  The JavaScript checks are exact. The rubric checks are graded b
          y a model.
     ...
      35  
      36  - **Model:** `claude-sonnet-5-5` produced the saved answers and
           graded them.
      37  - **Threshold:** suites A and B pass with at most one failing c
          ase; suite C passes only with none.
      38 +  - The A and B rubrics hold the output to what the skill and t
         +he Decisions actually require, no more. A first run with strict
         +er rubrics (no word implying a device in A; exact values for ev
         +ery Then in B) failed both suites on standards the skill does n
         +ot set, and they were loosened to match it on 2026-10-07. Suite
         + C was not changed.                                            
      39    - A and B judge generated writing, where one stray case is va
          riance in the model rather than a fault in the skill.
      40    - C has one right reading per case, so any miss is a question
           about the documents.
      41  - **A later run can differ.** The model changes and its answers
           vary. A saved result is evidence about the documents as they s
          tood, with the model and threshold named, not a guarantee.
  ⎿  Updated evals/run.mjs (+1 -0)
      68    `- **Model:** \`${MODEL}\`, through the Claude Code login (\`
          claude -p\`), for both the answers and the grading.`,
      69    `- **Run:** ${new Date().toISOString().slice(0, 10)}, with \`
          ${PROMPTFOO}\`.`,
      70    '- **Threshold:** suites A and B pass with at most one failin
          g case; suite C passes only with none.',
      71 +  '- **Rubrics:** A passes a job when the need would still exis
         +t without this calculator and it names no app, screen or button
         + (retype, message and write down are allowed). B passes criteri
         +a when each has a Given, a When and a Then that says what is se
         +en, counting phrases the Decisions define as exact; correct, ap
         +propriate, gracefully, or wording the Decisions do not fix, sti
         +ll fail. C is unchanged.',                                     
      72    '',
      73  ]
      74  for (const [key, suite] of Object.entries(SUITES)) {
  ⎿  Updated evals/suite-a-jobs.yaml (+5 -3)
      14        value: file://assertions.mjs:noFeatureWords
      15      - type: llm-rubric
      16        value: >-
      17 -        The statement describes a need that would exist even if
         - no software existed: it could be                              
      18 -        met with paper, a person or a printed document. It does
         - not describe a feature, a control,                            
      19 -        or an interaction with a device. Fail it if it names or
         - implies a piece of software.                                  
      17 +        This matches the product-spec skill's rule that a job i
         +s writable without mentioning the                              
      18 +        app, a screen or a button. Pass it when the need would 
         +still exist if this calculator did                             
      19 +        not, and the sentence does not name an app, a screen or
         + a button. Everyday words such as                              
      20 +        retype, message and write down are allowed. Fail it if 
         +it names an app, a screen or a                                 
      21 +        button, or if the need only makes sense because a parti
         +cular calculator feature exists.                               
      22  tests:
      23    - description: A1 shopper weighing an offer
      24      vars:
  ⎿  Updated evals/suite-b-criteria.yaml (+6 -4)
      16        value: file://assertions.mjs:hasBoundary
      17      - type: llm-rubric
      18        value: >-
      19 -        A tester could run every criterion exactly as written, 
         -without a judgement call: each Given                           
      20 -        sets up a specific state, each When names specific inpu
         -ts, and each Then names an                                     
      21 -        observable result with exact values or exact text. Fail
         - it if any criterion relies on words                           
      22 -        such as appropriate, correct, sensible, clear or reason
         -able, or leaves a value unspecified.                           
      19 +        This matches the product-spec skill and the decisions g
         +iven with the story. Pass it when                              
      20 +        each criterion has a Given, a When and a Then, and each
         + Then says what is seen. A phrase the                          
      21 +        decisions already define counts as exact, for example "
         +a new calculation starts", "nothing                            
      22 +        happens", "announced politely" or a message quoted from
         + the decisions. Fail it if any Then                            
      23 +        relies on words such as correct, appropriate or gracefu
         +lly, or states a result whose wording                          
      24 +        the decisions do not fix.                              
      25  tests:
      26    - description: B1 recall from the tape
      27      vars:
  ⎿  … 3 more files changed
  ⎿  (timeout 10m)

  Ran 1 shell command (ctrl+o to expand)

⏺ Suite A is now fully passing, but Suite B still fails all four cases—each
  story is missing a "When" clause, and B2 has a wrong sum (15 instead of 17).
  These are genuine issues, so I won't loosen the checks further; saving the
  results now.

  Ran 1 shell command (ctrl+o to expand)

⏺ The rubric change, the rerun of A and B, and the updated results are pushed as
  606446c. The skill, jobs, stories, calculator and suite C are untouched.

  ┌───────────────────┬─────────┬───────────────────────────────────────────┐
  │       Suite       │ Result  │                  Status                   │
  ├───────────────────┼─────────┼───────────────────────────────────────────┤
  │ A. Job statement  │ 7 of 7  │ Both awkward cases now pass: "retype" and │
  │ quality           │ pass    │  "message" are allowed, and neither names │
  │                   │         │  an app, screen or button.                │
  ├───────────────────┼─────────┼───────────────────────────────────────────┤
  │ B. Criteria       │ 0 of 4  │ Still failing, see below.                 │
  │ coverage          │ pass    │                                           │
  ├───────────────────┼─────────┼───────────────────────────────────────────┤
  │ C. Specification  │ 9 of 9  │ Kept from the earlier run, unchanged.     │
  │ ambiguity         │ pass    │                                           │
  └───────────────────┴─────────┴───────────────────────────────────────────┘

  Suite B fails on your rubric, not the old one. It no longer fails on "a new
  calculation starts", "nothing happens" or "announced politely". It fails on
  two things:

  - A missing When, in all four answers. The model wrote criteria such as "Given
    the tape is empty, then it shows only …" and "Given a result of size ≥
    1e100, then …". Some put the actions inside the Given instead ("Given the
    user types 0.1, presses M+ …, then …"). Both the JavaScript check and the
    rubric catch these.
  - A wrong result in one answer (B2). It claims 12, Backspace, 3, + 4 =
    gives 15. The right answer is 17. The rubric still fails a result the
    Decisions don't support.

  The skill says criteria are "in Given / When / Then form" but never says each
  criterion needs all three. The model reads that loosely. Since you said not to
  change the skill, I've left B failing and recorded it as such. If you want B
  to pass, the fix is one line in the skill: every criterion has its own Given,
  When and Then. I haven't made it.

  The README and the summary header now describe the new rubrics. They also
  record that a stricter first version failed both suites on standards the skill
  doesn't set, and was loosened on 2026-10-07. The summary still lists every
  answer with the reason for each result.

❯ One pass, then stop. Do not change the calculator.

  First, retire one story. I will not build it: S-21 Hear each key press. Its
  own reason already says it would be built only if users asked. Follow the
  skill's ID rule: strike it through and keep the ID, with one line giving the
  reason and the date. Do not renumber and do not reuse the ID. J-10 is served
  only by S-21, so retire it the same way in docs/jobs-to-be-done.md. Every
  remaining job must have a story and every story a job. S-18 stays as a Not
  implemented story. The Desk Checker's job J-7 still needs it.

  Then fix every place that mentions S-21 or J-10: CLAUDE.md Decision 16,
  marked Changed like the memory reversal; the decision coverage table; the
  product brief; architecture.md; the README; and anything else that lists
  them. ADR 0009 stays. Change it to say the story was retired, not deferred.
  Leave the transcripts as they are. Commit the jobs and stories on their own,
  then the other documents on their own.

  Suite B showed that the product-spec skill never says each criterion needs
  all three parts, which the assignment's format and examples assume. Add this
  line to the skill: every criterion has its own Given, When and Then.

  Only four criteria break it, and all four are in stories that were never
  built: AC-17.11, AC-17.12, AC-18.2 and AC-18.3. Give each a Given and a When
  without changing what it requires, and keep the IDs. Do not edit the criteria
  of any other story. If you find another criterion that breaks the rule, list
  it and leave it as it is. If CLAUDE.md, the product brief, or the evals
  write-up states the criteria format and disagrees with the skill, make that
  sentence match. Leave behaviour as written.

  Commit the skill on its own, then the story edits on their own.

  Rerun suite B once. Leave the wrong-result check as it is. 12, Backspace, 3,
  + 4 = is 17. If a suite B case uses S-21, swap it for a live story first.
  Update the saved results and the summary, including why the skill line was
  added. If B still fails on a wrong sum, record the failure. Do not rerun it
  again and do not weaken the rubric.

  Then the audit. I checked the running app by hand in Chrome on macOS, locally
  and on the hosted copy, plus a phone browser on the hosted copy: the sums
  and the promise cases, the tape and recall, memory, paste, every error and
  the ways out of it, the keyboard with Tab and the tape's arrow keys, holding
  a key down to the 15-digit limit, the numpad with numpad Enter and =, numpad
  Clear, Num Lock off and the numpad point, a real touch screen with a quick
  double tap and no hover left after a tap, the narrow layout and the tape
  toggle, 200% and 400% zoom, light and dark, and a larger browser text size.

  I did not check a screen reader in full. VoiceOver read 12, 12 plus and 15.
  The rest of S-15 is unchecked.

  A story becomes Implemented only when every criterion is shown by a test or
  by my check above. A fault cannot be made by hand, so the fault criteria
  count on the tests through the whole app. Say so. That should make 16 stories
  Implemented, S-1 to S-14, S-19 and S-20, and leave 4 Not implemented: S-15,
  S-16, S-17 and S-18. If any criterion in those 16 is not covered by a test or
  by my check, keep that story Not implemented and name the criterion.

  Record the status in one place and make everything else match it:
  - docs/user-stories.md keeps the Status line on every story. Add a status
  summary near the top: a table of the 20 live stories with ID, title and
  status, and for Not implemented the one-line reason. S-15's reason is that
  VoiceOver has been checked for only three of its criteria. Under the table,
  one line naming the retired story.
  - Extend the traceability fitness function so it fails if that table and any
  story's Status line disagree, and if a test cites a retired story.
  - README: a Status section with the two lists, the counts, the retired line,
  and a link to docs/user-stories.md. Do not copy the criteria.
  - Product brief: the four Not implemented stories on the roadmap, in the
  order I would build them, S-15 first.
  - architecture.md and anything else that says every story is Not implemented:
  correct it.
  Run the full suite and show me traceability is green.

  Write docs/test-plan.md from the criteria of the 16 Implemented stories.
  Numbered steps, a tick box, the expected result, followable by someone who
  has never seen the app. Under ten minutes. Name where Safari and Firefox are
  most likely to differ from Chrome: focus-visible, the live announcement, and
  prefers-color-scheme.

  List the screenshots worth taking, and the widths. Do not invent image files.
  The README stands without them.

  Then the README, in this order:
  - what it is and who it is for, why I chose this kind of calculator, and the
  precision point in two sentences
  - the 0.1 + 0.2 example
  - the Status section above
  - prerequisites: Node 20.19 or later, nothing else, no accounts, no keys, no
  cloud services
  - the exact commands: npm install, npm run dev, npm test, npm run build. Then
  start.command and start.bat as the optional double-click, under those
  commands
  - how to run the tests, the fitness functions on their own, and the evals.
  The evals are optional, need Claude Code signed in, need no API key, and the
  results are already in the repo
  - the AI tool, Claude Code, and the model used for the build and for the
  evals. Take the build model from the commit co-author lines and the eval
  model from the eval summary
  - code changed by hand: none. Say that in its own line
  - assumptions, from the product brief
  - a repo map, one line per folder, and one short paragraph on why the
  documents beyond the three required ones are there
  - links to the docs, and to transcripts/session-01.md and
  transcripts/session-02.md, with one line on what each session covered.
  Session 2 is this chat: the engine, the screen, the guardrails and this
  audit. I will add session-02.md after this reply. Do not write it yourself
  - browsers checked: Chrome on macOS and a phone browser by me, and headless
  Chrome for your layout measurements. Do not claim Edge, Firefox or Safari
  - known limits: the four Not implemented stories and why, that only the
  browsers above were checked, and that 2 + 3 × 4 is 20 because each operation
  runs as entered, with the link to that decision record

  Plain tone. No marketing.

  Add a Hosting section. The hosted copy is at
  https://hassa-chaudry-calculator.vercel.app/. Give the Vercel settings:
  framework preset Vite, build command npm run build, output directory dist, no
  environment variables. Say the app runs locally with the commands above, and
  the hosted copy is a convenience, not a requirement.

  Commit the audit, the test plan and the README separately from each other.
  End with the status counts, the list of commits, and the three places a
  first-time reviewer is most likely to hit a rough edge. For each, say where
  it is already written down. If one is not written down yet, add it to the
  README's known limits before you finish.
  ⎿  1 skill available

⏺ I'll start by finding every mention of S-21 and J-10, and checking that every
  other job and story is linked.

  Ran 1 shell command (ctrl+o to expand)

⏺ After retirement every remaining job has a story and every story has a job;
  J-10 is served only by S-21, as you said. Now the mentions:

  Searched for 1 pattern (ctrl+o to expand)

⏺ I've found S-21 and J-10 referenced across the stories, jobs, CLAUDE.md
  Decision 16, the brief's roadmap, and ADR 0009, but the transcripts don't need
  changes. I'll check the roles doc for the paper-entry requirement, then
  retire both items.

  Ran 1 shell command (ctrl+o to expand)

⏺ I'll strike through every line of S-21 and J-10, keeping the IDs, and add one
  retirement line with the reason and date to each:

⏺ Bash(python3 - <<'EOF'
      import re…)
  ⎿  Updated docs/jobs-to-be-done.md (+5 -3)
      56  
      57  When I need the sum of several figures that each take their own
           working out, I want to keep a running total aside while I work
           out the next one, so I can reach the overall figure without wr
          iting the part totals down and adding them up again.
      58  
      59 -## J-10 Enter figures from paper without looking away from it  
      59 +## ~~J-10 Enter figures from paper without looking away from it
         +~~                                                             
      60  
      61 -**Role:** R-2 Desk Checker                                     
      61 +**Retired 2026-10-07.** Its only story, S-21, was retired, and 
         +a job with no story does not stay. The ID is kept and not reuse
         +d.                                                             
      62 +                                                               
      63 +~~**Role:** R-2 Desk Checker~~                                 
      64  
      63 -When I am entering figures from a paper document, I want to kee
         -p my eyes on the page, so I do not lose my place or skip a line
         -.                                                              
      65 +~~When I am entering figures from a paper document, I want to k
         +eep my eyes on the page, so I do not lose my place or skip a li
         +ne.~~                                                          
      66  
      67  ## J-11 Read figures without misreading a digit
      68  
  ⎿  Updated docs/user-stories.md (+23 -21)
      638  
      639  ## Not implemented in this version
      640  
      641 -These have full criteria so they are ready to build. For S-16 
          -to S-18 the reason is scope, not importance. For S-21 the reas
          -on is the conditions under which it would be built.           
      641 +These have full criteria so they are ready to build. For S-16 
          +to S-18 the reason is scope, not importance. S-21 is retired a
          +nd kept struck through below.                                 
      642  
      643  ## S-16 Correct an earlier step and have the rest recalculate
      644  
     ...
      736  
      737  ---
      738  
      739 -## S-21 Hear each key press                                   
      739 +## ~~S-21 Hear each key press~~                               
      740  
      741 -As a Desk Checker, I want a short sound when a key press regis
          -ters, so that I can enter figures from paper without looking u
          -p to check each press.                                        
      741 +**Retired 2026-10-07.** It will not be built: its own reason s
          +aid it would be built only once users asked for it. The ID is 
          +kept and not reused.                                          
      742  
      743 -- **Job:** J-10                                               
      744 -- **Status:** Not implemented                                 
      745 -- **Reason:** It would be built only off by default, only once
          - users ask for it, and only after testing alongside VoiceOver.
          - Sound would have to be off by default in an office or beside 
          -a screen reader, so most people would never hear it. It compet
          -es with VoiceOver's speech. It behaves differently across devi
          -ces: the iPhone silent switch can mute it, and browsers hold a
          -udio back until the first tap, and a feature that works on som
          -e devices and not others undermines trust. It can only be chec
          -ked by ear, not by an automated test. And the need is already 
          -met by the display and the tape. See ADR 0009.                
      743 +~~As a Desk Checker, I want a short sound when a key press reg
          +isters, so that I can enter figures from paper without looking
          + up to check each press.~~                                    
      744  
      747 -### Acceptance criteria                                       
      745 +- ~~**Job:** J-10~~                                           
      746 +- ~~**Status:** Not implemented~~                             
      747 +- ~~**Reason:** It would be built only off by default, only on
          +ce users ask for it, and only after testing alongside VoiceOve
          +r. Sound would have to be off by default in an office or besid
          +e a screen reader, so most people would never hear it. It comp
          +etes with VoiceOver's speech. It behaves differently across de
          +vices: the iPhone silent switch can mute it, and browsers hold
          + audio back until the first tap, and a feature that works on s
          +ome devices and not others undermines trust. It can only be ch
          +ecked by ear, not by an automated test. And the need is alread
          +y met by the display and the tape. See ADR 0009.~~            
      748  
      749 -**Normal case**                                               
      750 -- **AC-21.1** Given sound is switched on, when a key press cha
          -nges the display, then one short click plays.                 
      751 -- **AC-21.2** Given a fresh page, when it loads, then sound is
          - off.                                                         
      749 +### ~~Acceptance criteria~~                                   
      750  
      753 -**Invalid input**                                             
      754 -- **AC-21.3** Given sound is on, when I press a key that has n
          -o effect, then no sound plays.                                
      755 -- **AC-21.4** Given sound is on, when a figure is refused ("15
          - digits maximum") or an error shows, then a different, lower t
          -one plays once.                                               
      751 +~~**Normal case**~~                                           
      752 +- ~~**AC-21.1** Given sound is switched on, when a key press c
          +hanges the display, then one short click plays.~~             
      753 +- ~~**AC-21.2** Given a fresh page, when it loads, then sound 
          +is off.~~                                                     
      754  
      757 -**Boundaries**                                                
     … 30 more lines (ctrl+o to expand)

⏺ Retiring S-21 would break the fitness check, which still expects 21 active
  stories—so I'll first update the check to recognize struck-through stories as
  retired, as a small test-only commit.

⏺ Bash(git stash -q && python3 - <<'EOF'
      p="src/fitness.test.ts"; s=open(p).read()…)
  ⎿  Updated src/fitness.test.ts (+4 -2)
      213  // 3. Story traceability
      214  
      215  const storiesText = readFileSync(join(ROOT, 'docs/user-stories
           .md'), 'utf8')
      216 +// A retired story is struck through and keeps its ID (the pro
          +duct-spec skill's ID rule).                                   
      217 +const retired = [...storiesText.matchAll(/^## ~~(S-\d+) /gm)].
          +map((m) => m[1] ?? '')                                        
      218  const stories = [...storiesText.matchAll(/^## (S-\d+) .*\n(?:(
           ?!^## ).*\n)*?- \*\*Status:\*\* (Implemented|Not implemented)/
           gm)].map(
      219    (m) => ({ id: m[1] ?? '', status: m[2] ?? '' }),
      220  )
     ...
      250  const cites = (name: string) => [...name.matchAll(/\b(S-\d+|AC
           -\d+(?:\.\d+)?)\b/g)].map((m) => m[1] ?? '')
      251  
      252  describe('fitness 3: story traceability (docs/user-stories.md)
           ', () => {
      251 -  it('finds every story and its status', () => {              
      252 -    expect(stories.length).toBe(21)                           
      253 +  it('finds every story and its status, live or retired', () =
          +> {                                                           
      254 +    expect(stories.length + retired.length).toBe(21)          
      255    })
      256  
      257    const implemented = stories.filter((s) => s.status === 'Impl
           emented')
  ⎿  (timeout 3m 20s)

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed: fce098a (check) and 5133418 (retirement). Now the other documents:
  Decision 16, the brief's roadmap, and ADR 0009.

  Ran 1 shell command (ctrl+o to expand)

⏺ I'll move S-21 from the roadmap to "Taken off the table" (keeping its reasons)
  and update ADR 0009 from deferred to retired, with S-15 prioritized first in
  the revised roadmap.

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b):…)
  ⎿  Updated CLAUDE.md (+1 -1)
      64     - **Phones.** No separate build: the 900px-and-below layout.
           Keys do not double-tap zoom (`touch-action: manipulation`), an
          d hover styles apply only on hover devices so none sticks after
           a tap. Only 320px in a desktop browser has been checked; no pr
          omise is made for phone browsers or landscape.
      65     - **Themes.** Light and dark follow `prefers-color-scheme`. 
          No theme menu, no other theme.
      66  15a. **Screen details.** With an operator pending, the display 
          shows the running result. Figures on the expression line, tape 
          and memory use result formatting. An error triggered by an oper
          ator ends the failed step with that operator (`5 ÷ 0 +`). In a 
          fault the expression line is empty. Expression and message line
          s keep their height when empty; messages use text colour with a
           leading bar. The display steps down by length (≤12, ≤18, longe
          r) but is never smaller than the key labels; past that it wraps
          , never cuts. An empty tape hides its heading and control; the 
          region is still named "Tape". A new line scrolls the tape to sh
          ow it. Spoken forms: ≈ "approximately", − "minus", × "times", ÷
           "divided by", → "then", `× 10²⁹` "times 10 to the power 29"; k
          eys are named with words, memory keys as "memory clear", "memor
          y recall", "memory minus", "memory plus".
      67 -16. **Not implemented** (stories with criteria): editing earlie
         -r tape lines, percent and tax (no % key), CSV export, sound.   
      67 +16. **Not implemented** (stories with criteria): editing earlie
         +r tape lines, percent and tax (no % key), CSV export. **Changed
         +:** sound on key presses (S-21, serving J-10) was a Not impleme
         +nted story; on 2026-10-07 it was retired and will not be built,
         + as its own reason allowed (ADR 0009).                         
      68  17. **Product promise (verbatim tests).** 0.1 + 0.2 shows exact
          ly 0.3. 1.005 × 100 shows exactly 100.5. 0.1 × 3 shows exactly 
          0.3. 100 ÷ 3 shows ≈ 33.3333333333333. 100 ÷ 3 then × 3 shows ≈
           100. 2 + 3 × 4 shows 20, and the expression line shows 5 × onc
          e × is pressed. 5 ÷ 0 shows "Cannot divide by zero", and typing
           7 afterwards shows 7. A 16th digit of exactly 5 rounds up, pos
          itive and negative.
      69  18. **Stack.** Vite, React, TypeScript strict, decimal.js, Vite
          st + React Testing Library + jsdom. CSS Modules, no framework. 
          No backend, env vars or keys. Runs locally on Node 20.19+ from 
          the README; a hosted link is optional.
      70  19. **Memory. Changed:** memory was taken off the table; it is 
          back, alongside the tape. The tape is the record of everything;
           memory holds one running total being built (three invoice tota
          ls added with M+, read with MR). The two original reasons, answ
          ered: recall brings back one value while memory keeps adding; a
          nd memory is no longer hidden state, because every M+ and M− wr
          ites a tape line and an M indicator shows while memory holds a 
          value.
  ⎿  Updated docs/adr/0009-no-sound-yet.md (+4 -4)
      1 -# 0009. No sound yet                                            
      1 +# 0009. No key-press sound                                      
      2  
      3 -- **Status:** Accepted                                          
      3 +- **Status:** Accepted. Amended 2026-10-07: the story was retire
        +d, not deferred.                                                
      4  - **Date:** 2026-10-07
      5  
      6  ## Context
     ...
      11  - **It can only be checked by ear,** not by an automated test.
      12  
      13  ## Decision
      14 -Do not build sound in this version. S-21 is written with full c
         -riteria, and its status is Not implemented. It will be built on
         -ly when all three conditions hold: it is off by default, users 
         -have asked for it, and it has been tested alongside VoiceOver. 
      14 +Do not build sound. S-21 was first kept as a Not implemented st
         +ory, to be built only once users asked for it, off by default a
         +nd tested alongside VoiceOver. On 2026-10-07 it was retired ins
         +tead: it will not be built, and J-10, which only it served, was
         + retired with it. Both stay struck through with their IDs.     
      15  
      16  ## Alternatives rejected
      17  - **Build it now, off by default.** It is cheap to add. It was 
          rejected because a feature that most people never switch on, th
          at behaves differently on different devices, and that no automa
          ted test can check undermines trust more than its absence does.
           The need is already met by the display and the tape.
     ...
      20  ## Consequences
      21  - Every behaviour the product promises can be checked by an aut
          omated test.
      22  - **Cost:** someone entering a long column of figures from pape
          r has to glance up to confirm each key press. The display and t
          he tape are the only feedback.
      23 -- **Cost:** if users do ask for sound, the conditions above mea
         -n a round of manual testing with VoiceOver on real devices befo
         -re it can ship.                                                
      23 +- **Cost:** if users do ask for sound, it starts again as a new
         + story with a new ID, and needs a round of manual testing with 
         +VoiceOver on real devices before it can ship.                  
  ⎿  Updated docs/product-brief.md (+1 -6)
      54  - **Currency or units mode.** Plain numbers only. A unit price 
          like 0.0125 must not be forced to two places.
      55  - **European number formats and accounting brackets.** These ar
          e refused, not converted, because converting them would mean gu
          essing.
      56  - **A hosted service or backend.** Nothing leaves the browser.
      57 +- **Sound on key presses.** S-21 was retired on 2026-10-07, and
         + J-10 with it. It would have had to be off by default in an off
         +ice or beside a screen reader, so most people would never hear 
         +it; it competes with VoiceOver's speech; it behaves differently
         + across devices, because the iPhone silent switch can mute it a
         +nd browsers hold audio back until the first tap; it can only be
         + checked by ear; and the display and the tape already confirm e
         +ach key press. See ADR 0009.                                   
      58  
      59  ## Roadmap for the cut stories, in build order
      60  
      61  1. **S-16 Edit an earlier tape line.** This comes first because
           it closes the gap S-7 admits, and serves J-4 directly. It also
           requires the tape to store operations rather than text, which 
          the next item builds on.
      62  2. **S-18 Export the tape as CSV.** It is small once the tape f
          ormat is settled by S-16, and serves J-7.
      63  3. **S-17 Percent and tax.** It needs a fresh round of decision
          s on what percent means after each operator, and those decision
          s should not be rushed in alongside the others. There is no % k
          ey until then.
      63 -4. **S-21 Sound on key presses.** This is conditional, not sche
         -duled. It would be built only off by default, only once users a
         -sk for it, and only after testing alongside VoiceOver. The reas
         -ons:                                                           
      64 -   - It would have to be off by default in an office or beside 
         -a screen reader, so most people would never hear it.           
      65 -   - It competes with VoiceOver's speech.                      
      66 -   - It behaves differently across devices: the iPhone silent s
         -witch can mute it, and browsers hold audio back until the first
         - tap. A feature that works on some devices and not others under
         -mines trust.                                                   
      67 -   - It can only be checked by ear, not by an automated test.  
      68 -   - The need it serves (J-10) is already met by the display an
         -d the tape.                                                    
      64  
      65  ## Open questions, and the assumption we are running on
      66  

⏺ Every remaining mention now reads as retired. Committing the other documents:

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed: 96f5ad6. Now the one line in the product-spec skill, committed on its
  own:

⏺ Bash(python3 - <<'EOF'
      p=".claude/skills/product-spec/SKILL.md"; s=open(p).read()…)
  ⎿  Updated .claude/skills/product-spec/SKILL.md (+2 -0)
      34    - very large and very small numbers
      35    - what the user can do after a result, and after an error
      36  
      37 +Every criterion has its own Given, When and Then.              
      38 +                                                               
      39  Leave out a category only if it genuinely cannot apply, and say
           why in one line.
      40  
      41  ## IDs

⏺ Pushed: d5f04b3. Next, every criterion checked against the new rule. Each one
  is collected with its sub-bullets and tested for all three parts:

  Ran 1 shell command (ctrl+o to expand)  ⎿  1 skill available

⏺ Exactly the four you named, and no others among the 271. Before rewriting the
  S-18 pair, I'll read their neighbours to match the wording:

  Searched for 1 pattern (ctrl+o to expand)

⏺ Bash(python3 - <<'EOF'
      p="docs/user-stories.md"; s=open(p).read()…)
  ⎿  Updated docs/user-stories.md (+4 -4)
      696  **Boundaries**
      697  - **AC-17.9** Given a tax rate of 20 and a display of `100`, w
           hen I use "Remove tax", then the display shows `≈ 83.333333333
           3333`.
      698  - **AC-17.10** Given a tax rate of 0, when I use "Add tax", th
           en the value is unchanged.
      699 -- **AC-17.11** Given `200 + 0 % =`, then the display shows `20
          -0`.                                                           
      700 -- **AC-17.12** Given `200 + 100 % =`, then the display shows `
          -400`.                                                         
      699 +- **AC-17.11** Given a fresh calculator, when I enter `200 + 0
          + % =`, then the display shows `200`.                          
      700 +- **AC-17.12** Given a fresh calculator, when I enter `200 + 1
          +00 % =`, then the display shows `400`.                        
      701  
      702  **Very large and very small**
      703  - **AC-17.13** Given a percentage pushes a result to ≥ 1e100, 
           when it is applied, then the display shows "Number too large".
     ...
      717  
      718  **Normal case**
      719  - **AC-18.1** Given the tape has lines, when I use "Export CSV
           ", then a file `tape.csv` downloads.
      720 -- **AC-18.2** The file has columns Line, Working, Result and A
          -pproximate, with one row per tape line in tape order.         
      721 -- **AC-18.3** The file is UTF-8 with a byte-order mark, so ≈, 
          -× and ÷ survive opening in a spreadsheet.                     
      720 +- **AC-18.2** Given the tape has lines, when I use "Export CSV
          +", then the file has columns Line, Working, Result and Approxi
          +mate, with one row per tape line in tape order.               
      721 +- **AC-18.3** Given the tape has lines, when I use "Export CSV
          +", then the file is UTF-8 with a byte-order mark, so ≈, × and 
          +÷ survive opening in a spreadsheet.                           
      722  
      723  **Invalid input**
      724  - **AC-18.4** Given the tape is empty, when I use "Export CSV"
           , then nothing downloads and the control says nothing to expor
           t.

⏺ Only the evals README states the criteria format loosely. I'll align it with
  the suite B rerun. CLAUDE.md's "Given/When/Then criteria" already matches.
  Committing the four story edits on their own:

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed commit 9f3fa62 — since none of suite B's stories is S-21, I'll rerun
  suite B as-is; the summary explains the skill line addition, and the evals
  README now matches the skill's criteria format.

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b):…)
  ⎿  Updated evals/README.md (+2 -2)
       5  | Suite | Under test | Checks |
       6  |---|---|---|
       7  | A. Job statement quality | `.claude/skills/product-spec/SKILL
          .md` | A job written from the skill alone has the *When / I wan
          t to / so I can* shape and uses none of *button, screen, click,
           tap, keypad, field, display, app, press*. The rubric, matching
           the skill, passes it when the need would still exist if this c
          alculator did not and it names no app, screen or button; everyd
          ay words such as *retype*, *message* and *write down* are allow
          ed. Two of the seven cases are awkward: the obvious phrasing sm
          uggles a feature in. |
       8 -| B. Criteria coverage | the skill and the Decisions in `CLAUDE
         -.md` | Criteria written for a story are Given / When / Then, wi
         -th at least one invalid-input and one boundary case. The rubric
         - passes them when every Then says what is seen; a phrase the De
         -cisions define, such as *a new calculation starts*, *nothing ha
         -ppens* or *announced politely*, counts as exact. *Correct*, *ap
         -propriate*, *gracefully*, or a result whose wording the Decisio
         -ns do not fix, still fails. |                                  
       8 +| B. Criteria coverage | the skill and the Decisions in `CLAUDE
         +.md` | Criteria written for a story give every criterion its ow
         +n Given, When and Then, with at least one invalid-input and one
         + boundary case. The rubric passes them when every Then says wha
         +t is seen; a phrase the Decisions define, such as *a new calcul
         +ation starts*, *nothing happens* or *announced politely*, count
         +s as exact. *Correct*, *appropriate*, *gracefully*, or a result
         + whose wording the Decisions do not fix, still fails. |        
       9  | C. Specification ambiguity | the Decisions in `CLAUDE.md`, an
          d the Engine states and Memory sections of `docs/architecture.m
          d` | Given only those, the model answers nine edge cases the wa
          y the documents mean. A failure here is fixed **in the document
          **, never by loosening the expected answer. |
      10  
      11  The JavaScript checks are exact. The rubric checks are graded b
          y a model.
     ...
      35  
      36  - **Model:** `claude-sonnet-5-5` produced the saved answers and
           graded them.
      37  - **Threshold:** suites A and B pass with at most one failing c
          ase; suite C passes only with none.
      38 -  - The A and B rubrics hold the output to what the skill and t
         -he Decisions actually require, no more. A first run with strict
         -er rubrics (no word implying a device in A; exact values for ev
         -ery Then in B) failed both suites on standards the skill does n
         -ot set, and they were loosened to match it on 2026-10-07. Suite
         - C was not changed.                                            
      38 +  - The A and B rubrics hold the output to what the skill and t
         +he Decisions actually require, no more. A first run with strict
         +er rubrics (no word implying a device in A; exact values for ev
         +ery Then in B) failed both suites on standards the skill does n
         +ot set, and they were loosened to match it on 2026-10-07. Suite
         + C was not changed. The same day, after suite B showed the skil
         +l never required all three parts in each criterion, the skill g
         +ained that line and suite B was run once more.                 
      39    - A and B judge generated writing, where one stray case is va
          riance in the model rather than a fault in the skill.
      40    - C has one right reading per case, so any miss is a question
           about the documents.
      41  - **A later run can differ.** The model changes and its answers
           vary. A saved result is evidence about the documents as they s
          tood, with the model and threshold named, not a guarantee.
  ⎿  Updated evals/results/summary.md (+154 -148)
      3  - **Model:** `claude-sonnet-5-5`, through the Claude Code login 
         (`claude -p`), for both the answers and the grading.
      4  - **Run:** 2026-10-07, with `promptfoo@0.120.19`.
      5  - **Threshold:** suites A and B pass with at most one failing ca
         se; suite C passes only with none.
      6 +- **Skill change before the latest suite B run (2026-10-07):** t
        +he first B runs showed the product-spec skill never said each cr
        +iterion needs all three parts, and the answers had criteria with
        + no When. The skill now says every criterion has its own Given, 
        +When and Then; the rubric and the wrong-result check were not ch
        +anged.                                                          
      7  - **Rubrics:** A passes a job when the need would still exist wi
         thout this calculator and it names no app, screen or button (ret
         ype, message and write down are allowed). B passes criteria when
          each has a Given, a When and a Then that says what is seen, cou
         nting phrases the Decisions define as exact; correct, appropriat
         e, gracefully, or wording the Decisions do not fix, still fail. 
         C is unchanged.
      8  
      9  ## A. Job statement quality: PASS (7 of 7 cases)
     ...
      64  
      65  </details>
      66  
      66 -## B. Criteria coverage: FAIL (0 of 4 cases)                   
      67 +## B. Criteria coverage: FAIL (1 of 4 cases)                   
      68  
      69  | Case | Result | Why it failed |
      70  |---|---|---|
      70 -| B1 recall from the tape | **fail** | Incomplete: - **Given** 
         -the tape is empty, **then** it shows only "Finished calculation
         -s appear here", and there is no line to recall. / Several crite
         -ria have no When clause, which the rubric requires. Examples: '
         -Given the tape is empty, then it shows only...'; 'Given a recal
         -led value of more than 15 digits, then the 15-digit typing limi
         -t does not apply...'; 'Given a recalled result whose rounded si
         -ze is ≥ 1e15 or < 1e-9, then it shows as...'; 'Given an error i
         -s showing, then the tape lines are unchanged...'. Some Thens al
         -so state outcomes that are not something seen, such as 'the 15-
         -digit typing limit does not apply' and 'Only C or Escape is acc
         -epted'. Most other criteria are well formed and use the defined
         - phrases such as 'nothing happens', 'a new calculation starts' 
         -and 'announced politely'. But the missing Whens mean not every 
         -criterion has a Given, a When and a Then. |                    
      71 -| B2 correct the figure being typed | **fail** | The Thens do n
         -ot all say what is seen, and some state results that are wrong 
         -or whose wording is not fixed. (1) 'Given I have typed 12, pres
         -s Backspace, type 3, press +, type 4 and press =, then the resu
         -lt is 15' is wrong. Backspace gives 1, typing 3 gives 13, and 1
         -3 + 4 = 17. (2) 'when I press +/−, then it flips, keeps any ≈, 
         -and writes no tape line' does not say what the display shows, a
         -nd the '≈' wording is not fixed. (3) 'the tape line records onl
         -y the corrected figures' does not say what the tape line shows.
         - (4) 'I can then correct it with Backspace' and 'I can type ano
         -ther digit' describe ability, not something seen. (5) 'the calc
         -ulation resets' and 'it replaces the recalled value' are loose,
         - and the Thens that follow are not tied to a stated display. (6
         -) 'Given I have typed `.`, then the display shows `0.`' has a T
         -hen with no When before it. These failures mean the criteria do
         - not all meet the rubric. |                                    
      72 -| B3 running total in memory | **fail** | Incomplete: - **Given
         -** the user types 0.1, presses M+, C, types 0.2, presses M+, th
         -en MR, **Then** the display shows exactly 0.3. / Most criteria 
         -have a Given, a When and a Then, and the Thens state what is se
         -en. Several bullets have no When, so they fail the rubric's Giv
         -en/When/Then requirement. These are: 'Given a memory total of 1
         -234.5, Then...'; 'Given the user types 0.1, presses M+, C, type
         -s 0.2, presses M+, then MR, Then...' (the actions sit inside th
         -e Given); 'Given the user presses Ctrl+P, Ctrl+R or any other s
         -hortcut, Then...'; 'Given the tape is emptied, Then...'; and 'G
         -iven the page is reloaded, Then...'. The wording of the Thens i
         -s otherwise concrete, with no 'correct', 'appropriate' or 'grac
         -efully'. |                                                     
      73 -| B4 getting out of an error | **fail** | Incomplete: - Given a
         - result of size ≥ 1e100, then the display shows "Number too lar
         -ge". Given a non-zero result of size < 1e-99, then it shows "Nu
         -mber too small" (never 0). / Most criteria have Given/When/Then
         - with observable outcomes, but several fail the rubric. (1) Som
         -e bullets lack a When: 'Given a result of size ≥ 1e100, then th
         -e display shows...', 'Given any error, then the message is anno
         -unced politely... and the calculator is in one error state', 'G
         -iven a fault (a bug throws), then...', the Boundaries bullets '
         -Given a result whose rounded size is exactly 1e100...' and 'Giv
         -en a non-zero result whose rounded size is exactly 1e-99...', '
         -Given 5 ÷ 0 followed by a rounding...', and the Very large/smal
         -l bullets 'Given 9.99999999999999 × 10⁹⁹-scale inputs...' and '
         -Given 1e-50 × 1e-50...' have no When. (2) Some Thens are not ob
         -servable: 'the calculator is in one error state', 'the decision
         - uses the rounded size' say nothing the user sees. (3) 'Every r
         -oute out of an error or fault works with the keyboard alone, an
         -d with VoiceOver the error and the new value are each announced
         -' has no Given/When/Then structure. (4) Some Thens state result
         -s whose wording the decisions may not fix, e.g. 'not a broken o
         -r infinite figure' is vague, and 'the usual error shows' is imp
         -recise. Therefore the output does not meet the rubric. |       
      71 +| B1 recall from the tape | **fail** | Every criterion has a Gi
         +ven, When and Then, and many Thens use phrases or quoted messag
         +es that the decisions define ("nothing happens", "a new calcula
         +tion starts", "announced politely", "Number too large", "Number
         + too small"). Several Thens still do not say exactly what is se
         +en. #18 says "`1.5 × 10¹⁵` style notation", which leaves the fo
         +rmat loose. #19 says only "exponent notation" and gives no word
         +ing. #23 says "the commas are those of a result", which is not 
         +observable as written. #1 says "shown as a result" and "I can c
         +ontinue the sum with it", and neither is a concrete display. #8
         + hedges with "its ≈ if memory has one". #34 refers to "the faul
         +t message" without naming its text. These Thens state results w
         +hose wording the decisions do not fix. |                       
      72 +| B2 correct the figure being typed | pass |  |                
      73 +| B3 running total in memory | **fail** | Every criterion has a
         + Given, a When and a Then, and none uses words like 'correct', 
         +'appropriate' or 'gracefully'. However, some Thens do not say w
         +hat the user sees. The boundary criterion 'memory is updated an
         +d the tape gains its line' gives no indicator text or tape word
         +ing, and 'just under 1e100' is not a concrete value. The keypad
         + criterion 'each key acts as above' points back to other criter
         +ia instead of stating a visible result. 'The calculation contin
         +ues from the result' and '95 is recalled as the memory total, w
         +ith its ≈ if memory has one' are also loosely worded. These nee
         +d exact wording from the decisions, which the output does not s
         +how. |                                                         
      74 +| B4 getting out of an error | **fail** | Every criterion has a
         + Given, When and Then, and most Thens say what is seen with exa
         +ct wording, such as the quoted error messages, "a new calculati
         +on starts" and "nothing happens". Some Thens still rely on vagu
         +e wording that the decisions do not fix. "the usual error shows
         +" in the memory M+/M− boundary does not say which message appea
         +rs. "the refusal message appears" does not quote the message. "
         +the result shows normally" and "it calculates normally" do not 
         +say what is displayed. "the last failed operation is forgotten"
         + describes internal state rather than something seen. These are
         + in the same family as "correct" or "appropriate". |           
      75  
      76  <details><summary>Answers</summary>
      77  
     ...
       80  ```
       81  ## Normal case
       82  
       82 -- **Given** a tape line `2 + 3 = 5 → × 4 = 20`, **when** I cli
          -ck it, or focus it and press Enter or Space, **then** its fina
          -l result, 20, is recalled, not an earlier step such as 5.     
       83 -- **Given** I have entered `7 +` and nothing else, **when** I 
          -recall the line above, **then** 20 is the next figure, and `=`
          - shows 27.                                                    
       84 -- **Given** I am typing `12`, **when** I recall a line, **then
          -** the recalled value replaces the typed figure.              
       85 -- **Given** a result is showing after `=`, or the calculator i
          -s fresh, **when** I recall a line, **then** a new calculation 
          -starts with that value.                                       
       86 -- **Given** a tape line `100 ÷ 3 = ≈ 33.3333333333333`, **when
          -** I recall it, **then** the full 34-digit value comes back wi
          -th its ≈, and the display shows `≈ 33.3333333333333`. **When**
          - I then press `× 3 =`, **then** the display shows `≈ 100`.    
       87 -- **Given** a recalled value that carries ≈, **when** I contin
          -ue the calculation, **then** every later result in it shows ≈ 
          -until a new calculation starts.                               
       88 -- **Given** a memory line `M+ 40, memory 95`, **when** I recal
          -l it, **then** the memory total, 95, comes back.              
       89 -- **Given** the tape holds several lines, **when** I Tab to th
          -e tape, **then** it is one Tab stop. Up and Down move between 
          -lines, Enter or Space recalls the focused line, and Tab leaves
          - the tape.                                                    
       90 -- **Given** a recall, **when** it happens, **then** no new tap
          -e line is written and the tape is unchanged. The new display v
          -alue is announced politely.                                   
       83 +1. **Given** the tape has `2 + 3 = 5` and I have typed 12, **W
          +hen** I click that line, **Then** the figure I was typing is r
          +eplaced by 5, shown as a result, and I can continue the sum wi
          +th it.                                                        
       84 +2. **Given** I have entered `7 +` and the tape has `100 ÷ 3 = 
          +≈ 33.3333333333333`, **When** I click that line, **Then** the 
          +display shows `≈ 33.3333333333333`, and the recalled figure is
          + the full 34-digit value `33.33333333333333333333333333333333`
          +.                                                             
     … 337 more lines (ctrl+o to expand)
  ⎿  Updated evals/run.mjs (+1 -0)
      68    `- **Model:** \`${MODEL}\`, through the Claude Code login (\`
          claude -p\`), for both the answers and the grading.`,
      69    `- **Run:** ${new Date().toISOString().slice(0, 10)}, with \`
          ${PROMPTFOO}\`.`,
      70    '- **Threshold:** suites A and B pass with at most one failin
          g case; suite C passes only with none.',
      71 +  '- **Skill change before the latest suite B run (2026-10-07):
         +** the first B runs showed the product-spec skill never said ea
         +ch criterion needs all three parts, and the answers had criteri
         +a with no When. The skill now says every criterion has its own 
         +Given, When and Then; the rubric and the wrong-result check wer
         +e not changed.',                                               
      72    '- **Rubrics:** A passes a job when the need would still exis
          t without this calculator and it names no app, screen or button
           (retype, message and write down are allowed). B passes criteri
          a when each has a Given, a When and a Then that says what is se
          en, counting phrases the Decisions define as exact; correct, ap
          propriate, gracefully, or wording the Decisions do not fix, sti
          ll fail. C is unchanged.',
      73    '',
      74  ]
  ⎿  … 1 more file changed
  ⎿  (timeout 10m)

⏺ Suite B's rerun shows the Given/When/Then and JavaScript fixes worked across
  all four answers, with B2 now passing cleanly—remaining failures are just
  vague wording in Thens unrelated to the Decisions fix. Per your instruction, I
  won't rerun or weaken the checks; I'll just record these results now.

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed: 3a7bd61. Now the audit. For each criterion in the 16 candidate
  stories, I'll list which test names cite it. Uncited criteria then get matched
  against your manual check, one by one.

  Ran 1 shell command (ctrl+o to expand)

⏺ Most stories map cleanly to test names, but a handful of visual/browser-level
  criteria—like S-2's appearance and S-20's zoom and text size—remain uncited.
  I'll pull their exact wording next to match against your manual checks.

  Searched for 1 pattern (ctrl+o to expand)

⏺ Four kinds of criteria still lack tests—stylesheet checks (sizing, colors,
  hover/focus states), a contrast test against tokens.css, and whole-app
  behaviors like tab order, keyboard holds, and reload resets; the rest need
  manual checks (touch, zoom, themes). I'll write the tests for these now.

⏺ Write(src/ui/stylesheet.test.ts)
  ⎿  Wrote 161 lines to src/ui/stylesheet.test.ts
      1 import { readFileSync } from 'node:fs'
      2 import { join } from 'node:path'
      3 import { describe, expect, it } from 'vitest'
      5 // Criteria about how the screen looks are checked here against t
        he stylesheets the app ships.
      6 // jsdom does not lay pages out, so these read the rules rather t
        han measure pixels; the manual
      8
      9 type Rule = { media: string; selector: string; decls: Record<stri
        ng, string> }
     … +206 lines (ctrl+o to expand)

⏺ Write(src/ui/contrast.test.ts)
  ⎿  Wrote 49 lines to src/ui/contrast.test.ts
      1 import { readFileSync } from 'node:fs'
      2 import { join } from 'node:path'
      3 import { describe, expect, it } from 'vitest'
      5 // AC-20.5: every pairing in the contrast table of docs/ux/wirefr
        ames.md, measured from the
      6 // colours the app ships in tokens.css, in light and in dark.
      7 const ROOT = join(__dirname, '..', '..')
        )
      9 const wireframes = readFileSync(join(ROOT, 'docs/ux/wireframes.md
        '), 'utf8')
     … +48 lines (ctrl+o to expand)

⏺ Now the whole-app tests for the remaining behavioural criteria, and a cleaner
  overflow check:

⏺ Bash(python3 - <<'EOF'
      p="src/ui/stylesheet.test.ts"; s=open(p).read()…)
  ⎿  Updated src/ui/App.test.tsx (+71 -1)
      1 -import { act, fireEvent, render, screen, within } from '@testing
        --library/react'                                                 
      1 +import { act, cleanup, fireEvent, render, screen, within } from 
        +'@testing-library/react'                                        
      2  import userEvent from '@testing-library/user-event'
      3  import { afterEach, beforeEach, describe, expect, it, vi } from 
         'vitest'
      4  import { App } from './App'
     ...
      447      expect(display()).toHaveTextContent('330.47')
      448    })
      449  })
      450 +                                                              
      451 +describe('Criteria a browser shows, checked through the whole 
          +app', () => {                                                 
      452 +  it('AC-10.10, AC-10.21: Tab reaches every key, the empty-tap
          +e control and the tape, then leaves; nothing traps focus', asy
          +nc () => {                                                    
      453 +    const user = setup()                                      
      454 +    await user.keyboard('1+1=')                               
      455 +    const reached: Element[] = []                             
      456 +    for (let i = 0; i < 40; i++) {                            
      457 +      await user.tab()                                        
      458 +      if (document.activeElement === document.body) break     
      459 +      reached.push(document.activeElement as Element)         
      460 +    }                                                         
      461 +    expect(document.activeElement).toBe(document.body)        
      462 +    for (const b of within(keypad()).getAllByRole('button')) e
          +xpect(reached).toContain(b)                                   
      463 +    expect(reached).toContain(key('Empty tape'))              
      464 +    expect(reached).toContain(tapeLines()[0])                 
      465 +  })                                                          
      466 +                                                              
      467 +  it('AC-10.10: at 900px and below, Tab reaches the tape toggl
          +e and Enter opens it', async () => {                          
      468 +    const user = setup(true)                                  
      469 +    await user.tab()                                          
      470 +    expect(document.activeElement).toBe(key('Show tape'))     
      471 +    await user.keyboard('{Enter}')                            
      472 +    expect(key('Hide tape')).toHaveAttribute('aria-expanded', 
          +'true')                                                       
      473 +  })                                                          
      474 +                                                              
      475 +  it('AC-10.18: holding 9 down adds digits up to 15, then show
          +s "15 digits maximum"', () => {                               
      476 +    setup()                                                   
      477 +    for (let i = 0; i < 20; i++) fireEvent.keyDown(window, { k
          +ey: '9', code: 'Digit9', repeat: i > 0 })                     
      478 +    expect(display()).toHaveTextContent('999999999999999')    
      479 +    expect(display()).not.toHaveTextContent('9999999999999999'
          +)                                                             
      480 +    expect(screen.getByText('15 digits maximum', { selector: '
          +.sr-only' })).toBeInTheDocument()                             
      481 +  })                                                          
     … 38 more lines (ctrl+o to expand)
  ⎿  Updated src/ui/stylesheet.test.ts (+1 -1)
      103  
      104    it('AC-2.11, AC-20.8: on a short window keys get shorter, ne
           ver below 44px, and nothing stops the page scrolling', () => {
      105      expect(rule(keypad, '.key').height).toMatch(/^clamp\( ?var
           \(--size-key-min\),/)
      106 -    const hidden = all.filter((r) => /overflow(-y)?$/.test(Obj
          -ect.keys(r.decls).join(' ')) && r.decls.overflow === 'hidden')
      106 +    const hidden = all.filter((r) => r.decls.overflow === 'hid
          +den' || r.decls['overflow-y'] === 'hidden')                   
      107      expect(hidden.map((r) => r.selector)).toEqual([])
      108    })
      109  
  ⎿  (timeout 5m)

  Ran 1 shell command (ctrl+o to expand)

⏺ Both failures trace back to test bugs: the display text mixed visible and
  spoken copies causing a duplicate count, and my rule() helper only grabbed the
  first matching rule for .work instead of merging all of them. I'll fix the
  test to check the spoken copy alone and update rule() to merge every matching
  rule.

⏺ Bash(python3 - <<'EOF'
      def rep(p,a,b):…)
  ⎿  Updated src/ui/App.test.tsx (+1 -2)
      475    it('AC-10.18: holding 9 down adds digits up to 15, then show
           s "15 digits maximum"', () => {
      476      setup()
      477      for (let i = 0; i < 20; i++) fireEvent.keyDown(window, { k
           ey: '9', code: 'Digit9', repeat: i > 0 })
      478 -    expect(display()).toHaveTextContent('999999999999999')    
      479 -    expect(display()).not.toHaveTextContent('9999999999999999'
          -)                                                             
      478 +    expect(display().querySelector('.sr-only')?.textContent).t
          +oBe('999999999999999')                                        
      479      expect(screen.getByText('15 digits maximum', { selector: '
           .sr-only' })).toBeInTheDocument()
      480    })
      481  
  ⎿  Updated src/ui/stylesheet.test.ts (+2 -1)
      48  const tokensCss = read('tokens.css')
      49  const all = [keypad, app, display, tape, toggle, parse(read('An
          nouncer.module.css'))].flat()
      50  
      51 +// Every declaration for a selector outside media queries (or i
         +nside the given one), merged in order.                         
      52  const rule = (rules: Rule[], selector: string, media = '') =>
      52 -  rules.find((r) => r.selector === selector && r.media.includes
         -(media))?.decls ?? {}                                          
      53 +  Object.assign({}, ...rules.filter((r) => r.selector === selec
         +tor && (media ? r.media.includes(media) : r.media === '')).map(
         +(r) => r.decls)) as Record<string, string>                     
      54  
      55  function token(name: string): string {
      56    const m = new RegExp(`${name}:\\s*([^;]+);`).exec(tokensCss)
  ⎿  (timeout 5m)

⏺ All 778 pass. Re-running the coverage listing to see what is still uncited:

  Ran 1 shell command (ctrl+o to expand)

⏺ All 16 stories qualify, with five criteria (AC-2.7, AC-2.12, AC-2.16, AC-20.3,
  AC-20.4) left to your manual checks. Committing the tests now.

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed: 05e3fa0. Now the audit itself. First, everything that states a story's
  status or what Implemented means:

  Searched for 1 pattern (ctrl+o to expand)

⏺ I found a conflict: the skill and CLAUDE.md define "implemented" as passing
  tests only, while this audit's rule also allows manual checks. I'll update
  those two wording spots to match your rule (flagging it separately since it's
  the one change you didn't specify), then move on to the status table and
  Status lines.

⏺ Bash(python3 - <<'EOF'
      import re…)
  ⎿  Updated docs/user-stories.md (+51 -17)
      1  # User stories
      2  
      3 -The behaviour these stories describe is fixed by the Decisions s
        -ection of `CLAUDE.md`; the story says which decisions it covers.
        - Every story is **Not implemented** until its criteria pass in t
        -he running app.                                                 
      3 +The behaviour these stories describe is fixed by the Decisions s
        +ection of `CLAUDE.md`; the story says which decisions it covers.
        + A story is **Implemented** only when every one of its criteria 
        +is shown by an automated test or by the manual check recorded be
        +low; otherwise it is **Not implemented**.                       
      4  
      5  Notation:
      6  - Keys are written as pressed: `2 + 3 =`.
     ...
      13  
      14  ---
      15  
      16 +## Status                                                      
      17 +                                                               
      18 +This table is the one record of each story's status; the Status
         + line on each story matches it, and a fitness test fails if the
         +y ever disagree. 16 Implemented, 4 Not implemented.            
      19 +                                                               
      20 +Evidence, as of 2026-10-07: the automated tests (`npm test`), a
         +nd a manual check by hand in Chrome on macOS, locally and on th
         +e hosted copy, and in a phone browser on the hosted copy, follo
         +wing `docs/test-plan.md`. A fault cannot be made by hand, so th
         +e fault criteria (AC-9.9 to AC-9.11, AC-19.8, AC-20.10) rest on
         + the tests that run the whole app with a deliberately broken en
         +gine.                                                          
      21 +                                                               
      22 +| ID | Title | Status | Reason |                               
      23 +|---|---|---|---|                                              
      24 +| S-1 | Type a figure | Implemented |  |                       
      25 +| S-2 | Use the on-screen keys | Implemented |  |              
      26 +| S-3 | Get exact answers to ordinary sums | Implemented |  |  
      27 +| S-4 | See the order operations run in | Implemented |  |     
      28 +| S-5 | Know when a number is not exact | Implemented |  |     
      29 +| S-6 | Work with very large and very small numbers | Implement
         +ed |  |                                                        
      30 +| S-7 | Correct the figure I am typing | Implemented |  |      
      31 +| S-8 | Keep going from a result | Implemented |  |            
      32 +| S-9 | Get out of an error | Implemented |  |                 
      33 +| S-10 | Do everything from the keyboard | Implemented |  |    
      34 +| S-11 | Paste a figure from a spreadsheet or email | Implement
         +ed |  |                                                        
      35 +| S-12 | See the working on a tape | Implemented |  |          
      36 +| S-13 | Recall a result from the tape | Implemented |  |      
      37 +| S-14 | Empty the tape | Implemented |  |                     
      38 +| S-15 | Use the calculator with a screen reader | Not implemen
         +ted | VoiceOver has been checked for only three of its criteria
         + (AC-15.1 to AC-15.3). |                                       
      39 +| S-16 | Correct an earlier step and have the rest recalculate 
         +| Not implemented | Needs the tape to store operations and trac
         +k which lines depend on which; out of scope for this version. |
      40 +| S-17 | Add or remove a percentage or tax | Not implemented | 
         +Needs a fresh round of decisions on what percent means after ea
         +ch operator; out of scope for this version. |                  
      41 +| S-18 | Export the tape as a CSV file | Not implemented | Wait
         +s on S-16, which settles the tape format it would export; out o
         +f scope for this version. |                                    
      42 +| S-19 | Keep a running total in memory | Implemented |  |     
      43 +| S-20 | Read the calculator at any size | Implemented |  |    
      44 +                                                               
      45 +Retired: ~~S-21 Hear each key press~~, on 2026-10-07; it will n
         +ot be built.                                                   
     … 140 more lines (ctrl+o to expand)

⏺ The evidence line wrongly implies your check followed the test plan; the plan
  is written after it. I'll fix that, and check the table's reasons against each
  story's own Reason line:

  Searched for 1 pattern (ctrl+o to expand)

⏺ Bash(python3 - <<'EOF'
      p="docs/user-stories.md"; s=open(p).read()…)  ⎿  Updated .claude/skills/product-spec/SKILL.md (+1 -1)
      26  
      27  Every story has:
      28  - **Job:** the `J-n` it serves.
      29 -- **Status:** `Implemented` or `Not implemented`. Implemented m
         -eans its criteria pass in tests. Do not round up.              
      29 +- **Status:** `Implemented` or `Not implemented`. Implemented m
         +eans every criterion is shown by a test, or by a recorded manua
         +l check where no test can reach. Do not round up.              
      30  - **Acceptance criteria** in Given / When / Then form, covering
          :
      31    - the normal case
      32    - invalid input
  ⎿  Updated CLAUDE.md (+1 -1)
      30  
      31  ## Docs
      32  - Roles, jobs and stories follow `.claude/skills/product-spec`.
           ADRs follow `.claude/skills/adr` and live in `docs/adr/`.
      33 -- The three required docs stay exactly where they are; extra fi
         -les beside them are fine. Docs must be honest about what was bu
         -ilt. A story is Implemented only if its criteria pass.         
      33 +- The three required docs stay exactly where they are; extra fi
         +les beside them are fine. Docs must be honest about what was bu
         +ilt. A story is Implemented only when every criterion is shown 
         +by a test or by the recorded manual check; the status table in 
         +`docs/user-stories.md` is the one record.                      
      34  
      35  ## Commits (standing rule)
      36  - Commit at the end of each unit of work, never in one lump at 
          the end. Push after every commit.
  ⎿  Updated docs/architecture.md (+1 -1)
      320  | One door to decimal.js: only `domain/decimal.ts` imports it 
           | fitness 1 | Enforced. That only it calls `Decimal.clone` fol
           lows, but is not checked separately. |
      321  | No native arithmetic on values: in `src/domain` outside `dec
           imal.ts`, no `parseFloat`, `Number`, `Math` or arithmetic oper
           ator on a number, read from the TypeScript AST. A use that is 
           not a value carries a `fitness: not a value` comment, and the 
           test lists every one. | fitness 2; `src/domain/boundaries.test
           .ts` for the number APIs across all of `src` | Enforced, with 
           six listed uses, all string positions and digit counts |
      322  | No throw in domain | `src/domain/boundaries.test.ts` | Enfor
           ced |
      323 -| Story traceability: a story marked Implemented needs a test 
          -citing it, and no test cites a story or criterion that does no
          -t exist | fitness 3 | Enforced. The first half passes only bec
          -ause no story is Implemented yet. |                           
      323 +| Story traceability: a story marked Implemented needs a test 
          +citing it, and no test cites a story or criterion that does no
          +t exist | fitness 3 | Enforced. It also fails if the status ta
          +ble at the top of `docs/user-stories.md` and any story's Statu
          +s line disagree, or if a test cites a retired story. |        
      324  | Error surface: every error and notice code has a message, wr
           itten as words | fitness 4 | Enforced |
      325  | Bundle budget: gzipped JavaScript under 150 kB | fitness 5 |
            Enforced (about 89 kB today) |
      326  | Messages verbatim: the texts match Decisions 8 and 9 | the a
           rithmetic, paste and fault tests | Enforced in those tests |
  ⎿  Updated docs/user-stories.md (+4 -4)
      17  
      18  This table is the one record of each story's status; the Status
           line on each story matches it, and a fitness test fails if the
          y ever disagree. 16 Implemented, 4 Not implemented.
      19  
      20 -Evidence, as of 2026-10-07: the automated tests (`npm test`), a
         -nd a manual check by hand in Chrome on macOS, locally and on th
         -e hosted copy, and in a phone browser on the hosted copy, follo
         -wing `docs/test-plan.md`. A fault cannot be made by hand, so th
         -e fault criteria (AC-9.9 to AC-9.11, AC-19.8, AC-20.10) rest on
         - the tests that run the whole app with a deliberately broken en
         -gine.                                                          
      20 +Evidence, as of 2026-10-07: the automated tests (`npm test`), a
         +nd a manual check by hand in Chrome on macOS, locally and on th
         +e hosted copy, and in a phone browser on the hosted copy. `docs
         +/test-plan.md` writes that check up as steps anyone can repeat.
         + A fault cannot be made by hand, so the fault criteria (AC-9.9 
         +to AC-9.11, AC-19.8, AC-20.10) rest on the tests that run the w
         +hole app with a deliberately broken engine.                    
      21  
      22  | ID | Title | Status | Reason |
      23  |---|---|---|---|
     ...
      36  | S-13 | Recall a result from the tape | Implemented |  |
      37  | S-14 | Empty the tape | Implemented |  |
      38  | S-15 | Use the calculator with a screen reader | Not implemen
          ted | VoiceOver has been checked for only three of its criteria
           (AC-15.1 to AC-15.3). |
      39 -| S-16 | Correct an earlier step and have the rest recalculate 
         -| Not implemented | Needs the tape to store operations and trac
         -k which lines depend on which; out of scope for this version. |
      40 -| S-17 | Add or remove a percentage or tax | Not implemented | 
         -Needs a fresh round of decisions on what percent means after ea
         -ch operator; out of scope for this version. |                  
      41 -| S-18 | Export the tape as a CSV file | Not implemented | Wait
         -s on S-16, which settles the tape format it would export; out o
         -f scope for this version. |                                    
      39 +| S-16 | Correct an earlier step and have the rest recalculate 
         +| Not implemented | It needs the tape to store operations inste
         +ad of text, plus dependency tracking between lines: a second st
         +ate machine that does not fit this version's time. |           
      40 +| S-17 | Add or remove a percentage or tax | Not implemented | 
         +Percent behaves differently from one calculator to the next, so
         + it needs its own round of decisions before it can be built hon
         +estly. |                                                       
      41 +| S-18 | Export the tape as a CSV file | Not implemented | A fi
         +le download adds a second output format with its own quoting an
         +d number rules. It waits until the tape format has settled. |  
      42  | S-19 | Keep a running total in memory | Implemented |  |
      43  | S-20 | Read the calculator at any size | Implemented |  |
      44  

⏺ Now the brief's roadmap: the four Not implemented stories in build order, S-15
  first.

⏺ Bash(python3 - <<'EOF'
      p="docs/product-brief.md"; s=open(p).read()…)
  ⎿  Updated docs/product-brief.md (+7 -4)
      56  - **A hosted service or backend.** Nothing leaves the browser.
      57  - **Sound on key presses.** S-21 was retired on 2026-10-07, and
           J-10 with it. It would have had to be off by default in an off
          ice or beside a screen reader, so most people would never hear 
          it; it competes with VoiceOver's speech; it behaves differently
           across devices, because the iPhone silent switch can mute it a
          nd browsers hold audio back until the first tap; it can only be
           checked by ear; and the display and the tape already confirm e
          ach key press. See ADR 0009.
      58  
      59 -## Roadmap for the cut stories, in build order                 
      59 +## Roadmap for the four Not implemented stories, in build order
      60  
      61 -1. **S-16 Edit an earlier tape line.** This comes first because
         - it closes the gap S-7 admits, and serves J-4 directly. It also
         - requires the tape to store operations rather than text, which 
         -the next item builds on.                                       
      62 -2. **S-18 Export the tape as CSV.** It is small once the tape f
         -ormat is settled by S-16, and serves J-7.                      
      63 -3. **S-17 Percent and tax.** It needs a fresh round of decision
         -s on what percent means after each operator, and those decision
         -s should not be rushed in alongside the others. There is no % k
         -ey until then.                                                 
      61 +The status of every story is recorded in one place, the table a
         +t the top of `user-stories.md`.                                
      62 +                                                               
      63 +1. **S-15 Use the calculator with a screen reader.** It is buil
         +t; what is missing is the check. VoiceOver on macOS Safari has 
         +confirmed only AC-15.1 to AC-15.3 ("12", "12 plus", "15"). The 
         +rest, including the tape read as a list, needs a full pass befo
         +re the story can be marked Implemented.                        
      64 +2. **S-16 Edit an earlier tape line.** It closes the gap S-7 ad
         +mits, and serves J-4 directly. It also requires the tape to sto
         +re operations rather than text, which the next item builds on. 
      65 +3. **S-18 Export the tape as CSV.** It is small once the tape f
         +ormat is settled by S-16, and serves J-7.                      
      66 +4. **S-17 Percent and tax.** It needs a fresh round of decision
         +s on what percent means after each operator, and those decision
         +s should not be rushed in alongside the others. There is no % k
         +ey until then.                                                 
      67  
      68  ## Open questions, and the assumption we are running on
      69  
  ⎿  (timeout 3m 20s)

⏺ Traceability checks pass with all 16 stories implemented and tested. I'll now
  strengthen the check to catch status mismatches, missing reasons for
  unimplemented stories, incorrect counts, and tests citing retired stories or
  criteria.

⏺ Bash(python3 - <<'EOF'
      p="src/fitness.test.ts"; s=open(p).read()…)
  ⎿  Updated src/fitness.test.ts (+28 -0)
      262      expect(untested.map((s) => s.id)).toEqual([])
      263    })
      264  
      265 +  // The status table at the top of user-stories.md is the one
          + record of status.                                            
      266 +  const table = [...storiesText.matchAll(/^\| (S-\d+) \| ([^|]
          ++) \| (Implemented|Not implemented) \| ([^|]*) \|$/gm)].map((m
          +) => ({                                                       
      267 +    id: m[1] ?? '',                                           
      268 +    status: m[3] ?? '',                                       
      269 +    reason: (m[4] ?? '').trim(),                              
      270 +  }))                                                         
      271 +                                                              
      272 +  it('the status table and every story\'s Status line agree', 
          +() => {                                                       
      273 +    const fromLines = Object.fromEntries(stories.map((s) => [s
          +.id, s.status]))                                              
      274 +    const fromTable = Object.fromEntries(table.map((r) => [r.i
          +d, r.status]))                                                
      275 +    expect(fromTable).toEqual(fromLines)                      
      276 +  })                                                          
      277 +                                                              
      278 +  it('every Not implemented story in the table gives its reaso
          +n, and the counts sentence is right', () => {                 
      279 +    expect(table.filter((r) => r.status === 'Not implemented' 
          +&& r.reason === '').map((r) => r.id)).toEqual([])             
      280 +    const done = table.filter((r) => r.status === 'Implemented
          +').length                                                     
      281 +    expect(storiesText).toContain(`${done} Implemented, ${tabl
          +e.length - done} Not implemented.`)                           
      282 +  })                                                          
      283 +                                                              
      284 +  it('no test cites a retired story or its criteria', () => { 
      285 +    const bad = names.flatMap((t) =>                          
      286 +      cites(t.name)                                           
      287 +        .filter((c) => retired.some((r) => c === r || c.starts
          +With(`AC-${r.slice(2)}.`)))                                   
      288 +        .map((c) => `${t.file}:${t.line} cites retired ${c}`),
      289 +    )                                                         
      290 +    expect(bad).toEqual([])                                   
      291 +  })                                                          
      292 +                                                              
      293    it('no test cites a story or criterion that does not exist',
            () => {
      294      const bad = names.flatMap((t) =>
      295        cites(t.name)
  ⎿  1 skill available

⏺ All tests pass, but one test name is outdated—it claims the check passes
  vacuously even though 16 stories are now Implemented. I'll update the name to
  reflect the count, then verify the new checks actually catch failures by
  breaking the docs intentionally.

⏺ Bash(python3 - <<'EOF'
      p="src/fitness.test.ts"; s=open(p).read()…)
  ⎿  Updated src/fitness.test.ts (+2 -1)
      255    })
      256  
      257    const implemented = stories.filter((s) => s.status === 'Impl
           emented')
      258 -  it(`every Implemented story has a test citing it (${implemen
          -ted.length} Implemented, so this passes vacuously while none i
          -s)`, () => {                                                  
      258 +  const vacuous = implemented.length === 0 ? ', so this passes
          + vacuously' : ''                                              
      259 +  it(`every Implemented story has a test citing it (${implemen
          +ted.length} Implemented${vacuous})`, () => {                  
      260      const untested = implemented.filter(
      261        (s) => !names.some((t) => cites(t.name).some((c) => c ==
           = s.id || c.startsWith(`AC-${s.id.slice(2)}.`))),
      262      )
  ⎿  (timeout 6m 40s)

⏺ Both breakages were caught, and the docs are restored. 781 tests pass.
  Committing the check:

  Ran 1 shell command (ctrl+o to expand)

⏺ Pushed cd8a30a — the traceability check is green and now labeled "(16
  Implemented)" instead of "passes vacuously." Next I'll write docs/test-plan.md
  with steps from those 16 stories, grouped for a ~10-minute walkthrough,
  noting likely Safari/Firefox differences and screenshots to capture.

⏺ Write(docs/test-plan.md)
  ⎿  Wrote 88 lines to docs/test-plan.md
      1 # Manual test plan
      3 A check by hand of the 16 Implemented stories (see the status tab
         It takes under ten minutes. Each step names the criteria it show
        s.
      5 **Before you start**
         (usually http://localhost:5173/), or use the hosted copy at http
      7 - Use Chrome on a computer with a mouse, in a window wider than 9
        00px. Steps 26 to 30 change the window, zoom and settings; step 3
      8 - "Type" means use the keyboard; "click" means use the mouse on t
        i
     … +177 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ I've pushed commit 4ecd71d. Now I'll write the README's closing section,
  covering the three likely pain points: the 2+3×4 order-of-operations issue,
  the "≈" shown on exact-looking answers, and the macOS block on start.command
  for downloaded (non-cloned) repos.

⏺ Write(README.md)
  ⎿  Error writing file

  Read 1 file (ctrl+o to expand)

⏺ The README is unchanged from my last commit, so I just need to re-read it
  fresh. I'll keep session 1's explanation of why both the tape and memory exist
  in the opening section as I write the updated README.

⏺ Bash(cat > README.md <<'EOF'
      # Calculator…)
  ⎿  Updated README.md (+101 -10)
        2  
        3  [![CI](https://github.com/hassan-product/hassa-chaudry-calcula
           tor/actions/workflows/ci.yml/badge.svg)](https://github.com/ha
           ssan-product/hassa-chaudry-calculator/actions/workflows/ci.yml
           )
        4  
        5 -A four-function calculator you can trust with money. It is exa
          -ct where possible, marks a number with ≈ where it is not, and 
          -keeps a tape that shows the working.                          
        5 +A four-function calculator (+ − × ÷) for checking money figure
          +s. It is for two kinds of user: someone doing a quick sum who 
          +never thinks about how it works, and someone at a desk checkin
          +g figures before approving them. I chose this kind of calculat
          +or because, for money, a number you cannot trust is worse than
          + no number.                                                   
        6  
        7 -**Status:** built and running, with automated tests passing. E
          -very story in `docs/user-stories.md` is still marked Not imple
          -mented: the VoiceOver check has not been done yet, and a story
          - is marked Implemented only after it.                         
        7 +The point is precision. The arithmetic is decimal, so ordinary
          + sums come out exactly, and when an answer cannot be exact (10
          +0 ÷ 3) it is marked with ≈ instead of being quietly rounded.  
        8  
        9 -## Tape and memory                                            
        9 +A tape records every finished calculation, step by step, so a 
          +figure can be checked line by line and any result brought back
          +. Memory holds one running total being built, such as three in
          +voice totals added with M+ and read back with MR; every memory
          + change is also written on the tape, so nothing is hidden.    
       10  
       11 -The tape is the record of every finished calculation, so you c
          -an see where a number came from and bring any result back. Mem
          -ory holds one running total you are building, such as the tota
          -ls of three invoices added with M+ and read back with MR. Ever
          -y memory change is also written on the tape, so nothing is hid
          -den.                                                          
       11 +## An example                                                 
       12  
       13 -## Run it                                                     
       13 +In JavaScript, `0.1 + 0.2` is `0.30000000000000004`. Here, `0.
          +1 + 0.2 =` shows exactly `0.3`. `100 ÷ 3 =` shows `≈ 33.333333
          +3333333`, and multiplying that by 3 shows `≈ 100`: the result 
          +is close to 100, and the mark says it may not be exactly 100. 
       14 +                                                              
       15 +## Status                                                     
       16  
       15 -Requires Node 20.19 or later, or 22.12 or later (`.nvmrc` pins
          - 20).                                                         
       17 +16 of 20 live stories are Implemented, and 4 are Not implement
          +ed. Each Implemented story has every acceptance criterion show
          +n by an automated test or by a manual check in a browser. The 
          +full table, with reasons, is in [docs/user-stories.md](docs/us
          +er-stories.md#status).                                        
       18  
       17 -The quickest way is to double-click `start.command` on a Mac o
          -r `start.bat` on Windows. Each checks for Node, installs depen
          -dencies on the first run, starts the app and opens it in your 
          -browser.                                                      
       19 +- **Implemented (16):** S-1 to S-14, S-19 and S-20.           
       20 +- **Not implemented (4):** S-15 (screen reader: only three cri
          +teria checked with VoiceOver), S-16 (edit an earlier tape line
          +), S-17 (percent and tax), S-18 (export the tape as CSV).     
       21 +- **Retired:** ~~S-21 Hear each key press~~, on 2026-10-07. It
          + will not be built.                                           
       22  
       19 -Or from a terminal:                                           
       23 +## Prerequisites                                              
       24 +                                                              
       25 +Node 20.19 or later (or 22.12 or later). Nothing else: no acco
          +unts, no keys, no cloud services.                             
       26 +                                                              
       27 +## Run it                                                     
       28  
       29  ```sh
       30  npm install
       23 -npm run dev    # then open the address it prints, usually http
          -://localhost:5173/                                            
       24 -npm test       # the automated tests, fitness functions includ
          -ed; CI runs these and the build                               
       31 +npm run dev      # then open the address it prints, usually ht
          +tp://localhost:5173/                                          
     … 85 more lines (ctrl+o to expand)
  ⎿  (timeout 10m)

⏺ All 781 tests pass, traceability is green, and CI passed on the final commit.
  Every commit was pushed and nothing in the calculator changed.

  Status: 16 Implemented, 4 Not implemented, 1 retired.
  - Implemented: S-1 to S-14, S-19 and S-20.
  - Not implemented:
    - S-15: VoiceOver confirmed only "12", "12 plus" and "15".
    - S-16, S-17 and S-18: out of scope for this version.
  - Retired: S-21, struck through with its ID kept. J-10, which only S-21
    served, is retired the same way.

  The fault criteria (AC-9.9 to AC-9.11, AC-19.8, AC-20.10) rest on the tests
  that run the whole app with a deliberately broken engine, because a fault
  can't be made by hand. The status table says so.

  Things to know

  - A rule I changed that you didn't name. The skill said "Implemented means its
    criteria pass in tests", and CLAUDE.md said much the same. Your audit
    counts your manual check too, so I reworded both to "a test or a recorded
    manual check". Without that, 16 statuses would contradict the documents.
  - Tests added before the audit. Fourteen criteria in the 16 stories had no
    test citing them, mostly visual ones. I added stylesheet tests, a contrast
    test over every pairing in the wireframes, and whole-app tests for Tab
    order, key repeat, message dismissal, reload, and recall behind the toggle.
    Five criteria still rest only on your check: AC-2.7, AC-2.12, AC-2.16,
    AC-20.3 and AC-20.4, all of which your list covers. No criterion was left
    uncovered.
  - Criteria format. Only AC-17.11, AC-17.12, AC-18.2 and AC-18.3 broke the new
    skill line. No other criterion does.
  - Suite B ran once, 1 of 4 passing. Every criterion in every answer now has a
    Given, When and Then, and no answer contains a wrong sum. Three answers
    still fail on Thens whose wording the Decisions don't fix, such as "the
    usual error shows". The failure is recorded, and the rubric is unchanged.
  - The README links to transcripts/session-02.md, which doesn't exist until you
    add it.

  Commits

  1. fce098a Let traceability read a struck-through story as retired
  2. 5133418 Retire S-21 and J-10: key-press sound will not be built
  3. 96f5ad6 Record S-21's retirement in the Decisions, brief and ADR
  4. d5f04b3 Require a Given, When and Then in every criterion
  5. 9f3fa62 Give four unbuilt criteria their own Given and When
  6. 3a7bd61 Rerun suite B after the skill gained its criterion rule
  7. 05e3fa0 Test the criteria only a browser seemed able to show
  8. f315fae Record which stories are Implemented, in one table
  9. cd8a30a Check the status table against every Status line
  10. 4ecd71d Write a ten-minute manual test plan
  11. 76aa904 Rewrite the README for a first-time reviewer

  Commit 1 changes only the traceability test, so CI stayed green when S-21 was
  retired.

  Where a first-time reviewer is most likely to hit a rough edge

  1. 2 + 3 × 4 shows 20, not 14. Written down in Decision 4, ADR 0004 and the
     README's known limits.
  2. ≈ on answers that look exact, such as ≈ 100 and ≈ 0. Written down in
     Decision 3, the product brief's open questions and the README's known
     limits.
  3. start.command refused by macOS when the repo was downloaded as a zip. This
     wasn't written down anywhere, so I added it to the README's known limits,
     with the workaround.

❯ One last README change. Do not change the calculator or any other document.

  I downloaded the repo as a zip on macOS 15 and double-clicked start.command.
  It showed "start.command Not Opened" and "Apple could not verify
  start.command is free of malware", with only Done and Move to Bin. Open
  Anyway in Privacy & Security got it running. Nothing in the repo can avoid
  that without a paid Apple signing account, so the README must steer a
  reviewer around it.

  Add a section called "Start here" directly after the opening description,
  before the example. Give every way to open the app, easiest first, each with
  numbered steps a first-time reviewer can follow without guessing:

  1. The hosted copy. Open https://hassa-chaudry-calculator.vercel.app/.
  Nothing to install.
  2. The terminal, the recommended way to run it locally. Works on Mac, Windows
  and Linux, and never triggers a security warning.
     - Check Node: node -v must print 20.19 or later, or 22.12 or later. If it
  is missing or older, install the LTS version from https://nodejs.org, then
  open a new terminal.
     - Get the code, either way: git clone
  https://github.com/hassan-product/hassa-chaudry-calculator.git, or Download
  ZIP on GitHub and unzip it. Say the unzipped folder is named
  hassa-chaudry-calculator-main.
     - cd into that folder.
     - npm install. Say it is only needed the first time.
     - npm run dev, then open the address it prints, usually
  http://localhost:5173/. If that port is busy, Vite picks the next one and
  prints it.
     - Ctrl+C in the terminal stops it.
  3. Double-click on a Mac, after a git clone. Clone as above, then
  double-click start.command. A cloned file is not marked as downloaded, so
  macOS opens it straight away.
  4. Double-click on a Mac, after a zip download. macOS blocks the file the
  first time:
     - It shows "start.command Not Opened". Click Done. Do not choose Move to
  Bin, which deletes the file.
     - Open System Settings, then Privacy & Security, scroll down, and click
  Open Anyway next to start.command. Confirm.
     - If macOS then says the file cannot be run, open Terminal in that folder,
  run chmod +x start.command, and double-click it again.
     - Or skip the file and use the terminal steps above.
  5. Double-click on Windows: start.bat. Say plainly that start.bat has not
  been run on Windows. If Windows shows "Windows protected your PC", choose
  More info, then Run anyway. If it does not start, use the terminal steps
  above.

  For 3, 4 and 5, say what the script does: it checks for Node and says what to
  install if it is missing, installs dependencies the first time, starts the
  app, and opens it in the browser. Leave the terminal window open while you
  use the app. Closing it stops the app.

  Then remove the old Prerequisites and Run it sections, or cut them down to
  one line pointing to Start here, so the steps are not written twice. Keep npm
  test and npm run build in the Tests section.

  In known limits, replace the start.command line with two lines: a zip
  download makes macOS block start.command, with a pointer to Start here; and
  start.bat has not been run on Windows.

  Leave everything else in the README as it is, including the Session 2 link. I
  will add that file after this reply.

  Commit it on its own and push. Then show me the new Start here section as it
  appears in the README.

⏺ I'll write the new section from your steps, replace Prerequisites and Run it
  with one pointer line, and add npm run build to the Tests section so both
  commands stay there.

⏺ Bash(python3 - <<'EOF'
      p="README.md"; s=open(p).read()…)
  ⎿  Updated README.md (+56 -14)
       8  
       9  A tape records every finished calculation, step by step, so a f
          igure can be checked line by line and any result brought back. 
          Memory holds one running total being built, such as three invoi
          ce totals added with M+ and read back with MR; every memory cha
          nge is also written on the tape, so nothing is hidden.
      10  
      11 +## Start here                                                  
      12 +                                                               
      13 +Every way to open the app, easiest first.                      
      14 +                                                               
      15 +### 1. The hosted copy                                         
      16 +                                                               
      17 +1. Open https://hassa-chaudry-calculator.vercel.app/.          
      18 +                                                               
      19 +Nothing to install.                                            
      20 +                                                               
      21 +### 2. The terminal (recommended for running it locally)       
      22 +                                                               
      23 +This works on Mac, Windows and Linux, and never triggers a secu
         +rity warning.                                                  
      24 +                                                               
      25 +1. Check Node: run `node -v`. It must print 20.19 or later, or 
         +22.12 or later. If Node is missing or older, install the LTS ve
         +rsion from https://nodejs.org, then open a new terminal.       
      26 +2. Get the code, either way:                                   
      27 +   - `git clone https://github.com/hassan-product/hassa-chaudry
         +-calculator.git`, or                                           
      28 +   - on GitHub, choose Code, then Download ZIP, and unzip it. T
         +he unzipped folder is named `hassa-chaudry-calculator-main`.   
      29 +3. Go into that folder: `cd hassa-chaudry-calculator` (or `cd h
         +assa-chaudry-calculator-main` for the zip).                    
      30 +4. Run `npm install`. This is only needed the first time.      
      31 +5. Run `npm run dev`, then open the address it prints, usually 
         +http://localhost:5173/. If that port is busy, Vite picks the ne
         +xt one and prints it.                                          
      32 +6. Press Ctrl+C in the terminal to stop it.                    
      33 +                                                               
      34 +### 3. Double-click on a Mac, after a git clone                
      35 +                                                               
      36 +1. Clone the code as in step 2 of the terminal way.            
      37 +2. Double-click `start.command` in the folder.                 
      38 +                                                               
      39 +A cloned file is not marked as downloaded, so macOS opens it st
         +raight away.                                                   
      40 +                                                               
      41 +### 4. Double-click on a Mac, after a zip download             
      42 +                                                               
      43 +macOS blocks the file the first time.                          
      44 +                                                               
      45 +1. Double-click `start.command`. macOS shows "start.command Not
         + Opened". Click Done. Do not choose Move to Bin, which deletes 
         +the file.                                                      
      46 +2. Open System Settings, then Privacy & Security. Scroll down, 
         +click Open Anyway next to `start.command`, and confirm.        
      47 +3. If macOS then says the file cannot be run, open Terminal in 
         +that folder, run `chmod +x start.command`, and double-click it 
         +again.                                                         
     … 49 more lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ I've added the Start here section to the README, directly after the opening
  description, and pushed it as cdc4714. Nothing else in the repo changed.

  Here is the section as it appears:

  ---

  Start here

  Every way to open the app, easiest first.

  1. The hosted copy

  1. Open https://hassa-chaudry-calculator.vercel.app/.

  Nothing to install.

  2. The terminal (recommended for running it locally)

  This works on Mac, Windows and Linux, and never triggers a security warning.

  1. Check Node: run node -v. It must print 20.19 or later, or 22.12 or later.
     If Node is missing or older, install the LTS version from
     https://nodejs.org, then open a new terminal.
  2. Get the code, either way:
     - git clone https://github.com/hassan-product/hassa-chaudry-calculator.git,
       or
     - on GitHub, choose Code, then Download ZIP, and unzip it. The unzipped
       folder is named hassa-chaudry-calculator-main.
  3. Go into that folder: cd hassa-chaudry-calculator (or cd
     hassa-chaudry-calculator-main for the zip).
  4. Run npm install. This is only needed the first time.
  5. Run npm run dev, then open the address it prints, usually
     http://localhost:5173/. If that port is busy, Vite picks the next one and
     prints it.
  6. Press Ctrl+C in the terminal to stop it.

  3. Double-click on a Mac, after a git clone

  1. Clone the code as in step 2 of the terminal way.
  2. Double-click start.command in the folder.

  A cloned file is not marked as downloaded, so macOS opens it straight away.

  4. Double-click on a Mac, after a zip download

  macOS blocks the file the first time.

  1. Double-click start.command. macOS shows "start.command Not Opened". Click
     Done. Do not choose Move to Bin, which deletes the file.
  2. Open System Settings, then Privacy & Security. Scroll down, click Open
     Anyway next to start.command, and confirm.
  3. If macOS then says the file cannot be run, open Terminal in that folder,
     run chmod +x start.command, and double-click it again.
  4. Or skip the file and use the terminal way above.

  5. Double-click on Windows

  1. Double-click start.bat.
  2. If Windows shows "Windows protected your PC", choose More info, then Run
     anyway.
  3. If it does not start, use the terminal way above.

  start.bat has not been run on Windows.

  What the double-click scripts do

  start.command and start.bat check for Node and say what to install if it is
  missing. They install dependencies the first time, start the app, and open it
  in your browser. Leave the terminal window open while you use the app. Closing
  it stops the app.

  ---

  The other changes:
  - Prerequisites and Run it are now one short "Running it" section. It points
    to Start here and says Node is the only requirement, so the steps aren't
    written twice.
  - Tests section: keeps npm test and now also has npm run build.
  - Known limits: the old start.command line is now two lines. A zip download
    makes macOS block start.command, with a link to Start here, and start.bat
    has not been run on Windows.
  - Session 2 link: still there, so it will work once you add
    transcripts/session-02.md.