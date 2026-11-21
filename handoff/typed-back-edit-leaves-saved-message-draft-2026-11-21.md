---
UUID: ffab0db5
Status: Open
Status-Detail: "Pre-existing, seen before and after fix-desktop-draft-as-typed: on a saved message, typing an edit back to the saved text and clicking away leaves the draft, and a reload still raises the leave prompt. One mechanism is read: an emptied author name stays {name:''}. A second, content-only case is unexplained. Blocks nothing; owed to the planner as a scoping input."
Owning-Stage: planner
Review-Trigger: "when the next website editing or data-loss effort is scoped, when EmbedAuthor.tsx's setName or the MessageProvider draft effect is next edited, or when a user report of a leave-page prompt or a restored draft on a message they did not change reaches the owner or a stage"
---

# A typed-back edit leaves the saved-message draft and the leave prompt

## What is seeded

On a saved message (`/message/m/<id>/edit`), a user can edit a field and then type it back to its saved text and click away.
The message should then equal the saved one, so the draft should be removed and a reload should not prompt. In production it
does not:
- the draft entry for the message stays in `localStorage.messageDrafts`;
- a reload raises the "Changes you made may not be saved." prompt;
- the next load restores the draft.

The fixer chain's change did not cause this. Production's build without the fix (`b663b35`) behaves the same, and so does the
fixed build (`b68f94c`).

The draft effect removes the draft only when the data is deeply equal to the saved data:
`typedDeepEqual(savedMessage?.data, message.data)` in the `[message]` effect of `src/providers/MessageProvider/index.tsx`.
`hasChanged` uses the same comparison, and it drives the prompt through `useUnloadAlert`. Any structural leftover therefore
keeps both the draft and the prompt.

Two cases are observed:

1. **Emptied author name (mechanism read).** `EmbedAuthor.tsx` `setName` is `setAuthor((prevAuthor) => ({ ...prevAuthor,
   name: value }))`. Committing an empty name to an embed that had no `author` therefore leaves `author: { name: '' }` where
   the saved data has no `author` key. The fixed build reaches this per keystroke, through the `ContentEditable` `onChange`
   calling `setName`. The unfixed build reached it on blur: `newName !== author?.name` is `'' !== undefined`, so it calls
   `setName('')`. The read was taken on the fixed build: P-1's draft held `embeds[0].author = {"name":""}` for an author that
   is saved empty.
2. **Content-only type-back (mechanism NOT read).** In the pre-push baseline on the unfixed build, only the content was
   committed: " QA ctl" was typed, deleted with 7 Backspaces, and the editor was clicked away. The author name had been typed
   into but never committed, because the page was reloaded before blur. The content read back character-equal (tail codes
   `10,95,32,95`), yet the draft stayed and the reload prompted. Neither the leftover nor its cause was read. Content
   normalisation by Slate, or another field the editor rewrites on open or close, are candidates and nothing more.

What a plan would decide: whether an empty optional object (`author`, likely `footer` and its siblings too) is dropped back
to absent, or whether the equality check normalises such leftovers; and what case 2's leftover actually is.

## Evidence

- P-1 after-read on hooks.gg, message 6008, 11:37:10-11:37:19Z:
  `verification/fix-desktop-draft-as-typed/qa/p1-after-read.md`, Cleanup. The type-back left the draft holding
  `embeds[0].author = {"name":""}`.
- Pre-push baseline, unfixed build, 11:28:5xZ:
  `verification/fix-desktop-draft-as-typed/devops/baseline/production-baseline-2026-11-21.md`, Cleanup and "Side
  observation". This is case 2.
- Code read at website `b68f94c`: `EmbedAuthor.tsx` `setName` and the blur commit (`localUsername.trim()`,
  `newName !== author?.name`); `MessageProvider` `hasChanged` and the draft effect.
- Not read: the stored 6008 row itself; footer and other optional embed objects.

## Origin

`qa-fix-desktop-draft-as-typed` raised it as a side observation while reading P-1 of the fixer chain
`fix-desktop-draft-as-typed` (`handoff/closed/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md`, Result). It was routed
here on `steering-hooks`' instruction before the chain's closure.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T11:39 | qa-fix-desktop-draft-as-typed | Created on steering-hooks' instruction: cases 1 (mechanism read) and 2 (not read), Owning-Stage planner. |
