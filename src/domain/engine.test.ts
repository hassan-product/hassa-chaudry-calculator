import { describe, expect, it } from 'vitest'
import type { Digit } from '../shared/keys'
import { ERROR_TEXT, type NoticeCode } from '../shared/messages'
import { initial, readout, step, type Engine, type Event } from './engine'
import { lineText } from './tape'

// Test notation follows docs/user-stories.md: keys as pressed, separated by spaces.
// Esc is clear, Del is clear entry, Bksp is backspace. A run of digits is typed one at a time.
const NAMED: Readonly<Record<string, Event>> = {
  '+': { type: 'operator', operator: '+' },
  '−': { type: 'operator', operator: '−' },
  '×': { type: 'operator', operator: '×' },
  '÷': { type: 'operator', operator: '÷' },
  '=': { type: 'equals' },
  Esc: { type: 'clear' },
  Del: { type: 'clearEntry' },
  Bksp: { type: 'backspace' },
  '+/−': { type: 'signToggle' },
  'M+': { type: 'memoryPlus' },
  'M−': { type: 'memoryMinus' },
  MR: { type: 'memoryRecall' },
  MC: { type: 'memoryClear' },
}

function eventsFor(keys: string): Event[] {
  return keys
    .split(' ')
    .filter(Boolean)
    .flatMap((token) => {
      const named = NAMED[token]
      if (named) return [named]
      return [...token].map((c): Event => {
        if (c === '.') return { type: 'decimal' }
        if (!/[0-9]/.test(c)) throw new Error(`unknown key ${c} in ${token}`)
        return { type: 'digit', digit: c as Digit }
      })
    })
}

class Session {
  state: Engine = initial
  notice: NoticeCode | undefined

  send(event: Event): this {
    const out = step(this.state, event)
    this.state = out.state
    this.notice = out.notice
    return this
  }

  keys(keys: string): this {
    for (const e of eventsFor(keys)) this.send(e)
    return this
  }

  paste(text: string): this {
    return this.send({ type: 'paste', text })
  }

  // Tape lines are numbered from 1, as the tape shows them.
  recall(line: number): this {
    return this.send({ type: 'recall', line: line - 1 })
  }

  get display() {
    return readout(this.state).display
  }
  get expression() {
    return readout(this.state).expression
  }
  get memory() {
    return readout(this.state).memory
  }
  get tape() {
    return this.state.tape.map(lineText)
  }
}

const calc = (keys = '') => new Session().keys(keys)

// Checks that an input changed nothing at all: state, tape, memory, and no message.
function expectNoChange(session: Session, act: (s: Session) => void) {
  const before = session.state
  act(session)
  expect(session.state).toEqual(before)
  expect(session.notice).toBeUndefined()
}

