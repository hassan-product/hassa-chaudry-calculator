import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// AC-20.5: every pairing in the contrast table of docs/ux/wireframes.md, measured from the
// colours the app ships in tokens.css, in light and in dark.
const ROOT = join(__dirname, '..', '..')
const tokens = readFileSync(join(__dirname, 'tokens.css'), 'utf8')
const wireframes = readFileSync(join(ROOT, 'docs/ux/wireframes.md'), 'utf8')

function colours(block: string): Record<string, string> {
  return Object.fromEntries([...block.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6});/g)].map((m) => [m[1], m[2]]))
}
const light = colours(tokens.slice(0, tokens.indexOf('@media (prefers-color-scheme: dark)')))
const dark = colours(tokens.slice(tokens.indexOf('@media (prefers-color-scheme: dark)')))

function luminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
function ratio(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return ((x ?? 0) + 0.05) / ((y ?? 0) + 0.05)
}

const pairs = [...wireframes.matchAll(/^\| `([a-z0-9-]+)` \| `([a-z0-9-]+)` \| ([^|]+) \| ([\d.]+):1 \|/gm)].map((m) => ({
  fg: m[1] ?? '',
  bg: m[2] ?? '',
  use: (m[3] ?? '').trim(),
  needs: Number(m[4]),
}))

describe('S-20 Read the calculator at any size: contrast', () => {
  it('finds the contrast table', () => {
    expect(pairs.length).toBeGreaterThanOrEqual(41)
  })

  it.each(pairs.flatMap((p) => [{ ...p, theme: 'light', colours: light }, { ...p, theme: 'dark', colours: dark }]))(
    'AC-20.5: $theme, $use ($fg on $bg) meets $needs:1',
    ({ fg, bg, needs, colours }) => {
      const f = colours[fg]
      const b = colours[bg]
      expect(f, fg).toBeDefined()
      expect(b, bg).toBeDefined()
      expect(ratio(f ?? '', b ?? '')).toBeGreaterThanOrEqual(needs)
    },
  )
})
