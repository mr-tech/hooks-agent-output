# Code review 018 M1: the message on the capped path, and the zod version premise (CR-1, CR-2)

These files are the evidence behind CR-1 and CR-2 in `code-review/018-next-upgrade-save-size-cap-code-review.md`. They are bound to
website `f9e66c2` (the M1 tip) and `7923a1d` (the base).

## How it was run

1. Export each tree with `git -C /usr/local/bin/hooks/website archive <sha> | tar -x -C <dir>`.
2. Install with `pnpm install --frozen-lockfile --ignore-scripts`. The lockfile is the same at both SHAs.
3. Copy `inputs.ts` and one probe file into `<dir>/src/crprobe/`.
4. Run it under a cap:

   ```sh
   systemd-run --user --scope -p RuntimeMaxSec=300 -p MemoryMax=3G -p TasksMax=256 \
     --setenv=SKIP_ENV_VALIDATION=1 --setenv=PROBE_OUT=<out.json> \
     node_modules/.bin/vitest run --project node src/crprobe/<probe>
   ```

For CR-2, a third export of `f9e66c2` has a `node_modules` made of symlinks to the second export's entries, except `zod`. Its `zod`
points at the unpacked `zod@3.25.76` tarball (`npm pack zod@3.25.76`).

## Files

| File | What it is |
|---|---|
| `inputs.ts` | The two `upsert` inputs. `refine20th_id21st` has 19 non-fatal issues in `data`, then the displayable-text refinement as issue 20, then `id: 'abc'` after it. `refine20th_noId` is the same input without the `id`. |
| `probe-tip.capmsg.test.ts`, `out-tip.json` | Runs `cappedInput(z.object({ message: optionalIdMessageShape }))` at `f9e66c2` and records each issue's code, path and message. |
| `probe-base.capmsg.test.ts`, `out-base.json` | Runs `z.object({ message: optionalIdMessageShape }).safeParse` at `7923a1d`. |
| `probe-zodversion.capmsg.test.ts`, `out-zodversion-tip.json` (zod 3.22.4), `out-zodversion-tipz.json` (zod 3.25.76) | Issue count, message length, whether the summary is present, and index 19's message. It adds an input of 40 containers × 40 sections, each with an invalid accessory. |
| `run-*.log` | vitest output for each run. Every run exits 0. |

## Result

- **CR-1:** in the capped refusal, index 19 is "String must contain at most 4000 character(s)" at the tip. At the base it is
  "Components displayable text size exceeds maximum size of 4000".
- **CR-2:** under zod 3.25.76, the 40×40 input is refused with 1,600 issues and 317,602 characters, and no summary is added. Under
  zod 3.22.4 the same input is refused with 21 issues and 4,049 characters.
