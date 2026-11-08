---
ID: 015
Origin: 015
UUID: 861e5f61
Status: In Progress
Status-Detail: "Implementation started on rev 7 (rulings block 'implementation start recorded', 7efd8b0). Revision 8 folds AF-16, L-C2-4, QAF-8 and QAF-9 into M1-c's no-account and ordering text and M8-0's run-2 read. The critic, the architect and QA each re-read that delta. Until they pass it, the implementer holds only M1-c's no-account and ordering cells; the analyst's run-2 extension of pig-host-read.sh waits on Planner batch row QAF-10."
Revision: 8
Target Release: "website master → the chain-015 merge SHA (Vercel production); preview-image-generator prod → the chain-015 merge SHA (prod.yml; no preview leg, D16). Neither package carries a version artefact."
Epic-Alignment: "none registered — no roadmap exists (agent-output/roadmap holds only .gitkeep, read 2026-11-08); the source of the effort is research/codebase-bug-evaluation-2026-11-08.md (aea4a05)"
Lane: "standard — agent-output/README.md carries no small-lane section (grep -i small, 0 hits, 2026-11-08); the blast radius spans the save schema, a bot command's permissions and a production PM2 service, none a leaf"
Architectural-Surface: "none added. Two record lines are touched — see § Architecture lines this chain touches"
---

# Plan 015 — Bug-evaluation fixes (website, preview-image-generator)

## Reading Order

Authoritative routing for every consuming role. Sections not named here are reference, reached when a named
section cites them; the critic reads the whole plan.

| Role | Sections, in order |
|---|---|
| implementer | Decisions Register → Plan → the milestone being implemented (M0 first) → Testing Strategy → Exclusions |
| code-reviewer | Decisions Register → the milestone under review → Testing Strategy → Architecture lines this chain touches |
| qa | Testing Strategy → Plan → each milestone → Validation → Risks |
| uat | Value Statement and Business Objective → Validation → M2 → M3 → M6 |
| devops | M9 — Release (devops; owner steps named) → M8 → Entry work (2026-11-08) → Risks |

Owed re-verdicts:

| Limb | Decidable since | Owning gate | State |
|---|---|---|---|
| M8 (rewritten for D16–D18 and run 1) | rev 4 | critic, architect | approved (critic c1p2 `3398fc0`; architect `192ec29`) |
| M1-a (widened to four sites) | rev 4 | critic, architect | approved (same) |
| M6-l (iii)–(v) | rev 4 | critic, architect | approved (same) |
| M8-a (2), M8-0 run 2, M9 (D19) | rev 5 | critic | approved (critique closed `dee418b`) |
| M1-c clear-out cells; M1-d limit; M2 QAF-1 note; P3 idle cell; M8 E-1 and M8-c route | rev 6 | critic (new cycle), architect, qa | M1-d approved by all three. The rest drew findings (critic `39fb6b9`; architect `1be7e72`; QA `2e4d4d5`), folded at rev 7 |
| M1-c no-account cell; M2 QAF-1 note; P3 pool read and run-2 read; M8 E-1 (loopback, self-check, install location); M8-c browser source and fallback | rev 7 | critic (cycle 2 pass 2), architect, qa | approved (critic `1ce2ae4`; architect `592eb23`; QA `ba277d8`), with AF-16, L-C2-4, QAF-8 and QAF-9 folded at rev 8 |
| M1-c no-account cell and ordering anchor; the session row moved outside M1-c; M8-0 run-2 span and its pool-creation read | rev 8 | critic, architect, qa (delta only) | open |

## Changelog

| Date | Rev | Author | Change |
|---|---|---|---|
| 2026-11-08T04:43 | 1 | planner (planner-hooks-015) | Created. ID minted on the owner's selection (04:39Z). Source: `research/codebase-bug-evaluation-2026-11-08.md` at agent-output `aea4a05`; scoping: `steering/015-rulings.md` (committed as `bug-fixes-rulings.md`) block "2026-11-08T04:37Z — scoping determination" (`a111e80`). Scope delta: none (first revision); the plan carries 48 of the 50 rated findings in ten milestones (M0–M9), the original ask being the 50-finding pool. |
| 2026-11-08T04:51 | 2 | planner (planner-hooks-015) | Folds the owner's answers in `steering/015-rulings.md` block "2026-11-08T04:49Z" (`e8631f8`): OQ-A–OQ-F closed, D3–D5 confirmed, D7–D13 registered, F-31 analyst commissioned, API-key handoff written (X-12). Scope delta: F-44 joins M6 as M6-l (allow the add, mark the message invalid); X-2 and X-3 removed; M8 gains M8-0, an owner-run read that replaces limb (3)'s `claude-ro` read; M0 is settled as deleting the stale directory. The plan now carries 49 of the 50 findings, the original ask being 50. |
| 2026-11-08T04:58 | 3 | planner (planner-hooks-015) | Folds analysis `analysis/015-bug-evaluation-fixes-analysis.md` (`7e24de3`): under PM2 the drain never runs, because `shutdown_with_message` sends an IPC message, not SIGINT. Scope delta: M8-a is rewritten as P1–P4 with `kill_timeout` 12000 ms; M8-0's commands and prediction come from the analysis, which writes the script; RK-5 is added (Chromium after SIGKILL on PM2 7.x); the architecture-line entry now proposes the correction. Sized against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:12 | R-1 | planner (planner-hooks-015) | Registered D14 and D15 from `steering/015-rulings.md` block "2026-11-08T05:11Z" (`9247ddb`). Scope delta: none, registration only. |
| 2026-11-08T05:28 | 4 | planner (planner-hooks-015) | Folds critique `critiques/015-bug-evaluation-fixes-critique.md` cycle 1 pass 1 (`68308e8`): H-1, M-1 to M-4, L-1 to L-5 (L-2 is moot under D17), Q-2. Also folds the architect's findings (`b838a01`: AF-1 to AF-4), the rulings blocks 05:21Z, 05:24Z and 05:26Z (D16 to D18; D11 and D12 superseded), and M8-0 run 1 (`fe27690`, `1fc16f5`). Scope delta: M1-a widens to four `in` sites. M6-l gains its stored-`valid` residue (X-13), the no-live-sends constraint (X-14) and a home for the shared counter. M8 loses its preview leg, M8-0 becomes an agent read with run 1 done, and M8-a is bound to a verifying stop of the new code with a fixed log-line predicate. RK-6 and a Reading Order are added. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:33 | 5 | planner (planner-hooks-015) | Folds D19 (rulings block 05:29Z, `fa693e0`: the verifying stop is devops' `prod.yml` re-run), critique cycle 1 pass 2 L-6 to L-9 (`3398fc0`), and architect AF-11 and AF-12 (`192ec29`). Scope delta: M8-a (2)'s cause moves from the owner's `pm2 reload` to a devops re-run, which is a second production deploy needing his approval. M8-0 run 2's reader is devops. Stop (1) is restated as a 12 s delay, not downtime. M1-a's route statement is corrected. D15 is brought current; X-15 carries the June–August gap. No criterion changes. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:35 | R-2 | planner (planner-hooks-015) | Registered D20 from `steering/015-rulings.md` block "2026-11-08T05:33Z" (`d852da1`), plus a Planner batch row for the body text it releases. Scope delta: none, registration only. |
| 2026-11-08T05:43 | 6 | planner (planner-hooks-015) | Folds QA Phase 1's batch QAF-1 to QAF-5 (`qa/015-bug-evaluation-fixes-qa.md`, `bf15750`; QA read rev 4) and the D20 Planner batch row. Scope delta: M1-c gains clear-out cells for a failed revoke and a missing account; P3 gains the idle-process cell; M8's local route carries entry condition E-1 (no credentials, no network, no CDN write); M2 names the transcribed-schema test it rewrites; M1-d and X-16 state the concurrency limit; M8-c runs locally with a browser under D20. Opens a new critique cycle (criterion text changed). Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:48 | 7 | planner (planner-hooks-015) | Folds the three gate results on rev 6: critique cycle 2 pass 1 (`39fb6b9`: M-C2-1 to M-C2-3, L-C2-1 to L-C2-3), the architect's delta (`1be7e72`: AF-13 to AF-15) and QA's re-key (`2e4d4d5`: QAF-6, QAF-7). Scope delta: E-1 brings loopback up, gains a self-check and installs inside the export; M8-c names its browser source and gets back its code-review fallback; M1-c's no-account cell names the two keys it clears and the `user-guilds` residue; P3 places the pool read in `getPool.ts` and names run 2's request read; M2's note becomes a property that cites QA. Criterion text changed, so the critic, the architect and QA each re-read. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:51 | 8 | planner (planner-hooks-015) | Folds four findings on rev 7: architect AF-16 (`592eb23`), critique L-C2-4 (`1ce2ae4`), and QA QAF-8 and QAF-9 (`ba277d8`). It is the first revision since implementation approval (rulings `7efd8b0`), and it triggers one delta round from each of the three gates. It is not a milestone-level scope delta. M1-c's deliverable is unchanged and no work is added. The text now attributes the session-row deletion to next-auth's adapter, as all three gates read it. QAF-8 is RK-6's second member and is remedied by the property over the class. Scope delta: in M1-c, the no-account cell drops the session-row limb, the session row is placed outside M1-c, and the ordering anchor becomes the `Accounts` update. In M8-0, every run-2 read is bounded to the stopped process's span, and pool creation is read from `Created instance` lines. Against the ask: 49 of 50 findings, unchanged. |
| 2026-11-08T05:53 | R-3 | planner (planner-hooks-015) | Parked QA's QAF-10 (`c2a657a`) as a Planner batch row. Its words are in `qa/015-bug-evaluation-fixes-qa.md`. Scope delta: none, registration only. |
| 2026-11-08T05:56 | R-4 | planner (planner-hooks-015) | Recorded critique cycle 3 pass 1, APPROVED on rev 8 (`f64ae27`). M-C3-1 joins the QAF-10 batch row, and L-C3-1 gets its own batch row. Their words are in `critiques/015-bug-evaluation-fixes-cycle3-critique.md`. Scope delta: none, registration only. |
| 2026-11-08T05:54 | impl | implementer (implementer-hooks-015) | Status → In Progress. Implementation starts at M0 on the chain branch, entry conditions recorded in `implementation/015-bug-evaluation-fixes-m0-implementation.md`. No criterion text touched. |
| 2026-11-08T06:03 | cr | code-reviewer (code-reviewer-hooks-015) | Round 1, M0 only, at website `037935d`: APPROVED_WITH_COMMENTS (CR-1 LOW, CR-2 INFO), `code-review/015-bug-evaluation-fixes-code-review.md`. The review is milestone-scoped, so plan Status is unmoved. |

