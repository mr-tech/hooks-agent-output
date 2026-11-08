#!/usr/bin/env python3
"""QA mutation sweep driver for the M8 round (chain 015, preview-image-generator).

Usage: python3 -I qa-m8r-sweep.py <export> <mutants.json> <out-dir> <agent-output repo> [-j N] [--probe <file>] [name ...]

--probe names the probe the run executes (default probe.cjs); probe-pages.cjs is always copied beside it.

<export> is an E-1 export built by m8-local-probe/run.sh (git archive of the SHA, npm ci and tsc -b done, no .env).
Each mutant (and one control, name "control") runs in its own copy of the export's build/, package.json and
ecosystem.config.js, with node_modules symlinked to the export's (never the shared tree). The probe files are
written from agent-output HEAD blobs (git show HEAD:<path>), never from the working copy, and their blob SHAs are
recorded. Every edit's old string must occur exactly once, else the mutant is STILLBORN and does not run. The probe
runs inside unshare -rn with lo up and the isolation counts checked, in its own session (setsid), killed with its
whole process group by timeout at 300 s (a timeout counts as a kill). Output goes to files only:
<out-dir>/qa-m8r-<name>.txt per run and <out-dir>/qa-m8r-summary.txt (name, mutated-file sha256, FAIL cells).
Stated limits: build-level mutation (compiled JS), so a mutant expressible only in TypeScript types is out of scope;
the probe's own timing cells are the only clock.
"""
import concurrent.futures, hashlib, json, os, shutil, subprocess, sys

PROBE_FILES = ['probe.cjs', 'probe-pages.cjs']
PROBE_MAIN = 'probe.cjs'
PROBE_DIR = 'verification/015/m8-local-probe'


def blob(ao, path):
    return subprocess.run(['git', '-C', ao, 'show', f'HEAD:{path}'], capture_output=True, check=True).stdout


def blob_sha(ao, path):
    return subprocess.run(['git', '-C', ao, 'rev-parse', f'HEAD:{path}'], capture_output=True, text=True, check=True).stdout.strip()


def apply(m_dir, spec):
    path = os.path.join(m_dir, spec['file'])
    text = open(path).read()
    for old, new in spec['edits']:
        n = text.count(old)
        if n != 1:
            return f"old string occurs {n} times: {old[:60]!r}"
        text = text.replace(old, new)
    open(path, 'w').write(text)
    return None


def run_one(export, out_dir, ao, m):
    name = m['name']
    m_dir = os.path.join(os.path.dirname(export.rstrip('/')), f'qa-m8r-{name}')
    shutil.rmtree(m_dir, ignore_errors=True)
    os.makedirs(m_dir)
    shutil.copytree(os.path.join(export, 'build'), os.path.join(m_dir, 'build'))
    for f in ['package.json', 'ecosystem.config.js']:
        shutil.copy2(os.path.join(export, f), m_dir)
    os.symlink(os.path.join(export, 'node_modules'), os.path.join(m_dir, 'node_modules'))
    for f in PROBE_FILES:
        open(os.path.join(m_dir, f), 'wb').write(blob(ao, f'{PROBE_DIR}/{f}'))
    out = os.path.join(out_dir, f'qa-m8r-{name}' + ('' if PROBE_MAIN == 'probe.cjs' else '-' + PROBE_MAIN.split('.')[0]) + '.txt')
    hashes = []
    for spec in [m] + ([m['extra']] if m.get('extra') else []):
        if 'file' not in spec:
            continue
        err = apply(m_dir, spec)
        if err:
            open(out, 'w').write(f'{name}: STILLBORN ({spec["file"]}: {err})\n')
            shutil.rmtree(m_dir, ignore_errors=True)
            return name, 'STILLBORN', [], hashes
        before = hashlib.sha256(open(os.path.join(export, spec['file']), 'rb').read()).hexdigest()[:12]
        after = hashlib.sha256(open(os.path.join(m_dir, spec['file']), 'rb').read()).hexdigest()[:12]
        if before == after:
            open(out, 'w').write(f'{name}: STILLBORN (no byte change)\n')
            return name, 'STILLBORN', [], hashes
        hashes.append(f'{spec["file"]} {before}->{after}')
    inner = ('ip link set lo up; nonlo=$(ip -o link show | grep -vc ": lo:"); routes=$(ip route show default | grep -c .); '
             'echo "isolation: non-lo links=$nonlo default routes=$routes"; '
             '[ "$nonlo" = 0 ] && [ "$routes" = 0 ] || { echo ISOLATION FAILED; exit 9; }; cd "$1" && node "$2"')
    with open(out, 'w') as fh:
        fh.write(f'mutant {name}\n' + ''.join(f'mutated {h}\n' for h in hashes))
        fh.flush()
        p = subprocess.run(['setsid', 'timeout', '-k', '5', '300', 'unshare', '-rn', 'bash', '-c', inner, '_', m_dir, PROBE_MAIN],
                           stdout=fh, stderr=subprocess.STDOUT)
        fh.write(f'exit {p.returncode}\n')
    text = open(out).read()
    fails = [l.split(' -- ')[0][len('CELL FAIL '):] for l in text.splitlines() if l.startswith('CELL FAIL ')]
    if 'ISOLATION FAILED' in text or 'SELF-CHECK FAILED' in text:
        status = 'ABORTED'
    elif p.returncode == 124:
        status = 'KILLED (timeout)'
    elif 'SUMMARY cells=' not in text:
        status = f'ABORTED (no summary, exit {p.returncode})'
    else:
        status = 'KILLED' if fails else 'SURVIVED'
    shutil.rmtree(m_dir, ignore_errors=True)
    return name, status, fails, hashes


def main():
    args = sys.argv[1:]
    jobs = 1
    global PROBE_FILES, PROBE_MAIN
    if '--probe' in args:
        i = args.index('--probe'); PROBE_MAIN = args[i + 1]; del args[i:i + 2]
        PROBE_FILES = [PROBE_MAIN, 'probe-pages.cjs']
    if '-j' in args:
        i = args.index('-j'); jobs = int(args[i + 1]); del args[i:i + 2]
    export, mjson, out_dir, ao, *names = args
    os.makedirs(out_dir, exist_ok=True)
    mutants = [{'name': 'control', 'edits': []}] + json.load(open(mjson))['mutants']
    if names:
        mutants = [m for m in mutants if m['name'] in names]
    head = [f'export {export}', f'mutant set {mjson} blob {blob_sha(ao, os.path.relpath(os.path.abspath(mjson), ao))}']
    head += [f'probe {f} blob {blob_sha(ao, f"{PROBE_DIR}/{f}")}' for f in PROBE_FILES]
    with concurrent.futures.ThreadPoolExecutor(jobs) as ex:
        results = list(ex.map(lambda m: run_one(export, out_dir, ao, m), mutants))
    summary = 'qa-m8r-summary.txt' if PROBE_MAIN == 'probe.cjs' else f'qa-m8r-summary-{PROBE_MAIN.split(".")[0]}.txt'
    with open(os.path.join(out_dir, summary), 'w') as fh:
        fh.write('\n'.join(head) + '\n')
        for name, status, fails, hashes in results:
            fh.write(f'{name}\t{status}\t{len(fails)} red\t{"; ".join(hashes)}\n')
            for f in fails:
                fh.write(f'    red: {f}\n')


if __name__ == '__main__':
    main()
