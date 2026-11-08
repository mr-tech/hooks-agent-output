#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> [ONLY=<regex over run labels>] m6-sweep.sh <sha>
# Implementer's mutants for M6 (mutators/m6-table.py): one control per test filter, then each mutant
# against the filter(s) that name it. mutate-run.sh does the isolated git-archive export and the
# process-group kill; each run is inside unshare -rn with lo up and the isolation counts checked.
set -u
SHA=${1:?sha}
HERE=$(cd "$(dirname "$0")" && pwd)
: "${EXPORT_ROOT:?set EXPORT_ROOT}"
SUMMARY=$HERE/m6-sweep-summary-$SHA.txt
: > "$SUMMARY"
T=$HERE/mutators/m6-table.py
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
A=rules.multi-line-code-block
B=isValidImageUrl.extensions
Cc=EmbedEditor.empty-embed-hidden
D=EmbedFields.read-only-field-index
Ee=Author.timer-cleanup
F=Picker.default-colour
G=emoji.longest-sequence-first
H=MarkdownSpoiler.aria-expanded
I="duplicate-placement"
J=EmbedFooter.missing-text
K=UpsertMapMap.delete
L="limits.component-count DiscordMessageEditor.component-limit"
for p in "control-m6a $A" "control-m6b $B" "control-m6c $Cc" "control-m6d $D" "control-m6e $Ee" "control-m6f $F" "control-m6g $G" "control-m6h $H" "control-m6i $I" "control-m6j $J" "control-m6k $K" "control-m6l $L"; do
  run "${p%% *}" "${p#* }"
done
run m6a-content-single-line "$A" m6a-content-single-line
run m6a-paragraph-splits-fence "$A" m6a-paragraph-splits-fence
run control-cr24-portal BottomPortal.unmount-cleanup; run control-cr24-picker ColorPicker.scroll-lock-release
run m6e-bottomportal-cleanup-dropped BottomPortal.unmount-cleanup m6e-bottomportal-cleanup-dropped
run m6e-colorpicker-cleanup-dropped ColorPicker.scroll-lock-release m6e-colorpicker-cleanup-dropped
for m in m6b-substring-match m6b-case-sensitive m6b-query-kept m6b-fragment-kept m6b-jpeg-dropped m6b-webp-dropped m6b-avif-added; do run "$m" "$B" "$m"; done
for m in m6c-no-fields-counts-valid m6c-name-or-value; do run "$m" "$Cc" "$m"; done
for m in m6d-set-field-first-slot m6d-delete-first-slot m6d-move-left-shifted m6d-move-right-shifted m6d-index-after-filter; do run "$m" "$D" "$m"; done
for m in m6e-timeout-not-cleared m6e-interval-not-cleared m6e-clock-never-ticks; do run "$m" "$Ee" "$m"; done
for m in m6f-truthiness-nonblack-fallback m6f-unpadded m6f-undefined-is-white; do run "$m" "$F" "$m"; done
for m in m6g-sort-removed m6g-sort-ascending m6g-sort-one-argument; do run "$m" "$G" "$m"; done
run m6h-aria-inverted "$H" m6h-aria-inverted
for m in m6i-embed-copy-before m6i-component-copy-before m6i-actionrow-copy-last m6i-gallery-copy-last m6i-section-copy-last m6i-container-copy-last; do run "$m" "$I" "$m"; done
run m6j-footer-text-unguarded "$J" m6j-footer-text-unguarded
for m in m6k-delete-without-inner-key-noop m6k-falsy-inner-key-is-absent; do run "$m" "$K" "$m"; done
for m in m6l-comparator-at-limit m6l-nesting-recursion-removed m6l-top-accessory-uncounted m6l-child-accessory-uncounted m6l-validate-message-skips-count m6l-error-names-limit-not-total m6l-editor-line-missing m6l-editor-border-missing m6l-editor-offers-at-limit m6l-editor-counts-top-level-only m6l-editor-add-refused-near-limit; do run "$m" "$L" "$m"; done
run m6l-actionrow-add-stricter "ActionRowEditor.add-button" m6l-actionrow-add-stricter
run m6l-section-add-stricter "SectionEditor.add-text-display" m6l-section-add-stricter
echo done >> "$SUMMARY"
