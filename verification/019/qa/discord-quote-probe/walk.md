# Discord quote probe

Guild 1566742402180456559, channel #general 1566742403195469906. UTC 03:56-03:58 on 2026-11-24.
Sent (not deleted): step 1 message about 03:57:10Z, step 2 message about 03:57:29Z, both in #general.

The box and edit-box innerText hide the quote marker (Slate renders a blockquote bar), so a literal "> " cannot be read from the DOM. Raw text is inferred from the sent rendering.

| step | typed | box innerText | quote in box | sent | edit innerText |
|---|---|---|---|---|---|
| 1 | `> a` Shift+Enter `b` | a\nb | yes, both lines in blockquote | a and b in one quote | a\nb, both lines blockquote |
| 2 | `>>> a` Shift+Enter `b` | a\nb | yes, both lines in blockquote | a and b in one quote | a\nb, both lines blockquote |
| 3 | paste `> a\nb` | a\nb | line 1 quoted, line 2 plain | not sent | n/a |

## QA reading (qa-019, from the walker's table and screenshots step1-sent.png and step3-box.png)

- **The premise is refuted for Shift+Enter.** After `> a` and Shift+Enter, Discord's box puts the new line in the quote. A line
  that is not quoted is visibly possible in the same box, because step 3's paste leaves line 2 unquoted, so that step is the
  control. The sent message draws `b` inside the quote bar. Under Discord's single-line `> ` rule, `> a\nb` draws `b` outside
  it, so the message was sent as `> a\n> b`, or something that renders the same way.
- **Not read:** the sent message's raw content. The box and the edit box draw the marker as a bar and hide the characters. A
  REST read of message content (the two messages at about 03:57:10Z and 03:57:29Z in channel 1566742403195469906) would settle
  the exact text. This probe did not make one.
- Step 2 (`>>>`) cannot tell the two readings apart: `>>>` quotes to the end of the message whether or not anything was
  inserted.
- Paste does not continue the quote.
- Screenshots stay out of the commit, as the workspace's convention requires. They are in this folder on disk.
