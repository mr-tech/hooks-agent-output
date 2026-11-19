# attack — code review Round 6's adversarial execution of M5 (chain 017)

M5 adds an irreversible action (deleting preview objects), so the review stood the deletion path up and attacked it.

- `run.sh <website sha> <out dir> [control id]`: a throwaway `postgres:16` (`cr017-attack`, `--network none`, unix socket
  under `/dev/shm`), a `git archive` export of the sha (it refuses to run if `.env.local` is present), and vitest under
  `unshare -rn` with loopback only. Everything it starts or makes is removed on every exit path.
- `attack.test.ts`: the cases, input class and oracle (header). It uses the real `upsertMessage`, continuation,
  `deleteMessagePreviewImages`, `@aws-sdk/client-s3` and `fetch`, plus the loopback S3 stub (`../../../m6-probe/s3-stub.mjs`, copied in)
  and a scripted generator. `env-stub.ts`, `pusher-stub.ts` and `vitest.attack.config.mjs` are the substitutions.
- `out-f83f2ca/`: the recorded run, 14 of 14, exit 0, server `PostgreSQL 16`.
- `controls.json`, `control-<id>/`: four planted defects, applied and read back (`mutant.txt`). Each fires:
  `commit-unconditional` 1 case, `refused-keeps-own-object` 2, `prefix-no-trailing-slash` 6, `sweep-age-guard-dropped` 1.

Bound: the S3 stub is path-style and stamps `LastModified` with ms precision; the generator is scripted (M6's real
generator is not in this run); the tRPC and auth layer above `upsertMessage` was not stood up (M5 changes nothing there).
