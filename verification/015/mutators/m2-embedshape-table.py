import os
import sys

MUTANTS = {
    'thumbnail-url-unchecked': ('src/server/api/utils/shapes.ts',
        "thumbnail: z.object({\n    url: z.string().trim().url(),", "thumbnail: z.object({\n    url: z.string().trim(),"),
    'image-url-unchecked': ('src/server/api/utils/shapes.ts',
        "image: z.object({\n    url: z.string().trim().url(),", "image: z.object({\n    url: z.string().trim(),"),
    'author-icon-unchecked': ('src/server/api/utils/shapes.ts',
        "    url: z.string().trim().url().optional(),\n    icon_url: z.string().trim().url().optional(),\n  }).optional(),\n  url:",
        "    url: z.string().trim().url().optional(),\n    icon_url: z.string().trim().optional(),\n  }).optional(),\n  url:"),
    'author-url-unchecked': ('src/server/api/utils/shapes.ts',
        "    url: z.string().trim().url().optional(),\n    icon_url: z.string().trim().url().optional(),\n  }).optional(),\n  url:",
        "    url: z.string().trim().optional(),\n    icon_url: z.string().trim().url().optional(),\n  }).optional(),\n  url:"),
    'footer-icon-unchecked': ('src/server/api/utils/shapes.ts',
        "    text: z.string().trim().max(MAX_EMBED_FOOTER_TEXT_LENGTH),\n    icon_url: z.string().trim().url().optional(),",
        "    text: z.string().trim().max(MAX_EMBED_FOOTER_TEXT_LENGTH),\n    icon_url: z.string().trim().optional(),"),
    'thumbnail-required': ('src/server/api/utils/shapes.ts',
        "thumbnail: z.object({\n    url: z.string().trim().url(),\n  }).optional(),", "thumbnail: z.object({\n    url: z.string().trim().url(),\n  }),"),
    'image-required': ('src/server/api/utils/shapes.ts',
        "image: z.object({\n    url: z.string().trim().url(),\n  }).optional(),", "image: z.object({\n    url: z.string().trim().url(),\n  }),"),
    'author-icon-required': ('src/server/api/utils/shapes.ts',
        "    url: z.string().trim().url().optional(),\n    icon_url: z.string().trim().url().optional(),\n  }).optional(),\n  url:",
        "    url: z.string().trim().url().optional(),\n    icon_url: z.string().trim().url(),\n  }).optional(),\n  url:"),
    'author-url-required': ('src/server/api/utils/shapes.ts',
        "    url: z.string().trim().url().optional(),\n    icon_url: z.string().trim().url().optional(),\n  }).optional(),\n  url:",
        "    url: z.string().trim().url(),\n    icon_url: z.string().trim().url().optional(),\n  }).optional(),\n  url:"),
    'footer-icon-required': ('src/server/api/utils/shapes.ts',
        "    text: z.string().trim().max(MAX_EMBED_FOOTER_TEXT_LENGTH),\n    icon_url: z.string().trim().url().optional(),",
        "    text: z.string().trim().max(MAX_EMBED_FOOTER_TEXT_LENGTH),\n    icon_url: z.string().trim().url(),"),
    'colour-ceiling-lowered': ('src/server/api/utils/shapes.ts',
        "\n  color: z.number().int().min(0).max(0xffffff)", "\n  color: z.number().int().min(0).max(0xfffff)"),
    'colour-zero-refused': ('src/server/api/utils/shapes.ts',
        "\n  color: z.number().int().min(0).max(0xffffff)", "\n  color: z.number().int().positive().max(0xffffff)"),
    'title-required': ('src/server/api/utils/shapes.ts',
        "title: z.string().trim().max(MAX_EMBED_TITLE_LENGTH).optional(),", "title: z.string().trim().max(MAX_EMBED_TITLE_LENGTH),"),
    'author-bound-80': ('src/utils/limits.tsx',
        "name.length > MAX_EMBED_AUTHOR_NAME_LENGTH", "name.length > MAX_NAME_LENGTH"),
    'title-text-name': ('src/utils/limits.tsx',
        "error = 'Title is too long.'", "error = 'Name is too long.'"),
    'footer-constant-256': ('src/constants/messageLimits.ts',
        "MAX_EMBED_FOOTER_TEXT_LENGTH = 2048", "MAX_EMBED_FOOTER_TEXT_LENGTH = 256"),
    'ingress-colour-truthy': ('src/utils/discordResponseToMessage.ts',
        "if (e.color !== undefined)", "if (e.color)"),
    'border-colour-truthy': ('src/components/DiscordMessageEditor/components/EmbedEditor/index.tsx',
        "color != null ? intToHex(color)", "color ? intToHex(color)"),
}

mutant_id = os.environ['MUT_ID']
path, old, new = MUTANTS[mutant_id]
source = open(path).read()
if source.count(old) != 1:
    sys.exit(f'mutant {mutant_id}: target found {source.count(old)} times')
open(path, 'w').write(source.replace(old, new))
