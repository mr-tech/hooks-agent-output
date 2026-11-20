export const MAX_MESSAGE_CONTENT_LENGTH = 2000 as const;
export const MAX_EMBED_CHARACTERS = 6000 as const;
export const MAX_EMBED_DESCRIPTION_LENGTH = 4096 as const;

export const MAX_EMBED_TITLE_LENGTH = 256 as const;
export const MAX_EMBED_AUTHOR_NAME_LENGTH = 256 as const;
export const MAX_EMBED_FOOTER_TEXT_LENGTH = 2048 as const;
export const MAX_EMBED_FIELD_NAME_LENGTH = 256 as const;
export const MAX_EMBED_FIELD_VALUE_LENGTH = 1024 as const;
export const MAX_COMPONENT_DESCRIPTION_LENGTH = 1024 as const;

export const V2_COMPONENT_TYPE_VALUES = [9, 10, 11, 12, 13, 14, 17] as const;
export const MAX_COMPONENTS_DISPLAYABLE_TEXT = 4000 as const;
export const MAX_TOTAL_COMPONENTS = 40 as const;
export const IS_COMPONENTS_V2_FLAG = (1 << 15) as 32768;

export const MIN_NAME_LENGTH = 1 as const;
export const MAX_NAME_LENGTH = 80 as const;
export const MAX_EMBEDS = 10 as const;
export const MAX_MESSAGE_NAME_LENGTH = 32 as const;
export const MAX_EMBED_FIELDS = 25 as const;
export const MAX_ACTION_ROW_BUTTONS = 5 as const;
export const MAX_SECTION_TEXT_COMPONENTS = 3 as const;
export const MAX_MEDIA_GALLERY_ITEMS = 10 as const;
export const MAX_BUTTON_LABEL_LENGTH = 80 as const;
export const MAX_TEXT_DISPLAY_CONTENT_LENGTH = 4000 as const;
