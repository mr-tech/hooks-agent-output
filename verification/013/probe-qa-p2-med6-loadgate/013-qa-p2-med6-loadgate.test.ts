/**
 * QA Phase 2 probe (plan 013) — MED-6 / the row-E Load gate. NOT an acceptance spec.
 *
 * WHAT IT IS AND IS NOT. The round-17 reviewer's Assumption Not Checked asks for a MOUNTED
 * render: `probe-cr19` models the effect wiring but never mounts the component, and MED-6 (the
 * dismissed-choice state leaving Load enabled and no-opping) is not settled by a model of the
 * thing. **A mounted render is NOT PERFORMABLE at this tree** — `@testing-library/react`,
 * `jsdom`, `happy-dom` and `@vitejs/plugin-react` are all absent from node_modules, vitest runs
 * `environment: 'node'`, and `include` is `src/**\/*.test.ts` so a `.tsx` spec is not even
 * collected. Installing them mutates a shared node_modules and changes package.json: gated, and
 * not QA's to do.
 *
 * So this probe does the strongest thing available WITHOUT a DOM, and states its residue:
 *   - the BRANCH SELECTOR is executed for real (`resolveContentLoss` over row A-E fixtures);
 *   - the CONTROL FLOW from that branch to the gate is asserted against the component's own
 *     BYTES at the tip, read at runtime — never an embedded copy (the probe-cr1/cr10 fossil class);
 *   - the gate EXPRESSION is byte-pinned, and each of its two conjuncts is made the sole carrier
 *     of the decision in a fixture whose inputs come from the real predicates.
 *
 * RESIDUE, stated so it is routed and not shelved: this does not establish that React applies
 * `isDisabled` to a rendered button, nor that no other render path re-enables it. That is what
 * the mount would close, and it is handed to UAT as a blocking release condition.
 *
 * Anchor: website @ 4e9da96 (chain tip), clean worktree /tmp/qa013-tip.
 * Captured at: agent-output/verification/013/probe-qa-p2-med6-loadgate/
 */
import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/assets/svg/TextIcon', () => ({ default: {} }));
vi.mock('~/assets/svg/VoiceIcon', () => ({ default: {} }));

import { resolveContentLoss } from '~/utils';
import { validateContentRequirements } from '~/utils/limits';

const V2 = 1 << 15; // 32768, stated independently of the constant the code reads
const container = { type: 17, components: [{ type: 10, content: 'x' }] };

const SRC = readFileSync(
  resolve(__dirname, '../../app/message/m/[id]/_components/JsonModalBody.tsx'),
  'utf8',
);

// The gate, byte-pinned from the component. Every boolean assertion below is over THIS text.
const GATE = 'isDisabled={!validatedDraft || !!contentFloorError}';

describe('P2-A — the branch selector is executed, not modelled', () => {
  it('row E (V2 components + classic content) REQUIRES A CHOICE', () => {
    const d = resolveContentLoss(0, [container], 'hi', undefined);
    expect(d.row).toBe('E');
    expect(d.requiresChoice).toBe(true);
  });

  // CONTROLS, the other direction: if every row required a choice, the gate analysis below
  // would be reporting a state the product can never leave.
  it('CONTROL row A (classic only): no choice', () => {
    expect(resolveContentLoss(0, undefined, 'hi', undefined).requiresChoice).toBe(false);
  });

  it('CONTROL row B (V2 components, no classic body): no choice', () => {
    expect(resolveContentLoss(0, [container], undefined, undefined).requiresChoice).toBe(false);
  });

  it('CONTROL row D (flag set, classic body, no V2 components) — 5712/5842 shape: no choice', () => {
    expect(resolveContentLoss(V2, undefined, 'hi', undefined).requiresChoice).toBe(false);
  });

  it('CONTROL row C (flag set + V2 components, no classic body): no choice', () => {
    expect(resolveContentLoss(V2, [container], undefined, undefined).requiresChoice).toBe(false);
  });
});

