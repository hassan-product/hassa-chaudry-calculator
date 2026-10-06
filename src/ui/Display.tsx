import type { ViewModel } from '../shared/view'
import { SpokenText } from './Announcer'
import styles from './Display.module.css'

// The display steps down by length but never below the long size, which is still larger than
// the key labels; past that it wraps (Decision 15a).
function sizeClass(view: ViewModel): string | undefined {
  if (view.error) return styles.long
  const n = view.display.text.length
  return n <= 12 ? styles.short : n <= 18 ? styles.medium : styles.long
}

export function Display({ view }: { view: ViewModel }) {
  return (
    <div className={styles.readout}>
      <div className={styles.topRow}>
        {/* Announced as "memory" and its total whenever it appears or changes (Decision 14). */}
        <span className={styles.memory} aria-live="polite">
          {view.memory && <SpokenText value={view.memory} />}
        </span>
        {/* Deliberately not live: the display announces each change, and both would double it. */}
        <span className={styles.expression}>
          <SpokenText value={view.expression} />
        </span>
      </div>
      {/* The one region that announces figures, results and errors, politely (Decision 14). */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={[styles.display, sizeClass(view), view.error ? styles.error : ''].join(' ')}
      >
        <SpokenText value={view.display} />
      </div>
      {/* Messages are announced like a result, and keep their reserved height when empty. */}
      <div className={styles.message} aria-live="polite">
        {view.message && (
          <>
            <span className={styles.bar} aria-hidden="true" />
            <span>
              <SpokenText value={view.message} />
            </span>
          </>
        )}
      </div>
    </div>
  )
}
