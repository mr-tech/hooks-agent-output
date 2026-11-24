import subprocess, sys, shutil, os, json
# usage: m6-driver-mut.py SHA EXPORT_DIR [mutant-name ...]
SHA, EXP = sys.argv[1], sys.argv[2].rstrip('/') + '/'
only = sys.argv[3:]
V = '/usr/local/bin/hooks/agent-output/verification/019/impl/'
S = 'src/components/SlateEditor/'
W = S + 'utils/withNormalizeNode.ts'
EL = S + 'utils/emojiLift.ts'
CARRY = [S + 'utils/__tests__/withNormalizeNode.quote-continues-on-enter.test.tsx', S + '__tests__/SlateEditor.typed-text-reaches-the-message.test.tsx', S + '__tests__/SlateEditor.pasted-text-reaches-the-message.test.tsx', S + '__tests__/SlateEditor.typed-block-text-reaches-the-message.test.tsx']
EMO = [S + 'utils/__tests__/withNormalizeNode.emoji-keeps-line-text.test.tsx', S + 'utils/__tests__/withNormalizeNode.emoji-set-equals-the-engines.test.tsx', S + 'utils/__tests__/getInitialValue.stored-text-loads-unchanged.test.ts', S + 'utils/__tests__/getInitialValue.emoji-spans-equal-the-engines.test.ts', S + 'utils/__tests__/emojiLift.layout.test.ts', S + '__tests__/SlateEditor.emoji-forms-reach-the-message.test.tsx', S + 'utils/__tests__/onCopy.cut.test.tsx']
SETTLE = [S + 'utils/__tests__/withNormalizeNode.quote-and-fence-lines-settle.test.tsx']
ORACLE = ['src/utils/markdown/__tests__/discordOracle.emoji-spans.test.ts']
ORACLE_D = ['src/utils/markdown/__tests__/discord/discordEmojiSpans.frozen-literals.test.ts']
HELPER = 'src/utils/markdown/__tests__/helpers/discordOracle.ts'
M = [
 ('carry-never-fires', W, [("    if (!carries) return;", "    return;")], CARRY[:1], 'node'),
 ('NM-68-carry-ignores-multiline-quote', W, [("text.startsWith(QUOTE_MARKER) && !inMultilineBlockQuote && (", "text.startsWith(QUOTE_MARKER) && (")], CARRY[:1], 'node'),
 ('NM-69-carry-ignores-unquoted-fence', W, [("text.startsWith(QUOTE_MARKER) && !inMultilineBlockQuote && (!insideFence || fenceQuoted);", "text.startsWith(QUOTE_MARKER) && !inMultilineBlockQuote;")], CARRY[:1], 'node'),
 ('carry-on-paste', W, [("quotePrefix: '', carried: undefined", "quotePrefix: quotePrefix.replace(/^ *>>> /, '')")], CARRY[2:3], 'node'),
 ('typed-marker-not-taken-in', W, [("if (markerKept && content.startsWith(QUOTE_MARKER)) {", "if (false && markerKept && content.startsWith(QUOTE_MARKER)) {")], CARRY[:2], 'node'),
 ('NM-19-quote-marker-dropped-when-line-becomes-code', W, [("if (child.type === 'blockQuote' && child.quotePrefix) {", "if (false && child.type === 'blockQuote' && child.quotePrefix) {")], SETTLE, 'node'),
 ('NM-17-save-writes-alt-for-an-element', S + 'utils/flattenNodeText.ts', [("allowEmoji ? node.source : ''", "allowEmoji ? node.alt : ''")], EMO, 'node'),
 ('load-lifts-nothing', S + 'utils/getInitialValue.ts', [("return liftLoaded(lines, surface);", "return lines;")], EMO, 'node'),
 ('no-redeciding-on-edit', W, [("if (reverted !== -1) {", "if (false && reverted !== -1) {")], EMO, 'node'),
 ('no-lift-on-edit', W, [("    if (span) {\n      Transforms.insertNodes(editor, [emojiElementOf(span)]", "    if (false && span) {\n      Transforms.insertNodes(editor, [emojiElementOf(span)]")], EMO, 'node'),
 ('code-line-keeps-elements', W, [("  if (line.type === 'codeBlock') {\n    const at = line.children.findIndex(isEmojiElement);", "  if (false && line.type === 'codeBlock') {\n    const at = line.children.findIndex(isEmojiElement);")], EMO, 'node'),
 ('unit-never-written-with-sources', S + 'utils/runUnit.ts', [("emojiAs === 'source' && isEmojiElement(child) ? child.source : '?'", "'?'")], EMO, 'node'),
 ('span-need-not-end-in-line', EL, [("emoji.start >= from && emoji.end <= from + width", "emoji.start >= from")], EMO, 'node'),
 ('helper-ignores-its-mask-NM-44', HELPER, [("parseLossless(text, SURFACE_MASK_LITERALS[surface])", "parseLossless(text, SURFACE_MASK_LITERALS.content)")], ORACLE, 'node'),
 ('helper-first-occurrence-join', HELPER, [("function collectEmojiSpans(node: Lossless, out: EmojiSpanRange[]) {\n  if (node.kind.type === 'emoji') out.push([node.span.start, node.span.end]);", "function collectEmojiSpans(node: Lossless, out: EmojiSpanRange[], text = '') {\n  if (node.kind.type === 'emoji') { const source = text.slice(node.span.start, node.span.end); const first = text.indexOf(source); out.push([first, first + source.length]); }"), ("if (child.type === 'node') collectEmojiSpans(child, out);", "if (child.type === 'node') collectEmojiSpans(child, out, text);"), ("collectEmojiSpans(parseLossless(text, SURFACE_MASK_LITERALS[surface]), out);", "collectEmojiSpans(parseLossless(text, SURFACE_MASK_LITERALS[surface]), out, text);")], ORACLE, 'node'),
 ('helper-offsets-in-unescaped-text', HELPER, [("  return out;\n}\n", "  const bare = (offset: number) => offset - (text.slice(0, offset).match(/\\\\/g) ?? []).length;\n  return out.map(([start, end]) => [bare(start), bare(end)] as EmojiSpanRange);\n}\n")], ORACLE, 'node'),
 ('helper-keeps-spans-inside-code', HELPER, [("function collectEmojiSpans(node: Lossless, out: EmojiSpanRange[]) {", "function collectEmojiSpans(node: Lossless, out: EmojiSpanRange[]) {\n  if (node.kind.type === 'code' || node.kind.type === 'code_block') { out.push([node.span.start, node.span.end]); return; }")], ORACLE, 'node'),
]
shutil.rmtree(EXP, ignore_errors=True)
os.makedirs(EXP)
subprocess.run('git -C /usr/local/bin/hooks/website archive %s | tar -x -C %s' % (SHA, EXP), shell=True, check=True)
os.symlink('/usr/local/bin/hooks/website/node_modules', EXP + 'node_modules')
for name, f, edits, tests, proj in M:
    if only and name not in only: continue
    orig = open(EXP + f).read()
    s = orig
    for a, b in edits:
        assert s.count(a) == 1, (name, a[:60], s.count(a))
        s = s.replace(a, b, 1)
    open(EXP + f, 'w').write(s)
    out = V + 'm6-mut-%s-%s.txt' % (SHA[:7], name)
    with open(out, 'w') as fh:
        fh.write('export: %s\nmutant: %s in %s\n' % (EXP, name, f))
        r = subprocess.run(['timeout', '600', 'unshare', '-rn', 'npx', 'vitest', 'run'] + tests, cwd=EXP, stdout=fh, stderr=subprocess.STDOUT, start_new_session=True)
        fh.write('exit %d\n' % r.returncode)
    open(EXP + f, 'w').write(orig)
    print(name, 'KILLED' if r.returncode else 'SURVIVED', flush=True)
