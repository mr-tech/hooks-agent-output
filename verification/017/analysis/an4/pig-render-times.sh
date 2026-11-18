#!/bin/bash
# pig-render-times.sh — read-only render-time read for preview-image-generator (plan 017, AN-4, gap G-3).
#
# Commission: planning/017-existing-items-backlog.md § "Analysis commissioned" AN-4 (agent-output 43129a3).
# Route: steering/017-rulings.md block 2026-11-18T23:15Z; analyst brief, amendment 23:15Z (6c17041).
#
# HOW IT RUNS: as claude-ro on the generator host, streamed over the standing ssh alias. Nothing is
# copied to the host:
#     ssh hooks-pig 'bash -s' < verification/017/analysis/an4/pig-render-times.sh
# Local fixture test: PIG_FIXTURE=<dir> bash pig-render-times.sh  (reads <dir> instead of /etc/.pm2/logs,
# and skips the claude-ro identity check). It is never set on the host.
#
# WHAT IT READS (src/server.ts at 8de2b53):
#   - out log, on each success: "<Date> Generated image for message <id> with nonce <nonce> in <N>ms"
#   - out log, on each request: "<Date> <METHOD> <url>"   (console.debug(req.method, req.url))
#   - error log: console.error(err) stacks, with no timestamp
#
# RULES IT KEEPS (those of verification/015/pig-host-read.sh, plus the AN-4 brief):
#   - Reads only. No pm2 command. Writes nothing: no temp files, no redirection into a file.
#   - Fixed-shape greps only. Nothing prints a log line. Output is only numbers, ISO timestamps
#     taken from matching lines, and file names, sizes and mtimes. Never an id, a nonce or a URL.

set -u
PATH=/usr/bin:/bin
APPS="hooks-image-preview-generator-prod hooks-image-preview-generator-preview"
L="${PIG_FIXTURE:-/etc/.pm2/logs}"

