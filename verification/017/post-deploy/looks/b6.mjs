import fs from 'fs';
import {launch,now,sleep,D,SH,cookies,log} from './lib.mjs';
import {save,append} from './lib2.mjs';
const N=6024, marker=process.argv[2], tag=process.argv[3];
const out=`${D}/b6-${tag}.jsonl`; const L=o=>fs.appendFileSync(out,JSON.stringify({t:now(),...o})+'\n');
const ctx=await launch(); const page=ctx.pages()[0]||await ctx.newPage();
page.on('request',r=>{if(r.method()!=='GET')L({k:'req',m:r.method(),u:r.url().split('?')[0]})});
const prev=async()=>page.evaluate(N=>{const a=document.querySelector(`a[href="/message/m/${N}/edit"]`);const c=a?.closest('li,div[class*=card],article')||a?.parentElement;const im=(c||document).querySelectorAll('img');return [...im].map(i=>({src:i.currentSrc||i.src,nw:i.naturalWidth})).filter(x=>/preview/i.test(x.src));},N);
await page.goto('https://hooks.gg/message'); await sleep(3500); await cookies(page);
L({k:'baseline',imgs:await prev()});
await page.goto(`https://hooks.gg/message/m/${N}/edit`); await sleep(4000);
await append(page,marker); await sleep(600);
const T1=await save(page); L({k:'T1',T1}); await sleep(2500);
await page.screenshot({path:`${SH}/b6-${tag}-saved.png`});
const t0=Date.now(); await page.goto('https://hooks.gg/message');
let base=null,changed=null;
for(let i=0;i<10;i++){ await sleep(i?10000:3000); const im=await prev(); L({k:'poll',rel:Math.round((Date.now()-t0)/1000),imgs:im}); if(i)await 0; await page.reload(); await sleep(1500);}
await ctx.close();