describe('the transition table: every state against every event', () => {
  // Tape after the prefix: 1 "2 + 3 = 5", 2 "M+ 5, memory 5", 3 "M+ 1, memory 6". Memory holds 6.
  const PREFIX = '2 + 3 = M+ 1 M+ Esc'
  const setups: Record<string, () => Session> = {
    Ready: () => calc(PREFIX),
    Entering: () => calc(`${PREFIX} 12`),
    'Entering, operator pending': () => calc(`${PREFIX} 5 + 12`),
    Recalled: () => calc(PREFIX).recall(3),
    'Recalled, operator pending': () => calc(`${PREFIX} 7 +`).recall(3),
    Pending: () => calc(`${PREFIX} 7 +`),
    Result: () => calc(`${PREFIX} 7 + 1 =`),
    Error: () => calc(`${PREFIX} 7 ÷ 0 =`),
  }

  type Expect = { kind: string; display: string; expression: string; line?: string; memory?: string | null }
  type Row = [state: string, event: string, act: (s: Session) => void, expected: Expect | 'unchanged' | NoticeCode]

  const E: Record<string, (s: Session) => void> = {
    digit: (s) => s.keys('7'),
    decimal: (s) => s.keys('.'),
    operator: (s) => s.keys('×'),
    equals: (s) => s.keys('='),
    clear: (s) => s.keys('Esc'),
    clearEntry: (s) => s.keys('Del'),
    backspace: (s) => s.keys('Bksp'),
    signToggle: (s) => s.keys('+/−'),
    'paste accepted': (s) => s.paste('42'),
    'paste refused': (s) => s.paste('abc'),
    recall: (s) => s.recall(1),
    memoryPlus: (s) => s.keys('M+'),
    memoryMinus: (s) => s.keys('M−'),
    memoryRecall: (s) => s.keys('MR'),
    memoryClear: (s) => s.keys('MC'),
  }
  const act = (name: string) => E[name] ?? (() => undefined)

  const rows: Row[] = [
    ['Ready', 'digit', act('digit'), { kind: 'entering', display: '7', expression: '' }],
    ['Ready', 'decimal', act('decimal'), { kind: 'entering', display: '0.', expression: '' }],
    ['Ready', 'operator', act('operator'), { kind: 'pending', display: '0', expression: '0 ×' }],
    ['Ready', 'equals', act('equals'), 'unchanged'],
    ['Ready', 'clear', act('clear'), 'unchanged'],
    ['Ready', 'clearEntry', act('clearEntry'), 'unchanged'],
    ['Ready', 'backspace', act('backspace'), 'unchanged'],
    ['Ready', 'signToggle', act('signToggle'), 'unchanged'],
    ['Ready', 'paste accepted', act('paste accepted'), { kind: 'entering', display: '42', expression: '' }],
    ['Ready', 'paste refused', act('paste refused'), 'PASTE_UNREADABLE'],
    ['Ready', 'recall', act('recall'), { kind: 'recalled', display: '5', expression: '' }],
    ['Ready', 'memoryPlus', act('memoryPlus'), { kind: 'ready', display: '0', expression: '', line: 'M+ 0, memory 6', memory: 'M 6' }],
    ['Ready', 'memoryMinus', act('memoryMinus'), { kind: 'ready', display: '0', expression: '', line: 'M− 0, memory 6', memory: 'M 6' }],
    ['Ready', 'memoryRecall', act('memoryRecall'), { kind: 'recalled', display: '6', expression: '' }],
    ['Ready', 'memoryClear', act('memoryClear'), { kind: 'ready', display: '0', expression: '', memory: null }],

    ['Entering', 'digit', act('digit'), { kind: 'entering', display: '127', expression: '' }],
    ['Entering', 'decimal', act('decimal'), { kind: 'entering', display: '12.', expression: '' }],
    ['Entering', 'operator', act('operator'), { kind: 'pending', display: '12', expression: '12 ×' }],
    ['Entering', 'equals', act('equals'), 'unchanged'],
    ['Entering', 'clear', act('clear'), { kind: 'ready', display: '0', expression: '' }],
    ['Entering', 'clearEntry', act('clearEntry'), { kind: 'entering', display: '0', expression: '' }],
    ['Entering', 'backspace', act('backspace'), { kind: 'entering', display: '1', expression: '' }],
    ['Entering', 'signToggle', act('signToggle'), { kind: 'entering', display: '−12', expression: '' }],
    ['Entering', 'paste accepted', act('paste accepted'), { kind: 'entering', display: '42', expression: '' }],
    ['Entering', 'paste refused', act('paste refused'), 'PASTE_UNREADABLE'],
    ['Entering', 'recall', act('recall'), { kind: 'recalled', display: '5', expression: '' }],
    ['Entering', 'memoryPlus', act('memoryPlus'), { kind: 'entering', display: '12', expression: '', line: 'M+ 12, memory 18', memory: 'M 18' }],
    ['Entering', 'memoryMinus', act('memoryMinus'), { kind: 'entering', display: '12', expression: '', line: 'M− 12, memory −6', memory: 'M −6' }],
    ['Entering', 'memoryRecall', act('memoryRecall'), { kind: 'recalled', display: '6', expression: '' }],
    ['Entering', 'memoryClear', act('memoryClear'), { kind: 'entering', display: '12', expression: '', memory: null }],

    ['Entering, operator pending', 'digit', act('digit'), { kind: 'entering', display: '127', expression: '5 +' }],
    ['Entering, operator pending', 'decimal', act('decimal'), { kind: 'entering', display: '12.', expression: '5 +' }],
    ['Entering, operator pending', 'operator', act('operator'), { kind: 'pending', display: '17', expression: '17 ×' }],
    ['Entering, operator pending', 'equals', act('equals'), { kind: 'result', display: '17', expression: '5 + 12 =', line: '5 + 12 = 17' }],
    ['Entering, operator pending', 'clear', act('clear'), { kind: 'ready', display: '0', expression: '' }],
    ['Entering, operator pending', 'clearEntry', act('clearEntry'), { kind: 'entering', display: '0', expression: '5 +' }],
    ['Entering, operator pending', 'backspace', act('backspace'), { kind: 'entering', display: '1', expression: '5 +' }],
    ['Entering, operator pending', 'signToggle', act('signToggle'), { kind: 'entering', display: '−12', expression: '5 +' }],
    ['Entering, operator pending', 'paste accepted', act('paste accepted'), { kind: 'entering', display: '42', expression: '5 +' }],
    ['Entering, operator pending', 'paste refused', act('paste refused'), 'PASTE_UNREADABLE'],
    ['Entering, operator pending', 'recall', act('recall'), { kind: 'recalled', display: '5', expression: '5 +' }],
    ['Entering, operator pending', 'memoryPlus', act('memoryPlus'), { kind: 'entering', display: '12', expression: '5 +', line: 'M+ 12, memory 18', memory: 'M 18' }],
    ['Entering, operator pending', 'memoryMinus', act('memoryMinus'), { kind: 'entering', display: '12', expression: '5 +', line: 'M− 12, memory −6', memory: 'M −6' }],
    ['Entering, operator pending', 'memoryRecall', act('memoryRecall'), { kind: 'recalled', display: '6', expression: '5 +' }],
    ['Entering, operator pending', 'memoryClear', act('memoryClear'), { kind: 'entering', display: '12', expression: '5 +', memory: null }],

    ['Recalled', 'digit', act('digit'), { kind: 'entering', display: '7', expression: '' }],
    ['Recalled', 'decimal', act('decimal'), { kind: 'entering', display: '0.', expression: '' }],
    ['Recalled', 'operator', act('operator'), { kind: 'pending', display: '6', expression: '6 ×' }],
    ['Recalled', 'equals', act('equals'), 'unchanged'],
    ['Recalled', 'clear', act('clear'), { kind: 'ready', display: '0', expression: '' }],
    ['Recalled', 'clearEntry', act('clearEntry'), { kind: 'entering', display: '0', expression: '' }],
    ['Recalled', 'backspace', act('backspace'), 'unchanged'],
    ['Recalled', 'signToggle', act('signToggle'), { kind: 'recalled', display: '−6', expression: '' }],
    ['Recalled', 'paste accepted', act('paste accepted'), { kind: 'entering', display: '42', expression: '' }],
    ['Recalled', 'paste refused', act('paste refused'), 'PASTE_UNREADABLE'],
    ['Recalled', 'recall', act('recall'), { kind: 'recalled', display: '5', expression: '' }],
    ['Recalled', 'memoryPlus', act('memoryPlus'), { kind: 'recalled', display: '6', expression: '', line: 'M+ 6, memory 12', memory: 'M 12' }],
    ['Recalled', 'memoryMinus', act('memoryMinus'), { kind: 'recalled', display: '6', expression: '', line: 'M− 6, memory 0', memory: 'M 0' }],
    ['Recalled', 'memoryRecall', act('memoryRecall'), { kind: 'recalled', display: '6', expression: '' }],
    ['Recalled', 'memoryClear', act('memoryClear'), { kind: 'recalled', display: '6', expression: '', memory: null }],

    ['Recalled, operator pending', 'digit', act('digit'), { kind: 'entering', display: '7', expression: '7 +' }],
    ['Recalled, operator pending', 'decimal', act('decimal'), { kind: 'entering', display: '0.', expression: '7 +' }],
    ['Recalled, operator pending', 'operator', act('operator'), { kind: 'pending', display: '13', expression: '13 ×' }],
    ['Recalled, operator pending', 'equals', act('equals'), { kind: 'result', display: '13', expression: '7 + 6 =', line: '7 + 6 = 13' }],
    ['Recalled, operator pending', 'clear', act('clear'), { kind: 'ready', display: '0', expression: '' }],
    ['Recalled, operator pending', 'clearEntry', act('clearEntry'), { kind: 'entering', display: '0', expression: '7 +' }],
    ['Recalled, operator pending', 'backspace', act('backspace'), 'unchanged'],
    ['Recalled, operator pending', 'signToggle', act('signToggle'), { kind: 'recalled', display: '−6', expression: '7 +' }],
    ['Recalled, operator pending', 'paste accepted', act('paste accepted'), { kind: 'entering', display: '42', expression: '7 +' }],
    ['Recalled, operator pending', 'paste refused', act('paste refused'), 'PASTE_UNREADABLE'],
    ['Recalled, operator pending', 'recall', act('recall'), { kind: 'recalled', display: '5', expression: '7 +' }],
    ['Recalled, operator pending', 'memoryPlus', act('memoryPlus'), { kind: 'recalled', display: '6', expression: '7 +', line: 'M+ 6, memory 12', memory: 'M 12' }],
    ['Recalled, operator pending', 'memoryMinus', act('memoryMinus'), { kind: 'recalled', display: '6', expression: '7 +', line: 'M− 6, memory 0', memory: 'M 0' }],
    ['Recalled, operator pending', 'memoryRecall', act('memoryRecall'), { kind: 'recalled', display: '6', expression: '7 +' }],
    ['Recalled, operator pending', 'memoryClear', act('memoryClear'), { kind: 'recalled', display: '6', expression: '7 +', memory: null }],

    ['Pending', 'digit', act('digit'), { kind: 'entering', display: '7', expression: '7 +' }],
    ['Pending', 'decimal', act('decimal'), { kind: 'entering', display: '0.', expression: '7 +' }],
    ['Pending', 'operator', act('operator'), { kind: 'pending', display: '7', expression: '7 ×' }],
    ['Pending', 'equals', act('equals'), 'unchanged'],
    ['Pending', 'clear', act('clear'), { kind: 'ready', display: '0', expression: '' }],
    ['Pending', 'clearEntry', act('clearEntry'), 'unchanged'],
    ['Pending', 'backspace', act('backspace'), 'unchanged'],
    ['Pending', 'signToggle', act('signToggle'), 'unchanged'],
    ['Pending', 'paste accepted', act('paste accepted'), { kind: 'entering', display: '42', expression: '7 +' }],
    ['Pending', 'paste refused', act('paste refused'), 'PASTE_UNREADABLE'],
    ['Pending', 'recall', act('recall'), { kind: 'recalled', display: '5', expression: '7 +' }],
    ['Pending', 'memoryPlus', act('memoryPlus'), { kind: 'pending', display: '7', expression: '7 +', line: 'M+ 7, memory 13', memory: 'M 13' }],
    ['Pending', 'memoryMinus', act('memoryMinus'), { kind: 'pending', display: '7', expression: '7 +', line: 'M− 7, memory −1', memory: 'M −1' }],
    ['Pending', 'memoryRecall', act('memoryRecall'), { kind: 'recalled', display: '6', expression: '7 +' }],
    ['Pending', 'memoryClear', act('memoryClear'), { kind: 'pending', display: '7', expression: '7 +', memory: null }],

    ['Result', 'digit', act('digit'), { kind: 'entering', display: '7', expression: '' }],
    ['Result', 'decimal', act('decimal'), { kind: 'entering', display: '0.', expression: '' }],
    ['Result', 'operator', act('operator'), { kind: 'pending', display: '8', expression: '8 ×' }],
    ['Result', 'equals', act('equals'), { kind: 'result', display: '9', expression: '8 + 1 =', line: '8 + 1 = 9' }],
    ['Result', 'clear', act('clear'), { kind: 'ready', display: '0', expression: '' }],
    ['Result', 'clearEntry', act('clearEntry'), { kind: 'ready', display: '0', expression: '' }],
    ['Result', 'backspace', act('backspace'), 'unchanged'],
    ['Result', 'signToggle', act('signToggle'), { kind: 'result', display: '−8', expression: '7 + 1 =' }],
    ['Result', 'paste accepted', act('paste accepted'), { kind: 'entering', display: '42', expression: '' }],
    ['Result', 'paste refused', act('paste refused'), 'PASTE_UNREADABLE'],
    ['Result', 'recall', act('recall'), { kind: 'recalled', display: '5', expression: '' }],
    ['Result', 'memoryPlus', act('memoryPlus'), { kind: 'result', display: '8', expression: '7 + 1 =', line: 'M+ 8, memory 14', memory: 'M 14' }],
    ['Result', 'memoryMinus', act('memoryMinus'), { kind: 'result', display: '8', expression: '7 + 1 =', line: 'M− 8, memory −2', memory: 'M −2' }],
    ['Result', 'memoryRecall', act('memoryRecall'), { kind: 'recalled', display: '6', expression: '' }],
    ['Result', 'memoryClear', act('memoryClear'), { kind: 'result', display: '8', expression: '7 + 1 =', memory: null }],

    ['Error', 'digit', act('digit'), { kind: 'entering', display: '7', expression: '' }],
    ['Error', 'decimal', act('decimal'), { kind: 'entering', display: '0.', expression: '' }],
    ['Error', 'operator', act('operator'), 'unchanged'],
    ['Error', 'equals', act('equals'), 'unchanged'],
    ['Error', 'clear', act('clear'), { kind: 'ready', display: '0', expression: '' }],
    ['Error', 'clearEntry', act('clearEntry'), { kind: 'ready', display: '0', expression: '' }],
    ['Error', 'backspace', act('backspace'), 'unchanged'],
    ['Error', 'signToggle', act('signToggle'), 'unchanged'],
    ['Error', 'paste accepted', act('paste accepted'), { kind: 'entering', display: '42', expression: '' }],
    ['Error', 'paste refused', act('paste refused'), 'PASTE_UNREADABLE'],
    ['Error', 'recall', act('recall'), { kind: 'recalled', display: '5', expression: '' }],
    ['Error', 'memoryPlus', act('memoryPlus'), 'unchanged'],
    ['Error', 'memoryMinus', act('memoryMinus'), 'unchanged'],
    ['Error', 'memoryRecall', act('memoryRecall'), { kind: 'recalled', display: '6', expression: '' }],
    ['Error', 'memoryClear', act('memoryClear'), { kind: 'error', display: 'Cannot divide by zero', expression: '7 ÷ 0 =', memory: null }],
  ]

  it('covers every state against every event', () => {
    for (const state of Object.keys(setups)) {
      expect(rows.filter((r) => r[0] === state).map((r) => r[1])).toEqual(Object.keys(E))
    }
  })

  it.each(rows)('%s, %s', (state, _event, run, expected) => {
    const session = (setups[state] ?? (() => calc()))()
    const before = session.state
    run(session)
    if (expected === 'unchanged') {
      expect(session.state).toEqual(before)
      expect(session.notice).toBeUndefined()
      return
    }
    if (typeof expected === 'string') {
      expect(session.state).toEqual(before)
      expect(session.notice).toBe(expected)
      return
    }
    expect(session.state.calc.kind).toBe(expected.kind)
    expect(session.display).toBe(expected.display)
    expect(session.expression).toBe(expected.expression)
    expect(session.memory).toBe(expected.memory === undefined ? 'M 6' : expected.memory)
    const added = session.state.tape.slice(before.tape.length).map(lineText)
    expect(added).toEqual(expected.line === undefined ? [] : [expected.line])
    expect(session.notice).toBeUndefined()
  })

  it.each(Object.keys(setups))('%s: MR and MC do nothing while memory is empty (AC-19.6)', (state) => {
    const withoutMemory = (setups[state] ?? (() => calc()))().send({ type: 'memoryClear' })
    expectNoChange(withoutMemory, (s) => s.keys('MR'))
    expectNoChange(withoutMemory, (s) => s.keys('MC'))
  })

  it.each(Object.keys(setups))('%s: recalling a line that does not exist does nothing (AC-13.8)', (state) => {
    expectNoChange((setups[state] ?? (() => calc()))(), (s) => s.recall(99))
  })
})

