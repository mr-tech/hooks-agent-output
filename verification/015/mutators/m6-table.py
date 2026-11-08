import os
import sys

E = 'src/components/DiscordMessageEditor/'
C = E + 'components/'
RULES = 'src/utils/markdown/rules.tsx'
EMOJI = 'src/utils/markdown/emoji.tsx'
SPOILER = 'src/utils/markdown/components/MarkdownSpoiler.tsx'
IMG = 'src/utils/isValidImageUrl.ts'
MAPS = 'src/utils/maps/UpsertMapMap.ts'
LIMITS = 'src/utils/limits.tsx'
INDEX = E + 'index.tsx'
EMBED = C + 'EmbedEditor/Embed.tsx'
FIELDS = C + 'EmbedEditor/EmbedFields.tsx'
FOOTER = C + 'EmbedEditor/EmbedFooter.tsx'
PICKER = C + 'EmbedEditor/ColorPicker/Picker.tsx'
AUTHOR = C + 'Author.tsx'
ROW = C + 'ComponentEditors/ActionRowEditor.tsx'
GALLERY = C + 'ComponentEditors/MediaGalleryEditor.tsx'
SECTION = C + 'ComponentEditors/SectionEditor.tsx'
CONTAINER = C + 'ComponentEditors/ContainerEditor.tsx'
SPLICE = 'next.splice(idx + 1, 0, clone);'
GRAND = "        if ('components' in child && Array.isArray(child.components)) {\n          count += child.components.length;\n        }\n"
ADD = "[...components, factory() as EditableTopLevelComponent],"

