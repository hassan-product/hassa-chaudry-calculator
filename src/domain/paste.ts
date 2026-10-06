import type { NoticeCode } from '../shared/messages'
import { countedDigits, DIGIT_LIMIT, isZeroText, type Entry } from './entry'
import { fail, ok, type Result } from './result'

// Spaces, including the no-break and thin spaces some sources use as thousands separators.
const SPACES = /[    ]/g
const LINE_BREAK_OR_TAB = /[\t\n\r\v\f\u2028\u2029]/
// An optional sign before or after an optional £ $ €, never both signs (Decision 9).
const SIGN_SYMBOL_BODY = /^([-+−]?)([£$€]?)([-+−]?)(.*)$/

function isDigit(c: string | undefined): boolean {
  return c !== undefined && c >= '0' && c <= '9'
}

// A comma is a thousands separator only when a digit comes before it and exactly three digits
// follow, then the point, another comma or the end. Anything else might be a decimal comma.
function commasAreThousands(body: string): boolean {
  const point = body.indexOf('.')
  for (let i = 0; i < body.length; i++) {
    if (body[i] !== ',') continue
    if (point !== -1 && i > point) return false
    const next = body[i + 4]
    const three = isDigit(body[i + 1]) && isDigit(body[i + 2]) && isDigit(body[i + 3])
    if (!three || (next !== undefined && next !== ',' && next !== '.')) return false
  }
  return true
}

// Leading zeros go and a bare point gains its 0, so the figure reads as if typed (Decision 9).
function normalised(digits: string): string {
  const point = digits.indexOf('.')
  const whole = (point === -1 ? digits : digits.slice(0, point)).replace(/^0+/, '') || '0'
  return point === -1 ? whole : whole + digits.slice(point)
}

export function parsePaste(raw: string): Result<Entry, NoticeCode> {
  const trimmed = raw.trim()
  if (LINE_BREAK_OR_TAB.test(trimmed)) return fail('PASTE_UNREADABLE')
  const text = trimmed.replace(SPACES, '')

  // Accounting brackets are a known style, so they get a message that says what to do instead.
  if (/[()]/.test(text)) return fail(/^[£$€]?\(.*\)$/.test(text) ? 'PASTE_BRACKETS' : 'PASTE_UNREADABLE')

  const parts = SIGN_SYMBOL_BODY.exec(text)
  const [, before = '', , after = '', body = ''] = parts ?? []
  if (!parts || (before && after) || !/^[0-9.][0-9.,]*$/.test(body)) return fail('PASTE_UNREADABLE')
  if (!/[0-9]/.test(body)) return fail('PASTE_UNREADABLE')

  if ((body.match(/\./g) ?? []).length > 1) return fail('PASTE_AMBIGUOUS_DECIMAL')
  if (!commasAreThousands(body)) return fail('PASTE_AMBIGUOUS_DECIMAL')

  const figure = normalised(body.replace(/,/g, ''))
  if (countedDigits(figure) > DIGIT_LIMIT) return fail('DIGIT_LIMIT')

  const sign = before || after
  const negative = (sign === '-' || sign === '−') && !isZeroText(figure)
  return ok({ negative, text: figure })
}
