/**
 * QA — the delimiter-collision class, swept on its own predicate rather than on the instance
 * that revealed it. Built 2026-08-25 at `2d90e8a` for the MEDIUM-1 rider.
 *
 * WHY. Code review round 23's MEDIUM-1 defines the class correctly — *"any formatter that recovers
 * structure by string-splitting output it could have configured"* — but its Location cell names one
 * file, `formatMutationError.ts`, and its enumeration counts the SCHEMAS that can emit `' | '`
 * (6 union/enum sites), not the SITES that split on it. Those are different predicates and they
 * return different sets. qa.md: *derive the sweep predicate from the class's definition, never from
 * the phrasing of the instances that revealed it.*
 *
 * THE SWEEP PREDICATE: `git grep -n "split(' | ')" 2d90e8a -- src` -> **3 sites**, all three also
 * matching `generateErrorMessage(...)`. What it does NOT match, stated when it was authored:
 * a split on a differently-spelled delimiter (`'|'`, `' |'`, a variable); a structure round-trip
 * through `join`/`match`/a regex rather than `split`; any site outside `src`; and any site added
 * after `2d90e8a`. The known instance (`formatMutationError.ts:25`) IS among the matches, which is
 * the check that the predicate is not fitted to the other two.
 *
 * WHAT THIS ESTABLISHES, and it is a two-sided result:
 *   1. the class has THREE members, not one — the two JSON surfaces carry the identical expression;
 *   2. at `2d90e8a` the collision is NOT reachable through those two, and the reason is a
 *      COINCIDENCE OF TWO SETS that nothing enforces (section B). A fix applied only to
 *      `formatMutationError.ts` leaves two members standing behind an unguarded coupling.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { generateErrorMessage } from 'zod-error';

import {
  SUPPORTED_CONTAINER_CHILD_TYPES, SUPPORTED_TOP_LEVEL_TYPES,
  containerChildShape, discordMessageImportShape, topLevelComponentShape,
} from '~/server/api/utils/shapes';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

const OUT = process.env.QA_DELIM_REPORT ?? '/tmp/qa013-delim-report.txt';
const lines: string[] = [];
const put = (s: string) => { lines.push(s); };

const SITES = [
  ['NewMessageJsonInput.tsx', '../../app/message/_components/NewMessageJsonInput.tsx'],
  ['JsonModalBody.tsx', '../../app/message/m/[id]/_components/JsonModalBody.tsx'],
  ['formatMutationError.ts', '../formatMutationError.ts'],
] as const;

// ---------------------------------------------------------------------------------------------
// A. The class has three members. Enumerated on the class's predicate, not on the instance.
// ---------------------------------------------------------------------------------------------
describe('A — every site that reconstructs line structure by splitting on the delimiter', () => {
  it('finds all three, and the known instance is among them', () => {
    put("## A — sites matching \"splits on ' | ' to rebuild line structure\", in src at 2d90e8a");
    const found: string[] = [];
    for (const [name, rel] of SITES) {
      const src = readFileSync(resolve(__dirname, rel), 'utf8');
      const has = src.includes("split(' | ')");
      put(`  ${name}: splitsOnDelimiter=${has} usesGenerateErrorMessage=${src.includes('generateErrorMessage(')}`);
      if (has) found.push(name);
    }
    put(`  MEMBERS=${found.length} -> ${found.join(', ')}`);
    // The instance the reviewer named must be inside the predicate's matches, or the predicate is
    // fitted to the other two rather than derived from the class.
    expect(found).toContain('formatMutationError.ts');
    expect(found).toHaveLength(3);
  });
});

// ---------------------------------------------------------------------------------------------
// B. Why the two JSON surfaces are not currently reachable — and why that is luck, not design.
// ---------------------------------------------------------------------------------------------
describe('B — the coincidence that protects the two client sites', () => {
  it('the lenient filter accepts exactly the types the discriminated unions declare', () => {
    put('');
    put('## B — is the collision reachable through the CLIENT (lenient) import shape?');
    const unionTypes = (shape: z.ZodDiscriminatedUnion<'type', never>) => new Set(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (shape as any).options.map((o: any) => o.shape.type.value as number),
    );
    const topUnion = unionTypes(topLevelComponentShape as never);
    const childUnion = unionTypes(containerChildShape as never);
    const sorted = (s: Set<number>) => [...s].sort((a, b) => a - b).join(',');

    put(`  SUPPORTED_TOP_LEVEL_TYPES      = {${sorted(SUPPORTED_TOP_LEVEL_TYPES)}}`);
    put(`  topLevelComponentShape members = {${sorted(topUnion)}}`);
    put(`  SUPPORTED_CONTAINER_CHILD_TYPES= {${sorted(SUPPORTED_CONTAINER_CHILD_TYPES)}}`);
    put(`  containerChildShape members    = {${sorted(childUnion)}}`);

    // THIS is the load-bearing fact. The preprocess filter drops every type the union would have
    // rejected, so `invalid_discriminator` — the one reachable message that CONTAINS ' | ' —
    // cannot be produced through the import shape. Nothing declares or enforces this coupling.
    expect(sorted(topUnion)).toBe(sorted(SUPPORTED_TOP_LEVEL_TYPES));
    expect(sorted(childUnion)).toBe(sorted(SUPPORTED_CONTAINER_CHILD_TYPES));
    put('  => the filter set EQUALS the union set at both levels, so invalid_discriminator is');
    put('     unreachable through discordMessageImportShape. NOTHING ENFORCES THIS EQUALITY.');
  });

  it('CONTROL — the same payload IS a collision against the strict shape, proving the message exists', () => {
    // The reviewer's payload, against the union directly rather than behind the filter.
    let msg = '';
    try {
      containerChildShape.parse({ type: 99 });
    } catch (e) {
      msg = generateErrorMessage((e as z.ZodError).issues);
    }
    put('');
    put(`  CONTROL containerChildShape.parse({type:99}) -> ${JSON.stringify(msg)}`);
    const rendered = msg.split(' | ').join('\n');
    put(`  CONTROL one issue renders as ${rendered.split('\n').length} lines after the split`);
    expect(msg).toContain(' | ');
    expect(rendered.split('\n').length).toBeGreaterThan(1);
  });
});

// ---------------------------------------------------------------------------------------------
// C. Empirical corroboration: a payload sweep through the real client import shape.
//    Corroboration only — section B is the argument. Ten hand-built payloads cannot prove
//    unreachability and are not offered as proof.
// ---------------------------------------------------------------------------------------------
describe('C — payload sweep through the real client import shape', () => {
  it('reports every case that renders more lines than it has issues', () => {
    put('');
    put('## C — payload sweep (corroboration only; section B is the argument)');
    const CASES: [string, unknown][] = [
      ['section with a bad accessory, inside a container', { components: [{ type: 17, components: [{ type: 9, components: [{ type: 10, content: 'a' }], accessory: { type: 42 } }] }] }],
      ['top-level section, bad accessory', { components: [{ type: 9, components: [{ type: 10, content: 'a' }], accessory: { type: 42 } }] }],
      ['action row with a non-link button', { components: [{ type: 1, components: [{ type: 2, style: 1, custom_id: 'x', label: 'y' }] }] }],
      ['unsupported child type 99 in a container', { components: [{ type: 17, components: [{ type: 99 }] }] }],
      ['unsupported top-level type 99', { components: [{ type: 99 }] }],
      ['file child malformed', { components: [{ type: 17, components: [{ type: 13, file: 5 }] }] }],
      ['media gallery item malformed', { components: [{ type: 17, components: [{ type: 12, items: [{ media: 7 }] }] }] }],
      ['text display content wrong type', { components: [{ type: 17, components: [{ type: 10, content: 123 }] }] }],
      ['separator malformed (two genuine issues)', { components: [{ type: 14, spacing: 'big' }] }],
      ['components is a string', { components: 'nope' }],
      ['embeds malformed', { embeds: [{ color: 'red' }] }],
      ['content wrong type', { content: 12 }],
      ['allowed_mentions.parse bad enum', { content: 'hi', allowed_mentions: { parse: ['nobody'] } }],
    ];
    let overRendered = 0;
    for (const [name, payload] of CASES) {
      try {
        discordMessageImportShape.parse(payload);
        put(`  ACCEPTED  ${name}`);
        continue;
      } catch (e) {
        if (!(e instanceof z.ZodError)) { put(`  NON-ZOD   ${name}`); continue; }
        const raw = generateErrorMessage(e.issues);
        const shown = raw.split(' | ').join('\n').split('\n').length;
        const over = shown > e.issues.length;
        if (over) overRendered += 1;
        put(`  ${over ? 'OVER-RENDERS' : 'faithful    '}  ${name}  issues=${e.issues.length} linesShown=${shown}`);
        if (over) put(`      raw=${JSON.stringify(raw)}`);
      }
    }
    put(`  OVER-RENDERING CASES: ${overRendered}/${CASES.length}`);
    put('  PREDICATE: "a single Zod issue rendered as more than one visible line". EXCLUDES any');
    put('  payload shape not in this list; 13 hand-built cases are corroboration, not a proof of');
    put('  unreachability. Section B is what carries that claim.');
    writeFileSync(OUT, `${lines.join('\n')}\n`);
    expect(overRendered).toBe(0);
  });
});