PORTAL = 'src/components/BottomPortal.tsx'
CPICK = C + 'EmbedEditor/ColorPicker/index.tsx'
MUTANTS = {
    'm6l-count-error-computed-once': (INDEX, "const componentCountError = validateComponentCount(components);", "const componentCountError = useMemo(() => validateComponentCount(components), []);", 1),
    'm6l-count-error-only-when-editing': (INDEX, "<NullableComponent show={componentCountError}>", "<NullableComponent show={isEditing && componentCountError}>", 1),
    'm6d-displayed-fields-or': (FIELDS, ".filter(({ field: { name, value } }) => showEdit || (name && value))", ".filter(({ field: { name, value } }) => showEdit || (name || value))", 1),
    'm6a-paragraph-splits-fence': (RULES, "((?:${FENCE}|[^\\\\n]|", "((?:[^\\\\n]|", 1),
    'm6e-bottomportal-cleanup-dropped': (PORTAL, "  useEffect(() => () => {\n    setChildrenProps((prev) => (\n", "  useEffect(() => () => {\n    if (id) return;\n    setChildrenProps((prev) => (\n", 1),
    'm6e-colorpicker-cleanup-dropped': (CPICK, "useEffect(() => () => removeBlockStyle(), []);", "useEffect(() => () => {}, []);", 1),
    'm6a-content-single-line': (RULES, "([^\\n][^]*?)\\n*```/i)(source", "([^\\n]+?)\\n*```/i)(source", 1),
    'm6b-substring-match': (IMG, "path.endsWith(ext)", "path.includes(ext)", 1),
    'm6b-case-sensitive': (IMG, ".toLowerCase()", "", 1),
    'm6b-query-kept': (IMG, "url.split(/[?#]/, 1)[0]", "url.split(/#/, 1)[0]", 1),
    'm6b-fragment-kept': (IMG, "url.split(/[?#]/, 1)[0]", "url.split(/\\?/, 1)[0]", 1),
    'm6b-jpeg-dropped': (IMG, "'jpg', 'jpeg', 'webp'", "'jpg', 'webp'", 1),
    'm6b-webp-dropped': (IMG, "'jpeg', 'webp', 'gif'", "'jpeg', 'gif'", 1),
    'm6b-avif-added': (IMG, "'tiff', 'webm']", "'tiff', 'webm', 'avif']", 1),
    'm6c-no-fields-counts-valid': (EMBED, "return !!fields?.some((field) => field.name && field.value);", "return !fields?.length || fields.some((field) => field.name && field.value);", 1),
    'm6c-name-or-value': (EMBED, "field.name && field.value);", "field.name || field.value);", 1),
    'm6d-set-field-first-slot': (FIELDS, "setField={actions[idx].setField}", "setField={actions[0].setField}", 1),
    'm6d-delete-first-slot': (FIELDS, "onDelete={actions[idx].delete}", "onDelete={actions[0].delete}", 1),
    'm6d-move-left-shifted': (FIELDS, "moveLeft={idx === 0 ? undefined", "moveLeft={idx === 1 ? undefined", 1),
    'm6d-move-right-shifted': (FIELDS, "moveRight={idx === fields.length - 1 ?", "moveRight={idx === fields.length ?", 1),
    'm6d-index-after-filter': (FIELDS, "        .map((entry, idx) => ({ ...entry, idx }))\n        .filter(({ field: { name, value } }) => showEdit || (name && value))\n        .map(({ gridColumn, field, idx }) => (", "        .filter(({ field: { name, value } }) => showEdit || (name && value))\n        .map(({ gridColumn, field }, idx) => (", 1),
    'm6e-timeout-not-cleared': (AUTHOR, "      clearTimeout(timeout);\n", "", 1),
    'm6e-interval-not-cleared': (AUTHOR, "      clearInterval(interval);\n", "", 1),
    'm6e-clock-never-ticks': (AUTHOR, "interval = setInterval(() => { setTs(new Date()); }, MINUTE_IN_MILLISECONDS);", "interval = setInterval(() => {}, MINUTE_IN_MILLISECONDS);", 1),
    'm6f-truthiness-nonblack-fallback': (PICKER, "intToHex(initColor ?? 0)", "(initColor ? intToHex(initColor) : '#ffffff')", 1),
    'm6f-unpadded': (PICKER, "intToHex(initColor ?? 0)", "`#${(initColor ?? 0).toString(16)}`", 1),
    'm6f-undefined-is-white': (PICKER, "intToHex(initColor ?? 0)", "intToHex(initColor ?? 0xffffff)", 1),
    'm6g-sort-removed': (EMOJI, "    .sort((a, b) => b.length - a.length)\n", "", 1),
    'm6g-sort-ascending': (EMOJI, "b.length - a.length", "a.length - b.length", 1),
    'm6g-sort-one-argument': (EMOJI, ".sort((a, b) => b.length - a.length)", ".sort((surrogate) => -surrogate.length)", 1),
    'm6h-aria-inverted': (SPOILER, "aria-expanded={isVisible}", "aria-expanded={!isVisible}", 1),
    'm6i-embed-copy-before': (INDEX, "newEmbeds.splice(idx + 1, 0, newEmbed);", "newEmbeds.splice(idx, 0, newEmbed);", 1),
    'm6i-component-copy-before': (INDEX, "next.splice(idx + 1, 0, clone);", "next.splice(idx, 0, clone);", 1),
    'm6i-actionrow-copy-last': (ROW, SPLICE, "next.push(clone);", 1),
    'm6i-gallery-copy-last': (GALLERY, SPLICE, "next.push(clone);", 1),
    'm6i-section-copy-last': (SECTION, SPLICE, "next.push(clone);", 1),
    'm6i-container-copy-last': (CONTAINER, SPLICE, "next.push(clone);", 1),
    'm6j-footer-text-unguarded': (FOOTER, "footer?.text?.trim()", "footer?.text.trim()", 1),
    'm6k-delete-without-inner-key-noop': (MAPS, "if (innerKey === undefined) this.#map.delete(key);", "if (innerKey === undefined) this.#map.get(key);", 1),
    'm6k-falsy-inner-key-is-absent': (MAPS, "if (innerKey === undefined)", "if (!innerKey)", 1),
    'm6l-comparator-at-limit': (LIMITS, "total > MAX_TOTAL_COMPONENTS ?", "total >= MAX_TOTAL_COMPONENTS ?", 1),
    'm6l-nesting-recursion-removed': (LIMITS, GRAND, "", 1),
    'm6l-top-accessory-uncounted': (LIMITS, "if ('accessory' in c && c.accessory) count += 1;\n    if ('components' in c", "if ('components' in c", 1),
    'm6l-child-accessory-uncounted': (LIMITS, "        if ('accessory' in child && child.accessory) count += 1;\n", "", 1),
    'm6l-validate-message-skips-count': (LIMITS, "  if (componentCountError) return componentCountError;\n", "", 1),
    'm6l-error-names-limit-not-total': (LIMITS, "`Message has ${total} components;", "`Message has ${MAX_TOTAL_COMPONENTS} components;", 1),
    'm6l-editor-line-missing': (INDEX, "{componentCountError}</div>", "{''}</div>", 1),
    'm6l-editor-border-missing': (INDEX, "(embedCharacterError || v2TextError || componentCountError) && styles.errorBorder", "(embedCharacterError || v2TextError) && styles.errorBorder", 1),
    'm6l-editor-offers-at-limit': (INDEX, "totalComponentCount < MAX_TOTAL_COMPONENTS", "totalComponentCount <= MAX_TOTAL_COMPONENTS", 1),
    'm6l-editor-counts-top-level-only': (INDEX, "const totalComponentCount = countTotalComponents(components);", "const totalComponentCount = components.length;", 1),
    'm6l-editor-add-refused-near-limit': (INDEX, ADD, "totalComponentCount + 2 > MAX_TOTAL_COMPONENTS ? components : " + ADD, 1),
    'm6l-actionrow-add-stricter': (ROW, "if (latestRow.current.components.length >= MAX_ACTION_ROW_BUTTONS) return;\n    setRow", "if (latestRow.current.components.length >= MAX_ACTION_ROW_BUTTONS - 1) return;\n    setRow", 1),
    'm6l-section-add-stricter': (SECTION, "    if (latest.current.components.length >= MAX_SECTION_TEXT_COMPONENTS) return;\n    setSection({\n      ...latest.current,\n      components: [...latest.current.components, createTextDisplay()],", "    if (latest.current.components.length >= MAX_SECTION_TEXT_COMPONENTS - 1) return;\n    setSection({\n      ...latest.current,\n      components: [...latest.current.components, createTextDisplay()],", 1),
}

mid = os.environ['MUT_ID']
path, old, new, count = MUTANTS[mid]
src = open(path).read()
if src.count(old) != count:
    print('MUTATOR FAILED: %s matched %d times, expected %d' % (mid, src.count(old), count))
    sys.exit(1)
open(path, 'w').write(src.replace(old, new))
print('mutated', mid)