describe('S-1 Type a figure', () => {
  it('AC-1.1: typing 1234.50 shows 1234.50, with no comma added', () => {
    expect(calc('1234.50').display).toBe('1234.50')
  })
  it('AC-1.2: . then 5 shows 0.5', () => {
    expect(calc('. 5').display).toBe('0.5')
  })
  it('AC-1.3: a second point does nothing, with no message', () => {
    expectNoChange(calc('1.5'), (s) => s.keys('.'))
  })
  it('AC-1.4: 0 three times on a fresh calculator stays 0', () => {
    expect(calc('000').display).toBe('0')
  })
  it('AC-1.5: a 16th digit is refused with "15 digits maximum"', () => {
    const s = calc('123456789012345 6')
    expect(s.display).toBe('123456789012345')
    expect(s.notice).toBe('DIGIT_LIMIT')
  })
  it('AC-1.6: the 0 before the point does not count toward the 15', () => {
    expect(calc('0.12345678901234 5').display).toBe('0.123456789012345')
  })
  it('AC-1.7: after the message, the next input acts as normal', () => {
    const s = calc('123456789012345 6 +')
    expect(s.expression).toBe('123,456,789,012,345 +')
    expect(s.notice).toBeUndefined()
  })
  it('AC-1.9: 15 nines show in plain notation', () => {
    expect(calc('999999999999999').display).toBe('999999999999999')
  })
  it('AC-1.10: 0.000000000000001 shows exactly as typed', () => {
    expect(calc('0.000000000000001').display).toBe('0.000000000000001')
  })
  it('AC-1.11: a digit after a result starts a new figure and empties the expression line', () => {
    const s = calc('2 + 3 = 7')
    expect(s.display).toBe('7')
    expect(s.expression).toBe('')
  })
  it('AC-1.12: a digit after "Cannot divide by zero" shows that digit', () => {
    expect(calc('5 ÷ 0 = 7').display).toBe('7')
  })
})

