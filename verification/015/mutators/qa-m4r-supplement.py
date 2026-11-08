# QA Phase 2 (chain 015, M4 re-run after the D29 reopen) mutants at website da24eb7: the round's one
# production change (useValidateWebhook's webhook-load catch) and the send page's D29 cell.
# Selected by MUT_ID; each target must occur exactly once (else the mutator exits non-zero).
import os
import sys

HOOK = 'src/utils/hooks/useValidateWebhook.ts'
MENU = 'src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx'

MUTANTS = {
    # The round's change reverted: the dialog shows D24's text again.
    'hook-webhook-load-text-reverted': [(HOOK,
        "if (!isStale) setWebhookError('Invalid URL');",
        "if (!isStale) setWebhookError(MESSAGE_LOAD_FAILED_ERROR);")],
    # Every webhook-load answer becomes "Invalid URL", Discord's refusal included.
    'hook-refusal-becomes-invalid-url': [(HOOK,
        "if ('message' in wh) setWebhookError(wh.message);",
        "if ('message' in wh) setWebhookError('Invalid URL');")],
    # The dialog's catch shows nothing.
    'hook-webhook-load-silent': [(HOOK,
        "if (!isStale) setWebhookError('Invalid URL');", "")],
    # Send page: the field error never shows (M4-b's condition, the D29 place).
    'menu-url-error-never': [(MENU,
        "errorMessage={url && !isWebhookLoading && selectedWebhook === null ? 'Invalid URL' : undefined}",
        "errorMessage={undefined}")],
}

mutant_id = os.environ['MUT_ID']
edits = MUTANTS[mutant_id]
sources = {}
for path, old, _ in edits:
    sources.setdefault(path, open(path).read())
for path, old, new in edits:
    n = sources[path].count(old)
    if n != 1:
        sys.exit(f'mutant {mutant_id}: target in {path} found {n} times')
    sources[path] = sources[path].replace(old, new)
for path, text in sources.items():
    open(path, 'w').write(text)
