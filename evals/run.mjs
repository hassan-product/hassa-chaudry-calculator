// Runs the eval suites and writes results/<suite>.json and results/summary.md.
//   node evals/run.mjs            all three suites
//   node evals/run.mjs c          one suite
//   node evals/run.mjs a --first  only the first case, to check the setup before a full run
// Needs Claude Code signed in. Uses no API key, and each run uses some of that person's plan.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MODEL } from './claude-provider.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
// The last promptfoo release that runs on Node 20, the project's Node.
const PROMPTFOO = 'promptfoo@0.120.19'

// A, B: generated writing, where one stray case is variance in the model, so one miss is allowed.
// C: one right reading per case; any miss is a question about the documents.
const SUITES = {
  a: { file: 'suite-a-jobs.yaml', name: 'A. Job statement quality', allowedFailures: 1 },
  b: { file: 'suite-b-criteria.yaml', name: 'B. Criteria coverage', allowedFailures: 1 },
  c: { file: 'suite-c-ambiguity.yaml', name: 'C. Specification ambiguity', allowedFailures: 0 },
}

const args = process.argv.slice(2)
const first = args.includes('--first')
const chosen = args.filter((a) => a in SUITES)
const keys = chosen.length ? chosen : Object.keys(SUITES)

const env = {
  ...process.env,
  PROMPTFOO_DISABLE_TELEMETRY: '1',
  PROMPTFOO_DISABLE_SHARING: '1',
  PROMPTFOO_DISABLE_UPDATE: '1',
  // promptfoo keeps its own database of runs; keep it out of the home folder.
  PROMPTFOO_CONFIG_DIR: mkdtempSync(join(tmpdir(), 'promptfoo-')),
}
delete env.ANTHROPIC_API_KEY

for (const key of keys) {
  const suite = SUITES[key]
  const out = join(HERE, 'results', `suite-${key}.json`)
  const cli = ['-y', PROMPTFOO, 'eval', '-c', suite.file, '-o', out, '--no-cache', '--no-progress-bar', '--max-concurrency', '2']
  if (first) cli.push('--filter-first-n', '1')
  console.log(`\n== ${suite.name}`)
  try {
    execFileSync('npx', cli, { cwd: HERE, env, stdio: 'inherit' })
  } catch {
    // promptfoo exits non-zero when a case fails; the summary below reports it.
  }
}

function caseRows(key) {
  const path = join(HERE, 'results', `suite-${key}.json`)
  if (!existsSync(path)) return null
  const data = JSON.parse(readFileSync(path, 'utf8'))
  return data.results.results.map((r) => ({
    case: r.testCase?.description ?? r.description ?? '',
    pass: r.success,
    failed: (r.gradingResult?.componentResults ?? []).filter((c) => !c.pass).map((c) => c.reason),
    output: r.response?.output ?? r.error ?? '',
  }))
}

const lines = [
  '# Eval results',
  '',
  `- **Model:** \`${MODEL}\`, through the Claude Code login (\`claude -p\`), for both the answers and the grading.`,
  `- **Run:** ${new Date().toISOString().slice(0, 10)}, with \`${PROMPTFOO}\`.`,
  '- **Threshold:** suites A and B pass with at most one failing case; suite C passes only with none.',
  '- **Rubrics:** A passes a job when the need would still exist without this calculator and it names no app, screen or button (retype, message and write down are allowed). B passes criteria when each has a Given, a When and a Then that says what is seen, counting phrases the Decisions define as exact; correct, appropriate, gracefully, or wording the Decisions do not fix, still fail. C is unchanged.',
  '',
]
for (const [key, suite] of Object.entries(SUITES)) {
  const rows = caseRows(key)
  if (!rows) continue
  const failures = rows.filter((r) => !r.pass).length
  const verdict = failures <= suite.allowedFailures ? 'PASS' : 'FAIL'
  lines.push(`## ${suite.name}: ${verdict} (${rows.length - failures} of ${rows.length} cases)`, '')
  lines.push('| Case | Result | Why it failed |', '|---|---|---|')
  for (const r of rows) {
    lines.push(`| ${r.case} | ${r.pass ? 'pass' : '**fail**'} | ${r.failed.join(' / ').replace(/\s+/g, ' ').replace(/\|/g, '\\|')} |`)
  }
  lines.push('', '<details><summary>Answers</summary>', '')
  for (const r of rows) lines.push(`**${r.case}**`, '', '```', String(r.output).trim(), '```', '')
  lines.push('</details>', '')
}
if (!first) writeFileSync(join(HERE, 'results', 'summary.md'), lines.join('\n'))
console.log(lines.slice(0, 6).join('\n'))
