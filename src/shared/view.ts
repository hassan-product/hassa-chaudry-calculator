// What the readout shows, as display strings only. The UI never sees a value or an error object.
export type Readout = {
  // The figure, running result or result, with "≈ " in front when it has one, or the error text.
  readonly display: string
  readonly expression: string
  // "M 95" while memory holds a value, otherwise null.
  readonly memory: string | null
  readonly error: boolean
}
