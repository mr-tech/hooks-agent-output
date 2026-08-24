import { describe, it, expect, vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));
import * as utils from '~/utils';                 // barrel FIRST
import * as mode from '~/utils/messageMode';
describe('CR5-cycle — barrel imported first', () => {
  it('both modules initialise and their cross-referenced functions work', () => {
    expect(typeof (utils as any).applyDisposition).toBe('function');
    expect(typeof (mode as any).applyModeSwitch).toBe('function');
    expect((utils as any).hasV2Components([{ type: 17 }])).toBe(true);
    expect((mode as any).applyModeSwitch('classic', { flags: 32768, content: 'x' }).flags).toBe(0);
  });
});
