// Reads the documents under test fresh on every run, so a fix to a document is what gets tested.
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const read = (path) => readFileSync(join(ROOT, path), 'utf8')

// From a heading to the next heading of the same level or higher.
function section(text, heading) {
  const start = text.indexOf(heading)
  if (start === -1) throw new Error(`missing section: ${heading}`)
  const level = heading.match(/^#+/)[0].length
  const rest = text.slice(start + heading.length)
  const next = rest.search(new RegExp(`\\n#{1,${level}} `))
  return heading + (next === -1 ? rest : rest.slice(0, next))
}

export const skill = () => read('.claude/skills/product-spec/SKILL.md')
export const decisions = () => section(read('CLAUDE.md'), '## Decisions')
export const engineRules = () => {
  const arch = read('docs/architecture.md')
  return [decisions(), section(arch, '## Engine states'), section(arch, '## Memory')].join('\n\n')
}
