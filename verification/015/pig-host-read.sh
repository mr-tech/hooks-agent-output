#!/bin/bash
# pig-host-read.sh — read-only PM2 stop-path read for preview-image-generator (plan 015, M8-0).
#
# Source: analysis/015-bug-evaluation-fixes-analysis.md § "Host observation" and § Findings V-1, V-3.
# Route: steering/015-rulings.md blocks 2026-11-08T05:20Z, 05:21Z and 05:24Z.
#
# HOW IT RUNS: as claude-ro on the generator host, streamed over the standing ssh alias. Nothing is
# copied to the host:
#     ssh hooks-pig 'bash -s' < verification/015/pig-host-read.sh
# It reads BOTH instances in one run: hooks-image-preview-generator-prod and -preview.
#
# HOST FACTS (05:20Z / 05:21Z):
#   - The generator runs under ROOT's PM2 v5.2.2 daemon, with PM2_HOME /etc/.pm2.
#   - claude-ro can read /etc/.pm2/pm2.log, /etc/.pm2/dump.pm2 and every file in /etc/.pm2/logs.
#
# RULES THIS SCRIPT KEEPS (05:21Z standing reads; 05:24Z OQ-H):
#   - It is reads only. It never runs a pm2 command, and it writes nothing: no temp files and no
#     redirection into a file.
#   - /etc/.pm2/dump.pm2 is read only through a filtered extract, ON THE HOST. Per app it prints only
#     name, kill_timeout and shutdown_with_message, never env. Parser stderr is discarded, because
#     JSON-parse errors can quote input text; only an exit status is printed.
#   - /home/nodejs/.pm2/dump.pm2 is NEVER opened. The nodejs daemon is not the generator's.
#   - The root daemon's /proc/<pid>/environ is not read, because it could hold secrets.
#     PM2_KILL_* overrides therefore remain unobserved.
#   - Log reads are grep for fixed shapes only. Nothing prints a log wholesale.
#
# PREDICTION (analysis V-1), for run 1, before M8 approval. The analysis predicts:
#   [2] shutdown_with_message: true and kill_timeout: 5000 for the prod app
#   [3] ZERO lines carrying the shutdown prefix "Server received" in each app's out log
#   [4] each "Stopping app:<app> id:N" in pm2.log followed, about 5 s later, by
#       "Process with pid <p> still alive after 5000ms, sending it SIGKILL now..."
#       (5.2.2 wording, lib/God/Methods.js God.processIsDead)
# What REFUTES it, and re-opens M8-a:
#   - a "Server received" line timed at a stop;
#   - a stop followed by "pid=<p> msg=process killed" with no "still alive" line;
#   - shutdown_with_message false or absent in [2].
# WHAT IS INCONCLUSIVE, NOT CONFIRMATION:
#   - zero "Stopping app" lines for an app: no stop is on record, so there is nothing to test against.
#   - a log whose coverage (first timestamp) starts after the last deploy.
#   Zero shutdown lines with no recorded stop says nothing about V-1.
#
# EXPECTED for run 2, after the M8 preview push (plan M8-a criterion), for the -preview app:
#   [2] shutdown_with_message set explicitly, kill_timeout: 12000
#   [3] one "Server received ..." line per reload (the stable prefix P1 requires), then "Server closed."
#   [4] the reload's "Stopping app" followed by "msg=process killed" in under 12000 ms, with NO
#       "still alive after" line
#   [5] no Chromium process whose parent is pid 1

set -u
PATH=/usr/bin:/bin
APPS="hooks-image-preview-generator-prod hooks-image-preview-generator-preview"
H=/etc/.pm2
FORBIDDEN=/home/nodejs/.pm2/dump.pm2   # named only to state it is never opened

