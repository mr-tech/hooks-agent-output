# Architect conformance probes — plan 018 revision 1

Run 2026-11-20T03:3xZ by `architect-hooks-018` in its session scratchpad, against the zod 3.22.4, superjson 2.2.6 and
TypeScript installs of the shared website tree (read only; nothing was run inside the tree). Node v24.14.0 (type stripping).

- `base.ts` is website `origin/master` `7923a1d` `src/server/api/utils/shapes.ts` with the `~/constants` import pointed at
  `limits.ts` (`src/constants/messageLimits.ts` at `7923a1d` plus the barrel constants `shapes.ts` imports, copied by value).
- `m1.ts` is `base.ts` with one line changed: `discordMessageBaseShape.components` in the length-first form plan 018 OQ-3 names
  (`z.array(z.unknown()).max(MAX_TOTAL_COMPONENTS).pipe(z.array(topLevelComponentShape))`).
- `m1typed.ts` is `m1.ts` with that form behind a helper whose declared type is `z.array(element)`'s output and input (one cast).
- The type checks also need website's `src/@types/global.d.ts` at `7923a1d` beside the file (`git show origin/master:src/@types/global.d.ts`);
  `tsconfig.json` is the template (`FILE` replaced by `base`, `m1` or `m1typed`).

| Capture | What it shows |
|---|---|
| `satisfies-output.txt` | `base`: tsc exit 0. `m1`: tsc exit 2, TS1360 at `messageShape` and `partialMessageShape`'s `satisfies` (input `components` becomes `unknown[]`). |
| `types-output.txt` | Minimal form: the piped schema's `z.input` accepts a wrongly typed element; today's `.max()` form and the typed helper refuse it (errors on lines 10 and 12 only). |
| `refine-output.txt` | `refineDisplayableText` adds a second `too_big` issue at path `components` beside the length issue, under both forms; under `m1` it also runs over an over-limit list whose elements are invalid (`base` aborted there). `m1typed` behaves as `m1`. |
| `output.txt` | Deep container nesting through `JSON.parse`, `superjson.deserialize` and `discordMessageShape`: depth 1050 reaches the schema and parses without a throw under both forms; depth 1100 and above throws in `superjson.deserialize` before the schema. |

Rerun: `node run.mjs <base|m1> <depth>`, `node refine.mjs <base|m1|m1typed>`, `tsc -p tsconfig.<name>.json`, from this directory with
the zod import path in the `.ts` files pointed at an install of zod 3.22.4.
