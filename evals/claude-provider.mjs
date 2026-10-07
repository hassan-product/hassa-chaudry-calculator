// A promptfoo provider that answers through the Claude Code login already on this machine, by
// running `claude -p`. It uses no API key: ANTHROPIC_API_KEY is removed from the child's
// environment so the login is the only way in. Nothing is written to disk except a temporary
// empty folder, used as the working directory so no project CLAUDE.md or memory is read.
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

export const MODEL = 'claude-sonnet-5-5'

// A plain system prompt instead of Claude Code's own, so the documents under test are the only
// guidance the model gets.
const SYSTEM =
  'You are helping write and check product documents. Answer the request directly and briefly, ' +
  'using only what the request gives you. Do not ask questions back.'

function run(prompt, cwd) {
  return new Promise((resolve, reject) => {
    const env = { ...process.env }
    delete env.ANTHROPIC_API_KEY
    const child = spawn(
      'claude',
      ['-p', '--model', MODEL, '--output-format', 'text', '--tools', '', '--strict-mcp-config',
        '--no-session-persistence', '--system-prompt', SYSTEM],
      { cwd, env, stdio: ['pipe', 'pipe', 'pipe'] },
    )
    let out = ''
    let err = ''
    child.stdout.on('data', (d) => (out += d))
    child.stderr.on('data', (d) => (err += d))
    child.on('error', reject)
    child.on('close', (code) => (code === 0 ? resolve(out.trim()) : reject(new Error(`claude exited ${code}: ${err.trim().slice(0, 300)}`))))
    child.stdin.end(prompt)
  })
}

export default class ClaudeCodeProvider {
  id() {
    return `claude-code:${MODEL}`
  }

  async callApi(prompt) {
    const cwd = mkdtempSync(join(tmpdir(), 'calculator-evals-'))
    try {
      return { output: await run(prompt, cwd) }
    } catch (e) {
      return { error: String(e instanceof Error ? e.message : e) }
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  }
}