describe('S-2 Use the on-screen keys', () => {
  it('AC-2.1: 1 2 + 3 = shows 15', () => {
    expect(calc('12 + 3 =').display).toBe('15')
  })
  it('AC-2.6: +/− then = shows −5, and = does nothing with no operator', () => {
    const s = calc('5 +/−')
    expect(s.display).toBe('−5')
    expectNoChange(s, (x) => x.keys('='))
  })
  it('AC-2.17: C in an error shows 0', () => {
    expect(calc('5 ÷ 0 = Esc').display).toBe('0')
  })
})

describe('S-3 Get exact answers to ordinary sums', () => {
  it.each([
    ['AC-3.1', '0.1 + 0.2 =', '0.3'],
    ['AC-3.2', '1.005 × 100 =', '100.5'],
    ['AC-3.3', '0.1 × 3 =', '0.3'],
    ['AC-3.4', '7 − 10 =', '−3'],
    ['AC-3.5', '1.5 ÷ 0.5 =', '3'],
    ['AC-3.7', '5 +/− + 5 =', '0'],
    ['AC-3.8', '1.50 + 1.50 =', '3'],
    ['AC-3.9', '999999999999999 × 999999999999999 =', '≈ 9.99999999999998 × 10²⁹'],
    ['AC-3.10', '0.000000000000001 × 0.000000000000001 =', '1 × 10⁻³⁰'],
    ['AC-3.11', '0.1 + 0.2 = + 0.1 =', '0.4'],
  ])('%s: %s shows %s', (_id, keys, shown) => {
    expect(calc(keys).display).toBe(shown)
  })
  it('AC-3.6: 5 ÷ 0 = shows "Cannot divide by zero"', () => {
    expect(calc('5 ÷ 0 =').display).toBe('Cannot divide by zero')
  })
})

describe('S-4 See the order operations run in', () => {
  it('AC-4.1: 2 + 3 × puts 5 × on the expression line', () => {
    expect(calc('2 + 3 ×').expression).toBe('5 ×')
  })
  it('AC-4.2: then 4 = shows 20', () => {
    expect(calc('2 + 3 × 4 =').display).toBe('20')
  })
  it('AC-4.3: a second operator replaces the first', () => {
    expect(calc('2 + ×').expression).toBe('2 ×')
  })
  it('AC-4.4: then 4 = shows 8', () => {
    expect(calc('2 + × 4 =').display).toBe('8')
  })
  it('AC-4.5: = straight after an operator does nothing and writes no line', () => {
    expectNoChange(calc('2 +'), (s) => s.keys('='))
  })
  it('AC-4.6: = with no operator does nothing and writes no line', () => {
    expectNoChange(calc('5'), (s) => s.keys('='))
  })
  it('AC-4.7: the expression line after a power keeps its characters', () => {
    expect(calc('999999999999999 × 999999999999999 ×').expression).toBe('≈ 9.99999999999998 × 10²⁹ ×')
  })
  it('AC-4.8: 5 ÷ 0 + shows the error as soon as + is pressed, ending the step with +', () => {
    const s = calc('5 ÷ 0 +')
    expect(s.display).toBe('Cannot divide by zero')
    expect(s.expression).toBe('5 ÷ 0 +')
  })
  it('Decision 4: an operator on a fresh calculator acts on the 0 showing', () => {
    expect(calc('+').expression).toBe('0 +')
  })
  it('Decision 4: after = the expression line shows the last step', () => {
    expect(calc('2 + 3 × 4 =').expression).toBe('5 × 4 =')
  })
  it('Decision 15a: with an operator pending, the display shows the running result', () => {
    expect(calc('2 + 3 ×').display).toBe('5')
  })
})

