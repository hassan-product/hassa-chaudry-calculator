import { decisions, skill } from './docs.mjs'

export default function ({ vars }) {
  return `You are writing acceptance criteria for a user story. Follow this skill exactly, and take the behaviour from the decisions.

<skill>
${skill()}
</skill>

<decisions>
${decisions()}
</decisions>

<story>
${vars.story}
</story>

Write the acceptance criteria for this story, following the skill. Output only the criteria, grouped under the skill's category headings.`
}
