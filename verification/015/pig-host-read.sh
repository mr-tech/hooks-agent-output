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
# [Superseded for run 2 by D16 (no preview instance): run 2 reads the PROD app's stop (2) through [6]; the
#  plan's criterion is in planning/closed/015-bug-evaluation-fixes.md § M8-0 "Criterion". Original text kept:]
# EXPECTED for run 2, after the M8 preview push (plan M8-a criterion), for the -preview app:
#   [2] shutdown_with_message set explicitly, kill_timeout: 12000
#   [3] one "Server received ..." line per reload (the stable prefix P1 requires), then "Server closed."
#   [4] the reload's "Stopping app" followed by "msg=process killed" in under 12000 ms, with NO
#       "still alive after" line
#   [5] no Chromium process other than chrome_crashpad whose parent is pid 1. In run 1
#       (fe27690), crashpad handlers sat under pid 1 while the generator had not been stopped since
#       2026-08-23, so they are not stop orphans and are listed separately.

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
echo; echo "[5] chromium processes (not chrome_crashpad) whose parent is pid 1 (pid ppid user start comm):"
"$PS" -eo pid=,ppid=,user=,lstart=,comm= | "$AWK" '$2==1 && $NF ~ /chrom/ && $NF != "chrome_crashpad"' | "$HEAD" -n 20 | "$SED" 's/^/  /'
echo "  count: $("$PS" -eo ppid=,comm= | "$AWK" '$1==1 && $2 ~ /chrom/ && $2 != "chrome_crashpad"' | "$GREP" -c .)"
echo "  chrome_crashpad under pid 1 (not a stop-orphan signal): $("$PS" -eo ppid=,comm= | "$AWK" '$1==1 && $2 == "chrome_crashpad"' | "$GREP" -c .)"
echo "  all chromium processes: $("$PS" -eo comm= | "$GREP" -c chrom)"

# --- [6] per-process span reads (plan 015 § M8-0 "Every run-2 read"; QAF-8, QAF-10, QAF-13, QAF-16; M-C3-1) ---
# For each consecutive pair of the PROD app's pm2.log "Stopping app" lines (stop A, stop B), this reads the
# process that stop B stopped:
#   Start = the earliest out-log "Server running at" line whose timestamp is at or after stop A's second;
#   End   = the earliest "Server running at" line whose timestamp is at or after stop B's second.
#   pm2.log stamps are whole seconds, zone-less local time (D23: the host runs UTC). Out-log stamps are UTC
#   ISO with ms (server.ts console.debug override). "At or after the stop's second" is used because the
#   stamp is truncated. No ready line of the stopped process can fall in its own stop's second.
#   Boundaries are chosen by timestamp (minimum over the log), never by line order.
# In-span lines are those whose ISO stamp satisfies Start <= stamp < End. Lines with no ISO stamp cannot be
# placed by time; they are counted separately (by line position between Start and End) and never enter a figure.
# A ready line strictly between Start and End is a crash-restart: each is listed, and that span's figures are
# NOT read (the read never picks one). A missing Start or End is reported as NO SPAN, never filled.
# Figures: 'Server received' (message begins with it) [plus any line containing it, as a cross-check];
# drain-complete / drain-failed lines with their elapsed ms; 'Created instance' (PRIMARY pool figure);
# 'POST /generate' (SECONDARY, counts unauthenticated requests too); and the exit time against stop B
# from pm2.log (whole seconds, so +/-1 s), with any 'still alive' line between stop B and the exit.
# Liveness (critic L-C3-1): 'Created instance' must read non-zero in some earlier span before run 2 relies on
# it; if every span reads zero, run 2 reports pool creation as not established.
PROD=hooks-image-preview-generator-prod
OUT="$H/logs/$PROD-out.log"
echo; echo "[6] per-process span reads for $PROD (stop pairs from $H/pm2.log; lines from $OUT):"
if [ ! -r "$H/pm2.log" ] || [ ! -r "$OUT" ]; then
  echo "  pm2.log or out log not readable; no span read"
