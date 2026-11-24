async (page) => {
const CASE = 'K1';
const W='/usr/local/bin/hooks/agent-output/verification/019/qa/phase1-rev21/walk/';
const errs=[]; const mark=()=>errs.length;
page.on('pageerror',e=>errs.push('pageerror: '+String(e.message||e).slice(0,300)));
page.on('console',m=>{if(m.type()==='error')errs.push('console.error: '+m.text().slice(0,300));});
page.on('dialog',d=>d.accept());
const out={case:CASE,attempts:[]};
const ed=()=>page.locator('[data-slate-editor="true"]').first();
const openEd=async()=>{ if(await page.locator('[data-slate-editor="true"]').count()) return;
  const art=page.locator('article.discord-visualizer__embed-wrapper').first();
  const t=await art.locator('button').evaluateAll(bs=>bs.map(b=>b.innerText.length));
  // description: button with longest text
  let idx=t.indexOf(Math.max(...t)); await art.locator('button').nth(idx).click(); await page.waitForTimeout(1000); };
await openEd();
const caret=()=>ed().evaluate(e=>{const s=window.getSelection(); if(!s.anchorNode) return null; let n=s.anchorNode; while(n&&n.parentElement!==e) n=n.parentElement; const i=n?[...e.children].indexOf(n):-1; let off=null; if(n){const r=document.createRange(); r.setStart(n,0); r.setEnd(s.anchorNode,s.anchorOffset); off=r.toString().replace(/﻿/g,'').length;} return {line:i,offset:off,rawOffset:s.anchorOffset};});
const lines=CASE==='K1'?['>> a',...Array(1999).fill('a')]:[ 'a','a',CASE==='K2'?'``':'```',...Array(1997).fill('a')];
const text=lines.join('\n');
await page.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:'http://127.0.0.1:3107'});
await ed().click(); await page.waitForTimeout(700);
await page.keyboard.press('Control+a'); await page.keyboard.press('Delete'); await page.waitForTimeout(800);
out.afterClear=await ed().evaluate(e=>e.children.length);
await page.evaluate(t=>navigator.clipboard.writeText(t),text);
await page.keyboard.press('Control+v'); await page.waitForTimeout(4000);
out.pasteMethod='clipboard+Ctrl+V';
out.lineCount=await ed().evaluate(e=>e.children.length);
out.step1=out.lineCount===2000;
// caret
for(let a=1;a<=3;a++){
  await ed().click(); await page.waitForTimeout(300);
  await page.keyboard.press('Control+Home');
  if(CASE!=='K1'){await page.keyboard.press('ArrowDown');await page.keyboard.press('ArrowDown');await page.keyboard.press('End');}
  await page.waitForTimeout(800);
  const c=await caret(); out.attempts.push(c);
  const ok=CASE==='K1'?(c&&c.line===0&&c.offset===0):(c&&c.line===2&&c.offset===(CASE==='K2'?2:3));
  if(ok) break;
}
out.caretStep2=out.attempts[out.attempts.length-1];
const m=mark();
if(CASE==='K1') await page.keyboard.type('>'); else if(CASE==='K2') await page.keyboard.type('`'); else await page.keyboard.press('Backspace');
await page.waitForTimeout(1500);
out.errsStep4=errs.slice(m);
out.caretStep4=await caret();
out.lineCountAfter=await ed().evaluate(e=>e.children.length);
out.classCounts=await ed().evaluate(e=>{const c={};for(const ch of e.children){for(const k of ch.className.split(/\s+/).filter(Boolean)) c[k]=(c[k]||0)+1; ch.querySelectorAll('[class]').forEach(d=>{for(const k of d.className.split(/\s+/)){ if(/blockquote|code/i.test(k)) c['(desc)'+k]=(c['(desc)'+k]||0)+1;}})}return c;});
out.firstLinesAfterKey=await ed().evaluate(e=>[...e.children].slice(0,3).map(x=>x.innerText));
const m2=mark();
await page.keyboard.type('z'); await page.waitForTimeout(500);
out.errsStep5=errs.slice(m2);
out.zLine=await ed().evaluate(e=>{const i=[...e.children].findIndex(x=>x.innerText.includes('z'));return {index:i,text:i>=0?e.children[i].innerText:null,count:[...e.children].filter(x=>x.innerText.includes('z')).length};});
await page.screenshot({path:W+CASE+'-step5.png'});
return out;
}
