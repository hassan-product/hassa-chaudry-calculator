import Decimal from 'decimal.js'
import { describe, expect, it } from 'vitest'
import {
  add,
  divide,
  figure,
  isZero,
  multiply,
  negate,
  plainText,
  subtract,
  toDisplayPrecision,
} from './decimal'

const plain = (text: string) => plainText(figure(text))

describe('decimal.ts: 34 significant digits, round half up', () => {
  it.each([
    ['0.1', '0.2', '0.3'],
    ['999999999999999', '1', '1000000000000000'],
    ['-5', '5', '0'],
  ])('%s + %s = %s exactly', (a, b, sum) => {
    const r = add(figure(a), figure(b))
    expect(plainText(r.value)).toBe(sum)
    expect(r.exact).toBe(true)
  })

  it('S-3: 1.005 × 100 = 100.5 exactly, where binary floating point gives 100.49999999999999', () => {
    const r = multiply(figure('1.005'), figure('100'))
    expect(plainText(r.value)).toBe('100.5')
    expect(r.exact).toBe(true)
  })

  it('S-3: 999999999999999 × 999999999999999 keeps all 30 digits', () => {
    const r = multiply(figure('999999999999999'), figure('999999999999999'))
    expect(plainText(r.value)).toBe('999999999999998000000000000001')
    expect(r.exact).toBe(true)
  })

  it('1 ÷ 3 is cut at 34 significant digits and marked inexact', () => {
    const r = divide(figure('1'), figure('3'))
    expect(plainText(r.value)).toBe('0.' + '3'.repeat(34))
    expect(r.exact).toBe(false)
  })

  it('2 ÷ 3 rounds its 34th digit half up', () => {
    expect(plainText(divide(figure('2'), figure('3')).value)).toBe('0.' + '6'.repeat(33) + '7')
  })

  it('−2 ÷ 3 rounds away from zero, as half up does for negatives (Decision 1)', () => {
    expect(plainText(divide(figure('-2'), figure('3')).value)).toBe('-0.' + '6'.repeat(33) + '7')
  })

  it('a sum that needs more than 34 digits is marked inexact', () => {
    const r = add(figure('1000000000000000000000000000000'), figure('0.0000000001'))
    expect(r.exact).toBe(false)
  })

  it('a sum whose operands span 35 digits but whose result fits is exact', () => {
    const r = add(figure('9.' + '9'.repeat(33)), figure('0.' + '0'.repeat(32) + '1'))
    expect(plainText(r.value)).toBe('10')
    expect(r.exact).toBe(true)
  })

  it('1.5 ÷ 0.5 = 3 exactly', () => {
    const r = divide(figure('1.5'), figure('0.5'))
    expect(plainText(r.value)).toBe('3')
    expect(r.exact).toBe(true)
  })

  it('7 − 10 = −3', () => {
    expect(plainText(subtract(figure('7'), figure('10')).value)).toBe('-3')
  })

  it.each([
    ['123456789012345.5', '123456789012346'],
    ['-123456789012345.5', '-123456789012346'],
    ['123456789012345.4', '123456789012345'],
    ['0.1234567890123455', '0.123456789012346'],
  ])('S-5: a 16th digit of exactly 5 rounds half up for display, away from zero: %s → %s', (a, shown) => {
    expect(plainText(toDisplayPrecision(figure(a)))).toBe(shown)
  })

  it('plain text never uses exponent notation, however large or small', () => {
    expect(plain('1e30')).toBe('1' + '0'.repeat(30))
    expect(plain('1e-30')).toBe('0.' + '0'.repeat(29) + '1')
  })

  it('negating zero is still zero', () => {
    expect(isZero(negate(figure('0')))).toBe(true)
  })

  it('leaves the global Decimal untouched', () => {
    expect(Decimal.precision).toBe(20)
    expect(Decimal.rounding).toBe(Decimal.ROUND_HALF_UP)
  })
})
