import fs from 'fs';
import {launch,now,sleep,D,SH,cookies,guard} from './lib.mjs';
import {append,content,openContent} from './lib2.mjs';
const L=o=>fs.appendFileSync(D+'/b9.jsonl',JSON.stringify({t:now(),...o})+'\n');
const ctx=await launch(); const page=ctx.pages()[0]||await ctx.newPage();
await page.goto('https://hooks.gg/message'); await sleep(3000); await cookies(page);
const cs=(await ctx.cookies()).filter(c=>/hooks\.gg/.test(c.domain)).map(c=>({name:c.name,domain:c.domain}));
L({k:'hooks-cookies-before',cs});
for(const c of cs.filter(c=>/next-auth\.session-token/.test(c.name))){await ctx.clearCookies({name:c.name,domain:c.domain});L({k:'cleared',name:c.name,domain:c.domain});}
await page.reload(); await sleep(3500);
const ui=await page.evaluate(()=>({avatar:!!document.querySelector('button[aria-label="user menu"]'),buttons:[...document.querySelectorAll('button,a')].map(b=>b.innerText.trim()).filter(Boolean).slice(0,15)}));
L({k:'after-signout',url:page.url(),ui}); console.log(JSON.stringify(ui),page.url());
await page.screenshot({path:SH+'/m3a-signedout.png'});
await ctx.close();
