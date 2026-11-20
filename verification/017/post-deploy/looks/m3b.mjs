import fs from 'fs';
import {launch,sleep,SH,cookies,now,D} from './lib.mjs';
import {append,oauthWait} from './lib2.mjs';
const variant=process.argv[2]==='blur';
const L=o=>fs.appendFileSync(D+'/b9.jsonl',JSON.stringify({t:now(),variant,...o})+'\n');
const ctx=await launch(); const page=ctx.pages()[0]||await ctx.newPage();
page.on('dialog',async d=>{L({k:'native-dialog',type:d.type()});await d.accept();});
const drafts=()=>page.evaluate(()=>{const v=JSON.parse(localStorage.getItem('messageDrafts')||'{}');return Object.entries(v).map(([k,x])=>k+':'+JSON.stringify(x).includes('m3bmark')+'/'+JSON.stringify(x).includes('m3adraft'))});
const mk=()=>page.evaluate(()=>document.body.innerText.includes('m3bmark'));
await page.goto('https://hooks.gg/message'); await sleep(3000); await cookies(page);
await page.goto('https://hooks.gg/message/m/6024/edit'); await sleep(4000);
await append(page,'m3bmark'); await sleep(2000);
if(variant){ await page.mouse.click(1150,500); await sleep(2000); }
L({k:'m3b-typed',drafts:await drafts()});
await page.screenshot({path:SH+`/m3b-typed${variant?'-blur':''}.png`});
const cs=(await ctx.cookies()).filter(c=>/hooks\.gg/.test(c.domain)&&/next-auth\.session-token/.test(c.name));
for(const c of cs){await ctx.clearCookies({name:c.name,domain:c.domain});L({k:'cleared',name:c.name,domain:c.domain});}
await page.reload().catch(()=>{}); await sleep(4500);
L({k:'m3b-after-forced-signout',url:page.url().split('?')[0],avatar:await page.evaluate(()=>!!document.querySelector('button[aria-label="user menu"]')),hasMarker:await mk(),drafts:await drafts()});
await page.screenshot({path:SH+`/m3b-forced${variant?'-blur':''}.png`});
await page.goto('https://hooks.gg/message/m/0/edit'); await sleep(4000);
L({k:'m3b-route0-signedout',url:page.url(),hasM3a:await page.evaluate(()=>document.body.innerText.includes('m3adraft')),hasMarker:await mk()});
await page.getByRole('button',{name:'Log in',exact:true}).first().click({timeout:5000});
const r=await oauthWait(page,L); L({k:'oauth-result',r}); 
if(r==='stop'){console.log('STOP');await sleep(1700000);}
await sleep(2000);
await page.goto('https://hooks.gg/message'); await sleep(3000);
L({k:'m3b-relogin',avatar:await page.evaluate(()=>!!document.querySelector('button[aria-label="user menu"]'))});
await page.locator('a[href="/message/m/6024/edit"]').first().click(); await sleep(4500);
L({k:'m3b-open-N-from-list',url:page.url(),hasMarker:await mk(),drafts:await drafts()});
await page.screenshot({path:SH+`/m3b-N${variant?'-blur':''}.png`});
await page.goto('https://hooks.gg/message/m/0/edit'); await sleep(4000);
L({k:'m3b-route0-final',hasM3a:await page.evaluate(()=>document.body.innerText.includes('m3adraft')),hasMarker:await mk()});
await ctx.close();
