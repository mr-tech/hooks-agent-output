#!/bin/bash
# pig-generate-counts.sh — read-only follow-up to pig-render-times.sh (plan 017, AN-4).
# Same route, same rules: as claude-ro over `ssh hooks-pig 'bash -s' < <this file>`; reads only, no pm2
# command, nothing written, counts and ISO timestamps only, never an id, a nonce or a log line.
# Question: of the out log's POST lines, how many are POST /generate, and how do requests and successes
# compare over the whole log and over the last 30 days (by the line's own timestamp)?
set -u
PATH=/usr/bin:/bin
L="${PIG_FIXTURE:-/etc/.pm2/logs}"
APP=hooks-image-preview-generator-prod
OUT="$L/$APP-out.log"
resolve() { local p; p="$(command -v "$1" 2>/dev/null)" || true; case "$p" in /*) printf '%s' "$p" ;; *) printf '' ;; esac; }
GREP="$(resolve grep)"; AWK="$(resolve awk)"; ID="$(resolve id)"; DATE="$(resolve date)"; HOSTNAME_BIN="$(resolve hostname)"
for t in GREP AWK ID DATE HOSTNAME_BIN; do [ -n "${!t}" ] || { echo "MISSING TOOL: $t"; exit 3; }; done
ME="$("$ID" -un)"
echo "=== pig-generate-counts.sh host=$("$HOSTNAME_BIN") at=$("$DATE" -u +%Y-%m-%dT%H:%M:%SZ) as=$ME"
[ -n "${PIG_FIXTURE:-}" ] || [ "$ME" = "claude-ro" ] || { echo "Refusing: run as claude-ro only (got '$ME')."; exit 5; }
[ -r "$OUT" ] || { echo "out log not readable"; exit 4; }
SINCE="$("$DATE" -u -d '30 days ago' +%Y-%m-%dT%H:%M:%S)"
echo "since (30 days) = $SINCE"
TS='^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}T[0-9:.]*Z\{0,1\}'
"$GREP" -e "$TS POST /generate\$" -e "$TS POST /generate?" -e "$TS POST /" -e "Generated image for message .* in [0-9][0-9]*ms\$" "$OUT" \
 | "$AWK" -v since="$SINCE" '
    { ts=substr($1,1,19) }
    / POST \/generate$/ || / POST \/generate\?/ { g++; if (ts>=since) g30++; next }
    / POST \// { o++; if (ts>=since) o30++; next }
    /Generated image for message/ { s++; if (ts>=since) s30++ }
    END { printf "whole log: POST /generate=%d  other POST=%d  successes=%d\n", g, o, s
          printf "last 30 days: POST /generate=%d  other POST=%d  successes=%d\n", g30, o30, s30 }'
echo "=== end"
