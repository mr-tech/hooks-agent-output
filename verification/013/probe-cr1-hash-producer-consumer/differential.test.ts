/**
 * Probe CR1 — does `hashMessage`'s PRODUCER compute the same function, over the same
 * form, as its CONSUMER?  (plan 013, M1-d, final clause.)
 *
 * Producer  = `upsertMessage`'s Pusher trigger, `src/server/api/utils/shared.ts`:
 *             `hashMessage(message)` where `message` is the tRPC input AFTER
 *             `optionalIdMessageShape` has parsed it — which is byte-for-byte what is
 *             written to `Messages.data`.
 * Consumer  = `usePusher`, `src/providers/MessageProvider/usePusher.ts`:
 *             `hashMessage(stripKeys(messageRef.current))` over the composer's live state.
 *
 * The process whose output is the evidence is the PRODUCT's own round trip, not a model of
 * it: every step below is the shipped function, imported from the tree under test.  The
 * probe asserts nothing about `canonicalize`; it asserts the two live call sites agree.
 *
 * Two live sequences are exercised:
 *   SEQ-A  steady state — the composer holds exactly what the server stored
 *          (`makeEditable(stored)`), nobody has typed anything, another tab saves.
 *          A mismatch here is a false "Message Update Detected" on an in-sync tab.
 *   SEQ-B  the saving tab — the user's own pre-save draft is still in `messageRef`
 *          when the broadcast for their own save arrives.
 *          A mismatch here is a false "…Any changes you have made will be lost" prompt
 *          fired at the user by their own save.
 *
 * POSITIVE CONTROL: `control` cases must MISMATCH.  A probe that reports "all equal"
 * without them cannot distinguish a clean tree from a probe that imports nothing.
 *
 * Run:  npx vitest run --config <this dir>/vitest.config.ts
 *       PROBE_SRC=/path/to/tree/src selects the tree under test.
 */
import { writeFileSync } from 'node:fs';

import { describe, it, expect, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({
  env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test', NEXT_PUBLIC_PUSHER_KEY: 'k', NEXT_PUBLIC_PUSHER_CLUSTER: 'c' },
}));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { hashMessage, stripKeys, makeEditable } from '~/utils';
import { optionalIdMessageShape } from '~/server/api/utils/shapes';
// Namespace import, not a named one: `normalizeForHash` does not exist on the pre-fix
// trees, and a missing NAMED export is a link-time error while a missing namespace
// member is just `undefined`.  This keeps one instrument runnable against every tree.
import * as usePusherModule from '~/providers/MessageProvider/usePusher';

const V2 = 32768;

/** A stored `data` value, plus the draft a user might be holding for it. */
type Case = { id: string; control?: true; stored: Record<string, unknown>; draft?: Record<string, unknown> };