## Value Statement and Business Objective

As a **community leader building Discord messages in Hooks.gg**, I want the defects the 2026-11-08 bug evaluation
found in the editor, the save path, the bot and the preview service fixed, so that **what I build is what saves,
what sends and what the preview shows** — a black embed saves, a Cancel key press never deletes, a multi-line code
block renders, a moderator with Manage Server can use *Get Message*, and a user who administers no server can open
the message list. This serves the Master Product Objective as the workspace README states it: a WYSIWYG Discord
message builder that sends through webhooks.

## Decisions Register

| # | Decision (every operative clause) | Date | Owner's words, verbatim — route | Reopened by | Consequence |
|---|---|---|---|---|---|
| D1 | Open chain 015 for this effort. | 2026-11-08 | "Agent: open the chain" — selection-prompt answer to the planner, 04:39Z, this session. | Owner withdrawal only. | ID 015 minted; `.next-id` → 16. |
| D2 | Start the chain; `researcher-competitors` holds Playwright, so no stage starts, stops, reinstalls or reconfigures Playwright or its browsers, or kills a browser process, while it is live; a stage needing a browser asks steering first. | 2026-11-08 | "Start the chain. Note that `researcher-competitors` is currently using playwright." — relayed by steering-bug-fixes, rulings block 04:37Z (`a111e80`). The constraint's operative clauses are steering's wording (agent-authored). | `researcher-competitors` no longer live (session-liveness read), or owner withdrawal. | Every browser-run criterion is placed behind a steering go (§ Testing Strategy). |
| D3 | A username stays required to send; no defect (OQ-1). | 2026-11-08 | "Even though it's not required by Discord, it's not always possible to know what webhook the user is going to send it as ahead of time, and I don't think it's necessarily bad UX to just make them set it explicitly so they know for sure what it's going to look like. This is a WYSIWYG editor after all." — **as recorded in the research document** (`aea4a05`); not yet confirmed by steering in this session. | Owner withdrawal; steering's confirmation differing from the record. | No milestone touches `validateMessage`'s username rule. |
| D4 | `get_message` is usable by members holding Manage Server (OQ-2); the value that expresses it is `ManageGuild` alone. | 2026-11-08 | "Manage Server is probably fine. Tengentially [sic] related, the system needs RBAC controls." — recorded in the research document (`aea4a05`), and confirmed as his by selection ("Agent: use both as rulings"), relayed by steering-bug-fixes, rulings block 04:49Z (`e8631f8`). The `ManageGuild`-alone reading is the researcher's (agent-authored, F-28 correction). | Owner withdrawal; a Discord observation (M7-a's check) that a Manage-Server-only member still cannot see the command after the push. | M7. |
| D5 | The message cap is 1000: the 1001st new message is refused (OQ-3 → planner's call). | 2026-11-08 | "idk" — recorded in the research document and confirmed as his by the same selection (04:49Z, `e8631f8`). The call is the planner's (agent-authored): the code's own error text, "limit of 1000", is the only statement of intent there is. | Owner states a different cap. | M1-d. |
| D6 | The candidate pool is F-1–F-50; H-1–H-8, the eleven handoffs in research § Findings 7, the RBAC remark and any security assessment are out; recommendation limbs (1)–(3) are in as owner-side checks, (4) out. | 2026-11-08 | Steering's scoping determination under "Start the chain" (agent-authored by steering-bug-fixes, `a111e80`). | Owner withdrawal. | § Exclusions rows X-5–X-8. |
| D7 | The implementer deletes `website/.next/dev/types` at M0; the typecheck gate is the repo's own `pnpm run typecheck`. | 2026-11-08 | "Agent: delete stale dir" — selection-prompt answer relayed by steering-bug-fixes, block 04:49Z (`e8631f8`). | `pnpm run typecheck` red at the base after the deletion. | M0. |
| D8 | F-43: footer bound 2048 in both the editor and the save check. F-40: an image URL is valid when its path ends in png, jpg, jpeg, webp, gif, apng, tiff or webm, in any case, with the query string ignored; avif is excluded. | 2026-11-08 | "Agent: fix both" — selection, same block. The option text was the planner's (agent-authored, rev-1 relay). | Owner withdrawal; a Discord read showing a listed extension unrendered. | M2-d, M6-b. |
| D9 | Every duplicate, top-level and nested, inserts the copy after the original. | 2026-11-08 | "Agent: both after" — selection, same block. | Owner withdrawal only. | M6-i. |
| D10 | F-44: an add that crosses the 40-component cap goes through, and the message is marked invalid until fixed. | 2026-11-08 | "Agent: allow, mark invalid" — selection, same block, chosen against the planner's recommendation. | Owner withdrawal only. | M6-l. The criterion's wording is the planner's reading of "allow" (§ M6-l). |
| D11 | M8 stays in the chain; it deploys to the preview instance first, then prod; the planner commissions the F-31 analyst. | 2026-11-08 | "Agent: keep, preview first" — selection, same block. | Owner withdrawal; the preview deploy failing (RK-3). | **Superseded by D16** (05:26Z): the preview leg is withdrawn; M8 stays and the analyst was commissioned. |
| D12 | The generator host is a DigitalOcean box with no read-only user, so no agent reads it. | 2026-11-08 | "pretty sure it's a digital ocean box. there is no ro user on it" — his own words, relayed by steering, same block. | A read-only user created there. | **Reopened by its own class** (a read-only user created; reachability read 05:20Z) and **superseded by D17**. |
| D13 | The plain-text API key in the generator's workflows goes to a handoff, out of chain, recording no value. | 2026-11-08 | "Agent: handoff, out of chain" — selection, same block. | Owner withdrawal only. | X-12. |
| D14 | M6-l's reading of D10 stands: every add completes; the existing top-level refusal at 40 stays; a total over 40 fails `validateMessage`, so Send is blocked and `valid` is false. | 2026-11-08 | "Agent: use this reading" — selection relayed by steering-hooks-015, rulings block 05:11Z (`9247ddb`). The option text is steering's (agent-authored). | Owner withdrawal only. | M6-l unchanged; the reading is now his. |
| D15 | He will create a read-only user on the generator host himself; steering supplies the commands and the firewall rules. | 2026-11-08 | "give me the code to add the ro user to the box, in addition to what firewall rule(s) to add" — his own words, relayed by steering-hooks-015, block 05:11Z (`9247ddb`). | Owner withdrawal; the user's absence on a reachability read. | **Met** 05:20Z (steering's reachability read); for M8-0's route, **superseded by D17**. |
| D16 | M8 deploys straight to prod, and the `preview` branch is deleted. | 2026-11-08 | "straight to prod. delete the preview branch" — his own words, relayed by steering-hooks-015, block 05:26Z (`a16e431`), given after steering told him the branch is 0 commits ahead of prod and no preview app exists. Steering deleted the branch on his word. | Owner withdrawal only. | M8 has no beta host. The transition stop and the verifying stop are both on production (M8-a). |
| D17 | `claude-ro` reads on the generator host are standing: reads only, never a pm2 command, never a write. | 2026-11-08 | "Agent: standing reads" — selection relayed by steering-hooks-015, block 05:21Z (`42354bf`); the option text is steering's (agent-authored). | Owner withdrawal; the access removed. | M8-0 is an agent read. |
| D18 | Root `dump.pm2` is read only through a host-side filter that prints name, `kill_timeout` and `shutdown_with_message` per app; env is never printed. `/home/nodejs/.pm2/dump.pm2` is never opened. | 2026-11-08 | "Agent: filtered extract only" — selection, block 05:24Z (`8d2d82f`); "You: remove the access" for the nodejs dump — selection, block 05:21Z. The option texts are steering's (agent-authored). | Owner withdrawal only. | M8-0's dump read. |
| D19 | M8's verifying stop is caused by devops re-running `prod.yml` through `workflow_dispatch` after the prod push; that run is a second production deploy and needs his approval like any prod push; an agent reads the result over `claude-ro`. | 2026-11-08 | "Agent: re-run prod.yml" — selection relayed by steering-hooks-015, block 05:29Z (`fa693e0`); the option text is the planner's (agent-authored, rev-4 relay). | Owner withdrawal only. | M8-a (2), M8-0 run 2, M9. |
| D20 | The Playwright constraint of D2 is lifted: chain-015 stages may use Playwright and browsers; installing or upgrading Playwright is not implied. | 2026-11-08 | "the researcher is done. playwright is now available" — his own words, relayed by steering-hooks-015, block 05:33Z (`d852da1`). | Owner withdrawal only. | Retires D2's constraint class. It releases the steering-go gates at § M8's verification paragraph (M8-c may run locally with a browser), § Testing Strategy (agent browser use) and RK-5's untested note. The body text is folded at the next planning pass (Planner batch). |

