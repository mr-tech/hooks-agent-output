import { describe, expect, it, vi } from 'vitest';
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
// NOTE: useCopyToClipboard mock intentionally OMITTED.
vi.mock('~/utils/hooks/useCodeMirror', () => ({ default: () => ({ ref: { current: null }, updateDoc: () => {} }) }));
vi.mock('react-use', () => ({ useUpdateEffect: () => {} }));
let stateVals: unknown[] = []; let stateIdx = 0;
vi.mock('react', async (o) => { const a = await o<typeof import('react')>(); return { ...a, useState: (init: unknown) => { const v = stateIdx < stateVals.length ? stateVals[stateIdx] : init; stateIdx += 1; return [v, () => {}]; } }; });
import Real from '~/app/message/_components/NewMessageJsonInput';
function render(el: any): any { if (el==null||typeof el==='boolean') return null; if (typeof el==='string'||typeof el==='number') return String(el); if (Array.isArray(el)) return el.map(render).filter((x)=>x!==null); if (typeof el.type==='function') return render(el.type(el.props)); return { tag: el.type, className: el.props?.className, children: render(el.props?.children) }; }
const NOTICE='QA-ROW-D-SETTLED-NOTICE';
describe('A1 — dropping the useCopyToClipboard mock must FAIL LOUDLY, not silently pass', () => {
  it('calling the component throws (real hook hits null React dispatcher)', () => {
    stateVals=['{}',null,[],null,null,NOTICE]; stateIdx=0;
    expect(() => render((Real as any)({ setMessage: () => {} }))).toThrow();
  });
});
