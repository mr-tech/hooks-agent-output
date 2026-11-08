import os
import sys

COMMON = 'bot/scripts/app_commands/common.ts'
EMBED = 'bot/utils/DiscordEmbed.ts'
MUTANTS = {
    'm7a-and-of-two-bits': (COMMON, "PermissionFlagsBits.ManageGuild.toString()", "(PermissionFlagsBits.Administrator & PermissionFlagsBits.ManageGuild).toString()"),
    'm7a-administrator-only': (COMMON, "PermissionFlagsBits.ManageGuild.toString()", "PermissionFlagsBits.Administrator.toString()"),
    'm7a-or-of-two-bits': (COMMON, "PermissionFlagsBits.ManageGuild.toString()", "(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild).toString()"),
    'm7b-timestamp-compares': (EMBED, "this.#payload.timestamp = timestamp;", "this.#payload.timestamp === timestamp;"),
    'm7b-timestamp-ignores-argument': (EMBED, "this.#payload.timestamp = timestamp;", "this.#payload.timestamp = new Date(0).toISOString();"),
    'm7c-user-test-for-slash': (COMMON, "): command is UserCommand {\n  return commandType === 'user';", "): command is UserCommand {\n  return commandType === 'slash';"),
    'm7c-user-test-for-message': (COMMON, "): command is UserCommand {\n  return commandType === 'user';", "): command is UserCommand {\n  return commandType === 'message';"),
}

mid = os.environ['MUT_ID']
path, old, new = MUTANTS[mid]
src = open(path).read()
if src.count(old) != 1:
    print('MUTATOR FAILED: %s matched %d times' % (mid, src.count(old)))
    sys.exit(1)
open(path, 'w').write(src.replace(old, new))
print('mutated', mid)
