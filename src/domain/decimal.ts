import Decimal from 'decimal.js'

// The only file that imports decimal.js. Every value in the calculator is built by Value34.
//
// Precision 34 is deliberate: it is the precision of IEEE 754 decimal128. Two 15-digit figures
// multiply to at most 30 digits, so ordinary sums are exact; only division and long chains of
// steps can need more, and those are marked ≈ rather than shown as if exact (Decision 1).
//
// ROUND_HALF_UP is deliberate too, not banker's rounding: it is what an ordinary person expects,
// and for negatives it rounds away from zero (−2.5 → −3). The product brief keeps banker's
// rounding as an open question.
//
// toExpNeg and toExpPos are at their limits so toString() never switches to exponent notation;
// format.ts decides notation from the rounded value instead.
const Value34 = Decimal.clone({
  precision: 34,
  rounding: Decimal.ROUND_HALF_UP,
  toExpNeg: -9e15,
  toExpPos: 9e15,
})

// Deliberate, and a departure from "one configured clone" in CLAUDE.md: two more clones, used
// only to tell whether a step was rounded. If rounding toward zero and away from zero give the
// same 34 digits, the exact answer has at most 34 digits and nothing was rounded. Their results
// are compared and thrown away here; no value they produce leaves this file.
const TowardZero = Value34.clone({ rounding: Decimal.ROUND_DOWN })
const AwayFromZero = Value34.clone({ rounding: Decimal.ROUND_UP })

export type Dec = Decimal

export type Exacting = { readonly value: Dec; readonly exact: boolean }

// Only for figures already checked by entry.ts or paste.ts, and for constants. decimal.js
// rejects malformed strings, and nothing malformed can reach here.
export function figure(text: string): Dec {
  return new Value34(text)
}

type Step = (a: Decimal, b: Decimal) => Decimal

function exactly(a: Dec, b: Dec, step: Step): Exacting {
  const exact = step(new TowardZero(a), b).eq(step(new AwayFromZero(a), b))
  return { value: step(a, b), exact }
}

export function add(a: Dec, b: Dec): Exacting {
  return exactly(a, b, (x, y) => x.plus(y))
}

export function subtract(a: Dec, b: Dec): Exacting {
  return exactly(a, b, (x, y) => x.minus(y))
}

export function multiply(a: Dec, b: Dec): Exacting {
  return exactly(a, b, (x, y) => x.times(y))
}

// The caller checks for a zero divisor first; arithmetic.ts returns "Cannot divide by zero".
export function divide(a: Dec, b: Dec): Exacting {
  return exactly(a, b, (x, y) => x.dividedBy(y))
}

export function negate(a: Dec): Dec {
  return a.negated()
}

export function isZero(a: Dec): boolean {
  return a.isZero()
}

export function same(a: Dec, b: Dec): boolean {
  return a.eq(b)
}

// True when the size of a is at least the size of b, whatever their signs.
export function atLeastInSize(a: Dec, b: Dec): boolean {
  return a.abs().gte(b.abs())
}

// Results are shown to 15 significant digits (Decision 2), with the same half-up rounding.
export function toDisplayPrecision(a: Dec): Dec {
  return a.toSignificantDigits(15, Decimal.ROUND_HALF_UP)
}

// Plain notation with every digit, an ASCII "-" for negatives and "0" for negative zero.
export function plainText(a: Dec): string {
  return a.toString()
}

// Mantissa and exponent, for example "-1.5e+15". format.ts turns it into "−1.5 × 10¹⁵".
export function exponentText(a: Dec): string {
  return a.toExponential()
}