## Objective

Fix 49 rated intent-vs-execution defects at their sites, each under a property-form criterion with a red test where
the repository carries a runner, ship them to production on website and preview-image-generator, and run the three
owner-side checks the scoping admitted.

## Assumptions and open questions

Every finding's location and rating were read at the same SHAs as today's tips: website `7ce866b`,
preview-image-generator `471578f` (prod), project-utils `749606d` (`git rev-parse`, 2026-11-08, equal to
`git ls-remote` heads). The research's ratings are carried, not re-rated. Spot re-reads this pass (`grep -rn` at
`7ce866b`): the dead compare `tagName !== '~/components/Button'` at exactly three sites (`grep -rc "tagName !==
'~/components/Button'" src`, 3 files at 1 each, re-run 2026-11-08; `grep -rln "useHotkeys(\['enter'\]" src` names
the same three) (`ConfirmationDialog.tsx` `Inner`,
`WarningDialog.tsx` `WarningDialog`, `ImageUploader.tsx` hotkey handler); `ADMIN_PERMS` in
`bot/scripts/app_commands/common.ts`, consumed by `messageCommands.ts` only; `MAX_EMBED_FOOTER_TEXT_LENGTH = 256`
feeding `shapes.ts` `embedShape` and `EmbedFooter.tsx`; `~/components/Button` renders a `<button>` element
(`Button.tsx`).

- OPEN QUESTION [RESOLVED]: OQ-A (typecheck gate) — D7. The gate fails only because of
  `.next/dev/types/validator.ts`: the planner's run at `7ce866b` exited 1 with 2 `error TS` lines, both in that
  file. The file is git-ignored output of a 2026-09-08 `next dev`.
- OPEN QUESTION [RESOLVED]: OQ-B (what the editor allows, `website.md` W-2) — D8.
- OPEN QUESTION [RESOLVED]: OQ-C (F-49 placement) — D9.
- OPEN QUESTION [RESOLVED]: OQ-D (F-44) — D10; F-44 is in, as M6-l.
- OPEN QUESTION [RESOLVED]: OQ-E (preview-image-generator) — D11. M8 is the service's first deploy since
  2023-08-22 (`git log -1 prod`), on a self-hosted runner. `prod.yml` keys the cached `node_modules` on the
  lockfile, runs `npm run build`, then `.github/deploy.sh` → `pm2 startOrReload ecosystem.config.js --update-env`.
- OPEN QUESTION [RESOLVED]: OQ-F (generator host) — D12. No agent reads the host; limb (3) becomes owner step M8-0.
- Analysis complete: `analysis/015-bug-evaluation-fixes-analysis.md` (`7e24de3`), F-31's premise.
  - **Stop path.** Read from PM2 source at 5.3.0, 5.4.3, 6.0.14 and 7.1.2. With `shutdown_with_message: true`,
    `lib/God/Methods.js` `God.killProcess` sends the IPC message `'shutdown'` and never SIGINT. SIGINT is used
    only when the process has no IPC channel, and fork mode always has one. After `kill_timeout`, SIGKILL
    follows. The planner re-read `God.killProcess` at 5.3.0 and found the `shutdown_with_message == true` branch
    calling `proc.send('shutdown')`.
  - **Consequence.** `server.ts` handles SIGINT only, so the drain has never run under PM2. F-31's framing, "cut
    off before its own fallback", understates it.
  - **Deploys.** `startOrReload --update-env` applies changed keys on the deploy that carries them, but a key
    deleted from the file keeps its stored value.
  - **Host reads.** The analysis's § Host observation lists the read-only commands M8-0 runs.

  Owner step M8-0 confirms all of this on the host.

## Plan

Milestones are independent of one another except M0 (first) and M9 (last). Each fix lands at its finding's site;
every criterion is a property over the class the finding names. Rollback for every website milestone: `git -C
website revert <commit>` on the chain branch, by the implementer before merge; after release, devops reverts on
`master` and pushes (production push, owner-approved). Lockfile: no milestone adds or moves a dependency; a moved
pin in `pnpm-lock.yaml` or `package-lock.json` is a criterion failure.

The re-derivation gate: M1-d, M2, M6-b and M6-l change product behaviour (a stored representation the schema admits, an
operational limit, an accepted input class). At implementation approval every milestone M0–M9 is approved
together, so the gate's population is empty; a milestone the owner withholds from that approval is marked
`PREMISE-STALE` until re-argued.

### M0 — Baseline and gate instrument (first; blocks every other milestone)

- Record at the chain branch's base: `npx vitest run --reporter=json` counters and process exit, beside the
  planner's read of 2026-11-08 at `7ce866b`: 598 tests, 598 passed, 0 failed, 54 files, exit 0.
- Typecheck gate (D7): delete `website/.next/dev/types` (git-ignored; regenerated by the next `next dev` or
  `next build`), after `pgrep -af "next dev"` shows no process for this tree. Acceptance: `pnpm run typecheck`
  exits 0 at the base before any source change, and the deletion is the only act on `.next`. That command is the
  gate at every later milestone.
