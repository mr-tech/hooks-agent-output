import { describe, it, expect, vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));
import * as mode from '~/utils/messageMode';      // leaf FIRST — the TDZ-risky order
import * as utils from '~/utils';
describe('CR5-cycle — messageMode imported first', () => {
  it('both modules initialise; hasV2Components is reachable from the leaf side', () => {
    expect(typeof (mode as any).applyModeSwitch).toBe('function');
    expect(typeof (utils as any).applyDisposition).toBe('function');
    expect((mode as any).isMessageV2({ flags: 0, components: [{ type: 17 }] })).toBe(true);
    expect((utils as any).resolveContentLoss(32768, undefined, undefined, undefined).row).toBe('C');
  });
});
