# Vercel production runtime logs — liveness and retention read (QA Phase 1, B-7 / QAF-9)

Read 2026-11-18T23:43Z by qa-hooks-017 under steering's ruling `steering/017-rulings.md` block
2026-11-18T23:41Z (Standing Default: a monitoring read is made, never asked). Read-only; nothing
redeployed or changed. Raw output was kept in a private scratch file, aggregated, then deleted:
only counts, timestamps and masked four-word prefixes are committed (`aggregate-23h.txt`).

Commands (project `hooks-gg-website`, `--scope hooks-gg`, production environment):

1. `vercel logs hooks.gg --scope hooks-gg -n 1000 -o raw` (CLI 29.1.1): exit 0, 61 lines, all
   build-log lines. CLI 29 `logs` does not return runtime logs, so this instrument cannot do the read.
2. `npx -y vercel@66.2.0 logs -p hooks-gg-website --scope hooks-gg -e production -s <w> -n 10000 --json`:
   - `-s 30d`, `-s 3d`, `-s 1d`: exit 2, HTTP 400, "The pro plan does not retain runtime logs for the
     requested time range."
   - `-s 23h`: exit 0. 246 records from 2026-11-18T00:45:04Z to 22:45:05Z, over 2 deployments. The
     summary has no excluded intervals and no next page.

What it establishes:

- **Liveness:** a function's stderr lines are readable, on `/api/trpc/*` paths too (14 records on
  `/api/trpc/message.get`, the same route family as `message.upsert`). 245 of the 246 records are
  `level: error, stream: stderr`.
- **Retention is under one day** (1d refused, 23h served). A post-deploy count read covers at most
  the last ~23 h, so a reader for a longer window runs at least daily.
- **Background noise for a count instrument:** about 240 error-level stderr lines a day, mostly
  `/api/auth/session` cold-start lines (`Error: EROFS: read-only file…`, `Error: ENOENT: no such…`,
  `[PM2][Initialization] …`). A count of D-8's failure line selects on its fixed prefix, never on
  `level:error`; these lines are its negative control on real non-member output.
- **Correction:** the tRPC `onError` `console.error` in `src/pages/api/trpc/[trpc].ts` logs only when
  `env.NODE_ENV === 'development'` (`git show 1ad625e:'src/pages/api/trpc/[trpc].ts'`). It is not a
  production emitter, and QAF-9's first text named it wrongly.

Process fact: the first version of this README was written by a shell heredoc, which breaks the
record-writing rule (lifecycle SKILL.md, Document Header Format: file-editing tools only). It was
re-written with the Write tool before commit.
