---
UUID: 42fff30d
Status: Open
Status-Detail: "preview-image-generator's two deploy workflows carry the /generate API key as a literal, not a GitHub secret. Out of chain 015 by the owner's selection; nothing is changed. This record carries no key value."
Owning-Stage: Unassigned — the owner routes it (fixer or implementer for the workflow change; the owner for rotation, which no agent can perform)
Review-Trigger: When either preview-image-generator workflow file is next edited, when the generator's API key is rotated, or when the repository's visibility is changed or reviewed — whichever comes first.
---

# Handoff — preview-image-generator API key held as a literal in its workflow files

## What is seeded

`preview-image-generator/.github/workflows/prod.yml` and `.github/workflows/preview.yml` each set `API_KEY` in
the "Create .env" step's `env:` block as a literal string, while the same step reads `CDN_KEY` and `CDN_SECRET`
from `${{ secrets.… }}`. The key is the one the website sends as `PREVIEW_IMAGE_API_KEY` to `POST /generate`.

Owed, for whoever the owner routes it to:

1. Move `API_KEY` in both workflows to `${{ secrets.API_KEY }}` (or the repository's chosen secret name), the
   form the CDN credentials in the same step already use.
2. Whether the key must be rotated is the owner's call. It depends on who has read access to the repository and
   its history, and no agent has established that. Rotating also means updating the website's
   `PREVIEW_IMAGE_API_KEY` in Vercel, which is an owner act.
3. Rotation does not remove the value from git history. Rewriting history is a separate act, and it is the owner's.

No value is recorded here or in any chain-015 document.

## Evidence

- At preview-image-generator `471578f`, `grep -c "^ *API_KEY: [A-Za-z0-9]"` returns 1 in `prod.yml` and 1 in
  `preview.yml`, and `grep -c "secrets\.CDN_KEY" prod.yml` returns 1. Both counts were taken by
  planner-hooks-015 on 2026-11-08 without printing any matched line. The last commit to touch `prod.yml` is
  `716e75e`.
- website `7ce866b`: `src/env.mjs` declares `PREVIEW_IMAGE_API_KEY` (2 occurrences, `git grep -c`).

## Origin

Found by the planner during plan 015's entry work (reading `prod.yml` for the M8 deploy path), revision 1. The
owner chose "Agent: handoff, out of chain" at 2026-11-08T04:49Z; the record is
`agent-output/steering/015-rulings.md`, block "2026-11-08T04:49Z". It is plan 015's Exclusions row X-12.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T04:50 | planner (planner-hooks-015) | Created on the owner's selection; no value recorded |