describe('S-5 Know when a number is not exact', () => {
  it.each([
    ['AC-5.1', '100 ÷ 3 =', '≈ 33.3333333333333'],
    ['AC-5.2', '100 ÷ 3 = × 3 =', '≈ 100'],
    ['AC-5.3', '2 ÷ 3 =', '≈ 0.666666666666667'],
    ['AC-5.5', '123456789012345 + 0.5 =', '≈ 123,456,789,012,346'],
    ['AC-5.6', '123456789012345 +/− − 0.5 =', '≈ −123,456,789,012,346'],
    ['AC-5.7', '123456789012345 + 0.4 =', '≈ 123,456,789,012,345'],
    ['AC-5.8', '99999999999999.9 + 0 =', '99,999,999,999,999.9'],
    ['AC-5.9', '100 ÷ 3 × 0 =', '≈ 0'],
    ['AC-5.10', '100 ÷ 3 = +/−', '≈ −33.3333333333333'],
    ['AC-5.11', '1 ÷ 3 ÷ 1000000000 =', '≈ 3.33333333333333 × 10⁻¹⁰'],
    ['AC-5.12', '100 ÷ 3 × 3 = 2 + 2 =', '4'],
    ['AC-5.13', '5 ÷ 0 = 4', '4'],
  ])('%s: %s shows %s', (_id, keys, shown) => {
    expect(calc(keys).display).toBe(shown)
  })
  it('AC-5.4: 100 ÷ 3 × puts ≈ 33.3333333333333 × on the expression line', () => {
    expect(calc('100 ÷ 3 ×').expression).toBe('≈ 33.3333333333333 ×')
  })
  it('Decision 3: a ≈ from a cut display carries to the end of the calculation', () => {
    expect(calc('123456789012345 + 0.5 − 0.5 =').display).toBe('≈ 123,456,789,012,345')
  })
})

describe('S-6 Work with very large and very small numbers', () => {
  const tenToThe90 = '10000000000 × 10000000000 = = = = = = = ='
  const tenToTheMinus99 = '0.000000001 × 0.000000001 = = = = = = = = = ='

  it('AC-6.1: 999999999999999 + 1 = shows 1 × 10¹⁵ with no ≈', () => {
    expect(calc('999999999999999 + 1 =').display).toBe('1 × 10¹⁵')
  })
  it('AC-6.2: 1 ÷ 1000000000 = shows 0.000000001', () => {
    expect(calc('1 ÷ 1000000000 =').display).toBe('0.000000001')
  })
  it('AC-6.3: then ÷ 10 = shows 1 × 10⁻¹⁰', () => {
    expect(calc('1 ÷ 1000000000 = ÷ 10 =').display).toBe('1 × 10⁻¹⁰')
  })
  it('AC-6.4: the rounded value decides the notation', () => {
    expect(calc('999999999999999 + 0.5 =').display).toBe('≈ 1 × 10¹⁵')
  })
  it('AC-6.5: 1 × 10²⁰ then seven more = shows 1 × 10⁹⁰', () => {
    expect(calc(tenToThe90).display).toBe('1 × 10⁹⁰')
  })
  it('AC-6.6: one more = shows "Number too large" and writes no line', () => {
    const s = calc(tenToThe90)
    const lines = s.tape.length
    s.keys('=')
    expect(s.display).toBe('Number too large')
    expect(s.tape.length).toBe(lines)
  })
  it('AC-6.7: 1 × 10⁻¹⁸ then nine more = shows 1 × 10⁻⁹⁹', () => {
    expect(calc(tenToTheMinus99).display).toBe('1 × 10⁻⁹⁹')
  })
  it('AC-6.8: one more = shows "Number too small", never 0, and writes no line', () => {
    const s = calc(tenToTheMinus99)
    const lines = s.tape.length
    s.keys('=')
    expect(s.display).toBe('Number too small')
    expect(s.tape.length).toBe(lines)
  })
  it('AC-6.10: a digit after "Number too large" shows that digit', () => {
    expect(calc(`${tenToThe90} = 3`).display).toBe('3')
  })
  it('AC-6.11: + after "Number too small" does nothing', () => {
    expectNoChange(calc(`${tenToTheMinus99} =`), (s) => s.keys('+'))
  })
})

describe('S-7 Correct the figure I am typing', () => {
  it.each([
    ['AC-7.1', '123 Bksp', '12'],
    ['AC-7.2', '5 + 12 Del 3 =', '8'],
    ['AC-7.3', '12 +/−', '−12'],
    ['AC-7.6', '+/−', '0'],
    ['AC-7.8', '7 Bksp', '0'],
    ['AC-7.9', '5 +/− Bksp', '0'],
    ['AC-7.10', '1.50 Bksp', '1.5'],
    ['AC-7.12', '0.000000000000001 Bksp', '0.00000000000000'],
    ['AC-7.14', '2 + 3 = Del', '0'],
    ['AC-7.16', '5 ÷ 0 = Del', '0'],
    ['Decision 5', '12. Bksp', '12'],
    ['Decision 5', '0.5 +/− Bksp', '0.'],
  ])('%s: %s shows %s', (_id, keys, shown) => {
    expect(calc(keys).display).toBe(shown)
  })
  it('AC-7.4: Escape clears the calculation, not the tape', () => {
    const s = calc('1 + 1 = 5 + 3 Esc')
    expect(s.display).toBe('0')
    expect(s.expression).toBe('')
    expect(s.tape).toEqual(['1 + 1 = 2'])
  })
  it('AC-7.5: Backspace with nothing typed does nothing', () => {
    expectNoChange(calc(), (s) => s.keys('Bksp'))
  })
  it('AC-7.7: a figure already followed by an operator cannot be edited (S-16 closes this)', () => {
    const s = calc('5 + 3 ×')
    expectNoChange(s, (x) => x.keys('Bksp'))
    expect(s.expression).toBe('8 ×')
  })
  it('AC-7.11: after Backspace from 15 digits, another digit is accepted', () => {
    const s = calc('123456789012345 Bksp 6')
    expect(s.display).toBe('123456789012346')
    expect(s.notice).toBeUndefined()
  })
  it('AC-7.13: Backspace on a result does nothing', () => {
    expectNoChange(calc('2 + 3 ='), (s) => s.keys('Bksp'))
  })
  it('AC-7.15: Backspace in an error does nothing', () => {
    expectNoChange(calc('5 ÷ 0 ='), (s) => s.keys('Bksp'))
  })
})

