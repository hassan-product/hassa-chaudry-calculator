import type { MouseEvent } from 'react'
import type { KeyId } from '../shared/keys'
import styles from './Keypad.module.css'

type Kind = 'memory' | 'digit' | 'control' | 'operator' | 'equals'

type KeyDef = {
  readonly id: KeyId
  // Named with words, so a screen reader says "divide", not "slash" (Decision 15a).
  readonly name: string
  readonly kind: Kind
  readonly legend?: string
  readonly tooltip?: string
}

// Six rows of four, in reading order (Decision 15). The DOM order is the Tab order.
const KEYS: readonly KeyDef[] = [
  { id: 'MC', name: 'memory clear', kind: 'memory' },
  { id: 'MR', name: 'memory recall', kind: 'memory' },
  { id: 'M−', name: 'memory minus', kind: 'memory' },
  { id: 'M+', name: 'memory plus', kind: 'memory' },
  { id: 'C', name: 'clear', kind: 'control', legend: 'Esc' },
  { id: 'CE', name: 'clear entry', kind: 'control', legend: 'Del' },
  { id: '⌫', name: 'backspace', kind: 'control', legend: 'Bksp' },
  { id: '÷', name: 'divide', kind: 'operator', legend: '/' },
  { id: '7', name: '7', kind: 'digit' },
  { id: '8', name: '8', kind: 'digit' },
  { id: '9', name: '9', kind: 'digit' },
  { id: '×', name: 'multiply', kind: 'operator', legend: '*' },
  { id: '4', name: '4', kind: 'digit' },
  { id: '5', name: '5', kind: 'digit' },
  { id: '6', name: '6', kind: 'digit' },
  { id: '−', name: 'minus', kind: 'operator', legend: '-' },
  { id: '1', name: '1', kind: 'digit' },
  { id: '2', name: '2', kind: 'digit' },
  { id: '3', name: '3', kind: 'digit' },
  { id: '+', name: 'plus', kind: 'operator', legend: '+' },
  { id: '+/−', name: 'change sign', kind: 'control', tooltip: 'Change sign' },
  { id: '0', name: '0', kind: 'digit' },
  { id: '.', name: 'decimal point', kind: 'digit' },
  { id: '=', name: 'equals', kind: 'equals', legend: 'Enter' },
]

export function Keypad({ onPress }: { onPress: (key: KeyId) => void }) {
  function click(e: MouseEvent<HTMLButtonElement>, id: KeyId) {
    // A mouse click or tap leaves no focus behind, so a following Enter means = rather than
    // pressing this key again (Decision 13). Keyboard activation has detail 0 and keeps focus.
    if (e.detail > 0) e.currentTarget.blur()
    onPress(id)
  }

  return (
    <div className={styles.keypad} role="group" aria-label="Keypad">
      {KEYS.map((k) => (
        <button
          key={k.id}
          type="button"
          aria-label={k.name}
          className={`${styles.key} ${styles[k.kind]}`}
          onClick={(e) => click(e, k.id)}
        >
          <span className={styles.label}>{k.id}</span>
          {/* Legends repeat the key's name as a keyboard hint, so they are hidden from screen readers. */}
          {k.legend && (
            <span className={styles.legend} aria-hidden="true">
              {k.legend}
            </span>
          )}
          {k.tooltip && (
            <span className={styles.tooltip} aria-hidden="true">
              {k.tooltip}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