resolve() { local p; p="$(command -v "$1" 2>/dev/null)" || true; case "$p" in /*) printf '%s' "$p" ;; *) printf '' ;; esac; }
PS="$(resolve ps)"; GREP="$(resolve grep)"; AWK="$(resolve awk)"; SED="$(resolve sed)"; TAIL="$(resolve tail)"
HEAD="$(resolve head)"; LS="$(resolve ls)"; ID="$(resolve id)"; DATE="$(resolve date)"; HOSTNAME_BIN="$(resolve hostname)"
JQ="$(resolve jq)"; NODE="$(resolve node)"
for t in PS GREP AWK SED TAIL HEAD LS ID DATE HOSTNAME_BIN; do
  [ -n "${!t}" ] || { echo "MISSING TOOL: $t"; exit 3; }
done

ME="$("$ID" -un)"
echo "=== pig-host-read.sh  host=$("$HOSTNAME_BIN")  at=$("$DATE" -u +%Y-%m-%dT%H:%M:%SZ)  as=$ME"
[ "$ME" = "claude-ro" ] || { echo "Refusing: run as claude-ro only (got '$ME')."; exit 5; }
echo "--- tools: ps=$PS grep=$GREP awk=$AWK sed=$SED tail=$TAIL head=$HEAD ls=$LS id=$ID date=$DATE hostname=$HOSTNAME_BIN jq=${JQ:-(absent)} node=${NODE:-(absent)}"
echo "--- never opened: $FORBIDDEN ; no pm2 command is run"

# --- [1] daemons and app processes, from ps (no connection) ---------------------------------------
echo; echo "[1] PM2 daemons (title 'PM2 v<ver>: God Daemon (<PM2_HOME>)'):"
"$PS" -eo user=,pid=,lstart=,args= | "$GREP" '[G]od Daemon' | "$SED" 's/^/  /'
echo "  generator processes (pid ppid user start args):"
"$PS" -eo pid=,ppid=,user=,lstart=,args= | "$GREP" '[h]ooks-image-preview-generator' | "$SED" 's/^/  /'

# --- [2] root dump.pm2: filtered extract, on the host ---------------------------------------------
echo; echo "[2] $H/dump.pm2 extract (name, kill_timeout, shutdown_with_message only; saved by the last 'pm2 save'):"
"$LS" -l --time-style=+%Y-%m-%dT%H:%M:%S%z "$H/dump.pm2" 2>&1 | "$AWK" '{print "  file: "$6" size="$5}'
if [ -n "$JQ" ]; then
  echo "  parser: jq"
  "$JQ" -c '.[] | {name: .name, kill_timeout: .kill_timeout, shutdown_with_message: .shutdown_with_message}' "$H/dump.pm2" 2>/dev/null | "$SED" 's/^/  /'
  echo "  jq exit=${PIPESTATUS[0]}"
elif [ -n "$NODE" ]; then
  echo "  parser: node"
  "$NODE" -e '
    let d; try { d = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8")); }
    catch (e) { console.log("  dump unreadable or not JSON (detail suppressed)"); process.exit(1); }
    if (!Array.isArray(d)) { console.log("  dump is not an array (detail suppressed)"); process.exit(1); }
    for (const p of d) console.log("  " + JSON.stringify({ name: typeof p.name === "string" ? p.name : "(non-string)",
      kill_timeout: p.kill_timeout === undefined ? "(absent)" : p.kill_timeout,
      shutdown_with_message: p.shutdown_with_message === undefined ? "(absent)" : p.shutdown_with_message }));
  ' "$H/dump.pm2" 2>/dev/null
  echo "  node exit=$?"
else
  echo "  NO jq AND NO node on PATH; extract not taken"
fi

# --- [3] each app's out/error log: the shutdown prefix --------------------------------------------
echo; echo "[3] $H/logs (names, sizes, mtimes):"
"$LS" -l --time-style=+%Y-%m-%dT%H:%M:%S%z "$H/logs" 2>&1 | "$AWK" 'NR>1{print "  "$6"  "$5"  "$7}'
for APP in $APPS; do
  OUT="$H/logs/$APP-out.log"
  echo "  -- $APP"
  if [ -r "$OUT" ]; then
    echo "     out log lines: $("$GREP" -c '' "$OUT")"
    echo "     'Server received' count: $("$GREP" -c 'Server received' "$OUT")"
    echo "     'Server closed' count:   $("$GREP" -c 'Server closed' "$OUT")"
    echo "     'Server running at' count (starts): $("$GREP" -c 'Server running at' "$OUT")"
    echo "     last shutdown/start lines:"
    "$GREP" -n 'Server received\|Server closed\|Server running at' "$OUT" | "$TAIL" -n 10 | "$SED" 's/^/       /'
  else
    echo "     $OUT not present or not readable"
  fi
done

# --- [4] pm2.log: the stop sequence ----------------------------------------------------------------
echo; echo "[4] $H/pm2.log:"
if [ -r "$H/pm2.log" ]; then
  echo "  coverage: first timestamped line / last timestamped line:"
  "$GREP" -m1 -o '^[0-9]\{4\}-[0-9-]*T[0-9:]*' "$H/pm2.log" | "$SED" 's/^/    first: /'
  "$GREP" -o '^[0-9]\{4\}-[0-9-]*T[0-9:]*' "$H/pm2.log" | "$TAIL" -n 1 | "$SED" 's/^/    last:  /'
  for APP in $APPS; do
    echo "  -- $APP: 'Stopping app' count: $("$GREP" -c "Stopping app:$APP " "$H/pm2.log")"
  done
  echo "  'still alive after' count: $("$GREP" -c 'still alive after' "$H/pm2.log")"
  echo "  'msg=process killed' count: $("$GREP" -c 'msg=process killed' "$H/pm2.log")"
  echo "  stop/kill/lifecycle lines for the generator, last 40:"
  "$GREP" -n "Stopping app:hooks-image-preview-generator\|still alive after\|msg=process killed\|could not be killed\|\[AppKill\]\|App \[hooks-image-preview-generator[^]]*\] \(starting\|online\|exited\)" "$H/pm2.log" \
    | "$TAIL" -n 40 | "$SED" 's/^/    /'
else
  echo "  not readable"
fi

# --- [5] Chromium processes orphaned to pid 1 -----------------------------------------------------
echo; echo "[5] chromium processes whose parent is pid 1 (pid ppid user start comm):"
"$PS" -eo pid=,ppid=,user=,lstart=,comm= | "$AWK" '$2==1 && $NF ~ /chrom/' | "$HEAD" -n 20 | "$SED" 's/^/  /'
echo "  count: $("$PS" -eo ppid=,comm= | "$AWK" '$1==1 && $2 ~ /chrom/' | "$GREP" -c .)"
echo "  all chromium processes: $("$PS" -eo comm= | "$GREP" -c chrom)"

echo; echo "=== end"
