#!/usr/bin/env python3
"""Build the sweep's mutant list: mutant-gen's operator mutants on tools/ plus hand mutants on the settings
and the baseline, which mutant-gen's operators cannot express.

Usage: python3 -I make-mutants.py <mutant-gen.json> <clone at the swept SHA> <out.json>
"""
import json, sys

gen, clone, outp = sys.argv[1:4]
ms = [m for m in json.load(open(gen)) if m['file'].startswith('tools/')]
cr = open(f'{clone}/tools/check-repo.js', encoding='utf8').read()
bl = open(f'{clone}/tools/check-repo-baseline.json', encoding='utf8').read()


def hand(i, file, old, new, why):
    ms.append({'id': f'hand-{i}', 'file': file, 'old': old, 'new': new, 'op': 'hand', 'why': why})


hand(1, 'tools/check-repo.js', "        'verification/014/.gitignore',\n", '',
     '.gitignore exception narrowed to one path')
hand(2, 'tools/check-repo.js', "        '.gitignore',\n        'verification", "        'verification",
     '.gitignore exception loses the root path')
hand(3, 'tools/check-repo.js', "gateInstant: '2026-11-10T09:01:13Z'", "gateInstant: '2099-01-01T00:00:00Z'",
     'gate instant in the future')
hand(4, 'tools/check-repo.js', "vocabularyInstant: '2026-11-10T09:01:13Z'", "vocabularyInstant: '2099-01-01T00:00:00Z'",
     'vocabulary instant in the future')
hand(5, 'tools/check-repo.js', "gateInstant: '2026-11-10T09:01:13Z'", "gateInstant: '2026-08-01T00:00:00Z'",
     'gate instant moved back over closed history')
hand(6, 'tools/check-repo.js', "vocabularyInstant: '2026-11-10T09:01:13Z'", "vocabularyInstant: '2026-08-01T00:00:00Z'",
     'vocabulary instant moved back over closed history')
hand(7, 'tools/check-repo.js', "'WORKING-NOTES.md', 'INDEX.md', '.gitkeep'", "'WORKING-NOTES.md', 'INDEX.md'",
     '.gitkeep no longer not-a-document')
hand(8, 'tools/check-repo.js', "'WORKING-NOTES.md', 'INDEX.md', '.gitkeep'", "'WORKING-NOTES.md', '.gitkeep'",
     'INDEX.md no longer not-a-document')
hand(9, 'tools/check-repo.js', "selfName: 'hooks'", "selfName: 'statbot'", 'selfName names another record')
hand(10, 'tools/check-repo.js', "    ['README.md', 'Directory-level READMEs: the repository root, user-files/, verification/. Not chain documents.'],\n", '',
     'README.md exception removed')
start = bl.index('  {\n')
end = bl.index('  },\n', start) + len('  },\n')
hand(11, 'tools/check-repo-baseline.json', bl[start:end], '', 'first baseline entry removed (a legacy link)')
hand(12, 'tools/check-repo-baseline.json', '[\n  {',
     '[\n  {"check": "links", "detail": "planning/closed/001-nonexistent.md:1  ->  x.md   (markdown-link, resolves to planning/closed/x.md)", "_why": "planted"},\n  {',
     'stale entry added to the baseline')
key = 'code-review/closed/012-carry-forward-to-post-refresh-pass.md: no recognised stage suffix'
i = bl.index(key)
s = bl.rindex('  {\n', 0, i)
e = bl.index('  },\n', i) + len('  },\n') if bl.find('  },\n', i) != -1 else None
hand(13, 'tools/check-repo-baseline.json', bl[s:e], '', 'one of the four named SCOPE entries removed')
hand(14, 'tools/check-repo.js', 'releaseJoinExemption: true', 'releaseJoinExemption: false', 'release-join exemption off')
json.dump(ms, open(outp, 'w'), indent=1, ensure_ascii=False)
print(len(ms), 'mutants')