describe('P2-B — control flow from that branch to the gate, over the component\'s own bytes', () => {
  it('the Load gate is exactly the round-17 expression', () => {
    expect(SRC).toContain(GATE);
  });

  it('the requiresChoice branch in the PARSE EFFECT nulls the validated draft — a pending choice cannot enable Load', () => {
    const effect = SRC.slice(SRC.indexOf('useEffect(() => {'), SRC.indexOf('}, [messageString]);'));
    const branch = effect.slice(effect.indexOf('if (disposition.requiresChoice) {'));
    const body = branch.slice(0, branch.indexOf('return;'));
    expect(body).toContain('setPendingChoice({ validated: parsed, disposition });');
    expect(body).toContain('setValidatedDraft(null);');
  });

  // THE SECOND CARRIER, found while building this probe and not named in the review round.
  // `commitLoad` does not trust the button at all: it re-derives the disposition from the draft
  // and returns before writing. So the INTEGRITY property ("nothing is written before a choice")
  // has an executable carrier independent of whether the control is rendered disabled — which is
  // what shrinks the mount residue to the AFFORDANCE alone.
  it('commitLoad carries its OWN guard: `!validatedDraft` AND a re-derived `requiresChoice`', () => {
    const fn = SRC.slice(SRC.indexOf('const commitLoad = () => {'), SRC.indexOf('const commitChoice ='));
    expect(fn).toContain('if (!validatedDraft) return;');
    expect(fn).toContain('if (disposition.requiresChoice) return;');
    // and both precede the only write in that function
    expect(fn.indexOf('if (disposition.requiresChoice) return;'))
      .toBeLessThan(fn.indexOf('updateMessage('));
    expect(fn.indexOf('if (!validatedDraft) return;'))
      .toBeLessThan(fn.indexOf('updateMessage('));
  });

  it('commitLoad\'s second guard is EXECUTED, not just read: a row-E draft re-derives requiresChoice', () => {
    // This is the exact call commitLoad makes, over the exact shape a row-E draft carries.
    const draft = { flags: 0, components: [container], content: 'hi', embeds: undefined };
    const d = resolveContentLoss(draft.flags, draft.components, draft.content, draft.embeds);
    expect(d.requiresChoice).toBe(true);
  });

  it('MED-6 ITSELF: cancelChoice (the dismiss) writes NOTHING to validatedDraft', () => {
    const fn = SRC.slice(SRC.indexOf('const cancelChoice ='), SRC.indexOf('const reopenChoice ='));
    expect(fn).toContain('setDismissedChoice(pendingChoice)');
    expect(fn).not.toContain('setValidatedDraft');
  });

  it('MED-6 ITSELF: reopenChoice likewise writes nothing to validatedDraft', () => {
    const fn = SRC.slice(SRC.indexOf('const reopenChoice ='), SRC.indexOf('useEffect(()'));
    expect(fn).not.toContain('setValidatedDraft');
  });

  // CLASS CHECK, not an instance check: the invariant is "validatedDraft is written ONLY inside
  // the parse effect". A future write added anywhere else breaks this, which is the point.
  it('CLASS: every write to validatedDraft lives in the parse effect — 3 writes, enumerated', () => {
    const writes = SRC.match(/setValidatedDraft\([^)]*\)/g) ?? [];
    expect(writes).toEqual(['setValidatedDraft(null)', 'setValidatedDraft(parsed)', 'setValidatedDraft(null)']);
    const effect = SRC.slice(SRC.indexOf('useEffect(() => {'), SRC.indexOf('}, [messageString]);'));
    const inEffect = effect.match(/setValidatedDraft\(/g) ?? [];
    expect(inEffect.length).toBe(writes.length);
  });

  it('the second conjunct cannot fire while the first is true: contentFloorError is computed ONLY when validatedDraft is truthy', () => {
    expect(SRC).toContain('const contentFloorError = validatedDraft\n    ? validateContentRequirements(validatedDraft) : undefined;');
  });

  it('the dead `isValid` state round 17 removed has not come back', () => {
    expect(SRC).not.toContain('setIsValid');
    expect(SRC).not.toContain('const [isValid');
  });
});

describe('P2-C — conjunct isolation on the gate, with both inputs from the real predicates', () => {
  // The gate expression is byte-pinned above; here each conjunct is made the SOLE carrier.
  const gate = (validatedDraft: unknown, contentFloorError: string | undefined) =>
    !validatedDraft || !!contentFloorError;

  it('CONJUNCT 1 SOLE CARRIER — dismissed choice: draft null, floor error absent -> DISABLED', () => {
    // Reached for real: row E requires a choice, the branch nulls the draft, dismiss leaves it null.
    expect(resolveContentLoss(0, [container], 'hi', undefined).requiresChoice).toBe(true);
    expect(gate(null, undefined)).toBe(true);
  });

  it('CONJUNCT 2 SOLE CARRIER — a validated draft that fails the send floor -> DISABLED', () => {
    const draft = { components: [] as unknown[] }; // parses, but has no content/embeds/components
    expect(resolveContentLoss(0, undefined, undefined, undefined).requiresChoice).toBe(false);
    const floor = validateContentRequirements(draft as never);
    expect(floor).toBe('Message must have content, embeds, or components.');
    expect(gate(draft, floor)).toBe(true);
  });

  it('POSITIVE PAIR — a validated draft that passes the floor -> ENABLED (the gate is not always true)', () => {
    const draft = { content: 'hi', username: 'Hooks.gg Bot' };
    const floor = validateContentRequirements(draft as never);
    expect(floor).toBeUndefined();
    expect(gate(draft, floor)).toBe(false);
  });
});

