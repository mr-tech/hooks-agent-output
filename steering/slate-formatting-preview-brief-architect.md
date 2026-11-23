# Brief — architect-slate-formatting-preview

Duties negated: none.

From: `steering-hooks-fixer`. Return channel: SendMessage to `steering-hooks-fixer` for your recommendation and any owner-needing item.
No planner exists yet for this effort; the planner mints its ID after your recommendation and his answer.

**The question (his selection, effort rulings `/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`, block
"2026-11-23T13:09Z"):** should the website's message preview use Discord's published formatter, `@discord/markdown-wasm` (MIT) and its
rendering companion `@discord/markdown-react`, instead of keeping its own formatting rules and testing them against Discord? Or should
the site keep its own rules, with Discord's formatter only as the test reference? Weigh both and recommend one. Steering puts your
recommendation to him as a prompt, and the planner sizes the effort from his answer.

**Read first:**
- The research: `/usr/local/bin/hooks/agent-output/research/slate-formatting-discord-oracle-2026-11-23.md` (record `2db3cc2f`), whole.
  OQ-4 there is this question. V-21/V-22 and section 4 (Discord's text box formats differently from its rendered message) bear on the
  editor side.
- The effort's scoping: the same rulings file, blocks "2026-11-23T09:07Z" to "09:18Z" (his words, the Discord-parity standard, the
  determination), and the inventory `verification/slate-formatting-effort/scoping/inventory.md`.
- His standard where the two Discord formatters disagree (block 13:09Z): match only where both agree, and list the rest as known
  differences. Under that rule the site matches neither formatter alone, so weigh what "use it" means for the disagreeing cases.
- His ruling 09:17Z: Discord's own bundle may run in tests, fetched at test time, never committed or shipped. A published npm package
  is a different object; whether shipping it in the product is acceptable is part of your weighing (licence, bundle size, release
  churn: the package's output format changed in its last release).
- The evergreen record `agent-output/architecture/system-architecture.md` and any `agent-output/architecture/website.md`.

**Weigh at least:** what each option costs and removes in the website (preview renderer, Slate editor decorations, the save path's
markdown), how each serves "agree-only", dependency and release risk, and what the fuzzer must cover under each.

**Limits:** read-only on every source repository; the website tree is held by another chain (`chain/fix-normalize-fence-loop`), so don't
switch it, and read other SHAs from a `git archive` export. No plan or ID. A call stopped by a control: stop and message
`steering-hooks-fixer`, never re-issue; the record says only "not completed". Your document goes where your definition puts it.
Usage: `weekly_all` 6% (live, 09:40Z).
