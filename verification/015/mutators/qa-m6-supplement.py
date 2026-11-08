# QA Phase 2 (chain 015, M6-b to M6-l) mutants at website 24ac49f.
# Selected by MUT_ID; each target must occur exactly once (else the mutator exits non-zero).
import os
import sys

CE = 'src/components/DiscordMessageEditor/components/ComponentEditors/'
ED = 'src/components/DiscordMessageEditor/index.tsx'
LIM = 'src/utils/limits.tsx'
ML = 'src/constants/messageLimits.ts'
AFTER = 'next.splice(idx + 1, 0, clone);'
BEFORE = 'next.splice(idx, 0, clone);'

TEXT_BLOCK = (
    "          <NullableComponent show={v2TextError}>\n"
    "            <div className=\"mt-1 text-xs font-semibold text-error\">{v2TextError}</div>\n"
    "          </NullableComponent>\n")
COUNT_BLOCK = (
    "          <NullableComponent show={componentCountError}>\n"
    "            <div className=\"mt-1 text-xs font-semibold text-error\">{componentCountError}</div>\n"
    "          </NullableComponent>\n")

RECURSION = (
    "      for (const child of children) {\n"
    "        if ('accessory' in child && child.accessory) count += 1;\n"
    "        if ('components' in child && Array.isArray(child.components)) {\n"
    "          count += child.components.length;\n"
    "        }\n"
    "      }\n")

MUTANTS = {
    # M6-i (D9): a nested duplicate lands before the original (same content order, different identity).
    'm6i-actionrow-copy-before': [(CE + 'ActionRowEditor.tsx', AFTER, BEFORE)],
    'm6i-container-copy-before': [(CE + 'ContainerEditor.tsx', AFTER, BEFORE)],
    'm6i-gallery-copy-before': [(CE + 'MediaGalleryEditor.tsx', AFTER, BEFORE)],
    'm6i-section-copy-before': [(CE + 'SectionEditor.tsx', AFTER, BEFORE)],
    # M6-l (vi): the add gate offers again above the limit (only exactly 40 refused).
    'm6l-add-gate-only-at-40': [(ED, 'totalComponentCount < MAX_TOTAL_COMPONENTS;',
                                 'totalComponentCount !== MAX_TOTAL_COMPONENTS;')],
    # M6-l (vi) place: the components line moves above the text-length line.
    'm6l-line-above-text-error': [(ED, TEXT_BLOCK + COUNT_BLOCK, COUNT_BLOCK + TEXT_BLOCK)],
    # M6-l (vi) border: the over-40 error no longer joins the error border.
    'm6l-border-dropped': [(ED, 'v2TextError || componentCountError) && styles.errorBorder',
                            'v2TextError) && styles.errorBorder')],
    # M6-l (iii): the one counter loses its nesting recursion (both consumers must redden).
    'm6l-nesting-recursion-removed': [(LIM, RECURSION, '')],
    # I-3 guard (validateMessage gates Send): branch condition and decision constant.
    'i3-validate-skips-count': [(LIM, "  if (componentCountError) return componentCountError;\n", '')],
    'i3-comparator-at-limit': [(LIM, 'total > MAX_TOTAL_COMPONENTS ?', 'total >= MAX_TOTAL_COMPONENTS ?')],
    'i3-limit-41': [(ML, 'MAX_TOTAL_COMPONENTS = 40 as const', 'MAX_TOTAL_COMPONENTS = 41 as const')],
    # Same handoff, refresh of earlier verdicts. CR-17 (M4): the shared webhook-URL text changes once
    # (both sites must redden). CR-19 (M5-c): the flag ref is frozen at the render the effect subscribed in.
    'm4-invalid-url-text': [('src/constants/index.ts', "INVALID_URL_ERROR = 'Invalid URL' as const",
                             "INVALID_URL_ERROR = 'Invalid url' as const")],
    'm5c-flag-frozen-at-subscribe': [('src/providers/MessageProvider/usePusher.ts',
                                      'const hasChangedRef = useLatest(hasChanged);',
                                      'const hasChangedRef = { current: hasChanged };')],
}

mutant_id = os.environ['MUT_ID']
edits = MUTANTS[mutant_id]
sources = {}
for path, old, _ in edits:
    sources.setdefault(path, open(path).read())
for path, old, new in edits:
    n = sources[path].count(old)
    if n != 1:
        sys.exit(f'mutant {mutant_id}: target in {path} found {n} times')
    sources[path] = sources[path].replace(old, new)
for path, text in sources.items():
    open(path, 'w').write(text)
