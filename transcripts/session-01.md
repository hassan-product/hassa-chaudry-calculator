
❯ Before any code, I want to agree what we are building.

  A calculator web app, four functions only. The angle is precision. Most web
  calculators run on JavaScript numbers, so 0.1 + 0.2 gives 0.30000000000000004
  and 1.005 rounds to 1.00 instead of 1.01. Most apps hide that by rounding
  the display, which means the user cannot tell a correct answer from a quietly
  wrong one. For anything involving money that is a trust problem, not a maths
  problem.

  So a calculator you can trust with money. Exact decimal arithmetic
  throughout, a visible tape so the user can audit how they got to a number,
  and full keyboard entry.

  Two users. Someone doing a quick one off sum who has never heard of floating
  point, and someone at a desk checking money figures before they approve them.
  Their needs pull in different directions and I want to keep both honest.

  It is a take home exercise so the folder layout and some of the documents are
  fixed. I will give you those next.

  No code, no files yet. Push back on me first. Where is this weak, what have I
  assumed without saying it, what would you need to know before building it.

  Then summarise the product back to me in your own words.

⏺ No files written. Here's the pushback first, most important first, then my
  summary of the product.

  Where this is weak

  1. "Exact decimal arithmetic throughout" can't be true once you divide.
  100 ÷ 3 has no exact decimal answer. You have three options:
  - Fractions under the hood. Keep 1/3 as a fraction so that 100 ÷ 3 × 3 gives
    exactly 100.
  - Fixed precision with honest marking. Work to, say, 30+ significant digits
    and show a clear "≈" whenever a result was rounded.
  - Rounding to a fixed number of places. This is the "quietly wrong" behaviour
    you're criticising.

  I'd recommend the second. Whatever we pick, the promise should change from
  "exact" to "exact where possible, and visibly marked where it isn't."
  Otherwise the first person who divides by 3 catches us doing the same thing we
  accuse other calculators of.

  2. Your 1.005 example isn't something this product does.
  That bug comes from rounding to 2 decimal places, and a four-function
  calculator has no rounding operation. Either we add "round to pennies" (a
  fifth function, plus a choice of rounding rule: round half up or banker's
  rounding), or we drop that example from the pitch. If the main argument rests
  on a case the product never hits, a reviewer will notice.

  3. The competition is probably not who you think.
  Phone and desktop calculators mostly don't show 0.1 + 0.2 as
  0.30000000000000004. I'm fairly sure Windows uses exact arithmetic, but we
  should check Windows, iOS, macOS and Google rather than assume. The tool your
  desk user actually checks figures in is probably a spreadsheet, which does use
  floating point and hides it with display rounding. That's a better rival to
  name, and it makes the tape more important than the arithmetic.

  4. Order of operations is undecided, and it matters more than precision.
  2 + 3 × 4 gives 20 on a desk adding machine (each operation runs as you press
  it) and 14 under the maths rule that multiplication goes first. The casual
  user will expect one, the desk user the other, and the tape has to show which
  rule was used. This is the biggest unstated decision in the brief.

  5. "Four functions only" leaves out %.
  Money users use % all the time for VAT, discounts and margins, and % behaves
  differently on every calculator. Leaving it out is fine, but it should be a
  deliberate, written decision. Other edge cases need the same treatment: the
  +/− key, repeated equals (5 + = =), changing your mind about an operator, and
  typing a digit straight after =.

  6. The tape is under-specified.
  - Is it a record of keystrokes or of calculations?
  - Can you edit an earlier line and have everything after it recalculate, like
    a real adding-machine tape? That's what checking figures really needs.
  - Does it survive a page reload? Saving money figures in the browser on a
    shared desk computer is a privacy question.
  - Can you copy or export it? The person approving figures needs to attach
    their working to something.
  - Does Clear wipe the tape, or only the current entry?

  7. Limits and failure states.
  - Divide by zero.
  - A maximum number of digits you can type.
  - Results too wide for the display. Switching to scientific notation (1.2e15)
    on a money figure destroys trust, so what happens instead?
  - Negative zero.
  - Pasted input like "£1,234.56", or a European "1.234,56".

  Each of these is a moment where the user decides whether to trust us.

  8. "Full keyboard entry" has two meanings.
  It could mean shortcuts (numpad, Enter for =, Backspace, Escape). It could
  also mean every action works without a mouse, results are announced to screen
  readers, and the tape is readable as an accessible log. The second is a much
  bigger commitment. Which one?

  9. The two users conflict in specific places.
  - The casual user should never meet the word "precision" or a lesson on
    floating point. The "≈" marker has to mean something without explanation.
  - The desk user wants the tape, the operation order and rounding marks visible
    at all times.

  The honest resolution is probably that the tape is always there but visually
  quiet, and the "≈" marker is the only precision signal. It should be enough
  for the casual user to ignore it and the desk user to rely on it. If we can't
  design that, one user is being let down.

  10. No currency mode.
  "Money" suggests forcing 2 decimal places, but unit prices like £0.0125 are
  real. I'd keep the calculator free of units and say so.

  What I need from you before building

  - The fixed folder layout and documents.
  - Time budget, and who is evaluating it against what criteria.
  - Technical constraints: is a framework allowed? Can we use a decimal maths
    library (decimal.js, big.js), or should I write my own on top of
    JavaScript's BigInt? Evaluators may read that choice either way.
  - Whether tests are expected, and whether it needs to be deployed or just run
    locally.
  - Your decisions on points 1, 2, 4, 5 and 6.

  The product in my words

  A plain four-function calculator for people who need to believe the number on
  screen. Under the hood, decimals behave the way people expect: 0.1 + 0.2 is
  0.3 because the maths is done in decimal, not because the display hides the
  error. When a result genuinely can't be exact, such as dividing by 3, the
  calculator says so instead of rounding silently.

  Every step goes on a visible tape, so someone checking an invoice can retrace
  how they got a total and spot a mis-typed figure. Everything works from the
  keyboard.

  It has to stay simple enough for someone splitting a bill who will never think
  about any of this, while being rigorous enough for someone signing off
  figures who needs to show their working. The way it earns trust is that it
  never hides when or how a number was produced, not that it claims to be
  perfect.

❯ Good, most of this is right. Going through them by number.

  1. Agreed, exact was an overclaim. Go with your second option. 34 significant
  digits
  internally, and an ≈ next to any result where what is on screen is not the
  exact answer, whether that comes from the internal limit or from the display
  cutting it to 15 digits.

  So 100 / 3 shows ≈ 33.3333333333333. And 100 / 3 * 3 should show ≈ 100, not a
  clean 100, because underneath it is not exactly 100 and I would rather be
  honest than tidy.

  Fractions I am rejecting. The user still reads a decimal on screen so I need
  the ≈ anyway, and it is a lot more code for a case people hardly hit. The
  promise becomes exact where possible, marked where not.

  2. Half agree. The rounding example is not something this product does, drop
  it from the pitch. But 1.005 * 100 is still a real case, plain JavaScript
  gives 100.49999999999999, so that one stays as a test.

  3. Fair. I have not checked those calculators so I am not making claims about
  them. The rival worth naming is the spreadsheet. Precision is the thing we
  must not get wrong, the tape is the reason to use this over what they already
  have. Nothing in the docs or the README claims another product gets it wrong
  unless we checked.

  4. Already decided, immediate execution, so 2 + 3 * 4 is 20. It matches an
  adding machine, which is the model the desk checker has in their head, and it
  keeps the state machine simple. The cost is someone used to the iPhone
  calculator expecting 14. To make the rule visible, the running result shows
  in the expression line as soon as an operator is pressed, so after 2 + 3 *
  you already see 5 ×. The tape records it the same way.

  5. Percent is out on purpose for this version, it will be a Not implemented
  story with
  criteria written. The other edge cases are decided and will be in the
  stories. Sign toggle yes, repeated equals repeats the last operation, a
  second operator replaces the first, a digit after equals starts a new
  calculation.

  6. Tape.
  - calculations, not keystrokes. One line per calculation finished with
  equals, the full
    chain and the result
  - no editing earlier lines in this version. It is the most valuable thing you
  listed for
    the desk checker so it becomes a Not implemented story, and it replaces
  memory functions which I was going to list. Recalling a tape line already
  does the job memory did on a physical calculator.
  - does not survive a reload. Your shared desk point is the reason, money
  figures left in the browser on a shared machine is a worse problem than
  losing the tape
  - export is Not implemented too
  - clear does not touch the tape, there is a separate control to empty it

  7. Limits.
  - divide by zero and 0 / 0 show "Cannot divide by zero", and a digit or clear
  gets you out
  - typing stops at 20 significant digits, and an extra digit shows a short
  message instead
    of being dropped silently. Dropping it silently breaks one of the rules I
  care about.
  - you are right that 1.2e15 on a money figure is bad. Plain notation up to 15
  significant digits, with the ≈ when rounded. Exponential only at 1e15 and
  above or below 1e-9, which no real money figure reaches. 1e100 and above is
  refused with a message.
  - never show negative zero, it is just 0
  - paste strips currency symbols, spaces, and commas used as thousands
  separators. A comma followed by exactly three digits is a thousands
  separator. Anything that could be read two ways, like 1.234,56, is refused
  with a message, we never guess. I am assuming UK and US style and I will
  write that down as an assumption.

  8. The bigger one. Every action works without a mouse, results are announced
  to a screen reader, and the tape is a proper list a screen reader can read.
  It is not a separate user, it is a rule for both. I will test with VoiceOver
  and say that is the only one I tested.

  9. Agreed. Tape always there but quiet, ≈ is the only precision signal, and
  the words
  precision and floating point never appear anywhere in the UI. On a phone the
  tape sits behind a toggle, more on that when we get to the UI.

  10. Agreed, no units, no currency mode, plain numbers.

  Your other questions. Layout and documents come in my next message. I have a
  few hours across a couple of sessions. Reviewers run it on their own machine
  from the README, check whether the documents are honest about what was built,
  and read how I worked with you.

  React and TypeScript are fine. Use decimal.js, not hand written decimal maths
  on BigInt, because the trust has to come from the product decisions, and
  writing my own maths just moves the risk into my own code. Tests yes. It has
  to run locally, a hosted link is extra.

  Do not write anything yet. Give me these decisions back as a short numbered
  list so I can check you have them right, and flag anything in it that
  contradicts something else.

⏺ Here are the decisions as I understand them, followed by what conflicts or is
  still missing.

  Decisions

  1. Arithmetic. decimal.js, 34 significant digits internally. Show ≈ whenever
     the screen isn't showing the exact answer, whether that comes from the
     internal limit or from cutting to 15 digits for display. 100 ÷ 3 shows ≈
     33.3333333333333, and 100 ÷ 3 × 3 shows ≈ 100. No fractions. The promise is
     "exact where possible, marked where not."
  2. Pitch. The 1.005 rounding example is dropped. 1.005 × 100 = 100.5 stays as
     a test.
  3. Claims. The spreadsheet is the rival we name. We say nothing about any
     other product unless we've checked it. Precision is the thing we can't get
     wrong, and the tape is the reason to use this calculator.
  4. Order. Each operation runs as soon as you press the next operator, like an
     adding machine, so 2 + 3 × 4 = 20. The running result appears straight
     away: after "2 + 3 ×" the expression line shows "5 ×". The tape records it
     the same way.
  5. Keys. Sign toggle is in. Pressing = again repeats the last operation. A
     second operator replaces the first. A digit after = starts a new
     calculation. Percent is out, written up as a Not implemented story.
  6. Tape.
     - One line per calculation finished with =, showing the full chain and the
       result.
     - No editing earlier lines; that's a Not implemented story and it replaces
       memory functions.
     - Gone on reload.
     - No export; also Not implemented.
     - Clear doesn't touch the tape. A separate control empties it.
  7. Limits.
     - Divide by zero and 0 ÷ 0 show "Cannot divide by zero". A digit or Clear
       gets you out.
     - Typing stops at 20 significant digits, with a message rather than a
       silently dropped digit.
     - Numbers show in plain form up to 15 significant digits. Exponential form
       starts at 1e15 and above, or below 1e-9.
     - 1e100 and above is refused with a message.
     - Negative zero is never shown.
  8. Paste. Currency symbols, spaces and thousands commas are stripped. A comma
     is a thousands separator only when followed by exactly three digits.
     Anything ambiguous, like 1.234,56, is refused with a message. UK/US number
     style is written down as an assumption.
  9. Accessibility. Everything works without a mouse, results are announced to
     screen readers, and the tape is a real list. Tested with VoiceOver only,
     and we say so.
  10. UI. The tape is always present but visually quiet. ≈ is the only precision
      signal. The words "precision" and "floating point" never appear. On a
      phone the tape sits behind a toggle.
  11. Units. None. No currency mode, plain numbers only.
  12. Stack. React and TypeScript, with tests. Runs locally from the README; a
      hosted link is extra.

  Contradictions

  A. You can type 20 digits but the display shows 15. These two numbers clash.
  Type 1234567890123456789 and the screen can't show what you just typed. Your
  own ≈ rule would then put ≈ next to your own input, and from 1e15 up it would
  flip to exponential form. Either cap typing at 15 digits, or let the line
  you're typing show everything while only results are cut to 15. I'd cap at 15.
  It's simpler and no money figure needs more.

  B. Naming the spreadsheet as the rival is itself an unchecked claim.
  Spreadsheets also display to about 15 digits, so a typical spreadsheet will
  probably show 0.3 for 0.1 + 0.2. If the README says spreadsheets get money
  wrong, that breaks rule 3. Either we check one specific spreadsheet and quote
  what it actually does, or we name it only as "the tool you'd otherwise use"
  and argue from the tape, not from errors.

  C. Recall is assumed but never stated. Point 6 says recalling a tape line
  replaces memory functions, so recall has to be in this version. But what gets
  recalled, the 34-digit internal value or the 15 digits on screen? If it's the
  internal value, the next result can differ from what the user would get by
  retyping what they see, and nothing tells them. If it's the screen value, the
  ≈ number becomes a new exact starting point. I'd recall the internal value,
  keep the ≈ attached to it, and say so in the tape line.

  Gaps (not contradictions, but the stories need them)

  - Rounding rule. Cutting to 15 digits needs one (round half up or half to
    even), and so does the internal 34-digit limit. decimal.js rounds half up by
    default. Pick one and test the cases right at the boundary.
  - Error state edges.
    - Does an operator also get you out of the error?
    - Does a divide-by-zero calculation write a tape line?
    - What does +/− do while the error is showing?
  - Repeated equals. Does each extra = add its own tape line? I'd say yes, since
    each one is a finished calculation.
  - Lower limit. You refuse 1e100 and above, but there's no floor. Does
    something like 1e-200 show in exponential form, or is it refused too?
  - Negative numbers in paste. Does "-£5" work? Is accounting-style "(1,234)"
    refused?
  - Screen reader wording. ≈ needs to be read aloud as "approximately". That's
    fine, since it's not one of the banned words, but it should be written into
    the accessibility story.

  Once you've decided A to C, send the layout and documents.

