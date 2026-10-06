import { describe, expect, it } from 'vitest'
import type { Operator } from '../shared/keys'
import { operate } from './arithmetic'
import { plainText } from './decimal'
import { isMarked, value, type Value } from './value'

function run(a: Value, op: Operator, b: Value) {
  const r = operate(a, op, b)
  if (!r.ok) throw new Error(`unexpected error ${r.error.code}`)
  return r.value
}

describe('arithmetic: four operations, each a result or an error value', () => {
  it.each<[string, Operator, string, string, boolean]>([
    ['0.1', '+', '0.2', '0.3', false],
    ['1.005', '×', '100', '100.5', false],
    ['0.1', '×', '3', '0.3', false],
    ['7', '−', '10', '-3', false],
    ['1.5', '÷', '0.5', '3', false],
    ['100', '÷', '3', '33.33333333333333333333333333333333', true],
  ])('S-3, S-5: %s %s %s = %s (≈ %s)', (a, op, b, result, approx) => {
    const r = run(value(a), op, value(b))
    expect(plainText(r.amount)).toBe(result)
    expect(isMarked(r)).toBe(approx)
  })

  it.each([
    ['5', '0'],
    ['0', '0'],
    ['-5', '0'],
  ])('S-9: %s ÷ %s is "Cannot divide by zero", returned not thrown', (a, b) => {
    const r = operate(value(a), '÷', value(b))
    expect(r).toEqual({ ok: false, error: { code: 'DIVIDE_BY_ZERO', message: 'Cannot divide by zero' } })
  })

  it('S-6: a result of 1e100 is "Number too large"', () => {
    const r = operate(value('1e90'), '×', value('1e10'))
    expect(r).toEqual({ ok: false, error: { code: 'NUMBER_TOO_LARGE', message: 'Number too large' } })
  })

  it('AC-6.9: an internal result that rounds to 1e100 at 15 digits is "Number too large"', () => {
    const r = operate(value('9.999999999999995e99'), '+', value('0'))
    expect(r.ok).toBe(false)
    expect(r.ok ? null : r.error.code).toBe('NUMBER_TOO_LARGE')
  })

  it('S-6: one that rounds to just below 1e100 is allowed', () => {
    expect(operate(value('9.999999999999994e99'), '+', value('0')).ok).toBe(true)
  })

  it('S-6: a non-zero result below 1e-99 is "Number too small"', () => {
    const r = operate(value('1e-99'), '×', value('0.1'))
    expect(r).toEqual({ ok: false, error: { code: 'NUMBER_TOO_SMALL', message: 'Number too small' } })
  })

  it('S-6: 1e-99 itself is allowed, and zero is never "too small"', () => {
    expect(operate(value('1e-99'), '×', value('1')).ok).toBe(true)
    expect(operate(value('1e-99'), '×', value('0')).ok).toBe(true)
  })

  it('S-6: a result that rounds up to 1e-99 at 15 digits is allowed', () => {
    expect(operate(value('9.999999999999995e-100'), '+', value('0')).ok).toBe(true)
  })

  describe('≈ carries through a calculation (Decision 3)', () => {
    const third = run(value('100'), '÷', value('3'))

    it('AC-5.2: ≈ 33.33… × 3 is still marked, though it shows 100', () => {
      expect(isMarked(run(third, '×', value('3')))).toBe(true)
    })

    it('AC-5.9: ≈ 33.33… × 0 is marked ≈ 0', () => {
      const zero = run(third, '×', value('0'))
      expect(plainText(zero.amount)).toBe('0')
      expect(isMarked(zero)).toBe(true)
    })

    it('a value shown cut for display carries its ≈ into the next step', () => {
      const cut = run(value('123456789012345'), '+', value('0.5'))
      expect(cut.approx).toBe(false)
      expect(isMarked(cut)).toBe(true)
      expect(isMarked(run(cut, '−', value('0.5')))).toBe(true)
    })

    it('an exact calculation stays unmarked', () => {
      expect(isMarked(run(value('2'), '+', value('2')))).toBe(false)
    })
  })

  it('never returns NaN or Infinity', () => {
    const extremes = ['9.99999999999999e99', '1e-99', '0', '-9.99999999999999e99', '123456789012345']
    for (const a of extremes) {
      for (const b of extremes) {
        for (const op of ['+', '−', '×', '÷'] as const) {
          const r = operate(value(a), op, value(b))
          if (r.ok) expect(plainText(r.value.amount)).toMatch(/^-?\d+(\.\d+)?$/)
        }
      }
    }
  })
})
