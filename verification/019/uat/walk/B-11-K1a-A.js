async (page) => {
const CASE='K1a', RUN='A';
const W='/usr/local/bin/hooks/agent-output/verification/019/uat/walk/';
const errs=[]; const mark=()=>errs.length;
page.on('pageerror',e=>errs.push('pageerror: '+String(e.message||e).slice(0,300)));
page.on('console',m=>{if(m.type()==='error')errs.push('console.error: '+m.text().slice(0,300));});
page.on('dialog',d=>{errs.push('dialog: '+d.type()); d.accept();});
const out={case:CASE,run:RUN};
try{
const ed=()=>page.locator('[data-slate-editor="true"]').first();
const closeModal=async()=>{ const c=page.locator('button[aria-label="close modal"]:visible'); if(await c.count()){await c.first().click(); await page.waitForTimeout(500);} };
let __x;
const readJson=async()=>{
  for(let a=0;a<4;a++){ await page.getByRole('button',{name:'Edit',exact:true}).click(); await page.waitForTimeout(600);
    const jb=page.getByRole('button',{name:'JSON',exact:true}); if(await jb.count()){ await jb.first().click(); break; } out.readJsonRetry=(out.readJsonRetry||0)+1; await page.keyboard.press('Escape'); await page.waitForTimeout(500); }
  await page.waitForTimeout(1500);
  const t=await page.locator('.cm-content').first().evaluate(c=>c.cmView.view.state.doc.toString()); await closeModal();
  try{return JSON.parse(t);}catch(e){return {parseError:String(e),raw:t.slice(0,300)};} };
const descLines=(j)=>{const d=j&&j.embeds&&j.embeds[0]&&j.embeds[0].description; return typeof d==='string'?d.split('\n'):null;};
await closeModal();
const later=page.getByRole('button',{name:"I'll do it later"}); if(await later.count()) await later.click();
if(!(await page.locator('article.discord-visualizer__embed-wrapper').count())){ await page.getByRole('button',{name:'Add Embed'}).click(); await page.waitForTimeout(500); }
const openEd=async()=>{ if(await page.locator('[data-slate-editor="true"]').count()) return;
  const art=page.locator('article.discord-visualizer__embed-wrapper').first();
  const t=await art.locator('button').evaluateAll(bs=>bs.map(b=>b.innerText.length));
  let idx=t.indexOf(Math.max(...t)); await art.locator('button').nth(idx).click(); await page.waitForTimeout(1000); };
await openEd();
const caret=()=>ed().evaluate(e=>{const s=window.getSelection(); if(!s.anchorNode) return null; let n=s.anchorNode; while(n&&n.parentElement!==e) n=n.parentElement; const i=n?[...e.children].indexOf(n):-1; let off=null,atEnd=null; if(n){const r=document.createRange(); r.setStart(n,0); r.setEnd(s.anchorNode,s.anchorOffset); off=r.toString().replace(/[﻿​]/g,'').length; const r2=document.createRange(); r2.setStart(s.anchorNode,s.anchorOffset); r2.setEnd(n,n.childNodes.length); const f=r2.cloneContents(); atEnd=f.textContent.replace(/[﻿​]/g,'').length===0;} return {line:i,offset:off,atEnd,rawOffset:s.anchorOffset};});
const A=(n)=>Array(n).fill('a');
const defs={
 K1a:{lines:['>> a',...A(1999)],n:2000,key:'type>',line:0,exp:{A:'>>> za',B:'>>> a'}},
 K1b:{lines:['>> abc',...A(1999)],n:2000,key:'type>',line:0,exp:{A:'>>> zabc',B:'>>> abc'}},
 K2:{lines:['a','a','``',...A(1997)],n:2000,key:'type`',line:2,down:2,exp:{A:'```z',B:'```'}},
 K3:{lines:['a','a','```',...A(1997)],n:2000,key:'bs',line:2,down:2,exp:{A:'``z',B:'``'}},
 K4:{lines:[...Array(199).fill('a🙂'),'a🙂`'],n:200,key:'type`',line:0,exp:{A:'a🙂`z',B:'a🙂`'}}
}[CASE];
out.expected=defs.exp[RUN];
await page.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:'http://127.0.0.1:3000'});
await ed().click(); await page.waitForTimeout(700);
await page.keyboard.press('Control+a'); await page.keyboard.press('Delete'); await page.waitForTimeout(800);
out.afterClear=await ed().evaluate(e=>({children:e.children.length,text:e.innerText.replace(/[﻿​\n]/g,'')}));
await page.evaluate(t=>navigator.clipboard.writeText(t),defs.lines.join('\n'));
await page.keyboard.press('Control+v');
for(let i=0;i<30;i++){ await page.waitForTimeout(500); if(await ed().evaluate(e=>e.children.length)===defs.n) break; }
await page.waitForTimeout(1000);
out.lineCount=await ed().evaluate(e=>e.children.length);
out.attempts=[];
for(let a=1;a<=3;a++){
  await ed().click(); await page.waitForTimeout(300);
  await page.keyboard.press('Control+Home');
  for(let k=0;k<(defs.down||0);k++) await page.keyboard.press('ArrowDown');
  if(defs.down||CASE==='K4') await page.keyboard.press('End');
  await page.waitForTimeout(900);
  const c=await caret(); out.attempts.push(c);
  const ok=c&&c.line===defs.line&&(CASE==='K1a'||CASE==='K1b'?c.offset===0:c.atEnd);
  if(ok) break;
}
out.caretBeforeKey=out.attempts[out.attempts.length-1];
const m=mark();
if(defs.key==='bs') await page.keyboard.press('Backspace'); else await page.keyboard.type(defs.key.slice(4));
await page.waitForTimeout(1000);
out.errsAfterKey=errs.slice(m);
if(RUN==='B'){
  const j=await readJson(); const L=descLines(j);
  out.jsonLine=L?L[defs.line]:null; out.jsonLineCount=L?L.length:null; out.jsonDescPresent=!!L; if(!L) out.jsonRaw=j;
  out.result=(out.jsonLine===defs.exp.B)?'PASS':'FAIL';
} else {
  const m2=mark();
  await page.keyboard.type('z'); await page.waitForTimeout(1000);
  out.errsAfterZ=errs.slice(m2);
  out.zLine=await ed().evaluate(e=>{const ch=[...e.children];const idx=ch.map((x,i)=>x.innerText.includes('z')?i:-1).filter(i=>i>=0);return {indices:idx,texts:idx.map(i=>ch[i].innerText)};});
  out.caretAfterZ=await caret();
  await page.screenshot({path:W+'B-11-'+CASE+'-'+RUN+'-afterz.png'});
  const j=await readJson(); const L=descLines(j);
  out.jsonLine=L?L[defs.line]:null; out.jsonLineCount=L?L.length:null; out.jsonDescPresent=!!L;
  out.stage='before-reload (reload done outside the script, A2 reads after)'; out.errsBeforeReload=errs.slice();
  out.result='PENDING-A2';
}
}catch(e){out.exception=String(e).slice(0,400);}
out.allErrs=errs.slice();
return out;
}