❯ Good catches, all three.

  A. Cap typing at 15 significant digits. 20 was a number I picked without
  thinking about the display. One more digit shows the short message, same as
  before.

  B. You are right, that is the same mistake again. I have not checked a
  spreadsheet, so we do not argue from errors at all. The spreadsheet is just
  the tool they would otherwise use, and the argument is what this gives them:
  the working, step by step, and a mark when a number is not exact. We describe
  what our product does, never what another one does wrong.

  C. Recall the internal value and keep the ≈ attached, so the recalled number
  shows ≈ too. That way the next result matches the tape, and the user can
  still see it was not exact.

  The gaps.
  - Round half up everywhere, internal and display. It is what an ordinary
  person expects.
    Test right at the boundary, a 16th digit of exactly 5.
  - Error state. Clear, clear entry, any digit, the decimal point, paste and
  recalling a
    tape line all get you out. Operators, equals, sign toggle and backspace do
  nothing. An operator cannot get you out because there is no number for it to
  work on.
  - An error does not write a tape line. The tape is a record of results you
  can reuse, and an error is not one.
  - Yes, each extra equals is its own tape line.
  - Lower limit. Below 1e-9 shows in exponential. A non zero result smaller
  than 1e-99 is refused with a message, same as the top end. Never shown as 0,
  that would be the silent rounding I said we never do.
  - Paste negatives. -£5 and £-5 both work. Accounting brackets like (1,234)
  are refused with a message. People in finance do use them, so I will list it
  as an assumption rather than pretend it is wrong. - ≈ is read out as
  approximately. Put that in the accessibility story.

  No need to give me the list again. Put all of this in the decisions when you
  write
  CLAUDE.md. Layout and documents next.

⏺ Got it. I'll put all of this in CLAUDE.md when I write it. Three small things
  to settle at the same time:

  1. Pasting more than 15 digits. I'll treat it like typing past the cap: refuse
     with the short message rather than cut it off.
  2. What "refused" means for out-of-range results (1e100 and above, or a
     non-zero result below 1e-99). I'll make it the same as divide by zero: an
     error state with the same ways out and no tape line. That way there's one
     error behaviour, not two.
  3. Negatives at the halfway point. decimal.js rounds half up away from zero,
     so −2.5 becomes −3, not −2. I think that's what an ordinary person expects
     too. I'll record it as part of the half-up decision and add a negative test
     right at that boundary.

  Ready for the layout and documents.

❯ Agreed on all three. For 2, the messages are "Number too large" and "Number
  too small".

  Same error state, same ways out, no tape line.
  Now set up the repo. Top level layout is fixed, exactly this:

   README.md
    src/
    docs/   app-roles.md, jobs-to-be-done.md, user-stories.md
    transcripts/   session-01.md

  Inside src is mine. Hexagonal split so logic never touches the framework:
    domain/  pure calculation, imports nothing from react, ui, app. No DOM.
    app/     hooks wiring domain to UI
    ui/      components, CSS Modules, tokens
    shared/  types used by more than one layer
  Dependencies point inwards only. I will enforce this with a test later so
  keep it clean.

  Stack: Vite, React, TypeScript strict, decimal.js, Vitest with React Testing
  Library and
  jsdom. No CSS framework. No backend, no env vars, no API keys. A reviewer
  clones this and runs it with nothing but Node 20.

  Also add .gitignore excluding node_modules, dist, .env and .env.*. An .nvmrc
  with 20, and an engines field.

  Then two more things.

  CLAUDE.md at root. Under 100 lines. The thesis, which is exact where possible
  and marked with ≈ where not, plus a tape that shows the working. The two
  users, the layer rules, the rule that no user facing arithmetic uses JS
  number operators, testing approach, commit convention. A working brief, not
  an essay. Add a Decisions section with everything we agreed before this
  message, including A to C, the gaps, and the three points you just raised, so
  later sessions start from it.

  Two skills under .claude/skills:

  product-spec/SKILL.md. The three formats I must follow.
    Role: "A [role] is [who they are and their situation]. They can [what they
  see and do]. They must never [what the app prevents]." Last part only where
  it applies.
    Job: "When [situation], I want to [motivation], so I can [outcome]." Names
  its role.
    A job must be writable without mentioning the app, a screen or a button. If
  it cannot
    be, it is a feature and it does not belong in the jobs doc.
    Story: "As a [role], I want [capability], so that [benefit]." Names the job
  it serves,
    has Given/When/Then criteria, has a status of Implemented or Not
  implemented.
    Criteria cover normal case plus invalid input, boundaries, very large and
  very small
    numbers, and what the user can do after a result or an error.
    IDs: R-1, J-1, S-1.

  adr/SKILL.md.
  Title, status, date, context, decision, alternatives rejected and why,
  consequences including bad ones. One decision per file, 0001-short-title.md,
  one page.
  An ADR with no rejected alternative is a note, not an ADR.

  Commit .claude, I want the context I gave you in the repo. Leave src and the
  three docs
  empty. Show me the tree.

  Last thing. Git is already initialised in this folder and my name and email
  are already
  set. Do not touch git config. gh is installed and authenticated. Create a
  public GitHub repo named exactly hassa-chaudry-calculator, with this folder
  as the source, origin as the remote, and push.

  Public matters, a reviewer opens it from a link with no account.
  Commit convention, written into CLAUDE.md as a standing rule: commit at the
  end of each unit of work, never in one lump at the end. Small commits,
  subject under 60 characters, body saying why rather than what, story ID
  referenced where the work maps to one.

  Push after each commit so the history accrues as the work happens. Order
  matters. Documents get committed before the code they specify, so the history
  shows
  the sequence the work actually happened in. Never batch a documents commit
  with a source commit.

  Tell me each time you commit and what the message was, so I can stop you if
  the history gets messy.

  Ran 1 shell command (ctrl+o to expand)

⏺ Git isn't actually initialised here, despite what you said. Before going
  further I'll check the global identity and what's in .vscode.

  Ran 1 shell command (ctrl+o to expand)

⏺ Vitest 5 needs Node 22, so I'll check which older versions still support Node
  20.

  Ran 3 shell commands (ctrl+o to expand)

⏺ Git wasn't initialised, so I'm running git init -b main. I'm not touching git
  config; your global name and email are already set. Next I'll write the
  documents.

  Ran 1 shell command (ctrl+o to expand)

⏺ Write(CLAUDE.md)
  ⎿  Wrote 87 lines to CLAUDE.md
       1 # Calculator: working brief
       3 A four-function calculator (+ − × ÷) you can trust with money. T
         ake-home exercise.
       5 ## Thesis
         r on screen is either exactly right or carries ≈.
       7 - **A tape shows the working**, so a figure can be checked step
       8 - The alternative is a spreadsheet. We argue from what this prod
         uct gives (the working and an honest mark), never from what anot
         g about any.
      10 ## Users
     … +132 lines (ctrl+o to expand)

⏺ Write(.claude/skills/product-spec/SKILL.md)
  ⎿  Wrote 42 lines to .claude/skills/product-spec/SKILL.md
       1 ---
       2 name: product-spec
       3 description: Formats and rules for writing roles, jobs and user
         ser-stories.md. Use whenever adding or changing any of them.
       4 ---
       5
       6 # Product spec formats
       8 Three documents, three formats. Follow them exactly.
       9
      10 ## Roles: `docs/app-roles.md`, IDs `R-1`, `R-2`, …
     … +41 lines (ctrl+o to expand)

