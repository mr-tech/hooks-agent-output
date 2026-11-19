# verification/017/m5-pg — the real-Postgres lane for M5-a (QAF-10, EC-2)

Plan 017 § Testing Strategy: the Node tests of M5 substitute the database, so they cannot tell a locked read of the replaced
nonce from an unlocked one. This lane runs the **shipped** statements (`buildUpsertMessageQuery` and
`buildCommitPreviewNonceQuery`, imported from the website source, never copied) against a throwaway `postgres:16`
container with two concurrent sessions. It is outside the standing suite.

- `run.sh <out-dir> [website-src-dir]` — starts the container (name `impl017-pglane`, `--network none`, a unix socket on a
  host directory), runs the lane under `unshare -rn`, removes the container and the socket directory on every exit path.
  `website-src-dir` defaults to the website's `src`; pass the `src` of an export to run a mutant.
- `vitest.config.mjs`, `pg-lane.test.ts`, `env-stub.ts` — the runner, the lane, and the `~/env.mjs` stand-in.

Cases: P1 the shipped upsert's clock follows lock order; P2 a minted nonce sorts above any existing 32-hex nonce; P3 the shipped
commit learns the nonce it replaced under a concurrent commit; refused commit on a greater nonce; refused commit on a missing row
(no insert).
