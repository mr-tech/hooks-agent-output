# QA's hand mutants for plan 016's effort-final sweep: coupling mutants (each conjunct of a compound
# predicate made the sole carrier), wiring mutants, positional mutants, constant and scheme-set
# members. Each `old` must occur exactly once in `file` at 395510e; the script checks that.
import json, subprocess, sys
L='src/utils/limits.tsx'; I='src/components/DiscordMessageEditor/index.tsx'
A='src/components/DiscordMessageEditor/components/Author.tsx'; P='src/app/preview/page.tsx'
T='src/components/DiscordMessageEditor/components/ComponentEditors/ThumbnailEditor.tsx'
G='src/components/DiscordMessageEditor/components/ComponentEditors/MediaGalleryEditor.tsx'
C='src/constants/messageLimits.ts'
M=[
# reach (isV2Message): each conjunct alone, and reach always / never
('qa-reach-structural-only', L, 'return hasStructuralV2 || hasFlagV2;', 'return hasStructuralV2;'),
('qa-reach-flag-only', L, 'return hasStructuralV2 || hasFlagV2;', 'return hasFlagV2;'),
('qa-v2-reach-always', L, "  if (!isV2Message(components, flags)) return '';\n  return asList", "  return asList"),
# whitespace-empty: each clause dropped
('qa-ws-no-feff-clause', L, "return !value.includes('\\uFEFF') && value.replace", "return value.replace"),
('qa-ws-no-u0085-strip', L, "value.replace(/\\u0085/g, '').trim() === ''", "value.trim() === ''"),
('qa-ws-nonstring-not-empty', L, "  if (typeof value !== 'string') return true;\n  return !value", "  if (typeof value !== 'string') return false;\n  return !value"),
# isMissing: each conjunct
('qa-missing-type-only', L, "typeof value !== 'string' || value.length === 0;", "typeof value !== 'string';"),
('qa-missing-empty-only', L, "typeof value !== 'string' || value.length === 0;", "(value as string)?.length === 0;"),
# url predicate
('qa-url-no-trim', L, 'z.string().trim().url()', 'z.string().url()'),
('qa-url-missing-check-dropped', L, "  if (isMissing(url)) return `${subject} has no ${noun}.`;\n", ""),
('qa-url-invalid-check-dropped', L, "  if (!requiredUrl.safeParse(url).success) return `${subject} has an invalid ${noun}.`;\n", ""),
# scheme set membership
('qa-scheme-drop-discord', L, "new Set(['http:', 'https:', 'discord:'])", "new Set(['http:', 'https:'])"),
('qa-scheme-add-ftp', L, "new Set(['http:', 'https:', 'discord:'])", "new Set(['http:', 'https:', 'discord:', 'ftp:'])"),
('qa-scheme-check-dropped', L, "  if (!LINK_BUTTON_SCHEMES.has(protocol)) return 'A link button URL must start with http, https or discord.';\n", ""),
# label/emoji conjunction: each conjunct sole carrier
('qa-label-only', L, "isWhitespaceEmpty(button.label) && !hasEmoji(button.emoji)", "isWhitespaceEmpty(button.label)"),
('qa-emoji-only', L, "isWhitespaceEmpty(button.label) && !hasEmoji(button.emoji)", "!hasEmoji(button.emoji)"),
('qa-emoji-id-only', L, "return !isMissing(id) || !isMissing(name);", "return !isMissing(id);"),
('qa-emoji-name-only', L, "return !isMissing(id) || !isMissing(name);", "return !isMissing(name);"),
('qa-emoji-object-present', L, "return !isMissing(id) || !isMissing(name);", "return emoji !== undefined;"),
# description
('qa-desc-empty-dropped', L, "  if (description === '') return `${subject} description is empty.`;\n", ""),
('qa-desc-whitespace-empty', L, "if (description === '') return", "if (isWhitespaceEmpty(description) && description !== undefined) return"),
('qa-desc-bound-1023', C, 'MAX_COMPONENT_DESCRIPTION_LENGTH = 1024 as const;', 'MAX_COMPONENT_DESCRIPTION_LENGTH = 1023 as const;'),
('qa-desc-bound-1025', C, 'MAX_COMPONENT_DESCRIPTION_LENGTH = 1024 as const;', 'MAX_COMPONENT_DESCRIPTION_LENGTH = 1025 as const;'),
('qa-image-desc-dropped', L, "  return urlReason(asObject(image.media).url, subject, 'image URL')\n    || descriptionReason(image.description, subject);", "  return urlReason(asObject(image.media).url, subject, 'image URL');"),
('qa-image-url-dropped', L, "  return urlReason(asObject(image.media).url, subject, 'image URL')\n    || descriptionReason(image.description, subject);", "  return descriptionReason(image.description, subject);"),
# section
('qa-section-children-empty-dropped', L, "      if (children.length === 0) return 'A Section has no Text Display.';\n", ""),
('qa-section-accessory-absent-dropped', L, "      if (!component.accessory) return 'A Section has no Thumbnail or button.';\n", ""),
('qa-section-children-unwalked', L, "      return children.map(componentReason).find(Boolean)\n        ?? (accessory", "      return undefined\n        ?? (accessory"),
('qa-section-accessory-unwalked', L, "?? (accessory.type === 2 ? linkButtonReason(accessory) : imageReason(accessory, 'A Thumbnail'));", "?? '';"),
('qa-section-accessory-dispatch-swapped', L, "accessory.type === 2 ? linkButtonReason(accessory)", "accessory.type !== 2 ? linkButtonReason(accessory)"),
# gallery / container / action row / file
('qa-gallery-empty-dropped', L, "      if (items.length === 0) return 'A Media Gallery has no items.';\n", ""),
('qa-gallery-first-item-only', L, "return items.map((item) => imageReason(item, 'A Media Gallery item')).find(Boolean) ?? '';", "return items.slice(0, 1).map((item) => imageReason(item, 'A Media Gallery item')).find(Boolean) ?? '';"),
('qa-container-empty-dropped', L, "      if (children.length === 0) return 'A Container is empty.';\n", ""),
('qa-container-unwalked', L, "      if (children.length === 0) return 'A Container is empty.';\n      return children.map(componentReason).find(Boolean) ?? '';", "      if (children.length === 0) return 'A Container is empty.';\n      return '';"),
('qa-row-empty-dropped', L, "      if (children.length === 0) return 'An Action Row has no buttons.';\n", ""),
('qa-row-unwalked', L, "      return children.map(linkButtonReason).find(Boolean) ?? '';", "      return '';"),
('qa-file-allowed', L, "      return 'A File component cannot be sent from the website.';", "      return '';"),
('qa-top-last-only', L, "  return asList(components).map(componentReason).find(Boolean) ?? '';", "  return asList(components).slice(-1).map(componentReason).find(Boolean) ?? '';"),
('qa-v2-not-called', L, "  const v2Error = validateV2Components(components, flags);\n  if (v2Error) return v2Error;\n", ""),
('qa-v2-flags-dropped', L, "const v2Error = validateV2Components(components, flags);", "const v2Error = validateV2Components(components);"),
# editor wiring
('qa-editor-line-dropped', I, "          <NullableComponent show={v2ComponentError}>\n            <div className=\"mt-1 text-xs font-semibold text-error\">{v2ComponentError}</div>\n          </NullableComponent>\n", ""),
('qa-editor-flags-dropped', I, "validateV2Components(components, message.flags)", "validateV2Components(components)"),
('qa-editor-border-no-v2', I, "|| componentCountError || v2ComponentError) && styles.errorBorder", "|| componentCountError) && styles.errorBorder"),
('qa-hide-nocontent-ignored', I, "const noContentError = hideValidation ? '' :", "const noContentError ="),
('qa-hide-embedchar-ignored', I, "const embedCharacterError = hideValidation ? '' :", "const embedCharacterError ="),
('qa-hide-v2text-ignored', I, "const v2TextError = hideValidation ? '' :", "const v2TextError ="),
('qa-hide-count-ignored', I, "const componentCountError = hideValidation ? '' :", "const componentCountError ="),
('qa-hide-v2comp-ignored', I, "const v2ComponentError = hideValidation ? '' :", "const v2ComponentError ="),
('qa-hide-default-true', I, "editableState, hideValidation = false, onMount", "editableState, hideValidation = true, onMount"),
('qa-hide-not-to-contentbody', I, "                && !!editableState?.showContentEditable}\n              hideValidation={hideValidation}\n", "                && !!editableState?.showContentEditable}\n"),
('qa-hide-not-to-v2-author', I, "                showEdit={!!editableState?.showContentEditable}\n                hideValidation={hideValidation}\n", "                showEdit={!!editableState?.showContentEditable}\n"),
('qa-author-hide-ignored', A, "const error = hideValidation ? '' : validateUsername(username);", "const error = validateUsername(username);"),
('qa-author-hide-default-true', A, "showEdit, hideValidation = false, setUsername", "showEdit, hideValidation = true, setUsername"),
('qa-page-no-hide', P, "                hideValidation\n", ""),
('qa-thumb-maxlength-dropped', T, "                maxLength={MAX_COMPONENT_DESCRIPTION_LENGTH}\n", ""),
('qa-gallery-maxlength-dropped', G, "                maxLength={MAX_COMPONENT_DESCRIPTION_LENGTH}\n", ""),
]
out=[]; bad=0
for mid,f,old,new in M:
    src=subprocess.run(['git','-C','/usr/local/bin/hooks/website','show',f'395510e:{f}'],capture_output=True,text=True,check=True).stdout
    n=src.count(old)
    if n!=1: print('NOT UNIQUE',mid,n); bad+=1
    out.append({'id':mid,'file':f,'old':old,'new':new})
json.dump(out,open(sys.argv[1],'w'),indent=1)
print(len(out),'hand mutants; non-unique',bad)
