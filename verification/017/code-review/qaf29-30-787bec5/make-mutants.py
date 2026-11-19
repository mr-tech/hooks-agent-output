"""Code review sub-entry (chain 017, QAF-29 and QAF-30, release-tip test fix): writes mutants.json for mutation-run.py.
QAF-29: the share-code effect's route-0 write deleted (QA's form) or writing the wrong data.
QAF-30: the ref-bearing wrapper given a box-forming class, its class dropped, or the footer moved out of it.
Each must be killed by the new cases in stored-draft, WarningDialog.enter-scope or ImageUploader.enter-scope.
Usage: python3 make-mutants.py <website repo> <sha> > mutants.json"""
import json, subprocess, sys
repo, sha = sys.argv[1], sys.argv[2]
def src(f): return subprocess.check_output(['git', '-C', repo, 'show', f'{sha}:{f}'], text=True)
T = ['src/providers/MessageProvider/__tests__/MessageProvider.stored-draft.test.tsx',
     'src/components/__tests__/WarningDialog.enter-scope.test.tsx',
     'src/components/__tests__/ImageUploader.enter-scope.test.tsx']
P = 'src/providers/MessageProvider/index.tsx'; C = 'src/components/ConfirmationDialog.tsx'
W = 'src/components/WarningDialog.tsx'; I = 'src/components/ImageUploader.tsx'
forms = [
 ('r0-write-deleted', P, '      writeRouteZeroDraft(tmp);\n      loadedRef.current = tmp;', '      loadedRef.current = tmp;'),
 ('r0-write-wrong-data', P, '      writeRouteZeroDraft(tmp);\n      loadedRef.current = tmp;', '      writeRouteZeroDraft({ ...tmp, data: { content: \'\' } });\n      loadedRef.current = tmp;'),
 ('confirmation-box-class', C, '<div ref={ref} className="contents">', '<div ref={ref} className="flex flex-col">'),
 ('warning-footer-outside', W, '<div ref={ref} className="contents">\n        <p className="text-sm">{message}</p>\n',
  '<div ref={ref} className="contents">\n        <p className="text-sm">{message}</p>\n      </div>\n      <div>\n'),
 ('uploader-class-dropped', I, '<div ref={ref} className="contents">', '<div ref={ref}>'),
]
out = []
for mid, f, old, new in forms:
    assert src(f).count(old) == 1, (mid, old)
    out.append({'id': mid, 'file': f, 'old': old, 'new': new, 'tests': T})
json.dump(out, sys.stdout, indent=1)
