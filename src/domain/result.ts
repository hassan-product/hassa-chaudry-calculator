import { ERROR_TEXT, type ErrorCode } from '../shared/messages'

// Errors are returned, never thrown (ADR 0005).
export type Result<T, E> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: E }

export type CalcError = { readonly code: ErrorCode; readonly message: string }

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value }
}

export function fail<E>(error: E): Result<never, E> {
  return { ok: false, error }
}

export function calcError(code: ErrorCode): CalcError {
  return { code, message: ERROR_TEXT[code] }
}
