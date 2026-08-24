# probe-cr12 — the M2-c Load overwrite confirmation, at `299b842`

**Built at**: `299b842`. **Built for one claim**: that the confirmation shown before an irreversible
Load tells the user what that Load will do.

The dialog is `title: 'Are you sure?'` / `message` / button `'Load'`, so `message` is the entire
informative body. `computeLoadDiff` and `describeLoadDiff` are the **real** functions, and the
incoming object is passed through the **real** `discordMessageImportShape` first, as the Load path does.

Run:

```bash
cd /usr/local/bin/hooks/agent-output/verification/013/probe-cr12-load-confirmation
rm -rf node_modules && ln -sfn /usr/local/bin/hooks/website/node_modules node_modules
npx vitest run --config vitest.cr12.config.ts
```

**Result at `299b842`: 13/13** (`run-cr12-299b842.txt`). Every test asserts behaviour that is
present, so a pass documents the finding rather than denying it.

## What it found (`dialog-table.txt`)

```
  edit text inside a container     -> "No component or mode changes."
  replace a classic message body   -> "No component or mode changes."
  replace all embeds               -> "No component or mode changes."
  collapse 3 containers to 1       -> "No component or mode changes."
  remove an Action Row             -> "This will remove Action Row."
  add a Container + mode switch    -> "This will add Container; switch from Classic to Components V2."
  flag-only mode change            -> "This will switch from Classic to Components V2."
```

The last three are correct and are a genuine improvement on the prior generic sentence. The first
four are overwrites reported as no change — and the first is the **dominant** path, because the modal
is seeded with the current message, so the normal Load is "I edited this JSON and I am loading it back".

Prior text on every path was `This will overwrite the current message.`

## Blocks

| Block | Asserts |
|---|---|
| CR12-A | The dominant path and two siblings (content replaced, embeds replaced) |
| CR12-B | Count and nesting changes are invisible to a type-set diff |
| CR12-C | **Controls** — where a top-level type or the mode really changes, the text is correct and useful |
| CR12-D | The prior text was true on every path; the new text is not |
| CR12-E | The `joinWithAnd` extraction is behaviour-preserving: 2000-case deterministic randomised corpus against the `54fed63` body transcribed verbatim, **with a positive control** and a zero-length check |

## Blind spots — stated at authoring time

- **The dialog is composed here, not rendered.** The repo has no DOM harness, so nothing mounts the
  modal. The composition is read from `JsonModalBody.tsx` at `299b842` and transcribed; a divergence
  between that reading and the real render is outside this probe.
- CR12-E's "old" side is a **transcription** of the `54fed63` `describeDropSet` body, not an import
  from that tree. It establishes that the two bodies agree; that the new body is the one in the tree is
  the `git show` of `src/utils/index.ts` at `299b842`.
- Fixtures are hand-built and validated through the real import shape, so they are well-formed — but
  they are not drawn from real stored messages, which bounds "how common is this" to argument rather
  than measurement.
- The randomised corpus is deterministic by design (a seeded LCG, no `Math.random`), so it is
  reproducible but does not broaden on re-run.