const CASES: Case[] = [
  { id: 'A1 classic content only', stored: { content: 'hello' } },
  { id: 'A2 classic + username + avatar', stored: { content: 'hello', username: 'Bot', avatar_url: 'https://example.com/a.png' } },
  { id: 'A3 classic + embed', stored: { content: 'hi', embeds: [{ title: 'T', description: 'D', fields: [{ name: 'n', value: 'v' }] }] } },
  { id: 'A4 V2 container + text display, flag set', stored: { flags: V2, components: [{ type: 17, components: [{ type: 10, content: 'body' }] }] } },
  { id: 'A5 V2 section + link-button accessory', stored: { flags: V2, components: [{ type: 9, components: [{ type: 10, content: 'x' }], accessory: { type: 2, style: 5, label: 'Go', url: 'https://example.com/' } }] } },
  { id: 'A6 V2 media gallery', stored: { flags: V2, components: [{ type: 12, items: [{ media: { url: 'https://example.com/i.png' } }] }] } },
  { id: 'A7 V2 separator + file', stored: { flags: V2, components: [{ type: 14, divider: true, spacing: 1 }, { type: 13, file: { url: 'https://example.com/f.txt' } }] } },
  { id: 'A8 action row only, NO flag (classic-with-buttons)', stored: { content: 'c', components: [{ type: 1, components: [{ type: 2, style: 5, label: 'B', url: 'https://example.com/' }] }] } },
  // The population the plan itself names as existing today: a V2-component message stored
  // WITHOUT the bit, because `NewMessageModal.onSubmit` forwards to upsert without stripKeys
  // (register D11's trim note; M4-a is the milestone that closes it).
  { id: 'A9 V2 components, flag ABSENT (NewMessageModal-created)', stored: { components: [{ type: 17, components: [{ type: 10, content: 'body' }] }] } },
  { id: 'A10 V2 components + classic content retained (5712-shaped-with-components)', stored: { flags: V2, content: 'kept', components: [{ type: 17, components: [{ type: 10, content: 'body' }] }] } },
  { id: 'A11 non-V2 flag bits (SUPPRESS_EMBEDS | SUPPRESS_NOTIFICATIONS)', stored: { content: 'c', flags: 4 | 4096 } },

  // SEQ-B drafts: what the user is holding when their own save's broadcast returns.
  { id: 'B1 draft: trailing space in classic content', stored: { content: 'hi' }, draft: { content: 'hi ' } },
  { id: 'B2 draft: trailing space in a BUTTON LABEL (new hashed surface under M1)', stored: { content: 'c', components: [{ type: 1, components: [{ type: 2, style: 5, label: 'B', url: 'https://example.com/' }] }] }, draft: { content: 'c', components: [{ type: 1, components: [{ type: 2, style: 5, label: 'B ', url: 'https://example.com/' }] }] } },
  { id: 'B3 draft: leading space in a V2 accessory URL (new hashed surface under M1)', stored: { flags: V2, components: [{ type: 9, components: [{ type: 10, content: 'x' }], accessory: { type: 2, style: 5, label: 'Go', url: 'https://example.com/' } }] }, draft: { flags: V2, components: [{ type: 9, components: [{ type: 10, content: 'x' }], accessory: { type: 2, style: 5, label: 'Go', url: ' https://example.com/' } }] } },

  // --- Round 2 (fix review at 495463a).  The round-1 corpus was built from the shape's
  // `.trim()` leaves, so it can only see the class in the phrasing that produced it.  These
  // cases probe the SAME class -- "the consumer hashes a form the producer's normalisation has
  // not been applied to" -- through normalisation forms the round-1 predicate could not see:
  // unknown-key stripping, and `.trim()` leaves on surfaces outside `components`.
  { id: 'D1 draft: unknown key inside a V2 component (zod strips it, stripKeys does not)', stored: { flags: V2, components: [{ type: 17, components: [{ type: 10, content: 'body' }] }] }, draft: { flags: V2, components: [{ type: 17, components: [{ type: 10, content: 'body', bogus: 'x' }] }] } },
  { id: 'D2 draft: unknown key at the top level of data', stored: { content: 'hi' }, draft: { content: 'hi', tts: true } },
  { id: 'D3 draft: trailing space in an EMBED TITLE', stored: { content: 'c', embeds: [{ title: 'T', description: 'D' }] }, draft: { content: 'c', embeds: [{ title: 'T ', description: 'D' }] } },
  { id: 'D4 draft: trailing space in an EMBED FIELD name/value', stored: { content: 'c', embeds: [{ fields: [{ name: 'n', value: 'v' }] }] }, draft: { content: 'c', embeds: [{ fields: [{ name: 'n ', value: ' v' }] }] } },
  { id: 'D5 draft: leading space in USERNAME and AVATAR_URL', stored: { content: 'c', username: 'Bot', avatar_url: 'https://example.com/a.png' }, draft: { content: 'c', username: ' Bot', avatar_url: ' https://example.com/a.png' } },
  { id: 'D6 draft: trailing space in a TEXT DISPLAY content (NOT trimmed by the shape)', stored: { flags: V2, components: [{ type: 17, components: [{ type: 10, content: 'body ' }] }] }, draft: { flags: V2, components: [{ type: 17, components: [{ type: 10, content: 'body ' }] }] } },

  // Positive controls: these MUST mismatch, or the probe is not measuring anything.
  { id: 'C1 control: draft genuinely edits the content', control: true, stored: { content: 'hi' }, draft: { content: 'goodbye' } },
  // Round 2: the FALSE-NEGATIVE direction.  `normalizeForHash` collapses distinctions, so
  // it must be shown not to collapse a real edit that happens to live on a TRIMMED leaf --
  // if it did, a genuine change would stop prompting and the fix would have blinded the
  // detector rather than corrected it.
  { id: 'C3 control: draft edits a TRIMMED leaf non-whitespace (button label B -> B2)', control: true, stored: { content: 'c', components: [{ type: 1, components: [{ type: 2, style: 5, label: 'B', url: 'https://example.com/' }] }] }, draft: { content: 'c', components: [{ type: 1, components: [{ type: 2, style: 5, label: 'B2', url: 'https://example.com/' }] }] } },
  { id: 'C4 control: draft edits an EMBED TITLE non-whitespace', control: true, stored: { content: 'c', embeds: [{ title: 'T' }] }, draft: { content: 'c', embeds: [{ title: 'T2' }] } },
  { id: 'C2 control: draft genuinely edits a V2 component body', control: true, stored: { flags: V2, components: [{ type: 17, components: [{ type: 10, content: 'body' }] }] }, draft: { flags: V2, components: [{ type: 17, components: [{ type: 10, content: 'DIFFERENT' }] }] } },
];

