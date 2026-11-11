# Code review round 1, sub-entry 1 captures — fix-uat-local-stack-id-sequence, Reviewed-At 7d59233

- `suite-7d59233.txt` — `node --test tools/uatLocalStack.test.js`, tool and test at `7d59233`, in a scratch export: exit 0, tests 111, pass 111.
- `suite-7d59233-attempt1-eaddrinuse.txt` — the first attempt at the same command: exit 124 at the 300 s cap, with EADDRINUSE on a port picked by the test file's free-port helper (listen on 0, close, listen again). That helper is unchanged since `68d737f`. The run was repeated once, giving the result above.
- `red-tool-71b61b9.txt` — tool at `71b61b9`, test file at `7d59233`: exit 1, tests 111, pass 106, fail 5. The 5 are the three non-seed order cases and the two new reuse cases with a low id.
- `reuse-low-id-probe.txt` — `../code-review-round1/reuse-low-id-probe.sh`, unedited, against the `7d59233` tool: the second `up` gives rc 1 with "the database holds stored message ids below 900000000000001 (count: 1)". `down` rc 0, 0 containers left. The script's own exit 1 comes from its last `grep -c .` over an empty listing.
- `convention-check.txt` — `convention-check.js --since=68d737f`: exit 0, 0 FAIL or CANDIDATE lines.
