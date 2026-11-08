import os
import sys

MENU = 'src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx'
HOOK = 'src/utils/hooks/useValidateWebhook.ts'
MODAL = 'src/app/message/_components/NewMessageModal.tsx'
MUTANTS = {
    'd29-hook-webhook-text-message-load': (HOOK, "if (!isStale) setWebhookError('Invalid URL');", "if (!isStale) setWebhookError(MESSAGE_LOAD_FAILED_ERROR);"),
    'd29-hook-webhook-catch-dropped': (HOOK, "          if (!isStale) setWebhookError('Invalid URL');", "          throw new Error('x');"),
    'd29-hook-refusal-mapped-to-invalid': (HOOK, "if ('message' in wh) setWebhookError(wh.message);", "if ('message' in wh) setWebhookError('Invalid URL');"),
    'd29-dialog-error-line-drops-webhook-error': (MODAL, "    ?? webhookError\n", ""),
    'd29-menu-error-never': (MENU, "errorMessage={url && !isWebhookLoading && selectedWebhook === null ? 'Invalid URL' : undefined}", "errorMessage={undefined}"),
    'd29-menu-text-changed': (MENU, "selectedWebhook === null ? 'Invalid URL'", "selectedWebhook === null ? 'Bad URL'"),
}

mid = os.environ['MUT_ID']
path, old, new = MUTANTS[mid]
src = open(path).read()
if src.count(old) != 1:
    print('MUTATOR FAILED: %s matched %d times' % (mid, src.count(old)))
    sys.exit(1)
open(path, 'w').write(src.replace(old, new))
print('mutated', mid)
