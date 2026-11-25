---
UUID: 612ecc22
Status: Open
Status-Detail: "Behaviour plan 019 shipped that no one read in a real browser, and where a user report about it is recorded. None holds the release."
Owning-Stage: "steering thread for the Slate formatting effort (steering-hooks-fixer)"
Review-Trigger: "the first user report about the editor or the preview after plan 019's release, or the editor rebuild's scoping, whichever comes first"
---

# Editor and preview behaviour not read in a real browser (plan 019)

## What is seeded

Each item names what would show it is wrong.

1. **Timestamp locale.** No walk read an `s` timestamp in the preview under a non-`en-US` browser language. Wrong if every viewer sees
   `en-US` text for `s` and `S` whatever the browser's language.
2. **Shift+Enter in a quote line.** UAT walked Enter and paste after a `> ` line, not Shift+Enter. Wrong if Shift+Enter carries the quote
   marker where Enter does not, or the reverse.
3. **Colouring cost.** The editor's per-edit colouring cost was never profiled in Chrome. Wrong if a 4,096-character multi-line unit takes
   over 16 ms to decorate, or typing visibly lags.
4. **An unsettled emoji.** After a key that crosses an unclean code fence an emoji can show as text; that the next keystroke settles it was
   not read in Chrome. Wrong if it stays plain text after a further key in the same run of lines, or the editor throws.
5. **Discord's native text box.** The editor's expected colours come from Discord's box code run under jsdom. No account on the native
   path has been seen (plan X-13). Wrong if such an account's box colours a case differently.

**Where a user report goes.** Plan 019 routed user reports to rows of its Exclusions table (X-13 to X-26) and to its QA register's report
list (emoji lifted differently from Discord; a continued quote that cannot be ended; a pause on a long input; an editor error or misplaced
character after a code-fence or `>>>` keystroke, or near inline code in a long message). Those documents are closed. A report is
recorded here, dated, with its text and who read it.

## Evidence

`qa/closed/019-slate-formatting-discord-engine-qa.md` (§ the register's user-report paragraph, § Assumption Not Checked);
`code-review/closed/019-slate-formatting-discord-engine-code-review.md` § Assumption Not Checked (Rounds 5, 6 and its sub-entry);
`planning/closed/019-slate-formatting-discord-engine.md` § Exclusions.

## Origin

Plan 019's closure at devops Stage 1: items whose only carrier was a chain document.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-25T16:53 | devops-019 | Written at Stage 1 closure from the chain's forward-item sweep. |
