import { z } from 'zod';

import {
  MAX_ACTION_ROW_BUTTONS, MAX_BUTTON_LABEL_LENGTH,
  MAX_COMPONENTS_DISPLAYABLE_TEXT,
  MAX_EMBEDS, MAX_EMBED_AUTHOR_NAME_LENGTH, MAX_EMBED_DESCRIPTION_LENGTH,
  MAX_EMBED_FIELDS, MAX_EMBED_FIELD_NAME_LENGTH, MAX_EMBED_FIELD_VALUE_LENGTH,
  MAX_EMBED_FOOTER_TEXT_LENGTH, MAX_EMBED_TITLE_LENGTH,
  MAX_MEDIA_GALLERY_ITEMS,
  MAX_MESSAGE_CONTENT_LENGTH, MAX_MESSAGE_NAME_LENGTH, MAX_NAME_LENGTH,
  MAX_SECTION_TEXT_COMPONENTS,
  MAX_TEXT_DISPLAY_CONTENT_LENGTH,
  MAX_TOTAL_COMPONENTS,
} from './limits.ts';

export interface RecentMessageData {
  id: string;
  recentWebhookId: string;
  recentThreadId: null | string;
  recentMessageId: string;
}

export interface IncomingMessage {
  id?: string;
  guildId?: null | string;
  name: string;
  data: MessageData;
}

export interface UpdateMessage {
  id: string;
  name: string;
  data: MessageData;
}

export const discordIdShape = z.string().regex(/^[0-9]{17,23}$/);

const MAX_MESSAGE_ID = 9223372036854775807n;

export const messageIdShape = z.string()
  .regex(/^[0-9]{1,19}$/)
  .transform((id) => BigInt(id))
  .refine((id) => id <= MAX_MESSAGE_ID)
  .transform((id) => id.toString());
export const userOrDiscordIdShape = z.string().regex(/^(0|[0-9]{17,23})$/);

// Components V2 Zod schemas

const emojiShape = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  animated: z.boolean().optional(),
});

const linkButtonShape = z.object({
  type: z.literal(2),
  style: z.literal(5),
  label: z.string().trim().max(MAX_BUTTON_LABEL_LENGTH).optional(),
  emoji: emojiShape.optional(),
  url: z.string().trim().url(),
  disabled: z.boolean().optional(),
});

const actionRowShape = z.object({
  type: z.literal(1),
  components: z.array(linkButtonShape).max(MAX_ACTION_ROW_BUTTONS),
});

const textDisplayShape = z.object({
  type: z.literal(10),
  content: z.string().max(MAX_TEXT_DISPLAY_CONTENT_LENGTH),
});

const thumbnailShape = z.object({
  type: z.literal(11),
  media: z.object({ url: z.string().trim().url() }),
  description: z.string().optional(),
  spoiler: z.boolean().optional(),
});

const sectionShape = z.object({
  type: z.literal(9),
  components: z.array(textDisplayShape).max(MAX_SECTION_TEXT_COMPONENTS),
  accessory: z.union([thumbnailShape, linkButtonShape]),
});

const mediaGalleryItemShape = z.object({
  media: z.object({ url: z.string().trim().url() }),
  description: z.string().optional(),
  spoiler: z.boolean().optional(),
});

const mediaGalleryShape = z.object({
  type: z.literal(12),
  items: z.array(mediaGalleryItemShape).max(MAX_MEDIA_GALLERY_ITEMS),
});

const fileShape = z.object({
  type: z.literal(13),
  file: z.object({ url: z.string().trim().url() }),
  spoiler: z.boolean().optional(),
});

const separatorShape = z.object({
  type: z.literal(14),
  divider: z.boolean(),
  spacing: z.union([z.literal(1), z.literal(2)]),
});

export const containerChildShape = z.discriminatedUnion('type', [
  actionRowShape,
  textDisplayShape,
  sectionShape,
  mediaGalleryShape,
  fileShape,
  separatorShape,
]);

const containerShape = z.object({
  type: z.literal(17),
  components: z.array(containerChildShape),
  accent_color: z.number().int().min(0).max(0xffffff)
    .optional(),
  spoiler: z.boolean().optional(),
});

export const topLevelComponentShape = z.discriminatedUnion('type', [
  actionRowShape,
  textDisplayShape,
  sectionShape,
  mediaGalleryShape,
  fileShape,
  separatorShape,
  containerShape,
]);

