"""Builds mutants-qa.json: QA's hand-written mutants over the decision sites of website 787bec5..ed88e7c
that mutant-gen.js cannot express (query-builder owner terms, call-site arguments, shapes, list arms).
Each `old` is checked to occur exactly once in its file at the SHA; the script refuses otherwise.
Usage: python3 build-qa-mutants.py <website-repo> <sha> <out.json>
"""
import json
import subprocess
import sys

REPO, SHA, OUT = sys.argv[1:4]
MSG = 'src/server/api/routers/message.ts'
SHP = 'src/server/api/utils/shapes.ts'
SHR = 'src/server/api/utils/shared.ts'
AUTH = 'src/server/auth.ts'
PROV = 'src/providers/MessageProvider/index.tsx'

M = [
    # message.ts — router pre-checks and call-site owners
    ('getone-precheck-no-id', MSG, 'S2',
     "        await authorizeUser(session.user.id, message.id);\n      }\n      return message;",
     "        await authorizeUser(session.user.id);\n      }\n      return message;"),
    ('upsert-precheck-no-id', MSG, 'S6a',
     "authorizeUser(session.user.id, message.id);\n\n      return upsertMessage",
     "authorizeUser(session.user.id);\n\n      return upsertMessage"),
    ('upsert-guild-precheck-no-id', MSG, 'S6a',
     "authorizeGuildUser(req, message.guildId, message.id);\n        return upsertMessage",
     "authorizeGuildUser(req, message.guildId);\n        return upsertMessage"),
    ('recent-precheck-no-id', MSG, 'S7',
     "authorizeUser(session.user.id, message.id);\n      return updateRecentMessageData",
     "authorizeUser(session.user.id);\n      return updateRecentMessageData"),
    ('recent-owner-discord-id', MSG, 'S7',
     "updateRecentMessageData(input, { dbUserId: userId })",
     "updateRecentMessageData(input, { dbUserId: session.user.id })"),
    ('delete-precheck-no-id', MSG, 'S8',
     "authorizeAction(session.user.id, req, message.guildId, id)",
     "authorizeAction(session.user.id, req, message.guildId, undefined)"),
    ('delete-owner-always-user', MSG, 'S8 coupling: guild delete takes the personal term',
     "const owner = message.guildId ? { guildId: message.guildId } : { dbUserId: userId };",
     "const owner = { dbUserId: userId };"),
    ('delete-owner-always-guild', MSG, 'S8 coupling: personal delete takes the guild term',
     "const owner = message.guildId ? { guildId: message.guildId } : { dbUserId: userId };",
     "const owner = { guildId: message.guildId as string };"),
    ('delete-input-raw', MSG, 'S8/S9',
     ".input(z.object({ id: messageIdShape }))",
     ".input(z.object({ id: z.string() }))"),
    ('getone-input-raw', MSG, 'S2 id',
     ".input(messageIdShape)\n    .query",
     ".input(z.string().regex(/^[0-9]+$/))\n    .query"),
    # shapes.ts
    ('shape-max-plus-one', SHP, 'id bound',
     "const MAX_MESSAGE_ID = 9223372036854775807n;",
     "const MAX_MESSAGE_ID = 9223372036854775808n;"),
    ('shape-admits-plus', SHP, 'id digits',
     ".regex(/^[0-9]{1,19}$/)",
     ".regex(/^[+0-9]{1,19}$/)"),
    ('shape-raw-text-out', SHP, 'id canonical',
     ".transform((id) => id.toString());",
     ".transform((id) => id.toString().padStart(1, '0'));"),
    ('upsert-id-raw', SHP, 'S6a/S6b id',
     "  id: messageIdShape.optional(),",
     "  id: z.string().optional(),"),
    ('recent-id-raw', SHP, 'S7 id',
     "  id: messageIdShape,\n  recentWebhookId",
     "  id: z.string(),\n  recentWebhookId"),
    # shared.ts — recent list (S11)
    ('recent-list-owner-arm-any', SHR, 'S11',
     "eb('Messages.fk_users_id', '=', dbUserId),",
     "eb('Messages.fk_users_id', 'is not', null),"),
    ('recent-list-guild-arm-any', SHR, 'S11 coupling: guild arm admits personal rows',
     "eb('Messages.fk_guilds_id', 'is not', null),",
     "eb('Messages.id', 'is not', null),"),
    # shared.ts — owned update (S6a)
    ('update-guild-term-dropped', SHR, 'S6a guild',
     "? query.where('fk_guilds_id', '=', values.fk_guilds_id as string)",
     "? query"),
    ('update-user-term-dropped', SHR, 'S6a personal',
     ": query.where('fk_users_id', '=', values.fk_users_id as string)\n  ).returning",
     ": query\n  ).returning"),
    ('update-term-choice-inverted', SHR, 'S6a coupling',
     "return (values.fk_guilds_id\n    ? query.where",
     "return (!values.fk_guilds_id\n    ? query.where"),
    # shared.ts — insert path (S6b)
    ('insert-at-client-id', SHR, 'S6b',
     "saved = await buildInsertMessageQuery(database, values).executeTakeFirstOrThrow();",
     "saved = await buildInsertMessageQuery(database, message.id ? { ...values, id: message.id } : values).executeTakeFirstOrThrow();"),
    ('cap-counts-guild-only', SHR, 'S6b cap',
     ": messageCountQuery.where('fk_users_id', '=', values.fk_users_id as string)",
     ": messageCountQuery.where('fk_guilds_id', '=', values.fk_users_id as string)"),
    ('update-skipped', SHR, 'S6a',
     "const updated = message.id\n    ? await",
     "const updated = false\n    ? await"),
    # shared.ts — recent-data write (S7)
    ('recent-write-user-term-dropped', SHR, 'S7 personal',
     "\n  await ('dbUserId' in owner\n    ? query.where('fk_users_id', '=', owner.dbUserId)",
     "\n  await ('dbUserId' in owner\n    ? query"),
    ('recent-write-guild-term-inverted', SHR, 'S7 guild',
     ".where('Guilds.guildId', '=', owner.guildId))\n  ).execute();",
     ".where('Guilds.guildId', '!=', owner.guildId))\n  ).execute();"),
    # shared.ts — delete write (S8)
    ('delete-write-user-term-dropped', SHR, 'S8 personal',
     "const deleted = await ('dbUserId' in owner\n    ? query.where('fk_users_id', '=', owner.dbUserId)",
     "const deleted = await ('dbUserId' in owner\n    ? query"),
    ('delete-write-guild-term-inverted', SHR, 'S8 guild',
     ".where('Guilds.guildId', '=', owner.guildId))\n  ).returning('id')",
     ".where('Guilds.guildId', '!=', owner.guildId))\n  ).returning('id')"),
    # auth.ts — hydrated list call site (S11)
    ('hydrated-owner-discord-id', AUTH, 'S11 call site',
     "getUserRecentMessages(preferences.recentMessageIds, user.id)",
     "getUserRecentMessages(preferences.recentMessageIds, String(session.user.id))"),
    # MessageProvider — CR-5 draft key
    ('draft-key-new-number', PROV, 'CR-5',
     "removeDraft(message.id, (draft)",
     "removeDraft(msg.id, (draft)"),
]

out = []
for mid, path, surface, old, new in M:
    text = subprocess.run(['git', '-C', REPO, 'show', f'{SHA}:{path}'], capture_output=True, text=True, check=True).stdout
    n = text.count(old)
    if n != 1:
        sys.exit(f'{mid}: old occurs {n} times in {path}')
    out.append({'id': mid, 'file': path, 'old': old, 'new': new, 'surface': surface})

with open(OUT, 'w') as f:
    json.dump(out, f, indent=1)
print(f'{len(out)} mutants written to {OUT}')
