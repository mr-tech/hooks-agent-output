import { z } from 'zod';

import isValidUrl from './isValidUrl';

import type { Embed, EmbedAuthor, EmbedField } from '~/components/DiscordMessageEditor';

import {
  IS_COMPONENTS_V2_FLAG,
  MAX_COMPONENT_DESCRIPTION_LENGTH,
  MAX_COMPONENTS_DISPLAYABLE_TEXT,
  MAX_EMBED_AUTHOR_NAME_LENGTH, MAX_EMBED_CHARACTERS, MAX_EMBED_DESCRIPTION_LENGTH,
  MAX_EMBED_FIELD_NAME_LENGTH,
  MAX_EMBED_FIELD_VALUE_LENGTH, MAX_EMBED_TITLE_LENGTH, MAX_MESSAGE_CONTENT_LENGTH,
  MAX_NAME_LENGTH, MAX_TOTAL_COMPONENTS, MIN_NAME_LENGTH, V2_COMPONENT_TYPE_VALUES,
} from '~/constants/messageLimits';

const V2_TYPES = new Set<number>(V2_COMPONENT_TYPE_VALUES);

const BAD_USERNAME = ['everyone', 'here'];
const BAD_USERNAME_REGEX = /([@#:]|(```)|(discord)|(clyde))/i;

export function validateMessageLength(content: string) {
  return content.length > MAX_MESSAGE_CONTENT_LENGTH ? 'Message is too long.' : '';
}

export function validateUsername(username: string) {
  if (BAD_USERNAME.includes(username)) return 'This username is not allowed.';
  if (BAD_USERNAME_REGEX.test(username)) return 'This username contains invalid characters.';
  if (username.length < MIN_NAME_LENGTH || username.length > MAX_NAME_LENGTH) return 'This username is too short or too long.';
  return '';
}

export function validateEmbedCharacterCount(embeds: Embed[]) {
  const embedCharacterCount = embeds.reduce((acc, embed) => {
    const title = embed.title?.length ?? 0;
    const description = embed.description?.length ?? 0;
    const fields = embed.fields?.reduce((a, f) => a + (f.name?.length ?? 0) + (f.value?.length ?? 0), 0) ?? 0;
    const footer = embed.footer?.text?.length ?? 0;
    const author = embed.author?.name?.length ?? 0;
    return acc + title + description + fields + footer + author;
  }, 0);

  return embedCharacterCount > MAX_EMBED_CHARACTERS ? `Embeds exceed ${MAX_EMBED_CHARACTERS} characters.` : '';
}

function sumDisplayableText(
  components: {
    type: number; content?: string;
    components?: { type: number, content?: string, components?: unknown[] }[];
  }[],
): number {
  let total = 0;
  for (const c of components) {
    if (c.type === 10 && c.content) {
      total += c.content.length;
    } else if ((c.type === 9 || c.type === 17) && Array.isArray(c.components)) {
      total += sumDisplayableText(c.components as typeof components);
    }
  }
  return total;
}

export function validateDisplayableTextCount(components: SupportedTopLevelComponent[]) {
  const total = sumDisplayableText(
    components as unknown as Parameters<typeof sumDisplayableText>[0],
  );
  return total > MAX_COMPONENTS_DISPLAYABLE_TEXT ? `Components text exceeds ${MAX_COMPONENTS_DISPLAYABLE_TEXT} characters.` : '';
}

export function countTotalComponents(components: readonly object[]): number {
  let count = 0;
  for (const c of components) {
    count += 1;
    if ('accessory' in c && c.accessory) count += 1;
    if ('components' in c && Array.isArray(c.components)) {
      const children = c.components as object[];
      count += children.length;
      for (const child of children) {
        if ('accessory' in child && child.accessory) count += 1;
        if ('components' in child && Array.isArray(child.components)) {
          count += child.components.length;
        }
      }
    }
  }
  return count;
}

export function validateComponentCount(components: readonly object[]) {
  const total = countTotalComponents(components);
  return total > MAX_TOTAL_COMPONENTS ? `Message has ${total} components; the limit is ${MAX_TOTAL_COMPONENTS}.` : '';
}

export function validateEmbedAuthorName(name: undefined | string) {
  return name && name.length > MAX_EMBED_AUTHOR_NAME_LENGTH;
}

export function validateEmbedAuthorUrl(url: undefined | string) {
  return !url ? '' : isValidUrl(url);
}

export function validateEmbedAuthor(author: undefined | EmbedAuthor) {
  const nameErroring = validateEmbedAuthorName(author?.name);
  const urlErroring = author?.url && !isValidUrl(author?.url);

  let error = '';
  if (nameErroring) error = 'Name is too long.';
  if (!author?.name && author?.url) error = 'Name is required if URL is provided.';
  if (urlErroring) error = 'Invalid URL.';
  return { error, nameErroring, urlErroring };
}

export function validateEmbedDescription(description: undefined | string) {
  return description && description.length > MAX_EMBED_DESCRIPTION_LENGTH ? `Description exceeds ${MAX_EMBED_DESCRIPTION_LENGTH} characters.` : '';
}

export function validateEmbedField(field: EmbedField) {
  let nameError = '';
  if (field.value?.length && !field.name) nameError = 'Field name is required.';
  if (field.name?.length > MAX_EMBED_FIELD_NAME_LENGTH) nameError = `Field name must be ${MAX_EMBED_FIELD_NAME_LENGTH} characters or less.`;

  let valueError = '';
  if (field.name?.length && !field.value) valueError = 'Field value is required.';
  if (field.value?.length > MAX_EMBED_FIELD_VALUE_LENGTH) valueError = `Field value must be ${MAX_EMBED_FIELD_VALUE_LENGTH} characters or less.`;

  return { nameError, valueError };
}

export function validateEmbedTitle(title: undefined | string, url: undefined | string) {
  const titleErroring = title && title.length > MAX_EMBED_TITLE_LENGTH;
  const urlErroring = url && !isValidUrl(url);

  let error = '';
  if (titleErroring) error = 'Title is too long.';
  else if (!title && url) error = 'Title is required if URL is provided.';
  else if (urlErroring) error = 'Invalid URL.';

  return { error, urlErroring };
}

function isV2Message(components: readonly object[], flags: number): boolean {
  const hasStructuralV2 = (components as { type: number }[]).some((c) => V2_TYPES.has(c.type));
  const hasFlagV2 = !!(flags & IS_COMPONENTS_V2_FLAG);
  return hasStructuralV2 || hasFlagV2;
}

type LooseComponent = Record<string, unknown>;

const LINK_BUTTON_SCHEMES = new Set(['http:', 'https:', 'discord:']);
const requiredUrl = z.string().trim().url();

const asObject = (value: unknown): LooseComponent => (
  typeof value === 'object' && value !== null ? value as LooseComponent : {}
);
const asList = (value: unknown): LooseComponent[] => (
  Array.isArray(value) ? value.map(asObject) : []
);
const isMissing = (value: unknown) => typeof value !== 'string' || value.length === 0;

function isWhitespaceEmpty(value: unknown): boolean {
  if (typeof value !== 'string') return true;
  return !value.includes('\uFEFF') && value.replace(/\u0085/g, '').trim() === '';
}

function urlReason(url: unknown, subject: string, noun: string): string {
  if (isMissing(url)) return `${subject} has no ${noun}.`;
  if (!requiredUrl.safeParse(url).success) return `${subject} has an invalid ${noun}.`;
  return '';
}

function descriptionReason(description: unknown, subject: string): string {
  if (description === '') return `${subject} description is empty.`;
  if (typeof description === 'string' && description.length > MAX_COMPONENT_DESCRIPTION_LENGTH) {
    return `${subject} description is over ${MAX_COMPONENT_DESCRIPTION_LENGTH} characters.`;
  }
  return '';
}

function hasEmoji(emoji: unknown): boolean {
  const { id, name } = asObject(emoji);
  return !isMissing(id) || !isMissing(name);
}

function linkButtonReason(button: LooseComponent): string {
  const urlError = urlReason(button.url, 'A link button', 'URL');
  if (urlError) return urlError;
  const { protocol } = new URL(requiredUrl.parse(button.url));
  if (!LINK_BUTTON_SCHEMES.has(protocol)) return 'A link button URL must start with http, https or discord.';
  if (isWhitespaceEmpty(button.label) && !hasEmoji(button.emoji)) return 'A link button has no label or emoji.';
  return '';
}

function imageReason(image: LooseComponent, subject: string): string {
  return urlReason(asObject(image.media).url, subject, 'image URL')
    || descriptionReason(image.description, subject);
}

function componentReason(component: LooseComponent): string {
  const children = asList(component.components);
  switch (component.type) {
    case 10:
      return isWhitespaceEmpty(component.content) ? 'A Text Display is empty.' : '';
    case 9: {
      if (children.length === 0) return 'A Section has no Text Display.';
      if (!component.accessory) return 'A Section has no Thumbnail or button.';
      const accessory = asObject(component.accessory);
      return children.map(componentReason).find(Boolean)
        ?? (accessory.type === 2 ? linkButtonReason(accessory) : imageReason(accessory, 'A Thumbnail'));
    }
    case 12: {
      const items = asList(component.items);
      if (items.length === 0) return 'A Media Gallery has no items.';
      return items.map((item) => imageReason(item, 'A Media Gallery item')).find(Boolean) ?? '';
    }
    case 17:
      if (children.length === 0) return 'A Container is empty.';
      return children.map(componentReason).find(Boolean) ?? '';
    case 1:
      if (children.length === 0) return 'An Action Row has no buttons.';
      return children.map(linkButtonReason).find(Boolean) ?? '';
    case 13:
      return 'A File component cannot be sent from the website.';
    default:
      return '';
  }
}

export function validateV2Components(components: readonly object[], flags = 0): string {
  if (!isV2Message(components, flags)) return '';
  return asList(components).map(componentReason).find(Boolean) ?? '';
}

export function validateContentRequirements({
  embeds = [], content = '', components = [], flags = 0,
}: Pick<MessageData, 'embeds' | 'content' | 'components' | 'flags'>): string | undefined {
  const hasContent = !!content.trim() || embeds.length > 0;
  const hasComponents = components.length > 0;
  const hasV2 = isV2Message(components, flags);

  if (hasV2 && hasContent) {
    return 'Components V2 messages cannot contain embeds or content.';
  }
  if (!hasContent && !hasComponents) {
    return 'Message must have content, embeds, or components.';
  }
  return undefined;
}

export function validateMessage({
  embeds = [], content = '', username = '', components = [], flags = 0,
}: MessageData): string {
  const contentError = validateContentRequirements({
    embeds, content, components, flags,
  });
  if (contentError) return contentError;

  const usernameError = validateUsername(username);
  if (usernameError) return usernameError;

  const charError = validateEmbedCharacterCount(embeds);
  if (charError) return charError;

  const displayableTextError = validateDisplayableTextCount(
    components as SupportedTopLevelComponent[],
  );
  if (displayableTextError) return displayableTextError;

  const componentCountError = validateComponentCount(components);
  if (componentCountError) return componentCountError;

  const v2Error = validateV2Components(components, flags);
  if (v2Error) return v2Error;

  const lengthError = validateMessageLength(content);
  if (lengthError) return lengthError;

  return '';
}
