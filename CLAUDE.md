# Hooks workspace

`/usr/local/bin/hooks` is a workspace of four sibling repositories. It is **not itself a git
repository** — every git command against a repo in this workspace must be run as `git -C <repo>
...` (there is no ambient repo to run a bare `git` command against).

| Repo | Carries tests? |
|---|---|
| `website` | **Yes** — the only tested repo in this workspace. See Test Conventions below. |
| `project-utils` | No. |
| `preview-image-generator` | No. |
| `agent-output` | No product tests. This is the workspace's own planning/analysis/QA/implementation record; its record tools under `tools/` carry their own `node --test` files. |

This file is canonical at `agent-output/CLAUDE.md` and appears at the workspace root only as a
symlink. If the root symlink is ever missing, recreate it (do not copy the file):

```sh
ln -s agent-output/CLAUDE.md /usr/local/bin/hooks/CLAUDE.md
```

The symlink itself is not tracked by any repo.

## Test Conventions (`website`)

Runner: vitest, in four projects. `node` and `dom` are the offline suite. `discord-node` and `discord-dom` are the Discord
comparisons: every test under a `__tests__/discord/` directory, which the offline projects exclude. Commands, run from `website/`:

```sh
pnpm test                # the offline suite: projects node and dom
pnpm test:discord        # the Discord comparisons: projects discord-node and discord-dom; needs the network
npx vitest run --project node --project dom --reporter=json --outputFile=/tmp/report.json  # machine-readable capture, offline suite
pnpm run typecheck       # BOTH tsc programs, see below
```

A bare `npx vitest run` (no `--project`) runs all four projects, the Discord comparisons included. Name the projects whenever a run
is meant to be the offline suite.

**A green pass set is not a green run — record the process exit code beside the counters.** A
vitest run can report every case passed in its JSON summary and still exit non-zero (a post-teardown
unhandled rejection is invisible to the per-case counters but fails the process). Any comparison
that leans on "the suite still passes" is satisfied only when the exit code is also 0.

**`pnpm run typecheck` runs two `tsc` programs, and the base one does not see test files.** The
production `tsconfig.json` excludes `**/__tests__`, so a bare `tsc --noEmit` type-checks none of the
test suite; `tsconfig.test.json` is the only program that type-checks anything under `__tests__/`.
Use the repo's own `typecheck` script, never a bare `tsc --noEmit`, when a change touches a test file
or a test helper.

### Placement and naming

Tests live beside the code they cover, under `__tests__/`:
`src/**/__tests__/<module>.<behaviour>.test.ts[x]`, where `<module>` is the production module's own
basename (hyphens admitted, e.g. `interactions-edge`). Test helpers live under
`src/**/__tests__/helpers/` — **never** a top-level `src/test-helpers/` or similar: the production
`tsconfig.json` includes `src/**/*.ts` and excludes only `**/__tests__`, so anything outside that
excluded directory enters the production type-check program (and, with nothing in eslint config
preventing it, could be imported by production code).

**Positive form** (a conforming basename): `^[A-Za-z][a-zA-Z0-9-]*\.[a-z][a-zA-Z0-9-]*\.test\.tsx?$`
**and** neither the module segment nor the behaviour segment contains an ID token (below). The
module segment's leading character admits uppercase because `<module>` is the production module's
own basename verbatim (above) — a React component's file is PascalCase (`JsonModalBody.tsx`), so
its test's module segment is too; the behaviour segment stays lowercase-led always. Passing
examples: `shapes.v2-message.test.ts` (a version number in product vocabulary, `v2`, is not an ID
token) and `JsonModalBody.load-settled-notice.test.tsx`. A name whose behaviour segment instead
names a review round, a milestone, or a ticket fails the check even where the shape otherwise
matches.

