import { useEffect } from 'react'
import type { Event } from '../domain/engine'
import type { Digit } from '../shared/keys'

// The only file that knows key names (Decision 13). It turns a key into an engine event and
// nothing else; everything after that is the engine's business.

type KeyLike = Pick<KeyboardEvent, 'key' | 'code' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey'>

const OPERATORS: Readonly<Record<string, Event>> = {
  '+': { type: 'operator', operator: '+' },
  '-': { type: 'operator', operator: '−' },
  '*': { type: 'operator', operator: '×' },
  '/': { type: 'operator', operator: '÷' },
}

export function keyToEvent(e: KeyLike): Event | null {
  // Ctrl, Cmd and Alt belong to the browser, so its own shortcuts, paste included, still work.
  // Shift is allowed: * and + need it on many layouts and count as themselves.
  if (e.ctrlKey || e.metaKey || e.altKey) return null
  // The numpad point is the point whatever character the layout reports, so a keyboard set to
  // a decimal comma still types a point. With Num Lock off it reports Delete, which is followed.
  if (e.code === 'NumpadDecimal' && (e.key === '.' || e.key === ',')) return { type: 'decimal' }
  if (/^[0-9]$/.test(e.key)) return { type: 'digit', digit: e.key as Digit }
  const operator = OPERATORS[e.key]
  if (operator) return operator
  switch (e.key) {
    case '.':
      return { type: 'decimal' }
    case 'Enter': // main and numpad Enter both report Enter
    case '=': // includes the Apple numpad =
      return { type: 'equals' }
    case 'Escape':
    case 'Clear': // the Apple numpad Clear key
      return { type: 'clear' }
    case 'Delete':
      return { type: 'clearEntry' }
    case 'Backspace':
      return { type: 'backspace' }
    default:
      // Everything else, including navigation keys sent by a numpad with Num Lock off.
      return null
  }
}

export type TapeAction = 'previous' | 'next' | 'recall'

// Keys inside the tape: Up and Down move between lines, Enter or Space recalls, and Left and
// Right do nothing (Decision 10).
export function tapeKey(key: string): TapeAction | null {
  switch (key) {
    case 'ArrowUp':
      return 'previous'
    case 'ArrowDown':
      return 'next'
    case 'Enter':
    case ' ':
      return 'recall'
    default:
      return null
  }
}

function focusedControl(): HTMLElement | null {
  const el = document.activeElement
  return el instanceof HTMLElement && el !== document.body ? el : null
}

export function useKeyboard(dispatch: (event: Event) => void, onAnyKey: () => void): void {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      onAnyKey()
      if (e.defaultPrevented || e.isComposing) return
      const focused = focusedControl()
      // Enter and Space activate whatever control has focus, a keypad key included; only with
      // nothing focused is Enter the = key (Decision 13).
      if (focused && (e.key === 'Enter' || e.key === ' ')) return
      const event = keyToEvent(e)
      if (!event) return
      // Stops the browser acting on the key as well: Firefox's quick find on /, Backspace
      // navigating back in older browsers, Enter activating something.
      e.preventDefault()
      // Typing a calculator key moves focus off a focused control, so the next Enter means =.
      focused?.blur()
      dispatch(event)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dispatch, onAnyKey])
}
