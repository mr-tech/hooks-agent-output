---
Origin: fix-v1-guild-messages-auth
UUID: 9c90dfa0
Verified-At: ddbd750c1ab4808317f3408524cf5f9b7d8d0935
Status: Released
Status-Detail: "Released: website master moved to ddbd750, the tip this document verified (deployment/fix-v1-guild-messages-auth-deployment.md, changelog 2026-10-10T16:52). B-1 and B-2 are terminal; B-3 and B-4 ride handoff/fix-v1-guild-messages-auth-post-deploy-2026-10-10.md. The verdict of record stays 'Release Verified at ddbd750' in the Changelog."
Phase: 3
Release: "website — `master`, `f2c85f5` → `ddbd750` (fast-forward; no version field, no tags)"
---

# QA Release-Tip Verification: website 2026-10-10

**Bundled**: one chain, `fix-v1-guild-messages-auth`. Its plan-level verdict is `qa/fix-v1-guild-messages-auth-qa.md`, QA Complete at `Verified-At` 7606149. That verdict stands for its own tree and is not amended here.
**Requested by**: devops Stage 1, `deployment/fix-v1-guild-messages-auth-deployment.md` (agent-output `b5e3a1a`), outstanding item 2, relayed by steering.
**Register**: this record appends no rows. The chain's one register is in `qa/fix-v1-guild-messages-auth-qa.md`, and it is authoritative for B-1..B-4.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-10-10T08:29 | steering (message: devops Stage 1 needs a verdict naming ddbd750) | Release-tip verdict at website ddbd750 | **Release Verified at ddbd750.** The full suite was executed at the tip: 598/598, 54 files, exit 0. Typecheck is clean. QAF-1 is discharged by blob equality, so the production bytes equal the tree verified at 7606149. |
| 2026-11-10T08:40 | steering-cleanup (project cleanup, on the owner's word) | Document closed | Status: Released (was `Release Verified`, which stays the verdict of record). The release executed at exactly the verified tip `ddbd750` (deployment record, changelog 2026-10-10T16:52: master = ddbd750 on origin, Vercel live). `Status-Detail` replaced: it still said the deploy was held on B-1 and B-2, both terminal since 2026-10-10. No verdict or body text changed. |

## The tip

The assembled tip is the chain head itself. A merge of `fix/v1-guild-messages-auth` onto `master` is a fast-forward, so no merge tree is constructed.
- `git -C website merge-base --is-ancestor 7606149 ddbd750` exits 0.
- `master` and `origin/master` both resolve to `f2c85f5c7e…`, read locally with `git rev-parse`. Devops recorded the remote ref by `git ls-remote`.
- `git log --oneline f2c85f5..ddbd750` lists 4 commits: 1acffee, c8c3d70, 7606149 and ddbd750. There is no other chain and no shared-branch work in the tip, so step 3 (plans in combination) has a single member and no interaction to test.

**Delta from the plan-level verdict.** `git diff --numstat 7606149 ddbd750` shows 1 path, +6/−0: `src/server/api/v1/__tests__/guildMessages.statbot-key-required.test.ts`. Its blob at ddbd750 is `7dcbfa69ca1e49c5b690dbe43de9549438630548`, the hash QAF-1's discharge condition names. **QAF-1 is discharged.**
- No production file moved. The plan-level C-1..C-3 HTTP and mutation evidence therefore binds ddbd750's production bytes.
- The patched test's mutant runs were executed on content byte-equal to this file (`verification/fix-v1-guild-messages-auth/qa-cr1-ended-assertion-runs.txt`).

## Execution at ddbd750

The export was made with `git archive ddbd750 | tar -x`, `node_modules` linked, and the gitignored `next-env.d.ts` copied in. Blob identity is 378/378 files under `src`, checked with `git hash-object` against `rev-parse ddbd750:<path>`.

Fences:
- `DATABASE_URL` and Redis on dead ports;
- `STATBOT_API_KEY` and `SKIP_ENV_VALIDATION` unset;
- no `.env*`;
- no request to production.

| Check | Result | Exit | Capture |
|---|---|---|---|
| Full suite (`vitest run`, JSON) | 598 total, 598 pass, 54 files, `success: true` | 0 | `verification/fix-v1-guild-messages-auth/qa-suite-ddbd750.json` |
| File membership vs `qa-suite-7606149.json` | identical path sets. The +6 cases are the patch's 3 new refusal rows × 2 endpoints | n/a | n/a |
| `pnpm run typecheck` (both programs) | clean | 0 | `verification/fix-v1-guild-messages-auth/qa-typecheck-ddbd750.txt` |

No gated time-based set exists in `website`: `package.json` scripts and `vitest.config.ts` define none.

**Not run here.** These are devops's Phase 2A steps or post-deploy rows, not this verdict's:
- `next build` at the tip (deployment record, item 3);
- the redirect premise (the plan-level Assumption Not Checked);
- B-3 and B-4.

## Verdict

**Release Verified at website `ddbd750`.**
- This is a verdict on the tree. It does not authorise the release: B-1 (owner key check) and B-2 (`HOOKS_HOST` read) remain BLOCKING RELEASE CONDITIONS in the chain register.
- Any change to the tip expires this verdict.

## Assumption Not Checked

This pass assumes that Vercel builds the tip it is given unchanged, and it does not test this: no `next build` ran here. If the build fails or diverges, the deploy either does not ship or ships a stale tree. The observable signature is B-3 returning `200`. The owner of the check is devops: the Phase 2A build, then B-3.
