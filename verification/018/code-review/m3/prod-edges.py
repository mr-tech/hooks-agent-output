"""Production-closure edge comparison between two installed trees.

Usage: python3 -I prod-edges.py <a.json> <b.json>
Each JSON is `pnpm list --prod --depth Infinity --json` run in an export with `pnpm install --frozen-lockfile`.
Prints every (parent@version -> child@version) edge present in one tree and not the other.
Blind spot: optional dependencies absent on this host's platform are not installed, so their edges are not listed.
"""
import json, sys

def edges(path):
    out = set()
    def walk(deps, parent, depth):
        for name, info in (deps or {}).items():
            child = f"{name}@{info.get('version')}"
            out.add((parent, child))
            if depth < 30:
                walk(info.get('dependencies'), child, depth + 1)
    for root in json.load(open(path)):
        walk(root.get('dependencies'), 'website', 0)
    return out

a, b = edges(sys.argv[1]), edges(sys.argv[2])
print('edges', len(a), '->', len(b), '| removed', len(a - b), 'added', len(b - a))
for e in sorted(a - b): print('  -', e[0], '->', e[1])
for e in sorted(b - a): print('  +', e[0], '->', e[1])
