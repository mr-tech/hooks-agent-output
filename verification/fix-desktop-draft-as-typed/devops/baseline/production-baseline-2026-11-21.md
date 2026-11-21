# Production baseline before the push — desktop typing and reload on hooks.gg (unfixed build)

Taken by `qa-fix-desktop-draft-as-typed` at devops's request (`devops-fix-desktop-draft-as-typed`, SendMessage), before the
website `master` push of `b68f94c`. Chrome on the kept profile (Playwright MCP), viewport 1440x900, signed in to hooks.gg as
the Discord test account (`/api/auth/session` returned a user; nothing of it recorded). **No Save, Send or other production
write**: typing, clicking away, and reloads only. Every reload was an in-tab `page.goto` of the same URL. Leave-prompt
instrument: the real `beforeunload` dialog. No dialog handler was registered, so a dialog shows as the MCP's modal state on
the run, and a run that returned its string met no dialog. The serving build was not read (no cheap build id on the page).

**Subject.** I tried message 6024 (017's B-9 id) first. hooks.gg answered "This message doesn't exist, or you don't have
access to it." to this account. Among the test account's recent messages (`/message`: 6012, 6010, 6008, 5996, 6009, 6011),
6008 is a classic message with content and two embeds, each with an author-name field. Its saved author name is empty. 6012,
6009 and 6011 are Components V2 messages, and 6010 has no embed. **6008** was used. Before the run the local `messageDrafts`
held `6020` and `0:vqjq7pvgfv` (not mine; left untouched) and no `6008`.

| # | UTC | Action on `/message/m/6008/edit` | Prediction (unfixed) | Observed |
|---|---|---|---|---|
| 1 | 11:28:12-11:28:20Z | open the content editor, Control+End, type " QA base one", reload with the editor open | text lost, no prompt | Editor tail while typing: `y to help you!\n_ _ QA base one`. No `6008` draft while typing. **No dialog.** After reload the content tail is `server and we'll be happy to help you!\n ` (**lost**), and the drafts are still `6020`, `0:vqjq7pvgfv`. |
| 2 | 11:28:29-11:28:33Z | first embed author name (saved empty): type " a b", reload with the field focused | text lost, no prompt | Text while typing `" a b"`, caret `focusOffset` 4 (at the end). No `6008` draft. **No dialog.** After reload the author name is `""` (**lost**). |
| 3 | ~11:28:40Z | **positive control**: content editor, type " QA ctl", click away (base commits on close), reload | prompt | **`["beforeunload" dialog with message ""]`** (accepted). After reload a `6008` draft holds `QA ctl`, and the content shows `… help you!\n  QA ctl`. |

Rows 1-2 against row 3: on one build and one message, the instrument reads "no prompt" for typing alone and "prompt" for a
committed edit. Both directions are observed.

**Cleanup (local only).**
- 11:28:5xZ: I deleted the 7 typed characters and clicked away. The content returned to `… help you!\n_ _` (char codes end
  `10,95,32,95`). The `6008` draft stayed, and the next reload still raised the leave prompt, which I accepted. So the page
  still judged the message changed. I did not find out what it compared.
- 11:29:14Z: I removed the `6008` entry, the one my control created, from `localStorage.messageDrafts`, and left the other
  two entries as they were. Reloads at 11:29:25Z and 11:29:32Z followed. The second raised **no dialog**. Drafts were
  `6020`, `0:vqjq7pvgfv`, the content tail was `… help you!\n `, and the author name was `""`, the same as before the run.
- The saved message on the server was never written (no Save).

**Side observation (not this chain's).** On the unfixed build, deleting a typed suffix and clicking away left message 6008
"changed" by the page's comparison, with a draft and a leave prompt, although the content text read back equal. Nothing
here establishes the cause.