⏺ Write(.claude/skills/adr/SKILL.md)
  ⎿  Wrote 36 lines to .claude/skills/adr/SKILL.md
       1 ---
       3 description: Format for architecture decision records. Use when
         recording a decision that has real alternatives.
       4 ---
       6 # Architecture decision records
       7
         ecimal-js-for-arithmetic.md`), numbered in sequence. One page at
          most.
       9
         t write it.
     … +33 lines (ctrl+o to expand)

  Ran 2 shell commands (ctrl+o to expand)

⏺ Commit 1 is pushed: ba69854 "Add working brief and spec skills". The repo is
  public at https://github.com/hassan-product/hassa-chaudry-calculator. Next is
  the documents skeleton.

⏺ Write(README.md)
  ⎿  Wrote 14 lines to README.md
      1 # Calculator
      2
      3 A four-function calculator you can trust with money. It is exact
        a tape that shows the working.
      4
      5 **Status:** project setup only. The calculator has not been built
         yet.
      7 ## Run it
      8
      9 Requires Node 20.19 or later (`.nvmrc` pins 20).
     … +7 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ Commit 2 is pushed: a4d0d1a "Add README and empty spec documents". Next is the
  toolchain.

  Ran 5 shell commands (ctrl+o to expand)

⏺ The repo is set up and public at
  https://github.com/hassan-product/hassa-chaudry-calculator. There are three
  commits, each pushed as it was made. Typecheck passes, and npm test exits
  cleanly because there are no tests yet.

  Commits

  1. ba69854 Add working brief and spec skills: CLAUDE.md and the two skills.
  2. a4d0d1a Add README and empty spec documents: README, the three empty docs
     and the empty transcript.
  3. bc206b5 Scaffold Vite, React, TypeScript and Vitest: config files only. src
     holds just placeholder files so the four layer folders exist in git.

  Each body says why rather than what. None cites a story ID, because no stories
  exist yet.

  Tree

  .claude/skills/adr/SKILL.md
  .claude/skills/product-spec/SKILL.md
  .gitignore
  .nvmrc
  CLAUDE.md          (87 lines)
  README.md
  docs/app-roles.md
  docs/jobs-to-be-done.md
  docs/user-stories.md
  package.json
  package-lock.json
  src/app/.gitkeep
  src/domain/.gitkeep
  src/shared/.gitkeep
  src/ui/.gitkeep
  transcripts/session-01.md
  tsconfig.json
  vite.config.ts
  vitest.setup.ts

  Where I departed from what you said

  - Git wasn't initialised. I ran git init -b main. Git config is untouched, and
    commits use your global name and email.
  - "Node 20" means 20.19 or later. Vite 8 needs at least that, so engines is
    ^20.19.0 || >=22.12.0. .nvmrc says 20, which installs the latest 20.x.
  - Older test versions. The newest Vitest (5) and jsdom (30) need Node 22, so I
    held them back to Vitest 4 and jsdom 29. TypeScript is 5.9 rather than 7.
  - npm run dev and npm run build don't work yet. There's no index.html or entry
    file, because you asked for src to stay empty. Both arrive with the first
    UI commit.
  - Vitest is set to pass when there are no tests. It's marked in the config to
    remove once real tests exist.

  Needs your call

  1. Your .vscode/ folder is untracked and not ignored. I followed your
     .gitignore list exactly. Should I add .vscode to it?
  2. There's nowhere for ADRs yet. docs/ is fixed at three files. I'd suggest
     docs/adr/, unless subfolders count as breaking the layout.
  3. Pressing an operator straight after = is undecided. Normally it continues
     from the result (5 = then + 2). That's not in the Decisions yet, so I left
     it out rather than invent it.

❯ All fine. Answers first.

  1. Yes, ignore .vscode. A reviewer runs this from the README with Node, so
  editor settings are not part of the project. Also ignore .DS_Store. Do not
  ignore the .claude skills or CLAUDE.md, those are part of the work. If
  .claude/settings.local.json contains a token, a password, or a path on my
  machine, show me the file and stop. Otherwise ignore that file too, since it
  is local settings rather than the project. Commit the .gitignore change on
  its own before anything else.
  2. docs/adr is fine. The three required files have to stay exactly where they
  are. Extra files and folders next to them do not break the layout. Same for
  architecture.md, product-brief.md and docs/ux later.
  3. Good that you left it out. An operator after equals continues from the
  result, so 5 = then + 2 = gives 7 and writes its own tape line. Add it to the
  decisions.

  Also note for the README later, the prerequisite is Node 20.19 or later, not
  just 20.

  Now docs/app-roles.md first, then docs/jobs-to-be-done.md from those roles.
  Use the product-spec skill.

  Two roles only. Two genuinely different beats three that overlap.
  Accessibility is not a separate role, it is a requirement on both, so put it
  in both sets of must never clauses.

  R-1 Everyday Calculator User. Mid way through something else when a number
  comes up they cannot do in their head. Shopping, a bill, homework with a kid.
  No training, no interest in how it works, often on a phone. Will mistype,
  will press things in an order that makes no sense.

  R-2 Desk Checker. Works with money figures as part of the job. Invoices,
  expense claims, quotes. Numbers arrive from elsewhere so they paste or retype
  them, often with currency symbols and separators attached. Keyboard first,
  resents reaching for the mouse. Not calculating to find an answer,
  calculating to check somebody else's answer, so they care about seeing the
  steps.

  Write the must never clauses properly, that is the part most people leave
  blank. Mine roughly: never show a number as exact when it is not, never round
  or cut a value without the user being able to tell, never silently discard
  input it did not understand, never leave the user stuck in an error they
  cannot escape without reloading.

  For each role add where their needs conflict and how I am resolving it,
  rather than pretending both win. Everyday wants one bare screen, Desk Checker
  wants the tape always visible.

  Then the jobs, four to six, each naming its role. Situations I have in mind:

  - interrupted by a number, wants back to what they were doing
  - realises partway through they entered something wrong, does not want to
  restart
  - about to approve a money figure, wants to recompute it so they are not
  passing on someone else's mistake
  - long chain of steps, needs to find where it went wrong rather than redo it
  all
  - figures came from a spreadsheet or email, needs them in without
  transcription errors

  Enforce the no-features rule hard on me. Before you write the file, check
  each job and throw out anything that fails. Tell me which of mine are
  weakest, I would rather cut one than ship a feature dressed as a job.

⏺ I'll check whether .claude/settings.local.json exists before changing
  .gitignore.

  Ran 1 shell command (ctrl+o to expand)

⏺ .claude/settings.local.json doesn't exist, so there's nothing to inspect. I'll
  ignore it in advance so it can never be committed by accident.

  Ran 1 shell command (ctrl+o to expand)
  ⎿  2 skills available

⏺ Commit 4 (7264c12, "Ignore editor, OS and local Claude settings") is pushed.
  Next I'll add the operator-after-equals decision and extra-docs rule to
  CLAUDE.md, then load the product-spec skill.

  Ran 1 shell command (ctrl+o to expand)

⏺ Skill(product-spec)
  ⎿  Successfully loaded skill
⏺ Commit 5 is pushed: a61e4a4 "Record operator-after-equals rule and docs
  layout". The README already says Node 20.19 or later, so nothing to change
  there.

  Now the roles.

⏺ Write(docs/app-roles.md)
  ⎿  Wrote 44 lines to docs/app-roles.md
      1 # App roles
      3 There are two roles. Accessibility is not a third role. It is a r
        auses.
      5 ## R-1 Everyday Calculator User
      7 A Everyday Calculator User is someone midway through something el
        se (shopping, splitting a bill, helping a child with homework) wh
         no training and no interest in how the calculator works, they ar
        s that make no sense.
      9 They can enter a sum by touch, mouse or keyboard, see the running
        he answer, and reuse it in t
     … +83 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ I checked each of your five jobs before writing: #5 failed as worded since
  "needs them in" implies a feature, so I reworded it around the copying risk to
  make it pass; #2 passes but is the weakest, which I'll discuss once the file
  is committed.

⏺ Write(docs/jobs-to-be-done.md)
  ⎿  Wrote 33 lines to docs/jobs-to-be-done.md
      1 # Jobs to be done
      2
        ton. A need that can only be described in terms of the product is
         a feature and belongs in the user stories, not here.
      4
      6
      7 **Role:** R-1 Everyday Calculator User
      8
        not work out in my head, I want to get the answer quickly and kno
        w it is right, so I can get back to what I was doing.
     … +35 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ Both docs are written and pushed, and I kept all five jobs.

  Commits

  4. 7264c12 Ignore editor, OS and local Claude settings.
     .claude/settings.local.json doesn't exist yet, so there was nothing to show
     you. I ignored it in advance so it can't be committed by accident.
  5. a61e4a4 Record operator-after-equals rule and docs layout. This puts the "5
     = then + 2 = gives 7" rule in CLAUDE.md and allows docs/adr/ and the other
     extra docs. The README already said Node 20.19 or later, so it didn't
     change.
  6. 1a56dda Define the two app roles
  7. 3cde6a2 Define jobs to be done for both roles

  Roles

  - Each role gets six "must never" clauses. Your four are in both, plus
    accessibility in both.
  - R-1 also must never need to understand the arithmetic or meet the words
    "precision" or "floating point".
  - R-2 also must never have a pasted figure guessed at, or have their figures
    left on a shared machine.
  - Each role has a conflicts section that names who loses each trade-off: the
    tape on screen, ≈ over a tidy answer, operations running as entered, the
    tape not surviving a reload, no tape editing, refused paste formats.
  - I wrote the "must never" part as a bulleted list rather than one sentence,
    because six clauses in one sentence don't read.

  Jobs, weakest first

  1. J-2, recover from a slip. It's the one I'd cut. It passes the no-app test,
     but:
     - It overlaps J-4. "Don't redo what I got right" is the same outcome, just
       found earlier.
     - The product only half delivers it. Backspace and clear entry fix the
       figure you're typing now. Because each operation runs as you go, a figure
       already followed by an operator has been folded into the result, and R-1
       has no way to fix it short of starting again.

     I kept it because mistyping is the one thing R-1 is defined by. If you cut
     it, strike it through rather than renumber.
  2. J-5, use figures as sent. It only passes after rewording. "Get them in" was
     the paste feature dressed as a job. The real job is "don't add a copying
     mistake of my own", which is true of copying between any two documents,
     with or without a calculator.
  3. J-1, J-3 and J-4 are solid. J-3 (is this right?) and J-4 (where did it go
     wrong?) are close, but they lead to different things: J-3 depends on the
     arithmetic being exact, J-4 on the tape.

  Gap: no job for tape recall

  Recall is in scope (Decision 8), but no job covers it, so its story would have
  no job to name. One option, for R-2:

  ▎ "When a result I have just worked out is part of the next sum, I want to
  ▎ carry it forward exactly as it is, so I do not retype it and lose digits or
  ▎ make a slip."

  That would be J-6. I didn't add it because you asked me to cut jobs, not add
  them.

❯ Add J-6 to docs/jobs-to-be-done.md before you write any stories, and commit
  that on its own. It belongs to R-2: When a result I have just worked out is
  part of the next sum, I want to carry it forward exactly as it is, so I do
  not retype it and lose digits or make a slip. Check it against the no-app
  rule. If it fails, tell me instead of softening it.

  Keep J-2. Do not strike it.

  While you are in the roles doc, make every must-never clause its own sentence
  beginning "They must never". A bullet that does not read that way does not
  match the format.

  Now docs/user-stories.md. This is the document everything hangs on.

  Every story names its job, and that job must exist in the jobs doc. If a
  story serves no job, do not invent a job to cover it, tell me.

  Mark everything Not implemented for now. We flip to Implemented only after
  the behaviour actually works in the app.

  The behaviour is the Decisions section in CLAUDE.md. Every decision there
  needs at least one acceptance criterion. If writing the criteria shows a
  decision is vague or clashes with another one, stop and tell me rather than
  picking.

  The recall story serves J-6. It recalls the full internal value with the ≈
  still attached, and it can be done from the keyboard as well as the mouse.

  The J-2 story has to be honest about the limit. The figure being typed can be
  corrected. A figure already followed by an operator has been folded into the
  result and cannot be undone in this version. That is the gap the
  editable-tape story exists to close.

  These go in verbatim, they are the product promise:

  - 0.1 + 0.2 shows exactly 0.3
  - 1.005 * 100 shows exactly 100.5
  - 0.1 * 3 shows exactly 0.3
  - 100 / 3 shows ≈ 33.3333333333333
  - 100 / 3 then * 3 shows ≈ 100
  - 2 + 3 * 4 shows 20, and the expression line shows 5 × once the multiply is
  pressed
  - 5 / 0 shows "Cannot divide by zero", and typing 7 afterwards shows 7

  Not in the decisions yet, so add them:

  - keyboard: digits, decimal, + - * /, Enter or = for equals, Escape for
  clear, Backspace. Numpad the same as the top row. No modifier keys, nothing
  that fights a browser shortcut.
  - the tape is visible by default above 900px wide and behind a toggle below
  that

  Every story needs criteria for the normal case and for what goes wrong:
  invalid input, boundaries, very large and very small numbers, and what the
  user can do next after a result or an error. If a story genuinely has no
  failure case, say so rather than padding.

  Then three stories marked Not implemented, with criteria written properly so
  they are ready to build, each with an honest one line reason about scope, not
  importance:

  - editing an earlier tape line and having everything after it recalculate
  - percent and tax mode
  - export the tape as CSV

  Then docs/product-brief.md. Two pages max, and do not restate the roles, jobs
  or stories. Only these:

  - the problem in a paragraph
  - the tool they would otherwise use, which is a spreadsheet, and what this
  gives them that is worth switching for, argued only from what we do and never
  from what another product gets wrong
  - who it is explicitly not for: no scientific work, no brackets or
  precedence, not a spreadsheet
  - what success looks like as behaviour
  - what I have taken off the table and why
  - the roadmap for the three cut stories in build order
  - open questions I do not know the answer to, with the assumption I am
  running on for each, including UK and US number style and accounting brackets
  being refused

⏺ The pasted block is your reply, so I'll follow it. First J-6.

  J-6 passes the no-app rule. It mentions no app, screen or button, and "retype"
  works for any medium: someone copying a subtotal onto paper has the same job.
  "Exactly as it is" describes the outcome the user wants, not a feature.

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ I found that line 14 of the roles doc used my wording, "silently ignored,"
  which overreaches by forbidding the error-state rule allowing operators to do
  nothing. I'll restore your original wording while converting each clause into
  a sentence.

  Ran 1 shell command (ctrl+o to expand)

⏺ Commits 8 and 9 are pushed:
  - 36eee31 Add J-6: carry a result forward. It passes the no-app rule.
  - 03856cb Write each must-never clause as its own sentence. It also corrects
    an overreach of mine: I had written "never have a key press silently
    ignored", which would have forbidden your own rule that operators do nothing
    in the error state. It now uses your wording: "never silently discard input
    it did not understand". The roles doc also says 900px now instead of "on a
    phone".

  I've stopped before writing the stories. Writing the criteria turned up four
  places where decisions clash and nine where they're too vague to test. Each
  has my recommendation. Reply "all recommendations" plus any changes and I'll
  add them to Decisions, commit that, then write the stories and the brief.

  Clashes

  1. What the tape line shows. Decision 3 says the tape records each step the
  way the expression line does ("5 ×"). Decision 8 says it shows the full chain.
  - If the tape shows "5 × 4 = 20", the chain is gone, and J-4 (find the wrong
    step) dies.
  - If it shows "2 + 3 × 4 = 20", anyone used to phone calculators reads it as
    14, so the order rule is hidden exactly where an auditor looks.

  Recommend: every step and its running result, e.g. 2 + 3 = 5 → × 4 = 20. That
  is also what J-4 needs. We'd settle the exact layout in UX.

  2. Enter conflicts with keyboard focus. Enter means =. But "every action works
  without a mouse" means recall, empty tape and the tape toggle are reached
  with Tab and activated with Enter. Sign toggle and clear entry have no key at
  all in your list.

  Recommend:
  - Enter means = everywhere except on a focused tape line, tape toggle or
    empty-tape control, where it activates that control.
  - On-screen keys don't keep focus after a click, so Enter can never repeat the
    last key pressed.
  - Delete is clear entry.
  - Sign toggle has no key and is reached with Tab, because every unmodified key
    is already a digit, an operator, or likely to clash with something.

  3. Is ≈ carried through the whole calculation? Decision C (recall keeps its ≈)
  means yes. Then 100 ÷ 3 × 0 shows ≈ 0, even though the true answer is 0.

  Recommend: carry it. Once a rounded value is involved, the result is marked
  until a new calculation starts. ≈ 0 overstates the doubt but never claims
  something false. Proving exactness case by case is where bugs would hide.

  4. The display limits clash at the boundary. 999,999,999,999,999.5 is below
  1e15, so the rule says plain notation. But rounding it to 15 digits gives
  1,000,000,000,000,000, which is 16 digits written out.

  Recommend: apply every limit (1e15, 1e-9, 1e100, 1e-99) to the value after
  rounding to 15 digits, not the internal value.

  Too vague to test

  5. How exponential numbers look. 1.5e+15 is jargon for R-1, and a screen
  reader reads it as "e plus 15".

  Recommend: show 1.5 × 10¹⁵, read aloud as "1.5 times 10 to the power 15".

  6. Typing small numbers. Leading zeros after the point don't count as
  significant, so someone can type 0.000…0001 indefinitely. While they're typing
  it, the below-1e-9 rule would switch the display to exponential.

  Recommend:
  - Every digit typed counts toward the 15, except one leading 0 before the
    point.
  - The figure being typed is always shown exactly as typed.

  7. Keys that have no effect. Examples are a second decimal point, Backspace
  with nothing to delete, and = with no operator ("5 ="). Your must-never rule
  is about input that wasn't understood. These are understood; they just have
  nothing to act on.

  Recommend: they do nothing, show no message, and write no tape line. Messages
  are for refused content only (the digit cap and paste).

  8. Pressing = straight after an operator ("2 + ="). Some calculators give 4
  here by assuming 2 + 2.

  Recommend: it does nothing. We never guess.

  9. Refusal messages and what they leave behind. A refused paste and the digit
  cap need wording. They also need a rule that they don't enter the error state.

  Recommend: the figure stays as it was, and these messages:
  - digit cap: "15 digits maximum"
  - unreadable paste: "Couldn't read that as a number"
  - ambiguous paste: "Unclear which mark is the decimal point"
  - brackets: "Use a minus sign for negative numbers"

  The currency symbols we strip are £, $ and €.

  10. Emptying the tape can't be undone. For R-2 that's an accident waiting to
  happen.

  Recommend: a second press to confirm, with no dialog box.

  11. Sign toggle on a result. Recommend: the result becomes negative, no tape
  line is written, and the next operator continues from it. Sign toggle on 0
  does nothing, because negative zero is never shown.

  12. Where a recalled value lands. Recommend:
  - While typing a figure, recall replaces that figure.
  - After an operator, it becomes the next figure.
  - After = or at the start, it begins a new calculation.
  - Keyboard: Tab into the tape, arrow keys between lines, Enter to recall (per
    item 2).

  13. Clear vs clear entry. Recommend: Escape clears the whole current
  calculation. Delete resets only the figure being typed to 0.

  The 900px rule reads cleanly as written: above 900px the tape is visible, at
  900px and below it's behind the toggle. The keyboard rule and the 900px rule
  will go into CLAUDE.md in the same commit as your answers.

❯ All recommendations, with these changes.

  2. Change one part. A keypad key reached with Tab has to work with Enter and
  Space like any button, otherwise a keyboard only user cannot press it. So the
  rule is: Enter and Space activate whatever control has keyboard focus,
  keypad keys included. When no control has focus, Enter means equals. Clicking
  a keypad key with the mouse does not leave focus on it, so Enter after a
  click still means equals. Typing a digit, the decimal point or an operator
  key while any control has focus takes focus off that control, so the next
  Enter means equals. Delete is clear entry and sign toggle has no key, as you
  said.
  9. Add two things. A message stays until the next key press or paste, with no
  timer. It is announced to a screen reader the same way a result is.
  10. The first press changes the control's label to "Press again to empty". It
  goes back if focus leaves the control or any other key is pressed. No timer.
  11. Add: the ≈ stays if the result had one. Sign toggle while typing a figure
  flips that figure.
  13. Add: Backspace only edits the figure being typed. On a result it does
  nothing. Neither Escape nor Delete touches the tape.

  Before writing anything else, read the whole Decisions section top to bottom
  with these added. Check every decision against every other one and against
  the must never clauses in app-roles.md. Fix the wording where two decisions
  say the same thing differently. Only stop me for a real contradiction, where
  following one decision breaks another. Do not stop for something that is just
  unspecified.

  After that the decisions are frozen. If writing the stories turns up
  something unspecified, do not stop. Pick the option that fits the must never
  clauses best, add it to Decisions, and list each one at the end of your reply
  so I can overrule it. If something cannot be decided now, put it in the
  product brief as an open question with the assumption we are running on.

  Commit the decisions, then write the stories and the brief as I asked.

⏺ The pasted block is your reply, so I'll work from it. First the full Decisions
  section as it stands.

  Read 1 file (ctrl+o to expand)

⏺ No real contradictions found, just six redundant decisions stated two
  ways—I've reworded each into a single clear rule (≈ propagation, tape line
  format, digit cap counting, paste validation, phone breakpoint, and Node
  version).

  Ran 1 shell command (ctrl+o to expand)

⏺ It comes to exactly 100 lines and needs to be under. I'll trim the top
  sections.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Commit 10 is pushed: e5b3427 "Consolidate and freeze product decisions".
  CLAUDE.md is 97 lines. Next the stories.

⏺ Write(docs/user-stories.md)
  ⎿  Wrote 615 lines to docs/user-stories.md
       1 # User stories
       2
         ection of `CLAUDE.md`; the story says which decisions it covers.
          Every story is **Not implemented** until its criteria pass in t
         he running app.
       5 Notation:
       6 - Keys are written as pressed: `2 + 3 =`.
       7 - "Display" is the main number.
       9 - A message is a short notice that is not an error.
      10 - Numbers shown on screen are in `code`.
     … +891 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ Commit 11 is pushed: ab0ffc6 "Write user stories against the frozen
  decisions". Next I'll add the details the stories forced me to pick to the
  Decisions section.

  Ran 1 shell command (ctrl+o to expand)

⏺ Write(docs/product-brief.md)
  ⎿  Wrote 66 lines to docs/product-brief.md
      1 # Product brief
      3 Roles, jobs and stories are in `app-roles.md`, `jobs-to-be-done.m
        y the product exists, what it is not, and what is still unknown.
      4
      6
        htly wrong one can look identical. For a quick sum that rarely ma
        er on screen cannot be trusted on its own. They either accept it
        on faith or rework it another way. The problem is not that arithm
         in front of them is exact, or how it was reached.
      9 ## What they would
     … +123 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

