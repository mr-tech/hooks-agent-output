#!/bin/bash
# pig-host-read.sh — read-only PM2 stop-path read for preview-image-generator (plan 015, M8-0).
#
# Source: analysis/015-bug-evaluation-fixes-analysis.md § "Host observation" and § Findings V-1, V-3.
#
# WHO RUNS IT: the owner, on the DigitalOcean host that runs the generator, AS THE USER THAT OWNS
# THE PM2 DAEMON. Any `pm2` command run by another user, or with another PM2_HOME, finds no daemon
# and STARTS A NEW, EMPTY ONE. That is a write, and it would also report nothing. Step 1 therefore
# finds the daemon with `ps` and refuses to call `pm2` unless all of these hold:
#   - the current user is the daemon's user;
#   - PM2_HOME is the daemon's PM2_HOME;
#   - the daemon's RPC socket exists.
#
# USAGE:
#   bash pig-host-read.sh hooks-image-preview-generator-prod      # run 1: before M8 approval
#   bash pig-host-read.sh hooks-image-preview-generator-preview   # run 2: after the preview push
# Paste the whole output back. Nothing is written to disk.
#
# WHAT IT DOES NOT DO:
#   - It starts, stops, reloads, saves and resets nothing.
#   - It never calls `pm2 show`. `pm2 show` prints a "Divergent env variables from local env" table
#     holding your shell's environment values (lib/API/UX/pm2-describe.js).
#   - It never prints `pm2 jlist` unfiltered, because jlist carries the app's env, including API_KEY.
#     Only the named non-secret fields are printed.
#   - It reads the daemon's environment only for keys matching ^PM2_KILL_.
#
# PREDICTION (analysis V-1), for run 1 against prod. The analysis predicts:
#   [3] shutdown_with_message: true, kill_timeout: 5000
#   [4] no PM2_KILL_SIGNAL / PM2_KILL_USE_MESSAGE / PM2_KILL_TIMEOUT override
#   [5a] the out log holds ZERO "Server received SIGINT" lines
#   [5b] pm2.log shows each "Stopping app:<app> id:N" followed, about 5 s later, by
#        "Process with pid <p> still alive after 5000ms, sending ... SIGKILL"
# What REFUTES it, and re-opens M8-a:
#   - a "Server received SIGINT" line timed at a stop in [5a]/[5b];
#   - a stop followed by "msg=process killed" / "process tree killed" with no "still alive" line;
#   - shutdown_with_message false or absent in [3];
#   - PM2_KILL_USE_MESSAGE or PM2_KILL_SIGNAL set in [4]. This changes the branch PM2 takes rather
#     than refuting V-1 outright; report it as-is.
# A log that no longer covers any stop (rotated) is INCONCLUSIVE for [5], not a refutation. [3] and
# [4] still settle the mechanism.
#
# EXPECTED for run 2, against the preview instance after the M8 push (plan M8-a criterion):
#   [3] shutdown_with_message set explicitly (true or false), kill_timeout: 12000
#   [5a] exactly one "Server received ..." shutdown line for the reload, followed by "Server closed."
#   [5b] the reload's "Stopping app" is followed by "msg=process killed" (5.x/6.x) or
#        "process tree killed" (7.x), with NO "still alive after" line, and in under 12000 ms.
#        Stop-to-killed time is the drain measurement.
#   [6] (PM2 >= 7 only) no Chromium process whose parent is pid 1.
# The run-1 prediction does NOT apply to run 2. Run 2 is checked against these expectations.

set -u
APP="${1:-}"
case "$APP" in
  hooks-image-preview-generator-prod|hooks-image-preview-generator-preview) ;;
  *) echo "usage: $0 hooks-image-preview-generator-prod|hooks-image-preview-generator-preview" >&2; exit 2 ;;
esac

