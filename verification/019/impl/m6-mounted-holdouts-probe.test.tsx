import { writeFileSync } from 'node:fs';
import { it } from 'vitest';
import { mountEditor, pasteText, typeText, unmountEditor } from './helpers/mountedEditor';
import red from './helpers/data/mountedBaseRed.json';

it('probe', async () => {
  const out: unknown[] = [];
  for (const [cls, texts] of Object.entries(red as Record<string, string[]>)) {
    for (const text of texts) {
      for (const [mode, enter] of [['typed', typeText], ['pasted', pasteText]] as const) {
        const m = mountEditor('', false);
        // eslint-disable-next-line no-await-in-loop
        await enter(m, text);
        out.push({ cls, mode, text, got: m.writes.at(-1) ?? '' });
        unmountEditor();
      }
    }
  }
  writeFileSync(process.env.PROBE_OUT as string, JSON.stringify(out, null, 1));
}, 300_000);