describe('S-8 Keep going from a result', () => {
  it('AC-8.1: repeated = repeats the last operation, each a tape line', () => {
    const s = calc('5 + 3 = =')
    expect(s.display).toBe('11')
    expect(s.tape.at(-1)).toBe('8 + 3 = 11')
  })
  it('AC-8.2: an operator continues from the result, on its own line', () => {
    const s = calc('2 + 3 = + 2 =')
    expect(s.display).toBe('7')
    expect(s.tape.at(-1)).toBe('5 + 2 = 7')
  })
  it('AC-8.3: a digit starts a new calculation', () => {
    const s = calc('2 + 3 = 9')
    expect(s.display).toBe('9')
    expect(s.expression).toBe('')
  })
  it('AC-8.4: and = then does nothing, the last operation forgotten', () => {
    expectNoChange(calc('2 + 3 = 9'), (s) => s.keys('='))
  })
  it('AC-8.5: +/− on a result flips it and writes no line', () => {
    const s = calc('2 + 3 = +/− + 1 =')
    expect(s.display).toBe('−4')
    expect(s.tape).toEqual(['2 + 3 = 5', '−5 + 1 = −4'])
  })
  it('AC-8.6: + then = does nothing after the +', () => {
    expectNoChange(calc('2 + 3 = +'), (s) => s.keys('='))
  })
  it('AC-8.7: +/− on a result of 0 stays 0', () => {
    expect(calc('5 − 5 = +/−').display).toBe('0')
  })
  it('AC-8.8: +/− keeps the ≈', () => {
    expect(calc('100 ÷ 3 = +/−').display).toBe('≈ −33.3333333333333')
  })
  it('AC-8.9: four more = each add a tape line', () => {
    expect(calc('999999999999999 × 999999999999999 = = = = =').tape).toHaveLength(5)
  })
  it('AC-8.10: a fifth = shows "Number too large", adds no line, keeps the earlier ones', () => {
    const s = calc('999999999999999 × 999999999999999 = = = = = =')
    expect(s.display).toBe('Number too large')
    expect(s.tape).toHaveLength(5)
  })
  it('AC-8.11: = in that error does nothing', () => {
    expectNoChange(calc('999999999999999 × 999999999999999 = = = = = ='), (s) => s.keys('='))
  })
})

describe('S-9 Get out of an error', () => {
  const errors: [string, string][] = [
    ['Cannot divide by zero', '5 ÷ 0 ='],
    ['Number too large', '10000000000 × 10000000000 = = = = = = = = ='],
    ['Number too small', '0.000000001 × 0.000000001 = = = = = = = = = = ='],
  ]

  it('AC-9.1: 5 ÷ 0 = shows "Cannot divide by zero"', () => {
    expect(calc('5 ÷ 0 =').display).toBe('Cannot divide by zero')
  })
  it('AC-9.2: then 7 shows 7', () => {
    expect(calc('5 ÷ 0 = 7').display).toBe('7')
  })
  it('AC-9.3: 0 ÷ 0 = shows "Cannot divide by zero"', () => {
    expect(calc('0 ÷ 0 =').display).toBe('Cannot divide by zero')
  })

  describe.each(errors)('AC-9.4, AC-9.8: in "%s"', (message, keys) => {
    it.each(['+', '−', '×', '÷', '=', '+/−', 'Bksp', 'M+', 'M−'])('%s does nothing', (key) => {
      const s = calc(`95 M+ Esc ${keys}`)
      expect(s.display).toBe(message)
      expectNoChange(s, (x) => x.keys(key))
    })

    it('AC-9.5: the step that fails writes no tape line', () => {
      const s = calc(`95 M+ Esc ${keys.replace(/ =$/, '')}`)
      const lines = s.state.tape
      s.keys('=')
      expect(s.display).toBe(message)
      expect(s.state.tape).toBe(lines)
    })

    it.each<[string, (s: Session) => void, string]>([
      ['Escape', (s) => s.keys('Esc'), '0'],
      ['Delete', (s) => s.keys('Del'), '0'],
      ['the point', (s) => s.keys('.'), '0.'],
      ['a digit', (s) => s.keys('7'), '7'],
      ['pasting 12', (s) => s.paste('12'), '12'],
      ['recalling a tape line', (s) => s.recall(1), '95'],
      ['MR with memory holding 95', (s) => s.keys('MR'), '95'],
    ])('AC-9.6: %s leaves it, showing %s', (_way, leave, shown) => {
      const s = calc(`95 M+ Esc ${keys}`)
      leave(s)
      expect(s.display).toBe(shown)
      expect(s.state.calc.kind).not.toBe('error')
    })

    it('AC-9.6: MC clears memory and the error stays', () => {
      const s = calc(`95 M+ Esc ${keys} MC`)
      expect(s.memory).toBeNull()
      expect(s.display).toBe(message)
    })
  })

  it('AC-9.7: after leaving by typing 7, = does nothing', () => {
    expectNoChange(calc('5 ÷ 0 = 7'), (s) => s.keys('='))
  })
})

describe('S-10 Do everything from the keyboard (domain part)', () => {
  it('AC-10.1: 12.5 × 4 = shows 50', () => {
    expect(calc('12.5 × 4 =').display).toBe('50')
  })
  it('AC-10.7: Escape clears, Delete resets the figure, Backspace removes the last digit', () => {
    expect(calc('5 + 3 Esc').display).toBe('0')
    expect(calc('5 + 34 Del').display).toBe('0')
    expect(calc('5 + 34 Bksp').display).toBe('3')
  })
  it('AC-10.22: = in an error does nothing', () => {
    expectNoChange(calc('5 ÷ 0 ='), (s) => s.keys('='))
  })
  it('AC-10.23: a digit in an error shows it', () => {
    expect(calc('5 ÷ 0 = 4').display).toBe('4')
  })
})

