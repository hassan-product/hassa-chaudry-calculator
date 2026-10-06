# 0003. Fixed precision with a ≈ marker over fraction arithmetic

- **Status:** Accepted
- **Date:** 2026-10-06

## Context
Decimal arithmetic is exact for +, − and ×, but not for ÷: 100 ÷ 3 has no finite decimal. The first pitch promised "exact arithmetic throughout", which division makes false. Whatever is done internally, the person reads a decimal on screen, and the screen shows at most 15 significant digits.

## Decision
Work to 34 significant digits internally, rounding half up. Show at most 15. Put ≈ next to any number that may not be the exact answer: because the display cut digits, because a step was rounded at 34 digits, or because an earlier value in the calculation already carried ≈. The ≈ carries until a new calculation starts. The promise becomes "exact where possible, marked where not".

## Alternatives rejected
- **Exact fractions (rational arithmetic).** 100 ÷ 3 × 3 would be exactly 100. It was rejected because the screen still shows a decimal, so ≈ is needed anyway for 100 ÷ 3 itself, and it is a lot more code for a case people rarely hit.
- **A fixed number of decimal places** (round every result to 2 places, money-style). This was rejected because it is exactly the silent rounding the product exists to expose, and because unit prices like 0.0125 need more than two places.

## Consequences
- No number is ever shown as exact when it is not.
- **Cost:** 100 ÷ 3 × 3 shows `≈ 100`, not a clean `100`. That is honest but untidy, and an everyday user may find it odd.
- **Cost:** carrying the mark means 100 ÷ 3 × 0 shows `≈ 0`, even though the true answer is 0. The mark overstates the doubt.
- **Cost:** ≈ is the only signal and is never explained in the UI, because the words "precision" and "floating point" are banned there. Anyone who wonders what it means has to work it out.
