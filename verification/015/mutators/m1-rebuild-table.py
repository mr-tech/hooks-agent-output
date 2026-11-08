import os
import sys

AUTH = 'src/server/auth.ts'
MUTANTS = {
    'm1c-lookup-error-keys-kept': (AUTH, "    await redis.clearUser(userDbId, sessionToken).catch(() => {});\n    throw err;", "    throw err;"),
    'm1c-lookup-error-clear-unswallowed': (AUTH, "await redis.clearUser(userDbId, sessionToken).catch(() => {});", "await redis.clearUser(userDbId, sessionToken);"),
    'm1c-no-account-keys-kept': (AUTH, "  if (!account) {\n    await redis.clearUser(userDbId, sessionToken);\n    return;", "  if (!account) {\n    return;"),
    'm1c-revoke-never-sent': (AUTH, "if (account.access_token) await revokeAccessToken", "if (false) await revokeAccessToken"),
    'm1c-guilds-key-dropped': (AUTH, "redis.clearUser(userDbId, sessionToken, account.providerAccountId),", "redis.clearUser(userDbId, sessionToken),"),
    'm1c-accounts-update-dropped': (AUTH, "      .set({ access_token: null, refresh_token: null })", "      .set({})"),
    'm1c-reads-cached-account': (AUTH,
        "account = await getPostgres()\n      .selectFrom('Accounts')\n      .select(['access_token', 'providerAccountId'])\n      .where('userId', '=', userDbId)\n      .executeTakeFirst();",
        "account = (await redis.fetchUserAccount(userDbId)) ?? undefined;"),
    'm1h-message-handler-dropped': (AUTH, "    messagePromise.catch(() => {});\n", ""),
    'm1h-guilds-fetched-without-token': (AUTH, "access_token ? redis.fetchUserGuilds(providerAccountId, access_token)", "true ? redis.fetchUserGuilds(providerAccountId, access_token as string)"),
    'm1h-message-awaited-before-account': (AUTH, "    const account = await redis.fetchUserAccount(userDbId);\n\n    if (!account) {\n      // @ts-expect-error", "    await messagePromise;\n    const account = await redis.fetchUserAccount(userDbId);\n\n    if (!account) {\n      // @ts-expect-error"),
}

mutant_id = os.environ['MUT_ID']
path, old, new = MUTANTS[mutant_id]
source = open(path).read()
if source.count(old) != 1:
    sys.exit(f'MUTATOR FAILED: {mutant_id}: target found {source.count(old)} times')
open(path, 'w').write(source.replace(old, new))
print('mutated', mutant_id)
