# QA Phase 2 (chain 015, M4) mutants at website 1e12837: the I-3 Send guard (Irreversible Side-Effect
# Register, the guard M4 changed), and the limbs the implementer's table does not redden: the rider's
# guild_id domain, the provider's Discord refusal texts, and the provider's refused-input display.
# Selected by MUT_ID; each target must occur exactly once (else the mutator exits non-zero).
import os
import sys

PAGE = 'src/app/message/m/[id]/send/page.tsx'
ROUTER = 'src/server/api/routers/message.ts'
PROVIDER = 'src/providers/WebhookProvider.tsx'

MUTANTS = {
    # I-3: the Send gate's pending conjunct, removed.
    'i3-sending-conjunct-dropped': [(PAGE, "    && !isSending\n", "")],
    # I-3: a guard that never reopens once a send has started (stuck-disabled).
    'i3-stuck-disabled': [
        (PAGE, "import { Fragment, useCallback, useEffect } from 'react';",
               "import { Fragment, useCallback, useEffect, useRef } from 'react';"),
        (PAGE, "  const [isSending, withSending] = useLoading();",
               "  const [isSendingNow, withSending] = useLoading();\n"
               "  const everSent = useRef(false);\n"
               "  if (isSendingNow) everSent.current = true;\n"
               "  const isSending = isSendingNow || everSent.current;"),
    ],
    # I-3: the failed send's rejection left unhandled.
    'i3-catch-dropped': [(PAGE, "      })).catch(() => null);", "      }));")],
    # Rider: guild_id null passes (absent still refused).
    'rider-null-passes': [(ROUTER,
        "if (!('guild_id' in channel) || channel.guild_id !== guildId) {",
        "if (!('guild_id' in channel) || (channel.guild_id !== null && channel.guild_id !== guildId)) {")],
    # Rider: loose inequality (a numeric guild_id equal in value passes).
    'rider-loose-inequality': [(ROUTER,
        "channel.guild_id !== guildId) {", "channel.guild_id != guildId) {")],
    # Provider: Discord refusal texts.
    'provider-404-text': [(PROVIDER,
        "'Message not found. Hint: Webhooks can only edit their own messages.'", "'Message not found.'")],
    'provider-403-text': [(PROVIDER,
        "'You do not have permission to view this message.'", "'Forbidden.'")],
    'provider-401-text': [(PROVIDER, "'Invalid webhook token.'", "'Unauthorized.'")],
    'provider-400-text': [(PROVIDER, "'Invalid webhook id.'", "'Bad request.'")],
    'provider-other-status-text': [(PROVIDER,
        "setOldMessageError((data as { message: string }).message ?? res.statusText);",
        "setOldMessageError(res.statusText);")],
    # Provider: a refused input shows an error instead of nothing (QAF-22 (2)).
    'provider-refused-shows-error': [(PROVIDER,
        "    } else {\n      setOldMessage(null);\n      setOldMessageError('');\n    }",
        "    } else {\n      setOldMessage(null);\n      setOldMessageError('Invalid message id or link.');\n    }")],
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
