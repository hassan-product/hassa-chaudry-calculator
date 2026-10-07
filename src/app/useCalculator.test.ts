import { describe, expect, it } from 'vitest'
import type { Event } from '../domain/engine'
import { step } from '../domain/engine'
import type { KeyId } from '../shared/keys'
import { FAULT_TEXT } from '../shared/messages'
import { INITIAL_MODEL, keyEvent, next, speak, toView, type Model } from './useCalculator'

function run(keys: KeyId[], from: Model = INITIAL_MODEL): Model {
  return keys.reduce((m, k) => next(m, keyEvent(k)), from)
}

const throwing = (): never => {
  throw new Error('a bug in the engine')
}

describe('keyEvent: on-screen keys become engine events', () => {
  it.each<[KeyId, Event]>([
    ['7', { type: 'digit', digit: '7' }],
    ['.', { type: 'decimal' }],
    ['÷', { type: 'operator', operator: '÷' }],
    ['×', { type: 'operator', operator: '×' }],
    ['−', { type: 'operator', operator: '−' }],
    ['+', { type: 'operator', operator: '+' }],
    ['=', { type: 'equals' }],
    ['C', { type: 'clear' }],
    ['CE', { type: 'clearEntry' }],
    ['⌫', { type: 'backspace' }],
    ['+/−', { type: 'signToggle' }],
    ['MC', { type: 'memoryClear' }],
    ['MR', { type: 'memoryRecall' }],
    ['M−', { type: 'memoryMinus' }],
    ['M+', { type: 'memoryPlus' }],
  ])('%s → %o', (key, event) => {
    expect(keyEvent(key)).toEqual(event)
  })
})

describe('next: the engine, plus messages and the fault', () => {
  it('AC-2.1: passes events to the engine', () => {
    expect(toView(run(['1', '2', '+', '3', '='])).display.text).toBe('15')
  })

  it('AC-1.5, AC-1.7: a refusal shows its message until the next input', () => {
    const digits = [...'1234567890123456'] as KeyId[]
    const refused = run(digits)
    expect(toView(refused).message?.text).toBe('15 digits maximum')
    expect(toView(run(['+'], refused)).message).toBeNull()
  })

  it('AC-9.9: a throw from the engine becomes the fault, worded as Decision 8 says', () => {
    const before = run(['9', '5', 'M+', 'C', '1', '+', '1', '='])
    const fault = next(before, { type: 'digit', digit: '7' }, throwing)
    const view = toView(fault)
    expect(fault.fault).toBe(true)
    expect(view.display.text).toBe(FAULT_TEXT)
    expect(view.expression.text).toBe('')
    expect(view.memory?.text).toBe('M 95')
    expect(view.tape).toHaveLength(2)
  })

  it.each<Event>([
    { type: 'digit', digit: '7' },
    { type: 'operator', operator: '+' },
    { type: 'equals' },
    { type: 'clearEntry' },
    { type: 'backspace' },
    { type: 'signToggle' },
    { type: 'paste', text: '12' },
    { type: 'recall', line: 0 },
    { type: 'memoryPlus' },
    { type: 'memoryMinus' },
    { type: 'memoryRecall' },
    { type: 'memoryClear' },
    { type: 'emptyTape' },
  ])('AC-9.11, AC-19.8: in the fault, %o does nothing', (event) => {
    const fault = next(run(['9', '5', 'M+', 'C', '1', '+', '1', '=']), { type: 'equals' }, throwing)
    expect(next(fault, event)).toBe(fault)
  })

  it('AC-9.10: C or Escape leaves the fault at 0, keeping the tape and memory', () => {
    const fault = next(run(['9', '5', 'M+', 'C', '1', '+', '1', '=']), { type: 'equals' }, throwing)
    const after = next(fault, { type: 'clear' })
    const view = toView(after)
    expect(after.fault).toBe(false)
    expect(view.display.text).toBe('0')
    expect(view.memory?.text).toBe('M 95')
    expect(view.tape.map((l) => l.working)).toEqual(['M+ 95, memory', '1 + 1'])
  })

  it('AC-9.10: even if clearing throws too, the fault is left with tape and memory kept', () => {
    const fault = next(run(['9', '5', 'M+']), { type: 'equals' }, throwing)
    const after = next(fault, { type: 'clear' }, throwing)
    expect(after.fault).toBe(false)
    expect(toView(after).display.text).toBe('0')
    expect(toView(after).memory?.text).toBe('M 95')
  })

  it('the real engine is the default', () => {
    expect(next(INITIAL_MODEL, { type: 'digit', digit: '4' })).toEqual({
      engine: step(INITIAL_MODEL.engine, { type: 'digit', digit: '4' }).state,
      notice: null,
      fault: false,
    })
  })
})

describe('Decision 15a: the spoken forms', () => {
  it.each([
    ['≈ 33.3333333333333', 'approximately 33.3333333333333'],
    ['−5', 'minus 5'],
    ['1 × 10¹⁵', '1 times 10 to the power 15'],
    ['≈ 3.33333333333333 × 10⁻¹⁰', 'approximately 3.33333333333333 times 10 to the power minus 10'],
    ['5 ×', '5 times'],
    ['100 ÷ 3 =', '100 divided by 3 equals'],
    ['7 − 10', '7 minus 10'],
    ['2 + 3 = 5 → × 4 = 20', '2 plus 3 equals 5 then times 4 equals 20'],
    ['M+ 40, memory 95', 'memory plus 40, memory 95'],
    ['M− 20, memory 75', 'memory minus 20, memory 75'],
  ])('S-15: %j is read %j', (text, spoken) => {
    expect(speak(text)).toBe(spoken)
  })

  it('AC-15.2: with an operator waiting, the display is heard with its operator', () => {
    expect(toView(run(['1', '2', '+'])).display).toEqual({ text: '12', spoken: '12 plus' })
  })

  it('AC-15.6: the M indicator is heard as memory and its total', () => {
    expect(toView(run(['9', '5', 'M+'])).memory).toEqual({ text: 'M 95', spoken: 'memory 95' })
  })

  it('AC-15.4: a ≈ result is heard as approximately', () => {
    expect(toView(run(['1', '0', '0', '÷', '3', '='])).display.spoken).toBe('approximately 33.3333333333333')
  })

  it('AC-15.5: a tape line is read in full', () => {
    const line = toView(run(['1', '0', '0', '÷', '3', '×', '3', '='])).tape[0]
    expect(line?.spoken).toBe('100 divided by 3 equals approximately 33.3333333333333 then times 3 equals approximately 100')
  })
})
