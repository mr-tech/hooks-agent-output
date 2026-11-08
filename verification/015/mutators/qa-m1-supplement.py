# QA Phase 2 (chain 015, M1) mutants at website 3031878: bounded sweeps of the Irreversible Side-Effect
# Register guards M1 changed (I-2 the OAuth revoke, seeded at the account decision and the token source;
# I-4 the message insert cap), M1-a's "return [] early" fix shape, and M1-h's rejection handler.
# Selected by MUT_ID; each target must occur exactly once (else the mutator exits non-zero).
import os
import sys

AUTH = 'src/server/auth.ts'
SHARED = 'src/server/api/utils/shared.ts'
CONSTANTS = 'src/constants/index.ts'

MUTANTS = {
    # I-2, token source: the revoke carries the provider account id, not the row's token.
    'i2-token-is-provider-id': [(AUTH,
        "if (account.access_token) await revokeAccessToken(account.access_token);",
        "if (account.access_token) await revokeAccessToken(account.providerAccountId);")],
    # I-2, account decision: the token test inverted.
    'i2-token-test-inverted': [(AUTH,
        "if (account.access_token) await revokeAccessToken(account.access_token);",
        "if (!account.access_token) await revokeAccessToken(account.access_token as unknown as string);")],
    # I-2, account decision: a token-less account is treated as no account (no update, no provider key).
    'i2-tokenless-is-no-account': [(AUTH,
        "  if (!account) {\n    await redis.clearUser(userDbId, sessionToken);\n    return;\n  }",
        "  if (!account || !account.access_token) {\n    await redis.clearUser(userDbId, sessionToken);\n    return;\n  }")],
    # I-2, token source: the row is read for the wrong key.
    'i2-row-read-by-session-token': [(AUTH,
        "      .where('userId', '=', userDbId)\n      .executeTakeFirst();",
        "      .where('userId', '=', sessionToken)\n      .executeTakeFirst();")],
    # I-2: the lookup error is swallowed instead of reaching the caller.
    'i2-lookup-error-swallowed': [(AUTH,
        "    await redis.clearUser(userDbId, sessionToken).catch(() => {});\n    throw err;",
        "    await redis.clearUser(userDbId, sessionToken).catch(() => {});\n    return;")],
    # I-2: the stored-token update loses its account filter (every discord account nulled).
    'i2-update-unscoped': [(AUTH,
        "      .where('provider', '=', 'discord')\n      .where('providerAccountId', '=', account.providerAccountId)\n      .execute(),",
        "      .where('provider', '=', 'discord')\n      .execute(),")],
    # I-4: the cap constant moved by one.
    'i4-cap-constant-1001': [(CONSTANTS,
        "export const MAX_MESSAGES = 1000 as const;", "export const MAX_MESSAGES = 1001 as const;")],
    # I-4: the user-scoped count loses its owner filter (counts every message).
    'i4-user-count-unscoped': [(SHARED,
        "    messageCountQuery = messageCountQuery.where('fk_users_id', '=', select.dbUserId);\n",
        "")],
    # I-4: the guild-scoped count loses its owner filter.
    'i4-guild-count-unscoped': [(SHARED,
        "    messageCountQuery = messageCountQuery.where('fk_guilds_id', '=', guildId);\n",
        "    void guildId;\n")],
    # M1-a: getPartialMessages returns nothing for a user with no guilds (the "return [] early" fix).
    'm1a-partial-empty-returns-early': [(SHARED,
        "  const messages = await (guilds.length\n",
        "  if (!guilds.length) return [];\n  const messages = await (guilds.length\n")],
    # M1-h: the recent-messages promise loses its rejection handler.
    'm1h-message-handler-dropped': [(AUTH, "    messagePromise.catch(() => {});\n", "")],
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
