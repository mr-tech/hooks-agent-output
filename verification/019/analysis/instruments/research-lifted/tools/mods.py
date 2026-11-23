"""Approximate webpack-module index over minified chunks.

usage:
  mods.py find <dir> <needle> [<needle> ...]   # modules (file, id, size) containing ALL needles (literal)
  mods.py dump <dir> <module-id> <outfile>     # write one module's text to a file
  mods.py any  <dir> <needle> [...]            # per needle: modules containing it

Module starts are recognised by the shapes `,123456(e,t,n){` / `{123456(e,t,n){` /
`123456:function(` / `123456:(e,t,n)=>`. Approximate: a numeric object key inside a
module that takes one of those shapes would split it, so sizes are a lower bound.
"""
import glob
import os
import re
import sys

START = re.compile(r'(?<=[,{])(\d{3,7})(?:\((?:[A-Za-z_$][\w$]*(?:,[A-Za-z_$][\w$]*){0,2})?\)\{|:function\(|:\((?:[A-Za-z_$][\w$]*(?:,[A-Za-z_$][\w$]*){0,2})?\)=>)')


def index(path):
    data = open(path, encoding='utf-8', errors='replace').read()
    starts = [(m.start(), m.group(1)) for m in START.finditer(data)]
    mods = []
    for i, (off, mid) in enumerate(starts):
        end = starts[i + 1][0] if i + 1 < len(starts) else len(data)
        mods.append((mid, off, end))
    return data, mods


def main():
    cmd, d = sys.argv[1], sys.argv[2]
    files = sorted(glob.glob(os.path.join(d, '*.js')))
    if cmd in ('find', 'any'):
        needles = sys.argv[3:]
        for f in files:
            data, mods = index(f)
            if not any(n in data for n in needles):
                continue
            for mid, a, b in mods:
                body = data[a:b]
                if cmd == 'find':
                    if all(n in body for n in needles):
                        print(os.path.basename(f), mid, b - a)
                else:
                    got = [n for n in needles if n in body]
                    if got:
                        print(os.path.basename(f), mid, b - a, got)
    elif cmd == 'dump':
        mid, out = sys.argv[3], sys.argv[4]
        n = 0
        for f in files:
            data, mods = index(f)
            for m, a, b in mods:
                if m == mid:
                    n += 1
                    with open(out if n == 1 else f'{out}.{n}', 'w', encoding='utf-8') as fh:
                        fh.write(data[a:b])
                    print(os.path.basename(f), m, b - a, '->', out if n == 1 else f'{out}.{n}')
        if not n:
            print('module not found', mid)


main()