else
  STOPS="$("$GREP" -n "PM2 log: Stopping app:$PROD id:" "$H/pm2.log" | "$SED" -n 's/^\([0-9]*\):\([0-9-]*T[0-9:]*\): .*/\1 \2/p' | "$SED" 's/:$//')"
  NSTOPS="$(printf '%s\n' "$STOPS" | "$GREP" -c .)"
  echo "  prod stops in pm2.log (line stamp): $NSTOPS"
  printf '%s\n' "$STOPS" | "$GREP" . | "$SED" 's/^/    /'
  READY_ISO='^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\.[0-9][0-9][0-9]Z Server running at '
  READIES="$("$GREP" -n "$READY_ISO" "$OUT" | "$AWK" -F: '{ print $1" "substr($0, length($1)+2, 24) }')"
  echo "  timestamped ready lines in out log: $(printf '%s\n' "$READIES" | "$GREP" -c .)"
  echo "  untimestamped ready lines in out log (not placeable): $("$GREP" -c '^Server running at ' "$OUT")"
  i=0; PREV_TS=""
  while read -r SLINE STS; do
    [ -n "${SLINE:-}" ] || continue
    i=$((i+1))
    if [ -z "$PREV_TS" ]; then PREV_TS="$STS"; continue; fi
    echo "  -- span $((i-1)): process stopped by stop B=$STS (pm2.log line $SLINE); started after stop A=$PREV_TS"
    # earliest ready at/after each stop second (by timestamp, not line order)
    START="$(printf '%s\n' "$READIES" | "$AWK" -v s="$PREV_TS" 'NF==2 && substr($2,1,19) >= s { if (best=="" || $2 < best) { best=$2; ln=$1 } } END { if (best!="") print ln" "best }')"
    END_="$(printf '%s\n' "$READIES" | "$AWK" -v s="$STS" 'NF==2 && substr($2,1,19) >= s { if (best=="" || $2 < best) { best=$2; ln=$1 } } END { if (best!="") print ln" "best }')"
    if [ -z "$START" ] || [ -z "$END_" ]; then
      echo "     NO SPAN: Start=${START:-(none)} End=${END_:-(none)}"
      PREV_TS="$STS"; continue
    fi
    set -- $START; S_LN=$1; S_TS=$2; set -- $END_; E_LN=$1; E_TS=$2
    echo "     Start: out line $S_LN at $S_TS   End: out line $E_LN at $E_TS"
    RESTARTS="$(printf '%s\n' "$READIES" | "$AWK" -v a="$S_TS" -v b="$E_TS" 'NF==2 && $2 > a && $2 < b { print "line "$1" at "$2 }')"
    NR_="$(printf '%s\n' "$RESTARTS" | "$GREP" -c .)"
    if [ "$NR_" -gt 0 ]; then
      echo "     RESTARTS inside span: $NR_ (figures NOT read for this span):"
      printf '%s\n' "$RESTARTS" | "$SED" 's/^/       /'
      PREV_TS="$STS"; continue
    fi
    "$AWK" -v a="$S_TS" -v b="$E_TS" -v sl="$S_LN" -v el="$E_LN" '
      function iso(s) { return s ~ /^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]:[0-9][0-9]\.[0-9][0-9][0-9]Z / }
      {
        if (iso($0)) {
          ts = substr($0, 1, 24); msg = substr($0, 26)
          if (ts < a || ts >= b) next
          n++
          if (index(msg, "Server received") == 1) recv++
          if (index(msg, "Server received") > 0) recvAny++
          if (index(msg, "Drain complete in ") == 1) { dc++; dcl = dcl "       " $0 "\n" }
          if (index(msg, "Drain failed after ") == 1) { df++; dfl = dfl "       " $0 "\n" }
          if (index(msg, "Created instance ") == 1) ci++
          if (msg == "POST /generate") pg++
          last = ts
        } else if (NR > sl && NR < el) {
          u++
          if (index($0, "Server received") > 0 || index($0, "Created instance") > 0 || index($0, "POST /generate") > 0 || index($0, "Drain ") > 0) um++
        }
      }
      END {
        printf "     timestamped lines in span: %d   last stamp in span: %s\n", n, (last == "" ? "(none)" : last)
        printf "     Server received (message begins with): %d   [any line containing it: %d]\n", recv, recvAny
        printf "     Drain complete lines: %d\n%s", dc, dcl
        printf "     Drain failed lines: %d\n%s", df, dfl
        printf "     Created instance (PRIMARY pool figure): %d\n", ci
        printf "     POST /generate (SECONDARY; includes unauthenticated): %d\n", pg
        printf "     untimestamped lines between Start and End lines (not counted above): %d, of which matching a figure word: %d\n", u, um
      }' "$OUT"
    # exit time against stop B, from pm2.log (whole seconds)
    EXITLN="$("$AWK" -v from="$SLINE" -v app="$PROD" 'NR > from && index($0, "App [" app ":") && index($0, "] exited with code") { print NR": "$0; exit }' "$H/pm2.log")"
    echo "     pm2.log exit line after stop B: ${EXITLN:-(none found)}"
    if [ -n "$EXITLN" ]; then
      X_TS="$(printf '%s' "$EXITLN" | "$SED" -n 's/^[0-9]*: \([0-9-]*T[0-9:]*\): .*/\1/p' | "$SED" 's/:$//')"
      X_LN="${EXITLN%%:*}"
      A_S="$("$DATE" -u -d "${STS/T/ }" +%s 2>/dev/null)"; B_S="$("$DATE" -u -d "${X_TS/T/ }" +%s 2>/dev/null)"
      if [ -n "$A_S" ] && [ -n "$B_S" ]; then echo "     exit - stop B: $((B_S - A_S)) s (pm2.log whole-second stamps, +/-1 s)"; else echo "     exit - stop B: not computable"; fi
      echo "     'still alive' / SIGKILL lines between stop B and the exit line:"
      "$AWK" -v a="$SLINE" -v b="$X_LN" 'NR > a && NR <= b && (index($0, "still alive after") || index($0, "SIGKILL"))' "$H/pm2.log" | "$SED" 's/^/       /'
    fi
    PREV_TS="$STS"
  done < <(printf '%s\n' "$STOPS")   # process substitution: a pipe, no here-doc temp file
fi

echo; echo "=== end"
