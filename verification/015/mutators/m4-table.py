import os
import sys

PAGE = 'src/app/message/m/[id]/send/page.tsx'
MENU = 'src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx'
PROV = 'src/providers/WebhookProvider.tsx'
CONST = 'src/constants/index.ts'
ROUTER = 'src/server/api/routers/message.ts'
HOOK = 'src/utils/hooks/useValidateWebhook.ts'
PARSE = 'src/utils/parseMessageId.ts'
MUTANTS = {
    'm4a-disable-dropped': (PAGE, "    && !isSending\n", ""),
    'm4a-catch-dropped': (PAGE, "})).catch(() => null);", "}));"),
    'm4b-url-error-inverted': (MENU, "selectedWebhook === null ? 'Invalid URL'", "selectedWebhook !== null ? 'Invalid URL'"),
    'm4b-loading-conjunct-dropped': (MENU, "url && !isWebhookLoading && selectedWebhook === null", "url && selectedWebhook === null"),
    'm4b-url-conjunct-dropped': (MENU, "errorMessage={url && !isWebhookLoading", "errorMessage={!isWebhookLoading"),
    'm4c-clear-on-name': (MENU, "isDisabled={isLoading || !threadId}", "isDisabled={isLoading || !threadName}"),
    'm4c-clear-loading-dropped': (MENU, "isDisabled={isLoading || !threadId}", "isDisabled={!threadId}"),
    'rider-guild-check-dropped': (ROUTER, "if (!('guild_id' in channel) || channel.guild_id !== guildId) {", "if (false) {"),
    'rider-compares-channel-id': (ROUTER, "channel.guild_id !== guildId", "channel.id !== guildId"),
    'rider-refuses-only-when-set-and-differs': (ROUTER, "if (!('guild_id' in channel) || channel.guild_id !== guildId) {", "if ('guild_id' in channel && channel.guild_id !== guildId) {"),
    'rider-check-after-message-fetch': (ROUTER, "      const channel = await redis.fetchChannel(channelId);\n", "      const channel = { guild_id: guildId };\n"),
    'rider-group-swap': (ROUTER, "const { guildId, channelId, messageId } = match.groups", "const { channelId: guildId, guildId: channelId, messageId } = match.groups"),
    'hook-stale-webhook-guard-dropped': (HOOK, "          if (isStale) return;\n\n          if ('message' in wh)", "          if ('message' in wh)"),
    'hook-stale-message-guard-dropped': (HOOK, "          if (isStale) return;\n\n          if ('message' in msg)", "          if ('message' in msg)"),
    'hook-webhook-catch-dropped': (HOOK, "          if (!isStale) setWebhookError(MESSAGE_LOAD_FAILED_ERROR);", "          throw new Error('x');"),
    'hook-message-catch-dropped': (HOOK, "          if (!isStale) setMessageError(MESSAGE_LOAD_FAILED_ERROR);", "          throw new Error('x');"),
    'hook-uses-own-id-test': (HOOK, "const messageId = parseMessageId(messageIdOrUrl);", "const messageId = /\\d+/.test(messageIdOrUrl.trim()) ? messageIdOrUrl.trim() : null;"),
    'm4d-message-catch-dropped': (PROV, "        })).catch(() => {\n          if (isStale) return;\n          setOldMessage(null);\n          setOldMessageError(MESSAGE_LOAD_FAILED_ERROR);\n        });", "        }));"),
    'm4d-message-text-provider': (PROV, "setOldMessageError(MESSAGE_LOAD_FAILED_ERROR)", "setOldMessageError('Could not load')"),
    'm4d-failure-text-constant': (CONST, "Check your connection and try again.", "Check your network and try again."),
    'm4d-regex-end-unanchored': (CONST, "(?<messageId>\\d+)$/;", "(?<messageId>\\d+)/;"),
    'm4d-regex-narrow': (CONST, "(?:(?:www|canary|ptb)\\.)?discord(?:app)?\\.com", "(?:www\\.|canary\\.|ptb\\.)?discord\\.com"),
    'm4d-regex-prefix-dropped': (CONST, "(?:(?:www|canary|ptb)\\.)?discord(?:app)?", "discord(?:app)?"),
    'm4d-regex-start-unanchored': (CONST, "LINK_REGEX = /^https:", "LINK_REGEX = /https:"),
    'm4d-regex-http': (CONST, "LINK_REGEX = /^https:", "LINK_REGEX = /^https?:"),
    'm4d-parse-wrong-group': (PARSE, "?.groups?.messageId", "?.groups?.channelId"),
    'm4d-parse-unanchored-id': (PARSE, "/^\\d+$/.test(text)", "/\\d+/.test(text)"),
    'm4d-parse-untrimmed': (PARSE, "input.trim()", "input"),
    'm4d-stale-webhook-guard-dropped': (PROV, "        if (isStale) return;\n        if (wh) {", "        if (wh) {"),
    'm4d-stale-message-guard-dropped': (PROV, "          const data = await res.json();\n          if (isStale) return;\n", "          const data = await res.json();\n"),
    'm4d-webhook-catch-dropped': (PROV, ").catch(() => null);\n        if (isStale) return;", ");\n        if (isStale) return;"),
}

mid = os.environ['MUT_ID']
path, old, new = MUTANTS[mid]
src = open(path).read()
if src.count(old) != 1:
    print('MUTATOR FAILED: %s matched %d times' % (mid, src.count(old)))
    sys.exit(1)
open(path, 'w').write(src.replace(old, new))
print('mutated', mid)
