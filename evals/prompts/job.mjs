import { skill } from './docs.mjs'

export default function ({ vars }) {
  return `You are writing one entry for a jobs-to-be-done document. Follow this skill exactly.

<skill>
${skill()}
</skill>

<situation>
${vars.situation}
</situation>

Write the one job this situation describes, following the skill. Output only the job statement itself, as one sentence: no ID, no role line, no heading, no commentary.`
}
