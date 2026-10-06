# Diagrams

Three flow diagrams, each a Mermaid source (`.mmd`) and the PNG rendered from it. They are embedded in `../architecture.md`.

| File | Shows |
|---|---|
| `user-flow` | How each role moves through the calculator, including the refusal, error and fault paths |
| `app-flow` | The path of one key press through the layers, then every engine state and every way out of it |
| `architecture-flow` | The layers, every import arrow, decimal.js behind its one wrapper, and where the tape and memory live |

The diagrams draw only what the documents already say. If a diagram and a document disagree, the diagram is wrong. Colours and type are the light-theme tokens in `../ux/mockup.html`.

## Regenerate

From this folder, with Node 20.19 or later. mermaid-cli is fetched by `npx` and is not a project dependency.

```sh
for f in user-flow app-flow architecture-flow; do
  npx -y @mermaid-js/mermaid-cli -i "$f.mmd" -o "$f.png" -s 3 -b white -w 2400
done
```

- `-s 3` renders at three times scale, so every label stays sharp when zoomed.
- `-b white` gives a white background.
- `-w 2400` widens the page the diagram is drawn on. At the default 800px, mermaid-cli shrinks wide diagrams to fit, and the labels come out smaller than 16px.
