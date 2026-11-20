import fs from 'fs';
import {launch,sleep,SH,cookies,now,D,guard} from './lib.mjs';
import {oauthWait} from './lib2.mjs';
const L=o=>fs.appendFileSync(D+'/b9.jsonl',JSON.stringify({t:now(),...o})+'\n');
const ctx=await launch(); const page=ctx.pages()[0]||await ctx.newPage();
page.on('dialog',async d=>{L({k:'native-dialog-login',type:d.type()});await d.accept();});
await page.goto('https://hooks.gg/message/m/0/edit'); await sleep(4000); await cookies(page);
const hasPrompt=()=>page.evaluate(()=>/unsaved changes/i.test(document.body.innerText)).catch(()=>'navigated');
await page.getByRole('button',{name:'Log in',exact:true}).first().click({timeout:5000});
const tc=now(); await sleep(400);
L({k:'login-clicked',t0:tc,unsavedPrompt:await hasPrompt(),url:page.url().split('?')[0]});
const r=await oauthWait(page,L); L({k:'oauth-result',r,url:page.url().split('?')[0]});
console.log(r,page.url().split('?')[0]);
if(r==='stop'){ await sleep(1700000); }
await ctx.close();
