#!/usr/bin/env node
'use strict';

/*
 * agent-output repository integrity checker.
 *
 * Run from anywhere:  node tools/check-repo.js
 *                     node tools/check-repo.js --status
 *                     node tools/check-repo.js --help
 * Exit 0 = clean. Exit 1 = at least one check failed. Exit 2 = the tool's own self-check failed.
 *
 * ## Why this exists
 *
 * Documents here cite each other by path, and a document's path CHANGES when it closes — it moves
 * into a `closed/` subdirectory. The close procedure in `document-lifecycle/SKILL.md` has a
 * "Cross-Reference Updates" step to compensate, and in the repository this tool was first written
 * for that step was skipped on every closure that ever happened: 57 citations were dangling when it
 * was written.
 *
 * A rule that depends on somebody remembering is not a rule. This is the mechanical version.
 *
 * ## What it can and cannot guarantee
 *
 * It catches every reference that FAILS TO RESOLVE. It does not, by itself, catch a reference that
 * still resolves but now means the wrong document — which is a real failure that happened: a
 * citation pointed at `critiques/007-…-critique.md`, resolved perfectly, and was still wrong, because
 * a newer document had claimed that basename and the findings it cited only existed in the older one.
 *
 * That is why CHECK 2 exists. Once every chain document has a globally unique basename, "resolves"
 * and "means the right document" collapse into the same test, and the guarantee becomes real.
 *
 * ## Portability
 *
 * Nothing below names this workspace, this repository's directory set, or any particular chain. The
 * directory set, the enclosing workspace name and the repository's own directory name are all read
 * from disk at startup, so adding a stage directory needs no edit here. The rules it enforces come
 * from `~/.claude/agent-skills/document-lifecycle/SKILL.md` and the agent definitions in
 * `~/.claude/agents/` — those are authoritative, not this file and not any README.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');

/** This repository's own directory name — the leading segment of a repo-rooted citation. */
const REPO_DIR = path.basename(ROOT);

/**
 * The enclosing workspace directory. A citation may name this repo absolutely from the workspace
 * root (`<workspace>/agent-output/…`); that is still a path into THIS repository. The same shape
 * with any OTHER leading segment names a sibling project repo's own agent-output tree, which this
 * checker cannot verify — see the sibling-repo escape in checkLinks.
 */
const WORKSPACE = path.basename(path.dirname(ROOT));

const USAGE = `
  check-repo.js — agent-output repository integrity checker

    node tools/check-repo.js            run every check; exit 1 on any failure
    node tools/check-repo.js --status   per-chain verdict readout; exit 1 on an unowned failure
    node tools/check-repo.js --help     this text

  Checks:
    1  links       every in-repo citation resolves (tolerant of open↔closed moves)
    2  basenames   chain-document basenames are globally unique
    3  frontmatter parses, IDs are three-digit zero-padded, filename agrees with ID,
                   one UUID per chain
    4  scope       a scope suffix names a subdivision the chain's plan itself defines

  Exit: 0 clean · 1 failures · 2 the tool's own self-check failed.
`;

/**
 * Basenames allowed to appear more than once. Each is a deliberate decision, recorded here so it is
 * asserted rather than silently tolerated — an unexplained exception list is how a checker rots. An
 * exception that no longer applies is itself reported as a defect, so an entry is removed the moment
 * its collision stops existing.
 */
const DUPLICATE_BASENAME_EXCEPTIONS = new Map([
  ['README.md', 'Directory-level READMEs — the repository root, `user-files/`, `verification/`. Not chain documents.'],
]);

/**
 * Files that are scratch, generated, or structural, and are not part of the document graph.
 * `.gitkeep` is a placeholder that holds an empty stage directory in git — it appears once per empty
 * directory by design and is not a document, so it belongs here rather than in the duplicate
 * exception list above.
 */
const NOT_A_DOCUMENT = new Set(['WORKING-NOTES.md', 'INDEX.md', '.gitkeep']);

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/** Top-level entries of this repository. A resolved path whose first segment is not one of these
 *  has climbed out into the enclosing workspace — see the note in checkLinks. */
const TOP_LEVEL = new Set(
  fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.name !== '.git')
    .map((e) => e.name),
);

/** Top-level DIRECTORIES, read from disk so a new stage directory needs no edit here. */
const TOP_LEVEL_DIRS = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name !== '.git')
  .map((e) => e.name)
  .sort();

