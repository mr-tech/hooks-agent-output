# usage: python3 blob-identity.py <repo> <sha> <export-dir>  -> prints "<sha> <export>: N of M tracked blobs equal"
import subprocess, sys, os
repo, sha, exp = sys.argv[1:4]
rows = subprocess.run(['git','-C',repo,'ls-tree','-r',sha], capture_output=True, text=True, check=True).stdout.splitlines()
ok = 0; bad = []
for r in rows:
    meta, path = r.split('\t', 1)
    mode, typ, blob = meta.split()
    p = os.path.join(exp, path)
    if mode == '120000':
        got = subprocess.run(['git','hash-object','--stdin'], input=os.readlink(p).encode(), capture_output=True).stdout.decode().strip() if os.path.islink(p) else None
    else:
        got = subprocess.run(['git','hash-object',p], capture_output=True, text=True).stdout.strip() if os.path.isfile(p) else None
    if got == blob: ok += 1
    else: bad.append(path)
print(f"{sha} {exp}: {ok} of {len(rows)} tracked blobs equal; differing: {bad[:10]}")
