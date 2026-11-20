#!/usr/bin/env bash
# Run one SQL statement against the local walk database (container hooks-postgres-local), using the container's own
# credentials from its environment; nothing secret is printed. Usage: db.sh "<sql>"
exec docker exec hooks-postgres-local sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tA -c "$1"' _ "$1"
