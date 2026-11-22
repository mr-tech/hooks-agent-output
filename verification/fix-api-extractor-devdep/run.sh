#!/bin/bash
# usage: run.sh <dir> <outfile> <cmd...>  — runs with global tools off PATH, 600s timeout, group-killed
S=/tmp/claude-1000/-usr-local-bin-hooks-project-utils/b2dce69b-2b08-408c-9002-c0ab45731dd4/scratchpad
d=$1; out=$2; shift 2
cd "$d" || exit 99
env PATH=$S/shim:/usr/bin:/bin timeout -s KILL 600 systemd-run --user --scope -q -p MemoryMax=8G "$@" > "$out" 2>&1
echo "exit=$?" >> "$out"
