import styles from './TapeToggle.module.css'

// At 900px and below the tape sits behind this toggle, closed by default (Decision 15).
export function TapeToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-expanded={open}
      {...(open ? { 'aria-controls': 'tape' } : {})}
      onClick={onToggle}
    >
      {open ? 'Hide tape' : 'Show tape'}
    </button>
  )
}
