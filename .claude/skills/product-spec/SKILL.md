---
name: product-spec
description: Formats and rules for writing roles, jobs and user stories in docs/app-roles.md, docs/jobs-to-be-done.md and docs/user-stories.md. Use whenever adding or changing any of them.
---

# Product spec formats

Three documents, three formats. Follow them exactly.

## Roles: `docs/app-roles.md`, IDs `R-1`, `R-2`, …

> A [role] is [who they are and their situation]. They can [what they see and do]. They must never [what the app prevents].

- Include the "must never" sentence only where it applies.

## Jobs: `docs/jobs-to-be-done.md`, IDs `J-1`, `J-2`, …

> When [situation], I want to [motivation], so I can [outcome].

- Each job names its role (`R-n`).
- A job must be writable without mentioning the app, a screen or a button. If it cannot be, it is a feature, and it does not belong in the jobs doc.

## Stories: `docs/user-stories.md`, IDs `S-1`, `S-2`, …

> As a [role], I want [capability], so that [benefit].

Every story has:
- **Job:** the `J-n` it serves.
- **Status:** `Implemented` or `Not implemented`. Implemented means its criteria pass in tests. Do not round up.
- **Acceptance criteria** in Given / When / Then form, covering:
  - the normal case
  - invalid input
  - boundaries
  - very large and very small numbers
  - what the user can do after a result, and after an error

Every criterion has its own Given, When and Then.

Leave out a category only if it genuinely cannot apply, and say why in one line.

## IDs
- Sequential, never reused, never renumbered. A dropped item is struck through, not deleted.
- Cross-references use the ID (`S-4 serves J-2`), so links survive edits.
- Test names cite the story ID they cover.
