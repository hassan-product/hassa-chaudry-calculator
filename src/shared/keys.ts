// The four operators, written with the characters the screen shows.
export type Operator = '+' | '−' | '×' | '÷'

export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type MemoryKey = 'M+' | 'M−'

// The 24 on-screen keys, by the label each shows (Decision 15). The UI reports these; the app
// turns them into engine events, so the UI never needs to know the engine.
export type KeyId =
  | 'MC' | 'MR' | 'M−' | 'M+'
  | 'C' | 'CE' | '⌫' | '÷'
  | '7' | '8' | '9' | '×'
  | '4' | '5' | '6' | '−'
  | '1' | '2' | '3' | '+'
  | '+/−' | '0' | '.' | '='
