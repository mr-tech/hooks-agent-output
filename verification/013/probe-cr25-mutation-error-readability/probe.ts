/**
 * probe-cr25 — Does D32's readable-error rendering PRESERVE THE PATH?
 *
 * CLAIM UNDER TEST (code review round 23, tree 2d90e8a):
 *   D32 requires server validation errors to render as readable text. The register row records a
 *   constraint that is STEERING'S INFERENCE, not an owner ruling: the readable form "must not hide
 *   what actually failed". The owner's complaint was a raw Zod issue array whose `path` told him
 *   WHICH component failed. If the readable form drops the path, the fix trades one defect for
 *   another.
 *
 * PROCESS WHOSE OUTPUT IS THE EVIDENCE:
 *   The real shipped module `src/utils/formatMutationError.ts`, LOADED FROM THE TREE — not a
 *   reimplementation. An embedded copy is a fossil (probe-cr1 / probe-cr10, twice in this chain).
 *
 * ORACLE, stated before running:
 *   For the owner's own reported payload, the returned string MUST contain a locator identifying
 *   the failing component — at minimum the leaf key `content` and the numeric indices that
 *   distinguish one component from its siblings. Absence of the indices = the path was flattened;
 *   absence of `content` = the path was dropped entirely.
 *
 * POSITIVE CONTROL: a non-JSON message must pass through byte-identical (proves the probe is
 * exercising the branch logic, not always printing the same thing).
 *
 * RUN: npx ts-node -r tsconfig-paths/register \
 *        ../agent-output/verification/013/probe-cr25-mutation-error-readability/probe.ts
 */
import formatMutationError from '../../../../website/src/utils/formatMutationError';

// The owner's ACTUAL reported payload shape (D32 evidence row): a too_small on a nested content.
const ownerIssue = [{
  code: 'too_small',
  minimum: 1,
  type: 'string',
  inclusive: true,
  exact: false,
  message: 'String must contain at least 1 character(s)',
  path: ['message', 'data', 'components', 0, 'components', 0, 'content'],
}];

// A two-issue payload: does the newline join survive, and are BOTH locators kept?
const twoIssues = [
  ownerIssue[0],
  {
    code: 'too_small', minimum: 1, type: 'array', inclusive: true, exact: false,
    message: 'Array must contain at least 1 element(s)',
    path: ['message', 'data', 'components', 1, 'components'],
  },
];

function report(label: string, input: unknown) {
  const out = formatMutationError({ message: JSON.stringify(input) } as any);
  console.log(`\n--- ${label} ---`);
  console.log(JSON.stringify(out));
  const s = String(out ?? '');
  console.log(`  contains leaf key "content": ${s.includes('content')}`);
  console.log(`  contains any numeric index : ${/\d/.test(s)}`);
  console.log(`  contains "components"      : ${s.includes('components')}`);
}

report('OWNER PAYLOAD (single nested too_small)', ownerIssue);
report('TWO ISSUES (join + both locators)', twoIssues);

// POSITIVE CONTROL — non-JSON passes through untouched.
const plain = formatMutationError({ message: 'UNAUTHORIZED' } as any);
console.log(`\n--- CONTROL: non-JSON passthrough ---`);
console.log(JSON.stringify(plain), ' identical:', plain === 'UNAUTHORIZED');

// CONTROL 2 — JSON that is NOT zod issues passes through as the original message.
const notIssues = formatMutationError({ message: '{"foo":1}' } as any);
console.log(`--- CONTROL: JSON-but-not-issues passthrough ---`);
console.log(JSON.stringify(notIssues), ' identical:', notIssues === '{"foo":1}');

// ---------------------------------------------------------------------------
// ADVERSARIAL: the ' | ' split. zod-error joins SEPARATE issues with ' | ', and
// formatMutationError reconstructs line structure by splitting on that literal.
// Zod's OWN invalid_enum_value message embeds ' | ' between the allowed options.
// If that is reachable, ONE issue renders as MULTIPLE bogus lines.
// ---------------------------------------------------------------------------
const enumIssue = [{
  code: 'invalid_enum_value',
  options: ['classic', 'visual'],
  received: 'nope',
  path: ['message', 'data', 'mode'],
  message: "Invalid enum value. Expected 'classic' | 'visual', received 'nope'",
}];
const enumOut = String(formatMutationError({ message: JSON.stringify(enumIssue) } as any) ?? '');
console.log(`\n--- ADVERSARIAL: single enum issue, message contains ' | ' ---`);
console.log(JSON.stringify(enumOut));
const lines = enumOut.split('\n');
console.log(`  ONE issue in  -> ${lines.length} line(s) out  ${lines.length === 1 ? 'OK' : 'SPLIT CORRUPTION'}`);
lines.forEach((l, i) => console.log(`    line ${i}: ${JSON.stringify(l)}`));

// ---------------------------------------------------------------------------
// REACHABILITY: not a hand-built issue — drive the REAL shipped shape with a
// caller-sendable payload, then hand its REAL issues to the REAL formatter.
// containerChildShape is a z.discriminatedUnion; Zod's discriminator message is
// "Invalid discriminator value. Expected 1 | 9 | 10 | ..." — it embeds ' | '.
// ---------------------------------------------------------------------------
/* eslint-disable import/first */
import { discordMessageShape } from '../../../../website/src/server/api/utils/shapes';

const badChild = { components: [{ type: 17, components: [{ type: 99 }] }] };
const parsed = discordMessageShape.safeParse(badChild as any);
console.log(`\n--- REACHABILITY: real shape, caller-sendable payload ---`);
console.log(`  parse success: ${parsed.success}`);
if (!parsed.success) {
  const realIssues = parsed.error.issues;
  console.log(`  real issue count: ${realIssues.length}`);
  console.log(`  raw messages: ${JSON.stringify(realIssues.map((i) => i.message))}`);
  const rendered = String(formatMutationError({ message: JSON.stringify(realIssues) } as any) ?? '');
  const outLines = rendered.split('\n');
  console.log(`  RENDERED TO USER (${outLines.length} line(s) for ${realIssues.length} issue(s)):`);
  outLines.forEach((l, i) => console.log(`    line ${i}: ${JSON.stringify(l)}`));
  console.log(`  VERDICT: ${outLines.length > realIssues.length ? 'SPLIT CORRUPTION REACHABLE' : 'clean'}`);
}
