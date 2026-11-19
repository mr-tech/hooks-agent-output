const {chromium}=require('/home/dev/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const B='/usr/local/bin/hooks/agent-output/verification/017/qa-m2-r4/b15-unfixed/';
const out={reads:{},clicks:[]};
const read=async(p,k)=>{out.reads[k]=await p.evaluate(()=>({qaDoc:window.__qaDoc,path:location.pathname,socks:window.__qaWs.filter(w=>w.host.includes('pusher')).map(w=>({host:w.host,state:w.socket.readyState}))}))};
const save=()=>require('fs').writeFileSync(B+'walk-3/steps.json',JSON.stringify(out,null,1));
(async()=>{
const ctx=await chromium.launchPersistentContext('/home/dev/.cache/ms-playwright-mcp/mcp-chrome-313b550',{channel:'chrome',headless:false});
try{
await ctx.addInitScript({path:B+'ws-recorder.js'});
const p=ctx.pages()[0]||await ctx.newPage();
await p.goto('http://127.0.0.1:3000/message/m/900000000000001/edit');
if(/discord\.com/.test(p.url())){out.stop='discord page '+p.url();throw new Error('stop')}
await p.getByText('B-15 message A').first().waitFor({timeout:30000});
for(let i=0;i<20;i++){const s=await p.evaluate(()=>window.__qaWs.some(w=>w.host.includes('pusher')&&w.socket.readyState===1));if(s)break;await p.waitForTimeout(1000)}
await read(p,'1');
await p.evaluate(()=>window.__qaDoc=1);
await p.locator('button[aria-label="user menu"]').click({timeout:5000});out.clicks.push('user menu');
await p.locator('a[href="/message"]').first().click({timeout:5000});out.clicks.push('Servers /message');
await p.waitForURL(/\/message$/,{timeout:15000});await p.waitForTimeout(5000);
await read(p,'3');
await p.locator('a[href="/message/f/0"]',{hasText:'My Account'}).first().click({timeout:5000});out.clicks.push('My Account /message/f/0');
await p.waitForURL(/\/message\/f\/0/,{timeout:15000});await p.waitForTimeout(5000);
await read(p,'4');
out.anchors=await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>(a.getAttribute('href')||'').includes('/message/m/')).map(a=>[a.textContent.trim(),a.getAttribute('href')]));
const tgt='a[href$="/message/m/900000000000002/edit"]';
if(!(await p.locator(tgt).count())){const ex=p.locator('summary, [aria-expanded=false]');const n=await ex.count();out.expandables=n;
 for(let i=0;i<n&&!(await p.locator(tgt).count());i++){try{await ex.nth(i).click({timeout:2000});out.clicks.push('expand '+i)}catch{}}
 out.anchorsAfterExpand=await p.evaluate(()=>[...document.querySelectorAll('a')].filter(a=>(a.getAttribute('href')||'').includes('/message/m/')).map(a=>[a.textContent.trim(),a.getAttribute('href')]));}
if(!(await p.locator(tgt).count())){out.stop='step 5 anchor absent';throw new Error('stop')}
await p.locator(tgt).first().click();out.clicks.push('anchor to B edit');
await p.waitForURL(/900000000000002\/edit/,{timeout:20000});
await p.getByText('B-15 message B').first().waitFor({timeout:30000});
await p.waitForTimeout(10000);await read(p,'5');
await p.waitForTimeout(20000);await read(p,'6');
}catch(e){out.error=String(e).slice(0,300)}
save();await ctx.close();
})();
