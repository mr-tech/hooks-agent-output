# Refutation at website `af3d95a` — image address dialog (fix-image-uploader-url)

Run by a `general-purpose-sonnet` refutation helper for `steering-hooks-fixer`, 2026-11-23 (about 15:5xZ). It was briefed with the claims
alone. Clean export of `af3d95a`; `pnpm install --frozen-lockfile` exit 0. The real `ImageUploader` was mounted in a jsdom vitest test
(`createRoot`, `act`), with the global `Image` replaced by a hand-resolved fake. Save was a click with `detail: 0`; Enter went through the
repo's `helpers/enter`. Command: `npx vitest run --project dom src/components/__tests__/ImageUploader.refute.test.tsx` under
`systemd-run --user --scope -p MemoryMax=6G`, which reported 6 passed and **exit 0**. The throwaway test logs only and asserts only in the
control; it was never committed.

| Claim | Result |
|---|---|
| (a) Type A, then B, and B loads before A: the box shows B, the preview ends on A, and Save commits A | NOT REFUTED |
| (b) A loads, then unloadable text: the error shows, Save stays enabled, and Save or Enter commits A | NOT REFUTED |
| (c) With X saved, type Y, Cancel, then reopen: the box shows Y, and Save commits Y | NOT REFUTED |
| Control: type A, load A, Save commits what the box shows | holds |

Evidence (the helper's `evidence.txt`, verbatim):

```
CONTROL box= https://example.com/a.png preview= https://example.com/a.png saveDisabled= false
CONTROL save calls= [["https://example.com/a.png"]]
A box= https://example.com/b.png preview= https://example.com/a.png err= 
A save calls= [["https://example.com/a.png"]]
A2 (only B loaded) box= https://example.com/b.png preview= https://example.com/b.png
A2 (A later) box= https://example.com/b.png preview= https://example.com/a.png
B box= not an image preview= https://example.com/a.png err= Invalid url. saveDisabled= false
B Save calls= [["https://example.com/a.png"]]
B Enter calls= [["https://example.com/a.png"]] err= Invalid url.
C after cancel onClose= 1
C reopened box= https://example.com/y.png preview= https://example.com/y.png
C save calls= [["https://example.com/y.png"]]
```

Caveats (the helper's): (b) used `not an image`, which fails the extension check ("Invalid url.") without constructing `Image`. A
well-formed `.png` that fails to load takes the "Image not found." branch, which also leaves the old `localImage`; that is read from code,
not run. (c) used a parent that sets `isOpen` back to true, with the component staying mounted (`unmount={false}`).
