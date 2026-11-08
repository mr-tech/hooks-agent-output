#!/usr/bin/env bash
# Usage: run.sh <agent-output sha | WORKTREE>
# Runs verification/015/pig-host-read.sh (at that commit, or the working tree) against two synthetic PM2_HOMEs,
# with H pointed at the fixture and the claude-ro refusal removed, and prints only section [6].
# Output: span-read-<sha|WORKTREE>.txt beside this script. Fixtures are built in a mktemp dir and removed.
#
# Fixture 1 (the analyst's, first run 2026-11-08 before the 21:39Z host run): four prod stops, Jan/Feb/Mar/Apr.
#   span 1 (Jan->Feb): clean. Expected: Server received 1, Drain complete 1 (734ms), Created instance 1,
#           POST /generate 1, one untimestamped 'POST /generate' kept out of the figure, exit 3 s.
#   span 2 (Feb->Mar): a ready line on Feb 15 inside the span. Expected: RESTARTS 1, figures withheld.
#   span 3 (Mar->Apr): no ready line after the April stop. Expected: NO SPAN, End (none).
# Fixture 2 (code-reviewer's CR-41 case, from verification/015/cr-m8-probes/span-read/run.sh): stops A 10:00,
#   B 11:00, C 12:00; the process after A never logs ready.
#   Expected: span 1 (A->B) NO SPAN (Start not before stop B); span 2 (B->C) Created instance 1.
set -u
REF=${1:?usage: run.sh <sha|WORKTREE>}
HERE=$(cd "$(dirname "$0")" && pwd); R=/usr/local/bin/hooks/agent-output
P=hooks-image-preview-generator-prod
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
OUTF="$HERE/span-read-$REF.txt"; : > "$OUTF"

mkfx() { mkdir -p "$T/$1/logs"; : > "$T/$1/logs/$P-error.log"; }
mkfx fx1
printf '%s\n' \
"2024-01-01T00:00:00: PM2 log: Stopping app:$P id:0" \
"2024-01-01T00:00:05: PM2 log: Process with pid 1 still alive after 5000ms, sending it SIGKILL now..." \
"2024-01-01T00:00:05: PM2 log: App [$P:0] exited with code [0] via signal [SIGKILL]" \
"2024-02-01T00:00:00: PM2 log: Stopping app:$P id:0" \
"2024-02-01T00:00:03: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]" \
"2024-03-01T00:00:00: PM2 log: Stopping app:$P id:0" \
"2024-03-01T00:00:02: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]" \
"2024-04-01T00:00:00: PM2 log: Stopping app:$P id:0" > "$T/fx1/pm2.log"
printf '%s\n' \
"Server running at http://0.0.0.0:3000/" \
"2024-01-01T00:00:10.000Z Server running at http://0.0.0.0:3000/" \
"2024-01-01T00:01:00.000Z Created instance 1. Active instances: 1." \
"2024-01-01T00:01:00.100Z POST /generate" \
"2024-01-01T00:01:00.200Z GET /favicon.ico" \
"untimestamped POST /generate" \
"2024-02-01T00:00:00.500Z Server received shutdown message. Closing server." \
"2024-02-01T00:00:01.000Z Server closed." \
"2024-02-01T00:00:01.234Z Drain complete in 734ms." \
"2024-02-01T00:00:04.000Z Server running at http://0.0.0.0:3000/" \
"2024-02-15T00:00:00.000Z Server running at http://0.0.0.0:3000/" \
"2024-03-01T00:00:03.000Z Server running at http://0.0.0.0:3000/" > "$T/fx1/logs/$P-out.log"

mkfx fx2
printf '%s\n' \
"2026-01-01T09:00:00: PM2 log: App [$P:0] online" \
"2026-01-01T10:00:00: PM2 log: Stopping app:$P id:0" \
"2026-01-01T10:00:01: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]" \
"2026-01-01T11:00:00: PM2 log: Stopping app:$P id:0" \
"2026-01-01T11:00:01: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]" \
"2026-01-01T12:00:00: PM2 log: Stopping app:$P id:0" \
"2026-01-01T12:00:01: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]" > "$T/fx2/pm2.log"
printf '%s\n' \
"2026-01-01T09:00:00.500Z Server running at http://0.0.0.0:3000/" \
"2026-01-01T10:30:00.000Z Created instance 1" \
"2026-01-01T11:00:00.500Z Server received SIGINT" \
"2026-01-01T11:00:02.000Z Server running at http://0.0.0.0:3000/" \
"2026-01-01T11:30:00.000Z Created instance 1" \
"2026-01-01T12:00:02.000Z Server running at http://0.0.0.0:3000/" > "$T/fx2/logs/$P-out.log"

# Fixture 3 (the End guard of CR-41): stops A 10:00, B 11:00, C 12:00; the process after A is ready at 10:00:02
#   and stopped by B; the process after B never logs ready; the one after C is ready at 12:00:02.
#   Expected: span 1 (A->B) NO SPAN (End not before the next stop C); span 2 (B->C) NO SPAN (Start not before C).
mkfx fx3
printf '%s\n' \
"2026-02-01T10:00:00: PM2 log: Stopping app:$P id:0" \
"2026-02-01T11:00:00: PM2 log: Stopping app:$P id:0" \
"2026-02-01T11:00:01: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]" \
"2026-02-01T12:00:00: PM2 log: Stopping app:$P id:0" \
"2026-02-01T12:00:01: PM2 log: App [$P:0] exited with code [0] via signal [SIGINT]" > "$T/fx3/pm2.log"
printf '%s\n' \
"2026-02-01T10:00:02.000Z Server running at http://0.0.0.0:3000/" \
"2026-02-01T10:30:00.000Z Created instance 1" \
"2026-02-01T11:30:00.000Z Created instance 2" \
"2026-02-01T12:00:02.000Z Server running at http://0.0.0.0:3000/" > "$T/fx3/logs/$P-out.log"

if [ "$REF" = WORKTREE ]; then cat "$R/verification/015/pig-host-read.sh" > "$T/src.sh"
else git -C "$R" show "$REF:verification/015/pig-host-read.sh" > "$T/src.sh"; fi
for FX in fx1 fx2 fx3; do
  sed "s|^H=/etc/.pm2\$|H=$T/$FX|; s|^\[ \"\$ME\" = \"claude-ro\" \].*\$|:|" "$T/src.sh" > "$T/$FX.sh"
  echo "##### $FX (H substitutions applied: $(grep -c "^H=$T/$FX\$" "$T/$FX.sh"))" >> "$OUTF"
  bash "$T/$FX.sh" 2>&1 | sed -n '/^\[6\]/,$p' | sed "s|$T/|<fixture>/|g" >> "$OUTF"
done
echo "wrote $OUTF"
