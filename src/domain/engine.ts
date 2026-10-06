import type { Digit, MemoryKey, Operator } from '../shared/keys'
import type { NoticeCode } from '../shared/messages'
import type { Readout } from '../shared/view'
import { operate } from './arithmetic'
import { isZero } from './decimal'
import { deleteLast, EMPTY_ENTRY, toggleSign, typeDigit, typePoint, type Entry } from './entry'
import { formatEntry, show } from './format'
import { changeMemory, type Memory } from './memory'
import { parsePaste } from './paste'
import type { CalcError } from './result'
import { calculationLine, memoryLine, type Step, type TapeLine } from './tape'
import { isMarked, negated, value, ZERO, type Value } from './value'

// The calculator as a pure reducer: step(state, event) → { state, notice? }. No side effects,
// no dates, no randomness, no DOM. The states are the ones in the state diagram in
// docs/architecture.md, as a discriminated union: every switch on calc.kind below lists all six
// with no default, so adding a state fails the type check until each transition handles it.

// An operator waiting for its second figure, applied to the running result so far.
type Pending = { readonly acc: Value; readonly op: Operator }

// Steps already done in this calculation, for its tape line.
type Chain = readonly Step[]

export type Calc =
  | { readonly kind: 'ready' }
  | { readonly kind: 'entering'; readonly entry: Entry; readonly pending: Pending | null; readonly chain: Chain }
  | { readonly kind: 'recalled'; readonly value: Value; readonly pending: Pending | null; readonly chain: Chain }
  | { readonly kind: 'pending'; readonly pending: Pending; readonly chain: Chain }
  | { readonly kind: 'result'; readonly value: Value; readonly last: Step }
  | { readonly kind: 'error'; readonly error: CalcError; readonly failed: string }

export type Engine = {
  readonly calc: Calc
  readonly memory: Memory
  // Append-only: lines are added, never changed. The one exception is emptyTape, which
  // removes them all (Decision 11).
  readonly tape: readonly TapeLine[]
}

// Semantic events only. Key codes stop at the UI boundary.
export type Event =
  | { readonly type: 'digit'; readonly digit: Digit }
  | { readonly type: 'decimal' }
  | { readonly type: 'operator'; readonly operator: Operator }
  | { readonly type: 'equals' }
  | { readonly type: 'clear' }
  | { readonly type: 'clearEntry' }
  | { readonly type: 'backspace' }
  | { readonly type: 'signToggle' }
  | { readonly type: 'paste'; readonly text: string }
  | { readonly type: 'recall'; readonly line: number }
  | { readonly type: 'memoryPlus' }
  | { readonly type: 'memoryMinus' }
  | { readonly type: 'memoryRecall' }
  | { readonly type: 'memoryClear' }
  | { readonly type: 'emptyTape' }

export type StepOutput = { readonly state: Engine; readonly notice?: NoticeCode }

const READY: Calc = { kind: 'ready' }

export const initial: Engine = { calc: READY, memory: null, tape: [] }

const unchanged = (state: Engine): StepOutput => ({ state })
const withCalc = (state: Engine, calc: Calc): StepOutput => ({ state: { ...state, calc } })

function entryValue(e: Entry): Value {
  return value((e.negative ? '-' : '') + e.text)
}

// Where a new figure lands (Decision 10): with the operator waiting for it, or, after a result,
// at the start or in an error, as the first figure of a new calculation.
function landing(calc: Calc): { pending: Pending | null; chain: Chain } {
  switch (calc.kind) {
    case 'entering':
    case 'recalled':
    case 'pending':
      return { pending: calc.pending, chain: calc.chain }
    case 'ready':
    case 'result':
    case 'error':
      return { pending: null, chain: [] }
  }
}

function enter(state: Engine, entry: Entry): StepOutput {
  return withCalc(state, { kind: 'entering', entry, ...landing(state.calc) })
}

function recallValue(state: Engine, recalled: Value): StepOutput {
  return withCalc(state, { kind: 'recalled', value: recalled, ...landing(state.calc) })
}