resolve() { local p; p="$(command -v "$1" 2>/dev/null)" || true; case "$p" in /*) printf '%s' "$p" ;; *) printf '' ;; esac; }
GREP="$(resolve grep)"; AWK="$(resolve awk)"; SORT="$(resolve sort)"; LS="$(resolve ls)"
ID="$(resolve id)"; DATE="$(resolve date)"; HOSTNAME_BIN="$(resolve hostname)"; ZCAT="$(resolve zcat)"
for t in GREP AWK SORT LS ID DATE HOSTNAME_BIN; do
  [ -n "${!t}" ] || { echo "MISSING TOOL: $t"; exit 3; }
done

ME="$("$ID" -un)"
echo "=== pig-render-times.sh  host=$("$HOSTNAME_BIN")  at=$("$DATE" -u +%Y-%m-%dT%H:%M:%SZ)  as=$ME  logs=$L"
if [ -z "${PIG_FIXTURE:-}" ]; then
  [ "$ME" = "claude-ro" ] || { echo "Refusing: run as claude-ro only (got '$ME')."; exit 5; }
fi
echo "--- no pm2 command is run; nothing is written; zcat=${ZCAT:-(absent)}"

# cat one file, decompressing .gz when zcat exists; a .gz without zcat is skipped and said so
emit() {
  case "$1" in
    *.gz) if [ -n "$ZCAT" ]; then "$ZCAT" -f -- "$1" 2>/dev/null; else echo "SKIPPED-GZ" >&2; fi ;;
    *) "$GREP" -h '' -- "$1" 2>/dev/null ;;
  esac
}

echo; echo "[0] generator log files (name size mtime):"
"$LS" -l --time-style=+%Y-%m-%dT%H:%M:%S%z "$L" 2>&1 | "$GREP" 'hooks-image-preview-generator' | "$AWK" '{print "  "$7"  "$5"  "$6}'

TS='[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}T[0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}'
for APP in $APPS; do
  echo; echo "== $APP"
  OUTS="$("$LS" -1 "$L" 2>/dev/null | "$GREP" "^$APP-out" )"
  ERRS="$("$LS" -1 "$L" 2>/dev/null | "$GREP" "^$APP-error" )"
  if [ -z "$OUTS" ]; then echo "  no out log"; continue; fi
  echo "  out files read: $(echo $OUTS)"
  echo "  error files read: $(echo ${ERRS:-(none)})"

  echo "  [1] success lines and render-plus-store ms (n min p50 p95 p99 max mean):"
  for f in $OUTS; do emit "$L/$f"; done \
    | "$GREP" 'Generated image for message .* with nonce .* in [0-9][0-9]*ms$' \
    | "$GREP" -o ' in [0-9][0-9]*ms$' | "$GREP" -o '[0-9][0-9]*' | "$SORT" -n \
    | "$AWK" '{v[NR]=$1; s+=$1}
        function q(p,  i){ i=int(p*NR+0.999999); if(i<1)i=1; if(i>NR)i=NR; return v[i] }
        END{ if(NR==0){print "    n=0"; exit}
             printf "    n=%d min=%d p50=%d p95=%d p99=%d max=%d mean=%.0f\n", NR, v[1], q(0.50), q(0.95), q(0.99), v[NR], s/NR }'

  echo "  [2] buckets (ms):"
  for f in $OUTS; do emit "$L/$f"; done \
    | "$GREP" 'Generated image for message .* with nonce .* in [0-9][0-9]*ms$' \
    | "$GREP" -o ' in [0-9][0-9]*ms$' | "$GREP" -o '[0-9][0-9]*' \
    | "$AWK" '{ if($1<1000)a++; else if($1<2000)b++; else if($1<5000)c++; else if($1<10000)d++;
                else if($1<30000)e++; else if($1<60000)f++; else g++ }
        END{ printf "    <1000=%d 1000-1999=%d 2000-4999=%d 5000-9999=%d 10000-29999=%d 30000-59999=%d >=60000=%d\n",
             a,b,c,d,e,f,g }'

  echo "  [3] span of success lines (first / last timestamp on a success line):"
  for f in $OUTS; do emit "$L/$f"; done \
    | "$GREP" 'Generated image for message .* in [0-9][0-9]*ms$' | "$GREP" -o "$TS" | "$SORT" \
    | "$AWK" 'NR==1{f=$0} {l=$0} END{ if(NR) printf "    first=%s last=%s (timestamps matched: %d)\n", f, l, NR; else print "    none" }'

  echo "  [4] request lines over the same out files ('<ts> POST /' and any method):"
  echo "    POST lines: $(for f in $OUTS; do emit "$L/$f"; done | "$GREP" -c "$TS[^ ]* POST /")"
  echo "    any-method request lines: $(for f in $OUTS; do emit "$L/$f"; done | "$GREP" -c "$TS[^ ]* [A-Z][A-Z]* /")"
  echo "    success lines: $(for f in $OUTS; do emit "$L/$f"; done | "$GREP" -c 'Generated image for message .* in [0-9][0-9]*ms$')"
  echo "    'Server running at' (starts): $(for f in $OUTS; do emit "$L/$f"; done | "$GREP" -c 'Server running at')"

  echo "  [5] error files, count-only (no timestamps exist in them):"
  if [ -n "$ERRS" ]; then
    echo "    stack heads (^<Name>Error or ^Error at line start): $(for f in $ERRS; do emit "$L/$f"; done | "$GREP" -c '^[A-Za-z]*Error\b')"
    echo "    '    at ' frame lines: $(for f in $ERRS; do emit "$L/$f"; done | "$GREP" -c '^    at ')"
    echo "    TimeoutError heads: $(for f in $ERRS; do emit "$L/$f"; done | "$GREP" -c '^TimeoutError\b')"
  else
    echo "    none"
  fi
done
echo; echo "=== end"
