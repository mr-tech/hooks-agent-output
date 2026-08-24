import socket
HOST,PORT='127.0.0.1',3117
def raw(method,path,hdrs=()):
    s=socket.create_connection((HOST,PORT),timeout=20)
    lines=[f"{method} {path} HTTP/1.1",f"Host: {HOST}:{PORT}"]+list(hdrs)+["Connection: close"]
    s.sendall(("\r\n".join(lines)+"\r\n\r\n").encode())
    b=b''
    try:
        while True:
            c=s.recv(65536)
            if not c: break
            b+=c
    except Exception: pass
    s.close(); return b.decode('utf-8','replace')
# ORACLE: the middleware's Bearer check is the ONLY intended guard on /api/v1.
#   guard fires  -> rewrite to hooks.gg/404 (or 401/403)
#   guard absent -> the handler runs, reaches for the DB on a dead port, and the
#                   catch turns that into 500. A 500 here PROVES execution.
CASES=[
 ("no auth header",           "GET","/api/v1/guilds/123456789012345678/messages",()),
 ("wrong bearer",             "GET","/api/v1/guilds/123456789012345678/messages",("Authorization: Bearer wrong",)),
 ("empty bearer",             "GET","/api/v1/guilds/123456789012345678/messages",("Authorization: Bearer ",)),
 ("single message, no auth",  "GET","/api/v1/guilds/123456789012345678/messages/1",()),
 ("bad guildId (control)",    "GET","/api/v1/guilds/notasnowflake/messages",()),
 ("POST (control, 405)",      "POST","/api/v1/guilds/123456789012345678/messages",()),
]
for name,m,p,h in CASES:
    r=raw(m,p,h)
    status=r.split('\r\n')[0]
    print(f"{name:26s} | {m:5s} | {status}")
