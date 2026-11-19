const { chromium } = require('/home/dev/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
(async()=>{
const ctx=await chromium.launchPersistentContext('/home/dev/.cache/ms-playwright-mcp/mcp-chrome-313b550',{channel:'chrome',headless:false});
const page=ctx.pages()[0]||await ctx.newPage();
await page.goto('http://127.0.0.1:3000/message/m/900000000000001/edit');
await page.waitForTimeout(4000);
for(const n of ['File','Edit','View','Help','user']){
 const b=n==='user'?page.locator('button[aria-label="user menu"]'):page.getByRole('button',{name:n,exact:true});
 await b.click().catch(()=>{});await page.waitForTimeout(600);
 console.log(n,JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll('a,[role=menuitem],li')].map(a=>(a.innerText||'').trim().slice(0,40)+'|'+(a.getAttribute('href')||'')).filter(x=>x!='|'))));
}
await ctx.close();})();
