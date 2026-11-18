import { after } from 'next/server';
export default function handler(req, res) {
  let outcome;
  try { after(() => { console.log('POC pages-api after() callback RAN'); }); outcome = 'after() accepted'; }
  catch (e) { outcome = 'after() threw: ' + e.message; }
  const ctx = globalThis[Symbol.for('@next/request-context')]?.get?.();
  res.status(200).json({ outcome, nextRequestContext: ctx ? Object.keys(ctx) : null,
    vercelRequestContext: globalThis[Symbol.for('@vercel/request-context')] ? 'present' : null });
}
