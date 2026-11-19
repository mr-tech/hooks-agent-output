#!/usr/bin/env bash
# Usage: final-runs.sh <base export> <tip export> <out dir> <work dir>
# The M6 evidence in one pass: the probe red against the base export, green against the tip export, the host-read fixture, and the mutation sweep.
set -u
BASE=$1; TIP=$2; V=$3; W=$4
HERE=$(cd "$(dirname "$0")" && pwd)
rm -rf "$V/red" "$V/green" "$V/sweep-out" "$W"; mkdir -p "$V/red" "$V/green"
"$HERE/run.sh" "$BASE" "$V/red" > /dev/null 2>&1
"$HERE/run.sh" "$TIP" "$V/green" > /dev/null 2>&1
"$HERE/pig-host-read-fixture.sh" "$V/green/probe-result.json" "$V/pig-host-read-fixture.txt" > /dev/null 2>&1
python3 -I "$HERE/mutate-probe.py" "$V/all-mutants.json" "$TIP" "$W" "$V/sweep-out" > "$V/sweep-run.out" 2>&1
echo "exit $?" >> "$V/sweep-run.out"
