const {chromium}=require('/home/dev/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const B='/usr/local/bin/hooks/agent-output/verification/017/qa-m2-r4/b15-unfixed/';
const out={};
const socks=p=>p.evaluate(()=>window.__qaWs.filter(w=>w.host.includes('pusher')).map(w=>({host:w.host,state:w.socket.readyState})));
const by=a=>{const o={};a.forEach(s=>o[s.state]=(o[s.state]||0)+1);return o};
(async()=>{
const ctx=await chromium.launchPersistentContext('/home/dev/.cache/ms-playwright-mcp/mcp-chrome-313b550',{channel:'chrome',headless:false});
try{
await ctx.addInitScript({path:B+'ws-recorder.js'});
const p=ctx.pages()[0]||await ctx.newPage();
await p.goto('http://127.0.0.1:3000/message/m/900000000000001/edit');
out.landing=await p.evaluate(()=>[location.href,document.title]);
if(/discord\.com\/(login|challenge)/.test(out.landing[0])){out.stop='discord page';throw new Error('stop')}
await p.getByText('B-15 message A').first().waitFor({timeout:30000});
for(let i=0;i<20;i++){const s=await socks(p);if(s.some(x=>x.state===1))break;await p.waitForTimeout(1000)}
let s=await socks(p);out.step1={socks:s,byState:by(s)};
await p.evaluate(()=>window.__qaDoc=1);out.step2='set';
out.clicks=[];
const doc=()=>p.evaluate(()=>window.__qaDoc);
out.anchorsInitial=await p.evaluate(()=>[...document.querySelectorAll('a')].map(a=>[a.textContent.trim(),a.getAttribute('href')]));
out.headerButtons=await p.evaluate(()=>[...document.querySelectorAll('button,[role=button]')].map(e=>(e.getAttribute('aria-label')||e.textContent||e.tagName).trim().slice(0,40)+'|'+(e.querySelector('svg')?'svg':'')));
const tgt='a[href$="/message/m/900000000000002/edit"]';
let reached=false;
// route a
try{
 const sc=p.locator('header').locator('button:has(svg), [role=button]:has(svg), a:has(svg)').filter({has:p.locator('svg')});
 const cand=p.locator('button[aria-label*="earch" i], [role=button][aria-label*="earch" i], [title*="earch" i]').first();
 await cand.click({timeout:5000});
 out.clicks.push({route:'a',what:'search control',qaDoc:await doc()});
 await p.keyboard.type('B-15');
 await p.waitForSelector(tgt,{timeout:15000});
 const a=p.locator(tgt).first();
 out.clicks.push({route:'a',text:(await a.textContent()).trim(),href:await a.getAttribute('href')});
 await a.click();out.clicks[out.clicks.length-1].qaDoc=await doc();reached=true;out.route='a';
}catch(e){out.routeAerr=String(e).slice(0,200);}
if(!reached){
 out.route='b';
 try{
  const um=await p.evaluate(()=>[...document.querySelectorAll('header img, header button, nav img')].map(e=>e.outerHTML.slice(0,120)));
  out.userMenuCands=um;
  await p.locator('button[aria-label="user menu"]').click({timeout:5000});
  out.clicks.push({route:'b',what:'user menu',qaDoc:await doc()});
  const sv=p.locator('a[href="/message"]').first();
  await sv.click({timeout:5000});
  out.clicks.push({route:'b',text:'Servers',href:'/message',qaDoc:await doc()});
  await p.waitForURL(/\/message$/,{timeout:15000});
  await p.waitForTimeout(3000);
  out.messageAnchors=await p.evaluate(()=>[...document.querySelectorAll('a')].map(a=>[a.textContent.trim(),a.getAttribute('href')]));
  if(!(await p.locator(tgt).count())){
    const ex=p.locator('summary, [aria-expanded=false]');
    const n=await ex.count();out.expandables=n;
    for(let i=0;i<n&&!(await p.locator(tgt).count());i++){try{await ex.nth(i).click({timeout:2000});out.clicks.push({route:'b',what:'expand '+i,qaDoc:await doc()})}catch{}}
    out.messageAnchorsAfter=await p.evaluate(()=>[...document.querySelectorAll('a')].map(a=>[a.textContent.trim(),a.getAttribute('href')]));
  }
  const a=p.locator(tgt).first();
  await a.waitFor({timeout:10000});
  out.clicks.push({route:'b',text:(await a.textContent()).trim(),href:await a.getAttribute('href')});
  await a.click();out.clicks[out.clicks.length-1].qaDoc=await doc();reached=true;
 }catch(e){out.routeBerr=String(e).slice(0,300);}
}
if(reached){
 await p.waitForURL(/900000000000002\/edit/,{timeout:20000});
 await p.getByText('B-15 message B').first().waitFor({timeout:30000});
 await p.waitForTimeout(10000);
 const rd=async()=>{const s=await socks(p);return{url:p.url(),qaDoc:await doc(),socks:s,byState:by(s)}};
 out.step4=await rd();
 await p.waitForTimeout(20000);
 out.step5=await rd();
}
}catch(e){out.error=String(e).slice(0,300)}
require('fs').writeFileSync(B+'walk-2/steps.json',JSON.stringify(out,null,1));
await ctx.close();
})();
