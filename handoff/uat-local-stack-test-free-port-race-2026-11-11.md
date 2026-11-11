---
UUID: 27ac53dc
Status: Open
Status-Detail: "The free-port helper in tools/uatLocalStack.test.js picks a port, releases it, and listens on it again later with no 'error' handler. If another process takes the port in between, the file hangs on EADDRINUSE until the runner's cap. This was seen once, at code review of fix-uat-local-stack-id-sequence. Nothing blocks on it; a run that hangs is repeated."
Owning-Stage: fixer or implementer (the next chain that edits tools/uatLocalStack.test.js), with qa judging adequacy
Review-Trigger: "when tools/uatLocalStack.test.js is next edited, or when a run of it next ends in EADDRINUSE or at a runner timeout"
---

# Handoff — `uatLocalStack.test.js`: free-port race hangs the file

## What is seeded

`tools/uatLocalStack.test.js` gets its loopback ports from `free` (module scope). `free` calls
`net.createServer().listen(0, '127.0.0.1')`, reads the port, closes the server and resolves with
the number. The suite stores that number (`port = await free()` in its `fresh` / `freshAt`
helpers) and uses it later in two ways:
- It writes the number into the stub env file's `DATABASE_URL`.
- It listens on the number itself, through `hold(p)` and the inline
  `server.listen(port, '127.0.0.1', resolve)` blocks in the "stub listener holds the port" cases.

None of these `listen` calls has an `error` handler. Between `close` and the later `listen`, any
other process on the box can bind that port. When one does, the `listen` emits an unhandled
`error` (EADDRINUSE), the awaited promise never resolves, and the file hangs until the runner's
timeout. A walk on this tool's stack is not affected; only the test run is.

Discharged when both hold:
- A port the suite listens on is held from the moment it is picked until the case is done. That
  means listening on 0 and keeping that server as the holder, not closing it and re-listening.
- Every `listen` in the file rejects on `error`, so a clash fails one case instead of hanging the
  file.

Falsity signature for the test of the fix: with a foreign listener deliberately bound to the port
`free` returned (between pick and use), the file must still end before the cap, either passing or
failing that one case. At `7d59233` it hangs.

## Evidence

- `verification/fix-uat-local-stack-id-sequence/code-review-round1-subentry1/suite-7d59233-attempt1-eaddrinuse.txt`
  is `node --test tools/uatLocalStack.test.js` at `7d59233` in a scratch export. It shows exit 124
  at the 300 s cap, tests 72, cancelled 1, and `EADDRINUSE ... address: '127.0.0.1', port: 40194`.
  The repeat run, `suite-7d59233.txt` in the same directory, gave 111/111, exit 0.
- Read at `7d59233`: `free` and `hold`, and the inline `server.listen(port, …)` cases, including
  "the URL's port held by a stub listener, no container …" and "the tool's container stopped while
  a stub holds the port …". `git diff 68d737f 7d59233 -- tools/uatLocalStack.test.js` touches none
  of them. The helper predates the chain.

## Origin

`code-review/fix-uat-local-stack-id-sequence-code-review.md`, Round 1 sub-entry 1, the INFO line
under "Findings (Round 1, all dispositioned)". Raised by
`code-reviewer-fix-uat-local-stack-id-sequence`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-11T20:09 | code-reviewer-fix-uat-local-stack-id-sequence | Opened from code review Round 1 sub-entry 1's INFO, at steering's request that the INFO's route be named by path |
