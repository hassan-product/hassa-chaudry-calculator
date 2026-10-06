import { Fragment } from 'react'
import type { Spoken } from '../shared/view'
import styles from './Announcer.module.css'

// Draws each ≈ as its outlined chip so it can never be read as = (Decision 15). The characters
// are unchanged; only how ≈ is drawn differs.
export function Marked({ text }: { text: string }) {
  const parts = text.split('≈')
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span className={styles.approx}>≈</span>}
          {part}
        </Fragment>
      ))}
    </>
  )
}

// What is seen and what is heard, kept apart on purpose. The visible text is hidden from screen
// readers, which read ≈, − and superscripts inconsistently; the hidden text says them in words
// (Decision 15a). Merging the two would make VoiceOver read symbols, so keep both.
export function SpokenText({ value }: { value: Spoken }) {
  return (
    <>
      <span aria-hidden="true">
        <Marked text={value.text} />
      </span>
      <span className="sr-only">{value.spoken}</span>
    </>
  )
}
