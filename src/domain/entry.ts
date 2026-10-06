// A figure being typed or pasted, kept exactly as entered: digits with at most one point,
// no leading zeros, trailing zeros kept (Decision 5). The sign is held apart, so the text
// can be shown as typed and Backspace never leaves a lone minus.
export type Entry = { readonly negative: boolean; readonly text: string }

export const DIGIT_LIMIT = 15

// Every digit counts toward the 15, except a single 0 before the point (Decision 5, AC-1.6).
export function countedDigits(text: string): number {
  const digits = text.replace(/[^0-9]/g, '').length
  return text.startsWith('0.') ? digits - 1 : digits
}

export function isZeroText(text: string): boolean {
  return !/[1-9]/.test(text)
}

export const EMPTY_ENTRY: Entry = { negative: false, text: '0' }

// A figure that becomes zero loses its sign, so −0 is never shown (Decisions 2 and 5).
function signed(negative: boolean, text: string): Entry {
  return { negative: negative && !isZeroText(text), text }
}

// Returns the same entry when the key has nothing to act on: an extra leading zero (AC-1.4).
// A 16th digit is refused with "15 digits maximum", never dropped silently (AC-1.5).
export function typeDigit(e: Entry, digit: string): Entry | 'DIGIT_LIMIT' {
  if (e.text === '0') return digit === '0' ? e : signed(e.negative, digit)
  const text = e.text + digit
  return countedDigits(text) > DIGIT_LIMIT ? 'DIGIT_LIMIT' : signed(e.negative, text)
}

// A second point has nothing to act on (AC-1.3).
export function typePoint(e: Entry): Entry {
  return e.text.includes('.') ? e : signed(e.negative, `${e.text}.`)
}

// Removes the last character typed, digit or point; the last one leaves 0 (AC-7.8, AC-7.9).
export function deleteLast(e: Entry): Entry {
  if (e.text === '0') return e
  const text = e.text.slice(0, -1)
  return text === '' ? EMPTY_ENTRY : signed(e.negative, text)
}

// +/− on zero has nothing to act on (Decision 5).
export function toggleSign(e: Entry): Entry {
  return isZeroText(e.text) ? e : signed(!e.negative, e.text)
}
