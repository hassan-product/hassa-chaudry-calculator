import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// Criteria about how the screen looks are checked here against the stylesheets the app ships.
// jsdom does not lay pages out, so these read the rules rather than measure pixels; the manual
// check in docs/test-plan.md looks at the result in a browser.

type Rule = { media: string; selector: string; decls: Record<string, string> }

function parse(css: string, media = ''): Rule[] {
  const out: Rule[] = []
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '')
  let i = 0
  while (i < text.length) {
    const open = text.indexOf('{', i)
    if (open === -1) break
    const head = text.slice(i, open).trim()
    let depth = 1
    let j = open + 1
    while (j < text.length && depth > 0) {
      if (text[j] === '{') depth++
      if (text[j] === '}') depth--
      j++
    }
    const body = text.slice(open + 1, j - 1)
    if (head.startsWith('@media')) {
      out.push(...parse(body, head))
    } else {
      const decls: Record<string, string> = {}
      for (const d of body.split(';')) {
        const k = d.indexOf(':')
        if (k > 0) decls[d.slice(0, k).trim()] = d.slice(k + 1).trim().replace(/\s+/g, ' ')
      }
      for (const selector of head.split(',')) out.push({ media, selector: selector.trim(), decls })
    }
    i = j
  }
  return out
}

const read = (file: string) => readFileSync(join(__dirname, file), 'utf8')
const keypad = parse(read('Keypad.module.css'))
const app = parse(read('App.module.css'))
const display = parse(read('Display.module.css'))
const tape = parse(read('Tape.module.css'))
const toggle = parse(read('TapeToggle.module.css'))
const tokensCss = read('tokens.css')
const all = [keypad, app, display, tape, toggle, parse(read('Announcer.module.css'))].flat()

// Every declaration for a selector outside media queries (or inside the given one), merged in order.
const rule = (rules: Rule[], selector: string, media = '') =>
  Object.assign({}, ...rules.filter((r) => r.selector === selector && (media ? r.media.includes(media) : r.media === '')).map((r) => r.decls)) as Record<string, string>

function token(name: string): string {
  const m = new RegExp(`${name}:\\s*([^;]+);`).exec(tokensCss)
  return m?.[1]?.trim() ?? ''
}
const rem = (value: string) => {
  const m = /^([\d.]+)rem$/.exec(value)
  return m ? Number(m[1]) : Number.NaN
}

const KINDS = ['.digit', '.control', '.memory', '.operator', '.equals']

