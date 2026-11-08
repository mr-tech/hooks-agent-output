#!/usr/bin/env bash
# Usage: EXPORT_ROOT=<scratch> qaf30-sweep.sh <sha>
# Reds for QAF-30/31/32 under QA's named mutants (mutators/qa-m6-supplement.py) and three of the implementer's
# (mutators/m6-table.py); driver qa-sweep.sh; summaries qaf30-qa-sweep-summary-<sha>.txt and qaf30-own-sweep-summary-<sha>.txt.
set -u
SHA=${1:?sha}
HERE=$(cd "$(dirname "$0")" && pwd)
L=DiscordMessageEditor.component-limit
"$HERE/qa-sweep.sh" "$SHA" qaf30-qa "$HERE/mutators/qa-m6-supplement.py" \
  "control-limit:$L" "add-gate:$L:m6l-add-gate-only-at-40" "line-above:$L:m6l-line-above-text-error" \
  "actionrow:ActionRowEditor.duplicate-placement:m6i-actionrow-copy-before" \
  "container:ContainerEditor.duplicate-placement:m6i-container-copy-before" \
  "gallery:MediaGalleryEditor.duplicate-placement:m6i-gallery-copy-before" \
  "section:SectionEditor.duplicate-placement:m6i-section-copy-before"
"$HERE/qa-sweep.sh" "$SHA" qaf30-own "$HERE/mutators/m6-table.py" \
  "live-drop:$L:m6l-count-error-computed-once" "preview-line:src/app/preview:m6l-count-error-only-when-editing" \
  "displayed-fields:EmbedFields.read-only-field-index:m6d-displayed-fields-or"
