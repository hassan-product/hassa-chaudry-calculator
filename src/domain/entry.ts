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