- Held shared state: `website/node_modules` (installed by researcher-bugs) is not reinstalled or wiped; no
  milestone needs an install.

### M1 — Server and data path (website): F-1, F-2, F-3, F-4, F-5, F-6, F-7, F-8, F-9, F-10, F-11

- **M1-a (F-2)** — the originating statement, verbatim: *"Empty-array `in` predicates compile to `in ()`, a
  Postgres syntax error."*
  - **The class.** Every Kysely `in` predicate under `src/server` over a list that can be empty. `grep -rn
    "'in'," src/server` (architect AF-2, re-read by the planner at `7ce866b`) returns four sites:
    - `shared.ts` `getPartialMessages` and `getUserRecentMessages`. These are live: a user who administers no
      server reaches the first, and an empty `recentMessageIds` reaches the second.
    - `user.ts` `authorizeUser` and `authorizeGuildUser.ts` `getOldMessages`. These are latent: their only route
      is `message.ts`, through `authorizeAction` and through direct calls with `message.id` (architect AF-12).
      Every caller passes a single id, never a list. That id is wrapped as a one-item list, so no empty list
      reaches them at `7ce866b`.
  - **Property.** At every member, for the inputs {empty list, non-empty list}, no compiled SQL contains `in ()`.
    An empty list returns before the query is built, and the result is what an empty `in` set means at that site:
    - `getPartialMessages` keeps the user's own messages and drops only the guild `exists` limb;
    - `getUserRecentMessages` returns no messages;
    - `authorizeUser` and `getOldMessages` treat the list as naming no messages.
  - **Independence.** The expected SQL shape is a literal, never produced by the function under test.
- **M1-b (F-1)** — every compiled cron selection filters `ScheduledMessages.error` with `is null`. Residue (stated
  limit): no producer inserts into `ScheduledMessages` (research F-1), so the fix has no observable effect in
  production.