describe('S-11 Paste a figure from a spreadsheet or email', () => {
  it('AC-11.1: £1,234.56 shows 1234.56, as pasted', () => {
    expect(calc().paste('£1,234.56').display).toBe('1234.56')
  })
  it('AC-11.1: −5 with a true minus shows −5', () => {
    expect(calc().paste('−5').display).toBe('−5')
  })
  it('AC-11.2: 5 + then pasting 2 and = shows 7', () => {
    expect(calc('5 +').paste('2').keys('=').display).toBe('7')
  })
  it('AC-11.3: pasting while typing replaces the figure', () => {
    expect(calc('12').paste('34').display).toBe('34')
  })
  it('AC-11.4: a pasted figure can be edited with Backspace', () => {
    expect(calc().paste('12.5').keys('Bksp').display).toBe('12.')
  })
  it('AC-11.5: commas appear once the pasted figure becomes a result', () => {
    expect(calc().paste('£1,234.56').keys('+').expression).toBe('1,234.56 +')
  })
  it.each<[string, string, NoticeCode]>([
    ['AC-11.6', '1.234,56', 'PASTE_AMBIGUOUS_DECIMAL'],
    ['AC-11.7', '(1,234)', 'PASTE_BRACKETS'],
    ['AC-11.8', 'abc', 'PASTE_UNREADABLE'],
    ['AC-11.10', '1,234,567,890,123,456', 'DIGIT_LIMIT'],
  ])('%s: pasting %s leaves the display unchanged with %s', (_id, text, notice) => {
    const s = calc('12')
    const before = s.state
    s.paste(text)
    expect(s.state).toEqual(before)
    expect(s.notice).toBe(notice)
  })
  it('AC-11.15: a paste after a result starts a new calculation', () => {
    const s = calc('2 + 3 =').paste('9')
    expect(s.display).toBe('9')
    expect(s.expression).toBe('')
  })
  it('AC-11.16: a paste in an error shows the figure', () => {
    expect(calc('5 ÷ 0 =').paste('9').display).toBe('9')
  })
  it('AC-11.17: a refused paste in an error leaves the error, with the message', () => {
    const s = calc('5 ÷ 0 =').paste('abc')
    expect(s.display).toBe('Cannot divide by zero')
    expect(s.notice).toBe('PASTE_UNREADABLE')
  })
})

describe('S-12 See the working on a tape', () => {
  it('AC-12.1: every step with its running result', () => {
    expect(calc('2 + 3 × 4 =').tape).toEqual(['2 + 3 = 5 → × 4 = 20'])
  })
  it('AC-12.2: a second calculation is a second line, below the first', () => {
    expect(calc('2 + 3 × 4 = 12 + 8 =').tape).toEqual(['2 + 3 = 5 → × 4 = 20', '12 + 8 = 20'])
  })
  it('AC-12.3: ≈ appears beside every figure that has it', () => {
    expect(calc('100 ÷ 3 × 3 =').tape).toEqual(['100 ÷ 3 = ≈ 33.3333333333333 → × 3 = ≈ 100'])
  })
  it('AC-12.4: M+ writes a quiet memory line', () => {
    expect(calc('55 M+ Esc 40 M+').tape.at(-1)).toBe('M+ 40, memory 95')
  })
  it('AC-12.5: M− writes a memory line', () => {
    expect(calc('95 M+ Esc 20 M−').tape.at(-1)).toBe('M− 20, memory 75')
  })
  it('AC-12.7: = with nothing to do, or an error, writes no line', () => {
    expect(calc('5 = Esc 2 + = Esc 5 ÷ 0 =').tape).toEqual([])
  })
  it('AC-12.8: Escape, Delete and +/− on a result leave the tape unchanged', () => {
    expect(calc('2 + 3 = +/− Del 1 + 1 = Esc').tape).toEqual(['2 + 3 = 5', '1 + 1 = 2'])
  })
  it('AC-12.13: an exponential result on the tape', () => {
    expect(calc('10000000000 × 10000000000 =').tape).toEqual(['10,000,000,000 × 10,000,000,000 = 1 × 10²⁰'])
  })
  it('AC-12.15: an error leaves the existing lines unchanged', () => {
    const s = calc('1 + 1 =')
    const lines = s.state.tape
    s.keys('5 ÷ 0 =')
    expect(s.state.tape).toBe(lines)
  })
  it('Decision 11: the tape is append-only; earlier lines are never rebuilt', () => {
    const s = calc('1 + 1 =')
    const first = s.state.tape[0]
    s.keys('= = M+ 7 M−')
    expect(s.state.tape[0]).toBe(first)
    expect(s.state.tape).toHaveLength(5)
  })
})

describe('S-13 Recall a result from the tape', () => {
  it('AC-13.1: recalling 100 ÷ 3 = ≈ 33.3333333333333 shows it with its ≈', () => {
    expect(calc('100 ÷ 3 = Esc').recall(1).display).toBe('≈ 33.3333333333333')
  })
  it('AC-13.2: × 3 = then shows ≈ 100, because all 34 digits came back', () => {
    expect(calc('100 ÷ 3 = Esc').recall(1).keys('× 3 =').display).toBe('≈ 100')
    expect(calc('33.3333333333333 × 3 =').display).toBe('99.9999999999999')
  })
  it('AC-13.4: recall while typing replaces the figure', () => {
    expect(calc('12 + 8 = 12').recall(1).display).toBe('20')
  })
  it('AC-13.5: recall after an operator is the next figure', () => {
    expect(calc('12 + 8 = 5 +').recall(1).keys('=').display).toBe('25')
  })
  it('AC-13.6: Backspace does not edit a recalled value', () => {
    expectNoChange(calc('12 + 8 =').recall(1), (s) => s.keys('Bksp'))
  })
  it('AC-13.7: a digit replaces a recalled value', () => {
    expect(calc('12 + 8 =').recall(1).keys('7').display).toBe('7')
  })
  it('AC-13.8: with an empty tape there is nothing to recall', () => {
    expectNoChange(calc(), (s) => s.recall(1))
  })
  it('AC-13.9: an exact result comes back with no ≈', () => {
    expect(calc('12 + 8 = Esc').recall(1).display).toBe('20')
  })
  it('AC-13.10: recalling a memory line brings back the memory total', () => {
    expect(calc('55 M+ Esc 40 M+ Esc').recall(2).display).toBe('95')
  })
  it('AC-13.11: a memory line with ≈ brings back its ≈', () => {
    const s = calc('100 ÷ 3 = M+ Esc')
    expect(s.tape.at(-1)).toBe('M+ ≈ 33.3333333333333, memory ≈ 33.3333333333333')
    expect(s.recall(2).display).toBe('≈ 33.3333333333333')
  })
  it('AC-13.12: +/− on a recalled ≈ value keeps the ≈', () => {
    expect(calc('100 ÷ 3 = Esc').recall(1).keys('+/−').display).toBe('≈ −33.3333333333333')
  })
  it('AC-13.14: recalling 1 × 10⁹⁰ and × 10000000000 = shows "Number too large"', () => {
    const s = calc('10000000000 × 10000000000 = = = = = = = = Esc')
    expect(s.tape.at(-1)).toBe('1 × 10⁸⁰ × 10,000,000,000 = 1 × 10⁹⁰')
    expect(s.recall(8).display).toBe('1 × 10⁹⁰')
    expect(s.keys('× 10000000000 =').display).toBe('Number too large')
  })
  it('AC-13.15: recall in an error starts a new calculation from that result', () => {
    const s = calc('12 + 8 = 5 ÷ 0 =').recall(1)
    expect(s.display).toBe('20')
    expect(s.expression).toBe('')
  })
})