const NAME = 'probe';

/** The producer: what `upsertMessage` hashes and broadcasts for a given client payload. */
function producerHash(payloadData: Record<string, unknown>) {
  const parsed = optionalIdMessageShape.parse({ name: NAME, data: payloadData });
  return { hash: hashMessage(parsed as never), storedData: (parsed as { data: unknown }).data };
}

/**
 * The consumer: what `usePusher`'s `message-update` handler computes for a composer holding
 * `local`.  Tracks the LIVE call site rather than a copy of it -- at `495463a` the handler is
 * `hashMessage(normalizeForHash(x))`, at `a4eb00d` and `c85945f` it was `hashMessage(stripKeys(x))`.
 * The probe therefore reads the shipped `normalizeForHash` when the tree exports one and the
 * shipped `stripKeys` when it does not; it never reimplements either.
 */
const normalizeForHash = (usePusherModule as { normalizeForHash?: (m: unknown) => unknown })
  .normalizeForHash;
const CONSUMER_FORM: (m: unknown) => unknown = typeof normalizeForHash === 'function'
  ? normalizeForHash
  : (m: unknown) => stripKeys(m as never);

function consumerHash(local: Record<string, unknown>) {
  return hashMessage(CONSUMER_FORM({ name: NAME, data: local }) as never);
}

const rows: string[] = [];

describe('CR1 — producer vs consumer, SEQ-A (steady state: composer holds exactly what was stored)', () => {
  for (const c of CASES.filter((x) => !x.control)) {
    it(c.id, () => {
      // The save that produced the stored row went through the composer, so the payload is
      // stripKeys' output; the server parses and stores that.
      const payload = (stripKeys({ name: NAME, data: c.stored } as never) as { data: Record<string, unknown> }).data;
      const { hash: broadcast, storedData } = producerHash(payload);
      // The other tab loaded `storedData` and has typed nothing.
      const local = (makeEditable({ data: storedData } as never) as { data: Record<string, unknown> }).data;
      const seen = consumerHash(local);
      rows.push(`SEQ-A | ${c.id} | ${broadcast === seen ? 'equal' : `MISMATCH ${broadcast} vs ${seen}`}`);
      expect(seen, `SEQ-A ${c.id}`).toBe(broadcast);
    });
  }
});

describe('CR1 — producer vs consumer, SEQ-B (the saving tab still holds its own draft)', () => {
  for (const c of CASES.filter((x) => x.draft && !x.control)) {
    it(c.id, () => {
      const draft = c.draft as Record<string, unknown>;
      const payload = (stripKeys({ name: NAME, data: draft } as never) as { data: Record<string, unknown> }).data;
      const { hash: broadcast } = producerHash(payload);
      const seen = consumerHash(draft);
      const equal = broadcast === seen;
      rows.push(`SEQ-B | ${c.id} | ${equal ? 'equal' : `MISMATCH ${broadcast} vs ${seen}`}`);
      expect(seen, `SEQ-B ${c.id}`).toBe(broadcast);
    });
  }
});