const failures = [];
const notes = [];
function fail(check, detail) { failures.push({ check, detail }); }

/**
 * Every file git would consider part of the repository — tracked, PLUS untracked files that are not
 * ignored.
 *
 * The untracked half matters more than it looks. A document is at its most citation-fragile in the
 * minutes after it is written, and `git ls-files` alone cannot see it until it is committed — so the
 * check would pass on a document nobody had checked, and only start working once it was too late to
 * be useful. A gate that goes green because it looked at nothing is worse than no gate.
 */
function tracked() {
  const out = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard'],
    { cwd: ROOT, encoding: 'utf8' },
  );
  // A cached path missing on disk is an uncommitted move (delete unstaged) — normal steady state
  // in a shared tree; the copy at its new path is picked up via --others.
  return [...new Set(out.split('\n').filter(Boolean))]
    .filter((p) => fs.existsSync(path.join(ROOT, p)))
    .sort();
}

/** Strip fenced code blocks — they hold illustrative examples, not real citations. */
function stripFences(text) {
  return text.replace(/^```[\s\S]*?^```/gm, (m) => '\n'.repeat(m.split('\n').length - 1));
}

/**
 * A path is a placeholder, not a citation, if it has been elided or globbed. The repo writes these
 * deliberately when naming a family of documents rather than one, e.g. `planning/010-...md`.
 */
