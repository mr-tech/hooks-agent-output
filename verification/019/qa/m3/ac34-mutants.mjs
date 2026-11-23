// AC-3.4 product-function mutants (QA Phase 2 on M3, website 2c1590f).
// Writes ac34-mutants.json beside this file after checking each `old` occurs exactly once in its file at the SHA.
// Scope: the four functions AC-3.3's properties drive (getInitialValue, flattenNodeText, withNormalizeNode,
// SlateEditor's onPaste). Suite per mutant: the six AC-3.3 property files only, so a kill is AC-3.3's.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SHA = '2c1590f';
const REPO = '/usr/local/bin/hooks/website';
const U = 'src/components/SlateEditor/utils/';
const FL = `${U}flattenNodeText.ts`;
const GI = `${U}getInitialValue.ts`;
const WN = `${U}withNormalizeNode.ts`;
const IX = 'src/components/SlateEditor/index.tsx';

const m = (id, file, old, neu, limb) => ({ id, file, old, new: neu, limb });
const MUTANTS = [
  m('F1', FL, "if (node.type === 'blockQuote') return `${node.quotePrefix ?? '> '}${text}`;", 'if (node.type === \'blockQuote\') return text;', 'save drops the quote prefix'),
  m('F2', FL, ".map((n) => flattenText(n, allowEmoji)).join('\\n')", ".map((n) => flattenText(n, allowEmoji)).join('')", 'save joins lines with no newline'),
  m('F3', FL, "`${node.quotePrefix ?? '> '}${text}`", "`> ${text}`", 'save writes the default prefix for every quote'),
  m('F4', FL, "return allowEmoji ? node.ast.content : '';", "return '';", 'save drops an emoji (held-out class expected to survive)'),
  m('G1', GI, '!inMultilineBlockQuote && /^ *>>> /.test(text);', '!inMultilineBlockQuote && /^>>> /.test(text);', 'load misses an indented >>>'),
  m('G2', GI, "text = text.replace(/^ *> /, '');", "text = text.replace(/^> /, '');", 'load keeps an indented quote marker in the text'),
  m('G3', GI, 'inMultilineBlockQuote = inMultilineBlockQuote || multilineStart;', 'inMultilineBlockQuote = multilineStart;', 'load ends a >>> quote after one line'),
  m('G4', GI, 'quotePrefix: line.slice(0, line.length - text.length) }', "quotePrefix: '> ' }", 'load records the default prefix'),
  m('G5', GI, 'if (!partialMarkdown) fence = afterLine(fence, line);', 'fence = afterLine(fence, line);', 'load tracks fences in partial mode'),
  m('G6', GI, 'const multilineStart: boolean = !partialMarkdown && !isCodeBlock', 'const multilineStart: boolean = !isCodeBlock', 'load reads >>> in partial mode'),
  m('G7', GI, 'empty: !text.length,', 'empty: false,', 'load marks no line empty'),
  m('G8', GI, 'const isBlockQuote = !partialMarkdown && !isCodeBlock && (', 'const isBlockQuote = !partialMarkdown && (', 'load reads a quote inside a fence'),
  m('W1', WN, '|| (child.startCodeBlock !== fence.inCodeBlock)', '|| false', 'normalise misses a moved fence'),
  m('W2', WN, "|| (isBlockQuote && child.type !== 'blockQuote')", '|| false', 'normalise misses a new quote'),
  m('W3', WN, "|| (!isBlockQuote && child.type === 'blockQuote')", '|| false', 'normalise misses a removed quote'),
  m('W4', WN, 'const content = childText.slice(quotePrefix.length);', 'const content = childText;', 'normalise keeps the marker in a new quote'),
  m('W5', WN, 'quotePrefix: isBlockQuote ? quotePrefix : undefined,', "quotePrefix: isBlockQuote ? '> ' : undefined,", 'normalise records the default prefix'),
  m('W6', WN, 'inMultilineBlockQuote = inMultilineBlockQuote || (!isFullCodeBlock', 'inMultilineBlockQuote = (!isFullCodeBlock', 'normalise ends a >>> quote after one line'),
  m('W7', WN, 'if (!nodeText && !node.empty) {', 'if (!nodeText) {', 'normalise re-marks an empty line every pass'),
  m('W8', WN, "if (lastChild?.type === 'span' && node.children.length > 1 && !lastChild.text", "if (false && lastChild?.type === 'span' && node.children.length > 1 && !lastChild.text", 'normalise keeps a trailing empty span (emoji layouts)'),
  m('W9', WN, 'Transforms.insertText(editor, apostrophe ? "\'" : \'"\', {', 'Transforms.insertText(editor, apostrophe ? \'"\' : "\'", {', 'smart-quote repair swaps the two'),
  m('W10', WN, 'fence = afterLine(fence, childText);', 'fence = NO_FENCE;', 'normalise never enters a fence'),
  m('W11', WN, "quotePrefix: quotePrefix.replace(/^ *>>> /, '')", 'quotePrefix', 'a split >>> line carries >>> to the new line'),
  m('W12', WN, 'if (!partialMarkdown) return handleEditor(editor, false);', 'return handleEditor(editor, false);', 'partial mode runs block normalisation'),
  m('P1', IX, "if (partialMarkdown && pastedText.includes('\\n')) {", 'if (false) {', 'partial mode accepts a multi-line paste'),
  m('P2', IX, '} else if (pastedText.length > MAX_PASTE_LENGTH) {', '} else if (false) {', 'an over-long paste is accepted'),
  m('P3', IX, "toast.error('This field does not support multiple lines.');\n              e.preventDefault();", "toast.error('This field does not support multiple lines.');", 'the multi-line refusal warns but inserts'),
  m('P4', IX, 'pastedText.length > MAX_PASTE_LENGTH', 'pastedText.length >= MAX_PASTE_LENGTH', 'a paste of exactly the limit is refused'),
  m('P5', IX, 'pastedText.length > MAX_PASTE_LENGTH', 'pastedText.length > MAX_PASTE_LENGTH + 1', 'a paste one over the limit is accepted'),
];

const out = [];
const problems = [];
for (const x of MUTANTS) {
  const text = execFileSync('git', ['-C', REPO, 'show', `${SHA}:${x.file}`], { encoding: 'utf8' });
  const n = text.split(x.old).length - 1;
  if (n !== 1) problems.push(`${x.id}: old occurs ${n} times in ${x.file}`);
  out.push(x);
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
const here = dirname(fileURLToPath(import.meta.url));
writeFileSync(join(here, 'ac34-mutants.json'), `${JSON.stringify(out, null, 2)}\n`);
console.log(`${out.length} mutants, each old text once at ${SHA}`);
