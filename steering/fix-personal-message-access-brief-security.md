# Brief — security, fix-personal-message-access

Duties negated: none.

Common part, read first and whole: `/usr/local/bin/hooks/agent-output/steering/fix-personal-message-access-brief-common.md`. It carries
the determination and his scope selection, including the 22:59Z amendment, by pointer. It also carries the stage set, the standing
prohibitions (local builds: sequence at 900000000000001 before the first save; `.env.local` values never read), the architecture
citations, and the hazard analysis, each hazard a candidate for you to re-derive.

- **You:** session `security-hooks-fix-personal-message-access`, cwd `/usr/local/bin/hooks/website`.
- **Why you run** (block 20:30Z, this thread's choice): the change moves an authentication boundary on production.
- **Scope:** the website diff from `787bec5` to the SHA in QA's `Verified-At` (`qa/fix-personal-message-access-…`). Review it against the
  property in block 20:30Z, over every in-scope surface: S2/S18, S6a, S6b, S7, S8, S9 and S11.
- **Owned by you, from code review:** the Assumption Not Checked in
  `code-review/fix-personal-message-access-code-review.md`, that `session.user.id` carries the caller's own identity. The reviewer's attack
  injected the session. This includes the NextAuth adapter path that supplies `user` to the hydrated session callback, which the
  refutation did not run (`verification/access-defects/scoping/refutation.md`, C1).
- **Prior evidence to re-derive, not to inherit:** the reviewer's attack instrument under
  `verification/fix-personal-message-access/code-review/` (187/187 at `ed88e7c`, by its record).
- **Outside your scope, already carried by handoffs:** S14, S15, S1b, the guild rows in the recent list, `getOne`'s absent-number error,
  CR-3 and CR-4. The paths are in the rulings file, blocks 22:37Z, 22:59Z and 23:09Z. Raise a finding there only if this change makes it
  worse.
- **Deliver your report to** `steering-roadmap-hooks` by SendMessage. Devops follows for the website `master` push, which needs his word.
- **Return channel:** owner-needing items and spawn cues go to `steering-roadmap-hooks`.