**ID-token class** (case-insensitive): `\b(m|ms|cr|qa|qaf|fqa|f-qa|ec|d|l|plan|rider)-?[0-9]+[a-z]?\b`,
or a bare three-digit `0NN` number, or a `YYYY-MM-DD` date. This class names a chain, milestone,
review round, ticket, agent handoff or calendar date — never a surface or a behaviour, so it never
belongs in a test's identity.

**Negative form** (cross-check, applied over three domains — basenames, `describe`/`it`/`test` title
strings, and comment lines): the ID-token class, over those three domains, must match **zero** lines
outside a `// escaped:` provenance line (below). **Bounded, named exemption**: a string literal that
is fixture *data* rather than a *name* — a timestamp, a scratch-directory prefix, an `it.each` format
string — is not distinguishable from an ID token by this predicate and is not required to be
scrubbed; strip the token only where the string functions as a title or identifier, not where it is
data the test computes over.

### Instrument note — three different quantities, easy to conflate

- A static count of `it(`/`test(` call sites (e.g. via `grep -c`/`grep -rc` — never a line-count
  filter that does not preserve the original line count) and vitest's own `numTotalTests` measure
  **different things**: `it.each` expands one static call site into several executed cases. A gap
  between the two is not missing coverage.
- The JSON reporter's `numTotalTestSuites` is a **third** quantity again — it counts collected test
  files **and** every `describe` block inside them, together. It is not comparable to a file count.
  Compare a file count against the reporter's own `testResults` entries, one per file — and compare
  by **path membership**, not only by size: two file lists of the same length can still disagree on
  which files they contain.

### Offline, and the Discord command

**`pnpm test` stays green offline.** "Offline" means a network namespace with only loopback up (`unshare -rn` with `lo` up). The
offline suite holds the properties, the finite maps and masks, and the Discord-derived values frozen as literals. A test that needs
Discord's served build lives under `__tests__/discord/`, never in the offline suite.

**`pnpm test:discord` fetches Discord's served build and compares the site against it.** It fails loudly when it cannot fetch. Where a
live value departs from a frozen one, it names both. It runs at every `website` release gate and at every change of the
`@discord/markdown-wasm` pin:
- A chain that touches the formatting region (`src/components/SlateEditor/**`, `src/utils/markdown/**`,
  `src/components/Markdown*.tsx`) runs it through its QA at Phase 2 and Phase 3.
- A chain that changes the pin runs it through its QA.
- Every other `website` release runs it through devops at Stage 1, at the release tip, and devops records the output in that chain's
  deployment document. This holds whether or not the chain touches the region. Devops is the runner because every `website`
  release passes through Stage 1, while not every chain has a QA Phase 3.

What a red run does depends on its cause and on the chain:

| Cause | A chain touching the region | A pin change | A release not touching the region |
|---|---|---|---|
| The fetch fails (loopback-only namespace or a real outage) | Holds the gate. It re-runs when reachable and holds until a green run: the release waits on the network, not on Discord's schedule. | Same | Fails loudly. Devops records the failure in the deployment document, and it does not hold the release. A failure that persists into the next region chain's opening is that chain's to clear. |
| Drift alarm: the served wasm differs from the pinned one (both hashes reported) | Not a failure. The native-box comparisons still run on the pinned wasm, and report "not comparable under drift" where the served box code cannot initialise against it. Recorded, with an upgrade handoff cited (Owning-Stage planner, Review-Trigger "when the pin is next changed, or the next chain touching the region opens"). | The upgrade is a deliberate change. It re-runs the whole command, moves the pin, the frozen counts and the `version=` lines, and re-reads the frozen masks from the served code. | Recorded. The upgrade handoff is cited, or devops writes it if none is open. |
| A module locator matches zero modules or several | Holds the gate, and that chain repairs the locator. If the legacy parser is gone from the served bundle, the question goes to the owner through steering. | Same | Does not hold the release. Devops writes a handoff (Owning-Stage planner, Review-Trigger "the next chain touching the region opens"). If the legacy parser is gone, the question goes to the owner through steering. |
| A frozen literal departs from its live value | Holds the gate. The literal is re-derived from the live oracle and read before it is frozen again. | Same | Does not hold the release. A handoff, as above. |
| The site differs from Discord on a class held to Discord | A defect. It holds the gate and is fixed. | A defect of the new pin or of the site | Does not hold the release. A handoff, as above. |
| A legacy-only surface may have moved, or an adjustment is dead or stale | Holds the gate. A moved surface goes to the owner through steering, and its adjustments stay until he rules. A dead or stale adjustment alone is removed or re-derived in that chain. | Same | Does not hold the release. A moved surface goes to the owner through steering. A dead or stale adjustment is a handoff, as above. |

