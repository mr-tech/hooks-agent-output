#!/usr/bin/env bash
# Reuse probe: does `up` on the tool's reused container fail when "Messages" already holds an id below 900000000000001?
# Usage: reuse-low-id-probe.sh <tool path> <scratch dir>. Real docker; creates and removes hooks-postgres-local on a free
# loopback port with a synthetic password in a scratch env file (never website/.env.local). Saves nothing through a website build.
# Falsity signature of the defect: the second `up` prints rc 0 and the low-id count afterwards reads 1.
set -u
T=$1; SP=$2; mkdir -p "$SP"
PORT=$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1])')
echo "DATABASE_URL=postgresql://probe:synthetic-pw@127.0.0.1:$PORT/probe" > "$SP/env"
export ULS_ENV_FILE=$SP/env
q(){ docker exec -e PGPASSWORD=synthetic-pw hooks-postgres-local psql -U probe -d probe -tAc "$1"; }
echo "port $PORT"; echo '$ up'; timeout 180 "$T" up; echo "rc $?"
echo '$ insert explicit id 1 (stands for a save on a pre-fix container)'
q "insert into \"Users\"(id,name) values (1,'u')"
q "insert into \"Messages\"(id,fk_users_id,\"createdAt\",\"updatedAt\",name,data,position) values (1,1,now(),now(),'m','{}'::jsonb,0)"
echo '$ up (reuse, running)'; timeout 180 "$T" up; echo "rc $?"
echo '$ ids below floor'; q 'select count(*) from "Messages" where id < 900000000000001'
echo '$ empty Messages, low-id query on missing table'; q 'select count(*) from "NoSuch"'; echo "psql rc $?"
echo '$ down'; timeout 60 "$T" down; echo "rc $?"
docker ps -a --filter name=hooks-postgres-local --format '{{.Names}}' | grep -c .
