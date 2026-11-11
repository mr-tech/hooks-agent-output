// Probe (QA Phase 1 re-key on plan revision 3): does Author render its username error line with no
// edit state, as the /preview route mounts it? Run inside a `git archive` export of the website at
// src/components/DiscordMessageEditor/components/__tests__/ (vitest, jsdom project).
import { describe, expect, it, vi } from 'vitest';

import Author from '../Author';

import { mountDom, unmountDom } from '~/components/__tests__/helpers/dom';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));
vi.mock('~/components/dynamics/ImageUploader', () => ({ default: () => null }));

const errorLines = (username: string, visualStyle: 'cozy' | 'compact') => {
  const host = mountDom(
    <Author visualStyle={visualStyle} username={username} avatarUrl="" showEdit={false}
      setUsername={() => {}} setAvatarUrl={() => {}} />,
  );
  const lines = Array.from(host.querySelectorAll('.text-error')).map((e) => e.textContent);
  unmountDom();
  return lines;
};

describe('Author with no edit state', () => {
  it.each([['cozy'], ['compact']] as const)('%s: an empty username renders an error line', (style) => {
    expect(errorLines('', style)).toEqual(['This username is too short or too long.']);
  });
  it.each([['cozy'], ['compact']] as const)('%s: a valid username renders none (control)', (style) => {
    expect(errorLines('Captain Hook', style)).toEqual([]);
  });
});
