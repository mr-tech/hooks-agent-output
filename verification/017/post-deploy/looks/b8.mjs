import fs from 'fs';
import {launch,now,sleep,D,SH,cookies,poller} from './lib.mjs';
import {save,append,content,openContent} from './lib2.mjs';
const N=6024; const out=D+'/b8.jsonl'; const L=o=>fs.appendFileSync(out,JSON.stringify({t:now(),...o})+'\n');
const ctx=await launch(); const p1=ctx.pages()[0]||await ctx.newPage(); const p2=await ctx.newPage();
let run=0;
for(const [i,p] of [[1,p1],[2,p2]]){
 p.on('request',r=>{if(r.method()!=='GET')L({k:'req',tab:i,run,m:r.method(),u:r.url().split('?')[0]})});
 p.on('console',m=>{if(/pusher|websocket|ws/i.test(m.text())&&['error','warning'].includes(m.type()))L({k:'console',tab:i,run,type:m.type(),x:m.text().slice(0,200)})});
 p.on('pageerror',e=>L({k:'pageerror',tab:i,run,x:String(e).slice(0,200)}));
 p.on('websocket',w=>{L({k:'ws',tab:i,u:w.url().replace(/key=[^&]*/,'key=…').split('?')[0]});w.on('socketerror',e=>L({k:'wserr',tab:i,x:String(e)}));});
 await p.goto(`https://hooks.gg/message/m/${N}/edit`); await sleep(4500); await cookies(p);
}
for(const p of [p1,p2]) await poller(p);
for(const delay of [30,60,100,150,250]){
 run++;
 await p1.bringToFront();
 const nameBefore=await p1.inputValue('input[aria-label="Message Name"]');
 await append(p1,'b8a'); await sleep(400);
 await p1.evaluate(()=>{window.__ev=[];window.__seen=false}); await p2.evaluate(()=>{window.__ev=[];window.__seen=false});
 const click=p1.getByRole('button',{name:'File',exact:true});
 await click.click(); await sleep(300);
 const dlg=p1.locator('[role=dialog]').filter({hasText:'Save as...'});
 const sv=dlg.getByText('Save',{exact:true});
 const tc=now(); await sv.click(); L({k:'saveclick',run,delay,t:tc});
 await sleep(delay);
 const te=now();
 await p1.evaluate(()=>{const tb=document.querySelector('[aria-label="message username"]');tb.focus();const r=document.createRange();r.selectNodeContents(tb);r.collapse(false);const s=getSelection();s.removeAllRanges();s.addRange(r);});
 await p1.keyboard.type('x');
 const txt=await p1.evaluate(()=>document.querySelector('[aria-label="message username"]')?.innerText||'');
 const nameAfter=txt; const landed=txt.endsWith('x');
 L({k:'edit',run,delay,t:te,landed,tail:nameAfter});
 await sleep(10000);
 const e1=await p1.evaluate(()=>window.__ev), e2=await p2.evaluate(()=>window.__ev);
 L({k:'result',run,delay,tab1:e1,tab2:e2});
 await p2.screenshot({path:`${SH}/b8-run${run}-tab2.png`});
 await p1.screenshot({path:`${SH}/b8-run${run}-tab1.png`});
 // dismiss in tab 2
 await p2.bringToFront(); await p2.keyboard.press('Escape'); await sleep(300);
 const dd=await p2.evaluate(()=>[...document.querySelectorAll('[role=dialog]')].map(d=>d.innerText.slice(0,160)).filter(x=>/Update/.test(x)));
 L({k:'tab2dialogs-after-esc',run,dd});
 if(dd.length){ const b=p2.locator('[role=dialog] button').first(); L({k:'btns',b:await p2.locator('[role=dialog]').filter({hasText:'Update Detected'}).locator('button').allInnerTexts()}); }
}
await ctx.close();
