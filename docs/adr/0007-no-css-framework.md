# 0007. No CSS framework

- **Status:** Accepted
- **Date:** 2026-10-06

## Context
The UI is one screen of 33 elements: a keypad of 24 keys, a display, an expression line, a message line, an M indicator, a tape with its heading and empty-tape control, a tape toggle and a tooltip. Reviewers will read the code, and the styling should be as easy to follow as the logic.

## Decision
Style with CSS Modules, which Vite supports with no extra dependency. Colours, spacing and type sizes come from design tokens defined as CSS custom properties in `tokens.css`.

## Alternatives rejected
- **Tailwind.** It is fast to write. It was rejected because it brings its own config and build step to style 33 elements, and class-heavy markup is harder for a reviewer to read than a short stylesheet.
- **A component library** (for example MUI or Radix). It comes with accessible primitives and focus handling. It was rejected because it is a large dependency for a handful of buttons and a list, and its styling and behaviour would have to be bent to fit the keypad.

## Consequences
- Every style is in a plain `.module.css` file next to its component.
- **Cost:** focus rings, the 44×44px key size, the 900px tape breakpoint and live-region behaviour are all written by hand. No library's tested defaults back them up.
- **Cost:** the tokens are a convention, not a constraint. Nothing stops a hard-coded colour in a module unless a later check is added.
