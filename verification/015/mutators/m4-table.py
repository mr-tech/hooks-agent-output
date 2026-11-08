import os
import sys

PAGE = 'src/app/message/m/[id]/send/page.tsx'
MENU = 'src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx'
PROV = 'src/providers/WebhookProvider.tsx'
CONST = 'src/constants/index.ts'
MUTANTS = {
    'm4a-disable-dropped': (PAGE, "    && !isSending\n", ""),
    'm4a-catch-dropped': (PAGE, "})).catch(() => null);", "}));"),
    'm4b-url-error-inverted': (MENU, "selectedWebhook === null ? 'Invalid URL'", "selectedWebhook !== null ? 'Invalid URL'"),
    'm4b-loading-conjunct-dropped': (MENU, "url && !isWebhookLoading && selectedWebhook === null", "url && selectedWebhook === null"),
    'm4b-url-conjunct-dropped': (MENU, "errorMessage={url && !isWebhookLoading", "errorMessage={!isWebhookLoading"),
    'm4c-clear-on-name': (MENU, "isDisabled={isLoading || !threadId}", "isDisabled={isLoading || !threadName}"),
    'm4c-clear-loading-dropped': (MENU, "isDisabled={isLoading || !threadId}", "isDisabled={!threadId}"),
    'm4d-regex-narrow': (CONST, "(?:(?:www|canary|ptb)\\.)?discord(?:app)?\\.com", "(?:www\\.|canary\\.|ptb\\.)?discord\\.com"),
    'm4d-regex-prefix-dropped': (CONST, "(?:(?:www|canary|ptb)\\.)?discord(?:app)?", "discord(?:app)?"),
    'm4d-regex-end-unanchored': (CONST, "\\/(\\d+)$/;", "\\/(\\d+)/;"),
    'm4d-regex-start-unanchored': (CONST, "LINK_REGEX = /^https:", "LINK_REGEX = /https:"),
    'm4d-regex-http': (CONST, "LINK_REGEX = /^https:", "LINK_REGEX = /^https?:"),
    'm4d-provider-wrong-group': (PROV, "?.[3] ?? null", "?.[2] ?? null"),
    'm4d-id-unanchored': (PROV, "/^\\d+$/.test(text)", "/\\d+/.test(text)"),
    'm4d-stale-webhook-guard-dropped': (PROV, "        if (isStale) return;\n        if (wh) {", "        if (wh) {"),
    'm4d-stale-message-guard-dropped': (PROV, "          const data = await res.json();\n          if (isStale) return;\n", "          const data = await res.json();\n"),
    'm4d-webhook-catch-dropped': (PROV, ").catch(() => null);\n        if (isStale) return;", ");\n        if (isStale) return;"),
    'm4d-message-catch-dropped': (PROV, "        })).catch(() => {\n          if (isStale) return;\n          setOldMessage(null);\n          setOldMessageError('Could not load the message. Check your connection and try again.');\n        });", "        }));"),
    'm4d-message-text': (PROV, "Could not load the message. Check your connection", "Could not load the message. Check your network"),
}

mid = os.environ['MUT_ID']
path, old, new = MUTANTS[mid]
src = open(path).read()
if src.count(old) != 1:
    print('MUTATOR FAILED: %s matched %d times' % (mid, src.count(old)))
    sys.exit(1)
open(path, 'w').write(src.replace(old, new))
print('mutated', mid)
