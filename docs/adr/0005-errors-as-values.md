# 0005. Errors as values, not exceptions

- **Status:** Accepted
- **Date:** 2026-10-06

## Context
Three conditions stop a calculation: divide by zero, a result of 1e100 or more, and a non-zero result below 1e-99. Each must leave the calculator in one error state with defined ways out, and must never write a tape line. Separately, refusals ("15 digits maximum" and the paste refusals) must show a message *without* entering the error state. The UI must never be able to show a raw exception.

## Decision
- Domain functions return `Result<T, CalcError>`. A `CalcError` has a code and a message for a person, taken from one table in `shared/messages.ts`.
- A failed step becomes the engine's `error` state.
- Notices are a separate `NoticeCode` union, returned next to an unchanged state, never as a state.
- No domain function throws, and nothing crosses a layer boundary by `throw`. The UI receives only display strings.

## Alternatives rejected
- **Throw exceptions and catch them in the UI or an error boundary.** This is familiar and needs less plumbing. It was rejected because a thrown error is invisible in function types, so a missed `catch` is a crash rather than a type error. It would also make it too easy to render `err.message` directly, and to treat a refusal as an error.

## Consequences
- The type checker forces every caller to handle failure. Errors and notices cannot be confused, because they are different types.
- **Cost:** every arithmetic call site unwraps a `Result`, which is wordier than a `try` around a block.
- **Cost:** decimal.js itself throws on malformed strings. The domain has to validate before constructing a `Decimal`, and `domain/decimal.ts` is the one place that has to get this right.
- **Cost:** a genuine bug can still throw. What the person sees then is not decided (gap G-5 in `architecture.md`).
