#!/usr/bin/env python3
"""Lockfile movers between two committed lockfiles (M2-b).

Usage: lockfile-movers.py <website repo> <base sha> <new sha> <out file>

Per package name, the set of versions under `packages:` at each commit; a name whose set differs is a mover. Then the
`snapshots:` keys whose package version is unchanged but whose key text changed (peer-suffixed keys), by package name.
"""
import re
import subprocess
import sys

repo, base, new, out = sys.argv[1:5]


def lock(sha):
    return subprocess.run(["git", "-C", repo, "show", f"{sha}:pnpm-lock.yaml"], capture_output=True, text=True, check=True).stdout


def section_keys(text, name):
    keys, inside = [], False
    for line in text.splitlines():
        if re.match(r"^[a-z]", line):
            inside = line.startswith(name + ":")
            continue
        if inside:
            m = re.match(r"^  (\S.*):( \{\})?$", line)
            if m:
                keys.append(m.group(1).strip("'"))
    return keys


def split(key):
    m = re.match(r"^(@?[^@]+)@([^(]+)(\(.*)?$", key)
    return (m.group(1), m.group(2), m.group(3) or "") if m else (key, "?", "")


b, n = lock(base), lock(new)
lines = []
bp, np_ = section_keys(b, "packages"), section_keys(n, "packages")
lines.append(f"packages keys: base {len(bp)}, new {len(np_)}")


def by_name(keys):
    d = {}
    for k in keys:
        name, ver, _ = split(k)
        d.setdefault(name, set()).add(ver)
    return d


bn, nn = by_name(bp), by_name(np_)
lines.append("# packages: name | base versions | new versions")
for name in sorted(set(bn) | set(nn)):
    if bn.get(name) != nn.get(name):
        lines.append(f"{name}\t{','.join(sorted(bn.get(name, [])) ) or '-'}\t->\t{','.join(sorted(nn.get(name, []))) or '-'}")

bs, ns = section_keys(b, "snapshots"), section_keys(n, "snapshots")
lines.append(f"snapshots keys: base {len(bs)}, new {len(ns)}")
lines.append("# snapshots whose package version did not move but whose key did (peer-suffixed keys): name@version")
bsn, nsn = {}, {}
for k in bs:
    name, ver, suf = split(k)
    bsn.setdefault((name, ver), set()).add(suf)
for k in ns:
    name, ver, suf = split(k)
    nsn.setdefault((name, ver), set()).add(suf)
for key in sorted(set(bsn) & set(nsn)):
    if bsn[key] != nsn[key]:
        lines.append(f"{key[0]}@{key[1]}")
open(out, "w").write("\n".join(lines) + "\n")
