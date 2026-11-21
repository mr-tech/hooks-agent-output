# Leave prompt and field-name probe — results (QA's own look, 2026-11-21 ~11:22-11:25Z)

Instrument: `leave-prompt-and-field-probe.js` (this folder). Builds: FIX `b68f94c` on 127.0.0.1:3100, BASE `b663b35` on
127.0.0.1:3101 (`fix/meta.txt`, `base/meta.txt`). Chrome (Playwright MCP, kept profile), 1440x900 viewport.

| Run | Build | Action | Predicted | Observed (verbatim from the tool result) |
|---|---|---|---|---|
| A | FIX | field name: type " QA three", reload with editor open | leave prompt; text back | Modal state `["beforeunload" dialog with message ""]` on the reload (accepted). After the fresh load (`performance` navigation type `navigate`, 6396 ms old): field button text tail `"  Familiar Tools QA three"`, `messageDrafts` contains `Familiar Tools QA three`: `true`. |
| B | BASE | same | no prompt; text lost | `{"base_typing_tail":"_ Familiar Tools QA three","base_field_after_reload":"  Familiar Tools","note":"reached here = no dialog blocked the reload"}` |
| C | BASE | type " QA five", click away, reload | prompt (positive control) | Modal state `["beforeunload" dialog with message ""]` (accepted). |

B and C together show the dialog instrument discriminates in both directions on one build. The synthetic-event probe
first tried read `false` in every cell, including A and C, and is withdrawn (see the probe file's header).
