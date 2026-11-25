async (page) => {
const W='/usr/local/bin/hooks/agent-output/verification/019/uat/walk/';
const errs=[];
page.on('pageerror',e=>errs.push('pageerror: '+String(e.message||e).slice(0,300)));
page.on('console',m=>{if(m.type()==='error')errs.push('console.error: '+m.text().slice(0,300));});
const out={};
const ed=()=>page.locator('[data-slate-editor="true"]').first();
const closeModal=async()=>{ const c=page.locator('button[aria-label="close modal"]:visible'); if(await c.count()){await c.first().click(); await page.waitForTimeout(500);} };
await closeModal();
const later=page.getByRole('button',{name:"I'll do it later"}); if(await later.count()) await later.click();
if(!(await page.locator('article.discord-visualizer__embed-wrapper').count())){ await page.getByRole('button',{name:'Add Embed'}).click(); await page.waitForTimeout(500); }
if(!(await page.locator('[data-slate-editor="true"]').count())){
  const art=page.locator('article.discord-visualizer__embed-wrapper').first();
  const t=await art.locator('button').evaluateAll(bs=>bs.map(b=>b.innerText.length));
  await art.locator('button').nth(t.indexOf(Math.max(...t))).click(); await page.waitForTimeout(1000); }
await page.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:'http://127.0.0.1:3000'});
await ed().click(); await page.waitForTimeout(700);
await page.keyboard.press('Control+a'); await page.keyboard.press('Delete'); await page.waitForTimeout(800);
out.afterClear=await ed().evaluate(e=>({children:e.children.length,text:e.innerText.replace(/[﻿​\n]/g,'')}));
const text=Array(2000).fill('a').join('\n'); out.pasteLength=text.length;
await page.evaluate(t=>navigator.clipboard.writeText(t),text);
await page.keyboard.press('Control+v');
for(let i=0;i<40;i++){ await page.waitForTimeout(500); if(await ed().evaluate(e=>e.children.length)===2000) break; }
await page.waitForTimeout(1500);
out.lineCount=await ed().evaluate(e=>e.children.length);
const caret=()=>ed().evaluate(e=>{const s=window.getSelection(); let n=s.anchorNode; while(n&&n.parentElement!==e) n=n.parentElement; const i=n?[...e.children].indexOf(n):-1; const r2=document.createRange(); r2.setStart(s.anchorNode,s.anchorOffset); r2.setEnd(n,n.childNodes.length); const atEnd=r2.cloneContents().textContent.replace(/[﻿​]/g,'').length===0; return {line:i,atEnd};});
out.attempts=[];
for(let a=1;a<=4;a++){
  await ed().evaluate(e=>e.children[999].scrollIntoView({block:'center'})); await page.waitForTimeout(500);
  const bb=await ed().evaluate(e=>{const r=e.children[999].getBoundingClientRect();return {x:r.left,y:r.top,w:r.width,h:r.height};});
  await page.mouse.click(bb.x+Math.min(bb.w-2,40), bb.y+bb.h/2); await page.waitForTimeout(400);
  await page.keyboard.press('End'); await page.waitForTimeout(1000);
  const c=await caret(); c.bb=bb; out.attempts.push(c);
  if(c&&c.line===999&&c.atEnd) break;
}
out.caretBefore=await caret();
await page.evaluate(()=>{ const e=document.querySelector('[data-slate-editor="true"]'); window.__t=null; window.__lat=[]; 
  window.__arm=()=>new Promise(res=>{ const t0=performance.now(); const before=e.innerText; const mo=new MutationObserver(()=>{ if(e.innerText!==before){ mo.disconnect(); requestAnimationFrame(()=>res(performance.now()-t0)); } }); mo.observe(e,{subtree:true,childList:true,characterData:true}); window.__p=new Promise(r=>{}); window.__start=t0; window.__res=res; });
});
out.timingsMs=[];
const digits='0123456789';
for(const ch of digits){
  // arm: timer starts at keydown via listener
  await page.evaluate(()=>{ const e=document.querySelector('[data-slate-editor="true"]'); const before=e.innerText;
    window.__done=null; let t0=null;
    const kd=(ev)=>{ t0=performance.now(); document.removeEventListener('keydown',kd,true); };
    document.addEventListener('keydown',kd,true);
    window.__done=new Promise(res=>{ const mo=new MutationObserver(()=>{ if(t0!==null && e.innerText!==before){ mo.disconnect(); requestAnimationFrame(()=>res(performance.now()-t0)); } }); mo.observe(e,{subtree:true,childList:true,characterData:true}); setTimeout(()=>{mo.disconnect();res(-1);},5000); });
  });
  await page.keyboard.press(ch);
  out.timingsMs.push(await page.evaluate(()=>window.__done));
  await page.waitForTimeout(300);
}
out.caretAfter=await caret();
out.line999=await ed().evaluate(e=>e.children[999].innerText);
out.lineCountAfter=await ed().evaluate(e=>e.children.length);
await page.screenshot({path:W+'B-10-after.png'});
// JSON
await page.getByRole('button',{name:'Edit',exact:true}).click(); await page.waitForTimeout(400);
await page.getByRole('button',{name:'JSON',exact:true}).first().click(); await page.waitForTimeout(1500);
const t=await page.locator('.cm-content').first().evaluate(c=>c.cmView.view.state.doc.toString()); await closeModal();
try{const j=JSON.parse(t); const L=j.embeds[0].description.split('\n'); out.jsonLine999=L[999]; out.jsonLineCount=L.length;}catch(e){out.jsonErr=String(e); out.raw=t.slice(0,300);}
out.allErrs=errs;
return out;
}
