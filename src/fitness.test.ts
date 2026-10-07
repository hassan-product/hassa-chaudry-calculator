import { execFileSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve } from 'node:path'
import { gzipSync } from 'node:zlib'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'
import { ERROR_TEXT, FAULT_TEXT, NOTICE_TEXT } from './shared/messages'

// Fitness functions: checks on the code's shape that run with the suite and in CI, so
// docs/architecture.md and the code cannot drift apart. Each failure names the file and line.

const ROOT = resolve(__dirname, '..')
const SRC = join(ROOT, 'src')

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

const isTest = (path: string) => /\.test\.tsx?$/.test(path)
const sourcePaths = walk(SRC).filter((p) => /\.tsx?$/.test(p) && !isTest(p) && !p.endsWith('.d.ts'))
const testPaths = walk(SRC).filter(isTest)
const rel = (path: string) => relative(SRC, path)

const program = ts.createProgram(sourcePaths, {
  strict: true,
  jsx: ts.JsxEmit.ReactJSX,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  target: ts.ScriptTarget.ES2022,
  noEmit: true,
  skipLibCheck: true,
  types: [],
})
const checker = program.getTypeChecker()
const sourceFile = (path: string) => program.getSourceFile(path) as ts.SourceFile

function lineOf(sf: ts.SourceFile, node: ts.Node): number {
  return sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1
}

function visit(node: ts.Node, fn: (n: ts.Node) => void) {
  fn(node)
  node.forEachChild((child) => visit(child, fn))
}

// ---------------------------------------------------------------------------------------------
// 1. Layer boundaries

type Layer = 'domain' | 'app' | 'ui' | 'shared' | 'main'

function layerOf(path: string): Layer | null {
  const r = rel(path)
  if (r === 'main.tsx') return 'main'
  const top = r.split('/')[0]
  return top === 'domain' || top === 'app' || top === 'ui' || top === 'shared' ? top : null
}

type Import = { file: string; line: number; specifier: string; target: Layer | null }

function importsOf(path: string): Import[] {
  const sf = sourceFile(path)
  const out: Import[] = []
  visit(sf, (n) => {
    if ((ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) && n.moduleSpecifier && ts.isStringLiteral(n.moduleSpecifier)) {
      const specifier = n.moduleSpecifier.text
      const target = specifier.startsWith('.') ? layerOf(resolve(dirname(path), specifier)) : null
      out.push({ file: rel(path), line: lineOf(sf, n), specifier, target })
    }
  })
  return out
}

const allImports = sourcePaths.flatMap(importsOf)
const describeImport = (i: Import) => `${i.file}:${i.line} imports '${i.specifier}'`

describe('fitness 1: layer boundaries (docs/architecture.md, layer model)', () => {
  const from = (layer: Layer) => allImports.filter((i) => layerOf(join(SRC, i.file)) === layer)

  it('domain imports nothing from react, app, ui or a stylesheet', () => {
    const bad = from('domain').filter(
      (i) => /^react(-dom)?(\/|$)/.test(i.specifier) || i.target === 'app' || i.target === 'ui' || /\.css$/.test(i.specifier),
    )
    expect(bad.map(describeImport)).toEqual([])
  })

  it('domain never touches window or document', () => {
    const bad: string[] = []
    for (const path of sourcePaths.filter((p) => layerOf(p) === 'domain')) {
      const sf = sourceFile(path)
      visit(sf, (n) => {
        if (ts.isIdentifier(n) && (n.text === 'window' || n.text === 'document')) {
          const parent = n.parent
          const isPropertyName = ts.isPropertyAccessExpression(parent) && parent.name === n
          if (!isPropertyName) bad.push(`${rel(path)}:${lineOf(sf, n)} uses ${n.text}`)
        }
      })
    }
    expect(bad).toEqual([])
  })

  it('app imports nothing from ui', () => {
    expect(from('app').filter((i) => i.target === 'ui').map(describeImport)).toEqual([])
  })

  it('ui imports nothing from domain', () => {
    expect(from('ui').filter((i) => i.target === 'domain').map(describeImport)).toEqual([])
  })

  it('only domain/decimal.ts imports decimal.js', () => {
    const bad = allImports.filter((i) => i.specifier === 'decimal.js' && i.file !== 'domain/decimal.ts')
    expect(bad.map(describeImport)).toEqual([])
  })

  it('shared imports nothing at all', () => {
    expect(from('shared').map(describeImport)).toEqual([])
  })

  it('main.tsx imports only ui/App and react-dom/client', () => {
    const bad = from('main').filter((i) => i.specifier !== './ui/App' && i.specifier !== 'react-dom/client')
    expect(bad.map(describeImport)).toEqual([])
  })
})

// ---------------------------------------------------------------------------------------------
// 2. No native arithmetic on values in the domain

// A use that is not a value (an index, a length, a digit count) is allowed when the line, or the
// line above it, carries this comment with a reason. Every use is listed below, so a new one
// shows up in review rather than slipping in.
const HATCH = /fitness: not a value\b(.*)$/