// Each operation runs as entered (Decision 4). A step that fails becomes the error state with
// the failed step on the expression line, ending with the key that triggered it (Decision 15a).
function compute(state: Engine, pending: Pending, right: Value, chain: Chain, trigger: Operator | '='): StepOutput {
  const r = operate(pending.acc, pending.op, right)
  if (!r.ok) {
    const failed = `${show(pending.acc)} ${pending.op} ${show(right)} ${trigger}`
    return withCalc(state, { kind: 'error', error: r.error, failed })
  }
  const done: Step = { left: pending.acc, op: pending.op, right, result: r.value }
  if (trigger !== '=') {
    return withCalc(state, { kind: 'pending', pending: { acc: r.value, op: trigger }, chain: [...chain, done] })
  }
  const [first = done, ...rest] = [...chain, done]
  return {
    state: {
      ...state,
      calc: { kind: 'result', value: r.value, last: done },
      tape: [...state.tape, calculationLine(first, rest)],
    },
  }
}

function typed(state: Engine, next: Entry | 'DIGIT_LIMIT'): StepOutput {
  const { calc } = state
  if (next === 'DIGIT_LIMIT') return { state, notice: 'DIGIT_LIMIT' }
  if (calc.kind === 'entering') {
    return next === calc.entry ? unchanged(state) : withCalc(state, { ...calc, entry: next })
  }
  return enter(state, next)
}

function digit(state: Engine, d: Digit): StepOutput {
  const { calc } = state
  return typed(state, typeDigit(calc.kind === 'entering' ? calc.entry : EMPTY_ENTRY, d))
}

function decimal(state: Engine): StepOutput {
  const { calc } = state
  return typed(state, typePoint(calc.kind === 'entering' ? calc.entry : EMPTY_ENTRY))
}

function operator(state: Engine, op: Operator): StepOutput {
  const { calc } = state
  switch (calc.kind) {
    case 'ready':
      return withCalc(state, { kind: 'pending', pending: { acc: ZERO, op }, chain: [] })
    case 'entering':
    case 'recalled': {
      const figure = calc.kind === 'entering' ? entryValue(calc.entry) : calc.value
      if (!calc.pending) return withCalc(state, { kind: 'pending', pending: { acc: figure, op }, chain: [] })
      return compute(state, calc.pending, figure, calc.chain, op)
    }
    case 'pending':
      // A second operator replaces the first (Decision 6, AC-4.3).
      return withCalc(state, { ...calc, pending: { ...calc.pending, op } })
    case 'result':
      // Continues from the result, on a line of its own (Decision 7, AC-8.2).
      return withCalc(state, { kind: 'pending', pending: { acc: calc.value, op }, chain: [] })
    case 'error':
      return unchanged(state)
  }
}

function equals(state: Engine): StepOutput {
  const { calc } = state
  switch (calc.kind) {
    case 'entering':
    case 'recalled': {
      // = with no operator does nothing; we never guess a second figure (Decision 7, AC-4.6).
      if (!calc.pending) return unchanged(state)
      const figure = calc.kind === 'entering' ? entryValue(calc.entry) : calc.value
      return compute(state, calc.pending, figure, calc.chain, '=')
    }
    case 'result':
      // Repeated = repeats the last operation on the result showing (Decision 7, AC-8.1).
      return compute(state, { acc: calc.value, op: calc.last.op }, calc.last.right, [], '=')
    case 'ready':
    case 'pending':
    case 'error':
      return unchanged(state)
  }
}

function clear(state: Engine): StepOutput {
  return state.calc.kind === 'ready' ? unchanged(state) : withCalc(state, READY)
}

function clearEntry(state: Engine): StepOutput {
  const { calc } = state
  switch (calc.kind) {
    case 'entering':
      return typed(state, EMPTY_ENTRY)
    case 'recalled':
      // Gives an ordinary typed 0 and keeps the pending operator (Decision 6).
      return withCalc(state, { kind: 'entering', entry: EMPTY_ENTRY, pending: calc.pending, chain: calc.chain })
    case 'result':
    case 'error':
      return withCalc(state, READY)
    case 'ready':
    case 'pending':
      return unchanged(state)
  }
}

function backspace(state: Engine): StepOutput {
  const { calc } = state
  // Only the figure being typed can be edited; a figure already followed by an operator has
  // been folded into the running result (S-7 limit, AC-7.7). S-16 is the story that closes this.
  return calc.kind === 'entering' ? typed(state, deleteLast(calc.entry)) : unchanged(state)
}

function signToggle(state: Engine): StepOutput {
  const { calc } = state
  switch (calc.kind) {
    case 'entering':
      return typed(state, toggleSign(calc.entry))
    case 'recalled':
    case 'result':
      // Keeps ≈ and writes no line; zero has no sign to flip (Decision 7, AC-8.7).
      return isZero(calc.value.amount) ? unchanged(state) : withCalc(state, { ...calc, value: negated(calc.value) })
    case 'ready':
    case 'pending':
    case 'error':
      return unchanged(state)
  }
}

