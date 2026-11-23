# Walk results (TIP :3000, BASE :3001), page /message/m/0/edit
Save-request routes (message.upsert, message.delete, updateRecentMessageData) aborted at context level. Attempts seen in network list: TIP 0, BASE 0 (in-page counter not readable across calls).
| Step | TIP expected | TIP observed | TIP | BASE observed |
|1 set JSON|editor shows message|shown (a/b, t, d)|PASS|shown (a/b, t, d); Load dialog stayed open, closed with Cancel|
|2 open content editor|-|editor opened, text "a\nb"; closed on outside click|-|same|
|3 open title editor|-|title editor opened, TIP text ">>> t"|-|BASE text "t"|
|4 read JSON|content ">>> a\nb", title ">>> t"|content ">>> a\nb", title ">>> t"|PASS|content "> a\n> b", title "t"|
|5 set JSON|-|shown|-|shown|
|6 foo End x|editor shows foox|first click put caret on closing fence (x went after it); after second click on foo line: "foox"|PASS (second attempt)|same, "foox"|
|7 read JSON|"> a\n```\nfoox\n```"; 0 normalize errors|"> a\n```\nfoox\n```"; 0 normalize errors; 1 other error (hydration className mismatch)|PASS|"> a\n```\nfoox\n```"; 1 "Could not completely normalize" error; 2 hydration errors|
Evidence: evidence/{tip,base}-step4-read.json, evidence/{tip,base}-step7-read.json, evidence/tip-console-errors-only.txt, evidence/base-console-errors-only.txt, evidence/base-and-tip-console-errors.txt
Screenshots: /home/dev/.cache/ms-playwright-mcp/output/{tip,base}-step6.png
