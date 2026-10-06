import { useCallback, useMemo, useState } from 'react'
import { initial, readout, step, type Engine, type Event } from '../domain/engine'
import { lineText } from '../domain/tape'
import type { KeyId } from '../shared/keys'
import { FAULT_TEXT, NOTICE_TEXT, type NoticeCode } from '../shared/messages'
import type { Spoken, ViewModel } from '../shared/view'

export type Model = {
  readonly engine: Engine
  // A refusal message, shown until the next input (Decision 12).
  readonly notice: NoticeCode | null
  // A bug threw despite the error model (Decision 8). The engine state is kept so the tape and
  // memory survive; only C and Escape act until it is left.
  readonly fault: boolean
}

export const INITIAL_MODEL: Model = { engine: initial, notice: null, fault: false }

type Step = typeof step

// Leaving the fault resets the calculation and keeps the tape and memory. If even clearing
// throws, the engine is rebuilt from its initial state around them, so no reload is ever needed.
function leaveFault(m: Model, run: Step): Model {
  try {
    return { engine: run(m.engine, { type: 'clear' }).state, notice: null, fault: false }
  } catch {
    return { engine: { ...initial, memory: m.engine.memory, tape: m.engine.tape }, notice: null, fault: false }
  }
}

// One input. The engine is pure and is not meant to throw; if it does, that is the fault, caught
// here so the state holding the tape and memory is never lost. `run` is replaceable for tests.
export function next(m: Model, event: Event, run: Step = step): Model {
  if (m.fault) return event.type === 'clear' ? leaveFault(m, run) : m
  try {
    const out = run(m.engine, event)
    return { engine: out.state, notice: out.notice ?? null, fault: false }
  } catch {
    return { ...m, notice: null, fault: true }
  }
}

const OPERATOR_EVENT = { '÷': '÷', '×': '×', '−': '−', '+': '+' } as const

export function keyEvent(key: KeyId): Event {
  switch (key) {
    case 'MC':
      return { type: 'memoryClear' }
    case 'MR':
      return { type: 'memoryRecall' }
    case 'M−':
      return { type: 'memoryMinus' }
    case 'M+':
      return { type: 'memoryPlus' }
    case 'C':
      return { type: 'clear' }
    case 'CE':
      return { type: 'clearEntry' }
    case '⌫':
      return { type: 'backspace' }
    case '+/−':
      return { type: 'signToggle' }
    case '=':
      return { type: 'equals' }
    case '.':
      return { type: 'decimal' }
    case '÷':
    case '×':
    case '−':
    case '+':
      return { type: 'operator', operator: OPERATOR_EVENT[key] }
    default:
      return { type: 'digit', digit: key }
  }
}

const SUPERSCRIPT_DIGITS: Readonly<Record<string, string>> = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': 'minus ',
}

const OPERATOR_WORD: Readonly<Record<string, string>> = { '+': 'plus', '−': 'minus', '×': 'times', '÷': 'divided by' }

// The spoken forms of Decision 15a. Screen readers read ≈, − and superscripts inconsistently
// or not at all, so the words are written out rather than left to each reader.
export function speak(text: string): string {
  return text
    .replace(/× 10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (_, power: string) =>
      `times 10 to the power ${[...power].map((c) => SUPERSCRIPT_DIGITS[c] ?? c).join('')}`)
    .replace(/M\+/g, 'memory plus')
    .replace(/M−/g, 'memory minus')
    .replace(/≈/g, ' approximately ')
    .replace(/→/g, ' then ')
    .replace(/=/g, ' equals ')
    .replace(/[+−×÷]/g, (op) => ` ${OPERATOR_WORD[op] ?? op} `)
    .replace(/\s+/g, ' ')
    .trim()
}

const spoken = (text: string): Spoken => ({ text, spoken: speak(text) })

export function toView(m: Model): ViewModel {
  const r = readout(m.engine)
  const tape = m.engine.tape.map((line) => ({
    kind: line.kind,
    working: line.working,
    result: line.result,
    approx: line.approx,
    spoken: speak(lineText(line)),
  }))
  const memory = r.memory === null ? null : { text: r.memory, spoken: speak(r.memory.replace(/^M /, 'memory ')) }
  if (m.fault) {
    return {
      display: { text: FAULT_TEXT, spoken: FAULT_TEXT },
      expression: spoken(''),
      message: null,
      memory,
      error: true,
      fault: true,
      tape,
    }
  }
  const waiting = r.pendingOperator ? ` ${OPERATOR_WORD[r.pendingOperator] ?? ''}` : ''
  return {
    display: { text: r.display, spoken: speak(r.display) + waiting },
    expression: spoken(r.expression),
    message: m.notice ? spoken(NOTICE_TEXT[m.notice]) : null,
    memory,
    error: r.error,
    fault: false,
    tape,
  }
}

export function useCalculator() {
  const [model, setModel] = useState<Model>(INITIAL_MODEL)

  const dispatch = useCallback((event: Event) => setModel((m) => next(m, event)), [])
  const press = useCallback((key: KeyId) => dispatch(keyEvent(key)), [dispatch])
  const recall = useCallback((line: number) => dispatch({ type: 'recall', line }), [dispatch])
  const emptyTape = useCallback(() => dispatch({ type: 'emptyTape' }), [dispatch])
  // Any key press, click or paste dismisses a message, even one the calculator ignores (Decision 12).
  const dismissMessage = useCallback(() => setModel((m) => (m.notice ? { ...m, notice: null } : m)), [])
  // For a render failure caught by the error boundary in ui/App.
  const reportFault = useCallback(() => setModel((m) => ({ ...m, notice: null, fault: true })), [])

  const view = useMemo(() => toView(model), [model])
  return { view, dispatch, press, recall, emptyTape, dismissMessage, reportFault }
}
