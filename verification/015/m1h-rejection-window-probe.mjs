// ILLUSTRATIVE probe: a promise rejects while an unrelated await is pending; its handler is attached only afterwards.
process.on('unhandledRejection', (e) => { console.log('UNHANDLED', e.message); });
process.on('rejectionHandled', () => { console.log('rejectionHandled (late)'); });
const delay = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
async function f() {
  const messagePromise = delay(5).then(() => { throw new Error('messages failed'); });
  await delay(20, 'account');            // stands in for await fetchUserAccount
  try { await Promise.all([[], messagePromise]); } catch (e) { console.log('caught later', e.message); }
}
await f();