The command never holds a release that does not touch the region, whether Discord has moved or cannot be reached. The region at that
tip is the one the last region chain's gates passed, so a red run there is news about Discord, and a handoff carries it.

### Axioms

(A) A test is evidence only if it has been seen to fail against the defect or behaviour it names —
via a local, restored mutation — recorded at the point the test is added or repaired.

(B) A bug-form test (one that names a specific defect) is earned only by an **escaped** defect: an
artefact that is a release or incident record — an incident/handoff record dated before the fix
commit, a user report, or a release that shipped the defect. An observation made against unreleased
branch work, and any review or QA finding, is intra-chain and does not qualify. Ambiguous cases
default to spec-form: the test states the behaviour, not the bug.

(C) Test and file names name the surface and the behaviour under test — never a review round, a
milestone, a ticket, an agent, a date, or a person. A bug-form test's provenance is exactly one
comment line: `// escaped: <artefact path>`, naming the release or incident record that earned it.

(D) A test whose expected value is a **known-wrong** result is a pin, not a test — it does not
belong in the suite. A known, unfixed defect is tracked as a handoff record instead of pinned in the
suite.

(E) A test's expected value is independent of the code under test: never computed by the formula
under test, never read from a production module's own source text, never supplied by the test's own
transcription of production logic under an invented name. This axiom is universal — every case in
the suite is in its class, whether or not it is flagged today.

### Classes, predicates, dispositions

| Class | Predicate | Disposition | Evidence owed |
|---|---|---|---|
| Pin of a known-unfixed bug | The expected value is a known-wrong result, asserted so the suite documents rather than fixes a live defect. | Delete the pin; keep any spec-form siblings covering the same surface; log the bug as a handoff record. No bug fixes as part of a test-cleanup pass. | Name the surviving test on that surface, or record that none exists. |
| Review-round / ticket / date-named | The filename or a title string carries an ID token (above) instead of naming the surface and behaviour. | Rename to the positive form; strip ID tokens from titles; then re-classify the case on its own merits. | Per-file case count and pass set identical before and after the rename (both trees). |
| Inter-agent-revert guard | The test exists to detect another agent reverting recent work, not to specify behaviour. | Delete the guard framing; if the assertion is a real wiring spec underneath it, convert to spec-form and keep. | The surviving spec-form test shown, once, to fail when the wiring it guards is removed. |
| Superseded implementation | The test asserts behaviour of an implementation no longer present, replaced by a later one. | Delete. | Name and mutation-check the test that covers the current implementation. |
| Escaped provenance | The test pins a defect that reached a release or an incident record before the fix. | Keep; add the `// escaped:` provenance line; rename per (C). | None — this is the one class the suite is allowed to keep in bug-form. |
| Source-text assertion | The test reads a production module's own text (e.g. via a file read + pattern match) instead of exercising the module's behaviour. | Convert to a behavioural test that exercises the real surface — mounting it where the surface is a UI component — else delete and list the untested surface as an outstanding item. | A conversion is shown red against a mutation of the behaviour it replaces, green at head. |
| Never-red guard | The test states, or the record shows, that it has always passed since it was written. This class is enumerable only by the file's own admission — no instrument detects "was never red" on its own. | Keep only if the case can be made to fail under one local mutation of the guarded behaviour; otherwise delete it. Strip any "not a red/green test" framing either way — a guard earns its keep by discriminating, not by disclaiming. | The mutation that makes it fail, recorded at the point of disposition. |
| Self-referential oracle | The expected value is computed by the formula under test, or by a local transcription of that formula under an invented name (violates axiom E). | Rewrite the expectation as a literal or an independently derived value, or import the real production function where a transcription stood in for it; keep the case. | The new expectation shown red against a one-token mutation of the production formula. |
| Third-party source assertion | The test reads text belonging to a dependency rather than to this project's own surface. | Delete. The surface under test is not the product's, so no covering test is owed. | None. |
| Zero-production-import transcription | The test file imports nothing from the project's own source tree and instead asserts against a local copy of production logic. | Delete. Where a known defect is pinned inside, that becomes a handoff record, never an in-chain fix. List the surface as an outstanding item unless a covering test is named. | Named covering test, or an outstanding-item line. |
| Oracle-contamination guard | The test reads its own source location (e.g. `__filename`) to assert that the test file never calls the function under test — guarding against a different failure than a source-text assertion, which reads *production* text. | Keep; rename per (C). | None. |
| Hand-rolled renderer | The test defines its own component-rendering function instead of using the project's DOM test harness. | Convert to the DOM harness. | The converted test shown red on a mutation of the rendered behaviour, green at head. |

