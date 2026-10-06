import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App'

function setWidth(narrow: boolean) {
  window.matchMedia = vi.fn().mockImplementation((media: string) => ({
    matches: narrow,
    media,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

function setup(narrow = false) {
  setWidth(narrow)
  const user = userEvent.setup()
  render(<App />)
  return user
}

const display = () => screen.getByRole('status')
const key = (name: string) => screen.getByRole('button', { name })
const keypad = () => screen.getByRole('group', { name: 'Keypad' })
const tapeRegion = () => screen.getByRole('region', { name: 'Tape' })
const tapeLines = () => within(tapeRegion()).queryAllByRole('listitem')

async function tap(user: ReturnType<typeof userEvent.setup>, ...names: string[]) {
  for (const name of names) await user.click(key(name))
}

function paste(text: string) {
  const e = new Event('paste', { bubbles: true, cancelable: true })
  Object.defineProperty(e, 'clipboardData', { value: { getData: () => text } })
  act(() => {
    window.dispatchEvent(e)
  })
}

afterEach(() => {
  vi.useRealTimers()
})

describe('S-2 Use the on-screen keys', () => {
  it('AC-2.1: tapping 1 2 + 3 = shows 15', async () => {
    const user = setup()
    await tap(user, '1', '2', 'plus', '3', 'equals')
    expect(display()).toHaveTextContent('15')
  })

  it('AC-2.2: six rows of four, every one a button named in words', () => {
    setup()
    expect(within(keypad()).getAllByRole('button').map((b) => b.getAttribute('aria-label'))).toEqual([
      'memory clear', 'memory recall', 'memory minus', 'memory plus',
      'clear', 'clear entry', 'backspace', 'divide',
      '7', '8', '9', 'multiply',
      '4', '5', '6', 'minus',
      '1', '2', '3', 'plus',
      'change sign', '0', 'decimal point', 'equals',
    ])
  })

  it('AC-2.4: C, CE, ⌫ and the operators carry their keyboard legends, hidden from screen readers', () => {
    setup()
    const legends: [string, string][] = [
      ['clear', 'Esc'], ['clear entry', 'Del'], ['backspace', 'Bksp'], ['divide', '/'],
      ['multiply', '*'], ['minus', '-'], ['plus', '+'], ['equals', 'Enter'],
    ]
    for (const [name, legend] of legends) {
      const hidden = [...key(name).querySelectorAll('[aria-hidden="true"]')].map((el) => el.textContent)
      expect(hidden).toEqual([legend])
    }
    expect(key('memory plus').querySelectorAll('[aria-hidden]')).toHaveLength(0)
  })

  it('AC-2.5, AC-15.7: the sign key is labelled +/−, named "change sign", with a Change sign tooltip', () => {
    setup()
    const sign = key('change sign')
    expect(sign).toHaveTextContent('+/−')
    expect(within(sign).getByText('Change sign')).toHaveAttribute('aria-hidden', 'true')
  })

  it('AC-2.6: +/− then = shows −5, and = does nothing with no operator', async () => {
    const user = setup()
    await tap(user, '5', 'change sign', 'equals')
    expect(display()).toHaveTextContent('−5')
  })

  it('AC-2.13, AC-10.16: a mouse click leaves no focus, so Enter afterwards is =', async () => {
    const user = setup()
    await tap(user, '5', 'plus', '7')
    expect(document.activeElement).toBe(document.body)
    await user.keyboard('{Enter}')
    expect(display()).toHaveTextContent('12')
  })

  it('AC-2.17: C in an error shows 0', async () => {
    const user = setup()
    await tap(user, '5', 'divide', '0', 'equals', 'clear')
    expect(display()).toHaveTextContent('0')
  })
})

describe('S-1 Type a figure, and messages', () => {
  it('AC-1.1: typing 1234.50 shows it as typed', async () => {
    const user = setup()
    await user.keyboard('1234.50')
    expect(display()).toHaveTextContent('1234.50')
  })

  it('AC-1.5, AC-1.7: a 16th digit shows "15 digits maximum" until the next key', async () => {
    const user = setup()
    await user.keyboard('1234567890123456')
    expect(screen.getByText('15 digits maximum', { selector: '.sr-only' })).toBeInTheDocument()
    await user.keyboard('{Shift}')
    expect(screen.queryByText('15 digits maximum', { selector: '.sr-only' })).toBeNull()
  })

  it('AC-1.7: a click anywhere also dismisses it', async () => {
    const user = setup()
    await user.keyboard('1234567890123456')
    fireEvent.pointerDown(display())
    expect(screen.queryByText('15 digits maximum', { selector: '.sr-only' })).toBeNull()
  })

  it('AC-1.8: with no input, the message stays; there is no timer', () => {
    vi.useFakeTimers()
    setup()
    for (const k of '1234567890123456') fireEvent.keyDown(window, { key: k })
    act(() => vi.advanceTimersByTime(60 * 60 * 1000))
    expect(screen.getByText('15 digits maximum', { selector: '.sr-only' })).toBeInTheDocument()
  })
})

describe('S-10 Do everything from the keyboard', () => {
  it('AC-10.1: 12.5*4 then Enter shows 50', async () => {
    const user = setup()
    await user.keyboard('12.5*4{Enter}')
    expect(display()).toHaveTextContent('50')
  })

  it('AC-10.2: the numpad, with numpad Enter', () => {
    setup()
    const keys: [string, string][] = [
      ['1', 'Numpad1'], ['2', 'Numpad2'], [',', 'NumpadDecimal'], ['5', 'Numpad5'],
      ['*', 'NumpadMultiply'], ['4', 'Numpad4'], ['Enter', 'NumpadEnter'],
    ]
    for (const [k, code] of keys) fireEvent.keyDown(window, { key: k, code })
    expect(display()).toHaveTextContent('50')
  })

  it('AC-10.3: 12.5*4= shows 50', async () => {
    const user = setup()
    await user.keyboard('12.5*4=')
    expect(display()).toHaveTextContent('50')
  })

  it('AC-10.4: + typed with Shift counts as +', () => {
    setup()
    fireEvent.keyDown(window, { key: '1' })
    fireEvent.keyDown(window, { key: '2' })
    fireEvent.keyDown(window, { key: '+', code: 'Equal', shiftKey: true })
    expect(display()).toHaveTextContent('12 plus')
  })

  it('AC-10.5: the Apple numpad Clear key clears', () => {
    setup()
    fireEvent.keyDown(window, { key: '7' })
    fireEvent.keyDown(window, { key: 'Clear', code: 'NumLock' })
    expect(display()).toHaveTextContent('0')
  })

  it('AC-10.6: the Apple numpad = is equals', () => {
    setup()
    for (const k of ['2', '+', '3']) fireEvent.keyDown(window, { key: k })
    fireEvent.keyDown(window, { key: '=', code: 'NumpadEqual' })
    expect(display()).toHaveTextContent('5')
  })

  it('AC-10.7: Escape, Delete and Backspace', async () => {
    const user = setup()
    await user.keyboard('5+34{Backspace}')
    expect(display()).toHaveTextContent('3')
    await user.keyboard('{Delete}')
    expect(display()).toHaveTextContent('0')
    await user.keyboard('{Escape}')
    expect(screen.queryByText('5 plus', { selector: '.sr-only' })).toBeNull()
  })

  it('AC-10.8: Tab to +/− and Enter or Space flips the sign', async () => {
    const user = setup()
    await user.keyboard('5')
    key('change sign').focus()
    await user.keyboard('{Enter}')
    expect(display()).toHaveTextContent('−5')
    await user.keyboard(' ')
    expect(display()).toHaveTextContent('5')
  })

  it('AC-10.9: Tab to M+ and Enter adds to memory; memory has no key of its own', async () => {
    const user = setup()
    await user.keyboard('5')
    key('memory plus').focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('memory 5')).toBeInTheDocument()
  })

  it('AC-10.11: a letter, a comma or Space with nothing focused does nothing', async () => {
    const user = setup()
    await user.keyboard('a, m')
    expect(display()).toHaveTextContent('0')
  })

  it('AC-10.12: with Ctrl, Cmd or Alt the calculator does nothing and the browser keeps the key', () => {
    setup()
    expect(fireEvent.keyDown(window, { key: '5', ctrlKey: true })).toBe(true)
    expect(fireEvent.keyDown(window, { key: '5', metaKey: true })).toBe(true)
    expect(display()).toHaveTextContent('0')
  })

  it('AC-10.13: Num Lock off: navigation keys from the numpad do nothing', () => {
    setup()
    fireEvent.keyDown(window, { key: 'End', code: 'Numpad1' })
    fireEvent.keyDown(window, { key: 'ArrowDown', code: 'Numpad2' })
    expect(display()).toHaveTextContent('0')
  })

  it('AC-10.14: with the 7 key focused, Enter types 7', async () => {
    const user = setup()
    key('7').focus()
    await user.keyboard('{Enter}')
    expect(display()).toHaveTextContent('7')
  })

  it('AC-10.15: typing 3 moves focus off the focused key, so Enter is then =', async () => {
    const user = setup()
    key('7').focus()
    await user.keyboard('3')
    expect(document.activeElement).toBe(document.body)
    expect(display()).toHaveTextContent('3')
    await user.keyboard('{Enter}')
    expect(display()).toHaveTextContent('3')
  })

  it('Decision 13: keys the browser would act on itself are taken, / included (Firefox quick find)', () => {
    setup()
    expect(fireEvent.keyDown(window, { key: '/' })).toBe(false)
    expect(fireEvent.keyDown(window, { key: 'Backspace' })).toBe(false)
    expect(fireEvent.keyDown(window, { key: 'Tab' })).toBe(true)
  })

  it('AC-10.22, AC-10.23: in an error Enter does nothing and a digit shows', async () => {
    const user = setup()
    await user.keyboard('5/0={Enter}')
    expect(display()).toHaveTextContent('Cannot divide by zero')
    await user.keyboard('4')
    expect(display()).toHaveTextContent('4')
  })
})

describe('S-11 Paste a figure', () => {
  it('AC-11.1: £1,234.56 shows 1234.56', () => {
    setup()
    paste('£1,234.56')
    expect(display()).toHaveTextContent('1234.56')
  })

  it('AC-11.6: a refused paste shows its message and leaves the figure', async () => {
    const user = setup()
    await user.keyboard('12')
    paste('1.234,56')
    expect(display()).toHaveTextContent('12')
    expect(screen.getByText('Unclear which mark is the decimal point', { selector: '.sr-only' })).toBeInTheDocument()
  })
})

describe('S-12 See the working on a tape', () => {
  it('AC-12.1, AC-12.6: the tape is an explicit list, one line per =, with every step', async () => {
    const user = setup()
    await user.keyboard('2+3*4=')
    const list = within(tapeRegion()).getByRole('list')
    expect(list).toHaveAttribute('role', 'list')
    expect(tapeLines()).toHaveLength(1)
    expect(tapeLines()[0]).toHaveTextContent('2 plus 3 equals 5 then times 4 equals 20')
  })

  it('AC-12.9, Decision 15: above 900px the tape is visible, after the calculator', () => {
    setup(false)
    expect(screen.queryByRole('button', { name: 'Show tape' })).toBeNull()
    const calculator = screen.getByRole('region', { name: 'Calculator' })
    expect(calculator.compareDocumentPosition(tapeRegion()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('AC-12.10, AC-12.11: at 900px and below the tape is behind Show tape, closed, then between readout and keypad', async () => {
    const user = setup(true)
    const toggle = key('Show tape')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('region', { name: 'Tape' })).toBeNull()
    await user.click(toggle)
    expect(key('Hide tape')).toHaveAttribute('aria-expanded', 'true')
    expect(display().compareDocumentPosition(tapeRegion()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(tapeRegion().compareDocumentPosition(keypad()) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('Decision 15: an empty tape shows only its quiet line, no heading or control', () => {
    setup()
    expect(within(tapeRegion()).getByText('Finished calculations appear here')).toBeInTheDocument()
    expect(within(tapeRegion()).queryByRole('heading')).toBeNull()
    expect(within(tapeRegion()).queryByRole('button')).toBeNull()
  })
})

describe('S-13 Recall a result from the tape', () => {
  it('AC-13.1: clicking a line recalls its result with its ≈', async () => {
    const user = setup()
    await user.keyboard('100/3={Escape}')
    await user.click(tapeLines()[0] as HTMLElement)
    expect(display()).toHaveTextContent('approximately 33.3333333333333')
  })

  it('AC-13.3, Decision 10: one Tab stop; Up and Down move; Enter or Space recalls; Left and Right do nothing', async () => {
    const user = setup()
    await user.keyboard('1+1=2+2=3+3=')
    const lines = tapeLines()
    expect(lines.filter((l) => l.tabIndex === 0)).toHaveLength(1)
    expect(lines[2]?.tabIndex).toBe(0)
    lines[2]?.focus()
    await user.keyboard('{ArrowUp}')
    expect(document.activeElement).toBe(lines[1])
    await user.keyboard('{ArrowLeft}{ArrowRight}')
    expect(document.activeElement).toBe(lines[1])
    await user.keyboard('{Enter}')
    expect(display()).toHaveTextContent('4')
    await user.keyboard('{ArrowUp}')
    expect(document.activeElement).toBe(lines[0])
    await user.keyboard(' ')
    expect(display()).toHaveTextContent('2')
  })

  it('AC-10.17: Enter on a focused tape line recalls rather than pressing =', async () => {
    const user = setup()
    await user.keyboard('9+1=5+')
    tapeLines()[0]?.focus()
    await user.keyboard('{Enter}')
    expect(screen.getByText('5 plus', { selector: '.sr-only' })).toBeInTheDocument()
    expect(display()).toHaveTextContent('10')
  })
})

describe('S-14 Empty the tape', () => {
  it('AC-14.1, AC-14.2: the first press relabels, the second empties', async () => {
    const user = setup()
    await user.keyboard('1+1=')
    await user.click(key('Empty tape'))
    expect(key('Press again to empty')).toBeInTheDocument()
    expect(tapeLines()).toHaveLength(1)
    await user.click(key('Press again to empty'))
    expect(tapeLines()).toHaveLength(0)
  })

  it('AC-14.3: moving focus away reverts the label', async () => {
    const user = setup()
    await user.keyboard('1+1=')
    key('Empty tape').focus()
    await user.keyboard('{Enter}')
    expect(key('Press again to empty')).toBeInTheDocument()
    await user.tab()
    expect(key('Empty tape')).toBeInTheDocument()
  })

  it('AC-14.3: pressing another key reverts the label', async () => {
    const user = setup()
    await user.keyboard('1+1=')
    await user.click(key('Empty tape'))
    await user.click(key('7'))
    expect(key('Empty tape')).toBeInTheDocument()
    expect(tapeLines()).toHaveLength(1)
  })

  it('AC-14.5, AC-14.7: emptying keeps memory and leaves an error showing', async () => {
    const user = setup()
    await user.keyboard('95')
    await user.click(key('memory plus'))
    await user.keyboard('5/0=')
    await user.click(key('Empty tape'))
    await user.click(key('Press again to empty'))
    expect(tapeLines()).toHaveLength(0)
    expect(screen.getByText('memory 95')).toBeInTheDocument()
    expect(display()).toHaveTextContent('Cannot divide by zero')
  })
})

describe('S-15 Use the calculator with a screen reader (roles, names and live regions)', () => {
  it('AC-15.1 to AC-15.3: the result region is a polite live region, and the expression line is not', async () => {
    const user = setup()
    expect(display()).toHaveAttribute('aria-live', 'polite')
    await user.keyboard('12+')
    expect(display()).toHaveTextContent('12 plus')
    const expression = screen.getByText('12 plus', { selector: ':not([role=status]) > .sr-only' })
    expect(expression.closest('[aria-live]')).toBeNull()
  })

  it('AC-15.4: ≈ is read as approximately and drawn as its chip', async () => {
    const user = setup()
    await user.keyboard('100/3=')
    expect(display()).toHaveTextContent('approximately 33.3333333333333')
    const chip = within(display()).getByText('≈')
    expect(chip.tagName).toBe('SPAN')
    expect(chip.closest('[aria-hidden="true"]')).not.toBeNull()
  })

  it('AC-15.6: the M indicator is announced as memory and its total', async () => {
    const user = setup()
    await user.keyboard('95')
    await user.click(key('memory plus'))
    const memory = screen.getByText('memory 95')
    expect(memory.closest('[aria-live="polite"]')).not.toBeNull()
  })

  it('AC-15.10, AC-15.11: minus and powers are spoken in words', async () => {
    const user = setup()
    await user.keyboard('5')
    await user.click(key('change sign'))
    expect(display()).toHaveTextContent('minus 5')
    await user.keyboard('{Escape}999999999999999+1=')
    expect(display()).toHaveTextContent('1 times 10 to the power 15')
  })
})

describe('S-19 Keep a running total in memory (on screen)', () => {
  beforeEach(() => setWidth(false))

  it('AC-19.1 to AC-19.3: M+ three part totals, then MR', async () => {
    const user = setup()
    await user.keyboard('120.5+30=')
    await user.click(key('memory plus'))
    await user.keyboard('75*2=')
    await user.click(key('memory plus'))
    await user.keyboard('9.99*3=')
    await user.click(key('memory plus'))
    expect(screen.getByText('memory 330.47')).toBeInTheDocument()
    await user.click(key('memory recall'))
    expect(display()).toHaveTextContent('330.47')
  })
})
