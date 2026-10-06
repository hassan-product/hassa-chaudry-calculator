import type { ErrorCode } from '../shared/messages'
import { atLeastInSize, figure, isZero, negate, same, toDisplayPrecision, type Dec } from './decimal'

// A number in the calculator: its full 34-digit amount, and whether ≈ has been carried into it.
// approx is set when a step was rounded at 34 digits, or when anything it was worked out from
// showed ≈ (Decision 3). It never clears; a new calculation starts from new values instead.
export type Value = { readonly amount: Dec; readonly approx: boolean }

export function value(text: string, approx = false): Value {
  return { amount: figure(text), approx }
}

export const ZERO: Value = value('0')

export function negated(v: Value): Value {
  return { amount: negate(v.amount), approx: v.approx }
}

// The display cuts digits when the 15-digit rounding differs from the full amount. This is
// worked out from the amounts, never from the text on screen.
export function isCut(v: Value): boolean {
  return !same(toDisplayPrecision(v.amount), v.amount)
}

// Whether the screen shows ≈ beside this value.
export function isMarked(v: Value): boolean {
  return v.approx || isCut(v)
}

const LARGE = figure('1e100')
const SMALL = figure('1e-99')

// Decision 8: the limits apply to the value as shown, rounded to 15 digits, so a value that
// rounds up to 1e100 is too large and one that rounds up to 1e-99 is not too small.
export function rangeError(amount: Dec): ErrorCode | null {
  const shown = toDisplayPrecision(amount)
  if (atLeastInSize(shown, LARGE)) return 'NUMBER_TOO_LARGE'
  if (!isZero(shown) && !atLeastInSize(shown, SMALL)) return 'NUMBER_TOO_SMALL'
  return null
}
