# QA Phase 2 (chain 015), the 2618926 pass: the production diff 4f9ed85..2618926, i.e. the three useMount callers moved
# to useEffect (CR-26, CR-37). .eslintrc.json is config, exercised by code review's cr-m6-probes/cr26-ban/run.sh, not by
# this suite. Selected by MUT_ID; each target must occur exactly once (else the mutator exits non-zero).
import os
import sys

BT = 'src/components/Button.tsx'
ED = 'src/components/DiscordMessageEditor/index.tsx'
HK = 'src/utils/hooks/index.ts'
BT_EFFECT = 'useEffect(() => { if (autoFocus) localRef.current?.focus(); }, []);'
BT_ARIA = 'useButton(_props as AriaButtonProps, localRef)'

MUTANTS = {
    # Button: the mount effect emptied (code review: equivalent, react-aria focuses from autoFocus itself).
    'r4-button-effect-empty': [(BT, BT_EFFECT, 'useEffect(() => {}, []);')],
    # Button: both mechanisms removed: the effect emptied and react-aria told autoFocus is false.
    'r4-button-no-autofocus': [(BT, BT_EFFECT, 'useEffect(() => {}, []);'),
                               (BT, BT_ARIA, 'useButton({ ...(_props as AriaButtonProps), autoFocus: false }, localRef)')],
    # Button: the effect focuses whether or not autoFocus is set (the negative half).
    'r4-button-always-focus': [(BT, BT_EFFECT, 'useEffect(() => { localRef.current?.focus(); }, []);')],
    # Button: react-aria told autoFocus is true for every button (the negative half on the library path).
    'r4-button-aria-always': [(BT, BT_ARIA, 'useButton({ ...(_props as AriaButtonProps), autoFocus: true }, localRef)')],
    # Button at c5303ca (CR-38 removed the effect): react-aria told autoFocus is false, the one remaining mechanism.
    'r5-button-aria-off': [(BT, BT_ARIA, 'useButton({ ...(_props as AriaButtonProps), autoFocus: false }, localRef)')],
    # /preview (QAF-35's `{` row): a data value that fails JSON.parse is rethrown instead of refused.
    'r5-preview-parse-failure-rethrows': [('src/app/preview/page.tsx', '  } catch {\n    return null;\n  }', '  } catch (err) {\n    throw err;\n  }')],
    # DiscordMessageEditor: onMount never called.
    'r4-editor-onmount-empty': [(ED, 'useEffect(() => { onMount?.(); }, []);', 'useEffect(() => {}, []);')],
    # DiscordMessageEditor: onMount called on every render (the [] dropped).
    'r4-editor-onmount-every-render': [(ED, 'useEffect(() => { onMount?.(); }, []);', 'useEffect(() => { onMount?.(); });')],
    # useMounted: never becomes true without a delay.
    'r4-mounted-never-without-delay': [(HK, '    if (!delay) {\n      setMounted(true);', '    if (!delay) {\n      setMounted(false);')],
    # useMounted: the effect re-runs on every render (the [] dropped).
    'r4-mounted-every-render': [(HK, '      setTimeout(() => { setMounted(true); }, delay);\n    }\n  }, []);',
                                '      setTimeout(() => { setMounted(true); }, delay);\n    }\n  });')],
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