- **M1-c (F-3)** — the revoke request `removeUserSession` sends carries `token` set to the account's access token
  for every session with one; a session with no access token sends no revoke request.
  - **Clear-out (QA QAF-3).** The DB and Redis clear-out runs for every session in the class:
    - token present, with the revoke answering 2xx, answering non-2xx, or rejecting (a network failure);
    - token absent;
    - no account found.
  - **The no-account cell (critic L-C2-1, architect AF-15, QA QAF-7).** `clearUser` (`src/utils/redis/index.ts`)
    deletes three keys, and the third, `user-guilds`, is keyed on the account's `providerAccountId`. The
    `Accounts` update is keyed on it too. So with no account found, `removeUserSession` deletes exactly the
    `user-access-token` and `user-session-token` keys. It issues no `Accounts` update and sends no revoke.
    Residue (stated limit): the `user-guilds` entry is not addressable and expires on its own 600 s TTL
    (`fetchUserGuilds`, `expireSeconds: 600`, read at `7ce866b`).
  - **The session row is outside M1-c (architect AF-16, critic L-C2-4, QA QAF-9).** next-auth 4.24.5 (installed)
    deletes the `Sessions` row in its signout route, `adapter.deleteSession(sessionToken)`, and only then fires
    `events.signOut`, which calls `removeUserSession` (`next-auth/core/routes/signout.js`, read by the planner,
    the architect and QA). No cell of M1-c asserts the row's removal, and `removeUserSession` does not delete it
    a second time.
  - **Ordering.** A failed revoke never prevents sign-out. The access token is read before the `Accounts`
    update sets `access_token` to null. At `7ce866b`, a rejected `fetch` aborts before the clear-out, and a
    missing account throws `Expected to find account` (QA's read).
- **M1-d (F-4, D5)** — the inputs are {existing message, new message} × {count < 1000, count = 1000} ×
  {user-scoped save, guild-scoped save}. The count is the owner's messages: the user's (`fk_users_id`) or the
  guild's (`fk_guilds_id`), per `upsertMessage`'s `isUserSelect(select)`. A new message is refused exactly when
  that count before the insert is ≥ 1000, with today's error text. An existing message is never refused by the
  cap.
  - **Stated limit (QA QAF-4; X-16).** Concurrency is outside the property. `upsertMessage` counts, then inserts,
    with no lock or constraint, so two concurrent saves at 999 can both pass. Fixing that needs a constraint or a
    transaction, which is beyond F-4's comparator.
- **M1-e (F-5)** — `userOrDiscordIdShape` accepts exactly `"0"` and strings of 17–23 decimal digits; every
  other string is refused (members: `"0abc"`, `"00"`, a 16-digit and a 24-digit string).
- **M1-f (F-6)** — in the client branch of the `env.mjs` proxy, reading `NODE_ENV` is not refused; reading any
  other non-`NEXT_PUBLIC_` server key still is.
- **M1-g (F-7)** — `interactions-edge` `handler`: a request whose signature does not verify gets 401 whatever its
  body (members: malformed JSON, valid JSON); the body is parsed only after verification.
- **M1-h (F-8)** — in `hydratedAuthCallback`, the guild fetch and the message fetch are both started before
  either is awaited.
- **M1-i (F-9)** — the cookie parser returns a value for every well-formed segment, keeps every `=` after the
  first in a value, and skips a segment with no `=` without throwing.
- **M1-j (F-10)** — a cached `null` is a hit: a second call within `expireSeconds` for an account with no refresh
  token, or a session with no account, does not query Postgres.
- **M1-k (F-11)** — with `NEXT_PUBLIC_CDN_PORT` set in development, the URL is `<host>:<port>/dev/…`.

The website-api-handler-hardening handoff's trigger fires on M1 (edits under `src/pages/api/` and `env.mjs`);
disposition X-9.

### M2 — Limits and the save schema (website): F-12, F-13, F-14, F-43

- **M2-a (F-12)** — originating statement: *"A black embed cannot be saved."* Property: for every integer colour
  in [0, 16777215] the editor can produce, `embedShape` admits it, so a message whose only fault would have been
  `color: 0` saves; `discordResponseToMessage` keeps `color` whenever the response carries the field, 0
  included. Human-observable: pick black in the colour picker, save, reload — the embed is black. Walked on the
  locally served chain tip (§ Validation).
  - **Standing-suite defect (QA QAF-1; critic L-C2-3).** The standing suite holds a transcription of
    `embedShape` that already diverges from it (Axiom E). Property: at M2, no expectation over `embedShape`'s
    admitted class is computed from a copy of the schema; every one runs against the real `embedShape`. The file,
    and how each case is shown red, are QA's: `qa/015-bug-evaluation-fixes-qa.md` § M2.
- **M2-b (F-13)** — the author-name error shows exactly when the name exceeds 256 characters (the save schema's
  bound, `MAX_EMBED_AUTHOR_NAME_LENGTH`).
- **M2-c (F-14)** — `validateEmbedTitle`'s error names the title.
- **M2-d (F-43, D8)** — footer text of 0–2048 characters shows no length error and saves; at 2049 the error
  shows. One constant drives both the editor and `embedShape`, as `MAX_EMBED_FOOTER_TEXT_LENGTH` does at
  `7ce866b`.

### M3 — Enter on a dialog never confirms from another button (website): F-15, F-39

Originating statement: *"Enter on a focused Cancel button runs the confirm action."* The class: every
`useHotkeys('enter')` handler in `src/` that guards on the focused element. It is enumerated by `grep -rc
"tagName !== '~/components/Button'" src`, which returned 3 at `7ce866b` (sites named above). The bare import path
is not an enumerator: it matches 46 files. Decision table, for each of the three dialogs:

| Focus at Enter | Outcome |
|---|---|
| the dialog's confirm/submit button | its action runs exactly once |
| any other button in the dialog (Cancel; Clear in the uploader) | that button's action only; confirm/submit runs zero times |
| no button focused | outcome unchanged from `7ce866b` for that dialog |

Human-observable: in *Delete Embed*, Tab to Cancel, press Enter — the embed remains. Walked on the locally served
chain tip. The fix lands at every member of the class (mirrors the existing per-dialog hook; no shared helper
exists to fix once — `grep` above).

### M4 — Send page and webhook menu (website): F-16, F-17, F-18, F-27

- **M4-a (F-16)** — while a send is pending, Send is disabled, so any number of presses during it produces
  exactly one webhook request; a failed send leaves no unhandled rejection (vitest process exit 0 with the
  failure case in the suite) and re-enables Send.
- **M4-b (F-17)** — "Invalid URL" shows exactly when a non-empty custom URL has finished validating and
  `selectedWebhook` is `null`.
- **M4-c (F-18)** — Clear is enabled whenever a thread is selected (`threadId` non-empty), in both the list and
  the name views.
- **M4-d (F-27)** — the message-id test accepts only a whole-string id or a message URL; a network failure in
  either validation effect is caught and shown, not unhandled; of two overlapping validations only the latest
  input's result is applied.

### M5 — Editor pages and providers (website): F-19–F-26

- **M5-a (F-19)** — after a confirmed Load, the JSON dialog closes on Esc and outside-click, as after a cancelled
  one.
- **M5-b (F-20)** — Copy to Clipboard is disabled whenever Pretty-print is (the draft is not parsable/conforming);
  pressing it never throws.
- **M5-c (F-21)** — the update prompt includes "Any changes you have made will be lost." exactly when the
  composer has unsaved changes at the moment the event arrives. Hash comparison is untouched (X-10).
- **M5-d (F-22)** — the guild dropdown reflects `session.user.guilds` after every session update, without
  remount.
- **M5-e (F-23)** — "Today" is shown exactly when the message date's year, month and day equal today's, both
  copies (`Header.tsx`, `f/[id]/page.tsx` `getDateString`).
- **M5-f (F-24)** — opening Save As proposes the message's current name and server.
- **M5-g (F-25)** — the delete failure toast names the delete.
- **M5-h (F-26)** — a `/preview` link whose `data` is not parsable JSON renders an error state, not a crash.

### M6 — Editor components and markdown (website): F-37, F-38, F-40, F-41, F-42, F-44, F-45–F-50

- **M6-a (F-38)** — originating statement: *"Multi-line fenced code blocks never parse in the preview."*
  Property: every fenced block — with or without a language tag, 1 to N content lines — parses as a code block in
  `parseContent`, `parseEmbedField` and `parseEmbedTitle`. Members: the research's three executed strings.
  Human-observable: a two-line code block in the read-only preview renders as a block; also in the `/preview`
  screenshot after M8/production.
- **M6-b (F-40, D8)** — a URL is valid exactly when its path's final segment ends in one of `.png .jpg .jpeg
  .webp .gif .apng .tiff .webm`, in any case, with the query and fragment ignored. Members: `.jpeg`, `.PNG` and
  `a.png?ex=1` are accepted; `a.png.html` and `a.avif` are refused. The set's eight members are D8's list,
  carried verbatim.
- **M6-c (F-41)** — in read-only mode an embed with no displayable content and no fields is hidden.
- **M6-d (F-42)** — in read-only mode an edit to field *k* writes field *k*, whichever earlier fields are hidden.
- **M6-e (F-45)** — unmounting `Author` leaves no interval running.
- **M6-f (F-46)** — the picker's default colour is six hex digits for every integer colour.
- **M6-g (F-47)** — the emoji replacer tries longer surrogate sequences before their prefixes.
- **M6-h (F-48)** — `aria-expanded` is true exactly when the spoiler's content is visible.
- **M6-i (F-49, D9)** — every duplicate inserts the copy directly after the original. Members: embed and
  component at top level, plus the four nested editors.
- **M6-j (F-50)** — a footer object without `text` renders without throwing.
- **M6-k (F-37)** — `UpsertMapMap.delete(key)` without `innerKey` removes the whole entry for `key`.
- **M6-l (F-44, D10)** — originating statement: *"Component cap is checked before adds that add several."*
  D10's words are "allow, mark invalid". Read as properties (the reading is the planner's):
  - (i) Every add the editor offers completes in full, whatever count it reaches. That covers a Section, a
    container duplicate and every nested add (`ActionRowEditor.addButton`, `SectionEditor.addTextComponent`).
    `canAddComponent`'s existing refusal of a top-level add at a total ≥ 40 is unchanged; D10 does not speak
    to it.
  - (ii) `validateMessage` returns an error, which names the count and the 40 limit, exactly when the total
    component count over every nesting level exceeds 40. So the send gate refuses such a message, and the stored
    `valid` field (`isMessageValid` → `validateMessage`, `messageValidity.ts`) reads false.
  - (iii) The total is counted by one definition, shared by the editor's `canAddComponent` and
    `validateMessage`. That definition is today's `countTotalComponents` (`DiscordMessageEditor/index.tsx`,
    module-private at `7ce866b`), lifted rather than duplicated, as `website.md` A-3 did for the notice.
    - **Destination** (architect AF-4): it is exported from `src/utils/limits.tsx`, beside `sumDisplayableText`,
      the sibling counter that feeds a validator there. Its parameter type is structural, because
      `validateMessage` receives `MessageData` components without `_key`.
    - **The count.** At every nesting level it counts exactly what `countTotalComponents` counts at `7ce866b`.
  - (iv) **The stored residue**, a stated limit (architect AF-1, recommended (a); critic L-3).
    - **What it is.** `valid` is written at save time (`upsertMessage` → `isMessageValid`) and served by the v1
      API. A message stored before the release with more than 40 components keeps `valid = true` until it is
      next saved.
    - **Population.** Unknown: no database instrument is reachable from this box.
    - **Carrier.** Nothing in this chain re-derives stored rows. `backfillValid.ts` is untouched: it selects only
      rows whose `valid` is null, so the trigger of `handoff/backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md`
      does not fire. That handoff stays the carrier for any future re-derivation over non-null rows (X-13).
  - (v) No M6-l criterion is settled by sending live messages to Discord. This is the constraint carried from
    `handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (X-14).
  Expected counts in the tests are literals.
  Human-observable: at 39 components, add a Section. The add completes, Send is disabled, and the error names
  the count. Walked on the locally served chain tip.

### M7 — Bot (website/bot): F-28, F-29, F-30 — turns on D4

- **M7-a (F-28)** — `ADMIN_PERMS` is the string of `ManageGuild` alone (`"32"`); the expected value is a literal.
  **Owner step** (publishes to Discord; no pipeline party runs it): after the website release, `pnpm run
  push-commands` from `website/`, per `package.json`. Human-observable / post-deploy (limb 2): a member holding
  Manage Server and not Administrator sees *Get Message* in a message's context menu; the owner attests with the
  time. Rollback: revert the commit and re-run `push-commands` (owner).
- **M7-b (F-29)** — `setTimestamp(t)` sets the payload's timestamp to `t`.
- **M7-c (F-30)** — `isUserCommand` is true exactly for user commands.

### M8 — preview-image-generator: F-31–F-35 (D16: straight to prod; M8-0 run 1 done)

Host facts (steering's standing `hooks-pig` reads, rulings blocks 05:20Z–05:24Z and OQ-G, `a16e431`):
- The generator runs under **root's** PM2 daemon, version 5.2.2, with `PM2_HOME` `/etc/.pm2`. It is one app,
  `hooks-image-preview-generator-prod`, with `kill_timeout` 5000 and `shutdown_with_message` true, read from
  root's `dump.pm2` through the filtered extract.
- PM2 5.2.2's `God.killProcess` is identical to 5.3.0's: the planner ran a `diff` of the function after
  `npm pack pm2@5.2.2`. So the analysis holds at the host's version.
- No preview instance exists, and the `preview` branch is deleted (D16).

- **M8-0 (agent read, D17/D18; it replaces limb (3)'s owner step).**
  - **The instrument.** `verification/015/pig-host-read.sh`, run as `claude-ro` over `hooks-pig`. It reads files
    only, never calls `pm2` and never writes. It reads:
    - `pm2.log`'s stop and kill lines for the app;
    - the app's out log, the shutdown-line count by the predicate in P1;
    - root `dump.pm2` through a host-side filter that prints only name, `kill_timeout` and
      `shutdown_with_message`, per D18;
    - Chromium processes whose parent is pid 1.
    It never opens `/home/nodejs/.pm2/dump.pm2` (rulings 05:21Z). The analyst writes it, and the code-reviewer
    reviews it with M8's code.
  - **Run 1, done** (2026-11-08T05:25Z; capture `verification/015/m8-0-run1-2026-11-08T0525Z.txt`, `fe27690`;
    result in the analysis, `1fc16f5`).
    - **Confirmed for production stops.** The stored values are `kill_timeout` 5000 and `shutdown_with_message`
      true. `pm2.log` records two stops of the prod app (2024-06-15, 2026-06-15), each `still alive after
      5000ms` → SIGKILL. The out log, which runs from 2023-08-22 over both stops (180,284 lines), holds 0
      `Server received` lines. The drain has never run.
    - **Inconclusive.** No deploy reload is on record, so the reload path rests on PM2 source alone (5.2.2 =
      5.3.0 on that path).
    - **Unread.** The daemon's `PM2_KILL_*` environment: root's `environ` is off limits to `claude-ro`.
      P1's fallback-signal limb therefore assumes SIGINT, the PM2 default, and the residue is a daemon
      started with `PM2_KILL_SIGNAL` set. It is moot for the message path, which run 1 shows is the one in
      use.
  - **Run 2**, by devops (critique L-6), after the `prod.yml` re-run of M8-a (2) completes and `pm2.log` shows the
    app online. It reads M8-a's criterion and captures to verification/015/.
- **M8-a (F-31)** — the originating statement, verbatim: *"Graceful shutdown is cut off by PM2 before its own
  fallback."* Reframed by the analysis: the shutdown never starts under PM2. Properties (analysis § 3):
  - **P1.**
    - **Triggers.** Every stop PM2 can send reaches `shutdown()`: the `'shutdown'` IPC message, and the signal
      PM2 falls back to. That signal is SIGINT unless the daemon sets `PM2_KILL_SIGNAL`, which is unread
      (M8-0 run 1; critique L-4).
    - **Idempotent.** `shutdown()` is idempotent, because both triggers may arrive.
    - **Stated explicitly.** `ecosystem.config.js` states `shutdown_with_message` explicitly, since a deleted
      key keeps its stored value.
    - **The log line.** Inside the idempotency guard, so once per drain, `shutdown()` logs a line that begins
      with `Server received` and names the trigger. When the drain completes, it logs a second line giving the
      elapsed milliseconds (architect AF-3).
    - **The predicate.** M8-0 counts lines that begin with `Server received`; the `Server running at` ready line
      is outside the class. The local probe exercises both members, sending a `'shutdown'` message to a
      locally started server, before any host read relies on the predicate (critique M-3).
  - **P2, the window.** `kill_timeout` is 12000 ms, outlasting the app's own 10 s fallback. The 2 s margin is
    the planner's choice, not a measurement; the drain time is first measured at run 2.
  - **P3, what it must not slow.** The process exits as soon as the drain completes, so the 10 s fallback is an
    upper bound, never a floor. A fork-mode reload is stop-then-start, so the production gap at each deploy is
    the drain time itself.
    - **The idle cell (QA QAF-2).** A process that never created its pool launches no browser at stop: its
      drain completes without one. At `471578f`, `getPool()` creates the pool on first call, and generic-pool
      autostarts with `min = 2` (QA's read of 3.9.0). So today a drain of an idle process would first launch two
      Chromiums.
    - **Where the read lives (architect AF-14).** The drain asks "does a pool exist?" through a read that never
      creates one. That read is a second export of `src/getPool.ts`, beside the `globalForPool` singleton and the
      default export that mirrors it (`preview-image-generator@471578f src/getPool.ts`). `server.ts` neither
      reaches into `globalForPool` nor keeps its own flag.
    - **Run 2.** M8-0 run 2 records whether the stopped process had created its pool, so that the
      drain-complete figure is read for what it measures. The read is bounded to the stopped process's span
      (below, "Every run-2 read"):
      - **Primary figure:** the `Created instance` lines in that span. The pool factory logs one per launched
        Chromium (`getPool.ts` factory `create`, `console.debug`, `471578f`).
      - **Secondary figure:** the `POST /generate` lines in that span. `server.ts` logs `req.method, req.url`
        before its auth check, so this counts unauthenticated requests too and does not by itself show a pool
        (QA QAF-8).
      `pig-host-read.sh` gains this read before run 2. The analyst writes it and the code-reviewer reviews it with
      M8's code, as for run 1.
  - **P4.** The stop handlers are registered no later than the `ready` message.
  - **Growth beyond the finding (critique L-5).** P3 and P4 go beyond F-31's statement. They are the analysis's
    V-4 and V-5.
    - P3 cannot be dropped without re-pricing P2: without it, P1 and P2 turn today's ~5 s deploy gap into a
      10 s floor.
    - P4 can be dropped to a stated limit: a stop arriving between `listen` and handler registration kills the
      process undrained.
  - **The two stops (critique H-1; RK-6).**
    - **(1) The transition stop.** It is the deploy's own `startOrReload`, which stops the *old* process. That
      process has no `'message'` listener, and the new `kill_timeout` already applies to it (analysis V-3).
      Expected signature: no shutdown line, then `still alive after 12000ms` → SIGKILL. This is **expected, not
      a refutation.**
      Stated limits:
      - The push adds a 12 s delay before the switch-over, not 12 s of downtime (architect AF-11). The old process
        ignores the message and keeps serving its old code until the SIGKILL. Previews break only for requests
        in flight at the kill, and in the gap between the kill and the new process's `listen`. That is handoff
        `preview-image-failure-shows-broken-not-stale`'s window (X-11).
      - At PM2 5.2.2 the SIGKILL takes the whole process tree, Chromium included, so RK-5's orphans do not arise.
    - **(2) The verifying stop (D19).** It is the first stop of a process running the M8 commit. Devops causes
      it by re-running `prod.yml` through `workflow_dispatch` after the M9 push, with the owner's approval as for
      any prod push.
      - This re-run is itself a second production deploy. Its `startOrReload` stops the *new* process, which
        handles the message, so the drain runs and the gap is the drain time (P3).
      - The architect's reading of stop (1)'s deployed-directory replacement carries over (AF-9d, low bearing).
      **Every run-2 read** (RK-6's class; QA QAF-8) is bounded to the stopped process's own span in the shared
      out log. The span runs from that process's `Server running at` line to its `Server received` line: the
      last such pair before the ready line of the process the re-run started. No run-2 read is taken "after the
      last" of any line. Once the re-run completes, the last ready line belongs to the new process.
      **Criterion, read by M8-0 run 2 on stop (2) only:**
      - the out log gains exactly one `Server received` line naming the trigger, plus the drain-complete line;
      - the process exits before 12000 ms;
      - `pm2.log` shows no `still alive` or SIGKILL line for that stop.
      The drain-complete line's elapsed figure is the drain measurement.
  - **Rollback.** Devops reverts the M8 commit on `prod` and pushes, with the owner's approval as for any prod
    push. The reverted file restates the old values, so `--update-env` applies them.
- **M8-b (F-32)** — a `/generate` request with an unparsable body gets 500 and the process keeps serving.
- **M8-c (F-33)** — a page is closed whether the screenshot succeeds or throws; no rejection is unhandled.
- **M8-d (F-34)** — a Chromium launch failure rejects in the pool factory; the next request gets 500, not a
  TypeError.
- **M8-e (F-35)** — with `API_KEY` unset or empty, the server refuses to start, with a log line naming the variable.
  The refusal lives in `src/config.ts`, the generator's one reader of the environment (architect AF-4). The other
  values `config.ts` casts unvalidated are outside F-35 (architect AF-9b). `prod.yml` sets `API_KEY`, so the
  deploy is unaffected.

No automated coverage: the repo has no runner, and the chain declines to add one. Every branch above is
therefore an operator-visible criterion. Where each is verified:
- **Entry condition for every local generator run (QA E-1, QAF-5).** The generator's real credentials and the
  network are out of reach of any local run, because a well-formed `/generate` request reaches
  `deleteMessagePreviewImages`, an S3 list-and-delete, even when the browser launch fails. So every local run:
  - happens in an export of the chain tree without the tree's `.env`;
  - takes its dependencies from an install **inside that export**, run before the namespace is entered, because
    the install needs the network (QA QAF-6; critic M-C2-2). The install is `npm ci --omit=optional` under
    `PUPPETEER_SKIP_DOWNLOAD=1`. The export never links to the shared tree's `node_modules`, which another
    session can change mid-run;
  - runs the server inside `unshare -rn`, whose **first step brings loopback up** with `ip link set lo up`. The
    namespace starts with `lo` DOWN: the architect (AF-13) and the critic (M-C2-1) each measured a loopback
    connect failing with `ENETUNREACH` (Errno 101) until `lo` was up, and succeeding after it;
  - passes a **self-check before any criterion is read**: a loopback GET to the started server answers, and an
    external name lookup fails. A failed self-check stops the run. Its remedy is never dropping `-n`, which is the
    limb that keeps the S3 bucket out of reach;
  - sets every `CDN_*` variable, `PREVIEW_ENDPOINT` (a loopback URL) and `API_KEY` explicitly to probe values;
  - never sources the shared tree's `.env`. `dotenv` does not override variables already set, and the export
    carries no `.env`.
  No probe of this chain may delete or write a CDN object.
- **Locally, no browser:** M8-b, M8-d, M8-e, QAF-2's idle cell, and P1's two log lines and predicate (a
  `'shutdown'` message sent to a locally started server).
  - **Forcing condition.** No browser is downloaded at the install, so a launch fails, which is M8-d's forcing
    condition. It holds only while `~/.cache/puppeteer` is absent after the install. QA's E-2 re-checks it at the
    probe, which also settles whether `--omit=optional` still runs puppeteer's install script under the variable
    (critique cycle 2, "Assumption Not Checked").
  - **The variable.** QA read puppeteer's own `getConfiguration.js` at 21.1.0: any non-empty
    `PUPPETEER_SKIP_DOWNLOAD` skips the download (QA E-2, `2e4d4d5`).
  - **No pool before parsing.** That M8-b's path creates no pool before parsing is an unread inference
    (`getPool()` is called inside `generateImage` and `shutdown`, per `grep -n` at `471578f`). The implementer
    confirms it at M8.
- **M8-c needs a real browser (critic M-C2-3).** It runs locally under E-1. D20 allows a browser to be used; it
  does not supply one.
  - **Source.** Puppeteer has none on this route, and the namespace cannot fetch one. So the source is
    `executablePath` to a binary already on this box. Read 2026-11-08 by `--version`: `/usr/bin/google-chrome`
    156.0.8078.47 and `/snap/bin/chromium` 157.0.8103.38. Whether a snap binary launches inside `unshare -rn`
    is unread.
  - **Compatibility, unread.** No document has read whether puppeteer 21.1.0 drives either binary. The
    implementer settles it at M8, before M8-c is relied on, with one launch and one screenshot under E-1 against
    the chosen binary, recording the binary, its version and the result.
  - **Fallback.** If no binary on the box launches and screenshots under puppeteer 21.1.0, M8-c is verified by
    code review and stated as a limit. Installing or upgrading Playwright or a browser is not implied.
- **On production:** P1–P3, through M8-0 run 2 on stop (2).

### M9 — Release (devops; owner steps named)

- **website.** The chain branch merges to `master`, and the push deploys to Vercel production (owner-approved
  push). Pre-push: `release-move.js website master <sha> --dry-run`.
- **preview-image-generator (D16).** Devops pushes `prod` (owner-approved), with
  `release-move.js preview-image-generator prod <sha> --dry-run` first. Then:
  - the transition stop (M8-a (1)) happens;
  - the verifying stop (M8-a (2)) follows;
  - M8-0 run 2 reads it.
  `preview.yml` still sits in the tree, but nothing triggers it now that the branch is deleted.
- **Owner steps:**
  - `push-commands` (M7-a);
  - the F-2 check (limb 1, § Validation);
  - the M7-a Discord check (limb 2);
  - approval of the second production deploy, devops' `prod.yml` re-run (D19).
  Limb (3) is now agent-read (M8-0, D17).

## Testing Strategy

QA Phase 1 runs before implementation (stage set, D6).

The standard is `agent-output/CLAUDE.md` § Test Conventions (`website`): vitest, tests beside the code under
`__tests__/`, spec-form names, DOM tests (`.tsx`) mounted with `createRoot`/`act`, every new test seen red
against a restored mutation, exit code recorded beside counters. Expected types: pure-logic tests for M1, M2,
M6-b/f/g/k, M7; DOM component tests for M3, M4, M5, M6 components. The F-1/F-2 class (Kysely predicates over a
nullable or a possibly-empty list) is covered by compiling the query, as the research's proof did — no database is
reachable here. preview-image-generator has no runner (M8 note). Read instruments per host: website — vitest on
this box (exists); Vercel production — the owner's browser; Discord — the owner's client; the generator host —
`claude-ro` file reads over `hooks-pig` (D17, M8-0); no pm2 command and no write; this box
can run the M8-b/d/e probes once the generator's dependencies are installed (M8 note). Agent browser use is open under D20.

## Validation

- Planner's run at `7ce866b`, 2026-11-08: vitest 598/598, 54 files, exit 0; `pnpm run typecheck` exit 1, the two
  errors confined to `.next/dev/types/validator.ts` (D7 settles the gate at M0).
- Pre-release walk (owner): the chain tip served locally against `.env.local`, whose database is the live one —
  the precedent of `uat/closed/013-components-v2-editing-surfaces-uat.md` § B.1; writes during the walk land in
  his real account. A Vercel preview of the chain branch is the alternative (the `preview.yml` endpoint
  `hooks-gg-website-git-redesign-hooks-gg.vercel.app` shows branch previews have existed) and points at the same
  database.
- Limb (1), F-2: the owner signs in with an account that administers no server and opens the message list — at
  `7ce866b` (expected failure) and the chain tip (lists his messages); attested with times. Repeated post-deploy
  in production.

## Risks

- **RK-1** — F-38's new regex may match more than Discord does (a lazy cross-line body). Falsifier: a string
  Discord renders as text that the preview renders as a block; checked against Discord's own rule
  (`[^\n][^]*?`, research F-38) by QA.
- **RK-2** — M2 widens what saves. Any consumer reading stored `color`/`footer.text` (statbot, chain 012's `valid`
  column) sees new values. Falsifier: a consumer refusing `color: 0` or a 2048-character footer.
- **RK-3** — M8 is the first PIG deploy since 2023 on a self-hosted runner; the cache key means `npm ci` is
  skipped on a lockfile hit. With no preview leg (D16), the first exercise of that path is the production push. Falsifier:
  the `prod.yml` run failing, or the app not `online` in M8-0 run 2. The clearing act is devops' rollback (M8-a).
- **RK-4** — M7-a's `push-commands` republishes every command, not only `get_message`. Falsifier: a command's
  definition differing after the push.
- **RK-5** — a stop that ends in SIGKILL may leave Chromium behind.
  - Before PM2 7.x, PM2's SIGKILL took the whole process tree; at 7.1.2 it takes only the Node process (analysis
    § 1). So on 7.x, every stop that reaches SIGKILL may orphan Chromium processes. The analysis gives this
    low-to-moderate confidence and did not run it, then under D2's constraint, which D20 has since lifted.
  - The host runs PM2 5.2.2 (rulings 05:20Z), whose SIGKILL takes the whole tree. So RK-5 does not arise at
    this host unless its PM2 is upgraded to 7.x. M8-a's P1–P3 remove the SIGKILL on the normal path.
  - Falsifier: Chromium processes without a live parent on the host after a stop. This is read by M8-0's
    `ps`-based command.
- **RK-6** (standing prediction, from critique cycle 1 H-1, stated as a class) — an M8 observation read off the
  wrong stop: the deploy's own stop of the old process, read as if it were a stop of the new code.
  - Falsifier: a host read whose verdict on P1 rests on a stop by a process that does not run the M8 commit.
  - Record per review pass:
    - cycle 1 pass 1 found one member (rev 3's M8-a criterion), remedied at rev 4;
    - cycle 1 passes 2 and 3 and cycle 2 passes 1 and 2 found none;
    - QA Phase 1's re-key to rev 7 (`ba277d8`, QAF-8) found one: the run-2 request read windowed "after the last
      `Server running at`", which is the process the re-run started. Remedied at rev 8 by the property over the
      class: every run-2 read is bounded to the stopped process's span (M8-a, "Every run-2 read").

## Exclusions

| # | Exclusion | Reason | Carrier |
|---|---|---|---|
| X-1 | F-36 (`project-utils/dist/prisma.js`) | Severity 1, harmless unless imported; removal needs a project-utils push and a website lockfile pin move, and `system-architecture.md` D-002 warns committed dist is not cleaned as stray output | Stated limit |
| X-5 | H-1–H-8 | Out by D6 | Research G-5 |
| X-6 | Research § Findings 7 handoffs | Out by D6 | Each handoff |
| X-7 | RBAC remark | Out by D6 | Stated limit (product direction, no effort) |
| X-8 | Security assessment | Out by D6 | Stated limit |
| X-9 | `website-api-handler-hardening` items 2–5 (trigger fires on M1) | Outside the F-1–F-50 pool (D6); item 4's required-variable change is a release behaviour the owner rules on | That handoff |
| X-10 | `save-originating-tab-raises-its-own-update-prompt` and `unsaved-change-guards-disabled…` (triggers touch M5-c) | M5-c changes only which `hasChanged` value the prompt reads; the hash forms and the guard predicate stay | Those handoffs |
| X-11 | `preview-image-failure-shows-broken-not-stale` (trigger fires on the M9 PIG redeploy) | Website-side nonce fix, outside the pool (D6) | That handoff |
| X-12 | The plain-text API key in `prod.yml` / `preview.yml` | Out of chain by D13 | `handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md` |
| X-13 | Re-deriving stored `valid` for rows saved before M6-l | Stated limit (M6-l (iv)); a re-derivation over non-null rows would modify `backfillValid.ts` and is a scope change | `handoff/backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md` |
| X-14 | `components-v2-emptiness…`, whose trigger fires on M6-l (a change to the send gate's predicate) | The emptiness class is outside the F-1–F-50 pool (D6); M6-l (v) carries its no-live-sends constraint | That handoff |
| X-15 | The generator's 2026-06-15 → 2026-08-23 gap in `pm2.log` (analysis § M8-0 run 1) | Outside F-1–F-50 (D6); whether the generator was down for the whole gap is not established | Steering's FYI to the owner, rulings block 05:29Z (`fa693e0`) (critique L-8) |
| X-16 | The message cap under concurrent saves | A constraint or a transaction is beyond F-4's comparator change (QA QAF-4) | Stated limit (M1-d) |

Not triggered, re-read 2026-11-08 against every milestone including M6-l: `backfill-valid-guard…` (`backfillValid.ts`
is not modified; its stored-residue tie is X-13), `components-v2-invariant…`, `fix-v1-guild-messages-auth-post-deploy`,
`message-init-cached-edits-lost`, `newmessagemodal-persist-gate…`, `v1-guild-messages-endpoints…`.

## Architecture lines this chain touches

- `system-architecture.md` § Components, preview-image-generator: "graceful SIGINT drain". The analysis
  contradicts it from PM2's source: PM2 sends an IPC `'shutdown'` message and the drain never runs. M8-0's
  first run confirms it on the host. The chain proposes the correction to the architect, who holds the record;
  after M8 the line reads as a drain on PM2's `'shutdown'` message, with SIGINT as the fallback.
- `preview-image-generator.md` P-3's shown mechanism ("no build step — the checkout
  is production") disagrees with `prod.yml` (npm ci, build, copy to `deployed/<env>`, pm2 reload) — for the
  architect's conformance pass.

## Entry work (2026-11-08)

- Hooks: `core.hooksPath` unset and no non-sample `.git/hooks` in website and preview-image-generator; no tracked
  build output (`git ls-files` over `dist|build|.next`, 0 each); no `.claude` Stop guard in either repo or the
  workspace root (`ls -a`, `ls -la .claude`).
- Serving refs (`git ls-remote origin`): website `master` 7ce866b (Vercel production; no `.github/workflows`);
  preview-image-generator `prod` 471578f (`prod.yml`), `preview` c233ec4 (`preview.yml`), `master` 87dcb41 — all
  ancestors of `prod`. `release-move.js --dry-run`: website master — every check passed, no workflow;
  preview-image-generator prod — every check passed, sibling `master` on one line. Every remote push is devops's
  act. project-utils: not shipped by this plan (X-1).
- One launch directory serves both repos: `/usr/local/bin/hooks`.

## Planner batch

| Item | Source row | Disposition |
|---|---|---|
| D2's steering-go wording at § M8 (M8-c), § Testing Strategy and RK-5 is released by D20 | D20 | Discharged at rev 6 |
| QAF-10 (MEDIUM). Rev 8's run-2 span ends at the `Server received` line it counts, so "exactly one" cannot fail, and with no drain the span is undefined. This is RK-6's third member on the run-2 bounds (after rev 3's and QAF-8). It is remedied by the property over the class, not by another instance fix: every run-2 read is bounded only by events independent of any quantity counted inside it. Those events are the stopped process's own ready line, the last before the re-run's, and the re-run process's ready line, cross-checked against `pm2.log`'s timestamp for stop (2). Any extra ready line inside the span (`exp_backoff_restart_delay`, `max_restarts: 10`) is reported, never resolved by choosing one. The fold enumerates every read the span bounds: the `Server received` count, the drain-complete line and its elapsed figure (which rev 8's span leaves outside it), the `Created instance` and `POST /generate` counts, and the exit time. It also writes RK-6's record for both passes that reported this member. | `qa/015-bug-evaluation-fixes-qa.md` QAF-10 (`c2a657a`); critique cycle 3 M-C3-1 (`f64ae27`), the same member | Parked (post-deploy instrument; changes no code, test or pre-release verifier). It folds at the next planning pass that is needed anyway, and at the latest at the seam before the UAT anchor. The analyst does not start the run-2 extension of `pig-host-read.sh` until this row is discharged. |
| L-C3-1 (LOW). The `Created instance` primary figure cites no non-zero read from the production out log. Run 1's capture holds none (`grep -c "Created instance"`, 0 of 97 lines, 2026-11-08T05:56Z). | critique cycle 3 L-C3-1 (`f64ae27`) | Parked, folded with the QAF-10 row. The analyst's first run of the extended `pig-host-read.sh` must read `Created instance` non-zero over an earlier process span in the production out log, before run 2 relies on it. If it reads zero everywhere, the figure is not used and run 2 reports pool creation as not established. |

## Resumption State (checkpoint, planner-hooks-015)

- **Done.** Plan at revision 8. All three gates approved rev 7 (critic `1ce2ae4`, architect `592eb23`, QA `ba277d8`), and implementation started on it (`7efd8b0`). Rev 8 folds their four non-blocking findings. The cycle 1 critique closed at `dee418b`. Registrations so far: R-1 (D14, D15) and R-2 (D20). F-31 analysis: `analysis/015-bug-evaluation-fixes-analysis.md` (latest `1fc16f5`). M8-0 run 1 is captured at `verification/015/m8-0-run1-2026-11-08T0525Z.txt`, together with the script, at `fe27690`.
- **Next.** Steering routes rev 8's delta to the critic, the architect and QA. Until they pass it, the implementer holds only M1-c's no-account and ordering cells. Fold any findings at the next planning pass. After implementation approval, findings that change no code, test or pre-release verifier are parked as Planner batch rows.
- **Open with others.** None of the planner's questions to the owner are pending. The 69-day generator gap (X-15) went to him through steering as an FYI only.
- **Uncommitted, left in place.** `INBOX.md` holds this session's FYI entry: the research document's `pm2 show` advice. Per the inbox rule, the domain owner commits it.
- **Branches.** website and preview-image-generator: chain branches are created by steering. The planner touches no source.
