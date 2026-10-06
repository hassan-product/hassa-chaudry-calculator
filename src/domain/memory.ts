import type { MemoryKey } from '../shared/keys'
import { operate } from './arithmetic'
import type { CalcError, Result } from './result'
import { ZERO, type Value } from './value'

// Memory is empty (null) or one running total. A total of 0 is still a total, so the
// M indicator shows M 0 until MC (Decision 19, AC-19.9).
export type Memory = Value | null

// M+ and M− use the same arithmetic as a calculation, so the total keeps any ≈ it is given
// until MC, and a total out of range is the usual error with memory left unchanged.
export function changeMemory(memory: Memory, key: MemoryKey, added: Value): Result<Value, CalcError> {
  return operate(memory ?? ZERO, key === 'M+' ? '+' : '−', added)
}
