# Round-4 gates, re-derived at clean `92ce026`

All three run against a `git archive 92ce026` extraction, never the shared working tree.

| gate | implementer reported | re-derived here | note |
|---|---|---|---|
| `tsc --noEmit` | 0 errors | **0 errors** | requires copying the generated, gitignored `next-env.d.ts` into the extraction; without it tsc reports a spurious `TS2307` on a `.png` import |
| `next build` | exit 0, 0 warnings | **exit 0, 0 warnings** | `next-build-92ce026.txt` |
| full suite | 469/463/6 | **462/456/6**, same six | see `../baseline-expected-six/` — the +7 is a foreign untracked file, INFO-4 |

## Two instrument failures recorded, because neither was a defect in the code

1. **Turbopack rejects an out-of-root `node_modules` symlink** — *"Symlink node_modules is invalid,
   it points out of the filesystem root"*, a FATAL panic. The vitest runs are unaffected (vitest
   follows the symlink happily); only `next build` is. Fixed with `cp -al` (hardlinks, seconds, no
   real copy).
2. **`.env` is gitignored, so the extraction has no environment** and prerendering `/legal/*` fails
   with *"Invalid environment variables"*. Resolved by supplying **dummy** values for the 25
   required vars on the command line rather than copying the real secrets file into `/tmp`. The
   values are placeholders (`x`, `localhost`, `example.invalid`); nothing in the build contacts a
   real service.

Both produced a red build that had nothing to do with `92ce026`. They are named here because a
reviewer reporting either as a build failure would have been reporting their own rig.
