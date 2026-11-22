"""QA mutant set for the refresh pass: mutant-gen over 2e6127e..24eda1c plus QA's mutants of codeLineRanges and the top-level merge.
Each QA mutant is an exact-once replacement in decorator.tsx at 24eda1c; refused otherwise."""
import json, subprocess, sys
V = '/usr/local/bin/hooks/agent-output/verification/fix-decorator-offsets/qa/refresh-24eda1c'
D = 'src/components/SlateEditor/utils/decorator.tsx'
QA = [
 ('qa-start-includes-own-node', "line.children.slice(0, path.at(-1))", "line.children.slice(0, (path.at(-1) as number) + 1)"),
 ('qa-start-emoji-width-zero', ".map((c) => flattenNodeText(c)).join('')", ".map((c) => flattenNodeText(c, false)).join('')"),
 ('qa-highlight-node-text-only', "handleCodeBlockRange(leaf, line.lang, flattenNodeText(line));", "handleCodeBlockRange(leaf, line.lang, flattenNodeText(line.children[path.at(-1) as number]));"),
 ('qa-anchor-not-shifted', "anchor: { ...range.anchor, offset: range.anchor.offset - start },", "anchor: { ...range.anchor, offset: range.anchor.offset },"),
 ('qa-focus-not-shifted', "focus: { ...range.focus, offset: range.focus.offset - start },", "focus: { ...range.focus, offset: range.focus.offset },"),
 ('qa-language-branch-always', "if (ancestor.lang) return codeLineRanges", "if (true) return codeLineRanges"),
 ('qa-code-ranges-not-normalized', "return normalizeRanges(leaf.ranges).map((range) => ({", "return leaf.ranges.map((range) => ({"),
 ('qa-top-level-merge-dropped', "const normalized = normalizeAst(ast.flatMap((a) => (\n    a.type === 'paragraph' ? a.content as unknown as StrictSingleASTNode[] : [a]\n  )));", "const normalized = ast.flatMap((a) => (\n    a.type === 'paragraph' ? normalizeAst(a.content as unknown as StrictSingleASTNode[]) : [a]\n  ));"),
]
src = subprocess.run(['git','-C','/usr/local/bin/hooks/website','show','24eda1c:'+D],capture_output=True,text=True,check=True).stdout
out = json.load(open(V+'/mutants-gen.json'))
for m in out: m['origin'] = 'mutant-gen'
for mid, old, new in QA:
    n = src.count(old)
    if n != 1: sys.exit(f'{mid}: old occurs {n} times')
    out.append({'id': mid, 'file': D, 'old': old, 'new': new, 'origin': 'qa'})
json.dump(out, open(V+'/mutants-qa-24eda1c.json','w'), indent=1)
print(len(out), 'mutants;', len(QA), 'qa-added')
