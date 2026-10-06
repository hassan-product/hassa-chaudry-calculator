---
name: adr
description: Format for architecture decision records. Use when recording a decision that has real alternatives.
---

# Architecture decision records

One decision per file, named `NNNN-short-title.md` (e.g. `0001-decimal-js-for-arithmetic.md`), numbered in sequence. One page at most.

An ADR with no rejected alternative is a note, not an ADR. Do not write it.

## Template

```markdown
# NNNN. Title

- **Status:** Proposed | Accepted | Superseded by NNNN
- **Date:** YYYY-MM-DD

## Context
The forces at play and the problem that needs a decision. Facts, not the answer.

## Decision
What we will do, stated plainly.

## Alternatives rejected
- **Option.** Why it was rejected.
- At least one is required.

## Consequences
What follows, including the bad ones: costs, limits, things now harder.
```

## Rules
- Never edit an accepted ADR's decision. Write a new one that supersedes it, and update the old one's status.
- The date is the day the decision was made, not the day it was written up.
