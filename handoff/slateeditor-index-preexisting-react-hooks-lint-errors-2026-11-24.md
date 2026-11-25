---
UUID: 67001740
Status: Open
Status-Detail: "Eight eslint errors in website src/components/SlateEditor/index.tsx, present since before plan 019 began. Plan 019 shipped them listed, at website master 48eb60a (2026-11-25T17:39Z); QA's release-tip read still counts 8. The fix goes to the editor rebuild, which rewrites this file. Its sizing document (planning/slate-editor-rebuild-sizing-2026-11-25.md) names this handoff for the rebuild plan to disposition at entry."
Owning-Stage: steering thread for the Slate formatting effort (steering-hooks-fixer), to route the fix (a fixer round or the effort's next plan)
Review-Trigger: "the editor rebuild's scoping determination; or, earlier, when src/components/SlateEditor/index.tsx is next edited outside that rebuild"
---

# SlateEditor/index.tsx: pre-existing react-hooks and unused-variable lint errors

## What is seeded

Eight eslint errors (severity 2, the repo's own `eslint.config.mjs`) in website `src/components/SlateEditor/index.tsx`. Line numbers are
at website `2e36107`, plan 019's M5 hand-off:

- `@typescript-eslint/no-unused-vars`, line 67. In `const handleFocus = useCallback((e?: TouchEvent<HTMLDivElement>) => {`, `e` is unused.
  This is a local fix: drop the parameter or name it `_e`.
- `react-hooks/immutability`, line 93. `useEffect(() => { if (!partialMarkdown) editor.children = descendants; }, [string.split('`').length]);`
  mutates a value passed to a hook. Clearing it moves the mutation, for example into a Slate transform or a ref-held editor, or adds a
  suppression with its reason. That is a behaviour-bearing change to how the editor reloads its content. The effect's observable behaviour
  must be kept, and a test must show it is kept.
- `react-hooks/use-memo`, at six sites. The rule wants an inline function as `useCallback`'s first argument:
  - line 115: `useCallback(onChangeHandler(editor, setDescendants), [])`
  - line 123: `useCallback(renderElementFactory(isEmbed), [])`
  - line 124: `useCallback(RenderLeaf, [])`
  - lines 129 and 130: `onCopy(editor)` and `onCopy(editor, true)`
  - line 141: `useCallback(onKeyDown(editor, partialMarkdown, propsOnKeyDown), [])`

  Each site can be rewritten mechanically, for example `useMemo(() => factory(...), [])`. But memoisation and dependency arrays decide
  closure staleness: `propsOnKeyDown` and `partialMarkdown` are captured once under `[]`. So each rewrite states whether the captured values
  stay frozen, and a test shows the editor's behaviour is unchanged. Why line 124's form trips the rule is not established.

The fix runs inside the Slate formatting effort. His ruling sends every Slate-related fix there, not to the general fixer queue. It comes
after plan 019's one release.

## Evidence

- eslint runs by a `general-purpose-sonnet` helper of `steering-hooks-fixer`, 2026-11-24T03:4xZ. Each ran over `git show <sha>:src/components/SlateEditor/index.tsx`
  on stdin, with the repo's config and the installed `node_modules`. Captures are `verification/019/steering/slateeditor-index-lint/{5ec0621,b04c09f,2e36107}.json`.
  - `5ec0621`, plan 019's chain base (`origin/master` at chain start): 9 errors under the three rules above, among 109 severity-2 messages in all.
  - `b04c09f`: the same; the file is byte-identical to the base.
  - `2e36107`: exactly 8. The ninth, the `decorate` `useCallback`, was converted to `useMemo` by M5.
- **Not established:** the other 100 base messages (`indent`, `react/jsx-*`, `max-len`, `react/no-unescaped-entities`, `import/order`) do not
  appear at `2e36107`, and the helper did not isolate why. `eslint.config.mjs` is unchanged from base to tip, and `package.json` changed no eslint
  entry. The lockfile's eslint and plugin entries were not diffed, so the base verdict under the tip's install is very likely, not proven, the base's own.
- The live site carries these errors today, because `5ec0621` is what was deployed at chain start.

## Origin

`implementer-019`'s M5 hand-off (`implementation/019-slate-formatting-discord-engine-m5-implementation.md`, record `b9e9247c`). It reported
the errors as a `BLOCKED` question with two options. He chose, by selection, "Agent: list them, fix later (Recommended)" (rulings file
`steering/fixer-queue-2026-11-21-rulings.md`, block 2026-11-24T03:4xZ; selection ledger `steering/selection-ledger/2026-11-24.md`).

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-24T03:47 | steering-hooks-fixer | Created on his selection, from the M5 hand-off's BLOCKED question; the evidence is the helper's three eslint captures. |
| 2026-11-25T17:43 | steering-hooks-fixer | The trigger fired at plan 019's production deploy (website `master` `48eb60a`, 17:39Z). Read: `qa/closed/website-48eb60a-release-tip-qa.md` still counts 8 errors. Disposition: the fix is routed to the editor rebuild, whose sizing document names this handoff (§ What it does to 019, the four open handoffs). The trigger now points at that rebuild. |