export const embedShape = z.object({
  author: z.object({
    name: z.string().trim().max(MAX_EMBED_AUTHOR_NAME_LENGTH),
    url: z.string().trim().url().optional(),
    icon_url: z.string().trim().url().optional(),
  }).optional(),
  url: z.string().trim().url().optional(),
  description: z.string().trim().max(MAX_EMBED_DESCRIPTION_LENGTH).optional(),
  color: z.number().int().min(0).max(0xffffff)
    .optional(),
  title: z.string().trim().max(MAX_EMBED_TITLE_LENGTH).optional(),
  fields: z.array(
    z.object({
      name: z.string().trim().max(MAX_EMBED_FIELD_NAME_LENGTH),
      value: z.string().trim().max(MAX_EMBED_FIELD_VALUE_LENGTH),
      inline: z.boolean().optional(),
    }),
  ).max(MAX_EMBED_FIELDS).optional(),
  timestamp: z.string().trim().datetime().optional(),
  footer: z.object({
    text: z.string().trim().max(MAX_EMBED_FOOTER_TEXT_LENGTH),
    icon_url: z.string().trim().url().optional(),
  }).optional(),
  image: z.object({
    url: z.string().trim().url(),
  }).optional(),
  thumbnail: z.object({
    url: z.string().trim().url(),
  }).optional(),
});

function sumDisplayableText(
  components: { type: number, content?: string, components?: unknown[] }[],
): number {
  let total = 0;
  for (const c of components) {
    if (c.type === 10 && typeof c.content === 'string') {
      total += c.content.length;
    } else if ((c.type === 9 || c.type === 17) && Array.isArray(c.components)) {
      total += sumDisplayableText(c.components as typeof components);
    }
  }
  return total;
}

function refineDisplayableText(data: { components?: unknown[] }, ctx: z.RefinementCtx) {
  if (!data.components) return;
  const total = sumDisplayableText(data.components as Parameters<typeof sumDisplayableText>[0]);
  if (total > MAX_COMPONENTS_DISPLAYABLE_TEXT) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: MAX_COMPONENTS_DISPLAYABLE_TEXT,
      type: 'string',
      inclusive: true,
      path: ['components'],
      message: `Components displayable text size exceeds maximum size of ${MAX_COMPONENTS_DISPLAYABLE_TEXT}`,
    });
  }
}

const discordMessageBaseShape = z.object({
  content: z.string().trim().max(MAX_MESSAGE_CONTENT_LENGTH).optional(),
  username: z.string().trim().max(MAX_NAME_LENGTH).optional(),
  avatar_url: z.string().trim().url().optional(),
  allowed_mentions: z.object({
    parse: z.array(z.union([z.literal('user'), z.literal('here'), z.literal('everyone')])).optional(),
    users: z.array(discordIdShape).optional(),
    roles: z.array(discordIdShape).optional(),
    replied_user: z.boolean().optional(),
  }).optional(),
  embeds: z.array(embedShape).max(MAX_EMBEDS).optional(),
  components: z.array(z.unknown()).max(MAX_TOTAL_COMPONENTS).pipe(z.array(topLevelComponentShape)).optional(),
  flags: z.number().int().nonnegative().optional(),
});

export const discordMessageShape = discordMessageBaseShape
  .superRefine(refineDisplayableText) as z.ZodEffects<typeof discordMessageBaseShape, MessageData>;

const LINK_BUTTON_STYLE = 5;
const SECTION_TYPE = 9;
const ACTION_ROW_TYPE = 1;
const CONTAINER_TYPE = 17;
const BUTTON_TYPE = 2;
const THUMBNAIL_TYPE = 11;

export const SUPPORTED_TOP_LEVEL_TYPES = new Set([1, 9, 10, 12, 13, 14, 17]);
export const SUPPORTED_CONTAINER_CHILD_TYPES = new Set([1, 9, 10, 12, 13, 14]);

const COMPONENT_TYPE_LABELS: Record<number, string> = {
  [BUTTON_TYPE]: 'Button',
  3: 'Select Menu',
  4: 'Text Input',
  5: 'User Select Menu',
  6: 'Role Select Menu',
  7: 'Mentionable Select Menu',
  8: 'Channel Select Menu',
  [THUMBNAIL_TYPE]: 'Thumbnail',
};

function labelFor(type: number): string {
  return COMPONENT_TYPE_LABELS[type] ?? `type ${type}`;
}

function isSupportedAccessory(accessory: unknown): boolean {
  if (typeof accessory !== 'object' || accessory === null) return false;
  const { type, style } = accessory as { type: number, style?: number };
  if (type === THUMBNAIL_TYPE) return true;
  return type === BUTTON_TYPE && style === LINK_BUTTON_STYLE;
}