⏺ The stories, the product brief and the decisions are written and pushed. I
  found no real contradictions in the decisions, so I didn't stop. Two stories
  have weak or missing job links, flagged below.

  Commits

  10. e5b3427 Consolidate and freeze product decisions
  11. ab0ffc6 Write user stories against the frozen decisions
  12. bb7912e Add decisions picked while writing stories
  13. 30705e4 Add product brief: about 1,150 words, which fits in two pages.

  The stories

  - There are 18. S-1 to S-15 are the build scope; S-16 to S-18 are the three
    you cut. All 18 are marked Not implemented.
  - Each lists the decisions it covers. A table at the end shows every decision
    has at least one criterion. The exception is Decision 18, the stack, which
    isn't behaviour; running the README checks it.
  - All seven product-promise cases are in word for word, across S-3, S-4, S-5
    and S-9.
  - S-7 (fix the figure being typed) states the limit at the top. It also has a
    criterion for it: after 5 + 3 ×, Backspace changes nothing and the line
    still shows 8 ×. That points to S-16 as the fix.
  - Seven stories have a category marked not applicable, each with a one-line
    reason. Five have no very large or very small case of their own: S-2, S-6,
    S-10, S-14 and S-15. S-5 has no invalid input of its own, and S-9 is
    entirely about what happens after an error.

  Job links to look at

  - S-18 (export) serves no job. No job covers "show my working to someone
    else". I marked it "Job: none" rather than invent one. The brief lists it as
    an open question.
  - S-14 (empty the tape) is linked to J-4, and the link is weak. A tape with
    only the current check on it is easier to search, but no job is about
    emptying. If that's not good enough, it has no job either.

  Choices I made that you can overrule

  Made while merging the decisions:
  1. Thousands commas on every plain number, including while typing.
  2. Results drop trailing zeros; the figure being typed keeps them.
  3. Starting a new calculation forgets the last operation, so typing 9 = after
     a result does nothing.
  4. Delete on a result starts a new calculation at 0.
  5. Every way out of an error starts a new calculation.
  6. Typing any calculator key (not just digits, . and operators) moves focus
     off a control.
  7. Paste accepts a leading + and the true minus sign (U+2212). It refuses tabs
     or line breaks inside the pasted text.
  8. Paste comes only from the browser's own paste command; there is no paste
     button.
  9. A refused paste during an error leaves the error in place and shows the
     message as well.
  10. A pasted figure counts as typed, so Backspace edits it. A recalled figure
      doesn't: Backspace does nothing and a digit replaces it.

  Made while writing the stories:

  11. Negatives use a true minus sign, read aloud as "minus".
  12. Clicking a tape line recalls it.
  13. Long tape lines wrap and are never cut off.
  14. Emptying the tape works during an error and leaves the error showing.
  15. Keys that do nothing announce nothing.
  16. VoiceOver testing means macOS Safari specifically.
  17. On-screen keys are at least 44×44px down to a 320px-wide screen.
  18. The on-screen keypad has clear, clear entry and backspace keys.
  19. The empty-tape control is labelled "Empty tape".

  Inside the three cut stories only, not added to Decisions because nothing is
  being built:

  20. S-16 (edit a tape line). Only figures can be edited, not operators. Lines
      that continued from or recalled the edited result recalculate; independent
      lines don't.
  21. S-17 (percent and tax). 200 + 20 % means 20% of 200. After × or ÷, % means
      divide by 100. Tax rates must be between 0 and 100.
  22. S-18 (export). UTF-8 with a byte-order mark. Results as plain digits, with
      1E+90-style notation for exponential numbers. Cells written so a
      spreadsheet never treats them as formulas.

  Open in the brief

  - Paste may not work in Safari. The page has no text box, and I'm not sure
    Safari passes a paste to a page without one. This is the first thing I'd
    check when building; if it fails, it becomes an ADR.
  - Two × signs on one line. A large number in exponential form followed by ×,
    like ≈ 9.99999999999998 × 10²⁹ ×, reads badly. I've left it as a question
    for the UX design.

❯ Three fixes, then the decisions stay frozen.

  1. Thousands commas are for results only: the display after =, the running
  result, and the tape. The figure being typed or pasted is shown as digits,
  with no commas added. Typing 1234.50 shows 1234.50. Pasting £1,234.56 shows
  1234.56. Backspace always removes the last digit. Update S-1, S-11 and any
  other criterion that inserts a comma into a figure being entered.
  2. Add J-7 for R-2. When I pass on a figure I have checked, I want the person
  receiving it to see how I reached it, so they can trust it without asking me
  to go through it again. S-18 serves J-7. Remove the open question that asks
  whether this job exists.
  3. Add J-8 for R-2. When I finish one check and start another, I want the
  previous working out of the way, so I do not mix the two up. S-14 serves J-8.
  Delete the sentence that calls this the weakest link in the document.

  Both jobs have to pass the no-app test. If either one fails, tell me instead
  of rewording it into a feature.

  The expression line that shows a multiply after a power, such as ≈
  9.99999999999998 × 10²⁹ ×, is decided. The UX work may change spacing and
  type size only, not the characters. Update the open question to say that.

  Everything else in your list of choices stands. Commit the jobs, then the
  story and brief fixes, and show me the criteria you changed.

⏺ The pasted block is your reply, so I'll work from it. Checking the two jobs
  against the no-app rule:
  - J-7 passes. Passing on a checked figure with your working attached is just
    as true of a handwritten note on an invoice. No app, screen or button is
    involved.
  - J-8 passes. Clearing one job's working before starting the next is just as
    true of a desk or a notepad.

  Ran 1 shell command (ctrl+o to expand)

