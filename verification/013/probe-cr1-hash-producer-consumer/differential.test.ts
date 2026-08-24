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
import { describe, it, expect, vi } from 'vitest';

vi.mock('~/env.mjs', () => ({
  env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test', NEXT_PUBLIC_PUSHER_KEY: 'k', NEXT_PUBLIC_PUSHER_CLUSTER: 'c' },
}));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { hashMessage, stripKeys, makeEditable } from '~/utils';
import { optionalIdMessageShape } from '~/server/api/utils/shapes';

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

  // Positive controls: these MUST mismatch, or the probe is not measuring anything.
  { id: 'C1 control: draft genuinely edits the content', control: true, stored: { content: 'hi' }, draft: { content: 'goodbye' } },
  { id: 'C2 control: draft genuinely edits a V2 component body', control: true, stored: { flags: V2, components: [{ type: 17, components: [{ type: 10, content: 'body' }] }] }, draft: { flags: V2, components: [{ type: 17, components: [{ type: 10, content: 'DIFFERENT' }] }] } },
];

const NAME = 'probe';

/** The producer: what `upsertMessage` hashes and broadcasts for a given client payload. */
function producerHash(payloadData: Record<string, unknown>) {
  const parsed = optionalIdMessageShape.parse({ name: NAME, data: payloadData });
  return { hash: hashMessage(parsed as never), storedData: (parsed as { data: unknown }).data };
}

/** The consumer: what `usePusher` computes for a composer holding `local`. */
function consumerHash(local: Record<string, unknown>) {
  return hashMessage(stripKeys({ name: NAME, data: local } as never) as never);
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

afterAll(() => { console.log(`\n=== CR1 matrix (${process.env.PROBE_LABEL ?? 'tree'}) ===\n${rows.join('\n')}`); });
import { afterAll } from 'vitest';
