# QA Phase 2 (chain 015, M2) supplementary mutants, for cases the implementer's table never reddens.
# Selected by MUT_ID; each target must occur exactly once.
import os
import sys

MUTANTS = {
    'colour-floor-dropped': ('src/server/api/utils/shapes.ts',
        "\n  color: z.number().int().min(0).max(0xffffff)", "\n  color: z.number().int().max(0xffffff)"),
    'colour-ceiling-raised': ('src/server/api/utils/shapes.ts',
        "\n  color: z.number().int().min(0).max(0xffffff)", "\n  color: z.number().int().min(0).max(0x1000000)"),
    'colour-int-dropped': ('src/server/api/utils/shapes.ts',
        "\n  color: z.number().int().min(0).max(0xffffff)", "\n  color: z.number().min(0).max(0xffffff)"),
    'footer-constant-2049': ('src/constants/messageLimits.ts',
        "MAX_EMBED_FOOTER_TEXT_LENGTH = 2048", "MAX_EMBED_FOOTER_TEXT_LENGTH = 2049"),
    'ingress-colour-always': ('src/utils/discordResponseToMessage.ts',
        "if (e.color !== undefined) embed.color = e.color;", "embed.color = e.color;"),
    'border-colour-fixed': ('src/components/DiscordMessageEditor/components/EmbedEditor/index.tsx',
        "color != null ? intToHex(color)", "color != null ? intToHex(0)"),
}

mutant_id = os.environ['MUT_ID']
path, old, new = MUTANTS[mutant_id]
source = open(path).read()
if source.count(old) != 1:
    sys.exit(f'mutant {mutant_id}: target found {source.count(old)} times')
open(path, 'w').write(source.replace(old, new))