function accessoryLabel(accessory: unknown): string {
  if (typeof accessory !== 'object' || accessory === null) return labelFor(SECTION_TYPE);
  return labelFor((accessory as { type: number }).type);
}

function filterActionRowButtons(
  row: Record<string, unknown>,
  dropped?: Set<string>,
): Record<string, unknown> | null {
  const buttons = Array.isArray(row.components) ? row.components as Record<string, unknown>[] : [];
  const kept = buttons.filter((button) => {
    if (button.type === BUTTON_TYPE && button.style === LINK_BUTTON_STYLE) return true;
    dropped?.add(labelFor(button.type as number));
    return false;
  });
  if (kept.length === 0) return null;
  return { ...row, components: kept };
}

function filterSection(
  section: Record<string, unknown>,
  dropped?: Set<string>,
): Record<string, unknown> | null {
  if (!isSupportedAccessory(section.accessory)) {
    dropped?.add(accessoryLabel(section.accessory));
    return null;
  }
  return section;
}

function filterContainerChild(
  child: Record<string, unknown>,
  dropped?: Set<string>,
): Record<string, unknown> | null {
  if (!SUPPORTED_CONTAINER_CHILD_TYPES.has(child.type as number)) {
    dropped?.add(labelFor(child.type as number));
    return null;
  }
  if (child.type === ACTION_ROW_TYPE) return filterActionRowButtons(child, dropped);
  if (child.type === SECTION_TYPE) return filterSection(child, dropped);
  return child;
}

function filterTopLevelComponent(
  component: Record<string, unknown>,
  dropped?: Set<string>,
): Record<string, unknown> | null {
  if (!SUPPORTED_TOP_LEVEL_TYPES.has(component.type as number)) {
    dropped?.add(labelFor(component.type as number));
    return null;
  }
  if (component.type === ACTION_ROW_TYPE) return filterActionRowButtons(component, dropped);
  if (component.type === SECTION_TYPE) return filterSection(component, dropped);
  if (component.type === CONTAINER_TYPE && Array.isArray(component.components)) {
    const children = (component.components as Record<string, unknown>[])
      .map((child) => (typeof child === 'object' && child !== null ? filterContainerChild(child, dropped) : null))
      .filter((child): child is Record<string, unknown> => child !== null);
    if (children.length === 0) return null;
    return { ...component, components: children };
  }
  return component;
}

function filterSupportedComponents(components: unknown): unknown {
  if (!Array.isArray(components)) return components;
  return (components as unknown[])
    .map((c) => (typeof c === 'object' && c !== null ? filterTopLevelComponent(c as Record<string, unknown>) : null))
    .filter(Boolean);
}

export function describeUnsupportedComponentTypes(components: unknown): string[] {
  const dropped = new Set<string>();
  if (!Array.isArray(components)) return [];
  (components as unknown[]).forEach((c) => {
    if (typeof c === 'object' && c !== null) filterTopLevelComponent(c as Record<string, unknown>, dropped);
  });
  return [...dropped];
}

export function describeDroppedComponentTypesNotice(
  droppedComponentTypes: readonly string[],
): string {
  return `Not supported on Hooks.gg: ${droppedComponentTypes.join(', ')}`;
}

/** Lenient schema for JSON import — filters unsupported component types instead of rejecting. */
export const discordMessageImportShape = discordMessageBaseShape.extend({
  components: z.preprocess(
    filterSupportedComponents,
    z.array(topLevelComponentShape).max(MAX_TOTAL_COMPONENTS).optional(),
  ),
}).superRefine(refineDisplayableText);

export const recentMessageDataShape = z.object({
  id: messageIdShape,
  recentWebhookId: discordIdShape,
  recentThreadId: discordIdShape.nullable(),
  recentMessageId: discordIdShape,
}) satisfies z.ZodType<RecentMessageData>;

export const messageShape = z.object({
  name: z.string().min(1).max(MAX_MESSAGE_NAME_LENGTH),
  guildId: discordIdShape.nullable().optional(),
  data: discordMessageShape,
}) satisfies z.ZodType<IncomingMessage>;

export const partialMessageShape = messageShape.extend({
  id: z.string().optional(),
  name: z.string().min(1).max(MAX_MESSAGE_NAME_LENGTH).optional(),
}) satisfies z.ZodType<Omit<IncomingMessage, 'name' | 'guildId'> & Partial<Pick<IncomingMessage, 'name' | 'guildId'>>>;

export const optionalIdMessageShape = messageShape.extend({
  id: messageIdShape.optional(),
}) satisfies z.ZodType<IncomingMessage>;

export const idMessageShape = messageShape.extend({
  id: z.string(),
}) satisfies z.ZodType<UpdateMessage>;
