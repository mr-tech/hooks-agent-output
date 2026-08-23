// Positive control: relative import, no path alias. Proves the runner works.
import { SIBLING_OK } from './sibling';

process.stdout.write(`CONTROL: ${SIBLING_OK}\n`);
