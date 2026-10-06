import { useEffect } from 'react'
import type { Event } from '../domain/engine'

// Paste comes only from the browser's own paste command; there is no paste button (Decision 9).
// The page has no text field, so the paste event is taken on the window.
export function usePaste(dispatch: (event: Event) => void): void {
  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      e.preventDefault()
      dispatch({ type: 'paste', text: e.clipboardData?.getData('text/plain') ?? '' })
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [dispatch])
}
