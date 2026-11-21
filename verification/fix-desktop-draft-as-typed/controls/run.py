#!/usr/bin/env python3
"""Run the chain's red run and negative controls, each in its own `git archive` export.

Usage: run.py WEBSITE_REPO WORK_DIR OUT_DIR

Each run: export a commit with `git archive`, symlink the repo's node_modules into it, overlay
files or apply one exact-once replacement, run vitest over the chain's three test files with the
JSON reporter, in a new session with stdin from /dev/null and output to files; the whole process
group is SIGKILLed when the child exits or at TIMEOUT seconds (a timeout counts as a kill).
Writes OUT_DIR/table.json.
"""
import json
import os
import signal
import subprocess
import sys
import shutil

BASE = 'b663b35'
FIX = 'b68f94c'
TIMEOUT = 240
TESTS = [
    'src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx',
    'src/components/DiscordMessageEditor/components/EmbedEditor/__tests__/EmbedAuthor.typed-name-reaches-embed.test.tsx',
    'src/components/DiscordMessageEditor/components/EmbedEditor/__tests__/EmbedFooter.typed-text-reaches-embed.test.tsx',
]
DESKTOP = 'src/components/DiscordContentEditor/Desktop.tsx'
AUTHOR = 'src/components/DiscordMessageEditor/components/EmbedEditor/EmbedAuthor.tsx'
FOOTER = 'src/components/DiscordMessageEditor/components/EmbedEditor/EmbedFooter.tsx'

RUNS = [
    {'id': 'control-fix', 'sha': FIX},
    {'id': 'red-base', 'sha': BASE, 'overlay_from': FIX, 'overlay': TESTS},
    {'id': 'desktop-stale-value', 'sha': FIX, 'file': DESKTOP,
     'old': '              onChange(str);', 'new': '              onChange(_value);'},
    {'id': 'author-trim-per-keystroke', 'sha': FIX, 'file': AUTHOR,
     'old': '                  setName(value);', 'new': '                  setName(value.trim());'},
    {'id': 'author-stale-value', 'sha': FIX, 'file': AUTHOR,
     'old': '                  setName(value);', 'new': '                  setName(localUsername);'},
    {'id': 'author-no-blur-trim', 'sha': FIX, 'file': AUTHOR,
     'old': 'const newName = localUsername.trim();', 'new': 'const newName = localUsername;'},
    {'id': 'footer-trim-per-keystroke', 'sha': FIX, 'file': FOOTER,
     'old': '              setText(value);', 'new': '              setText(value.trim());'},
    {'id': 'footer-stale-value', 'sha': FIX, 'file': FOOTER,
     'old': '              setText(value);', 'new': '              setText(localText);'},
    {'id': 'footer-no-blur-trim', 'sha': FIX, 'file': FOOTER,
     'old': 'onBlur={() => setText(localText?.trim())}', 'new': 'onBlur={() => setText(localText)}'},
]


def export(repo, sha, dest):
    os.makedirs(dest)
    archive = subprocess.run(['git', '-C', repo, 'archive', sha], check=True, capture_output=True).stdout
    subprocess.run(['tar', '-x', '-C', dest], input=archive, check=True)
    os.symlink(os.path.join(repo, 'node_modules'), os.path.join(dest, 'node_modules'))


def main():
    repo, work, out = (os.path.abspath(p) for p in sys.argv[1:4])
    os.makedirs(work, exist_ok=True)
    os.makedirs(out, exist_ok=True)
    rows = []
    for n, run in enumerate(RUNS, 1):
        dest = os.path.join(work, f'run-{n}')
        if os.path.exists(dest):
            shutil.rmtree(dest)
        export(repo, run['sha'], dest)
        for path in run.get('overlay', []):
            body = subprocess.run(['git', '-C', repo, 'show', f"{run['overlay_from']}:{path}"],
                                  check=True, capture_output=True).stdout
            os.makedirs(os.path.dirname(os.path.join(dest, path)), exist_ok=True)
            with open(os.path.join(dest, path), 'wb') as f:
                f.write(body)
        if 'file' in run:
            target = os.path.join(dest, run['file'])
            text = open(target, encoding='utf-8').read()
            if text.count(run['old']) != 1:
                rows.append({'id': run['id'], 'outcome': 'NOT-APPLIED'})
                continue
            open(target, 'w', encoding='utf-8').write(text.replace(run['old'], run['new']))
        report = os.path.join(out, f"{run['id']}.json")
        stdout = open(os.path.join(out, f"{run['id']}.stdout"), 'w')
        stderr = open(os.path.join(out, f"{run['id']}.stderr"), 'w')
        proc = subprocess.Popen(
            ['npx', 'vitest', 'run', '--no-cache', '--reporter=json', f'--outputFile={report}', *TESTS],
            cwd=dest, stdin=subprocess.DEVNULL, stdout=stdout, stderr=stderr, start_new_session=True)
        timed_out = False
        try:
            proc.wait(timeout=TIMEOUT)
        except subprocess.TimeoutExpired:
            timed_out = True
        try:
            os.killpg(proc.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
        proc.wait()
        stdout.close()
        stderr.close()
        row = {'id': run['id'], 'sha': run['sha'], 'exit': proc.returncode, 'timed_out': timed_out}
        if os.path.exists(report):
            data = json.load(open(report))
            row['total'] = data['numTotalTests']
            row['failed'] = [a['title'] for r in data['testResults'] for a in r['assertionResults']
                             if a['status'] != 'passed']
        rows.append(row)
        shutil.rmtree(dest)
    json.dump(rows, open(os.path.join(out, 'table.json'), 'w'), indent=2)


if __name__ == '__main__':
    main()
