"""Build the QA mutant set: mutant-gen's operator set over 8845b7e..2e6127e plus QA's conjunct/coupling/width mutants.
Each QA mutant is an exact-once replacement in the file at 2e6127e; refused otherwise."""
import json, subprocess, sys
V = '/usr/local/bin/hooks/agent-output/verification/fix-decorator-offsets/qa'
D = 'src/components/SlateEditor/utils/decorator.tsx'
R = 'src/utils/markdown/rules.tsx'
QA = [
 ('qa-trailing-guard-dropped', D, "if (trailing && !(edgeChild.last", "if (!(edgeChild.last"),
 ('qa-trailing-last-conjunct-dropped', D, "!(edgeChild.last && adjacentClosingWidth(ast))", "!(adjacentClosingWidth(ast))"),
 ('qa-trailing-adjacent-conjunct-dropped', D, "!(edgeChild.last && adjacentClosingWidth(ast))", "!(edgeChild.last)"),
 ('qa-trailing-always-grown', D, "if (trailing && !(edgeChild.last && adjacentClosingWidth(ast))) leaf", "if (trailing) leaf"),
 ('qa-adjacent-link-type-dropped', D, "if (ast.type === 'link' && !isMaskedLink(ast)) return closingWidth(ast);", "if (!isMaskedLink(ast)) return closingWidth(ast);"),
 ('qa-adjacent-masked-conjunct-dropped', D, "if (ast.type === 'link' && !isMaskedLink(ast)) return closingWidth(ast);", "if (ast.type === 'link') return closingWidth(ast);"),
 ('qa-masked-type-conjunct-dropped', D, "return ast.type === 'link' && sourceOf(ast).startsWith('[');", "return sourceOf(ast).startsWith('[');"),
 ('qa-masked-source-conjunct-dropped', D, "return ast.type === 'link' && sourceOf(ast).startsWith('[');", "return ast.type === 'link';"),
 ('qa-link-opening-bracket-only', D, "/^[[<]/.test", "/^\\[/.test"),
 ('qa-link-opening-angle-only', D, "/^[[<]/.test", "/^</.test"),
 ('qa-codeblock-lang-conjunct-dropped', D, "if (leaf.lang !== '' && typeof ast.content === 'string') {", "if (typeof ast.content === 'string') {"),
 ('qa-opening-always-grown', D, "if (!edgeChild.first) leaf.grow(opening, 'syntax');", "leaf.grow(opening, 'syntax');"),
 ('qa-first-never-set', D, "{ first: i === 0, last:", "{ first: false, last:"),
 ('qa-last-never-set', D, "last: i === children.length - 1 }", "last: false }"),
 ('qa-merge-source-not-merged', D, "(prevNode as SourcedNode).source = sourceOf(prevNode) + sourceOf(a);", ""),
 ('qa-backlink-ignored', D, "return nodes.map((a) => (a as { node?: SourcedNode }).node ?? a);", "return nodes;"),
 ('qa-string-content-width-not-source', D, "} else if (typeof astContent === 'string') leaf.jump(sourceOf(ast).length);", "} else if (typeof astContent === 'string') leaf.jump(astContent.length);"),
 ('qa-contentless-jump-zero', D, "      leaf.jump(sourceOf(ast).length);\n    }\n    return;", "      leaf.jump(0);\n    }\n    return;"),
 ('qa-top-level-unflatten-dropped', D, "for (const a of unflattened(normalized)) walkAst", "for (const a of normalized) walkAst"),
 ('qa-empty-range-filter-dropped', D, "return normalizeRanges(leaf.ranges).filter((range) => range.anchor.offset < range.focus.offset);", "return normalizeRanges(leaf.ranges);"),
 ('qa-source-of-content-only', D, "return ast.source ?? ast.content as string;", "return ast.content as string;"),
 ('qa-marker-width-default-content', D, "return ast.markerWidth ?? 0;", "return 0;"),
 ('qa-target-source-dropped', R, "        targetSource: capture[2],\n", ""),
 ('qa-backlink-not-defined', R, "        if (Array.isArray(sourced.content)) Object.defineProperty(sourced.content, 'node', { value: sourced });\n", ""),
 ('qa-source-stamp-dropped', R, "const sourced: { content?: unknown, source: string } = { ...node, source: capture[0] };", "const sourced: { content?: unknown, source: string } = { ...node, source: undefined as unknown as string };"),
]
def blob(path):
    return subprocess.run(['git','-C','/usr/local/bin/hooks/website','show','2e6127e:'+path],capture_output=True,text=True,check=True).stdout
src = {D: blob(D), R: blob(R)}
out = json.load(open(V+'/mutants-gen.json'))
for m in out: m['origin'] = 'mutant-gen'
for mid, f, old, new in QA:
    n = src[f].count(old)
    if n != 1: sys.exit(f'{mid}: old occurs {n} times')
    out.append({'id': mid, 'file': f, 'old': old, 'new': new, 'origin': 'qa'})
json.dump(out, open(V+'/mutants-qa-2e6127e.json','w'), indent=1)
print(len(out), 'mutants;', len(QA), 'qa-added')
