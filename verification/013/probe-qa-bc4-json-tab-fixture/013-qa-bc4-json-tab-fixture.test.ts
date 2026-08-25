/**
 * QA instrument — BC-4's candidate fixture, and the `{}` trap beside it.
 *
 * SETTLES: whether the New Message dialog's **JSON tab** gives BC-4 an executable fixture, so that
 * the row stops depending on a Discord message link no agent may fetch. BC-4's predicted value has
 * three limbs — *dialog stays · error shown · no new message created* — and each is asserted here
 * against the real component functions, not read off the source.
 *
 * ALSO SETTLES: that the editor's initial document `{}` is NOT a usable fixture, although it fails
 * the same floor. `NewMessageJsonInput` seeds its editor with `JSON.stringify({}, null, 2)` and
 * parses inside a `useUpdateEffect`, which skips the first render — so a run that "pastes nothing"
 * never evaluates the floor at all and reports a green row over an unexecuted check. Block C
 * executes react-use's shipped implementation to prove the skip rather than citing its docs.
 *
 * D28 COMPLIANCE: no jsdom, no happy-dom, no @testing-library/react, no change to
 * `vitest.config.ts`. React function components are plain functions; this calls them and inspects
 * the returned element objects. It is NOT a mounted render and is NOT a substitute for the
 * operator's own observation — see "WHAT THIS CANNOT ESTABLISH" at the foot of the file.
 *
 * MUTANTS: set QA_BC4_MUTANT to run a mutant instead of the shipped code.
 *   floor-off   — validateContentRequirements always returns undefined
 *   choice-on   — resolveContentLoss always requiresChoice (a V2 choice dialog would intercept)
 * Each mutant must turn some assertion red; a mutant that leaves the file green means the
 * corresponding limb is not actually carried by any fixture here.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';

import {
  beforeEach, describe, expect, it, vi,
} from 'vitest';

const MUTANT = process.env.QA_BC4_MUTANT ?? '';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

// ---------------------------------------------------------------------------
// Mutants. Both wrap the REAL module and replace exactly one export.
// ---------------------------------------------------------------------------
vi.mock('~/utils/limits', async (orig) => {
  const actual = await orig<typeof import('~/utils/limits')>();
  if (process.env.QA_BC4_MUTANT !== 'floor-off') return actual;
  return { ...actual, validateContentRequirements: () => undefined };
});

vi.mock('~/utils', async (orig) => {
  const actual = await orig<typeof import('~/utils')>();
  if (process.env.QA_BC4_MUTANT !== 'choice-on') return actual;
  return {
    ...actual,
    resolveContentLoss: () => ({
      row: 'E',
      mode: null,
      noticeClass: 'choice',
      requiresChoice: true,
      options: [],
    }),
  };
});

// ---------------------------------------------------------------------------
// Hook harness for the function-call render of NewMessageModal.
// ---------------------------------------------------------------------------
const H = { stateVals: [] as unknown[], stateIdx: 0 };

vi.mock('react', async (orig) => {
  const actual = await orig<typeof import('react')>();
  return {
    ...actual,
    useState: (init: unknown) => {
      const i = H.stateIdx;
      H.stateIdx += 1;
      return [i < H.stateVals.length ? H.stateVals[i] : init, () => {}];
    },
    useRef: (init: unknown) => ({ current: init === undefined ? null : init }),
    useEffect: () => {},
    useMemo: (fn: () => unknown) => fn(),
    useCallback: (fn: unknown) => fn,
    memo: (c: unknown) => c,
  };
});

const routerPush = vi.fn();
const upsertMutate = vi.fn();

vi.mock('next-auth/react', () => ({ useSession: () => ({ data: { user: { guilds: [] } } }) }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: routerPush }) }));
vi.mock('next/dynamic', () => ({ default: () => function JsonTabStub() { return null; } }));
vi.mock('@tanstack/react-query', () => ({ useQueryClient: () => ({ removeQueries: () => {} }) }));
vi.mock('@trpc/react-query', () => ({ getQueryKey: () => [] }));
vi.mock('~/components/MessagePreview', () => ({ default: () => null }));
vi.mock('~/utils/hooks/useValidateWebhook', () => ({
  default: () => ({
    isLoading: false,
    message: undefined,
    webhook: undefined,
    droppedComponentTypes: [],
    messageError: undefined,
    webhookError: undefined,
  }),
}));
vi.mock('~/utils/hooks/useGuildDropdownItems', () => ({ default: () => [] }));
vi.mock('react-aria', () => ({ useLabel: () => ({ labelProps: {}, fieldProps: {} }) }));
vi.mock('~/utils/api', () => ({
  api: {
    message: {
      upsert: { useMutation: () => ({ mutate: upsertMutate, isPending: false, error: null }) },
      getFromUrl: { useQuery: () => ({ data: undefined, isFetching: false, error: null }) },
      getFromCode: { useQuery: () => ({ data: undefined, isFetching: false, error: null }) },
    },
  },
}));

import NullableComponent from '~/components/NullableComponent';
import NewMessageModal from '~/app/message/_components/NewMessageModal';
import { discordMessageImportShape } from '~/server/api/utils/shapes';
import { applyDisposition, makeEditable, resolveContentLoss } from '~/utils';
import { validateContentRequirements } from '~/utils/limits';

const FLOOR_MESSAGE = 'Message must have content, embeds, or components.';

// ---------------------------------------------------------------------------
// Block B — coupling guard. If the shipped expressions move, every test throws
// rather than silently going on measuring a model of code that no longer exists.
// ---------------------------------------------------------------------------
const MODAL_SRC = readFileSync(
  resolve(process.cwd(), 'src/app/message/_components/NewMessageModal.tsx'),
  'utf8',
);
const JSON_SRC = readFileSync(
  resolve(process.cwd(), 'src/app/message/_components/NewMessageJsonInput.tsx'),
  'utf8',
);
const UPDATE_EFFECT_SRC = readFileSync(
  resolve(process.cwd(), 'node_modules/react-use/lib/useUpdateEffect.js'),
  'utf8',
);
const FIRST_MOUNT_SRC = readFileSync(
  resolve(process.cwd(), 'node_modules/react-use/lib/useFirstMountState.js'),
  'utf8',
);

const COUPLINGS: [string, string][] = [
  ['modal: json tab exists', "id: 'json'"],
  ['modal: json tab feeds setJsonMessage', 'setMessage={setJsonMessage}'],
  ['modal: floor computed over loadedMessage', 'validateContentRequirements(loadedMessage)'],
  ['modal: floor error render guard', '!!loadedMessage && contentFloorError'],
  ['modal: Continue gate excludes the floor', 'isDisabled={!loadedMessage || isDisabled}'],
  ['modal: Save gate includes the floor', '|| !!contentFloorError'],
  ['jsonInput: editor seeded with {}', 'useState(JSON.stringify({}, null, 2))'],
  ['jsonInput: parse runs in useUpdateEffect', 'useUpdateEffect(() => {'],
];

describe('B — coupling guard (the instrument is pinned to the shipped source)', () => {
  it.each(COUPLINGS)('%s', (_label, needle) => {
    expect(MODAL_SRC + JSON_SRC).toContain(needle);
  });
});

// ---------------------------------------------------------------------------
// Block A — the pipeline the JSON tab actually runs, executed end to end.
// Mirrors NewMessageJsonInput's effect body (parse -> shape -> resolve ->
// applyDisposition -> setMessage) then NewMessageModal's loadedMessage memo
// (makeEditable) and its floor call.
// ---------------------------------------------------------------------------
/** Everything the JSON tab does with a pasted document, up to `setMessage`. */
function pasteIntoJsonTab(raw: string): { sentToModal: unknown; requiresChoice: boolean; row: string } {
  const parsed = JSON.parse(raw) as Record<string, unknown>;
  const validated = discordMessageImportShape.parse(parsed) as never;
  const disposition = resolveContentLoss(
    (validated as { flags?: number }).flags,
    (validated as { components?: { type: number }[] }).components,
    (validated as { content?: string }).content,
    (validated as { embeds?: unknown[] }).embeds,
  );
  if (disposition.requiresChoice) {
    // The V2 choice dialog intercepts; setMessage(null) — nothing reaches the modal.
    return { sentToModal: null, requiresChoice: true, row: disposition.row };
  }
  return {
    sentToModal: applyDisposition(validated),
    requiresChoice: false,
    row: disposition.row,
  };
}