describe('CR1 — positive controls must mismatch', () => {
  for (const c of CASES.filter((x) => x.control)) {
    it(`${c.id} (expected MISMATCH)`, () => {
      const payload = (stripKeys({ name: NAME, data: c.stored } as never) as { data: Record<string, unknown> }).data;
      const { hash: broadcast, storedData } = producerHash(payload);
      void storedData;
      const seen = consumerHash(c.draft as Record<string, unknown>);
      rows.push(`CTRL  | ${c.id} | ${broadcast === seen ? 'EQUAL (control failed)' : 'mismatch (as required)'}`);
      expect(seen, `control ${c.id}`).not.toBe(broadcast);
    });
  }
});

describe('CR1 round 2 -- residue checks on the fix (these are GUARDS, not defects today)', () => {
  /**
   * `hashMessage` hashes the tuple `{ name, data }`.  `normalizeForHash` parses `data` only, so
   * `name` reaches the hash raw on the consumer side and shape-parsed on the producer side.
   * `messageShape.name` carries no transform today (`z.string().min(1).max(...)`), so the two
   * agree -- this case asserts that they still do.  It fails the day `name` gains a `.trim()`
   * or any other transform, which is the day the HIGH-1 class returns through a field the fix
   * does not cover.
   */
  it('N1 guard: a name carrying whitespace hashes identically on both sides', () => {
    const data = { content: 'hi' };
    const rawName = '  spaced name  ';
    const parsed = optionalIdMessageShape.parse({ name: rawName, data });
    const broadcast = hashMessage(parsed as never);
    const seen = hashMessage(CONSUMER_FORM({ name: rawName, data }) as never);
    rows.push(`GUARD | N1 name whitespace parity | ${broadcast === seen ? 'equal' : `MISMATCH ${broadcast} vs ${seen}`}`);
    expect(seen, 'N1 name parity -- messageShape.name has gained a transform').toBe(broadcast);
  });

  /**
   * The fallback branch: when the live draft does not satisfy the shape, `normalizeForHash`
   * returns the unparsed `stripKeys` form rather than throwing.  No producer hash can
   * correspond to such a draft (the save that would broadcast it is rejected by the same
   * shape), so this is a defined-behaviour check, not a parity check.
   */
  it('F1: an unparsable draft yields the stripKeys form, not a throw and not a crash', () => {
    const invalid = { content: 'hi', components: [{ type: 3, custom_id: 'x' }] };
    const viaFallback = CONSUMER_FORM({ name: NAME, data: invalid });
    const viaStripKeys = stripKeys({ name: NAME, data: invalid } as never);
    expect(hashMessage(viaFallback as never)).toBe(hashMessage(viaStripKeys as never));
    rows.push('GUARD | F1 unparsable draft falls back to stripKeys | equal');
  });
});

afterAll(() => {
  const matrix = `=== CR1 matrix (${process.env.PROBE_LABEL ?? 'tree'}) ===\n`
    + `consumer form: ${typeof normalizeForHash === 'function' ? 'normalizeForHash (live export)' : 'stripKeys (no normalizeForHash on this tree)'}\n`
    + rows.join('\n');
  // Written to a file, not only logged: vitest's reporter does not surface afterAll
  // console output, and a matrix that only exists on a terminal is not a captured run.
  if (process.env.PROBE_OUT) writeFileSync(process.env.PROBE_OUT, `${matrix}\n`);
  console.log(`\n=== CR1 matrix (${process.env.PROBE_LABEL ?? 'tree'}) ===\nconsumer form: ${typeof normalizeForHash === 'function' ? 'normalizeForHash (live export)' : 'stripKeys (no normalizeForHash on this tree)'}\n${rows.join('\n')}`);
});
import { afterAll } from 'vitest';
