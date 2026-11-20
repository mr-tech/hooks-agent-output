import fs from 'fs';
import {launch,sleep,SH,cookies,now,D} from './lib.mjs';
const L=o=>fs.appendFileSync(D+'/cleanup.jsonl',JSON.stringify({t:now(),...o})+'\n');
const ctx=await launch(); const page=ctx.pages()[0]||await ctx.newPage();
page.on('dialog',async d=>{L({k:'native-dialog',type:d.type()});await d.accept();});
page.on('request',r=>{if(r.method()!=='GET'&&/trpc/.test(r.url()))L({k:'req',u:r.url().split('?')[0]})});
await page.goto('https://hooks.gg/message/m/0/edit'); await sleep(2500);
L({k:'drafts-cleared',removed:await page.evaluate(()=>{const v=JSON.parse(localStorage.getItem('messageDrafts')||'{}');const rm=[];for(const k of Object.keys(v)) if(k.startsWith('0:')||['6022','6023','6024'].includes(k)){delete v[k];rm.push(k)}localStorage.setItem('messageDrafts',JSON.stringify(v));return {rm,left:Object.keys(v)}})});
for(const id of [6024,6023,6022]){
  await page.goto('https://hooks.gg/message'); await sleep(2500); await cookies(page);
  await page.getByText('My Account',{exact:true}).last().click(); await sleep(2500);
  const card=page.locator(`a[href="/message/m/${id}/edit"]`).first();
  const idx=await page.evaluate(id=>{const as=[...document.querySelectorAll('a[href*="/message/m/"]')].map(a=>a.getAttribute('href'));return as.indexOf(`/message/m/${id}/edit`)},id);
  await page.locator('button[aria-label="message actions"]').nth(idx).click(); await sleep(500);
  await page.getByText('Delete',{exact:true}).first().click(); await sleep(800);
  L({k:'confirm-dialog',id,text:await page.evaluate(()=>[...document.querySelectorAll('[role=dialog],[role=alertdialog]')].map(d=>d.innerText.replace(/\n+/g,' | ').slice(0,200)).filter(t=>/Delete|delete/.test(t)))});
  await page.screenshot({path:SH+`/del-confirm-${id}.png`});
  const dlg=page.locator('[role=dialog],[role=alertdialog]').filter({hasText:/delete/i}).last();
  await dlg.getByRole('button',{name:/^(Delete|Confirm|Yes)/}).last().click().catch(e=>L({k:'confirm-click-fail',e:String(e).slice(0,150)}));
  const td=now(); await sleep(2500);
  L({k:'deleted',id,t:td});
}
await page.goto('https://hooks.gg/message'); await sleep(3000);
await page.getByText('My Account',{exact:true}).last().click(); await sleep(2500);
L({k:'list-after',hrefs:await page.evaluate(()=>[...document.querySelectorAll('a[href*="/message/m/"]')].map(a=>a.getAttribute('href')))});
for(const id of [6022,6023,6024]){const r=await page.goto(`https://hooks.gg/message/m/${id}/edit`); await sleep(3500);
 L({k:'verify',id,status:r.status(),url:page.url(),name:await page.evaluate(()=>document.querySelector('input[aria-label="Message Name"]')?.value||null),body:await page.evaluate(()=>document.body.innerText.slice(0,100).replace(/\n/g,' '))});}
await page.screenshot({path:SH+'/verify-last.png'});
await ctx.close();