⏺ Commit 14 is pushed: 293a64a "Add J-7 and J-8 for the desk checker". Next the
  comma fix across Decisions, stories and brief.

  Ran 1 shell command (ctrl+o to expand)

⏺ I'll check every remaining comma-grouped number in the stories to confirm each
  one is a result, the tape, or the raw pasted text.

  Searched for 1 pattern (ctrl+o to expand)

⏺ All remaining commas are in results, the tape, or the raw text being pasted,
  so nothing else needs changing.
  Ran 1 shell command (ctrl+o to expand)

⏺ All three fixes are in, and J-7 and J-8 both passed the no-app test. The
  decisions are frozen from here.

  Commits

  14. 293a64a Add J-7 and J-8 for the desk checker
  15. deb08b7 Keep commas off entered figures; link S-14, S-18

  This also updated the Decisions in CLAUDE.md:
  - Decision 2: commas are for results only.
  - Decision 4: the characters after a power are fixed, and UX may change only
    spacing and type size.
  - Decision 5: Backspace always removes the last digit.

  Criteria changed

  S-1 Type a figure
  - when I type `1234.50`, then the display shows `1,234.50`.
  + when I type `1234.50`, then the display shows `1234.50`, with no comma
  added.

  - when I type `999999999999999`, then the display shows `999,999,999,999,999`
  in plain notation.
  + when I type `999999999999999`, then the display shows `999999999999999` in
  plain notation.

  S-11 Paste a figure
  - `£1,234.56`, then the display shows `1,234.56`
  + `£1,234.56`, then the display shows `1234.56`

  - `$1,000,000`, then the display shows `1,000,000`
  + `$1,000,000`, then the display shows `1000000`

  - `1 234`, then the display shows `1,234`, because spaces are stripped
  + `1 234`, then the display shows `1234`, because spaces are stripped

  - paste `123,456,789,012,345`, then the display shows `123,456,789,012,345`.
  + paste `123,456,789,012,345`, then the display shows `123456789012345`.

  - paste `1,234`, then the display shows `1,234`. This relies on the UK/US
  assumption.
  + paste `1,234`, then the display shows `1234`. This relies on the UK/US
  assumption.

  + (new) Given I pasted `£1,234.56`, when I press `+`, then the expression line
  shows
  + `1,234.56 +`. Commas appear once the figure becomes a result.
  I added the new one so the point where commas first appear is tested, not just
  their absence.

  S-14 Empty the tape
  - Job: J-4. This is the weakest job link in the document. …
  + Job: J-8

  S-18 Export the tape as CSV
  - Job: none. No job covers showing my working to someone else. …
  + Job: J-7

  Brief changes

  - The open questions about J-7 and about S-14's job are gone.
  - The question about the two × signs now says the characters are decided and
    only spacing and type size may change.
  - The example in the spaces question now reads 1234.
  - The roadmap now says S-18 serves J-7.

  Nothing else needed changing. The commas left in the stories are all in
  results, the tape, or the raw text being pasted.

❯ Now docs/architecture.md, plus ADRs in docs/adr using the adr skill. This is
  a write-up of decisions already made. Nothing in it may add or change
  behaviour. If you find a gap in the Decisions while writing it, list it at
  the end and do not fill it in.

  architecture.md needs these sections.

  Layer model. domain, app, ui, shared. Say what belongs in each and that
  dependencies only point inwards. State what is forbidden in each direction
  precisely enough that a test can check it.

  Tech stack. For each choice, give the reasoning and the alternative I
  rejected. These are my choices. Write up my reasoning, do not pick for me.
  Use the versions actually in package.json.

  - Vite over Next.js or Create React App. The app is fully static, with no
  server, no routing and no data fetching, so a framework built for server
  rendering and routing pays for things I do not use. It also has to run on a
  reviewer's machine with no accounts, and a static build is the shortest path
  to that.
  - React with TypeScript in strict mode. The calculator is a state machine,
  and I want its states as a discriminated union, so adding a state breaks the
  build until every transition handles it.
  - decimal.js over native numbers and over big.js. Native numbers are the
  reason this product exists. big.js sets division precision in decimal places,
  and every rule I have is in significant digits, 15 shown and 34 internal.
  Measure the real gzipped size of decimal.js from the installed package and
  state it, do not guess. Then say honestly why that cost is worth it for a
  product whose promise is that it never hides an inexact number.
  - CSS Modules with design tokens over Tailwind or a component library. One
  screen and about twenty elements. A dependency with its own config to style
  twenty elements is not worth it, and I want a reviewer to be able to read the
  CSS.
  - Vitest with React Testing Library. It uses the same transform pipeline as
  the build, so there is no second toolchain, and testing through the DOM makes
  the tests read like the acceptance criteria.

  Three Mermaid diagrams, because GitHub renders them and nobody should have to
  download an image to understand this.

  - Context: the user and the browser, making it obvious there is no server and
  no network call anywhere.
  - Layers: every module and the direction of every dependency arrow.
  - A stateDiagram-v2 of the engine, with every state and every transition.
  Include the error state and every way out of it, where the ≈ is set and where
  it is cleared, and which transitions write a tape line.

  Error model. One error type, each with a code and a message written for a
  person. Errors are returned as values and never thrown across a layer
  boundary. Refusal messages such as "15 digits maximum" are not errors and do
  not enter the error state, so show how the model keeps the two apart. The UI
  must be unable to render a raw error.

  A short section listing the fitness functions I will enforce later, so this
  document and the tests cannot drift apart.

  Then the ADRs, one decision per file. At minimum:

  - layered domain separation
  - decimal arithmetic over native numbers
  - fixed precision with a ≈ marker over fraction arithmetic
  - immediate execution over operator precedence
  - errors as values, not exceptions
  - no persistence in this version, because money figures left in a browser on
  a shared desk machine are a privacy problem
  - no CSS framework

  Each ADR names a real rejected alternative and at least one consequence I
  will not enjoy. An ADR with only upsides is a sales pitch.

  Commit architecture.md and the ADRs as separate commits.

⏺ The pasted block is your reply, so I'll work from it. First the real
  decimal.js size and the installed versions.

  Ran 3 shell commands (ctrl+o to expand)

⏺ That output wasn't fully minified, because library builds keep whitespace.
  I'll measure it as an app build instead, the way the real app will ship.

  Ran 2 shell commands (ctrl+o to expand)

⏺ decimal.js comes to 12,699 bytes gzipped (about 12.7 KB) and 32,032 bytes
  minified. For context, I'll also measure React with the same method.

  Ran 1 shell command (ctrl+o to expand)

⏺ decimal.js alone comes to 12.7 KB gzipped (32 KB minified), compared to 67.4
  KB for React+react-dom combined, based on a Vite 8.3.3 production build test.
  Now onto the architecture doc.