const ALLOWED_HATCHES = [
  'domain/entry.ts:11 the 0 before the point is not counted (a digit count)',
  'domain/format.ts:20 position in the whole-number part, for commas',
  'domain/format.ts:22 digits left of this position, for commas',
  'domain/paste.ts:19 position of a character in the pasted text',
  'domain/paste.ts:23 the character after the three digits that follow a comma',
  'domain/paste.ts:25 positions of the three digits after a comma',
]

const ARITHMETIC = new Set([
  ts.SyntaxKind.PlusToken, ts.SyntaxKind.MinusToken, ts.SyntaxKind.AsteriskToken, ts.SyntaxKind.SlashToken,
  ts.SyntaxKind.PercentToken, ts.SyntaxKind.AsteriskAsteriskToken,
  ts.SyntaxKind.PlusEqualsToken, ts.SyntaxKind.MinusEqualsToken, ts.SyntaxKind.AsteriskEqualsToken,
  ts.SyntaxKind.SlashEqualsToken, ts.SyntaxKind.PercentEqualsToken, ts.SyntaxKind.AsteriskAsteriskEqualsToken,
])

function isNumeric(node: ts.Expression): boolean {
  const type = checker.getTypeAtLocation(node)
  return (type.flags & (ts.TypeFlags.NumberLike | ts.TypeFlags.BigIntLike)) !== 0
}

type Finding = { at: string; what: string; hatch: string | null }

function nativeArithmetic(path: string): Finding[] {
  const sf = sourceFile(path)
  const lines = sf.getFullText().split('\n')
  const hatchFor = (line: number) => {
    const here = HATCH.exec(lines[line - 1] ?? '') ?? HATCH.exec(lines[line - 2] ?? '')
    return here ? (here[1] ?? '').replace(/^[\s:—-]+/, '').trim() : null
  }
  const found: Finding[] = []
  const add = (n: ts.Node, what: string) => {
    const line = lineOf(sf, n)
    found.push({ at: `${rel(path)}:${line}`, what, hatch: hatchFor(line) })
  }
  visit(sf, (n) => {
    if (ts.isCallExpression(n) || ts.isNewExpression(n)) {
      const callee = n.expression.getText(sf)
      if (/^(parseFloat|parseInt|Number|BigInt)$/.test(callee) || /^(Math|Number)\./.test(callee)) add(n, `${callee}()`)
    }
    if (ts.isBinaryExpression(n) && ARITHMETIC.has(n.operatorToken.kind) && (isNumeric(n.left) || isNumeric(n.right))) {
      add(n, n.getText(sf))
    }
    if ((ts.isPrefixUnaryExpression(n) || ts.isPostfixUnaryExpression(n)) && isNumeric(n.operand)) {
      const op = n.operator
      const isLiteralSign = ts.isPrefixUnaryExpression(n) && ts.isNumericLiteral(n.operand)
      if (!isLiteralSign && (op === ts.SyntaxKind.PlusPlusToken || op === ts.SyntaxKind.MinusMinusToken ||
          op === ts.SyntaxKind.PlusToken || op === ts.SyntaxKind.MinusToken)) add(n, n.getText(sf))
    }
  })
  return found
}

describe('fitness 2: no native arithmetic on values in src/domain, outside decimal.ts', () => {
  const findings = sourcePaths
    .filter((p) => layerOf(p) === 'domain' && rel(p) !== 'domain/decimal.ts')
    .flatMap(nativeArithmetic)

  it('every use of native number parsing or arithmetic carries the escape-hatch comment', () => {
    expect(findings.filter((f) => f.hatch === null).map((f) => `${f.at} ${f.what}`)).toEqual([])
  })

  it('lists every escape hatch in use', () => {
    const hatches = [...new Set(findings.filter((f) => f.hatch).map((f) => `${f.at.replace(/:\d+$/, '')}:${hatchLine(f)} ${f.hatch}`))]
    expect(hatches).toEqual(ALLOWED_HATCHES)
  })
})

// The line the comment sits on, so one comment covering a line below is listed once.
function hatchLine(f: Finding): number {
  const [file, line] = f.at.split(':')
  const lines = readFileSync(join(SRC, file ?? ''), 'utf8').split('\n')
  const n = Number(line)
  return HATCH.test(lines[n - 1] ?? '') ? n : n - 1
}

// ---------------------------------------------------------------------------------------------
// 3. Story traceability

