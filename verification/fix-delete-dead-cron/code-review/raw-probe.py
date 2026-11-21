#!/usr/bin/env python3
"""Raw-socket probe of /api/cron on a running Next dev server.

Usage: python3 -I raw-probe.py <port> <label>

Sends each request target below over a plain TCP socket (no client library, so nothing is
percent-decoded, case-folded or dot-segment-normalised before the server sees it) and prints one
tab-separated row per request: method, target, status, content-type, body length, verdict.

Oracle. At the base tree the handler answers a wrong key with `res.status(404).end()` (empty body)
and a correct key by running (200 JSON, or 500 when its dependencies are absent). Next's ordinary
not-found is a 404 with a non-empty text/html body. Next's own path normalisation (trailing slash,
double slash, absolute-form target) answers 308 before routing; such a row is REDIRECT and its
Location is printed, and the Location is then requested raw so the row it lands on is classified
too. Otherwise a row is HANDLER when the response is a 404 with an empty body or any other status,
and NOT_FOUND only for a 404 carrying an HTML body (HEAD: a 404 with a text/html content type).
"""
import socket
import sys

port = int(sys.argv[1])
label = sys.argv[2]

targets = [
    "/api/cron?key=vercel",
    "/api/cron",
    "/api/cron?key=wrong",
    "/api/cron/",
    "/api/cron/?key=vercel",
    "/API/CRON?key=vercel",
    "/api/Cron?key=vercel",
    "/api/%63ron?key=vercel",
    "/api/cron%2F?key=vercel",
    "/api/./cron?key=vercel",
    "/api/x/../cron?key=vercel",
    "//api/cron?key=vercel",
    "/api/cron.ts?key=vercel",
    "/api/cron.js?key=vercel",
    "/api/cron/index?key=vercel",
    "/api/cron?key=vercel&key=vercel",
    "/api/cron;?key=vercel",
    "http://127.0.0.1/api/cron?key=vercel",
]
methods = ["GET", "POST", "HEAD"]


def send(method, target):
    s = socket.create_connection(("127.0.0.1", port), timeout=60)
    req = (
        f"{method} {target} HTTP/1.1\r\nHost: 127.0.0.1:{port}\r\n"
        "Content-Length: 0\r\nConnection: close\r\n\r\n"
    )
    s.sendall(req.encode("latin-1"))
    chunks = []
    while True:
        try:
            c = s.recv(65536)
        except socket.timeout:
            break
        if not c:
            break
        chunks.append(c)
    s.close()
    raw = b"".join(chunks)
    head, _, body = raw.partition(b"\r\n\r\n")
    lines = head.decode("latin-1").split("\r\n")
    status = int(lines[0].split()[1]) if lines and len(lines[0].split()) > 1 else 0
    ctype = ""
    location = ""
    for ln in lines[1:]:
        if ln.lower().startswith("content-type:"):
            ctype = ln.split(":", 1)[1].strip()
        if ln.lower().startswith("location:"):
            location = ln.split(":", 1)[1].strip()
    return status, ctype, len(body), location


def classify(m, status, ctype, blen):
    if status in (301, 302, 307, 308):
        return "REDIRECT"
    if m == "HEAD":
        return "NOT_FOUND" if status == 404 and "text/html" in ctype else "HANDLER"
    return "NOT_FOUND" if status == 404 and blen > 0 and "text/html" in ctype else "HANDLER"


for m in methods:
    for t in targets:
        status, ctype, blen, loc = send(m, t)
        verdict = classify(m, status, ctype, blen)
        print(f"{label}\t{m}\t{t}\t{status}\t{ctype}\t{blen}\t{verdict}\t{loc}", flush=True)
        if verdict == "REDIRECT" and loc.startswith("/"):
            s2, c2, b2, l2 = send(m, loc)
            print(f"{label}\t{m}\t{t} -> {loc}\t{s2}\t{c2}\t{b2}\t{classify(m, s2, c2, b2)}\t{l2}", flush=True)
