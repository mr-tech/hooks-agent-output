// QA probe (not a suite file), website 119471f: the oracle helper's spans and the lift's ranges for an emoji newer than the
// site's table, beside a control form. Placed in src/components/SlateEditor/utils/__tests__/; QA_OUT names the output.
import { writeFileSync } from 'node:fs';
import { beforeAll, it, vi } from 'vitest';

import getInitialValue from '../getInitialValue';
import { emojiRangesOf } from '../../__tests__/helpers/emojiInputs';

import type { Element } from 'slate';

import { startEngine } from '~/utils/markdown/engine';
import { nativeEmojiSpans } from '~/utils/markdown/__tests__/helpers/discordOracle';

vi.mock('~/env.mjs', () => ({ env: {} }));
beforeAll(async () => { await startEngine(); });

it('reads both sides', () => {
  const forms = ['🫩', 'a🫩b', '**🫩**', '🙂', '❤'];
  const rows = forms.map((text) => ({
    text,
    helper: nativeEmojiSpans('content', text),
    lift: emojiRangesOf(getInitialValue(text, 'content', false) as Element[]),
  }));
  writeFileSync(process.env.QA_OUT as string, JSON.stringify(rows, null, 1));
});
