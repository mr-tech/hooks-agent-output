# Scope sweep — `fix-embed-thumbnail-layout` (research H-6)

Written by `steering-hooks` 2026-11-22T02:3xZ from its sweep helper's returned findings (the helper returned them in its final message
instead of writing this file). All reads at website `origin/master` `132a7ab6f49d8a85ead507e2221ab3c3a531fd00` (`git ls-remote`), by
`git show` / `git grep`; nothing run, no browser.

Source row: `research/codebase-bug-evaluation-2026-11-08.md:173` — "`hasThumbnail` is inverted (`showEdit && !showEmbedThumbnailEditable`)
so the image/thumbnail grid layout is wrong in read-only mode." The row omits the code's `!!thumbnail?.url` term.

## The flag

`src/components/DiscordMessageEditor/components/EmbedEditor/Embed.tsx:102-108`:
`hasThumbnail={ !!thumbnail?.url && showEdit && !editableState?.showEmbedThumbnailEditable }` passed to `EmbedImage`.
Uses: `EmbedImage.tsx:51,56,113` (adds class `hasThumbnail` to the image's `discord-visualizer__embed-media`).
CSS (`src/app/_styles/visualizer.scss`): `.discord-visualizer__embed-media` `grid-column: 1/1` (581-585);
`.discord-visualizer__embed-media.hasThumbnail` `grid-column: 1 / 3` (630-632); `.discord-visualizer__embed-thumbnail` `grid-row: 1/8;
grid-column: 2/2` (571-579); container `discord-visualizer__embed--thumbnail` (set when `!!thumbnail?.url`, `EmbedEditor/index.tsx:95`)
`grid-template-columns: auto min-content` (635-638).

Truth table (T = thumbnail URL set, E = `showEdit`, Te = `showEmbedThumbnailEditable`): `hasThumbnail` = T && E && !Te.
- Read-only (E false), T: thumbnail rendered, container class set, `hasThumbnail` false → image stays in column 1 beside the thumbnail column.
- Edit, T, Te true (default): `hasThumbnail` false (same as read-only).
- Edit, T, Te false: `hasThumbnail` true — but Te is never set false in non-test code: `toggleEmbedThumbnailEditable` has no caller
  (`src/@types/global.d.ts:577`, `src/providers/MessageProvider/useEditableState.ts:15-17,50,67` only); `useToggleState(true)`.
So in non-test code at this SHA the `.hasThumbnail` spanning rule never applies on any surface. Whether that is "inverted" depends on the
intended layout, which no code comment or record states.

## Surfaces

- Preview page `src/app/preview/page.tsx:38-45` — no `editableState` → E false.
- `src/components/MessagePreview.tsx:56-66` (read-only) — callers `NewMessageModal.tsx:380-384`, `EditMessageMenu.tsx:50-53`,
  `send/page.tsx:283-286` → E false.
- Editor `src/app/message/m/[id]/edit/page.tsx:166-172` — E from `editableState.showEdit` (default true; View Mode toggles it), Te true.

## Discord's own layout

Not documented in the repo (no comment on it; class names only). Not browsed.

## Tests

`git grep -c 'hasThumbnail' <sha> -- 'src/**/__tests__/**'`: no matches. No test references the layout classes
(`embed-media|embed--thumbnail|embed-thumbnail|image-content`: no matches). 18 files mention "thumbnail" (mostly V2 Thumbnail
component tests); `EmbedEditor/__tests__/` has 7 files, 21 static call sites.

## Record

`agent-output` grep for `hasThumbnail`/`thumbnail` over architecture, research, handoff, planning: 88 lines; `hasThumbnail` only at the
H-6 row. Others concern the V2 Thumbnail accessory.

## Not seen

The rendered layout (no browser run); whether the image is meant to span both columns under a thumbnail (as Discord does — unverified
here); Discord's real rendering.
