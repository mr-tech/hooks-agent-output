#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> qa-r3-website-mutants.sh <sha>
# QA Phase 2 re-run, at website <sha>, of the mutants the QAF-27/QAF-20 round's cells are meant to kill (the
# implementer's committed mutators under mutators/qaf2*.py), plus one control per covering test file. Each run is
# mutate-run.sh (fresh git-archive export, process-group kill at TIMEOUT) inside unshare -rn with lo up and the
# isolation counts checked. Writes mutation-qa-r3-<label>-<sha>.txt per run and qa-r3-mutants-summary-<sha>.txt.
set -u
SHA=$1
HERE=$(cd "$(dirname "$0")" && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"
SUMMARY=$HERE/qa-r3-mutants-summary-$SHA.txt
REDIR=src/app/_navigation/Redirects/__tests__/Server.session-cookie-redirect.test.ts
SIGNOUT=src/server/__tests__/auth.sign-out.test.ts
AVATAR=src/utils/__tests__/constructImageUrl.default-avatar.test.ts
FORMAT=src/utils/__tests__/formatKey.key-format.test.ts
: > "$SUMMARY"
one() { # label test-file [mutator]
  unshare -rn bash -c 'ip link set lo up
    [ "$(ip -o link show | grep -vc ": lo:")" = 0 ] && [ "$(ip route show default | grep -c .)" = 0 ] || { echo ISOLATION FAILED; exit 9; }
    "$0" "$@"' "$HERE/mutate-run.sh" "$SHA" "qa-r3-$1" "$2" ${3:+"$HERE/mutators/$3"}
  f=$HERE/mutation-qa-r3-$1-$SHA.txt
  printf '%s\t%s\t%s\t%s\n' "$1" "$(grep -E '^ +Tests ' "$f" | tail -1 | tr -s ' ')" \
    "$(grep -c 'Unhandled Rejection' "$f")" "$(tail -1 "$f")" >> "$SUMMARY"
  grep -E '^ +(×|FAIL) ' "$f" | sed 's/^/    /' >> "$SUMMARY"
}
one control-redirect "$REDIR"
one control-signout "$SIGNOUT"
one control-avatar "$AVATAR"
one control-formatkey "$FORMAT"
one m1i-raw-header-regex "$REDIR" qaf27-m1i-raw-header-regex.py
one m1i-raw-header-plain-values "$REDIR" qaf27-m1i-raw-header-plain-values.py
one m1i-missing-pathname "$REDIR" qaf27-m1i-missing-pathname-defaults-to-editor.py
one m1c-sessions-delete-added "$SIGNOUT" qaf27-m1c-sessions-delete-added.py
one m1c-exec-errors-thrown "$SIGNOUT" qaf27-m1c-exec-errors-thrown.py
one m1c-lookup-failure-unawaited "$SIGNOUT" qaf27-m1c-lookup-failure-clear-unawaited.py
one avatar-discriminator-parse "$AVATAR" qaf20-constructimageurl-discriminator-parse-dropped.py
echo done >> "$SUMMARY"
