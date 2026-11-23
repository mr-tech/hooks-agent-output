# fixer-queue-2026-11-21 — standing rulings (declarative; the event log is fixer-queue-2026-11-21-rulings.md)

Pointer = exact block heading. Quotes are his words as the log marks them. Drafted by a helper from the whole log to block 18:24Z, 2026-11-23; heading pointers checked present by this thread. Not settled here: the 2026-11-22T07:06 folder-trust request (lodged in the agents inbox).

## Commission and scope

1. His commission: "Tell them to find prioritize fixer chains to run. Do not manage them beyond that, other than to run /clear." Find, prioritise, run fixer chains one at a time (each opened after the previous is released or parked); each chain keeps its own `fix-<slug>-rulings.md`; sweeps re-read premises at the ref the chain is cut from. [## 2026-11-21T05:32Z — the commission, relayed by the coordinator] [## 2026-11-21T05:38Z — candidate inventory read; priority order (this thread's ruling)]
2. "Just fix everything you find along the way." A defect found by a sweep, refutation or stage is fixed (nearest chain or own fixer chain) without a fix-or-not question. Not reached: production pushes, his Vercel/dashboard acts, product-behaviour choices with more than one reasonable answer (still put to him). [## 2026-11-22T04:50 — his ruling: fix everything found along the way]
3. All future formatting/Slate fixes go into one effort with a fuzzer or intensive check as deliverable: "batch any other future formatting fixes, basically any Slate related fix, into a singular effort". 9e and non-editor riders stay in the fixer queue. [## 2026-11-23T09:07Z — his words: group every future formatting (Slate) fix into one effort, with a fuzzer]
4. Hyperlinks (every link form) are in scope and a fuzzer limb. [## 2026-11-23T09:10Z — his words: hyperlink formatting is in the effort]
5. The specification is Discord's own behaviour; expect many defects, so a hand-picked case list is not enough. [## 2026-11-23T09:11Z — his words: the editor is meant to match Discord, and he expects many bugs]
6. "we're just using it in test, so I don't see any issue." Discord's extracted markdown module may run as the fuzzer oracle in tests only: fetched at test time, never committed, never shipped. [## 2026-11-23T09:17Z — his ruling: running Discord's own code as a test oracle is allowed, in tests only]
7. Slate effort = research, then full chain (plan 019). Scope `src/components/SlateEditor/**`, `src/utils/markdown/**`, `src/components/Markdown*.tsx` and mounting surfaces; excluded: 9c+9f, S-11/S-12 (fixer queue), S-15 (held H30), S-16, 9e, `/preview` matcher. A later find inside the region is in scope; outside is a re-scope. [## 2026-11-23T09:18Z — scoping determination: the Slate/formatting effort (research first, then a full chain)]
8. Scope additions: QAF-4 widens S-29 (M6); the stored `>>>` rewrite question is a region row; fence-loop differential drivers are candidate fuzzer seeds. [## 2026-11-23T15:49Z — selection: plan 019's OQ-1 to OQ-3 (put 15:4xZ, answered 15:48Z); scope additions]
9. Where Discord's old and new formatters disagree, match only where both agree; list the rest as known differences. [## 2026-11-23T13:09Z — selection: Slate standard and use-or-test (put ~09:41Z, answered 13:09Z)]
10. The site uses Discord's published formatter package for preview and editor colouring; the old formatter stays in tests only; the editor's emoji lift follows the engine. [## 2026-11-23T15:23Z — selection: the site uses Discord's formatter (put ~13:5xZ, answered 15:23Z); planner started] [## 2026-11-23T16:29Z — selection: plan 019 OQ-5, the editor's emoji lift (put 16:2xZ, answered 16:29Z)]
11. Plan 019 choices: store the emoji character; follow Discord's box on headings; Discord comparisons in a separate command with `pnpm test` offline-green. [## 2026-11-23T15:49Z — selection: plan 019's OQ-1 to OQ-3 (put 15:4xZ, answered 15:48Z); scope additions]
12. Plan 019: embeds/V2 judged by visible styles; editor styles across line breaks; timestamp picker unchanged. [## 2026-11-23T17:04Z — selection: plan 019 AN-3 (legacy-only surfaces) and D-11's reopening (put 17:0xZ, answered 17:04Z)] [## 2026-11-23T17:58Z — selection: plan 019, the timestamp picker's s and S (put 17:5xZ, answered 17:58Z); cap told to him]
13. Plan 019: past Revision 7, a below-HIGH gap on M4/M6 becomes a stated limit, no revision round (severity floor excepted); a further AC-4.7 gap is decided by steering before any fold. [## 2026-11-23T17:56Z — plan 019: M4 and M6 capped at their second post-approval revision (this thread, steering.md Standing check)] [## 2026-11-23T18:02Z — plan 019 AC-4.7: three consecutive revisions; this thread decides before the next fold (steering.md Standing check)]

## Prompting the owner

14. "tell the steering sessions to prompt me and not wait for the chains to be blocked": each decision point is a selection prompt when it arises. [## 2026-11-21T05:48Z — his ruling, relayed by the coordinator: prompt him at each decision point]
15. "That rule is overridden. You are meant to prompt me." Always a selection prompt, even while another chain can move. [## 2026-11-23T09:30Z — he overrides the plain-message rule: prompt him]
16. Plain English, context at the top, then the decision, no commit IDs or lookup-needing technicalities: "It should be very clear at the top the context that the question is being asked in". [## 2026-11-21T18:37Z — his standard for questions put to him: context first, plain English, no commit IDs]
17. A refutation helper tries a premise before the prompt is put. [## 2026-11-21T05:59Z — selection: chain 4 reaches all typed message text; chain 3's design read]
18. Options state only checked mechanisms; do not ask him to do what an agent can: "Why am I being told to restart the researcher with the browser when you can just restart the researcher with the browser?" [## 2026-11-23T09:32Z — selection: the two Slate research questions (put 09:30Z, answered 09:31Z)]

## Release and pushes

19. Every production push takes his own release answer, asked by devops in its own session. [## 2026-11-21T05:32Z — the commission, relayed by the coordinator]
20. Agents may use the Vercel CLI for look-only checks: list deployments, read production logs; never deploy, change settings or read secret values. [## 2026-11-21T19:02 — selection: agents may use the Vercel CLI for look-only checks]
21. Before release, serve a production build where a module/bundling assumption is open; take a production baseline of unchanged post-deploy limbs before the push. [## 2026-11-21T10:28Z — batch retrospective c committed; its items for this thread]
22. A website tree switch to a chain branch needs the coordinator's go naming the base. [## 2026-11-23T08:55Z — order amended: 9f rides 9c; website tree switched to chain 9c]

## Process and record

23. The weekly 98% gate stands (checkpoint every chain session, stop, report); the session gate at 90% stands. [## 2026-11-22T23:18 — his answer via the coordinator: the 98% weekly gate stands] [## 2026-11-21T08:12Z — his ruling, relayed by the coordinator: the 98% usage gate is lifted until reset]
24. Write record files with the Edit/Write tool or `record-edit.js`, not shell heredoc/`sed`; disclose a gate satisfied this way in the round. [## 2026-11-21T09:51Z — his ruling, relayed by the coordinator: continue the threads (the park lifts)]
25. A retrospective runs after the sixth closed chain, Origin `fixes-<date>-<thread>`; test-case scoring beside it takes the marked set from `git diff --name-status` (not the `src/**/__tests__/**` pathspec) and deletes nothing. [## 2026-11-23T08:48Z — fixer-batch retrospective over seven chains now; chain 9c opens] [## 2026-11-23T08:56Z — test-case scoring beside batch retrospective `fixes-2026-11-23-steering-hooks-fixer`]

## Sessions

26. A context threshold never holds a next act. [## 2026-11-21T19:41 — his challenge: this thread stopped on its own; chain 6 opened]
27. "agents should never proactively ask to be cleared"; checkpoint when the coordinator says, a parking chain included. [## 2026-11-21T19:42 — his ruling: agents never ask to be cleared]
28. This thread is `steering-hooks-fixer`. [## 2026-11-22T07:57 — his command: steering threads renamed to fixer steering]

## Superseded

- Order lists (05:38Z, extended 05:50Z, 07:59Z, 09:02Z) by [## 2026-11-23T08:55Z — order amended: 9f rides 9c; website tree switched to chain 9c]
- Plain-message form: [## 2026-11-21T05:42Z — four questions put to him, plain-message form (chain 1 can still move); unanswered] and [## 2026-11-23T09:26Z — two Slate research questions put to him (plain message; the fence-loop review can still move)] by [## 2026-11-23T09:30Z — he overrides the plain-message rule: prompt him]
- Park: [## 2026-11-21T09:17Z — his ruling, relayed by the coordinator: park the chains] by [## 2026-11-21T09:51Z — his ruling, relayed by the coordinator: continue the threads (the park lifts)]
- The 98% lift, spent at reset; gate restored by [## 2026-11-22T23:18 — his answer via the coordinator: the 98% weekly gate stands]
- Commission limb "no planning or implementation chain outside the fixer route", by [## 2026-11-23T09:18Z — scoping determination: the Slate/formatting effort (research first, then a full chain)] (this thread's reading). The coordinator's `/clear` of this thread stands (entry 1); 19:42 bars only this thread asking to be cleared.
- "Architect looks first" (OQ-4), by [## 2026-11-23T15:23Z — selection: the site uses Discord's formatter (put ~13:5xZ, answered 15:23Z); planner started]
- Resume date 2026-11-25T09:00Z, by the reset 2026-11-28T17:00Z read in [## 2026-11-23T08:15Z — his word via the coordinator: continue from where the efforts left off (the park lifts)]
