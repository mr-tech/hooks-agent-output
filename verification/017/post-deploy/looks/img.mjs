import {launch,sleep,SH,now} from './lib.mjs';
const ctx=await launch(); const page=ctx.pages()[0]||await ctx.newPage();
for(const [n,u] of Object.entries({a3:'https://cdn.hooks.gg/previews/6024/v179514296486442473b21c449621f639.jpeg'})){
 const r=await page.goto(u); await sleep(1000);
 const d=await page.evaluate(()=>{const i=document.images[0];return i?{w:i.naturalWidth,h:i.naturalHeight}:null});
 console.log(n,r.status(),r.headers()['content-type'],r.headers()['content-length'],JSON.stringify(d),now());
 await page.screenshot({path:`${SH}/b6-img-${n}.png`});
 await page.evaluate(()=>{const i=document.images[0];if(i){i.style.width=(i.naturalWidth*4)+'px';i.style.imageRendering='auto'}});
 await page.screenshot({path:`${SH}/b6-img-${n}-x4.png`});
}
await ctx.close();
