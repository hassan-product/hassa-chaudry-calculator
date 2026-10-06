# 0001. Layered domain separation

- **Status:** Accepted
- **Date:** 2026-10-06

## Context
The product's promise lives in calculation rules: exact decimal results, the ≈ mark, the typing limits, the error state. Those rules must be testable without a browser, and a reviewer must be able to find them without reading React code. In a small React app, logic tends to drift into components and hooks, where it is tested only through the DOM.

## Decision
Split `src/` into four layers:
- `domain`: pure calculation, with no React and no DOM.
- `app`: hooks that wire the domain to the UI.
- `ui`: components, CSS Modules and tokens.
- `shared`: types and constant tables only.

Dependencies point inwards only: `ui → app → domain`, and any layer may use `shared`. The exact forbidden imports are listed in `architecture.md` and will be enforced by a test.

## Alternatives rejected
- **Logic in components and one `useReducer`.** This means fewer files and is normal for an app this size. It was rejected because the calculation rules could then only be tested through rendering, and nothing would stop a component doing arithmetic on its own.
- **Feature folders** (`keypad/`, `tape/`, each with its own logic and view). This was rejected because the engine is shared by every feature, so it would end up in a common folder anyway, without the rule about which way imports may point.

## Consequences
- The engine, typing, paste and formatting rules are plain functions with table-driven tests and no rendering.
- **Cost:** more files and more indirection than a one-screen app strictly needs. A reviewer has to follow a key press through three layers.
- **Cost:** the UI never touches domain types, so there is a view-model mapping to write and keep in step with the engine.
- **Cost:** the import rules are only as good as the test that enforces them. Until that test exists, the split is a convention.