# --- resolve every tool once, by absolute path, and print it -------------------------------------
resolve() { local p; p="$(command -v "$1" 2>/dev/null)" || true
  case "$p" in /*) printf '%s' "$p" ;; *) echo "MISSING TOOL: $1" >&2; exit 3 ;; esac; }
PS="$(resolve ps)";     GREP="$(resolve grep)"; TR="$(resolve tr)";     TAIL="$(resolve tail)"
AWK="$(resolve awk)";   SED="$(resolve sed)";   ID="$(resolve id)";     DATE="$(resolve date)"
NODE="$(resolve node)"; PM2="$(resolve pm2)";   HOSTNAME_BIN="$(resolve hostname)"

echo "=== pig-host-read.sh  app=$APP  host=$("$HOSTNAME_BIN")  at=$("$DATE" -u +%Y-%m-%dT%H:%M:%SZ)  as=$("$ID" -un)"
echo "--- tools: ps=$PS grep=$GREP tr=$TR tail=$TAIL awk=$AWK sed=$SED id=$ID date=$DATE node=$NODE pm2=$PM2"

# --- [1] daemon: version, user, pid, PM2_HOME — from the process title, no connection -----------
# The title is "PM2 v<version>: God Daemon (<PM2_HOME>)" (lib/Daemon.js, every version read).
echo; echo "[1] PM2 daemon(s) from ps (no connection):"
DAEMONS="$("$PS" -eo user=,pid=,lstart=,args= | "$GREP" '[G]od Daemon')"
if [ -z "$DAEMONS" ]; then echo "  NO PM2 DAEMON RUNNING. Stopping before any pm2 call."; exit 4; fi
echo "$DAEMONS" | "$SED" 's/^/  /'
ME="$("$ID" -un)"
MINE="$(echo "$DAEMONS" | "$AWK" -v me="$ME" '$1==me')"
if [ -z "$MINE" ]; then
  echo "  No daemon is owned by '$ME'. Re-run as the daemon's user (first column above). Stopping before any pm2 call."
  exit 5
fi
if [ "$(echo "$MINE" | "$GREP" -c .)" -ne 1 ]; then
  echo "  More than one daemon owned by '$ME'. Stopping; paste this output instead."; exit 6
fi
DPID="$(echo "$MINE" | "$AWK" '{print $2}')"
DVER="$(echo "$MINE" | "$SED" -n 's/.*PM2 v\([^:]*\): God Daemon.*/\1/p')"
DHOME="$(echo "$MINE" | "$SED" -n 's/.*God Daemon (\(.*\))$/\1/p')"
echo "  daemon pid=$DPID version=$DVER PM2_HOME=$DHOME"
if [ -z "$DHOME" ] || [ ! -S "$DHOME/rpc.sock" ]; then
  echo "  RPC socket $DHOME/rpc.sock not found. Stopping before any pm2 call (pm2 would spawn a daemon)."; exit 7
fi
export PM2_HOME="$DHOME"

# --- [2] CLI version (connects to the running daemon; prints a banner if CLI != daemon) ---------
echo; echo "[2] pm2 CLI version (daemon version is in [1]; the daemon's runs the kill):"
"$PM2" -v 2>&1 | "$SED" 's/^/  /'

# --- [3] live stop configuration of the app, filtered: no env, no secrets ------------------------
echo; echo "[3] pm2 jlist, filtered to non-secret fields of '$APP':"
JL_OUT="$("$PM2" jlist 2>/dev/null | APP="$APP" "$NODE" -e '
let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
  const line=s.split("\n").find(l=>l.startsWith("["));
  if(!line){console.log("  jlist produced no JSON");return;}
  const hits=JSON.parse(line).filter(p=>p.name===process.env.APP);
  if(hits.length===0){console.log("  NO PROCESS NAMED "+process.env.APP);return;}
  for(const p of hits){const e=p.pm2_env||{};
    console.log("  "+JSON.stringify({pm_id:e.pm_id,pid:p.pid,status:e.status,exec_mode:e.exec_mode,
      kill_timeout:e.kill_timeout===undefined?"(absent: PM2 default 1600)":e.kill_timeout,
      shutdown_with_message:e.shutdown_with_message===undefined?"(absent: false)":e.shutdown_with_message,
      treekill:e.treekill,pm_uptime:e.pm_uptime?new Date(e.pm_uptime).toISOString():null,
      restart_time:e.restart_time}));
    console.log("OUTLOG="+(e.pm_out_log_path||""));}
});')"
echo "$JL_OUT" | "$GREP" -v '^OUTLOG='
OUTLOG="$(echo "$JL_OUT" | "$SED" -n 's/^OUTLOG=//p' | "$TAIL" -n 1)"
echo "  saved dump ($DHOME/dump.pm2), the same keys for '$APP' only:"
if [ -r "$DHOME/dump.pm2" ]; then
  APP="$APP" "$NODE" -e '
    const d=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));
    for(const p of d.filter(x=>x.name===process.env.APP))
      console.log("    "+JSON.stringify({kill_timeout:p.kill_timeout,shutdown_with_message:p.shutdown_with_message,treekill:p.treekill}));
  ' "$DHOME/dump.pm2" 2>&1 | "$SED" 's/^/  /'
else echo "    (no readable dump.pm2)"; fi

# --- [4] daemon environment: PM2_KILL_* keys only ------------------------------------------------
echo; echo "[4] daemon PM2_KILL_* overrides (empty = none):"
"$TR" '\0' '\n' < "/proc/$DPID/environ" 2>/dev/null | "$GREP" -E '^PM2_KILL_(SIGNAL|USE_MESSAGE|TIMEOUT|RETRY_TIME)=' | "$SED" 's/^/  /'

# --- [5a] app out log: shutdown lines ------------------------------------------------------------
echo; echo "[5a] app out log: ${OUTLOG:-(unknown)}"
if [ -n "$OUTLOG" ] && [ -r "$OUTLOG" ]; then
  echo "  count of 'Server received': $("$GREP" -c 'Server received' "$OUTLOG")"
  echo "  last shutdown-related lines:"
  "$GREP" -n 'Server received\|Server closed\|Server running at' "$OUTLOG" | "$TAIL" -n 10 | "$SED" 's/^/    /'
  echo "  first line of the log (how far back it reaches):"
  "$SED" -n '1p' "$OUTLOG" | "$SED" 's/^/    /'
else echo "  out log not readable"; fi

# --- [5b] PM2 daemon log: the stop sequence for this app -----------------------------------------
echo; echo "[5b] $DHOME/pm2.log, stop/kill lines (last 30):"
if [ -r "$DHOME/pm2.log" ]; then
  "$GREP" -n "Stopping app:$APP \|still alive after\|msg=process killed\|process tree killed\|\[AppKill\]\|could not be killed" "$DHOME/pm2.log" | "$TAIL" -n 30 | "$SED" 's/^/  /'
  echo "  first line of pm2.log:"; "$SED" -n '1p' "$DHOME/pm2.log" | "$SED" 's/^/    /'
else echo "  pm2.log not readable"; fi

# --- [6] Chromium processes orphaned to pid 1 (matters only when the daemon is >= 7) -------------
echo; echo "[6] chromium processes whose parent is pid 1 (daemon v$DVER; relevant only for v7+):"
"$PS" -eo pid=,ppid=,lstart=,comm= | "$AWK" '$2==1 && $NF ~ /chrom/' | "$TAIL" -n 20 | "$SED" 's/^/  /'
echo "  count: $("$PS" -eo ppid=,comm= | "$AWK" '$1==1 && $2 ~ /chrom/' | "$GREP" -c .)"

echo; echo "=== end"
