import { describe, expect, it } from 'vitest'
import { keyToEvent, tapeKey } from './useKeyboard'

type Press = { key: string; code?: string; ctrlKey?: boolean; metaKey?: boolean; altKey?: boolean; shiftKey?: boolean }
const press = (p: Press) =>
  keyToEvent({ code: '', ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, ...p })

describe('Decision 13: the keyboard map', () => {
  it.each([
    ['0', 'Digit0'],
    ['7', 'Digit7'],
    ['7', 'Numpad7'],
    ['9', 'Numpad9'],
  ])('AC-10.1, AC-10.2: %s (%s) types that digit', (key, code) => {
    expect(press({ key, code })).toEqual({ type: 'digit', digit: key })
  })

  it.each([
    ['.', 'Period'],
    ['.', 'NumpadDecimal'],
    [',', 'NumpadDecimal'],
  ])('AC-10.19: %s (%s) is the point; the numpad point is the point whatever it reports', (key, code) => {
    expect(press({ key, code })).toEqual({ type: 'decimal' })
  })

  it.each([
    ['+', 'Equal', true, '+'],
    ['+', 'NumpadAdd', false, '+'],
    ['-', 'Minus', false, '−'],
    ['-', 'NumpadSubtract', false, '−'],
    ['*', 'Digit8', true, '×'],
    ['*', 'NumpadMultiply', false, '×'],
    ['/', 'Slash', false, '÷'],
    ['/', 'NumpadDivide', false, '÷'],
  ])('AC-10.4: %s (%s, Shift %s) is %s, top row and numpad alike', (key, code, shiftKey, operator) => {
    expect(press({ key, code, shiftKey })).toEqual({ type: 'operator', operator })
  })

  it.each([
    ['Enter', 'Enter'],
    ['Enter', 'NumpadEnter'],
    ['=', 'Equal'],
    ['=', 'NumpadEqual'],
  ])('AC-10.2, AC-10.3, AC-10.6: %s (%s) is equals', (key, code) => {
    expect(press({ key, code })).toEqual({ type: 'equals' })
  })

  it.each([
    ['Escape', 'Escape'],
    ['Clear', 'NumLock'],
  ])('AC-10.5, AC-10.7: %s (%s) clears the calculation', (key, code) => {
    expect(press({ key, code })).toEqual({ type: 'clear' })
  })

  it('AC-10.7: Delete is clear entry and Backspace removes the last character', () => {
    expect(press({ key: 'Delete', code: 'Delete' })).toEqual({ type: 'clearEntry' })
    expect(press({ key: 'Backspace', code: 'Backspace' })).toEqual({ type: 'backspace' })
  })

  it('Decision 13: with Num Lock off the numpad point reports Delete, and Delete is followed', () => {
    expect(press({ key: 'Delete', code: 'NumpadDecimal' })).toEqual({ type: 'clearEntry' })
  })

  it.each(['End', 'ArrowDown', 'Home', 'PageUp', 'PageDown', 'Insert', 'ArrowLeft'])(
    'AC-10.13: Num Lock off: %s does nothing',
    (key) => {
      expect(press({ key, code: 'Numpad1' })).toBeNull()
    },
  )

  it.each([
    { key: '5', ctrlKey: true },
    { key: '5', metaKey: true },
    { key: '5', altKey: true },
    { key: 'v', ctrlKey: true },
    { key: 'p', metaKey: true },
  ])('AC-10.12: %o is left to the browser', (p) => {
    expect(press(p)).toBeNull()
  })

  it.each(['a', ',', ' ', '%', 'm', 'r', 'Tab', 'Shift', 'F5', "'"])(
    'AC-10.11, AC-19.20: %j does nothing; memory and +/− have no key',
    (key) => {
      expect(press({ key })).toBeNull()
    },
  )
})

describe('Decision 10: keys inside the tape', () => {
  it.each([
    ['ArrowUp', 'previous'],
    ['ArrowDown', 'next'],
    ['Enter', 'recall'],
    [' ', 'recall'],
    ['ArrowLeft', null],
    ['ArrowRight', null],
    ['Home', null],
  ])('AC-13.3: %j → %s', (key, action) => {
    expect(tapeKey(key)).toBe(action)
  })
})
