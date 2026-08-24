/**
 * QA Phase 1 probe (plan 013) — NOT an acceptance spec.
 *
 * Question it discriminates: Validation item 8 says M8-G's production-reachable
 * human-observable form exists "only while 5712 and 5842 are unrepaired". If that
 * is true, the owner's D19 repair is a one-way door that destroys the observation.
 *
 * This probe asks whether a 5712-SHAPED RECORD CAN BE MINTED THROUGH THE UI AT THE
 * CHAIN BASE (c85945f), with no SQL and no database access — i.e. whether UAT can
 * hold its own seed that survives the D19 repair.
 *
 * Run: pnpm vitest run src/utils/__tests__/013-qa-phase1-seed-route-probe.test.ts
 * Captured at: agent-output/verification/013/probe-preexisting-seed-route/
 */
import { describe, expect, it, vi } from 'vitest';

// Module-scope hazard, enumerated before execution (QA definition): importing `~/utils`
// reaches `src/constants/index.ts` -> `src/env.mjs`, which VALIDATES ENV VARS AT MODULE
// SCOPE and throws under this box's environment. Every existing spec in this repo mocks
// it for the same reason. Recorded as F-QA9.
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { enforceImportMutualExclusivity, hasClassicContent, hasV2Components } from '~/utils';
import { IS_COMPONENTS_V2_FLAG } from '~/constants';
import { discordMessageShape, discordMessageImportShape } from '~/server/api/utils/shapes';

// The shape rows 5712 and 5842 carry, per the 012 backfill report (2026-08-23).
const SHAPE_5712 = { content: 'hi', flags: IS_COMPONENTS_V2_FLAG };
const SHAPE_5842 = { content: 'hi', flags: IS_COMPONENTS_V2_FLAG, components: [] as { type: number }[] };

describe('013 QA Phase 1 probe — can UAT mint its own M8-G seed pre-deploy?', () => {
  it('the flag bit under test is 32768 (stated independently of the constant)', () => {
    // Expectation independence: 1 << 15, not the imported constant re-exported.
    expect(IS_COMPONENTS_V2_FLAG).toBe(32768);
  });

  it('5712 shape: the paste reconciler at c85945f passes the flag through untouched', () => {
    const { data, detectedMode } = enforceImportMutualExclusivity({ ...SHAPE_5712 });
    // Independently stated expectations, from the fixture, not from the code under test.
    expect(data.flags).toBe(32768);
    expect(data.content).toBe('hi');
    expect(detectedMode).toBe('classic');
  });

  it('5842 shape: components:[] likewise survives with the flag', () => {
    const { data, detectedMode } = enforceImportMutualExclusivity({ ...SHAPE_5842 });
    expect(data.flags).toBe(32768);
    expect(data.content).toBe('hi');
    expect(data.components).toEqual([]);
    expect(detectedMode).toBe('classic');
  });

  it('both shapes are accepted by the client import shape', () => {
    expect(discordMessageImportShape.safeParse(SHAPE_5712).success).toBe(true);
    expect(discordMessageImportShape.safeParse(SHAPE_5842).success).toBe(true);
  });

  it('both shapes are accepted by the SERVER upsert input shape (the write boundary)', () => {
    expect(discordMessageShape.safeParse(SHAPE_5712).success).toBe(true);
    expect(discordMessageShape.safeParse(SHAPE_5842).success).toBe(true);
  });

  it('both shapes are genuine row-D/E seeds: flag set, classic content, no V2 components', () => {
    for (const s of [SHAPE_5712, SHAPE_5842]) {
      expect((s.flags & 32768) !== 0).toBe(true);
      expect(hasClassicContent(s)).toBe(true);
      expect(hasV2Components((s as { components?: { type: number }[] }).components)).toBe(false);
    }
  });

  // DISCRIMINATING CONTROL, the other direction: if the reconciler already refused
  // or normalised this shape at the chain base, the seed route would not exist and
  // every assertion above would be reporting a route that is in fact closed.
  it('CONTROL — the reconciler DOES strip when V2 components are present (so the pass-through above is not vacuous)', () => {
    const rowE = { content: 'hi', flags: 0, components: [{ type: 17 }] };
    const { data, detectedMode } = enforceImportMutualExclusivity(rowE);
    expect(detectedMode).toBe('v2');
    expect(data.content).toBeUndefined();   // today's silent strip, which M8-E retires
    expect(data.embeds).toBeUndefined();
  });
});
