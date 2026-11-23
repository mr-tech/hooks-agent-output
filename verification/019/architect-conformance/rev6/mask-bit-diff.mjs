import { Syntax } from '@discord/markdown-types';
const names = Object.entries(Syntax).filter(([k,v]) => (v & (v-1)) === 0);
const content = 0x3fffffff;
const masks = { description:0x3fffffff, fieldValue:0x3dffffff, v2:0x3fffffff, titleName:0x19fec97f, titleNameUrl:0x19fec907 };
const contain = ['CUSTOM_EMOJI','COLON_EMOJI','UNICODE_EMOJI','MASKED_LINK','DETECTED_LINK','AUTO_LINK','CONTACT_LINK','CODE_BLOCK','CODE','DOUBLE_CODE'];
for (const [m,v] of Object.entries(masks)) {
  const d = names.filter(([k,b]) => ((v ^ content) & b)).map(([k])=>k);
  const dc = d.filter(k=>contain.includes(k));
  console.log(m, 'differs from content on:', d.join(',')||'-', '| on containment bits:', dc.join(',')||'-');
}
