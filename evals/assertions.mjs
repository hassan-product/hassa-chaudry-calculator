// Deterministic checks, written in JavaScript so they cannot be argued with.

const result = (pass, reason) => ({ pass, score: pass ? 1 : 0, reason })

// Suite A: the skill's job shape.
export function jobShape(output) {
  const text = output.trim()
  const pass = /^When\s.+,\s*I want to\s.+,\s*so I can\s.+$/s.test(text)
  return result(pass, pass ? 'When / I want to / so I can' : `Not in the job shape: ${text.slice(0, 160)}`)
}

// Suite A: words that mean the job has turned into a feature.
const FEATURE_WORDS = ['button', 'screen', 'click', 'tap', 'keypad', 'field', 'display', 'app', 'press']
export function noFeatureWords(output) {
  const found = FEATURE_WORDS.filter((w) => new RegExp(`\\b${w}(s|es|ed|ing)?\\b`, 'i').test(output))
  return result(found.length === 0, found.length ? `Contains: ${found.join(', ')}` : 'No feature words')
}

// Suite B: every criterion line has Given, when and then.
export function givenWhenThen(output) {
  const lines = output.split('\n').filter((l) => /\bgiven\b/i.test(l))
  const bad = lines.filter((l) => !/\bwhen\b/i.test(l) || !/\bthen\b/i.test(l))
  const pass = lines.length > 0 && bad.length === 0
  return result(pass, pass ? `${lines.length} criteria in Given / When / Then` : lines.length ? `Incomplete: ${bad[0]}` : 'No Given lines')
}

const CATEGORY = /^\s*(#+\s*|\*\*|__)?\s*(normal case|invalid input|boundar(y|ies)|very large|after a result|after an error)/i

// Suite B: at least one criterion under a named category heading.
function criteriaUnder(output, heading) {
  const lines = output.split('\n')
  const start = lines.findIndex((l) => CATEGORY.test(l) && heading.test(l))
  if (start === -1) return 0
  let n = 0
  for (const line of lines.slice(start + 1)) {
    if (CATEGORY.test(line)) break
    if (/\bgiven\b/i.test(line)) n++
  }
  return n
}

export function hasInvalidInput(output) {
  const n = criteriaUnder(output, /invalid input/i)
  return result(n > 0, `${n} invalid-input criteria`)
}

export function hasBoundary(output) {
  const n = criteriaUnder(output, /boundar/i)
  return result(n > 0, `${n} boundary criteria`)
}
