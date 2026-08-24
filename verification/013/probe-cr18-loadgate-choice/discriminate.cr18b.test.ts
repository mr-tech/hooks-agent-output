import { describe, it, expect, vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import {
  topLevelComponentShape, containerChildShape,
  SUPPORTED_TOP_LEVEL_TYPES, SUPPORTED_CONTAINER_CHILD_TYPES,
} from '~/server/api/utils/shapes';

/**
 * CR18b — is the M4-b parity test VACUOUS? It asserts
 *   SUPPORTED_TOP_LEVEL_TYPES == new Set(options.map(o => o.shape.type.value))
 * If .shape.type.value were undefined/empty, the derived set would be {undefined}
 * or {} and the assertion could pass vacuously against a mis-specified SUPPORTED.
 */
const topVals = (topLevelComponentShape.options as { shape: { type: { value: number } } }[])
  .map((o) => o.shape.type.value);
const childVals = (containerChildShape.options as { shape: { type: { value: number } } }[])
  .map((o) => o.shape.type.value);

describe('CR18b — the parity extraction returns REAL discriminants, not vacuous', () => {
  it('top-level extraction is the concrete set {1,9,10,12,13,14,17}', () => {
    expect(new Set(topVals)).toEqual(new Set([1, 9, 10, 12, 13, 14, 17]));
    expect(topVals.every((v) => typeof v === 'number')).toBe(true);
    expect(topVals.length).toBe(7);
  });
  it('container-child extraction is the concrete set {1,9,10,12,13,14}', () => {
    expect(new Set(childVals)).toEqual(new Set([1, 9, 10, 12, 13, 14]));
    expect(childVals.every((v) => typeof v === 'number')).toBe(true);
    expect(childVals.length).toBe(6);
  });
  it('DISCRIMINATION: a divergence between SUPPORTED and schema WOULD break toEqual', () => {
    // Simulate the defect the test is meant to catch: add a stray 11 (the M3-era bug M4-b fixed).
    const diverged = new Set([...SUPPORTED_TOP_LEVEL_TYPES, 11]);
    expect(diverged).not.toEqual(new Set(topVals)); // toEqual is set-sensitive -> the test is live
  });
  it('current SUPPORTED sets match schema (the real assertion the suite makes)', () => {
    expect(SUPPORTED_TOP_LEVEL_TYPES).toEqual(new Set(topVals));
    expect(SUPPORTED_CONTAINER_CHILD_TYPES).toEqual(new Set(childVals));
  });
});
