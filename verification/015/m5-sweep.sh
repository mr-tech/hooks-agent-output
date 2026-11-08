#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> [ONLY=<regex over run labels>] m5-sweep.sh <sha>
# Implementer's mutants for M5 (mutators/m5-table.py): one control per test filter, then each mutant
# against the filter(s) that name it. mutate-run.sh does the isolated git-archive export and the
# process-group kill; each run is inside unshare -rn with lo up and the isolation counts checked.
set -u
SHA=${1:?sha}
HERE=$(cd "$(dirname "$0")" && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"
SUMMARY=$HERE/m5-sweep-summary-$SHA.txt
: > "$SUMMARY"
T=$HERE/mutators/m5-table.py
run() { # label "filters" [mutant-id]
  local label=$1 test=$2 mut=${3:-}
  [[ "$label" =~ ${ONLY:-.} ]] || return 0
  MUT_ID=$mut unshare -rn bash -c 'ip link set lo up
    [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ISOLATION FAILED; exit 9; }
    if [ -n "$4" ]; then "$0" "$1" "$2" "$3" "$5"; else "$0" "$1" "$2" "$3"; fi' "$HERE/mutate-run.sh" "$SHA" "$label" "$test" "$mut" "$T"
  local f=$HERE/mutation-$label-$SHA.txt
  printf '%s\t%s\t%s\t%s\n' "$label" "$(grep -E '^ +Tests ' "$f" | tail -1 | tr -s ' ')" \
    "$(grep -c 'Unhandled' "$f")" "$(tail -1 "$f")" >> "$SUMMARY"
}
A=JsonModalBody.menu-close-after-load
B=JsonModalBody.copy-needs-valid-draft
C=usePusher.update-prompt
D=useGuildDropdownItems.session-update
E="formatMessageDate.same-day page.message-list Header.search-result-dates"
F=SaveAsMenu.opens-with-current-values
G=page.message-list
H=page.invalid-data
run control-m5a "$A"; run control-m5b "$B"; run control-m5c "$C"; run control-m5d "$D"
run control-m5e "$E"; run control-m5f "$F"; run control-m5g "$G"; run control-m5h "$H"
run m5a-allow-close-not-reset "$A" m5a-allow-close-not-reset
for m in m5b-copy-always-enabled m5b-copy-disabled-only-when-unparsable m5b-copy-copies-raw-draft; do run "$m" "$B" "$m"; done
for m in m5c-pusher-reads-render-flag m5c-pusher-ref-never-updated; do run "$m" "$C" "$m"; done
run m5d-dropdown-memo-once "$D" m5d-dropdown-memo-once
for m in m5e-day-of-month-only m5e-month-dropped m5e-year-dropped m5e-prefix-ignored m5e-header-bypasses-formatter m5e-folder-bypasses-formatter m5e-folder-drops-prefix; do run "$m" "$E" "$m"; done
for m in m5f-save-as-name-not-refilled m5f-save-as-server-not-refilled m5f-save-as-refills-only-at-mount m5f-save-as-refills-on-close-too; do run "$m" "$F" "$m"; done
run m5g-delete-toast-says-refresh "$G" m5g-delete-toast-says-refresh
for m in m5h-array-passes m5h-primitive-passes m5h-parse-error-uncaught m5h-error-text-changed m5h-error-not-text-error; do run "$m" "$H" "$m"; done
echo done >> "$SUMMARY"
