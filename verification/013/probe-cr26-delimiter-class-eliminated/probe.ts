/**
 * probe-cr26 — is the delimiter-collision class ELIMINATED at e1d9b2b, or merely UNHIT?
 *
 * NOT a re-run of probe-cr25. cr25's validity is indexed to the claim it was built for
 * (does the OLD single-site formatter preserve the path, and does it split?). The question
 * has changed — new shared function, new call shape — so the instrument is rebuilt.
 *
 * CLAIM UNDER TEST: `formatZodIssues` renders EXACTLY ONE LINE PER ISSUE regardless of what
 * any individual issue's message contains, and still preserves the PATH (D32's no-hiding
 * constraint, which the fix must not have regressed).
 *
 * ORACLE, stated before running:
 *   (1) N issues in  => EXACTLY N lines out, for every payload below.
 *   (2) The owner's original payload still renders its path with indices.
 *   (3) The discriminator payload that produced SIX lines at 2d90e8a now produces ONE.
 *   (4) CONTROLS: non-JSON and JSON-but-not-issues still pass through byte-identical.
 *   (5) ADVERSARIAL: the fix replaced a ' | ' joiner with a '\n' joiner. If an issue's own
 *       message contains '\n', the one-line-per-issue invariant breaks the SAME WAY.
 *       Tested explicitly — a fix that relocates a class has not eliminated it.
 *
 * Modules are imported FROM THE TREE. No embedded copy (probe-cr1/probe-cr10 fossil class).
 */
import formatMutationError, { formatZodIssues } from '../../../../website/src/utils/formatMutationError';

let failures = 0;
function check(label: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failures += 1;
  console.log(`  [${ok ? 'PASS' : 'FAIL'}] ${label}  got=${JSON.stringify(got)} want=${JSON.stringify(want)}`);
}

const ownerIssue: any = {
  code: 'too_small', minimum: 1, type: 'string', inclusive: true, exact: false,
  message: 'String must contain at least 1 character(s)',
  path: ['message', 'data', 'components', 0, 'components', 0, 'content'],
};
const enumIssue: any = {
  code: 'invalid_enum_value', options: ['classic', 'visual'], received: 'nope',
  path: ['message', 'data', 'mode'],
  message: "Invalid enum value. Expected 'classic' | 'visual', received 'nope'",
};
const newlineIssue: any = {
  code: 'custom', path: ['message', 'data', 'content'],
  message: 'Line one.\nLine two.',
};

console.log('--- (1)+(3) one line per issue, incl. the payload that broke at 2d90e8a ---');
check('1 owner issue -> 1 line', formatZodIssues([ownerIssue]).split('\n').length, 1);
check('1 enum issue (message HAS " | ") -> 1 line', formatZodIssues([enumIssue]).split('\n').length, 1);
check('2 issues -> 2 lines', formatZodIssues([ownerIssue, enumIssue]).split('\n').length, 2);
check('3 issues -> 3 lines', formatZodIssues([ownerIssue, enumIssue, ownerIssue]).split('\n').length, 3);

console.log('--- (2) D32 no-hiding: path with indices survives the rewrite ---');
const ownerOut = formatZodIssues([ownerIssue]);
console.log(`  rendered: ${JSON.stringify(ownerOut)}`);
check('path leaf "content" present', ownerOut.includes('content'), true);
check('numeric indices present', /\[\d+\]/.test(ownerOut), true);

console.log('--- (4) controls ---');
check('non-JSON passthrough', formatMutationError({ message: 'UNAUTHORIZED' } as any), 'UNAUTHORIZED');
check('JSON-not-issues passthrough', formatMutationError({ message: '{"foo":1}' } as any), '{"foo":1}');
check('null -> undefined', formatMutationError(null), undefined);

console.log('--- (5) ADVERSARIAL: did the fix ELIMINATE the class or RELOCATE it to "\\n"? ---');
const nlOut = formatZodIssues([newlineIssue]);
const nlLines = nlOut.split('\n').length;
console.log(`  1 issue whose message contains a newline -> ${nlLines} line(s)`);
console.log(`  rendered: ${JSON.stringify(nlOut)}`);
console.log(`  ${nlLines === 1 ? 'ELIMINATED (message newline does not split)' : 'RELOCATED: invariant still breakable, now via \\n'}`);
