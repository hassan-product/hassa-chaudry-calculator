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

// Text as it is shown, and as a screen reader should say it (Decision 15a spoken forms).
// The UI shows `text` with ≈ drawn as its chip and gives `spoken` to assistive technology.
export type Spoken = { readonly text: string; readonly spoken: string }

export type TapeLineView = {
  readonly kind: 'calculation' | 'memory'
  readonly working: string
  readonly result: string
  readonly approx: boolean
  readonly spoken: string
}

// Everything the screen needs, as strings. No value, Decimal or Error object reaches the UI.
export type ViewModel = {
  readonly display: Spoken
  readonly expression: Spoken
  readonly message: Spoken | null
  readonly memory: Spoken | null
  // An error or the fault: the display uses the error colour and its long size.
  readonly error: boolean
  readonly fault: boolean
  readonly tape: readonly TapeLineView[]
}
