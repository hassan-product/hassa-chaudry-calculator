import type { MemoryKey, Operator } from '../shared/keys'
import { formatValue, show } from './format'
import { isMarked, type Value } from './value'

// One finished step of a calculation: left op right = result.
export type Step = {
  readonly left: Value
  readonly op: Operator
  readonly right: Value
  readonly result: Value
}

// A tape line keeps its working and its result apart, so the tape can put results in their own
// column aligned on the point, with ≈ in a column of its own (Decision 15).
export type TapeLine = {
  readonly kind: 'calculation' | 'memory'
  readonly working: string
  readonly result: string
  readonly approx: boolean
  // What recalling the line brings back: the final result, or the memory total (Decision 19).
  readonly value: Value
}

function resultOf(v: Value): { result: string; approx: boolean } {
  const f = formatValue(v)
  return f.ok ? { result: f.value.text, approx: f.value.approx } : { result: show(v), approx: isMarked(v) }
}

// Every step with its running result: 2 + 3 = 5 → × 4 = 20 (Decision 11, AC-12.1).
export function calculationLine(first: Step, rest: readonly Step[]): TapeLine {
  let working = `${show(first.left)} ${first.op} ${show(first.right)}`
  let last = first
  for (const s of rest) {
    working += ` = ${show(last.result)} → ${s.op} ${show(s.right)}`
    last = s
  }
  return { kind: 'calculation', working, ...resultOf(last.result), value: last.result }
}

// A quiet line with no =: M+ 40, memory 95 (Decision 19, AC-12.4).
export function memoryLine(key: MemoryKey, added: Value, total: Value): TapeLine {
  return { kind: 'memory', working: `${key} ${show(added)}, memory`, ...resultOf(total), value: total }
}

export function lineText(line: TapeLine): string {
  const result = line.approx ? `≈ ${line.result}` : line.result
  return line.kind === 'calculation' ? `${line.working} = ${result}` : `${line.working} ${result}`
}
