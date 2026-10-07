import { ERROR_TEXT } from '../shared/messages'
import { atLeastInSize, exponentText, figure, isZero, plainText, toDisplayPrecision, type Dec } from './decimal'
import type { Entry } from './entry'
import { calcError, fail, ok, type CalcError, type Result } from './result'
import { isMarked, rangeError, type Value } from './value'

export type Formatted = { readonly text: string; readonly approx: boolean }

const MINUS = '−'
const EXPONENTIAL_FROM = figure('1e15')
const PLAIN_FROM = figure('1e-9')
const SUPERSCRIPT: Readonly<Record<string, string>> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻',
}

// Thousands commas on the whole-number part only.
function grouped(digits: string): string {
  const [whole = '', fraction] = digits.split('.')
  let out = ''
  // fitness: not a value — position in the whole-number part, for commas
  for (let i = 0; i < whole.length; i++) {
    // fitness: not a value — digits left of this position, for commas
    if (i > 0 && (whole.length - i) % 3 === 0) out += ','
    out += whole[i]
  }
  return fraction === undefined ? out : `${out}.${fraction}`
}

// "1.5e+15" → "1.5 × 10¹⁵", read "1.5 times 10 to the power 15" (Decision 2).
function exponential(text: string): string {
  const [mantissa = '', exponent = ''] = text.split('e')
  const power = [...exponent.replace('+', '')].map((c) => SUPERSCRIPT[c] ?? c).join('')
  return `${mantissa} × 10${power}`
}

function text(shown: Dec): string {
  // Never negative zero: a zero has no sign to show (Decision 2).
  if (isZero(shown)) return '0'
  // Notation is decided by the rounded value, so 999,999,999,999,999.5 shows as ≈ 1 × 10¹⁵.
  const exponentialForm = atLeastInSize(shown, EXPONENTIAL_FROM) || !atLeastInSize(shown, PLAIN_FROM)
  const raw = exponentialForm ? exponentText(shown) : plainText(shown)
  const negative = raw.startsWith('-')
  const unsigned = negative ? raw.slice(1) : raw
  return (negative ? MINUS : '') + (exponentialForm ? exponential(unsigned) : grouped(unsigned))
}

// A result as the screen shows it: 15 significant digits rounded half up, no trailing zeros,
// thousands commas, a true minus. approx says whether ≈ goes beside it; it is worked out from
// the full value, not from this text. Out-of-range values are refused, never shown.
export function formatValue(v: Value): Result<Formatted, CalcError> {
  const range = rangeError(v.amount)
  if (range) return fail(calcError(range))
  return ok({ text: text(toDisplayPrecision(v.amount)), approx: isMarked(v) })
}

export function withMark(f: Formatted): string {
  return f.approx ? `≈ ${f.text}` : f.text
}

// A figure being typed or pasted is shown exactly as entered, with no commas (Decision 2).
export function formatEntry(e: Entry): string {
  return (e.negative ? MINUS : '') + e.text
}

// A stored value with its ≈, as the expression line, tape and M indicator show it. Values reach
// the engine only through checks that keep them in range, so the fallback is never seen; it
// exists so that showing a value can never fail.
export function show(v: Value): string {
  const f = formatValue(v)
  return f.ok ? withMark(f.value) : ERROR_TEXT[f.error.code]
}
