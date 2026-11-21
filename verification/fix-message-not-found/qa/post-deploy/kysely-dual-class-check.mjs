// Is the NoResultError an ESM `import` sees the same class as the one a CommonJS `require` sees (project-utils' form)?
import { createRequire } from 'node:module';
const require = createRequire(process.cwd() + '/node_modules/project-utils/dist/postgres.js');
const esm = await import(process.cwd() + '/node_modules/kysely/dist/esm/index.js');
const cjs = require('kysely');
const fromCjs = new cjs.NoResultError(null);
console.log(JSON.stringify({
  sameClass: esm.NoResultError === cjs.NoResultError,
  cjsErrorInstanceofEsmClass: fromCjs instanceof esm.NoResultError,
  positiveControl_cjsErrorInstanceofCjsClass: fromCjs instanceof cjs.NoResultError,
  cjsResolved: require.resolve('kysely'),
}));
