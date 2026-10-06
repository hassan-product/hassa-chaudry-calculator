import type { Operator } from '../shared/keys'
import { add, divide, isZero, multiply, subtract, type Dec, type Exacting } from './decimal'
import { calcError, fail, ok, type CalcError, type Result } from './result'
import { isMarked, rangeError, type Value } from './value'

function apply(a: Dec, op: Operator, b: Dec): Exacting {
  switch (op) {
    case '+':
      return add(a, b)
    case '−':
      return subtract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      return divide(a, b)
  }
}

// One step of a calculation. The result carries ≈ if either operand showed it or this step
// was rounded, so ≈ runs through the rest of the calculation (Decision 3).
export function operate(left: Value, op: Operator, right: Value): Result<Value, CalcError> {
  if (op === '÷' && isZero(right.amount)) return fail(calcError('DIVIDE_BY_ZERO'))
  const step = apply(left.amount, op, right.amount)
  const range = rangeError(step.value)
  if (range) return fail(calcError(range))
  return ok({ amount: step.value, approx: isMarked(left) || isMarked(right) || !step.exact })
}
