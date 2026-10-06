# 0004. Immediate execution over operator precedence

- **Status:** Accepted
- **Date:** 2026-10-06

## Context
2 + 3 × 4 is 20 on an adding machine, which runs each operation as entered. It is 14 under mathematical precedence. The desk checker thinks in adding-machine terms. The everyday user may be used to phone calculators. The state machine, and how readable the tape is, both depend on which model is chosen.

## Decision
Use immediate execution: each operation runs when the next operator or = is pressed, so 2 + 3 × 4 = 20. To make the rule visible, the expression line shows the running result as soon as an operator is pressed (`2 + 3 ×` shows `5 ×`). The tape records every step with its running result.

## Alternatives rejected
- **Operator precedence** (2 + 3 × 4 = 14). It matches written maths and many phone calculators. It was rejected because it needs a pending-expression stack, and because it would make the tape show results the user never saw on screen. It also matches the desk checker's mental model less well.

## Consequences
- The engine is a small state machine with one running value and one pending operator.
- Every tape step corresponds to something the user saw.
- **Cost:** anyone expecting 14 gets 20. The running result reduces the surprise but does not remove it.
- **Cost:** brackets cannot be added later without reworking the engine. Precedence and immediate execution do not mix.
- **Cost:** tape lines are longer (`2 + 3 = 5 → × 4 = 20`), because the running results are part of the record.
