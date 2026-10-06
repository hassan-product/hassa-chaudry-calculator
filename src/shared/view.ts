// What the readout shows, as display strings only. The UI never sees a value or an error object.
export type Readout = {
  // The figure, running result or result, with "≈ " in front when it has one, or the error text.
  readonly display: string
  readonly expression: string
  // "M 95" while memory holds a value, otherwise null.
  readonly memory: string | null
  readonly error: boolean
  // The operator just pressed while it waits for a figure, so the display can be heard as
  // "12 plus" rather than a bare "12" (Decision 14). Null at every other moment.
  // Spelled out rather than imported, because shared/ imports nothing (layer rule 6).
  readonly pendingOperator: '+' | '−' | '×' | '÷' | null
}
