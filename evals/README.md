# Evals

These test the **written context**, not the calculator. The calculator has no model in it and gets none. What is under test is whether the documents a later session builds from are clear enough to be followed one way:

| Suite | Under test | Checks |
|---|---|---|
| A. Job statement quality | `.claude/skills/product-spec/SKILL.md` | A job written from the skill alone has the *When / I want to / so I can* shape, uses none of *button, screen, click, tap, keypad, field, display, app, press*, and describes a need that would exist without software. Two of the seven cases are awkward: the obvious phrasing smuggles a feature in. |
| B. Criteria coverage | the skill and the Decisions in `CLAUDE.md` | Criteria written for a story are Given / When / Then, include at least one invalid-input and one boundary case, and could be run by a tester without a judgement call. |
| C. Specification ambiguity | the Decisions in `CLAUDE.md`, and the Engine states and Memory sections of `docs/architecture.md` | Given only those, the model answers nine edge cases the way the documents mean. A failure here is fixed **in the document**, never by loosening the expected answer. |

The JavaScript checks are exact. The rubric checks are graded by a model.

## How it runs

Through the Claude Code login already on your machine. `claude-provider.mjs` runs `claude -p` for each answer, and the same wrapper grades the rubric checks.

- **No API key.** The wrapper removes `ANTHROPIC_API_KEY` from the child's environment, so the login is the only way in. Nothing is written into a file and nothing is echoed.
- **Nothing else leaks in.** Each call runs from an empty temporary folder, with no tools, no MCP servers and a plain system prompt, so the documents in the prompt are the only guidance.
- **It uses your plan.** One full run is 20 answers and 20 gradings, about 40 calls on `claude-sonnet-5-5`.
- **Not part of `npm test`, and not in CI.** A reviewer runs the app with Node only (ADR 0010).

## Run it

Needs Node 20.19 or later and Claude Code signed in (`claude` on the path). promptfoo is fetched by `npx`, pinned to 0.120.19, the last release that runs on Node 20.

```sh
node evals/run.mjs a --first   # one case, to check the setup
node evals/run.mjs             # all three suites
node evals/run.mjs c           # one suite
```

## Results

`results/suite-a.json`, `suite-b.json` and `suite-c.json` are promptfoo's raw output. `results/summary.md` is the readable version: each case, its result, why it failed, and the answer itself. Both are committed so anyone without a Claude login can read what happened.

- **Model:** `claude-sonnet-5-5` produced the saved answers and graded them.
- **Threshold:** suites A and B pass with at most one failing case; suite C passes only with none.
  - A and B judge generated writing, where one stray case is variance in the model rather than a fault in the skill.
  - C has one right reading per case, so any miss is a question about the documents.
- **A later run can differ.** The model changes and its answers vary. A saved result is evidence about the documents as they stood, with the model and threshold named, not a guarantee.
- **Same family.** The model checking the documents is the same family as the model that helped write them, so it may share their blind spots.
