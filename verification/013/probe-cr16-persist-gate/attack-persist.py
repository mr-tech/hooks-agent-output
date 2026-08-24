import socket, json, sys

HOST, PORT = '127.0.0.1', 3118
BIT = 32768
# Oracle fixed BEFORE the attack:
#   auth HELD     : UNAUTHORIZED and no sign the resolver reached persistence
#   REACHED DB    : ECONNREFUSED / 59999 / kysely / postgres / "result" success
DB_MARKERS = ["ECONNREFUSED", "59999", "kysely", "Kysely", "postgres", "Postgres",
              "P1001", "Can't reach database", '"result"', "getPostgres"]
HELD = "UNAUTHORIZED"

def raw(method, path, body=None, headers=()):
    s = socket.create_connection((HOST, PORT), timeout=20)
    payload = body.encode() if body else b''
    lines = [f"{method} {path} HTTP/1.1", f"Host: {HOST}:{PORT}", "Connection: close"]
    for h in headers: lines.append(h)
    if body is not None:
        lines.append("Content-Type: application/json")
        lines.append(f"Content-Length: {len(payload)}")
    data = ("\r\n".join(lines) + "\r\n\r\n").encode() + payload
    s.sendall(data)
    buf = b''
    while True:
        try:
            chunk = s.recv(65536)
        except socket.timeout:
            break
        if not chunk: break
        buf += chunk
    s.close()
    return buf.decode('utf-8', 'replace')

def classify(resp):
    reached = [m for m in DB_MARKERS if m in resp]
    held = HELD in resp
    status = resp.split('\r\n',1)[0] if resp else '(empty)'
    return status, held, reached

# The tRPC upsert input. A row-E payload: V2 component + classic content.
ROW_E = {"0":{"json":{"message":{
    "name":"cr16-attack",
    "data":{
        "content":"classic text that cannot coexist with V2",
        "components":[{"type":10,"content":"a text display (V2)"}],
        "flags":BIT,
    }}}}}
# The empty-embed divergence class: V2 + an empty embed the client gate ignores.
EMPTY_EMBED = {"0":{"json":{"message":{
    "name":"cr16-empty-embed",
    "data":{
        "components":[{"type":10,"content":"v2"}],
        "embeds":[{}],
        "flags":BIT,
    }}}}}

CASES = [
    ("A. unauth upsert, row-E body (batch)", "POST",
     "/api/trpc/message.upsert?batch=1", json.dumps(ROW_E)),
    ("B. unauth upsert, row-E body (non-batch)", "POST",
     "/api/trpc/message.upsert", json.dumps({"json":{"message":ROW_E["0"]["json"]["message"]}})),
    ("C. unauth upsert, empty-embed divergence body", "POST",
     "/api/trpc/message.upsert?batch=1", json.dumps(EMPTY_EMBED)),
    ("D. control: unauth GET on the v1 read endpoint", "GET",
     "/api/v1/guilds/123456789012345678/messages", None),
]

print(f"=== CR16 persist-surface attack @ {HOST}:{PORT}, oracle fixed ===\n")
out = []
for label, method, path, body in CASES:
    resp = raw(method, path, body)
    status, held, reached = classify(resp)
    verdict = "REACHED-PERSISTENCE" if reached else ("AUTH-HELD" if held else "OTHER")
    line = f"{label}\n   {status}\n   auth-held={held}  db-markers={reached}  => {verdict}"
    print(line, "\n")
    out.append((label, status, held, reached, verdict, resp[:400]))

with open("/tmp/cr16-run/attack-persist-out.txt","w") as f:
    for label, status, held, reached, verdict, head in out:
        f.write(f"{label}\n  {status}\n  held={held} reached={reached} => {verdict}\n  head: {head!r}\n\n")
print("written /tmp/cr16-run/attack-persist-out.txt")
