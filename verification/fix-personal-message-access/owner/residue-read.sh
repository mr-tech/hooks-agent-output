#!/usr/bin/env bash
# Residue read R-1, fix-personal-message-access. The owner runs this; no agent runs it.
# Read-only: the session is forced read-only (default_transaction_read_only=on), so any write is refused.
# It asks for production's Postgres connection string, typed hidden (nothing is echoed or saved), because the
# DATABASE_URL in website/.env.local is a local database (his run 2026-11-20T02:1xZ: 127.0.0.1:5432 refused).
set -euo pipefail
read -rsp 'Production DATABASE_URL (hidden): ' DB; echo
docker run --rm -i --network host -e PGOPTIONS='-c default_transaction_read_only=on' -e DB="$DB" postgres:16 \
  sh -c 'psql "$DB" -v ON_ERROR_STOP=1 -P pager=off' <<'SQL'
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
