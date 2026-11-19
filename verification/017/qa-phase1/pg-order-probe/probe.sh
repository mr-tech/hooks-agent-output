#!/usr/bin/env bash
# QA Phase 1 probe for plan 017 revision 2, M5-a (agent-output 3d678cc): does the plan's order token
# and conditional commit behave as stated on a real Postgres 16?
#   P1  two concurrent upserts of one row: does clock_timestamp() in RETURNING order them by lock order?
#   P2  does every new nonce ('v' + 16-digit microseconds + 16 hex) sort above every old 32-hex nonce,
#       under COLLATE "C" and under the image's default collation?
#   P3  "learning in the same statement the nonce it replaced": under a concurrent commit, which
#       statement forms return the nonce actually replaced?
# A throwaway container of its own (name qa017-pgprobe, no network), removed on every exit path.
# Usage: probe.sh <out-dir>     Exit 0 when every step ran; the result is in <out-dir>/result.txt.
set -uo pipefail
OUT=${1:?out dir}
mkdir -p "$OUT"
NAME=qa017-pgprobe
cleanup() { docker rm -f "$NAME" >/dev/null 2>&1; }
trap cleanup EXIT
docker run -d --rm --name "$NAME" --network none -e POSTGRES_PASSWORD=probe -e POSTGRES_DB=probe postgres:16 >/dev/null || exit 1
for _ in $(seq 1 60); do docker exec "$NAME" pg_isready -U postgres -d probe >/dev/null 2>&1 && break; sleep 1; done
sleep 2
q() { docker exec -i "$NAME" psql -U postgres -d probe -v ON_ERROR_STOP=1 -Atq "$@"; }

{
echo "server: $(q -c 'select version()' | cut -c1-40)"
echo "datcollate: $(q -c "select datcollate from pg_database where datname='probe'")"

q <<'SQL'
create table "Messages" (id bigint primary key, name text, "previewImageNonce" text, "updatedAt" timestamp);
insert into "Messages" values (1, 'm', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', now());
SQL

# P1: session A's upsert holds the row lock for 3 s inside its own statement (pg_sleep in RETURNING);
# session B's upsert starts 1 s later and must wait.
q -c "insert into \"Messages\" (id,name) values (1,'A') on conflict (id) do update set name='A' returning 'A', clock_timestamp(), pg_sleep(3);" > "$OUT/p1-a.txt" &
PA=$!
sleep 1
B_START=$(q -c "select clock_timestamp()")
q -c "insert into \"Messages\" (id,name) values (1,'B') on conflict (id) do update set name='B' returning 'B', clock_timestamp();" > "$OUT/p1-b.txt"
wait $PA
echo "P1 A: $(cat "$OUT/p1-a.txt")"
echo "P1 B started at $B_START, returned: $(cat "$OUT/p1-b.txt")"
echo "P1 B's clock above A's: $(q -c "select '$(cut -d'|' -f2 "$OUT/p1-b.txt")'::timestamptz > '$(cut -d'|' -f2 "$OUT/p1-a.txt")'::timestamptz")"

# P2: old 32-hex nonces against new nonces, both collations.
q <<'SQL' > "$OUT/p2.txt"
with old(n) as (values ('ffffffffffffffffffffffffffffffff'), ('00000000000000000000000000000000'), ('9fffffffffffffffffffffffffffffff')),
     new(n) as (values ('v0000000000000000' || '0000000000000000'), ('v1763509200000000' || 'ffffffffffffffff'), ('v9999999999999999' || '0000000000000000'))
select 'C: every new > every old', bool_and(new.n collate "C" > old.n collate "C") from old, new
union all
select 'default collation: every new > every old', bool_and(new.n > old.n) from old, new
union all
select 'C: later time sorts higher', ('v1763509200000001' || '0000000000000000') collate "C" > ('v1763509200000000' || 'ffffffffffffffff') collate "C";
SQL
echo "P2:"; sed 's/^/  /' "$OUT/p2.txt"

# P3: the row holds n0. Session A commits n1 and holds its transaction 3 s; session B, started 1 s
# later, commits n2 with the form under test. Which "replaced" value does B learn?
run_p3() {
  local label=$1 sql_b=$2
  q -c "update \"Messages\" set \"previewImageNonce\"='n0' where id=1"
  ( q <<'SQL'
begin;
update "Messages" set "previewImageNonce"='n1' where id=1;
select pg_sleep(3);
commit;
SQL
  ) >/dev/null &
  local pa=$!
  sleep 1
  local got
  got=$(q -c "$sql_b")
  wait $pa
  echo "P3 $label: learned replaced=[$got], row now=[$(q -c "select \"previewImageNonce\" from \"Messages\" where id=1")] (expected replaced n1)"
}
run_p3 "UPDATE ... FROM (SELECT prev) (no lock)" \
  "update \"Messages\" m set \"previewImageNonce\"='n2' from (select \"previewImageNonce\" as prev from \"Messages\" where id=1) o where m.id=1 and (m.\"previewImageNonce\" is null or m.\"previewImageNonce\" collate \"C\" < 'n2') returning o.prev"
run_p3 "WITH o AS (SELECT prev ... FOR UPDATE) UPDATE ... FROM o" \
  "with o as (select \"previewImageNonce\" as prev from \"Messages\" where id=1 for update) update \"Messages\" m set \"previewImageNonce\"='n2' from o where m.id=1 and (m.\"previewImageNonce\" is null or m.\"previewImageNonce\" collate \"C\" < 'n2') returning o.prev"
} > "$OUT/result.txt" 2>&1
echo "exit 0" >> "$OUT/result.txt"
cat "$OUT/result.txt"
