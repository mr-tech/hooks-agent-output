async (page) => {
const CASE = 'K4';
const W='/usr/local/bin/hooks/agent-output/verification/019/qa/phase1-rev24/walk/';
const errs=[]; const mark=()=>errs.length;
page.on('pageerror',e=>errs.push('pageerror: '+String(e.message||e).slice(0,300)));
page.on('console',m=>{if(m.type()==='error')errs.push('console.error: '+m.text().slice(0,300));});
const out={case:CASE,attempts:[]};
const ed=()=>page.locator('[data-slate-editor="true"]').first();
const openEd=async()=>{ if(await page.locator('[data-slate-editor="true"]').count()) return;
  const art=page.locator('article.discord-visualizer__embed-wrapper').first();
  const t=await art.locator('button').evaluateAll(bs=>bs.map(b=>b.innerText.length));
  // description: button with longest text
  let idx=t.indexOf(Math.max(...t)); await art.locator('button').nth(idx).click(); await page.waitForTimeout(1000); };
await openEd();
// caret: line index, and whether anything but zero-width text lies between the caret and the end of its line
const caret=()=>ed().evaluate(e=>{const s=window.getSelection(); if(!s.anchorNode) return null; let n=s.anchorNode; while(n&&n.parentElement!==e) n=n.parentElement; const i=n?[...e.children].indexOf(n):-1; let atEnd=null; if(n){const r=document.createRange(); r.setStart(s.anchorNode,s.anchorOffset); r.setEnd(n,n.childNodes.length); const f=r.cloneContents(); atEnd=f.textContent.replace(/[﻿​]/g,'').length===0 && !f.querySelector('img,[data-slate-void]');} return {line:i,atEnd,rawOffset:s.anchorOffset};});
const lines=[...Array(199).fill('a🙂'),'a🙂`'];
const text=lines.join('\n');
await page.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:'http://127.0.0.1:3107'});
await ed().click(); await page.waitForTimeout(700);
await page.keyboard.press('Control+a'); await page.keyboard.press('Delete'); await page.waitForTimeout(800);
out.afterClear=await ed().evaluate(e=>e.children.length);
await page.evaluate(t=>navigator.clipboard.writeText(t),text);
await page.keyboard.press('Control+v'); await page.waitForTimeout(4000);
out.pasteMethod='clipboard+Ctrl+V';
out.lineCount=await ed().evaluate(e=>e.children.length);
out.step1=out.lineCount===200;
out.emojiElementsBefore=await ed().evaluate(e=>e.querySelectorAll('img').length);
out.errsPaste=errs.slice(0);
for(let a=1;a<=3;a++){
  await ed().click(); await page.waitForTimeout(300);
  await page.keyboard.press('Control+Home'); await page.keyboard.press('End');
  await page.waitForTimeout(800);
  const c=await caret(); out.attempts.push(c);
  if(c&&c.line===0&&c.atEnd) break;
}
out.caretStep2=out.attempts[out.attempts.length-1];
const m=mark();
await page.keyboard.type('`');
await page.waitForTimeout(1500);
out.errsStep4=errs.slice(m);
out.caretStep4=await caret();
out.lineCountAfter=await ed().evaluate(e=>e.children.length);
out.emojiElementsAfter=await ed().evaluate(e=>e.querySelectorAll('img').length);
out.firstLinesAfterKey=await ed().evaluate(e=>[...e.children].slice(0,3).map(x=>x.innerText));
await page.screenshot({path:W+CASE+'-step4.png'});
return out;
}
