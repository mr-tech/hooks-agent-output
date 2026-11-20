// Can a per-call issue cap be wired into a tRPC 11.10 procedure with zod 3.22.4, keeping the schema's types?
import { createRequire } from 'node:module';
const require = createRequire('/usr/local/bin/hooks/website/package.json');
const { z, ZodError } = require('zod');
const { initTRPC } = require('@trpc/server');
const MAX = 20;
const STOP = Symbol('stop');
function cappedInput(schema) {
  return {
    _input: undefined, _output: undefined,
    async parseAsync(value) {
      const seen = [];
      const errorMap = (issue, ctx) => { seen.push({ ...issue, message: issue.message ?? ctx.defaultError }); if (seen.length > MAX) throw STOP; return { message: ctx.defaultError }; };
      let r;
      try { r = schema.safeParse(value, { errorMap }); } catch (e) {
        if (e !== STOP) throw e;
        throw new ZodError([...seen.slice(0, MAX), { code: 'custom', path: [], message: 'Stopped checking after ' + MAX + ' errors' }]);
      }
      if (!r.success) throw r.error;
      return r.data;
    },
  };
}
const schema = z.object({ a: z.array(z.string()) });
const t = initTRPC.create();
const router = t.router({ save: t.procedure.input(cappedInput(schema)).mutation(({ input }) => input.a.length) });
const caller = t.createCallerFactory(router)({});
for (const n of [3, 5000]) {
  try { await caller.save({ a: Array(n).fill(1) }); console.log(n, 'accepted'); }
  catch (e) { const issues = JSON.parse(e.message); console.log(n, 'refused', e.code, '| issues', issues.length, '| last', JSON.stringify(issues.at(-1)), '| message bytes', e.message.length); }
}
const both = await Promise.allSettled([caller.save({ a: Array(30).fill(1) }), caller.save({ a: Array(30).fill(1) })]);
console.log('concurrent', both.map((x) => JSON.parse(x.reason.message).length).join(','));
console.log('ok', await caller.save({ a: ['x'] }));
