#!/usr/bin/env bash
# Residue read R-1, fix-personal-message-access. The owner runs this; no agent runs it.
# Read-only: the session is forced read-only (default_transaction_read_only=on), so any write is refused.
# The connection string is the active DATABASE_URL line in website/.env.local. A hazards record (2026-08-24) says the
# one active entry is "the remote hosted database". If that is not production's, put production's URL in DB instead.
# The value is read inside the command and never printed.
set -euo pipefail
DB="$(grep -E '^DATABASE_URL=' /usr/local/bin/hooks/website/.env.local | head -1 | cut -d= -f2- | sed -e 's/^"//' -e 's/"$//')"
docker run --rm -i --network host -e PGOPTIONS='-c default_transaction_read_only=on' postgres:16 \
  psql "$DB" -v ON_ERROR_STOP=1 -P pager=off <<'SQL'
\echo '--- sequence state'
select last_value, is_called from "Messages_id_seq";
\echo '--- query 1: planted rows still ahead of the sequence'
select id, fk_users_id, "createdAt" from "Messages"
 where id > (select last_value from "Messages_id_seq")
    or (id = (select last_value from "Messages_id_seq") and not (select is_called from "Messages_id_seq"))
 order by id;
\echo '--- query 2: rows owned by both a user and a server'
select count(*) from "Messages" where fk_users_id is not null and fk_guilds_id is not null;
SQL
