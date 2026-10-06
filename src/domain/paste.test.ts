import { describe, expect, it } from 'vitest'
import { NOTICE_TEXT } from '../shared/messages'
import { parsePaste } from './paste'

describe('paste: one figure, UK/US style (Decision 9)', () => {
  it.each([
    ['£1,234.56', false, '1234.56'],
    ['  42\n', false, '42'],
    ['$1,000,000', false, '1000000'],
    ['-£5', true, '5'],
    ['£-5', true, '5'],
    ['−5', true, '5'],
    ['+3', false, '3'],
    ['1 234', false, '1234'],
    ['123,456,789,012,345', false, '123456789012345'],
    ['1,234', false, '1234'],
    ['0.000000000000001', false, '0.000000000000001'],
    ['€12.50', false, '12.50'],
    ['£ 5', false, '5'],
    ['007', false, '7'],
    ['.5', false, '0.5'],
    ['5.', false, '5.'],
    ['-0', false, '0'],
    ['12.5', false, '12.5'],
  ])('AC-11.1, AC-11.9, AC-11.11, AC-11.13: %j is accepted as %s', (text, negative, figure) => {
    expect(parsePaste(text)).toEqual({ ok: true, value: { negative, text: figure } })
  })

  it.each(['1.234,56', '1,23', '12,3456', '1.2.3', '1.234,567', '1,'])(
    'AC-11.6: %j is refused with "Unclear which mark is the decimal point"',
    (text) => {
      expect(parsePaste(text)).toEqual({ ok: false, error: 'PASTE_AMBIGUOUS_DECIMAL' })
    },
  )

  it.each(['(1,234)', '(5)', '£(5)'])('AC-11.7: %j is refused with "Use a minus sign for negative numbers"', (text) => {
    expect(parsePaste(text)).toEqual({ ok: false, error: 'PASTE_BRACKETS' })
  })

  it.each(['abc', '5+3', '¥500', '', '   ', '12\t34', '12\n34', '5£', '(5', '--5', ',123', '£', '-', '1e5', '5 €'])(
    'AC-11.8: %j is refused with "Couldn\'t read that as a number"',
    (text) => {
      expect(parsePaste(text)).toEqual({ ok: false, error: 'PASTE_UNREADABLE' })
    },
  )

  it.each(['1,234,567,890,123,456', '0.0000000000000001', '1234567890123456'])(
    'AC-11.10, AC-11.14: %j is refused with "15 digits maximum"',
    (text) => {
      expect(parsePaste(text)).toEqual({ ok: false, error: 'DIGIT_LIMIT' })
    },
  )

  it('the refusal messages are word for word from Decision 9', () => {
    expect(NOTICE_TEXT).toEqual({
      DIGIT_LIMIT: '15 digits maximum',
      PASTE_UNREADABLE: "Couldn't read that as a number",
      PASTE_AMBIGUOUS_DECIMAL: 'Unclear which mark is the decimal point',
      PASTE_BRACKETS: 'Use a minus sign for negative numbers',
    })
  })
})