describe('S-19 Keep a running total in memory', () => {
  it('AC-19.1: M+ adds the result, shows M 150.5 and writes a line', () => {
    const s = calc('120.5 + 30 = M+')
    expect(s.display).toBe('150.5')
    expect(s.memory).toBe('M 150.5')
    expect(s.tape.at(-1)).toBe('M+ 150.5, memory 150.5')
  })
  it('AC-19.2: three part totals add up to M 330.47', () => {
    expect(calc('120.5 + 30 = M+ 75 × 2 = M+ 9.99 × 3 = M+').memory).toBe('M 330.47')
  })
  it('AC-19.3: MR shows the total and starts a new calculation from it', () => {
    const s = calc('120.5 + 30 = M+ 75 × 2 = M+ 9.99 × 3 = M+ MR')
    expect(s.display).toBe('330.47')
    expect(s.expression).toBe('')
    expect(s.state.calc.kind).toBe('recalled')
  })
  it('AC-19.4: M− takes the value off and writes a line', () => {
    const s = calc('95 M+ Esc 20 M−')
    expect(s.memory).toBe('M 75')
    expect(s.tape.at(-1)).toBe('M− 20, memory 75')
  })
  it('AC-19.5: MC clears memory and writes no line', () => {
    const s = calc('75 M+')
    const lines = s.tape.length
    s.keys('MC')
    expect(s.memory).toBeNull()
    expect(s.tape.length).toBe(lines)
  })
  it('AC-19.6: with memory empty, MR and MC do nothing', () => {
    expectNoChange(calc('5'), (s) => s.keys('MR'))
    expectNoChange(calc('5'), (s) => s.keys('MC'))
  })
  it('AC-19.7: M+ and M− in an error do nothing and write no line', () => {
    expectNoChange(calc('5 ÷ 0 ='), (s) => s.keys('M+'))
    expectNoChange(calc('5 ÷ 0 ='), (s) => s.keys('M−'))
  })
  it('AC-19.9: memory at 0 still shows M 0', () => {
    expect(calc('5 M+ M−').memory).toBe('M 0')
  })
  it('AC-19.10: M+ while typing adds the figure and leaves it as typed', () => {
    const s = calc('1234.50 M+')
    expect(s.tape.at(-1)).toBe('M+ 1,234.5, memory 1,234.5')
    expect(s.display).toBe('1234.50')
    expect(s.state.calc.kind).toBe('entering')
  })
  it('AC-19.11: M+ with an operator pending adds the running result and keeps the operator', () => {
    const s = calc('5 + M+')
    expect(s.memory).toBe('M 5')
    expect(s.expression).toBe('5 +')
  })
  it('AC-19.12: a ≈ value gives memory ≈', () => {
    expect(calc('100 ÷ 3 = M+').memory).toBe('M ≈ 33.3333333333333')
  })
  it('AC-19.13: memory keeps its ≈ until MC', () => {
    expect(calc('100 ÷ 3 = M+ 1 M+').memory).toBe('M ≈ 34.3333333333333')
    expect(calc('100 ÷ 3 = M+ MC 1 M+').memory).toBe('M 1')
  })
  it('AC-19.14: memory survives C and Escape', () => {
    expect(calc('95 M+ Esc').memory).toBe('M 95')
  })
  it('Decision 19: on a fresh calculator M+ acts on the 0 showing', () => {
    const s = calc('M+')
    expect(s.memory).toBe('M 0')
    expect(s.tape).toEqual(['M+ 0, memory 0'])
  })
  it('AC-19.16: a total of 1e100 or more is "Number too large", memory unchanged, no line', () => {
    const s = calc('10000000000 × 10000000000 = = = = = = = = × 5000000000 = M+')
    expect(s.memory).toBe('M 5 × 10⁹⁹')
    const lines = s.tape.length
    s.keys('M+')
    expect(s.display).toBe(ERROR_TEXT.NUMBER_TOO_LARGE)
    expect(s.expression).toBe('M+ 5 × 10⁹⁹')
    expect(s.memory).toBe('M 5 × 10⁹⁹')
    expect(s.tape.length).toBe(lines)
  })
  it('AC-19.17: a non-zero total below 1e-99 is "Number too small", memory unchanged, no line', () => {
    const s = calc('0.000000001 × 0.000000001 = = = = = = = = = = × 2 = M+')
    expect(s.memory).toBe('M 2 × 10⁻⁹⁹')
    s.keys('Esc').recall(10).keys('× 1.5 =')
    const lines = s.tape.length
    s.keys('M−')
    expect(s.display).toBe(ERROR_TEXT.NUMBER_TOO_SMALL)
    expect(s.memory).toBe('M 2 × 10⁻⁹⁹')
    expect(s.tape.length).toBe(lines)
  })
  it('AC-19.18: MR leaves an error, showing the total', () => {
    expect(calc('95 M+ Esc 5 ÷ 0 = MR').display).toBe('95')
  })
  it('AC-19.19: a digit after M+ on a result starts a new calculation', () => {
    const s = calc('30 + 10 = M+ 7')
    expect(s.display).toBe('7')
    expect(s.expression).toBe('')
  })
})

describe('the reducer is pure and cannot throw', () => {
  // A fixed-seed generator, so a failure always reproduces.
  function generator(seed: number) {
    let x = seed
    return (n: number) => {
      x = (x * 1103515245 + 12345) % 2147483648
      return x % n
    }
  }
  const pastes = ['12', '£1,234.56', 'abc', '(5)', '1.234,56', '0.0000000000000001', '-£5', '9.99']
  const keys = [...'0123456789.', '+', '−', '×', '÷', '=', 'Esc', 'Del', 'Bksp', '+/−', 'M+', 'M−', 'MR', 'MC']

  it('survives 300 random sequences of 80 inputs, keeping the tape append-only', () => {
    for (let seed = 1; seed <= 300; seed++) {
      const pick = generator(seed)
      const s = calc()
      for (let i = 0; i < 80; i++) {
        const before = s.state.tape
        const r = pick(10)
        if (r === 0) s.paste(pastes[pick(pastes.length)] ?? '')
        else if (r === 1) s.recall(pick(before.length + 2))
        else s.keys(keys[pick(keys.length)] ?? '=')
        expect(s.state.tape.slice(0, before.length)).toEqual(before)
        expect(typeof s.display).toBe('string')
      }
    }
  })

  it('returns a new state without changing the one it was given', () => {
    const s = calc('2 + 3 =')
    const frozen = JSON.stringify(s.state)
    step(s.state, { type: 'equals' })
    expect(JSON.stringify(s.state)).toBe(frozen)
  })
})
