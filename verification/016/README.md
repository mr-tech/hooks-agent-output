# verification/016/ — plan 016, the send-check validity chain

Instruments the chain's verdicts rest on. Read a script's header before running it.

- `corpus/` — QA Phase 1 (plan AC1-1): the reconstructed Components V2 send bodies, the Discord
  re-send that confirms them, the website-side run of the real predicate, the ledger tally, and the
  TypeScript fixture generated from them.
  - `corpus.py` builds `corpus.json` (76 research members + 40 QA members).
  - `research_table.py` reads the research's Evidence table and error bodies from record commit
    `c9f8e3a` into `research-table.json` (the oracle; independent of `corpus.py`).
  - `tally.py` checks the plan's Requirement ledger against that table (`tally-<sha>.txt`;
    `tally-control.txt` is its positive control).
  - `resend.py` sends the corpus in the agents' test server only (guarded on the guild id),
    deleting every accepted message at once. Results: `resend-results.json` (99 sends),
    `resend-results-batch2.json` (17 sends), with their stdout captures.
  - `website_side.mjs` (+ `ts-register.mjs`, `ts-hooks.mjs`) runs `validateMessage` and
    `discordMessageShape` from a `git archive` export, network-isolated
    (`website-side-0e3d903.json`; `website-side-control.txt` is its positive control).
  - `make_fixture.py` writes `fixture/discordV2SendCorpus.ts`; its sha256 is beside it. The website
    copy at `src/utils/__tests__/helpers/discordV2SendCorpus.ts` must be byte-identical.

What belongs in the website suite instead: the assertions over the fixture (AC1-1 to AC1-7). This
folder keeps the measurement and the generator; the suite keeps the tests.

Later passes add `differential/` (Phase 2, two-tree runs) and `uat/` (plan AC1-6 captures).

- `code-review-round1/`: code review Round 1 at website `ee114ff`.
  - `positional-probe.sh` and `positional-probe-ee114ff/`: first-only and last-only mutants of the five list walks in `validateV2Components` (CR-2). Run it in a `git worktree` export, never in the shared tree.
  - `extraction-differential.js`, `extraction-compare.js` and their output and hashes: a seeded two-tree run that verifies the `isV2Message` extraction is behaviour-preserving.
  - `eslint-base-vs-tip.txt`, `convention-check-ee114ff.txt` and `comment-gate-fixture.txt`: AC1-11 per file, and CR-1.
