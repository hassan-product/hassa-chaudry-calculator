# 0010. Run the evals through the Claude Code login

- **Status:** Accepted
- **Date:** 2026-10-07

## Context
The product rests on written context: the Decisions in `CLAUDE.md`, the engine rules in `architecture.md`, and the product-spec skill that later sessions follow. If that writing can be read two ways, a later session will build the wrong thing, and no test of the code catches it. Checking the writing means giving it to a reader and seeing what comes back. The calculator has no model in it, a reviewer runs it with Node only, and the project has no secrets, keys or backend.

## Decision
Evals live in `evals/` as promptfoo suites. A small wrapper runs `claude -p` through the Claude Code login already on the machine, and the same wrapper grades the rubric assertions. The wrapper removes any API key from the environment, works from an empty folder so no project memory leaks in, and writes nothing but the results. The evals are not part of `npm test` and do not run in CI. The raw results and a readable summary are committed, naming the model and the pass threshold.

## Alternatives rejected
- **An API key.** It would make runs repeatable in CI. It was rejected because it puts a secret into a project that has none, and a reviewer would need a paid key just to run the checks.
- **A free local model.** No key, no cost. It was rejected because a model small enough to run on a laptop misreads plain rules often enough that a failure would say more about the model than about the writing.
- **Checking the documents with no model at all**, with linting, keyword rules and structure checks. It is free and exact. It was rejected because it can check shape, such as Given/When/Then and the banned words, but not meaning: whether two rules can be read two ways is a question only a reader can answer.

## Consequences
- The written context has a check that can fail, and a failure in the ambiguity suite is fixed in the document first.
- Anyone with no Claude login can still read what happened, from the committed results.
- **Cost:** the model checking the documents is the same family as the model that wrote them, so it may share the writer's blind spots and read an ambiguity the way the writer meant it.
- **Cost:** a later run can differ from a saved one, because the model changes and its answers vary. That is why the saved results name the model and the threshold, and why one run is evidence, not proof.
- **Cost:** each run uses some of the runner's Claude plan, and needs Claude Code signed in.
