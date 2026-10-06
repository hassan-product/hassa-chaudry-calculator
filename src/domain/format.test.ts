import { describe, expect, it } from 'vitest'
import { formatEntry, formatValue, withMark } from './format'
import { value } from './value'

function shown(text: string, approx = false) {
  const f = formatValue(value(text, approx))
  if (!f.ok) throw new Error(`unexpected error ${f.error.code}`)
  return withMark(f.value)
}

describe('format: results to 15 significant digits', () => {
  it.each([
    ['0.3', '0.3'],
    ['1234.5', '1,234.5'],
    ['1234567.891', '1,234,567.891'],
    ['-1234', '−1,234'],
    ['999', '999'],
    ['1000', '1,000'],
    ['-0.5', '−0.5'],
  ])('Decision 2: results get thousands commas and a true minus: %s → %s', (a, out) => {
    expect(shown(a)).toBe(out)
  })

  it.each([
    ['100.50', '100.5'],
    ['3.000', '3'],
    ['1.50', '1.5'],
  ])('AC-3.8: results drop trailing zeros: %s → %s', (a, out) => {
    expect(shown(a)).toBe(out)
  })

  it.each(['0', '-0', '0.000'])('AC-3.7: never negative zero: %s → 0', (a) => {
    expect(shown(a)).toBe('0')
  })

  it.each([
    ['999999999999999', '999,999,999,999,999'],
    ['1e15', '1 × 10¹⁵'],
    ['1.5e15', '1.5 × 10¹⁵'],
    ['-1.5e15', '−1.5 × 10¹⁵'],
    ['0.000000001', '0.000000001'],
    ['0.0000000001', '1 × 10⁻¹⁰'],
    ['-0.0000000001', '−1 × 10⁻¹⁰'],
    ['1e20', '1 × 10²⁰'],
    ['1e90', '1 × 10⁹⁰'],
    ['1e-99', '1 × 10⁻⁹⁹'],
    ['1e-30', '1 × 10⁻³⁰'],
  ])('AC-6: plain below 1e15 and from 1e-9, exponential outside: %s → %s', (a, out) => {
    expect(shown(a)).toBe(out)
  })

  it.each([
    ['999999999999999.5', '≈ 1 × 10¹⁵'],
    ['999999999999999.4', '≈ 999,999,999,999,999'],
    ['0.00000000099999999999999999', '≈ 0.000000001'],
  ])('AC-6.4: the rounded value decides the notation: %s → %s', (a, out) => {
    expect(shown(a)).toBe(out)
  })

  it.each([
    ['123456789012345.5', '≈ 123,456,789,012,346'],
    ['-123456789012345.5', '≈ −123,456,789,012,346'],
    ['123456789012345.4', '≈ 123,456,789,012,345'],
    ['99999999999999.9', '99,999,999,999,999.9'],
    ['33.33333333333333333333333333333333', '≈ 33.3333333333333'],
    ['0.6666666666666666666666666666666667', '≈ 0.666666666666667'],
    ['999999999999998000000000000001', '≈ 9.99999999999998 × 10²⁹'],
    ['3.333333333333333333333333333333333e-10', '≈ 3.33333333333333 × 10⁻¹⁰'],
  ])('AC-5: ≈ when the display cuts digits, worked out from the full value: %s → %s', (a, out) => {
    expect(shown(a)).toBe(out)
  })

  it('AC-5.2: a value marked by an earlier step shows ≈ though its digits are not cut', () => {
    expect(shown('100', true)).toBe('≈ 100')
  })

  it('the exactness flag is separate from the text', () => {
    const f = formatValue(value('100', true))
    expect(f).toEqual({ ok: true, value: { text: '100', approx: true } })
  })

  it.each([
    ['1e100', 'NUMBER_TOO_LARGE', 'Number too large'],
    ['-1e100', 'NUMBER_TOO_LARGE', 'Number too large'],
    ['9.999999999999995e99', 'NUMBER_TOO_LARGE', 'Number too large'],
    ['9.99999999999994e-100', 'NUMBER_TOO_SMALL', 'Number too small'],
    ['-1e-100', 'NUMBER_TOO_SMALL', 'Number too small'],
  ])('AC-6.9: refuses a rounded value out of range: %s → %s', (a, code, message) => {
    expect(formatValue(value(a))).toEqual({ ok: false, error: { code, message } })
  })

  it('S-6: a value that rounds to just inside the range is shown', () => {
    expect(shown('9.999999999999994e99')).toBe('≈ 9.99999999999999 × 10⁹⁹')
    expect(shown('9.999999999999995e-100')).toBe('≈ 1 × 10⁻⁹⁹')
  })
})

describe('format: a figure being typed is shown as typed', () => {
  it.each([
    [{ negative: false, text: '1234.50' }, '1234.50'],
    [{ negative: false, text: '0.' }, '0.'],
    [{ negative: true, text: '12' }, '−12'],
    [{ negative: false, text: '0.000000000000001' }, '0.000000000000001'],
    [{ negative: false, text: '999999999999999' }, '999999999999999'],
  ])('AC-1: %o → %s, no commas, point and trailing zeros kept', (entry, out) => {
    expect(formatEntry(entry)).toBe(out)
  })
})