⏺ Write(docs/architecture.md)
  ⎿  Wrote 277 lines to docs/architecture.md
       1 # Architecture
       3 This document records decisions already made; it adds no behavio
         ur. The behaviour itself is in the Decisions section of `CLAUDE.
         md` and in `user-stories.md`. ADRs for individual choices are in
         is empty until the first story is built.
       4
       6
       7 ```
       8 src/
      10   domain/     pure calculation
     … +376 lines (ctrl+o to expand)

⏺ I'll add the gaps section, remove two diagram edges that are wrong or risky,
  and commit.

  Ran 1 shell command (ctrl+o to expand)

⏺ Commit 16 is pushed: d161868 "Add architecture write-up". Before the ADRs,
  I'll check that the three Mermaid diagrams actually parse.

  Ran 1 shell command (ctrl+o to expand)

⏺ All three diagrams parse. Now the ADRs.

⏺ Skill(adr)
  ⎿  Successfully loaded skill

  Ran 1 shell command (ctrl+o to expand)

⏺ docs/architecture.md and seven ADRs are written and pushed, in two separate
  commits.

  Commits

  16. d161868 Add architecture write-up
  17. 3539ffd Add ADRs for the seven core decisions

  architecture.md

  - Layers. A table says what belongs in each layer and what it may import.
    Seven numbered "forbidden" rules are written so a test can check each one
    against import statements. Two examples: ui may never import domain, and
    only domain/decimal.ts may import decimal.js.
  - Stack. Your reasoning for each choice, with versions from the lockfile.
    Vitest 4 and jsdom 29 are noted as held back for Node 20.19.
    - Your Vitest reasoning named no rejected alternative, so that cell says
      "not stated" rather than one I made up.
  - decimal.js size. I built it on its own with Vite 8.3.3 in production mode:

  |                   | Gzipped      | Minified     |
  |-------------------|--------------|--------------|
  | decimal.js        | 12,699 bytes | 32,032 bytes |
  | React + react-dom | 67,431 bytes |              |
    So decimal.js adds roughly a fifth of React's weight. It can't be trimmed to
    the parts we use, so the whole library ships.
  - Diagrams. All three Mermaid diagrams parse with the mermaid library: the
    context diagram (no network; the storage APIs are listed as unused), the
    layer diagram (every planned module and every import arrow), and the engine
    state diagram. I haven't seen them rendered on GitHub.
    - The state diagram has six states: Ready, Entering, Recalled, Pending,
      Result and Error. It shows every way out of an error, which transitions
      write a tape line (only two do), and where ≈ is set and cleared.
    - Recalled is its own state because Decision 10 makes a recalled value
      uneditable.
  - Error model.
    - Errors and notices are separate types: an error is a state of the engine,
      while a notice rides alongside whatever state the engine was already in,
      so a notice can't put the calculator into an error.
    - The UI never sees a raw error: it can't import domain, and everything it
      receives is a display string.
    - One thing I didn't expect: decimal.js itself throws on a malformed string.
      The design handles it by building every number in one file, from input
      that has already been checked.
  - Fitness functions. Nine checks to turn into tests later: layer imports, one
    door to decimal.js, no native number maths calls, no throw in domain, no
    storage or network, word-for-word messages, no raw error types in the view
    model, the banned words, and every state handled.

  ADRs

  0001 layers, 0002 decimal.js, 0003 ≈ over fractions, 0004 immediate execution,
  0005 errors as values, 0006 no persistence, 0007 no CSS framework. Each names
  a real rejected alternative and at least two costs. A few of those costs:
  - 0002: a stray native number can still slip through type checking, and no
    grep catches operator use.
  - 0004: brackets can't be added later without reworking the engine.
  - 0006: sessionStorage is rejected because tabs on shared machines get left
    open. An accidental Cmd+R loses a long check with no recovery.
  - 0007: focus rings, key sizes and live regions are all hand-written, with no
    tested library defaults behind them.

  Gaps found in the Decisions (listed in architecture.md, not filled)

  - G-1: an operator pressed on a fresh calculator. Does it start 0 +, or do
    nothing?
  - G-2: ± or Delete pressed when an operator is pending and nothing has been
    typed. Also Delete on a recalled value.
  - G-3: Backspace on 12.. "Always removes the last digit" would give 1., not
    12.
  - G-4: what the expression line shows after = and during an error.
  - G-5: what the person sees if a bug throws despite the error model.
  - G-6: whether the browser restoring the page, tape included, when someone
    navigates back counts as persistence.

  G-1 to G-4 block parts of the engine, so they need answers before I build it.

❯ Answers, then a standing rule, then the UI.

  G-1. An operator on a fresh calculator acts on the 0 that is showing, so +
  gives 0 +. It is not a guess, the 0 is on screen.

  G-2. ± with an operator pending and nothing typed does nothing, the same as ±
  on 0. Delete with nothing typed does nothing. Delete on a recalled value
  replaces it with 0 and keeps the pending operator.

  G-3. Backspace removes the last character typed, digit or decimal point. 12.
  becomes 12. Reword Decision 5 to say that.

  G-4. After =, the expression line shows the last step that produced the
  result, for example 5 × 4 =. During an error it shows the step that failed,
  for example 5 ÷ 0 =. The full chain is on the tape.

  G-5. If a bug throws anyway, show "Something went wrong. Press Escape to
  start again." Escape resets the calculation and keeps the tape. Nobody ever
  needs a reload.

  G-6. The browser keeping the page in memory when someone goes back is not
  persistence. We write nothing to storage. It is the same exposure as a tab
  left open, which ADR 0006 already accepts. Add it to that ADR's consequences.

  Also, the rejected alternative for Vitest is Jest. Jest needs its own
  TypeScript and ESM transform setup alongside Vite, Vitest reuses the Vite
  config. Put that in the cell that says "not stated".

  Standing rule from now on, written into CLAUDE.md so it carries into later
  sessions. Do not stop for unspecified behaviour again. Decide it with these,
  in this order: the must never clauses in app-roles.md first, then act on what
  is showing on screen rather than guessing, then a key with nothing to act on
  does nothing. Add the choice to Decisions and list it at the end of your
  reply so I can overrule it. Only stop if two written decisions directly
  contradict each other.

  Commit the decision changes and the ADR and architecture updates.

  Then, before any UI, give me options. Do not build anything.

  Three or four distinct design directions for the calculator. Every one must
  follow the frozen decisions, including the tape being visible above 900px and
  behind a toggle at 900px and below, the tape staying quiet, ≈ being the only
  precision signal, and the keys on screen. They differ in layout, hierarchy,
  type and where things sit, not in behaviour. One should push as far as the
  decisions allow toward the Desk Checker, so I can see what I give up by going
  middle of the road.

  For each one, give an ASCII sketch, a sentence on what it optimises for,
  which role it favours, what it costs the other one, and how it looks at 320px
  wide.

  Then tell me which one you would pick and why, and the strongest argument
  against your own pick.

⏺ The pasted block is your reply, so I'll work from it. First the decision
  changes.

  Read 1 file, ran 2 shell commands (ctrl+o to expand)

⏺ Commit 18 is pushed: 02501a0 "Resolve gaps G-1 to G-6; add
  unspecified-behaviour rule". Now the architecture doc and ADR updates.

  Ran 2 shell commands (ctrl+o to expand)

⏺ Commit 19 is pushed: 2a45607 "Fold resolved gaps into architecture and ADRs".
  Below are the four design directions.

  Commits

  18. 02501a0 Resolve gaps G-1 to G-6; add unspecified-behaviour rule
  - Your six answers are in the Decisions.
  - Decision 5 now says Backspace removes the last character typed, digit or
    point.
  - The standing rule has its own section in CLAUDE.md, which is now 98 lines.
  19. 2a45607 Fold resolved gaps into architecture and ADRs
  - The state diagram has no undecided transitions left, and all three diagrams
    still parse.
  - The Vitest row now names Jest as the rejected alternative.
  - The error model has a section on how bugs are caught.
  - ADR 0005 gains the cost of a second failure path, for bugs.
  - ADR 0006 gains your point about the back/forward cache: it's the same
    exposure as a tab left open.

  ---

  Design directions

  All three keep the behaviour identical. Common to all:
  - The keypad is the same five rows of four keys, 72px wide at 320px:
  C  CE  ⌫  ÷  /  7 8 9 ×  /  4 5 6 −  /  1 2 3 +  /  ± 0 . =
  - The expression line sits above the display.
  - Messages appear on a line under the display.
  - At 900px and below, the tape sits behind a "Show tape" toggle.
  - The tape is a single Tab stop with arrow keys between lines (Decision 10).
    So wherever it sits, a keyboard user crosses it with one Tab.

  A. Pocket

  +--------------------------------------------+-------------------+
  |                                  5 × 4 =   | Tape              |
  |                                       20   | 12 + 8 = 20       |
  |                                            | 100 ÷ 3 =         |
  |  [  C  ] [ CE  ] [  ⌫  ] [  ÷  ]           |  ≈ 33.33333333333 |
  |  [  7  ] [  8  ] [  9  ] [  ×  ]           |  33 → × 3 = ≈ 100 |
  |  [  4  ] [  5  ] [  6  ] [  −  ]           | 2 + 3 = 5 → × 4   |
  |  [  1  ] [  2  ] [  3  ] [  +  ]           |  = 20             |
  |  [  ±  ] [  0  ] [  .  ] [  =  ]           |        Empty tape |
  +--------------------------------------------+-------------------+
  - Optimises for: the number and the keys. It's a familiar calculator with the
    tape as a narrow side note in small grey type.
  - Favours: R-1.
  - Costs R-2:
    - A narrow tape column (about 260px) breaks long chains over two or three
      lines, so finding a step (J-4) means reading broken lines.
    - Results don't line up, so a column of totals can't be scanned.
  - At 320px: the calculator fills the width and "Show tape" sits under the
    keypad. Opening it pushes the tape below the keys, so you scroll down to
    read it and back up to type.
  - Reading order: calculator first, then tape. This is the most natural order
    for a screen reader.

  B. Roll (printing calculator)

              +------------------------------------------+
              | Tape                          Empty tape |
              |   12 + 8 = 20                            |
              |   100 ÷ 3 = ≈ 33.3333333333333           |
              |     → × 3 = ≈ 100                        |
              |   2 + 3 = 5 → × 4 = 20                   |
              | - - - - - - - - - - - - - - - - - - - -  |
              |                                5 × 4 =   |
              |                                     20   |
              |  [  C  ] [ CE  ] [  ⌫  ] [  ÷  ]         |
              |  [  7  ] [  8  ] [  9  ] [  ×  ]         |
              |  [  4  ] [  5  ] [  6  ] [  −  ]         |
              |  [  1  ] [  2  ] [  3  ] [  +  ]         |
              |  [  ±  ] [  0  ] [  .  ] [  =  ]         |
              +------------------------------------------+
  - Optimises for: the tape reading as what you just did. One column, about
    560px wide. The tape scrolls above the display and the newest line sits
    right above the expression line, so pressing = visibly "prints" the step you
    just saw. It teaches what the tape is without a word of explanation.
  - Favours: both, slightly R-1.
  - Costs R-2:
    - About 8 to 10 tape lines are visible at once.
    - A 1440px monitor is mostly empty.
    - Results don't line up in a column.
  - At 320px: "Show tape" sits at the top, where the tape would be. When open,
    the tape takes up to about 40% of the height above the display. On a 320×568
    screen that pushes the bottom key row off screen, so the page scrolls while
    the tape is open.
  - Reading order: tape before display, but that's one Tab stop. A screen reader
    user meets the tape list first.

  C. Ledger (as far toward the Desk Checker as the decisions allow)

  +----------------------------------------------+----------------------+
  | Tape                             Empty tape  |             5 × 4 =  |
  |                                              |                  20  |
  |  1   12 + 8                     =       20   |                      |
  |  2   100 ÷ 3 = ≈ 33.3333333333333            | [ C ][ CE ][ ⌫ ][ ÷ ]|
  |        → × 3                    = ≈    100   |  Esc  Del  Bksp   /  |
  |  3   2 + 3 = 5 → × 4            =       20   | [ 7 ][ 8  ][ 9 ][ × ]|
  |                                              | [ 4 ][ 5  ][ 6 ][ − ]|
  |                                              | [ 1 ][ 2  ][ 3 ][ + ]|
  |                                              | [ ± ][ 0  ][ . ][ = ]|
  |                                              |                Enter |
  +----------------------------------------------+----------------------+
  - Optimises for: auditing.
    - The tape gets about two-thirds of the width.
    - The final result of each line sits in a right-hand column, aligned on the
      decimal point, using digits of equal width.
    - ≈ gets its own narrow column so results still line up.
    - Line numbers are added for reference only.
    - The keys show their keyboard equivalents underneath.
    - The tape stays quiet in weight and colour (light rules, regular weight, no
      colour), but it is the largest thing on screen. The characters of each
      line are unchanged; only the spacing differs.
  - Favours: R-2.
  - Costs R-1:
    - On a laptop, the first thing R-1 sees is an empty ledger, with the
      calculator pushed into a side rail.
    - The display is still the highest-contrast element, but no longer the
      biggest thing on screen.
    - The key legends are more text R-1 never asked for.
  - At 320px: almost the same as A, with the tape behind the toggle. The one
    difference is the open tape on a phone: there's no room for columns, so each
    line shows its working with the result right-aligned on its own row below.
  - Reading order: the tape comes first, visually and for a screen reader.
    That's one Tab stop to get past it.

  ---

  My pick: B, Roll

  - It keeps the quiet-tape decision as it was meant. That decision exists so
    R-1 isn't faced with a tape-dominated screen. In B the tape is present but
    secondary, and on a laptop doing homework with a child, R-1 still sees a
    calculator.
  - It serves J-4 better than A. The tape is wide enough that most chains fit on
    one line, and the newest step sits right next to the display.
  - It's one layout at every width. At 320px it is the same column with the tape
    folded away. That means one structure to build, one focus order to test
    with VoiceOver, and no layout switch at 900px beyond the toggle.

  Going middle of the road gives up, compared with C:
  - results aligned in a scannable column
  - roughly twice as many visible tape lines
  - line numbers
  - key legends

  The strongest argument against B: the 900px breakpoint already sends most R-1
  traffic, which is on phones, to the toggle layout. Above 900px, the person in
  front of the screen is most likely a desk checker at a desk. B gives that
  person a phone-width column on a big monitor and about eight lines of tape.
  The tape is the reason to use this product over a spreadsheet (J-4), and B
  gives it the least room exactly where it matters most. If you think the person
  above 900px is mostly R-2, C is the honest answer, and B is protecting an R-1
  who is mostly somewhere else.

  ---

  Choices made under the standing rule (overrule any)

  1. During a "Something went wrong" fault, every input except Escape does
     nothing. That includes recall, paste and emptying the tape. The screen says
     to press Escape, so I acted on what's showing.
  2. The fault message is announced like an error. This follows from the
     must-never clause about screen reader users.
  3. Delete on a recalled value leaves an ordinary typed 0. So Backspace on it
     does nothing, and a digit replaces it, the same as any 0.

❯ Going with C, and your argument against B is the reason. The breakpoint
  already decides who is in front of the screen. Above 900px that is mostly
  someone at a desk, and the tape is the reason they would use this over a
  spreadsheet, so that is where it gets the room. Below 900px, B and C are
  close to the same layout anyway.

  Three changes to C.

  1. Flip it. Calculator on the left, tape on the right. Then the visual order,
  the Tab order and the screen reader order are all calculator first, and the
  first thing anyone sees is a calculator, not an empty ledger.
  2. The display stays the largest type on screen, not only the highest
  contrast. The tape gets the width, the display keeps the size.
  3. An empty tape shows one quiet line, "Finished calculations appear here",
  and nothing else.

  Keep the key legends, small and muted. Escape for C and Delete for CE are not
  obvious, and the legends are the only place a Desk Checker learns them.

  On your choices, 2 and 3 stand. 1 needs a change. A phone has no Escape key,
  so "Press Escape" would leave the Everyday user stuck, which is the must
  never I care most about. During a fault the on-screen C key does the same as
  Escape, and the message reads "Something went wrong. Press C or Escape to
  start again." Every other input still does nothing.

  Now docs/ux/wireframes.md, in ASCII, readable straight on GitHub. Draw every
  state, not just the happy one:

  - fresh
  - typing a figure
  - operator pending with the running result on the expression line
  - a result, with the last step on the expression line
  - a result with ≈
  - an exponential result, including ≈ 9.99999999999998 × 10²⁹ × on the
  expression line
  - each error, with the failed step on the expression line
  - the fault message
  - each refusal message
  - a recalled value
  - an empty tape
  - a tape with a dozen lines, scrolled
  - the empty-tape control waiting for its second press
  - 320px wide with the tape closed, and with it open

  Add the full keyboard map as a table.

  Accessibility. The display is announced politely and the expression line is
  not. Every key is a real button whose name is a word, so "divide", not
  "slash". ≈ is read as approximately and − as minus. Focus is always visible
  and never trapped. Targets are at least 44px. Colour is never the only thing
  that carries meaning.

  Design tokens with real names and values for colour, spacing, radius and type
  scale, with digits of equal width in the display and the tape. Light and
  dark through prefers-color-scheme, no theme switcher. Check every text
  pairing against WCAG AA in both themes, and if one fails, change the value
  and tell me which one.

  Then build docs/ux/mockup.html. One static file, no build step and no
  dependencies, that opens straight from Finder. Draw every state above side by
  side, labelled, using the real tokens, with nothing interactive. Underneath,
  show the token palette: every colour swatch with its name and value, the
  type scale at actual size, the spacing scale, and the measured contrast ratio
  of each pairing with a pass or fail. Show light and dark side by side on the
  same page, rather than depending on my system setting.

  Put a comment at the top of mockup.html saying these are the values the app
  must use. If the app and this file ever disagree, one of them is a bug.

  Commit the wireframes and the mockup separately. Tell me when mockup.html is
  ready, so I can open it.

⏺ The pasted block is your reply, so I'll work from it. First the layout and
  fault changes go into Decisions, since the wireframes will be drawn from them.
  Decision 17 gets condensed onto fewer lines to keep CLAUDE.md under 100.

  Ran 1 shell command (ctrl+o to expand)

⏺ The "visual source of truth" line belongs under Layout, not Product promise.
  Moving it:

  Ran 1 shell command (ctrl+o to expand)

⏺ Commit 20 is pushed: a678b72 "Record layout direction C and C key during a
  fault". Next I'll check every token pairing against WCAG AA in both themes
  before writing anything else.

  Ran 1 shell command (ctrl+o to expand)

⏺ All pairings already pass AA in both themes, with the tightest margins being
  light-mode key outlines (3.15 vs. 3.0 minimum) and light-mode operator key
  legends (4.96 vs. 4.5). Next I'll generate the token and contrast tables from
  this single source so the wireframes and mockup stay consistent.

  Ran 1 shell command (ctrl+o to expand)

⏺ Now the wireframes.

  Made 1 scratchpad edit +449 (ctrl+o to expand)

⏺ Before assembling, I'll check the ASCII frames line up, since box-drawing
  frames break silently.

  Ran 1 shell command (ctrl+o to expand)
⏺ Three blocks are misaligned and the 2.10 result splits awkwardly across lines,
  so I'll generate the tape rows in code to keep the columns aligned.

  Ran 1 shell command (ctrl+o to expand)

⏺ I'll write those blocks with explicit column widths and check each one.

  Ran 2 shell commands (ctrl+o to expand)

⏺ The recall drawing has an error. Line 2's final result is ≈ 100, not ≈ 33.33,
  and recall brings back the final result. I'll fix that, then assemble the
  file.

  Ran 1 shell command (ctrl+o to expand)

⏺ The Tab-order row in the keyboard map is wrong for 900px and below, where the
  toggle sits above the keypad. Focus order has to follow visual order, so I'll
  fix it.

  Ran 1 shell command (ctrl+o to expand)

⏺ Commit 21 is pushed: a8ce883 "Add wireframes for every state of layout C".
  Under the standing rule, the choices the drawings made go into Decisions as
  well.

  Ran 1 shell command (ctrl+o to expand)

⏺ Commit 22 is pushed: e82b265 "Record screen details chosen in the wireframes".
  Next I'll build the mockup, generated from the same token source as the
  wireframes.

  Made 1 scratchpad edit +381, ran 1 shell command (ctrl+o to expand)

⏺ The mockup is generated. Before telling you it's ready, I'll render it in
  headless Chrome and look at it.

  Listed 1 directory, ran 1 shell command (ctrl+o to expand)

⏺ Stop Task
  ⎿  UX=/private/tmp/claude-501/-Users-chaudry-code-hassa-chaudry-calculato
     r/13a14408-87b8-42ba-951e-bdcd17beacfb/scratchpad/ux;
     C="/Applications/Google Chrome.app/C… · stopped

  Read 1 file, ran 2 shell commands (ctrl+o to expand)

⏺ Status: the mockup renders, but the desktop light and dark frames stack
  vertically instead of sitting side by side. I'm fixing that, then checking the
  rest of the page.

  Read 4 files, ran 1 shell command (ctrl+o to expand)

⏺ I found a gap splitting the decimal point display ("2,087 .26") and a fragile
  CSS hack for the ≈ line marker at 320px. I'll fix both and then check the
  token and contrast sections at the bottom of the page.

  Read 2 files, ran 1 shell command (ctrl+o to expand)

⏺ The mockup renders correctly in headless Chrome, with light/dark states
  aligned and all swatches/contrast checks passing. Committing it now.

  Ran 1 shell command (ctrl+o to expand)

⏺ docs/ux/mockup.html is ready to open from Finder: it's a single file with no
  dependencies and no network requests. It shows all 25 states in light and dark
  side by side, then the swatches, the contrast table, the type scale at actual
  size, and the spacing and radius scales. The note at the top says these are
  the values the app must use, and that if the app and the file disagree, one of
  them is a bug.

  I checked it by rendering the page in headless Chrome and looking at
  screenshots.

  Commits

  20. a678b72 Record layout direction C and C key during a fault
  21. a8ce883 Add wireframes for every state of layout C
  22. e82b265 Record screen details chosen in the wireframes
  23. 6bc2726 Add static mockup with tokens and contrast

  What's in it

  - Wireframes: every state you listed, drawn in ASCII and checked by script for
    alignment. The file also has the keyboard map, the accessibility rules, and
    the tokens with their contrast tables.
  - Contrast: 17 pairings in each theme (34 in all) pass WCAG AA on the first
    values, so I didn't change any. The tightest are key outlines in light mode
    (3.15 against a minimum of 3.0) and legends on operator keys in light mode
    (4.96 against 4.5). The mockup works out its contrast table from the tokens
    on the page itself, so the table and the colours can't drift apart.
  - Display stays the largest type: at 320px the long display size is 19px and
    the key labels are 18px.

  Two mistakes I caught and fixed

  - The recalled-value drawing showed ≈ 33.33 in the display. Recall brings back
    a line's final result, which for line 2 is ≈ 100.
  - The Tab order put the tape toggle after the keypad at 320px. The toggle sits
    above the keys there, so that broke visual order. It now follows the
    screen.

  Choices made under the standing rule (all now in Decisions 15a)

  1. With an operator pending, the display shows the running result (5 × above,
     5 below).
  2. Every figure on the expression line and the tape uses result formatting, so
     89.10 appears as 89.1, with commas.
  3. An error triggered by an operator shows the failed step ending in that
     operator (5 ÷ 0 +), not an = the user never pressed.
  4. During a fault, the expression line is empty.
  5. The expression and message lines keep their height when empty, so the
     keypad never moves. Messages have a bar at the start as well as text.
  6. The display steps down in size with length (12 or fewer characters, then 13
     to 18, then longer). If a value is still too wide, it wraps rather than
     being cut.
  7. An empty tape hides its heading and the empty-tape control, as you asked
     ("nothing else"). Screen readers still find a region named "Tape".
  8. A new tape line scrolls the list to show it.
  9. At 900px and below, the toggle sits between the display and the keypad. The
     open tape appears there, directly under where a recalled value lands, and
     scrolls within half the screen height.
  10. Spoken forms: × is "times", ÷ is "divided by", → is "then". Keys are named
      with words: "change sign", "decimal point".

  Notes

  - The tape uses a CSS grid to line results up across rows. Some versions of
    Safari's accessibility tree used to drop list semantics with that layout.
    The mockup doesn't need to care, but the app should check with VoiceOver
    that the tape is still read as a list.
  - The mockup was generated from a script in my scratchpad so the wireframe
    tables and the mockup share one set of values. The script isn't committed;
    the committed HTML is the source of truth, as you asked.

[Image #1]

❯ Opened the mockup and went through it properly. First your choices, then my
  feedback, then what to update. Do not build any app code yet, I want to
  review the updated mockup before giving the go ahead.

  Your ten choices stand, with two changes. Give the tape an explicit list role
  in the app, whatever the CSS does to it, because Safari can drop list
  semantics once the bullet styling is removed. Record it in Decisions and add
  it to the VoiceOver check. And choice 6 changes because of point 4 below: the
  display must never be smaller than the key labels, so at 320px it stops
  stepping down at a size above the labels, and a value still too wide wraps.

  Feedback.

  1. The keyboard legends overlap the key labels. C and Esc are printed on top
  of each other, same for CE and Del, and the backspace icon and Bksp. You
  checked this with screenshots and still missed it. Keys get taller, the main
  label stays centred, the legend sits in its own row at the bottom of the key
  with clear space between them. Same for equals, = centred and Enter at the
  bottom. Legends show only on devices with a mouse and a hover, so phones get
  a clean keypad.

  2. The state name bar, for example "Fault", sits over the top of the cards
  below it. Fix that so nothing in the mockup covers anything else.

  3. I did not understand the ± key, so the Everyday user will not either. It
  also renders badly. Relabel it +/−, keep the accessible name change sign, and
  add a hover tooltip "Change sign" on devices with a mouse.

  4. New keypad, six rows of four, no empty cells, and clear spacing between
  every key:

  MC   MR   M−   M+
  C    CE   ⌫    ÷
  7    8    9    ×
  4    5    6    −
  1    2    3    +
  +/−  0    .    =

  Memory is the top row in a quieter style. All keys are the same size and
  shape. The five operators down the right take the accent colour, with = the
  strongest. This replaces the decision that = is the only accent key, mark it
  as a change.

  The keypad must not be narrow. People with weak eyesight will use this. Above
  900px the calculator column is never narrower than 480px and the tape takes
  the rest. Key labels are at least 24px. On phones the keypad uses the full
  width of the screen minus the safe margins. Every key is at least 44px at
  320px wide. On a short window the keys get shorter, never narrower, and the
  page may scroll. Say that plainly.

  5. Keyboard and numpad must be complete. Digits, the decimal point and all
  four operators on both the top row and the numpad, numpad Enter, and on Apple
  keyboards the numpad Clear key as Escape and the numpad = as equals.
  Characters that need Shift, like * and +, count as that character. The no
  modifier rule means Ctrl, Cmd and Alt. With Num Lock off the numpad sends
  other keys, follow whatever the browser reports.

  6. No separate phone build. Keep the layout already decided for 900px and
  below, the same calculator at full width with the tape behind the toggle. Add
  only the cheap safeguards: no double tap zoom on the keys, and no hover
  colour that stays stuck after a tap. The mockup keeps its one 320px view. Do
  not promise phone browsers or landscape we have not checked.

  7. Low vision. The whole thing must still work at 200% browser zoom with
  nothing cut off or overlapping, reflow to one column at 400% zoom with no
  sideways scrolling, and respect a larger default text size set in the
  browser. Sizes in rem so they follow the user's setting.

  8. "Something went wrong" has to explain itself. The honest reason is that
  the fault is inside the calculator and the user did not cause it. New text:
  "Something went wrong inside the calculator. It was not caused by anything
  you entered. Your tape is kept. Press C or Escape to start again."

  9. Hover. On devices with a mouse, the key's label colour changes on hover as
  well as its background. Pressed and focused each get their own look, and
  focus is never shown only by colour. Every hover and pressed pairing passes
  WCAG AA in light and dark.

  10. Memory comes back, and the tape stays. They do different jobs. The tape
  is the record of everything that happened, so you can see where a number came
  from and bring any result back. Memory holds one running total you are
  building, for example the totals of three invoices worked out one at a time,
  added with M+ and read back with MR, without retyping any of them. Recalling
  tape lines one by one can do that too, but with more steps and an easy chance
  to miss one.

  This reverses the brief, where memory was taken off the table for two
  reasons. First, recalling a tape line seemed to do the same job. It does not,
  recall brings back one value while memory keeps adding. Second, a stored
  value nobody can see is hidden state. It no longer is, because every M+ and
  M− writes a tape line and an M indicator shows while memory holds a value.
  Record both reasons and how each is answered.

  Rules:
  - M+ adds the full internal value showing to memory and M− subtracts it. If
  that value has ≈, memory gets ≈ and keeps it until MC.
  - M+ and M− write a quiet tape line showing the value and the new memory
  total, for example M+ 40, memory 95. Recalling that line brings back the
  memory total on it.
  - MR behaves like recalling a tape line, including getting you out of an
  error.
  - During an error, M+ and M− do nothing. MC works at any time.
  - The M indicator is announced as memory and the total.
  - Memory survives C and Escape and is lost on reload, like the tape.
  - Memory keys have no keyboard key, because the usual shortcuts clash with
  the browser's, such as Ctrl+P and Ctrl+R. They are reached with Tab. Say that
  cost plainly.
  - Anything else, decide under the standing rule and list it.

  11. No theme menu. Light and dark follow the device setting through
  prefers-color-scheme, as originally decided. No other theme.

  12. Percent stays Not implemented. S-17, percent and tax, stays exactly as it
  is, and there is no % key.

  13. Sound is a Not implemented story. It serves a new R-2 job about entering
  figures from paper without looking away from the page. Word its reason as the
  conditions under which it would be built, so the status and the reason
  agree: only off by default, only once users ask for it, and only after
  testing alongside VoiceOver. The logic behind those conditions goes in the
  story, the brief and its own ADR. Sound would have to be off by default in an
  office or beside a screen reader, so most people would never hear it. It
  competes with VoiceOver's speech. It behaves differently across devices,
  because the iPhone silent switch can mute it and browsers hold audio back
  until the first tap, and a feature that works on some devices and not others
  undermines trust. It can only be checked by ear, not by an automated test.
  And the need it serves is already met by the display and the tape.

  What to update, in this order, each its own commit.

  - CLAUDE.md Decisions, for everything above. Mark the reversals clearly:
  memory was previously excluded, and = was previously the only accent key.
  - docs/jobs-to-be-done.md. Add an R-2 job about keeping a running total aside
  while each part is worked out separately, an R-2 job about entering figures
  from paper without looking away from the page, and a job for both roles about
  figures being easy to read in harsh light or with weak eyesight, so I do not
  misread a digit. Check every new job against the no-app rule and tell me if
  one fails.
  - docs/app-roles.md, wherever what a role can do or must never experience has
  changed, including memory for R-2.
  - docs/user-stories.md. New stories for memory and for being readable at any
  size, both in scope and Not implemented until built, and a new Not
  implemented story for sound. Each names its job. Update the stories that
  change: the on screen keys, the keyboard and numpad story, the tape story for
  memory lines, recall for memory lines, the fault message, and hover and
  focus. The Not implemented stories are editing a tape line, percent and tax,
  export, and sound, each with its reason.
  - docs/product-brief.md. A short section on why the product has both a tape
  and memory, in plain words, using the reasoning in point 10. Memory comes out
  of taken off the table with both original reasons and how each is now
  answered. Low vision support is in scope. Sound goes on the roadmap with the
  conditions above. Add an open question for phones being checked only at 320px
  in a desktop browser.
  - docs/architecture.md. Where memory lives in the domain, how memory writes
  tape lines, and confirm there is still no storage and no network. Update the
  state diagram for memory.
  - New ADRs: bringing memory back alongside the tape, with keeping the tape
  only as the rejected alternative, and not building sound yet.
  - README.md. Add a short note on tape and memory and why both exist, two or
  three sentences, so it is not lost before the final README.
  - docs/ux/wireframes.md and docs/ux/mockup.html. The new six by four keypad
  with spacing, the legends at the bottom of the keys, +/−, the M indicator, a
  memory tape line, the new fault text, and hover, pressed and focused states
  for each key type, in light and dark. Keep the one 320px view and add one
  desktop view at 200% zoom. Recheck every contrast pairing and show the
  results in the table.

  Also in docs/user-stories.md: the criteria are there but nothing is labelled
  as acceptance criteria, and a reviewer scanning for that term will not find
  it. In every story, add a heading "Acceptance criteria" directly above
  "Normal case" and keep the five category headings under it as they are. Give
  every criterion an ID in the form AC-1.1, AC-1.2, numbered in order within
  each story, at the start of the line. Add one line to the Notation section
  explaining the IDs. For existing criteria, do not change any wording except
  where the feedback above changes behaviour. Show me the diff for S-1.

  When the mockup is updated, tell me so I can open it. Hold the flow diagrams
  until I approve it.

⏺ The pasted block is your reply, so I'll work from it. There are ten commits to
  make, starting with the Decisions in CLAUDE.md. That section is already at 97
  lines, so I'll fold each decision onto fewer lines to make room.

  Ran 3 shell commands (ctrl+o to expand)

⏺ Commit 24 is pushed as c36fdb3, bringing CLAUDE.md to 74 lines. The three new
  jobs (J-9 running totals, J-10 eyes-on-document, J-11 poor lighting/eyesight)
  all pass the no-app rule check since they apply beyond just this calculator.

  Read 1 file, ran 2 shell commands (ctrl+o to expand)

⏺ Commits 24 to 26 are pushed: Decisions, jobs and roles. I'm now reworking the
  user stories, which is the largest file. It needs new stories, behaviour
  updates and acceptance-criteria IDs.

  Read 1 file (ctrl+o to expand)

⏺ I'll apply the story changes in one script. Each replacement asserts its
  target text exists, so nothing can apply silently to the wrong place.

  Ran 1 shell command (ctrl+o to expand)

⏺ The script ran and the file was written. The exit code came from grep -c
  finding no ± left, which is what I wanted. Next, the "Acceptance criteria"
  headings and the criterion IDs.

  Ran 1 shell command (ctrl+o to expand)

⏺ The global ± replacement also caught the notation line, so it now says
  "previously drawn as +/−". Fixing that:

  Searched for 1 pattern, ran 1 shell command (ctrl+o to expand)

⏺ Commit 27 is pushed: 86ef824 "Update stories for memory, keypad, zoom; add AC
  IDs". There are 271 criteria, every ID is unique, and the five category
  headings are unchanged. Next the brief.

  Searched for 1 pattern, ran 1 shell command (ctrl+o to expand)
⏺ Commit 28 is pushed: 7b70d63 "Explain tape and memory; add low vision and
  sound". Next the architecture doc.

  Searched for 1 pattern, ran 1 shell command (ctrl+o to expand)

⏺ All three diagrams still parse. Committing:

  Ran 2 shell commands (ctrl+o to expand)

⏺ Commits 29 and 30 are pushed: 8176caf "Place memory in the domain and the
  state diagram" and 99a9ac0 "Add ADRs for memory and for not building sound".
  Next the README note.

  Ran 1 shell command (ctrl+o to expand)

⏺ Commit 31 (d026cd1) is pushed, documenting why both tape and memory exist.
  Next, I'll define new key colours—accent operators, memory row, hover,
  pressed, tooltip—and check all pairings before redrawing anything.

  Ran 1 shell command (ctrl+o to expand)

⏺ Found a contrast issue: at 900px and below, light-mode key outlines on the
  page background measure 2.94, just under the 3.0 minimum. I'll darken
  --color-key-border in light mode to fix it.

  Ran 2 shell commands (ctrl+o to expand)

⏺ All pairings now pass—35 per theme in both light and dark—with the only change
  being a darker --color-key-border in light mode for better contrast. Moving
  on to the wireframes next.

  Searched for 1 pattern (ctrl+o to expand)

⏺ I'll generate the new ASCII keypads in code so every frame lines up. Border
  style marks the key type: dotted for memory, light for digits and controls,
  heavy for operators, double for =.

  Ran 1 shell command (ctrl+o to expand)

⏺ Keys need clear space between the label and the legend, so I'll give them four
  inner rows (blank, label, blank, legend). Next I'll assemble the updated
  wireframes.

  Ran 1 shell command (ctrl+o to expand)

⏺ Next the keyboard map, accessibility and tokens sections, then an alignment
  check across every frame.

  Ran 1 shell command (ctrl+o to expand)

⏺ Every frame lines up. I'll eyeball the three new drawings before committing.

  Ran 1 shell command (ctrl+o to expand)

⏺ One inconsistency: the 320px tape jumps from line 2 to line 4, and its memory
  total doesn't match the indicator. Fixing it so the numbers agree:

  Ran 1 shell command (ctrl+o to expand)

⏺ Commit c0ad169 is pushed. Now for the mockup overlap: I suspect the CSS zoom
  used for scaled desktop frames shrinks visually without shrinking its layout
  space in some browsers (notably Safari), causing overflow—so I'll switch to
  transform: scale with a sized wrapper for consistent behavior and fix each
  frame's content fit.

  Ran 1 shell command (ctrl+o to expand)

⏺ Enough has changed that I'll write the generator fresh rather than patch it.

  Made 1 scratchpad edit +456, ran 1 shell command (ctrl+o to expand)

⏺ The screenshots didn't run: in zsh, rm -f s_*.png with no matching files
  fails, and that stopped the command chain. Running again without it:

  Read 2 files, ran 1 shell command (ctrl+o to expand)

⏺ I see the ×÷−+ operator glyphs rendering smaller than the digits at 24px—this
  is just how the system font draws them, not a sizing bug. Still need to check
  the 320px and 200% views.

  Read 1 file (ctrl+o to expand)

⏺ The 320px views check out, but the operator glyphs are too small—I'll fix this
  with a new --key-operator-glyph-scale token to match their ink height to the
  digits without changing font sizes, then verify the 200% and fault views.

  Read 1 file, ran 1 shell command (ctrl+o to expand)

⏺ The 200% and fault views render correctly: the fault text wraps fully and
  nothing is covered. The 200% frame has empty space at the bottom, so I'll
  tighten its height, then commit the mockup.

  Ran 1 shell command (ctrl+o to expand)

⏺ Five choices I made under the standing rule while doing this aren't in
  Decisions yet. Adding them:

  Ran 1 shell command (ctrl+o to expand)

⏺ The updated mockup is ready to open: docs/ux/mockup.html. It opens straight
  from Finder, with no network requests. I haven't written any app code, and the
  flow diagrams are on hold.

  You were right about the legends. My screenshots showed C and Esc on top of
  each other and I didn't catch it, because I was checking layout rather than
  reading each key. This time I looked at every section at actual size, and
  checked the key states and the 320px view closely.

  Commits (24–35, each pushed)

  24. c36fdb3 Decide memory, new keypad, low vision and keyboard. The two
      reversals are marked Changed in Decisions: memory is back, and all five
      operators are accented, not just =. CLAUDE.md is now 74 lines.
  25. ff30f10 Add jobs for running totals, paper entry, legibility. All three
      pass the no-app test:
  - J-9: keeping a running total aside is what scrap paper is for.
  - J-10: keeping your eyes on the page is true of any data entry.
  - J-11: misreading a digit is true of a printed invoice.
  26. 38fd662 Update roles for memory, zoom and the fault
  - R-2 gains memory, plus two new must-nevers: memory nobody can see, and
    misreading a digit.
  - Both roles gain zoom and text-size guarantees.
  - The conflicts sections name who loses on memory keys.
  27. 86ef824 Update stories for memory, keypad, zoom; add AC IDs. There are 271
      criteria, every ID is unique, and every story has an "Acceptance
      criteria" heading.
  28. 7b70d63 Explain tape and memory; add low vision and sound (brief)
  29. 8176caf Place memory in the domain and the state diagram. All three
      diagrams still parse.
  30. 99a9ac0 Add ADRs for memory and for not building sound (0008, 0009)
  31. d026cd1 Note in the README why both tape and memory exist
  32. c0ad169 Redraw wireframes for keypad, memory and zoom
  33. 896aac9 Add operator glyph scale to the wireframe tokens
  34. 72f91be Rebuild mockup: keypad, memory, key states, zoom
  35. 410a4c3 Record memory and key choices made while drawing

  The S-1 diff

  Only the heading and the IDs changed; the wording is untouched.
   - **Decisions:** 2, 5, 12

  +### Acceptance criteria
  +
   **Normal case**
  -- Given a fresh calculator, when I type `1234.50`, then the display shows
  `1234.50`, with no comma added.
  -- Given a fresh calculator, when I press `.` then `5`, then the display shows
  `0.5`.
  +- **AC-1.1** Given a fresh calculator, when I type `1234.50`, then the
  display shows `1234.50`, with no comma added.
  +- **AC-1.2** Given a fresh calculator, when I press `.` then `5`, then the
  display shows `0.5`.

   **Invalid input**
  -- Given the display shows `1.5` being typed, …
  -- Given a fresh calculator showing `0`, …
  +- **AC-1.3** Given the display shows `1.5` being typed, …
  +- **AC-1.4** Given a fresh calculator showing `0`, …
  The pattern continues through AC-1.12. The Notation section gains one line
  explaining AC-n.k.

  Contrast recheck

  There are 35 pairings per theme, covering hover, pressed, legends, the tooltip
  and memory lines. One failed and was changed: light --color-key-border,
  #8A929C → #808892. Against the page background it measured 2.94:1. That
  pairing is new, because at 900px and below the keys sit on the page background
  rather than the panel. Everything else passes in both themes.

  Things to know

  - The overlap fix (point 2) is a guess I can't confirm. It didn't show up in
    Chrome. The likeliest cause was CSS zoom on the scaled frames, which some
    browsers, Safari in particular, have handled by shrinking the drawing but
    not the space it takes up. Frames now use transform: scale inside boxes of
    fixed size. Please check it in your browser.
  - The operator glyphs needed a fix. At 24px, × ÷ − + = come out much smaller
    than the digits in system fonts. The glyph alone is scaled by a token, so
    the font size stays 24px and the display remains the largest type.
  - ± is now +/− in every criterion, including key-press notation like 5 +/− +
    5. That follows from the relabel.
  - One wording change outside your feedback: S-14 still said pressing "Empty
    tape" on an empty tape does nothing. But an earlier decision hides that
    control on an empty tape. AC-14.4 now says there is no control to press.
  - The brief is now about 1,475 words, past the original two-page limit. Your
    additions need the space; say if you want it trimmed.

  Choices made under the standing rule (all in Decisions; overrule any)

  1. M+ and M− leave the calculation as it is, including a figure part-typed.
  2. On a fresh calculator, M+ and M− act on the 0 showing.
  3. MR and MC do nothing when memory is empty. MC writes no tape line.
  4. The M indicator shows the total (M 95, or M ≈ … if inexact) and stays at M
     0 until MC.
  5. If memory would go out of range, the usual error shows, memory is
     unchanged, and no line is written.
  6. Emptying the tape does not clear memory. In a fault, every memory key does
     nothing.
  7. Memory lines carry no =, and their total sits in the result column.
  8. The numpad decimal key is always the decimal point, even when it reports ,.
  9. At 900px and below the calculator is at most 40rem wide, centred. This only
     matters at 200% zoom on a wide window.
  10. Memory keys are announced as "memory clear", "memory recall", "memory
      minus" and "memory plus".
  11. Key heights: 4.5rem with legends, 3.5rem without, with a 0.75rem gap
      between keys.

  Separately, the Google Calendar connector needs authorising in your claude.ai
  connector settings before it can be used. Nothing here depends on it.