describe('S-2 Use the on-screen keys: how the keypad looks', () => {
  it('AC-2.3: every key the same size and shape, the memory row quieter, the operators and = accented', () => {
    expect(rule(keypad, '.keypad')['grid-template-columns']).toBe('repeat(4, minmax(var(--size-key-min), 1fr))')
    // Only .key sizes a key; no kind of key is sized or shaped differently.
    const sizing = ['width', 'height', 'min-width', 'min-height', 'border-radius', 'grid-column', 'grid-row']
    for (const kind of KINDS) {
      for (const r of keypad.filter((r) => r.selector === kind)) {
        expect(Object.keys(r.decls).filter((d) => sizing.includes(d))).toEqual([])
      }
    }
    const memory = rule(keypad, '.memory')
    expect(memory['font-weight']).toBe('400')
    expect(memory['border-style']).toBeUndefined()
    expect(rule(keypad, '.operator').background).toBe('var(--color-op-bg)')
    expect(rule(keypad, '.equals').background).toBe('var(--color-eq-bg)')
    expect(rule(keypad, '.equals')['font-weight']).toBe('600')
  })

  it('AC-2.8: keys are at least 44px and four of them fit a 320px screen without overlapping', () => {
    expect(token('--size-key-min')).toBe('2.75rem')
    expect(rule(keypad, '.key')['min-width']).toBe('var(--size-key-min)')
    expect(rule(keypad, '.key')['min-height']).toBe('var(--size-key-min)')
    const needed = 16 * (4 * rem(token('--size-key-min')) + 3 * rem(token('--size-key-gap')) + 2 * rem(token('--size-gutter')))
    expect(needed).toBeLessThanOrEqual(320)
  })

  it('AC-2.9, AC-20.1: key labels are 24px and the display is always larger', () => {
    expect(token('--font-size-key')).toBe('1.5rem')
    expect(rule(keypad, '.key').font).toContain('var(--font-size-key)')
    const smallestDisplay = Math.min(rem(token('--font-size-display')), rem(token('--font-size-display-medium')), rem(token('--font-size-display-long')))
    expect(smallestDisplay).toBeGreaterThan(rem(token('--font-size-key')))
  })

  it('AC-2.10, AC-20.7: above 900px the calculator column is 30rem and the tape takes the rest', () => {
    expect(token('--size-rail-min')).toBe('30rem')
    expect(rule(app, '.layout')['grid-template-columns']).toBe('var(--size-rail-min) minmax(0, 1fr)')
    expect(app.some((r) => r.media === '@media (max-width: 900px)' && r.selector === '.layout')).toBe(true)
  })

  it('AC-2.11, AC-20.8: on a short window keys get shorter, never below 44px, and nothing stops the page scrolling', () => {
    expect(rule(keypad, '.key').height).toMatch(/^clamp\( ?var\(--size-key-min\),/)
    const hidden = all.filter((r) => r.decls.overflow === 'hidden' || r.decls['overflow-y'] === 'hidden')
    expect(hidden.map((r) => r.selector)).toEqual([])
  })

  it('AC-2.14: on a device with hover, hovering any key changes both its fill and its label colour', () => {
    for (const kind of KINDS) {
      const hover = keypad.find((r) => r.media === '@media (hover: hover)' && r.selector === `${kind}:hover`)?.decls
      expect(hover?.background, kind).toBeDefined()
      expect(hover?.color, kind).toBeDefined()
    }
  })

  it('AC-2.15: the pressed look differs from hover and from focus', () => {
    expect(rule(keypad, '.key:active')['box-shadow']).toBe('var(--shadow-pressed)')
    for (const kind of KINDS) {
      const pressed = rule(keypad, `${kind}:active`).background
      const hover = keypad.find((r) => r.media === '@media (hover: hover)' && r.selector === `${kind}:hover`)?.decls.background
      expect(pressed, kind).toBeDefined()
      expect(pressed, kind).not.toBe(hover)
    }
    expect(rule(keypad, '.key:focus-visible').outline).toContain('var(--color-focus)')
    expect(rule(keypad, '.key:focus-visible').background).toBeUndefined()
  })
})

describe('S-10 Do everything from the keyboard: focus is visible', () => {
  it('AC-10.20: keys, the toggle and tape lines show a ring on focus, and no rule removes the focus outline', () => {
    for (const [rules, selector] of [[keypad, '.key:focus-visible'], [toggle, '.toggle:focus-visible'], [tape, '.line:focus-visible']] as const) {
      expect(rule(rules, selector).outline, selector).toMatch(/var\(--focus-ring-width\) solid var\(--color-focus\)/)
    }
    expect(all.filter((r) => r.decls.outline === 'none' || r.decls.outline === '0').map((r) => r.selector)).toEqual([])
  })
})

describe('S-12 See the working on a tape: long lines', () => {
  it('AC-12.14: a long line wraps and nothing on the tape is cut off', () => {
    expect(rule(tape, '.work')['overflow-wrap']).toBe('anywhere')
    expect(tape.filter((r) => r.decls['text-overflow'] || r.decls['white-space'] === 'nowrap').map((r) => r.selector)).toEqual([])
  })
})

describe('S-20 Read the calculator at any size', () => {
  it('AC-20.2: every text size is in rem, so a larger browser text size is followed', () => {
    const fontSizes = Object.entries({ ...Object.fromEntries([...tokensCss.matchAll(/(--font-size-[a-z-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]])) })
    expect(fontSizes.length).toBeGreaterThan(5)
    for (const [, v] of fontSizes) expect(v).toMatch(/rem$/)
    const pxFonts = all.filter((r) => /\d+px/.test(r.decls['font-size'] ?? '') || /\b\d+px\b/.test((r.decls.font ?? '').split(' ').slice(1, 2).join('')))
    expect(pxFonts.map((r) => r.selector)).toEqual([])
  })

  it('AC-20.6, AC-20.9, AC-20.10: a long display or message wraps rather than shrinking or being cut', () => {
    expect(rule(display, '.display')['overflow-wrap']).toBe('anywhere')
    expect(rule(display, '.long')['font-size']).toBe('var(--font-size-display-long)')
    expect(rule(display, '.expression')['overflow-wrap']).toBe('anywhere')
  })
})
