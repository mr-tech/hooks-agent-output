#!/usr/bin/env python3
"""Build QA's M8 mutants as exact-once anchors against website c37d41a (M8's tip).

Usage: python3 -I build-qa-mutants.py <website repo> <out.json>
Each mutant's "old" must occur exactly once in its file at c37d41a (read with git show); the script refuses otherwise.
Every case runs the whole suite (no "tests" key): the suite takes about 17 s.
Scope: QA Phase 1's named mutants NM-30 to NM-38 (qa/017-existing-items-backlog-qa.md, revision 6 and 7 re-keys), built
by QA independently of the implementer's edits file, plus QA's additions marked qa-. M8 has no Irreversible Side-Effect
Register entry, so this is the milestone's named set; the effort-final operator sweep over the chain's diff is owed later.
"""
import json
import subprocess
import sys

repo, out = sys.argv[1], sys.argv[2]
SHA = 'c37d41a'

HOOK = 'src/utils/hooks/useDialogEnter.ts'
WD = 'src/components/WarningDialog.tsx'
IU = 'src/components/ImageUploader.tsx'
CD = 'src/components/ConfirmationDialog.tsx'

IMPORT = "import useDialogEnter from '~/utils/hooks/useDialogEnter';"
# A local stand-in with the same signature and no focus gate: the 5c3d03f behaviour of W and I.
UNSCOPED = (
    "import { useHotkeys as qaUseHotkeys } from 'react-hotkeys-hook';\n"
    "import { useRef as qaUseRef } from 'react';\n"
    "const useDialogEnter = (a: (() => void) | undefined, enabled = true) => {\n"
    "  const r = qaUseRef<HTMLDivElement>(null);\n"
    "  qaUseHotkeys(['enter'], () => { a?.(); }, { enabled }, [enabled, a]);\n"
    "  return r;\n"
    "};"
)
GATE = "ref.current?.closest('[role=\"dialog\"]')?.contains(document.activeElement)"

M = [
    ('NM-30-warning-unscoped', WD, IMPORT, UNSCOPED),
    ('NM-31-image-unscoped', IU, IMPORT, UNSCOPED),
    ('NM-32-gate-any-dialog', HOOK, GATE, "document.activeElement?.closest('[role=\"dialog\"]')"),
    ('NM-33-gate-content-wrapper-only', HOOK, GATE, "ref.current?.contains(document.activeElement)"),
    ('NM-34-image-enabled-dropped', IU, "useDialogEnter(submit, isOpen)", "useDialogEnter(submit)"),
    ('NM-35-ref-shared-across-instances', HOOK, "const ref = useRef<HTMLDivElement>(null);",
     "const qaHeld = useRef<HTMLDivElement>(null); void qaHeld;\n"
     "  if (!Reflect.get(globalThis, 'qaSharedRef')) Reflect.set(globalThis, 'qaSharedRef', { current: null });\n"
     "  const ref = Reflect.get(globalThis, 'qaSharedRef') as { current: HTMLDivElement | null };"),
    # NM-35's first form mixed ?? and && without parentheses and did not parse (ABORTED in sweep/, 1403 of 1724 run);
    # this form replaced it and ran alone (sweep-nm35/).
    ('NM-36-enable-on-form-tags', HOOK, "{ enabled }, [enabled, answer]", "{ enabled, enableOnFormTags: true }, [enabled, answer]"),
    ('NM-37-image-submit-without-image', IU, "useDialogEnter(submit, isOpen)", "useDialogEnter(onSetImage, isOpen)"),
    ('NM-38-confirmation-unscoped', CD, IMPORT, UNSCOPED),
    # QA additions
    ('qa-warning-enabled-dropped', WD, "useDialogEnter(onConfirm, open)", "useDialogEnter(onConfirm)"),
    ('qa-confirmation-enter-disabled', CD, "useDialogEnter(onConfirm)", "useDialogEnter(onConfirm, false)"),
    ('qa-hook-enabled-not-passed', HOOK, "{ enabled }, [enabled, answer]", "{}, [enabled, answer]"),
]

rows = []
for mid, path, old, new in M:
    text = subprocess.run(['git', '-C', repo, 'show', f'{SHA}:{path}'], check=True, capture_output=True, text=True).stdout
    count = text.count(old)
    if count != 1:
        sys.exit(f'{mid}: anchor occurs {count} times in {path}')
    rows.append({'id': mid, 'file': path, 'old': old, 'new': new})

json.dump(rows, open(out, 'w'), indent=1)
print(f'{len(rows)} mutants written to {out}')
