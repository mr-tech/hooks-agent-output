import { describe, expect, it, vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
vi.mock('~/utils/hooks/useCopyToClipboard', () => ({ default: () => [null, () => {}] }));
vi.mock('~/utils/hooks/useCodeMirror', () => ({ default: () => ({ ref: { current: null }, updateDoc: () => {} }) }));
vi.mock('react-use', () => ({ useUpdateEffect: () => {} }));
let stateVals: unknown[] = []; let stateIdx = 0;
vi.mock('react', async (o) => { const a = await o<typeof import('react')>(); return { ...a, useState: (init: unknown) => { const v = stateIdx < stateVals.length ? stateVals[stateIdx] : init; stateIdx += 1; return [v, () => {}]; } }; });
import Drift from './DriftExtraState';
function render(el: any): any { if (el==null||typeof el==='boolean') return null; if (typeof el==='string'||typeof el==='number') return String(el); if (Array.isArray(el)) return el.map(render).filter((x)=>x!==null); if (typeof el.type==='function') return render(el.type(el.props)); return { tag: el.type, className: el.props?.className, children: render(el.props?.children) }; }
function text(n: any): string { if (n===null) return ''; if (typeof n==='string') return n; if (Array.isArray(n)) return n.map(text).join(''); return text(n.children); }
const NOTICE='QA-ROW-D-SETTLED-NOTICE';
function paste(C:any,o:{error?:null|string;settled?:null|string}){ stateVals=['{}',o.error??null,[],null,null,o.settled??null]; stateIdx=0; return render((C as any)({setMessage:()=>{}})); }
describe('A3 — an extra useState before settledNotice shifts the slot; injection must be CAUGHT', () => {
  it('the settled-notice assertion FAILS under drift (not a silent pass)', () => {
    // With the extra slot consuming index 5, settledNotice reads index 6 = init(null) -> no NOTICE.
    expect(text(paste(Drift, { settled: NOTICE }))).not.toContain(NOTICE);
  });
});
