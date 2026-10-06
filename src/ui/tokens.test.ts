import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// docs/ux/mockup.html is the visual source of truth. If the app and that file disagree, one of
// them is a bug (Decision 15); this test is where they are compared.
const root = join(__dirname, '..', '..')
const mockup = readFileSync(join(root, 'docs/ux/mockup.html'), 'utf8')
const tokens = readFileSync(join(__dirname, 'tokens.css'), 'utf8')

function properties(block: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const m of block.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/g)) out[m[1] ?? ''] = (m[2] ?? '').trim()
  return out
}

function block(text: string, selector: string): string {
  const start = text.indexOf(`${selector} {`)
  return text.slice(start, text.indexOf('}', start))
}

describe('tokens.css matches docs/ux/mockup.html', () => {
  it('has the same light colours, sizes and type', () => {
    const app = properties(block(tokens, ':root'))
    const expected = { ...properties(block(mockup, ':root')), ...properties(block(mockup, '.theme-light')) }
    expect(app).toEqual(expected)
  })

  it('has the same dark colours, through prefers-color-scheme', () => {
    const dark = tokens.slice(tokens.indexOf('@media (prefers-color-scheme: dark)'))
    expect(properties(block(dark, ':root'))).toEqual(properties(block(mockup, '.theme-dark')))
  })
})
