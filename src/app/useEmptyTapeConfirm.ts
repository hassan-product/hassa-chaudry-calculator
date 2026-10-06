import { useCallback, useEffect, useRef, useState } from 'react'

// Emptying the tape cannot be undone, so it takes two presses with no dialog (Decision 11).
// The first only relabels the control. It reverts when focus leaves or any other key is pressed,
// and never on a timer, so nobody is rushed.
export function useEmptyTapeConfirm(lines: number, emptyTape: () => void) {
  const [armed, setArmed] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const reset = useCallback(() => setArmed(false), [])

  const press = useCallback(() => {
    if (lines === 0) return
    if (!armed) {
      setArmed(true)
      return
    }
    setArmed(false)
    emptyTape()
  }, [armed, emptyTape, lines])

  useEffect(() => {
    if (!armed) return
    // Enter or Space on the control itself is its second press, so only keys aimed elsewhere revert.
    function onKeyDown(e: KeyboardEvent) {
      if (e.target !== buttonRef.current) setArmed(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [armed])

  if (armed && lines === 0) setArmed(false)

  return { armed, label: armed ? 'Press again to empty' : 'Empty tape', press, reset, buttonRef }
}
