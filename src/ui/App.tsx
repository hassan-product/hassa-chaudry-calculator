import { Component, StrictMode, useCallback, useEffect, useState, type ReactNode } from 'react'
import { useCalculator } from '../app/useCalculator'
import { useEmptyTapeConfirm } from '../app/useEmptyTapeConfirm'
import { useKeyboard } from '../app/useKeyboard'
import { usePaste } from '../app/usePaste'
import type { KeyId } from '../shared/keys'
import type { ViewModel } from '../shared/view'
import styles from './App.module.css'
import { Display } from './Display'
import { Keypad } from './Keypad'
import { Tape } from './Tape'
import { TapeToggle } from './TapeToggle'
import './tokens.css'

const NARROW = '(max-width: 900px)'

// The layout switch is made in script as well as CSS so that the tape is rendered where it is
// seen. At 900px and below it sits between the readout and the keypad, and putting it there in
// the DOM keeps the Tab and screen-reader order the same as the visual order (Decision 15).
function useNarrow(): boolean {
  const query = () => (typeof window.matchMedia === 'function' ? window.matchMedia(NARROW) : null)
  const [narrow, setNarrow] = useState(() => query()?.matches ?? false)
  useEffect(() => {
    const mq = query()
    if (!mq) return
    const update = () => setNarrow(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return narrow
}

type BoundaryProps = { readonly onFault?: () => void; readonly children: ReactNode }

// For a render failure the code is not meant to have. It switches the app to the fault, which
// the app hook then shows; it never shows a raw error (Decision 8).
export class FaultBoundary extends Component<BoundaryProps, { failed: boolean }> {
  override state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  override componentDidCatch() {
    this.props.onFault?.()
  }

  override render() {
    return this.state.failed ? null : this.props.children
  }
}

type ScreenProps = {
  readonly view: ViewModel
  readonly narrow: boolean
  readonly press: (key: KeyId) => void
  readonly recall: (line: number) => void
  readonly confirm: ReturnType<typeof useEmptyTapeConfirm>
  readonly onAnyPointer: () => void
}

function Screen({ view, narrow, press, recall, confirm, onAnyPointer }: ScreenProps) {
  const [tapeOpen, setTapeOpen] = useState(false)
  const tape = <Tape lines={view.tape} onRecall={recall} confirm={confirm} stacked={narrow} />
  // In the fault the tape is shown only if it can be; if drawing it is what failed, it is left out.
  const guardedTape = view.fault ? <FaultBoundary>{tape}</FaultBoundary> : tape

  return (
    <main className={styles.layout} onPointerDown={onAnyPointer}>
      <h1 className="sr-only">Calculator</h1>
      <section className={styles.calc} aria-label="Calculator">
        <Display view={view} />
        {narrow && <TapeToggle open={tapeOpen} onToggle={() => setTapeOpen((o) => !o)} />}
        {narrow && tapeOpen && guardedTape}
        <Keypad onPress={press} />
      </section>
      {!narrow && <div className={styles.tapeColumn}>{guardedTape}</div>}
    </main>
  )
}

export function App() {
  const calc = useCalculator()
  const confirm = useEmptyTapeConfirm(calc.view.tape.length, calc.emptyTape, calc.view.fault)
  const narrow = useNarrow()
  useKeyboard(calc.dispatch, calc.dismissMessage)
  usePaste(calc.dispatch)

  const { reset } = confirm
  // Any other key reverts a waiting empty-tape control, on-screen keys included (Decision 11).
  const press = useCallback(
    (key: KeyId) => {
      reset()
      calc.press(key)
    },
    [reset, calc.press],
  )
  const recall = useCallback(
    (line: number) => {
      reset()
      calc.recall(line)
    },
    [reset, calc.recall],
  )

  const screen = (
    <Screen view={calc.view} narrow={narrow} press={press} recall={recall} confirm={confirm} onAnyPointer={calc.dismissMessage} />
  )
  return calc.view.fault ? screen : <FaultBoundary onFault={calc.reportFault}>{screen}</FaultBoundary>
}

export function Root() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}
