import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from 'react'
import { tapeKey } from '../app/useKeyboard'
import type { TapeLineView } from '../shared/view'
import { Marked } from './Announcer'
import styles from './Tape.module.css'

type Confirm = {
  readonly armed: boolean
  readonly label: string
  readonly press: () => void
  readonly reset: () => void
  readonly buttonRef: RefObject<HTMLButtonElement | null>
}

type Props = {
  readonly lines: readonly TapeLineView[]
  readonly onRecall: (line: number) => void
  readonly confirm: Confirm
  readonly stacked: boolean
}

// Results go in their own column aligned on the point, so the whole part and the rest are split.
function splitAtPoint(result: string): [string, string] {
  const point = result.indexOf('.')
  return point === -1 ? [result, ''] : [result.slice(0, point), result.slice(point)]
}

export function Tape({ lines, onRecall, confirm, stacked }: Props) {
  const [active, setActive] = useState(lines.length - 1)
  const items = useRef<(HTMLLIElement | null)[]>([])
  const seen = useRef(lines.length)

  // A new line becomes the one Tab lands on and is scrolled into view (Decision 15a).
  useEffect(() => {
    if (lines.length > seen.current) {
      setActive(lines.length - 1)
      items.current[lines.length - 1]?.scrollIntoView?.({ block: 'nearest' })
    }
    seen.current = lines.length
  }, [lines.length])

  const current = active >= 0 && active < lines.length ? active : lines.length - 1

  function onKeyDown(e: KeyboardEvent<HTMLLIElement>, i: number) {
    const action = tapeKey(e.key)
    if (!action) return
    e.preventDefault()
    if (action === 'recall') {
      onRecall(i)
      return
    }
    const j = action === 'previous' ? i - 1 : i + 1
    if (j < 0 || j >= lines.length) return
    setActive(j)
    items.current[j]?.focus()
  }

  return (
    <section className={`${styles.tape} ${stacked ? styles.stacked : ''}`} aria-label="Tape" id="tape">
      {lines.length === 0 ? (
        // An empty tape shows only this line: no heading and no control (Decision 15).
        <p className={styles.empty}>Finished calculations appear here</p>
      ) : (
        <>
          <div className={styles.head}>
            <h2>Tape</h2>
            <button
              ref={confirm.buttonRef}
              type="button"
              className={`${styles.emptyControl} ${confirm.armed ? styles.armed : ''}`}
              onClick={confirm.press}
              onBlur={confirm.reset}
            >
              {confirm.label}
            </button>
          </div>
          {/* role="list" is explicit because Safari drops list semantics once list styling is
              removed (Decision 11). One Tab stop: only the current line is tabbable, and Up and
              Down move between lines. */}
          <ol role="list" className={styles.list}>
            {lines.map((line, i) => {
              const [whole, rest] = splitAtPoint(line.result)
              return (
                <li
                  key={i}
                  ref={(el) => {
                    items.current[i] = el
                  }}
                  tabIndex={i === current ? 0 : -1}
                  className={`${styles.line} ${line.kind === 'memory' ? styles.memoryLine : ''}`}
                  onClick={() => onRecall(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  onFocus={() => setActive(i)}
                >
                  <span className={styles.no} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className={styles.work} aria-hidden="true">
                    <Marked text={line.working} />
                  </span>
                  <span className={styles.eq} aria-hidden="true">
                    {line.kind === 'calculation' ? '=' : ''}
                  </span>
                  <span className={styles.ap} aria-hidden="true">
                    {line.approx ? <Marked text="≈" /> : ''}
                  </span>
                  <span className={styles.int} aria-hidden="true">
                    {whole}
                  </span>
                  <span className={styles.frac} aria-hidden="true">
                    {rest}
                  </span>
                  <span className="sr-only">{line.spoken}</span>
                </li>
              )
            })}
          </ol>
        </>
      )}
    </section>
  )
}