// ---------------------------------------------------------------------------------------------
// P2-D — THE CHOICE-LABEL CLASS. Added by QA Phase 2 after the TDD audit found `SaveChoiceModal`
// carrying an untested, unexcused branch. The branch is not one branch: it is FIVE byte-identical
// copies across five surfaces, none extracted and none tested.
//
// Why it matters rather than being tidiness: BC-9 and BC-11b's oracle is "two options, EACH
// NAMING ITS DROP". Half of each option's text is `describeDropSet(option.dropSet)`, which IS
// TDD-gated. The other half — which mode the option saves as — is this ternary, and a divergence
// at one surface is invisible to a test of another. M8-F parity is asserted on the DISPOSITION
// (resolveContentLoss / describeDropSet, both centralised); it is not asserted on the LABEL.
//
// SWEEP PREDICATE: every file under `src/` whose text contains the string
// `'Save as Components V2'`. 5 matches at 4e9da96 — excludes test files (none match) and
// excludes any surface that renders the option text through a helper (none exists today).
// ---------------------------------------------------------------------------------------------
describe('P2-D — the mode->label mapping is duplicated across five surfaces and must not diverge', () => {
  const SITES = [
    'src/app/message/_components/NewMessageJsonInput.tsx',
    'src/app/message/_components/NewMessageModal.tsx',
    'src/app/message/m/[id]/_components/SaveAsMenu.tsx',
    'src/app/message/m/[id]/_components/JsonModalBody.tsx',
    'src/providers/MessageProvider/SaveChoiceModal.tsx',
  ];
  const EXPR = "{option.mode === 'v2' ? 'Save as Components V2' : 'Save as Classic'}";
  const read = (rel: string) => readFileSync(resolve(__dirname, '../..', rel.replace(/^src\//, '')), 'utf8');

  it.each(SITES)('%s carries the label expression verbatim', (site) => {
    expect(read(site)).toContain(EXPR);
  });

  it('every site pairs the label with the TDD-gated drop-set half — so the option text is complete at each', () => {
    for (const site of SITES) expect(read(site)).toContain('describeDropSet(option.dropSet)');
  });

  // CONTROL, the other direction: the string must not appear anywhere ELSE, or the enumeration
  // above is a coordinate list rather than the class.
  it('CONTROL — the class is exactly these five sites; a sixth would falsify the enumeration', () => {
    const found = SITES.filter((s) => read(s).includes("'Save as Components V2'"));
    expect(found).toHaveLength(5);
  });
});

// ---------------------------------------------------------------------------------------------
// P2-E — INFO-2, EXECUTED. Steering closed R9 on the condition that every application site ROUTES
// through the gate, and recorded INFO-2: `NewMessageModal`'s `gateBeforePersist` branch is "dead
// today — no M3 ingress source produces a row-E loadedMessage". Steering's own words: routing is
// not reachability, and QA needs EXERCISED, not WIRED. This executes the reachability half.
// ---------------------------------------------------------------------------------------------
import discordResponseToMessage from '~/utils/discordResponseToMessage';
import { gateBeforePersist } from '~/utils';

describe('P2-E — is NewMessageModal\'s gate branch reachable from the ingress converter?', () => {
  const apiMessage = (over: Record<string, unknown> = {}) => ({
    author: { id: '1', username: 'u', avatar: null, discriminator: '0' },
    content: 'hi',
    embeds: [],
    components: [{ type: 17, components: [{ type: 10, content: 'x' }] }],
    flags: 1 << 15,
    ...over,
  });

  it('the converter preserves content, components AND the flag together — it does not normalise', () => {
    const { data } = discordResponseToMessage(apiMessage() as never);
    expect(data.content).toBe('hi');
    expect(data.flags).toBe(32768);
    expect((data.components as unknown[])).toHaveLength(1);
  });

  it('THE ANSWER: that converter output IS a row-E record, so the gate branch is REACHABLE, not dead', () => {
    const { data } = discordResponseToMessage(apiMessage() as never);
    const gate = gateBeforePersist(data as never);
    expect(gate.mustAsk).toBe(true);
    expect(gate.options).toHaveLength(2);
  });

  it('CONTROL — a classic Discord message does NOT trip the gate (so mustAsk is not always true)', () => {
    const { data } = discordResponseToMessage(apiMessage({ components: [], flags: 0 }) as never);
    expect(gateBeforePersist(data as never).mustAsk).toBe(false);
  });

  it('CONTROL — a V2-only Discord message (no classic body) does NOT trip the gate', () => {
    const { data } = discordResponseToMessage(apiMessage({ content: '' }) as never);
    expect(gateBeforePersist(data as never).mustAsk).toBe(false);
  });

  // The residue this probe CANNOT settle, stated rather than implied: whether Discord's API can
  // ever RETURN a message carrying both, and whether any spec exercises the call site itself.
  it('THE CALL SITE IS STILL UNEXERCISED — no spec invokes NewMessageModal.onSubmit', () => {
    const modal = readFileSync(
      resolve(__dirname, '../../app/message/_components/NewMessageModal.tsx'), 'utf8',
    );
    expect(modal).toContain('const gate = gateBeforePersist(loadedMessage);');
    // The gate FUNCTION is covered (013-m8-ec3-resolver-gate.test.ts); the CALL SITE is not.
    // Asserting the wiring text is the most this tree can do without a mount.
  });
});
