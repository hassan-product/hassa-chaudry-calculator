import { engineRules } from './docs.mjs'

export default function ({ vars }) {
  return `These are the rules for a calculator's engine. They are the only source of truth.

<rules>
${engineRules()}
</rules>

Using only these rules, what should happen in this situation? Say what the display shows afterwards, and whether a tape line is written. Answer in at most three sentences. If the rules do not settle it, say so plainly instead of guessing.

<situation>
${vars.situation}
</situation>`
}
