# QA Phase 2 (chain 015), the 476c633 pass: M4-d non-JSON, M5-h, M5-i, M6-a, M6-b..l re-run additions, CR-24, M7.
# Selected by MUT_ID; each target must occur exactly once (else the mutator exits non-zero).
import os
import sys

ED = 'src/components/DiscordMessageEditor/index.tsx'
EF = 'src/components/DiscordMessageEditor/components/EmbedEditor/EmbedFields.tsx'
MD = 'src/utils/markdown/index.tsx'
RU = 'src/utils/markdown/rules.tsx'
PG = 'src/app/preview/page.tsx'
WM = 'src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx'
BP = 'src/components/BottomPortal.tsx'
CP = 'src/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/index.tsx'
VW = 'src/utils/hooks/useValidateWebhook.ts'
WP = 'src/providers/WebhookProvider.tsx'
CM = 'bot/scripts/app_commands/common.ts'
DE = 'bot/utils/DiscordEmbed.ts'

MUTANTS = {
    # M6-l (vi) live: the over-40 line is computed once, at mount.
    'm6l-error-frozen-at-mount': [(ED, 'const componentCountError = validateComponentCount(components);',
                                   'const componentCountError = useMemo(() => validateComponentCount(components), []);')],
    # M6-l (vi) /preview: the line shows only while editing.
    'm6l-line-only-when-editing': [(ED, '<NullableComponent show={componentCountError}>',
                                    '<NullableComponent show={isEditing && componentCountError}>')],
    # QAF-32: the read-only filter widened to "name or value".
    'm6d-filter-name-or-value': [(EF, 'showEdit || (name && value))', 'showEdit || (name || value))')],
    # M6-a: the title regains the code-block rule (static / interactive).
    'm6a-title-codeblock-static': [(MD, "parseEmbedTitle: staticParserFor(omit(staticWithoutLinks, ['codeBlock', 'heading', 'list'])),",
                                    "parseEmbedTitle: staticParserFor(omit(staticWithoutLinks, ['heading', 'list'])),")],
    'm6a-title-codeblock-interactive': [(MD, "parseEmbedTitle: interactiveParser(omit(interactiveWithoutLinks, ['codeBlock', 'heading', 'list'])),",
                                         "parseEmbedTitle: interactiveParser(omit(interactiveWithoutLinks, ['heading', 'list'])),")],
    # M6-a (CR-22): the paragraph rule splits a fence again.
    'm6a-paragraph-splits-fence': [(RU, r"(?:${FENCE}|[^\\n]|", r"(?:[^\\n]|")],
    # M6-a (F-38): the content group cannot cross a newline (the base's).
    'm6a-content-single-line': [(RU, r"\\n*([^\\n][^]*?)\\n*```", r"\\n*([^\\n]+?)\\n*```")],
    # M5-h: no error boundary; the fallback is blank; every member refused; the array conjunct dropped.
    'm5h-no-boundary': [(PG, '<ErrorBoundary fallback={invalidData}>', '<>'), (PG, '</ErrorBoundary>', '</>')],
    'm5h-blank-fallback': [(PG, '<ErrorBoundary fallback={invalidData}>', '<ErrorBoundary fallback={null}>')],
    'm5h-refuse-all': [(PG, '{data === null ? invalidData : (', '{true ? invalidData : (')],
    'm5h-array-allowed': [(PG, "if (typeof parsed !== 'object' || Array.isArray(parsed)) return null;",
                           "if (typeof parsed !== 'object') return null;")],
    # M5-i: the pick is ignored; the category is seeded once at mount (the base); each hasWebhooks conjunct dropped.
    'm5i-pick-ignored': [(WM, 'const selectedCategory = pickedCategory ?? (hasWebhooks',
                          'const selectedCategory = (hasWebhooks')],
    'm5i-seeded-at-mount': [(WM, "const [pickedCategory, setPickedCategory] = useState<null | string>(null);\n  const selectedCategory = pickedCategory ?? (hasWebhooks ? (guild?.id ?? '') : 'load');",
                             "const [pickedCategory, setPickedCategory] = useState<null | string>(hasWebhooks ? (guild?.id ?? '') : 'load');\n  const selectedCategory = pickedCategory as string;")],
    'm5i-no-auth-conjunct': [(WM, "const hasWebhooks = status === 'authenticated' && guildId && webhooks.length;",
                              "const hasWebhooks = guildId && webhooks.length;")],
    'm5i-no-guild-conjunct': [(WM, "const hasWebhooks = status === 'authenticated' && guildId && webhooks.length;",
                               "const hasWebhooks = status === 'authenticated' && webhooks.length;")],
    'm5i-no-count-conjunct': [(WM, "const hasWebhooks = status === 'authenticated' && guildId && webhooks.length;",
                               "const hasWebhooks = status === 'authenticated' && guildId;")],
    # CR-24: each cleanup does nothing.
    'cr24-portal-cleanup-noop': [(BP, "      prev.some((p) => p.id === id) ? prev.filter((p) => p.id !== id) : prev\n    ));\n  }, []);",
                                  "      prev\n    ));\n  }, []);")],
    'cr24-colour-cleanup-noop': [(CP, 'useEffect(() => () => removeBlockStyle(), []);', 'useEffect(() => () => {}, []);')],
    # M4-d non-JSON member: a body that is not JSON no longer reaches "Invalid URL" (dialog / send page).
    'm4d-dialog-nonjson-as-message': [(VW, '.then<DiscordWebhook | { message: string }>((res) => res.json()));',
                                       ".then<DiscordWebhook | { message: string }>((res) => res.json().catch(() => ({ message: 'Unknown' }))));")],
    'm4d-send-nonjson-as-object': [(WP, '(res.status === 200 ? res.json() : null)',
                                    '(res.status === 200 ? res.json().catch(() => ({})) : null)')],
    # M7: the gate, the user-command test, the timestamp assignment.
    'm7a-admin-only': [(CM, 'export const ADMIN_PERMS = PermissionFlagsBits.ManageGuild.toString();',
                        'export const ADMIN_PERMS = PermissionFlagsBits.Administrator.toString();')],
    'm7c-user-is-slash': [(CM, "  return commandType === 'user';", "  return commandType === 'slash';")],
    'm7b-timestamp-compared': [(DE, 'this.#payload.timestamp = timestamp;', 'this.#payload.timestamp === timestamp;')],
}

mutant_id = os.environ['MUT_ID']
edits = MUTANTS[mutant_id]
sources = {}
for path, old, _ in edits:
    sources.setdefault(path, open(path).read())
for path, old, new in edits:
    n = sources[path].count(old)
    if n != 1:
        sys.exit(f'mutant {mutant_id}: target in {path} found {n} times')
    sources[path] = sources[path].replace(old, new)
for path, text in sources.items():
    open(path, 'w').write(text)
