#!/bin/sh
# usage: run-mutation-sweep.sh <sha> <mutants.json> <out-dir> <work-dir> [vitest selector ...]
# Runs mutation-run.py over an export of <sha> of the website repository; every mutant runs the vitest suite in its own export.
set -u
SHA="$1"; MUTANTS="$2"; OUT="$3"; WORK="$4"; shift 4
rm -rf "$WORK" && mkdir -p "$WORK" "$OUT"
exec systemd-run --user --scope -p MemoryMax=14G -p TasksMax=6000 -p RuntimeMaxSec=3300 \
  python3 -I "$HOME/.claude/tools/mutation-run.py" --repo /usr/local/bin/hooks/website --sha "$SHA" \
  --mutants "$MUTANTS" --work "$WORK" --out "$OUT" --timeout 200 --dep node_modules -- npx vitest run "$@"
