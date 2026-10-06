# 0002. Decimal arithmetic over native numbers

- **Status:** Accepted
- **Date:** 2026-10-06

## Context
JavaScript numbers are binary floating point. In them, 0.1 + 0.2 is 0.30000000000000004 and 1.005 × 100 is 100.49999999999999. Rounding the display hides this, so the user cannot tell a correct answer from a quietly wrong one. That is the problem the product exists to solve. The rules are stated in significant digits: 15 shown and 34 internal, rounding half up.

## Decision
Every user-facing value is a `Decimal` from decimal.js 10.6.0, built from one clone configured with `precision: 34` and `ROUND_HALF_UP`. Only `domain/decimal.ts` imports the library. No user-facing arithmetic uses JS number operators, `Number()`, `parseFloat` or `toFixed`.

## Alternatives rejected
- **Native numbers with display rounding.** This is the problem itself, not a fix for it.
- **big.js.** It is smaller, but it sets division precision in decimal places (`Big.DP`). Every rule here is in significant digits, so each division would need its decimal places recomputed from the size of the result.
- **Hand-written decimal maths on `BigInt`.** This would have no dependency, but it moves the risk into our own code. The trust has to come from the product decisions, not from arithmetic we wrote ourselves.

## Consequences
- 0.1 + 0.2 is exactly 0.3, and the product-promise tests can assert exact strings.
- **Cost:** 12,699 bytes gzipped (32,032 minified), measured from a Vite 8.3.3 production build of decimal.js alone. That is roughly a fifth of React plus react-dom. It is one class and does not tree-shake, so the whole library ships for four operations and rounding.
- **Cost:** arithmetic reads as `a.plus(b)`, not `a + b`, and a stray native number type-checks in more places than we would like. The "no native maths" rule needs a fitness test, and even that cannot catch every operator.
- **Cost:** decimal.js throws on a malformed string, so input must be validated before it reaches the constructor (see 0005).
