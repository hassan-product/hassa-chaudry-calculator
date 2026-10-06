import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useEmptyTapeConfirm } from './useEmptyTapeConfirm'

function setup(lines = 3) {
  const emptyTape = vi.fn()
  const hook = renderHook(({ n }) => useEmptyTapeConfirm(n, emptyTape), { initialProps: { n: lines } })
  return { emptyTape, hook }
}

describe('S-14: emptying the tape takes two presses', () => {
  it('AC-14.1: the first press only relabels to "Press again to empty"', () => {
    const { emptyTape, hook } = setup()
    expect(hook.result.current.label).toBe('Empty tape')
    act(() => hook.result.current.press())
    expect(hook.result.current.label).toBe('Press again to empty')
    expect(emptyTape).not.toHaveBeenCalled()
  })

  it('AC-14.2: the second press empties the tape and the label returns', () => {
    const { emptyTape, hook } = setup()
    act(() => hook.result.current.press())
    act(() => hook.result.current.press())
    expect(emptyTape).toHaveBeenCalledOnce()
    expect(hook.result.current.label).toBe('Empty tape')
  })

  it('AC-14.3: when focus leaves or another input comes, it reverts', () => {
    const { emptyTape, hook } = setup()
    act(() => hook.result.current.press())
    act(() => hook.result.current.reset())
    expect(hook.result.current.label).toBe('Empty tape')
    act(() => hook.result.current.press())
    expect(emptyTape).not.toHaveBeenCalled()
  })

  it('AC-14.3: a key pressed anywhere but on the control reverts it', () => {
    const { hook } = setup()
    act(() => hook.result.current.press())
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }))
    })
    expect(hook.result.current.label).toBe('Empty tape')
  })

  it('AC-14.6: with no input, it stays armed; there is no timer', () => {
    vi.useFakeTimers()
    const { hook } = setup()
    act(() => hook.result.current.press())
    act(() => vi.advanceTimersByTime(60 * 60 * 1000))
    expect(hook.result.current.label).toBe('Press again to empty')
    vi.useRealTimers()
  })

  it('AC-14.4: on an empty tape a press does nothing', () => {
    const { emptyTape, hook } = setup(0)
    act(() => hook.result.current.press())
    act(() => hook.result.current.press())
    expect(emptyTape).not.toHaveBeenCalled()
    expect(hook.result.current.label).toBe('Empty tape')
  })
})
