import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

// Fitness functions 3 and 4 in docs/architecture.md: no native number APIs anywhere in src, and
// nothing in domain throws. The import rules are in src/fitness.test.ts.
const SRC = join(__dirname, '..')

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : []
  })
}

const files = sourceFiles(SRC).map((path) => ({
  path: relative(SRC, path),
  text: readFileSync(path, 'utf8'),
}))

describe('domain boundaries', () => {
  it('no production file uses native number parsing or rounding on values', () => {
    const banned = /\b(parseFloat|parseInt|Number\(|toFixed|toPrecision|Math\.)/
    expect(files.filter((f) => banned.test(f.text)).map((f) => f.path)).toEqual([])
  })

  it('nothing in domain throws', () => {
    const throwers = files.filter((f) => f.path.startsWith('domain/') && /\bthrow\b/.test(f.text))
    expect(throwers.map((f) => f.path)).toEqual([])
  })
})