/** NewMessageModal's own two lines: the loadedMessage memo, then the floor. */
function modalFloorFor(sentToModal: unknown): string | undefined {
  if (!sentToModal) return undefined;
  const loaded = makeEditable({ data: sentToModal } as never).data;
  return validateContentRequirements(loaded as never);
}

describe('A — the candidate fixture {"content": ""} reaches the content floor', () => {
  const paste = () => pasteIntoJsonTab('{"content": ""}');

  it('A1 the shape accepts it — no Zod error branch, so the tab shows no parse error', () => {
    expect(() => paste()).not.toThrow();
  });

  it('A2 no V2 choice is required — no choice dialog intercepts the paste', () => {
    expect(paste().requiresChoice).toBe(false);
    expect(paste().row).toBe('A');
  });

  it('A3 a message IS handed to the modal (loadedMessage becomes truthy)', () => {
    expect(paste().sentToModal).not.toBeNull();
  });

  it('A4 the modal floor refuses it with the operator-visible message', () => {
    expect(modalFloorFor(paste().sentToModal)).toBe(FLOOR_MESSAGE);
  });
});

describe('A(control) — the positive direction: a floor-passing paste is NOT refused', () => {
  // Without this, a blanket refusal (or a broken pipeline) would pass block A.
  it.each([
    ['{"content": "hi"}'],
    ['{"embeds": [{"title": "t"}]}'],
    ['{"components": [{"type": 10, "content": "x"}]}'],
  ])('%s loads and is accepted', (raw) => {
    const out = pasteIntoJsonTab(raw);
    expect(out.sentToModal).not.toBeNull();
    expect(modalFloorFor(out.sentToModal)).toBeUndefined();
  });

  it('whitespace-only content is refused (the floor trims, so "   " is not a body)', () => {
    expect(modalFloorFor(pasteIntoJsonTab('{"content": "   "}').sentToModal)).toBe(FLOOR_MESSAGE);
  });
});

