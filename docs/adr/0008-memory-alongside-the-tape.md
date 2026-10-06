# 0008. Memory alongside the tape

- **Status:** Accepted
- **Date:** 2026-10-07

## Context
Memory keys were taken off the table on 2026-10-06, for two reasons. First, recalling a tape line seemed to do the same job. Second, a stored value nobody can see is hidden state, which a calculator meant to be trusted should not have.

Reviewing the mockup showed that the first reason was wrong. A desk checker often builds one total from parts worked out separately, such as the totals of three invoices (J-9). Recall brings back one value; memory keeps adding. Recalling and adding tape lines one at a time reaches the same total, but it takes more steps and makes it easy to miss one.

## Decision
Bring back MC, MR, M+ and M−, alongside the tape and not instead of it.
- Every M+ and M− writes a quiet tape line (`M+ 40, memory 95`).
- An M indicator shows the total, with its ≈, while memory holds a value.
- MR behaves like recalling a tape line.
- Memory survives C and Escape, and is lost on reload like the tape.
- The memory keys have no keyboard key.

## Alternatives rejected
- **Keep the tape only.** It is simpler, with one mechanism and no hidden state. It was rejected because building a running total from recalled lines means one recall and one addition per part, every time, with nothing to show which parts have already been added. That is the kind of slip the product exists to prevent.
- **Memory without tape lines or an indicator,** as on a pocket calculator. This was rejected because it is exactly the hidden state that caused memory to be removed in the first place.

## Consequences
- The two original objections are answered: memory keeps adding, and it is never hidden.
- **Cost:** a fourth row of keys that the everyday user will rarely touch. It is styled quietly, but it is always there.
- **Cost:** the memory keys have no keyboard shortcut, because the usual ones (Ctrl+P, Ctrl+R) belong to the browser. A keyboard-first desk checker has to Tab to them, which is slower than every other action.
- **Cost:** the tape now mixes two kinds of line, and the engine has a second piece of state that clear does not reset. Both have to be explained and tested.
- **Cost:** memory can push a value out of range on its own, so the error path has a new way in.
