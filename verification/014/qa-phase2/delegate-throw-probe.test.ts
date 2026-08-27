// QA PHASE 2 PROBE - temporary, removed after capture. Not a spec.
// Question: does `validateMessage` THROW on the three payloads that
// `messageValidity.predicate.test.ts` asserts "computes false rather than
// throwing out"? Only a throwing input makes `isMessageValid`'s catch clause
// the sole carrier of the decision. If the delegate merely returns a non-empty
// string, those cases are ordinary delegated cases and carve-out limb (i) is
// not satisfied by them.
import { writeFileSync } from 'fs';
import { describe, it, expect } from 'vitest';
import { validateMessage } from '~/utils/limits';
import { isMessageValid } from '~/server/api/utils/messageValidity';
import { data } from '~/utils/__tests__/helpers/messageData';

const CASES: [string, unknown][] = [
  ['embeds: {}', data({ embeds: {} })],
  ['content: 5', data({ content: 5 })],
  ['components: null', data({ components: null })],
  ['CONTROL valid: content Hi', data({ content: 'Hi' })],
  ['CONTROL invalid: empty', data({})],
];

describe('probe', () => {
  it('reports delegate behaviour per payload', () => {
    const out: string[] = [];
    for (const [label, payload] of CASES) {
      let delegate: string;
      try {
        const r = validateMessage(payload as never);
        delegate = `RETURNED ${JSON.stringify(r)}`;
      } catch (e) {
        delegate = `THREW ${(e as Error).constructor.name}: ${(e as Error).message}`;
      }
      let pred: string;
      try {
        pred = `RETURNED ${String(isMessageValid(payload as never))}`;
      } catch (e) {
        pred = `THREW ${(e as Error).message}`;
      }
      out.push(`${label} | delegate=${delegate} | isMessageValid=${pred}`);
    }
    writeFileSync('/tmp/qa14-probe-result.txt', out.join('\n'));
    expect(out.length).toBe(CASES.length);
  });
});
