import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FAULT_TEXT } from '../shared/messages'
import { App, FaultBoundary } from './App'

// A bug the engine is not supposed to have: typing 9 throws.
vi.mock('../domain/engine', async (importOriginal) => {
  const real = await importOriginal<typeof import('../domain/engine')>()
  return {
    ...real,
    step: (state: Parameters<typeof real.step>[0], event: Parameters<typeof real.step>[1]) => {
      if (event.type === 'digit' && event.digit === '9') throw new Error('a bug')
      return real.step(state, event)
    },
  }
})

window.matchMedia = vi.fn().mockImplementation((media: string) => ({
  matches: false,
  media,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}))

const display = () => screen.getByRole('status')
const key = (name: string) => screen.getByRole('button', { name })
const tapeLines = () => within(screen.getByRole('region', { name: 'Tape' })).queryAllByRole('listitem')

async function intoFault() {
  const user = userEvent.setup()
  render(<App />)
  await user.keyboard('85')
  await user.click(key('memory plus'))
  await user.keyboard('{Escape}1+1=9')
  return user
}

describe('S-9 the fault: a throw the engine is not supposed to make', () => {
  it('AC-9.9: shows the fault sentence from Decision 8, with an empty expression line', async () => {
    await intoFault()
    expect(display()).toHaveTextContent(FAULT_TEXT)
    expect(screen.getByText('memory 85')).toBeInTheDocument()
    expect(tapeLines()).toHaveLength(2)
  })

  it('AC-9.10: C resets to 0 and keeps the tape and memory', async () => {
    const user = await intoFault()
    await user.click(key('clear'))
    expect(display()).toHaveTextContent('0')
    expect(display()).not.toHaveTextContent(FAULT_TEXT)
    expect(screen.getByText('memory 85')).toBeInTheDocument()
    expect(tapeLines()).toHaveLength(2)
  })

  it('AC-9.10: Escape does the same', async () => {
    const user = await intoFault()
    await user.keyboard('{Escape}')
    expect(display()).toHaveTextContent('0')
  })

  it('AC-9.11, AC-19.8: every other input does nothing, MC, paste and recall included', async () => {
    const user = await intoFault()
    await user.keyboard('4+={Backspace}{Delete}')
    for (const name of ['memory clear', 'memory recall', 'memory plus', 'change sign', '7', 'equals']) {
      await user.click(key(name))
    }
    const e = new Event('paste', { bubbles: true, cancelable: true })
    Object.defineProperty(e, 'clipboardData', { value: { getData: () => '12' } })
    act(() => {
      window.dispatchEvent(e)
    })
    await user.click(tapeLines()[0] as HTMLElement)
    await user.click(key('Empty tape'))
    expect(key('Empty tape')).toBeInTheDocument()
    await user.click(key('Empty tape'))
    expect(display()).toHaveTextContent(FAULT_TEXT)
    expect(screen.getByText('memory 85')).toBeInTheDocument()
    expect(tapeLines()).toHaveLength(2)
  })
})

describe('S-9 the error boundary', () => {
  function Broken(): never {
    throw new Error('a render bug')
  }

  it('AC-9.9: a render failure reports the fault and shows no raw error', () => {
    const onFault = vi.fn()
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    render(
      <FaultBoundary onFault={onFault}>
        <Broken />
      </FaultBoundary>,
    )
    expect(onFault).toHaveBeenCalledOnce()
    expect(screen.queryByText(/a render bug/)).toBeNull()
    fireEvent.keyDown(window, { key: 'Escape' })
  })
})