### Helper policy

Lift a duplicated test helper into `src/**/__tests__/helpers/` (nearest to its callers) at its
**third** duplicate — not sooner, and not left indefinitely once a third copy exists. A helper that
is itself an anti-pattern (for instance, a raw production-source reader used as an assertion oracle)
is deleted along with the pattern it serves; it is never lifted into a shared helper.

### Before adding a test

Name the existing test that already covers the surface, and tighten that test, before writing a new
one (the pattern-ladder rule — extend the found pattern — applied to tests).

### DOM component tests

Pure-logic tests (`.test.ts`) run under Node; component tests (`.test.tsx`) run under a DOM
environment. The environment follows the file extension — no test file carries a per-file directive
to remember, and no Node-only test is handed a `window` it should never see. Mount a component with
`createRoot` (`react-dom/client`) and `act` (`react`) directly; no testing-library dependency is
required for mounting or driving components. A setup script scoped to the DOM project sets
`IS_REACT_ACT_ENVIRONMENT = true`. Keyboard activation of an interactive control is expressed as a
plain click event with `detail: 0` (the DOM shape of "activated without a pointer").

**Environment-fidelity convention.** A DOM global that exists but never fires its callback is worse
than a DOM global that is simply absent — an absent API is at least visibly unsupported, while a
present-but-inert one lets a component take its "capability present" branch and then assert nothing
ever ran. A substitute browser environment is adopted for this suite only where a measured behaviour
has been checked to match a real browser; where it does not, the test does not assert that path, and
the surface is recorded as an outstanding item instead of asserted against a fake that lies.

## Local builds of `website` — before the first save

A locally served build publishes its save event to the Pusher app named in `website/.env.local`, on
the channel `message-update-<message id>`, and a fresh local database numbers messages from 1.
Whether that Pusher app is production's is not established on this box, so treat it as production's:
a local save on a low id can raise "Message Update Detected" for a real user editing the production
message with the same id.

**Before any save on a local build, move the local message ids out of production's range**:

```sql
ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001;
```

Run it after the schema is pushed and before the first save, and record in the stage document the
id range the walk wrote. A local database that already holds low-numbered messages is recreated, not
reused. `.env.local` holds credentials: read key names, hosts and ports only, never a value.

---
*Evergreen conventions only. Which files are in which class, per-file disposition tables, review or
milestone identifiers, and dated register entries live in the planning and verification record, not
here.*