function isPlaceholder(p) {
  return p.includes('…') || p.includes('...') || p.includes('*') || p.includes('<') || p.includes('[');
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

/**
 * Some citations are SUPPOSED to be broken.
 *
 * A review finding whose whole point is "this document cites a path that does not exist" has to quote
 * that path verbatim — the quotation is the evidence. Repointing it at a real file makes the finding
 * contradict its own next sentence and destroys the record of what was wrong.
 *
 * So a line may opt out with `check-repo:ignore`, on the citing line or the one above it. The reason
 * belongs in the marker; an unexplained suppression is indistinguishable from a bug being hidden.
 */
function isSuppressed(text, index) {
  const lines = text.slice(0, index).split('\n');
  const here = text.split('\n')[lines.length - 1] || '';
  const above = lines[lines.length - 2] || '';
  return here.includes('check-repo:ignore') || above.includes('check-repo:ignore');
}

/**
 * Resolve a repo-relative citation, tolerant of closure.
 *
 * Closing a document moves it into its directory's `closed/`, which breaks every citation of its old
 * path. Nothing in the lifecycle assigns the repointing, and assigning it would churn the landmark
 * documents (roadmap, system-architecture) that cite the most, on every single closure. So a
 * citation of `qa/016-foo.md` and one of `qa/closed/016-foo.md` are treated as the SAME identity: on
 * a literal miss, retry with the closure segment inserted, and — for a citation that already names
 * `closed/` whose target has since re-opened or not-yet-closed — with it stripped.
 *
 * This is sound precisely because CHECK 2 guarantees basenames are globally unique: `X.md` names one
 * document, so `<domain>/X.md` and `<domain>/closed/X.md` cannot be two different files — only the
 * two spellings of one file's path across its own closure. The tolerance is scoped to exactly the
 * `closed/` dimension and nothing else: the domain still has to match, so it never rescues a citation
 * that named the wrong directory.
 *
 * Returns { ok, via } — via 'literal' or 'closure'. Closure resolutions are counted and reported, not
 * swallowed: a rising count means closure drift is accumulating and someone should look.
 */
function resolveCitation(rel) {
  if (fs.existsSync(path.join(ROOT, rel))) return { ok: true, via: 'literal' };
  const m = rel.match(/^([^/]+)\/(.*)$/);
  if (m) {
    const [, domain, rest] = m;
    const sub = 'closed';
    const variant = rest.startsWith(`${sub}/`)
      ? `${domain}/${rest.slice(sub.length + 1)}`   // strip closed/ (target re-opened / not yet closed)
      : `${domain}/${sub}/${rest}`;                 // insert closed/ (target has since closed)
    if (fs.existsSync(path.join(ROOT, variant))) return { ok: true, via: 'closure' };
  }
  return { ok: false };
}

// ── CHECK 1 — every cited path resolves ──────────────────────────────────────────────────────────

/*
 * Extensions a citation may carry.
 *
 * `.ts`/`.tsx` are deliberately ABSENT. The documents here cite the enclosing web project constantly,
 * and they do it with project-relative paths (`](src/utils/sendWebhook.ts)`) that are relative to the
 * SERVICE repo, not to the citing document. Matching those would resolve them against the citing
 * document's own directory — `analysis/closed/src/utils/…` — whose first segment IS a top-level
 * directory here, so they would be reported as dangling repo paths nobody wrote. The `.md|.js|.sh|
 * .json` set was checked against this repository's actual link text: every non-`../` markdown link is
 * an in-repo document, so the set is exact.
 */
const EXTS = 'md|js|sh|json';

const REPO_ROOTED = new RegExp(
  // The (?![A-Za-z0-9]) is load-bearing. Without it the `js` alternative matches the first two
  // characters of a `.json` citation and the group succeeds early, so `…/results.json` is captured
  // as `…/results.js` — and the checker then reports a dangling path *nobody wrote*, which sends the
  // reader hunting for a typo that does not exist. The two sibling patterns below never showed this
  // because a closing delimiter forces the engine to backtrack into `json`; this one has no trailing
  // delimiter to force it. Reordering the alternation also fixes today's case but breaks again on the
  // next extension that prefixes another.
  `((?:[A-Za-z0-9._-]+\\/)?)${escapeRe(REPO_DIR)}\\/([A-Za-z0-9._…*<>[\\]/-]+\\.(?:${EXTS})(?![A-Za-z0-9]))`,
  'g',
);

const MARKDOWN_LINK = new RegExp(`\\]\\(([^)\\s#]+\\.(?:${EXTS}))(?:#[^)]*)?\\)`, 'g');

const BACKTICKED = new RegExp(
  '`((?:' + TOP_LEVEL_DIRS.map(escapeRe).join('|') + ')\\/[A-Za-z0-9._…*<>[\\]/-]+\\.(?:' + EXTS + '))`',
  'g',
);

function checkLinks(files) {
  const mds = files.filter((f) => f.endsWith('.md') && !NOT_A_DOCUMENT.has(path.basename(f)));
  let checked = 0;
  let external = 0;
  let suppressed = 0;
  let viaClosure = 0;

  for (const file of mds) {
    const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const text = stripFences(raw);
    const dir = path.dirname(file);
    const seen = new Set();

    const candidates = [];

    // Repo-rooted citations: `agent-output/qa/016-….md`
    //
    // The optional prefix group catches a *sibling project repo's* own agent-output tree
    // (`website/agent-output/…`): shedding that prefix would turn a correct cross-repo citation into
    // a repo-rooted path nobody wrote. Keeping the prefix on `resolved` routes it through the
    // sibling-repo escape below, so it is counted external instead of failed.
    // `<workspace>/agent-output/…` — an absolute path into THIS repo — stays repo-rooted.
    for (const m of text.matchAll(REPO_ROOTED)) {
      const sibling = m[1] !== '' && m[1] !== `${WORKSPACE}/`;
      candidates.push({
        raw: m[2],
        resolved: sibling ? `${m[1]}${REPO_DIR}/${m[2]}` : m[2],
        index: m.index,
        form: 'repo-rooted',
      });
    }

    // Markdown links: [text](../planning/016-….md)
    for (const m of text.matchAll(MARKDOWN_LINK)) {
      const target = m[1];
      if (/^[a-z]+:\/\//.test(target)) continue; // external URL
      const resolved = target.startsWith('/')
        ? target.slice(1)
        : path.normalize(path.join(dir, target));
      candidates.push({ raw: target, resolved, index: m.index, form: 'markdown-link' });
    }

    // Backticked bare paths that start with a known top-level directory.
    for (const m of text.matchAll(BACKTICKED)) {
      candidates.push({ raw: m[1], resolved: m[1], index: m.index, form: 'backticked' });
    }

    for (const c of candidates) {
      if (isPlaceholder(c.raw)) continue;
      const key = `${c.resolved}`;
      if (seen.has(key)) continue;
      seen.add(key);

      /*
       * A link that climbs out of this repository points into the enclosing workspace — a sibling
       * project repo (`../../website/src/…`) or one of its files. Those are outside what this checker
       * can verify: the sibling may be absent, on another branch, or moved. Counted and reported,
       * never failed. Claiming to have checked them would be the same overstated-coverage mistake the
       * documents here keep warning about.
       *
       * Detected by first segment, not by a leading `..`: `code-review/closed/../../website`
       * normalises to `website/...`, which climbs out of the repo without ever looking like it does.
       */
      if (c.resolved.startsWith('..') || !TOP_LEVEL.has(c.resolved.split('/')[0])) {
        external += 1;
        continue;
      }

      if (isSuppressed(text, c.index)) { suppressed += 1; continue; }

      checked += 1;
      const r = resolveCitation(c.resolved);
      if (r.via === 'closure') viaClosure += 1;
      if (!r.ok) {
        fail('links', `${file}:${lineOf(text, c.index)}  ->  ${c.raw}   (${c.form}, resolves to ${c.resolved})`);
      }
    }
  }
  notes.push(`links: ${checked} in-repo citations checked across ${mds.length} documents; `
    + `${viaClosure} resolved across a closure (open↔closed identity); `
    + `${external} external (workspace / sibling-repo) links noted but not verified; ${suppressed} deliberately suppressed`);
}

// ── CHECK 2 — chain-document basenames are globally unique ───────────────────────────────────────

function checkUniqueBasenames(files) {
  const byBase = new Map();
  for (const f of files) {
    if (NOT_A_DOCUMENT.has(path.basename(f))) continue;
    const b = path.basename(f);
    if (!byBase.has(b)) byBase.set(b, []);
    byBase.get(b).push(f);
  }
  let dupes = 0;
  for (const [base, paths] of byBase) {
    if (paths.length < 2) continue;
    if (DUPLICATE_BASENAME_EXCEPTIONS.has(base)) continue;
    dupes += 1;
    fail('basenames', `'${base}' appears ${paths.length} times:\n        ${paths.join('\n        ')}`);
  }
  // An exception that no longer applies is itself a defect — it hides the next real collision.
  for (const [base, why] of DUPLICATE_BASENAME_EXCEPTIONS) {
    const n = (byBase.get(base) || []).length;
    if (n < 2) fail('basenames', `exception '${base}' is stale — it now appears ${n} time(s). Remove it. (${why})`);
  }
  notes.push(`basenames: ${byBase.size} distinct, ${dupes} unexpected collisions, ${DUPLICATE_BASENAME_EXCEPTIONS.size} declared exceptions`);
}

// ── CHECK 3 — frontmatter parses, and agrees with the filename ───────────────────────────────────

/**
 * Parse a frontmatter block into { fields, blockScalarFields }, resolving YAML block scalars
 * (`>-` / `|-` and friends) to their content. Pure over its input string — see selfCheck().
 *
 * The naive line-wise version captured the literal `>-` as a field's value and dropped the indented
 * content beneath it — the same defect build-index.js had, discovered twice because the parser
 * existed twice. Resolving here also makes CHECK 3 honest: an unquoted ` #` inside a block scalar is
 * NOT a YAML comment and must not be flagged as silent truncation.
 *
 * ## IDs ARE TEXT. Never route frontmatter through a real YAML parser here.
 *
 * This reader is deliberately hand-rolled and keeps every value as a STRING. That is not laziness —
 * it is the reason the checker can see zero-padding at all. Under YAML 1.1 (js-yaml, PyYAML), a
 * plain scalar `010` is OCTAL and loads as the integer 8; `018` is not valid octal and loads as the
 * string "018"; `007` loads as 7. So a YAML parser corrupts padded IDs, and corrupts them
 * INCONSISTENTLY — some to wrong integers, some left as strings. Every ID comparison in this file
 * (CHECK 3's `/^\d{3}$/`, the chain map keyed by ID, filename-vs-ID) assumes text. Swap in
 * `yaml.load()` and CHECK 3's own three-digit assertion starts failing on `010` while passing on
 * `018` — silently, for chains nobody edited. selfCheck() below fails the run the instant that
 * happens, so this comment is enforced, not merely hoped for.
 */
function parseFrontmatterBlock(block) {
  const lines = block.split('\n');
  const fields = {};
  const blockScalarFields = new Set();
  for (let i = 0; i < lines.length; i += 1) {
    const m = lines[i].match(/^([A-Za-z][A-Za-z-]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawValue] = m;
    if (/^[>|][-+]?$/.test(rawValue.trim())) {
      const body = [];
      while (i + 1 < lines.length && (lines[i + 1].trim() === '' || /^\s+\S/.test(lines[i + 1]))) {
        i += 1;
        body.push(lines[i].trim());
      }
      fields[key] = body.join(' ').replace(/\s+/g, ' ').trim();
      blockScalarFields.add(key);
      continue;
    }
    fields[key] = rawValue.trim();
  }
  return { fields, blockScalarFields };
}

function readFrontmatter(file) {
  const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
  if (!raw.startsWith('---\n')) return null;
  const end = raw.indexOf('\n---', 4);
  if (end === -1) return { error: 'frontmatter opened with --- but never closed' };
  const block = raw.slice(4, end);
  return { ...parseFrontmatterBlock(block), block };
}

/**
 * Runs before any check. Pins the invariant the whole tool rests on: the frontmatter reader keeps
 * IDs as zero-padded TEXT, never as parsed numbers. If a future edit routes frontmatter through a
 * YAML library, `010` becomes 8 and this aborts with a pointed message rather than letting the
 * checker silently mis-compare chains. Costs microseconds; runs every invocation.
 */
function selfCheck() {
  const { fields } = parseFrontmatterBlock('ID: 010\nOrigin: 018\nUUID: abc12345\nStatus: Active');
  const bad = [];
  if (fields.ID !== '010') bad.push(`ID '010' read as ${JSON.stringify(fields.ID)} — expected the string "010"`);
  if (fields.Origin !== '018') bad.push(`Origin '018' read as ${JSON.stringify(fields.Origin)} — expected the string "018"`);
  if (bad.length) {
    console.error('  SELF-CHECK FAILED — the frontmatter reader is no longer keeping IDs as text:');
    for (const b of bad) console.error(`    ${b}`);
    console.error('    IDs must stay strings. A YAML parser reads 010 as octal 8. See parseFrontmatterBlock.');
    process.exit(2);
  }
}

function checkFrontmatter(files) {
  const mds = files.filter((f) => f.endsWith('.md') && !NOT_A_DOCUMENT.has(path.basename(f)));
  const chains = new Map();
  let withFm = 0;
  let withoutFm = 0;
  let withoutId = 0;

  for (const file of mds) {
    const fm = readFrontmatter(file);
    if (!fm) { withoutFm += 1; continue; }
    if (fm.error) { fail('frontmatter', `${file}: ${fm.error}`); continue; }
    withFm += 1;

    const { ID, Origin, UUID } = fm.fields;

    // A value opening with a YAML indicator character breaks every parser downstream.
    for (const [k, v] of Object.entries(fm.fields)) {
      // Block scalars are literal: a leading backtick or an interior ` #` is legal content there,
      // and flagging it would punish exactly the quoting style the repo adopted to stay parseable.
      if (fm.blockScalarFields && fm.blockScalarFields.has(k)) continue;
      if (/^[`*&!%@]/.test(v)) {
        fail('frontmatter', `${file}: field '${k}' starts with reserved YAML indicator '${v[0]}' — quote it`);
      }
      if (/\s#/.test(v) && !/^['"]/.test(v)) {
        fail('frontmatter', `${file}: field '${k}' contains ' #' unquoted — YAML truncates it at the comment`);
      }
    }

    if (ID === undefined) { withoutId += 1; continue; }
    if (ID === 'n/a') continue; // evergreen documents

    if (!/^\d{3}$/.test(ID)) fail('frontmatter', `${file}: ID '${ID}' is not three-digit zero-padded`);
    if (Origin !== undefined && Origin !== 'n/a' && !/^\d{3}$/.test(Origin)) {
      fail('frontmatter', `${file}: Origin '${Origin}' is not three-digit zero-padded`);
    }
    if (UUID === undefined) fail('frontmatter', `${file}: no UUID field`);

    const prefix = path.basename(file).match(/^(\d{3})-/);
    if (prefix && prefix[1] !== ID) {
      fail('frontmatter', `${file}: filename says ${prefix[1]} but ID says ${ID}`);
    }

    if (UUID) {
      if (!chains.has(ID)) chains.set(ID, new Map());
      const byUuid = chains.get(ID);
      if (!byUuid.has(UUID)) byUuid.set(UUID, []);
      byUuid.get(UUID).push(file);
    }
  }

  for (const [id, byUuid] of chains) {
    if (byUuid.size > 1) {
      const detail = [...byUuid.entries()]
        .map(([u, fs_]) => `        ${u}: ${fs_.join(', ')}`).join('\n');
      fail('chains', `chain ${id} has ${byUuid.size} different UUIDs — these are separate efforts sharing a number:\n${detail}`);
    }
  }
  /*
   * The last two counts are REPORTED, not failed. Which document classes are legitimately ID-less is
   * a lifecycle question (research, handoff and operator-direct notes are ID-less by design; a
   * deployment record inherits its plan's ID and should not be), and this checker has no table of
   * that. Counting them puts the population in front of a reader without inventing a rule the
   * lifecycle skill does not state.
   */
  notes.push(`frontmatter: ${withFm} documents carry frontmatter, ${chains.size} distinct chains; `
    + `${withoutFm} document(s) carry none; ${withoutId} carry frontmatter but no ID field (reported, not failed)`);
}

// ── CHECK 4 — a scope suffix names a subdivision the plan defines ────────────────────────────────

/*
 * The rule:
 *
 *   A scope suffix may only name a subdivision THE PLAN ITSELF DEFINES. `-m4` is legal if the plan
 *   has Milestone 4; `-wp2-wp4` is legal if it has WP2-WP4. An agent may not coin a scope word.
 *
 * This check exists because the rule was written after two violations had already shipped, one of
 * them coined by the agent doing the cleanup. A rule stated in prose gets applied when someone
 * remembers it; this one now fails the build.
 *
 * Four things it must NOT flag, each learned from a real file:
 *
 *   1. Words BEFORE the stage are the descriptive name, not a scope.
 *      `security/016-m4-reset-toolkit-security-audit.md` -> stage `security-audit`, no scope.
 *   2. `planning/` documents carry no stage suffix at all, by design, so they have no scope either.
 *   3. `-superseded` is a lifecycle state marker, not a scope.
 *      `critiques/closed/007-…-critique-superseded.md` is legal.
 *   4. A stage suffix may itself contain a hyphen (`code-review`, `architecture-findings`,
 *      `process-improvement-analysis`). Split on the stage, never on hyphens.
 */

const STAGE_SUFFIXES = new Map([
  ['analysis', ['analysis']],
  ['architecture', ['architecture-findings']],
  ['code-review', ['code-review']],
  ['critiques', ['critique']],
  ['deployment', ['deployment']],
  ['implementation', ['implementation']],
  ['planning', []], // bare by design — the plan carries the effort's canonical name
  ['process-improvement', ['process-improvement-analysis', 'agent-instruction-updates', 'triage']],
  ['qa', ['qa']],
  ['retrospectives', ['retrospective']],
  ['security', ['security-audit']],
  ['uat', ['uat']],
]);

/** Lifecycle state markers. Legal in the scope position; they describe the document, not a subdivision. */
const STATE_MARKERS = new Set(['superseded']);

function planFor(id, files) {
  return files.find((f) => /^planning\//.test(f) && path.basename(f).startsWith(`${id}-`)) || null;
}

function checkScopeSuffixes(files) {
  const mds = files.filter((f) => f.endsWith('.md') && !NOT_A_DOCUMENT.has(path.basename(f)));
  let withScope = 0;

  for (const file of mds) {
    const dir = file.split('/')[0];
    const stages = STAGE_SUFFIXES.get(dir);
    if (!stages || stages.length === 0) continue;

    const m = path.basename(file, '.md').match(/^(\d{3})-(.+)$/);
    if (!m) continue;
    const [, id, rest] = m;

    // Longest stage first, so `process-improvement-analysis` wins over `analysis`.
    const stage = [...stages].sort((a, b) => b.length - a.length)
      .find((s) => rest === s || rest.endsWith(`-${s}`) || rest.includes(`-${s}-`));
    if (!stage) {
      fail('scope', `${file}: no recognised stage suffix for '${dir}/' (expected one of ${stages.join(', ')})`);
      continue;
    }

    // Everything AFTER the stage is the scope. Everything before it is the descriptive name.
    const at = rest.lastIndexOf(`-${stage}`);
    const scope = at === -1 ? '' : rest.slice(at + stage.length + 1).replace(/^-/, '');
    if (!scope) continue;
    if (STATE_MARKERS.has(scope)) continue;

    withScope += 1;

    const plan = planFor(id, files);
    if (!plan) {
      fail('scope', `${file}: carries scope '${scope}' but chain ${id} has no plan, so nothing can define it`);
      continue;
    }
    const planText = fs.readFileSync(path.join(ROOT, plan), 'utf8');

    const tokens = scope.split('-');
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];
      /*
       * A subdivision is <letters><digits> — m4, wp2 — or such a token extended by hyphenated
       * qualifier tokens the plan defines VERBATIM as one compound name (m3-r). The extension
       * keeps the rule intact: the plan still defines every accepted name, so nothing is coined.
       */
      const shape = token.match(/^([a-z]+)(\d+)$/);
      if (!shape) {
        fail('scope', `${file}: scope word '${token}' is not a plan subdivision. `
          + 'A scope suffix names a subdivision the plan defines (m4, wp2, or a plan-defined '
          + 'compound like m3-r); it may not be coined.');
        continue;
      }
      // Greedily absorb following non-subdivision tokens while the plan defines the compound.
      let unit = token;
      while (i + 1 < tokens.length && !/^[a-z]+\d+$/.test(tokens[i + 1])
             && new RegExp(`\\b${unit}-${tokens[i + 1]}\\b`, 'i').test(planText)) {
        unit = `${unit}-${tokens[i + 1]}`;
        i += 1;
      }
      if (unit !== token) continue; // the plan defines the compound verbatim
      if (!new RegExp(`\\b${shape[1]}\\s*${shape[2]}\\b`, 'i').test(planText)) {
        fail('scope', `${file}: scope '${token}' is not defined by ${plan}`);
      }
    }
  }
  notes.push(`scope suffixes: ${withScope} document(s) carry one, all validated against their plan`);
}

// ── --status — the per-chain gate readout ────────────────────────────────────────────────────────

/*
 * `node tools/check-repo.js --status`
 *
 * One command that answers, per chain: what is the latest verdict, what tree does it apply to
 * (Verified-At), and is anything failing without an open handoff addressing it?
 *
 * This mode exists by owner ruling (2026-08-10), which merged two escalations into one mechanism.
 * The two incident classes it discharges, stated without the chain numbers that raised them:
 *
 *   - A deploy executed against a chain whose latest review verdict was CHANGES REQUIRED, because
 *     nothing put that verdict in front of the operator. The remedy is a pre-deploy read-out of
 *     every chain artifact's status and Verified-At.
 *
 *   - Chains skipping written rules (devops invocation, no-approval-over-NOT-EXECUTED, the version
 *     milestone) with nothing detecting it. The detectable symptom: a failing or blocking verdict
 *     with NO open handoff that would carry the work forward. A failure someone is on the hook for
 *     has an open handoff; a failure nobody owns has nothing.
 *
 * Exit: 0 when no anomaly, 1 when any failing/blocking verdict lacks an open handoff. The readout
 * always prints in full either way — the exit code is for gates, the text is for people.
 *
 * What this mode deliberately does NOT do: verify Verified-At SHAs against any working tree (that is
 * devops's gate, and it needs the project repos), or decide whether a chain SHOULD have reached a
 * given stage. It reads what the documents claim and puts it in one place.
 */

const STAGE_ORDER = [
  'planning', 'analysis', 'critiques', 'implementation', 'code-review', 'qa', 'security',
  'uat', 'deployment', 'retrospectives', 'process-improvement',
];

/** A Status/Status-Detail that means "this chain is blocked or refused", per the repo's own vocabulary. */
const FAILING = /REJECTED|CHANGES[ _-]REQUIRED|NOT[ _-]?APPROVED|NOT[ _-]EXECUTED|QA Failed|UAT Failed|Awaiting Approval/i;

function statusMode() {
  const files = tracked().filter((f) => f.endsWith('.md') && !NOT_A_DOCUMENT.has(path.basename(f)));

  const chains = new Map();
  for (const file of files) {
    const fm = readFrontmatter(file);
    if (!fm || fm.error || !fm.fields.ID || fm.fields.ID === 'n/a') continue;
    const id = fm.fields.ID;
    if (!chains.has(id)) chains.set(id, []);
    const unquote = (v) => String(v).replace(/^['"]|['"]$/g, '');
    chains.get(id).push({
      file,
      stage: file.split('/')[0],
      status: unquote(fm.fields.Status || '—'),
      detail: unquote(fm.fields['Status-Detail'] || ''),
      verifiedAt: fm.fields['Verified-At'] ? unquote(fm.fields['Verified-At']) : null,
      closed: /\/closed\//.test(file),
    });
  }

  // Open handoffs: top-level handoff/ documents, not yet in closed/.
  const openHandoffs = tracked().filter((f) => /^handoff\/[^/]+\.md$/.test(f));
  const handoffText = new Map(
    openHandoffs.map((f) => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')]),
  );

  const anomalies = [];

  for (const id of [...chains.keys()].sort()) {
    const docs = chains.get(id)
      .sort((a, b) => STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage));
    const open = docs.filter((d) => !d.closed);
    const latest = [...docs].reverse()[0];

    console.log(`  chain ${id} — ${open.length} open, ${docs.length - open.length} closed; latest stage: ${latest.stage}`);
    for (const d of docs) {
      const flags = [];
      if (FAILING.test(`${d.status} ${d.detail}`)) flags.push('FAILING/BLOCKING');
      const line = [
        d.closed ? '  ·' : '  ▶',
        d.stage.padEnd(20),
        d.status + (d.detail ? ` — ${d.detail.slice(0, 80)}${d.detail.length > 80 ? '…' : ''}` : ''),
        d.verifiedAt ? `  [Verified-At: ${String(d.verifiedAt).slice(0, 60)}]` : '',
        flags.length ? `  ⚠ ${flags.join(', ')}` : '',
      ].join(' ');
      console.log(`  ${line}`);
    }

    /*
     * The unowned-failure detector. A failing verdict is acceptable state — chains fail and recover —
     * but a failing verdict NOBODY is carrying forward is the silent-skip class. "Carrying forward"
     * is approximated as: some open handoff mentions this chain, by number or by any of its
     * documents' name stems. Handoffs are ID-less by design, so text mention is the only association
     * there is.
     */
    const failing = docs.filter((d) => !d.closed && FAILING.test(`${d.status} ${d.detail}`));
    if (failing.length) {
      const stems = docs.map((d) => path.basename(d.file, '.md'));
      const mentioned = openHandoffs.some((h) => {
        const t = handoffText.get(h);
        return t.includes(`${id}`) && (new RegExp(`\\b0*${Number(id)}\\b`).test(t)
          || stems.some((s) => t.includes(s)));
      });
      if (!mentioned) {
        for (const d of failing) {
          anomalies.push(`chain ${id}: ${d.file} is "${d.status}${d.detail ? ` — ${d.detail}` : ''}" and no open handoff mentions this chain — nobody is on the hook for it`);
        }
      }
    }
    console.log('');
  }

  console.log(`  open handoffs: ${openHandoffs.length ? openHandoffs.map((f) => path.basename(f)).join(', ') : 'none'}`);
  console.log('');

  if (anomalies.length) {
    console.log(`  ANOMALIES — ${anomalies.length} failing/blocking verdict(s) with no open handoff:`);
    for (const a of anomalies) console.log(`    ${a}`);
    console.log('');
    console.log('  FAIL — a failing verdict nobody is carrying forward is the silent-skip class this mode exists to catch.');
    process.exit(1);
  }
  console.log('  PASS — every failing or blocking verdict has an open handoff carrying it.');
  process.exit(0);
}

// ── report ───────────────────────────────────────────────────────────────────────────────────────

function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(USAGE);
    process.exit(0);
  }
  selfCheck();
  if (process.argv.includes('--status')) { statusMode(); return; }

  const files = tracked();
  checkLinks(files);
  checkUniqueBasenames(files);
  checkFrontmatter(files);
  checkScopeSuffixes(files);

  for (const n of notes) console.log(`  ${n}`);
  console.log('');

  if (!failures.length) {
    console.log('  PASS — every citation resolves, every chain basename is unique, frontmatter is consistent.');
    process.exit(0);
  }

  const byCheck = new Map();
  for (const f of failures) {
    if (!byCheck.has(f.check)) byCheck.set(f.check, []);
    byCheck.get(f.check).push(f.detail);
  }
  for (const [check, details] of byCheck) {
    console.log(`  ${check.toUpperCase()} — ${details.length} failure(s)`);
    for (const d of details) console.log(`    ${d}`);
    console.log('');
  }
  console.log(`  FAIL — ${failures.length} problem(s).`);
  process.exit(1);
}

main();
