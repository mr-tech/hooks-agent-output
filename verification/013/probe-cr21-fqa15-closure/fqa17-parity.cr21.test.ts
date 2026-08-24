import { describe, expect, it, vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));
import {
  SUPPORTED_CONTAINER_CHILD_TYPES as ICC,
  SUPPORTED_TOP_LEVEL_TYPES as ITL,
} from '~/utils/discordResponseToMessage';
import {
  SUPPORTED_CONTAINER_CHILD_TYPES as SCC,
  SUPPORTED_TOP_LEVEL_TYPES as STL,
} from '~/server/api/utils/shapes';
describe('CR21-G — F-QA17 cross-copy parity executes to equal sets (independent of QA suite)', () => {
  it('top-level sets equal, and are exactly {1,9,10,12,13,14,17} (no 11)', () => {
    expect([...ITL].sort((a,b)=>a-b)).toEqual([...STL].sort((a,b)=>a-b));
    expect([...STL].sort((a,b)=>a-b)).toEqual([1,9,10,12,13,14,17]);
  });
  it('container-child sets equal, and are exactly {1,9,10,12,13,14}', () => {
    expect([...ICC].sort((a,b)=>a-b)).toEqual([...SCC].sort((a,b)=>a-b));
    expect([...SCC].sort((a,b)=>a-b)).toEqual([1,9,10,12,13,14]);
  });
});
