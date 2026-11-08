#!/bin/sh
# Usage: cr-m4d-link-class-sweep.sh <website-repo> <sha>
# Read-only, git-object reads only (git grep / git show at <sha>); the working tree is never touched.
# Part 1: the M4-d link class. Every consumer of DISCORD_MESSAGE_LINK_REGEX, and every non-test line
#   naming a discord(app).com host, so a hand-copied link pattern outside the constant shows up.
#   Blind spot: a host built from parts ("discord" + ".com") or a link test written without the host text.
# Part 2: the getFromUrl guild binding. Which captured id reaches the authorization gate, which reaches the
#   bot-token API request, and whether any line in getFromUrl compares the fetched message or channel to the
#   authorized guild (guild_id / channel lookup). Zero comparison lines means nothing in the procedure ties
#   the channel to the guild the user was authorized for.
#   Blind spot: a binding done inside a helper the procedure calls under another name.
# Positive control: the authorizeGuildAdmin call and the /channels/ request must each count 1.
set -u
R="$1"; S="$2"
echo "# website $S ($(git -C "$R" rev-parse "$S"))"
echo "## consumers of DISCORD_MESSAGE_LINK_REGEX (git grep -c, tests included)"
git -C "$R" grep -c DISCORD_MESSAGE_LINK_REGEX "$S" -- src bot
echo "## non-test lines naming a discord(app).com host"
git -C "$R" grep -n -E 'discord(app)?\\?\.com' "$S" -- src bot | grep -v __tests__
echo "## getFromUrl body"
git -C "$R" show "$S:src/server/api/routers/message.ts" | awk '/getFromUrl:/{p=1} p{print NR": "$0} /getFromCode:/{exit}' > /tmp/cr-m4d-getfromurl.$$
grep -E 'match|authorizeGuildAdmin|/channels/' /tmp/cr-m4d-getfromurl.$$
echo "## control counts"
printf 'authorizeGuildAdmin calls: '; grep -c 'authorizeGuildAdmin(' /tmp/cr-m4d-getfromurl.$$
printf '/channels/ requests: '; grep -c '/channels/' /tmp/cr-m4d-getfromurl.$$
echo "## lines binding channel or message to the authorized guild"
printf 'guild_id, a channel lookup, or a guildId comparison in getFromUrl: '; grep -c -E 'guild_id|Channel\(|guildId *[!=]==' /tmp/cr-m4d-getfromurl.$$
rm -f /tmp/cr-m4d-getfromurl.$$