function paste(state: Engine, text: string): StepOutput {
  const parsed = parsePaste(text)
  // A refused paste leaves everything as it was, an error included (Decision 9, AC-11.17).
  return parsed.ok ? enter(state, parsed.value) : { state, notice: parsed.error }
}

// Recall brings back the line's full 34-digit value with its ≈ (Decision 10).
function recall(state: Engine, index: number): StepOutput {
  const line = state.tape[index]
  return line ? recallValue(state, { amount: line.value.amount, approx: line.approx }) : unchanged(state)
}

// The value showing, which M+ and M− act on (Decision 19). There is none in an error.
function showing(calc: Calc): Value | null {
  switch (calc.kind) {
    case 'ready':
      return ZERO
    case 'entering':
      return entryValue(calc.entry)
    case 'recalled':
    case 'result':
      return calc.value
    case 'pending':
      return calc.pending.acc
    case 'error':
      return null
  }
}

// M+ and M− leave the calculation as it is and write a memory line. A total out of range is
// the usual error, with memory unchanged and no line (Decision 19).
function memoryKey(state: Engine, key: MemoryKey): StepOutput {
  const added = showing(state.calc)
  if (!added) return unchanged(state)
  const total = changeMemory(state.memory, key, added)
  if (!total.ok) return withCalc(state, { kind: 'error', error: total.error, failed: `${key} ${show(added)}` })
  return { state: { ...state, memory: total.value, tape: [...state.tape, memoryLine(key, added, total.value)] } }
}

function memoryRecall(state: Engine): StepOutput {
  const m = state.memory
  return m ? recallValue(state, { amount: m.amount, approx: isMarked(m) }) : unchanged(state)
}

// MC works in every state, an error included, and writes no line (Decision 19, AC-9.6).
function memoryClear(state: Engine): StepOutput {
  return state.memory ? { state: { ...state, memory: null } } : unchanged(state)
}

// Empties the tape and nothing else: memory stays, and so does an error (Decision 11, AC-14.7).
// The first press that only relabels the button belongs to the app, not here.
function emptyTape(state: Engine): StepOutput {
  return state.tape.length === 0 ? unchanged(state) : { state: { ...state, tape: [] } }
}

export function step(state: Engine, event: Event): StepOutput {
  switch (event.type) {
    case 'digit':
      return digit(state, event.digit)
    case 'decimal':
      return decimal(state)
    case 'operator':
      return operator(state, event.operator)
    case 'equals':
      return equals(state)
    case 'clear':
      return clear(state)
    case 'clearEntry':
      return clearEntry(state)
    case 'backspace':
      return backspace(state)
    case 'signToggle':
      return signToggle(state)
    case 'paste':
      return paste(state, event.text)
    case 'recall':
      return recall(state, event.line)
    case 'memoryPlus':
      return memoryKey(state, 'M+')
    case 'memoryMinus':
      return memoryKey(state, 'M−')
    case 'memoryRecall':
      return memoryRecall(state)
    case 'memoryClear':
      return memoryClear(state)
    case 'emptyTape':
      return emptyTape(state)
  }
}

function display(calc: Calc): string {
  switch (calc.kind) {
    case 'ready':
      return '0'
    case 'entering':
      return formatEntry(calc.entry)
    case 'recalled':
    case 'result':
      return show(calc.value)
    case 'pending':
      // With an operator pending, the display shows the running result (Decision 15a).
      return show(calc.pending.acc)
    case 'error':
      return calc.error.message
  }
}

function expression(calc: Calc): string {
  switch (calc.kind) {
    case 'ready':
      return ''
    case 'entering':
    case 'recalled':
    case 'pending':
      // The running result and its operator, so the order operations run in shows (Decision 4).
      return calc.pending ? `${show(calc.pending.acc)} ${calc.pending.op}` : ''
    case 'result':
      return `${show(calc.last.left)} ${calc.last.op} ${show(calc.last.right)} =`
    case 'error':
      return calc.failed
  }
}

export function readout(state: Engine): Readout {
  return {
    display: display(state.calc),
    expression: expression(state.calc),
    memory: state.memory ? `M ${show(state.memory)}` : null,
    error: state.calc.kind === 'error',
    pendingOperator: state.calc.kind === 'pending' ? state.calc.pending.op : null,
  }
}