// ---------------------------------------------------------------------------
// Block C — the `{}` trap, executed.
// ---------------------------------------------------------------------------
/** Execute react-use's SHIPPED files against a stub react, as CommonJS. */
function loadShippedUseUpdateEffect(reactStub: Record<string, unknown>) {
  const run = (code: string, req: (id: string) => unknown) => {
    const mod = { exports: {} as Record<string, unknown> };
    // eslint-disable-next-line no-new-func
    new Function('exports', 'require', 'module', code)(mod.exports, req, mod);
    return mod.exports;
  };
  const firstMount = run(FIRST_MOUNT_SRC, (id) => (id === 'react' ? reactStub : undefined));
  return run(UPDATE_EFFECT_SRC, (id) => {
    if (id === 'react') return reactStub;
    if (id === './useFirstMountState') return firstMount;
    return undefined;
  }).default as (effect: () => void, deps: unknown[]) => void;
}

describe('C — the editor\'s initial `{}` is NOT an executable fixture', () => {
  it('C1 `{}` fails the same floor, so it looks equally valid by outcome-reasoning', () => {
    expect(modalFloorFor(pasteIntoJsonTab('{}').sentToModal)).toBe(FLOOR_MESSAGE);
  });

  it('C2 but useUpdateEffect skips the first render — executed against the shipped file', () => {
    const refs: { current: unknown }[] = [];
    let refIdx = 0;
    const pending: Array<() => void> = [];
    const reactStub = {
      useRef: (init: unknown) => {
        const i = refIdx;
        refIdx += 1;
        if (!refs[i]) refs[i] = { current: init };
        return refs[i];
      },
      useEffect: (fn: () => void) => { pending.push(fn); },
    };
    const useUpdateEffect = loadShippedUseUpdateEffect(reactStub);
    const effect = vi.fn();

    const renderPass = () => {
      refIdx = 0;
      pending.length = 0;
      useUpdateEffect(effect, []);
      pending.forEach((fn) => fn());
    };

    renderPass(); // mount: editor document is "{}"
    expect(effect).toHaveBeenCalledTimes(0);

    renderPass(); // a paste changes the document
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('C3 therefore a run that pastes nothing leaves loadedMessage undefined — a DIFFERENT screen', () => {
    // setMessage is never called, so jsonMessage stays null and the modal's floor line
    // short-circuits on the `loadedMessage ?` ternary. contentFloorError is undefined because
    // the check DID NOT RUN, not because the document passed.
    const view = renderModal({ jsonMessage: null, page: 0, messageName: 'X' });
    expect(textOf(view)).not.toContain(FLOOR_MESSAGE);
    expect(buttonNamed(view, 'Continue')?.props.isDisabled).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Block D — the three limbs, on the real component function.
// ---------------------------------------------------------------------------
type Node = { tag: string; props: Record<string, any>; children: any };

function norm(el: any): any {
  if (el === null || el === undefined || typeof el === 'boolean') return null;
  if (typeof el === 'string' || typeof el === 'number') return String(el);
  if (Array.isArray(el)) return el.map(norm).filter((x) => x !== null);
  if (typeof el !== 'object' || !('type' in el)) return null;
  if (el.type === NullableComponent) return norm((NullableComponent as any)(el.props));
  // A Transition with show={false} is off-screen: the operator cannot see it.
  if (el.props && el.props.show === false) return null;
  const t = el.type;
  const tag = typeof t === 'function' ? (t.displayName || t.name || 'Component')
    : typeof t === 'string' ? t
      : (t?.displayName || t?.name || 'Component');
  return { tag, props: el.props ?? {}, children: norm(el.props?.children) };
}

function textOf(n: any): string {
  if (n === null) return '';
  if (typeof n === 'string') return n;
  if (Array.isArray(n)) return n.map(textOf).join('');
  return textOf(n.children);
}

function findAll(n: any, pred: (x: Node) => boolean, acc: Node[] = []): Node[] {
  if (n === null || typeof n === 'string') return acc;
  if (Array.isArray(n)) { n.forEach((c) => findAll(c, pred, acc)); return acc; }
  if (pred(n)) acc.push(n);
  findAll(n.children, pred, acc);
  return acc;
}

function buttonNamed(view: any, label: string): Node | undefined {
  return findAll(view, (x) => x.tag === 'Button' && textOf(x).includes(label))[0];
}

function renderModal(opts: {
  jsonMessage: unknown; page: 0 | 1; messageName: string;
}) {
  H.stateVals = [
    '', // messageIdOrUrl
    '', // commandMessageCode
    '', // webhookUrl
    opts.page, // page
    'json', // loadOption
    opts.jsonMessage, // jsonMessage
    opts.messageName, // messageName
    '0', // selectedGuildId
    null, // pendingChoice
  ];
  H.stateIdx = 0;
  return norm((NewMessageModal as any)({ open: true, onClose: () => {}, guildId: '' }));
}

const FIXTURE = () => pasteIntoJsonTab('{"content": ""}').sentToModal;
const VALID = () => pasteIntoJsonTab('{"content": "hi"}').sentToModal;

describe('D — BC-4\'s three limbs, with the fixture loaded into the JSON tab', () => {
  beforeEach(() => { routerPush.mockClear(); upsertMutate.mockClear(); });

  it('D1 ERROR SHOWN — page 1 of the dialog renders the floor message', () => {
    const view = renderModal({ jsonMessage: FIXTURE(), page: 0, messageName: 'X' });
    expect(textOf(view)).toContain(FLOOR_MESSAGE);
  });

  it('D1b and the error is on the FIRST page, below the JSON box — it does not follow Continue', () => {
    const page2 = renderModal({ jsonMessage: FIXTURE(), page: 1, messageName: 'X' });
    expect(textOf(page2)).not.toContain(FLOOR_MESSAGE);
  });

  it('D2 NOTHING CREATED — Save is disabled, and the floor is its SOLE carrier here', () => {
    const view = renderModal({ jsonMessage: FIXTURE(), page: 1, messageName: 'X' });
    expect(buttonNamed(view, 'Save')?.props.isDisabled).toBe(true);
    // sole-carrier control: same state, floor-passing document -> Save enabled.
    const ok = renderModal({ jsonMessage: VALID(), page: 1, messageName: 'X' });
    expect(buttonNamed(ok, 'Save')?.props.isDisabled).toBe(false);
  });

  it('D2b the Enter-key path is gated by the same value (Form isDisabled)', () => {
    const view = renderModal({ jsonMessage: FIXTURE(), page: 1, messageName: 'X' });
    const form = findAll(view, (x) => x.tag === 'Form')[0];
    expect(form?.props.isDisabled).toBe(true);
    const ok = renderModal({ jsonMessage: VALID(), page: 1, messageName: 'X' });
    expect(findAll(ok, (x) => x.tag === 'Form')[0]?.props.isDisabled).toBe(false);
  });

  it('D3 DIALOG STAYS / NO NAVIGATION — rendering the refusal calls neither push nor upsert', () => {
    renderModal({ jsonMessage: FIXTURE(), page: 0, messageName: 'X' });
    renderModal({ jsonMessage: FIXTURE(), page: 1, messageName: 'X' });
    expect(routerPush).toHaveBeenCalledTimes(0);
    expect(upsertMutate).toHaveBeenCalledTimes(0);
    // navigation exists only inside upsert's onSuccess, which no path here reaches.
    expect(MODAL_SRC).toContain('onSuccess: ({ id }) => router.push(`/message/m/${id}/edit`)');
  });
});

describe('D(observed) — what the un-gated Continue actually produces', () => {
  it('Continue is ENABLED on a floor-failing document, and page 2 shows no reason', () => {
    const page1 = renderModal({ jsonMessage: FIXTURE(), page: 0, messageName: 'X' });
    expect(buttonNamed(page1, 'Continue')?.props.isDisabled).toBe(false);
    const page2 = renderModal({ jsonMessage: FIXTURE(), page: 1, messageName: 'X' });
    expect(buttonNamed(page2, 'Save')?.props.isDisabled).toBe(true);
    expect(textOf(page2)).not.toContain(FLOOR_MESSAGE);
  });
});

describe('D4 — control: the no-upsert instrument is observed FIRING', () => {
  beforeEach(() => { routerPush.mockClear(); upsertMutate.mockClear(); });

  it('the spy is live — Form.onSubmit on a floor-passing document DOES call upsert', () => {
    const ok = renderModal({ jsonMessage: VALID(), page: 1, messageName: 'X' });
    (findAll(ok, (x) => x.tag === 'Form')[0].props.onSubmit as () => void)();
    expect(upsertMutate).toHaveBeenCalledTimes(1);
  });

  it('OBSERVED: onSubmit carries no floor check of its own — the refusal rests wholly on disableSave', () => {
    const view = renderModal({ jsonMessage: FIXTURE(), page: 1, messageName: 'X' });
    (findAll(view, (x) => x.tag === 'Form')[0].props.onSubmit as () => void)();
    // Reached only by bypassing the disabled flag. Recorded because it means the "nothing created"
    // limb has exactly two carriers (Form.isDisabled, Button.isDisabled) and no third in depth.
    expect(upsertMutate).toHaveBeenCalledTimes(1);
  });
});

describe('MUTANT REPORT', () => {
  it('records which mutant this run executed', () => {
    expect(['', 'floor-off', 'choice-on']).toContain(MUTANT);
  });
});

/**
 * WHAT THIS CANNOT ESTABLISH
 *
 * 1. It does not mount the dialog. CodeMirror is stubbed by `next/dynamic`, so the act of TYPING
 *    the fixture into the editor — and CodeMirror's own onChange reaching `setJsonMessageString` —
 *    is not exercised here. That is the operator's half of BC-4 and is why the row keeps a human
 *    subject.
 * 2. It does not establish that Discord accepts or rejects anything. Out of scope by ruling D36.
 * 3. `{}`'s inertness is established on react-use's shipped implementation plus the two coupling
 *    guards, not on a mounted React render. Falsity signature: an operator leaves the editor at
 *    `{}`, sees no error and a disabled Continue, and records BC-4 as FAILED ("no error shown")
 *    when in fact the check never ran.
 */
