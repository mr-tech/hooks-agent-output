/**
 * Differential: bc5ee2b's inline `switchMode` dispatch vs 681c353's `applyModeSwitch`.
 * Both dispatchers are written out independently here; neither expectation is computed
 * by calling the other. Randomized corpus, fixed seed (no Date.now/Math.random drift).
 */
import { switchToV2, switchToClassic, applyModeSwitch } from '~/utils/messageMode';
import { IS_COMPONENTS_V2_FLAG } from '~/constants/messageLimits';

// bc5ee2b's dispatch, transcribed from `switchMode` at that commit.
function oldDispatch(targetMode: string, prev: any) {
  if (targetMode === 'v2') return switchToV2(prev);
  return switchToClassic(prev);
}

// Positive control: an inverted dispatcher the differential MUST flag.
function invertedDispatch(targetMode: string, prev: any) {
  if (targetMode === 'v2') return switchToClassic(prev);
  return switchToV2(prev);
}

let seed = 20260823;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const pick = <T,>(a: T[]) => a[Math.floor(rnd() * a.length)] as T;

const TYPES = [1, 9, 10, 11, 12, 13, 14, 17];
function draft() {
  const n = Math.floor(rnd() * 5);
  return {
    content: pick(['', 'hi', '   ', 'x'.repeat(10)]),
    embeds: rnd() < 0.5 ? [] : [{ title: 'T' }],
    components: Array.from({ length: n }, () => ({ type: pick(TYPES) })),
    flags: pick([0, 4, IS_COMPONENTS_V2_FLAG, IS_COMPONENTS_V2_FLAG | 4]),
  };
}

let checked = 0; let diffs = 0; let controlFired = 0;
for (let i = 0; i < 5000; i += 1) {
  const mode = pick(['v2', 'classic']);
  const d = draft();
  const a = JSON.stringify(oldDispatch(mode, { ...d }));
  const b = JSON.stringify(applyModeSwitch(mode as any, { ...d }));
  const c = JSON.stringify(invertedDispatch(mode, { ...d }));
  checked += 1;
  if (a !== b) diffs += 1;
  if (a !== c) controlFired += 1;
}
process.stdout.write(`corpus=${checked} subject_diffs=${diffs} control_diffs=${controlFired}\n`);
process.stdout.write(diffs === 0 && controlFired > 0 ? 'RESULT: equivalent, control live\n' : 'RESULT: INCONCLUSIVE\n');