const storiesText = readFileSync(join(ROOT, 'docs/user-stories.md'), 'utf8')
// A retired story is struck through and keeps its ID (the product-spec skill's ID rule).
const retired = [...storiesText.matchAll(/^## ~~(S-\d+) /gm)].map((m) => m[1] ?? '')
const stories = [...storiesText.matchAll(/^## (S-\d+) .*\n(?:(?!^## ).*\n)*?- \*\*Status:\*\* (Implemented|Not implemented)/gm)].map(
  (m) => ({ id: m[1] ?? '', status: m[2] ?? '' }),
)
const storyIds = new Set(stories.map((s) => s.id))
const criterionIds = new Set([...storiesText.matchAll(/\*\*(AC-\d+\.\d+)\*\*/g)].map((m) => m[1]))

// Test names, with the rows of it.each and describe.each, whose values fill the name.
function testNames(path: string): { name: string; line: number }[] {
  const sf = ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.ES2022, true)
  const out: { name: string; line: number }[] = []
  const strings = (n: ts.Node) => {
    const found: string[] = []
    visit(n, (m) => {
      if (ts.isStringLiteralLike(m)) found.push(m.text)
    })
    return found
  }
  visit(sf, (n) => {
    if (!ts.isCallExpression(n)) return
    const callee = n.expression
    const plain = ts.isIdentifier(callee) && /^(it|test|describe)$/.test(callee.text)
    const each = ts.isCallExpression(callee) && /^(it|test|describe)\.each$/.test(callee.expression.getText(sf))
    if (!plain && !each) return
    const first = n.arguments[0]
    if (!first || !ts.isStringLiteralLike(first)) return
    const rows = each && ts.isCallExpression(callee) ? callee.arguments.flatMap(strings) : []
    out.push({ name: [first.text, ...rows].join(' '), line: lineOf(sf, n) })
  })
  return out
}

const names = testPaths.flatMap((p) => testNames(p).map((t) => ({ ...t, file: rel(p) })))
const cites = (name: string) => [...name.matchAll(/\b(S-\d+|AC-\d+(?:\.\d+)?)\b/g)].map((m) => m[1] ?? '')

describe('fitness 3: story traceability (docs/user-stories.md)', () => {
  it('finds every story and its status, live or retired', () => {
    expect(stories.length + retired.length).toBe(21)
  })

  const implemented = stories.filter((s) => s.status === 'Implemented')
  it(`every Implemented story has a test citing it (${implemented.length} Implemented, so this passes vacuously while none is)`, () => {
    const untested = implemented.filter(
      (s) => !names.some((t) => cites(t.name).some((c) => c === s.id || c.startsWith(`AC-${s.id.slice(2)}.`))),
    )
    expect(untested.map((s) => s.id)).toEqual([])
  })

  it('no test cites a story or criterion that does not exist', () => {
    const bad = names.flatMap((t) =>
      cites(t.name)
        .filter((c) => (c.startsWith('S-') ? !storyIds.has(c) : !criterionIds.has(c)))
        .map((c) => `${t.file}:${t.line} cites ${c}`),
    )
    expect([...new Set(bad)]).toEqual([])
  })
})

// ---------------------------------------------------------------------------------------------
// 4. Error surface

function unionMembers(typeName: string): string[] {
  const sf = sourceFile(join(SRC, 'shared/messages.ts'))
  let members: string[] = []
  visit(sf, (n) => {
    if (ts.isTypeAliasDeclaration(n) && n.name.text === typeName && ts.isUnionTypeNode(n.type)) {
      members = n.type.types.flatMap((t) => (ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal) ? [t.literal.text] : []))
    }
  })
  return members
}

describe('fitness 4: every error and message is written for a person', () => {
  const texts: [string, Record<string, string>][] = [
    ['ErrorCode', ERROR_TEXT],
    ['NoticeCode', NOTICE_TEXT],
  ]

  it.each(texts)('every %s has a message', (typeName, table) => {
    const members = unionMembers(typeName)
    expect(members.length).toBeGreaterThan(0)
    expect(Object.keys(table).sort()).toEqual([...members].sort())
  })

  const all = [...Object.entries(ERROR_TEXT), ...Object.entries(NOTICE_TEXT), ['FAULT_TEXT', FAULT_TEXT] as const]
  it.each(all)('%s reads as words, with no stack trace, type name or "undefined"', (_code, message) => {
    expect(message.trim()).not.toBe('')
    expect(message).not.toMatch(/\n\s*at\s|\bat\s+\S+\s+\(|\w+\.tsx?:\d+/)
    expect(message).not.toMatch(/\b(Error|TypeError|RangeError|Decimal|ErrorCode|NoticeCode|CalcError|undefined|null|NaN|Infinity|object)\b/)
  })
})

// ---------------------------------------------------------------------------------------------
// 5. Bundle budget

const BUDGET = 150_000

describe('fitness 5: bundle budget', () => {
  it(`gzipped JavaScript stays under ${BUDGET / 1000} kB`, () => {
    const out = mkdtempSync(join(tmpdir(), 'calculator-build-'))
    try {
      execFileSync(join(ROOT, 'node_modules/.bin/vite'), ['build', '--outDir', out, '--emptyOutDir', '--logLevel', 'error'], { cwd: ROOT })
      const js = walk(out).filter((p) => p.endsWith('.js'))
      const gzipped = js.reduce((sum, p) => sum + gzipSync(readFileSync(p)).length, 0)
      expect(gzipped, `gzipped JS is ${(gzipped / 1000).toFixed(1)} kB (${gzipped} bytes), budget ${BUDGET / 1000} kB`).toBeLessThan(BUDGET)
    } finally {
      rmSync(out, { recursive: true, force: true })
    }
  }, 120_000)
})
