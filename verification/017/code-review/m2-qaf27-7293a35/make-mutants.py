"""Code review Round 10 sub-entry, continued (chain 017, QAF-27): writes mutants.json for mutation-run.py at a website SHA.
Four forms of 'a payload that is not a string is taken for its digits' at usePusher's two compares: loose equality
(QA's pair) and String() coercion (a form loose-equality cases need not see). Each must be killed by the new
non-string cases in MessageProvider.own-save-notice.test.tsx.
Usage: python3 make-mutants.py <website repo> <sha> > mutants.json"""
import json, subprocess, sys
repo, sha = sys.argv[1], sys.argv[2]
f = 'src/providers/MessageProvider/usePusher.ts'
s = subprocess.check_output(['git', '-C', repo, 'show', f'{sha}:{f}'], text=True)
T = ['src/providers/MessageProvider/__tests__/MessageProvider.own-save-notice.test.tsx',
     'src/providers/MessageProvider/__tests__/usePusher.update-prompt.test.tsx']
forms = [('record-loose', '(record) => record === hash', '(record) => record == hash'),
         ('shown-loose', 'hash !== shownHash', 'hash != shownHash'),
         ('record-string-coerced', '(record) => record === hash', '(record) => record === String(hash)'),
         ('shown-string-coerced', 'hash !== shownHash', 'String(hash) !== shownHash')]
out = []
for mid, old, new in forms:
    assert s.count(old) == 1, old
    out.append({'id': mid, 'file': f, 'old': old, 'new': new, 'tests': T})
json.dump(out, sys.stdout, indent=1)
