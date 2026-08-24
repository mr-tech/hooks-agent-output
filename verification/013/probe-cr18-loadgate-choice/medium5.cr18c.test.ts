import { describe, it, expect, vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { discordMessageImportShape, describeUnsupportedComponentTypes } from '~/server/api/utils/shapes';
import discordResponseToMessage from '~/utils/discordResponseToMessage';

/** CR18c — MEDIUM-5 (round 15) closure at e61e602: a Section whose accessory is a
 *  non-link (interactive) button must be DROPPED and NAMED on BOTH surfaces. */
const nonLinkBtnAccessory = { type: 2, style: 1, label: 'x', custom_id: 'c' }; // style 1 != link(5)
const thumbAccessory = { type: 11, media: { url: 'https://e.com/a.png' } };
const sectionWith = (acc: any) => ({ type: 9, components: [{ type: 10, content: 'hi' }], accessory: acc });

describe('CR18c-PASTE — filterSupportedComponents drops a non-link-accessory Section', () => {
  it('the section is dropped (not carried to a failing parse)', () => {
    const r = discordMessageImportShape.safeParse({ components: [sectionWith(nonLinkBtnAccessory)] });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.components).toEqual([]);
  });
  it('and the drop is NAMED', () => {
    const names = describeUnsupportedComponentTypes([sectionWith(nonLinkBtnAccessory)]);
    expect(names).toContain('Button');
  });
  it('a Thumbnail accessory is KEPT (control — the fix is not over-broad)', () => {
    const r = discordMessageImportShape.safeParse({ components: [sectionWith(thumbAccessory)] });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.components?.length).toBe(1);
    expect(describeUnsupportedComponentTypes([sectionWith(thumbAccessory)])).toEqual([]);
  });
});

describe('CR18c-INGRESS — discordResponseToMessage drops the same Section', () => {
  const author = { username: 'u', id: '123', avatar: null, discriminator: '0' };
  const base = (over: any) => ({ author, content: '', embeds: [], components: [], flags: 0, ...over });
  it('non-link accessory section does not survive ingress, and is named', () => {
    const { data, droppedComponentTypes } = discordResponseToMessage(base({ components: [sectionWith(nonLinkBtnAccessory)] }) as any);
    expect(data.components ?? []).toEqual([]);
    expect(droppedComponentTypes).toContain('Button');
  });
  it('thumbnail accessory section survives ingress', () => {
    const { data, droppedComponentTypes } = discordResponseToMessage(base({ components: [sectionWith(thumbAccessory)] }) as any);
    expect((data.components ?? []).length).toBe(1);
    expect(droppedComponentTypes).toEqual([]);
  });
});
