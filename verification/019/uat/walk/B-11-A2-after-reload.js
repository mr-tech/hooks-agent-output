async (page) => {
const errs=[]; const out={};
page.on('pageerror',e=>errs.push('pageerror: '+String(e.message||e).slice(0,300)));
page.on('console',m=>{if(m.type()==='error')errs.push('console.error: '+m.text().slice(0,300));});
try{
await page.waitForTimeout(3500);
const later=page.getByRole('button',{name:"I'll do it later"}); if(await later.count()) await later.click();
for(let a=0;a<4;a++){ await page.getByRole('button',{name:'Edit',exact:true}).click(); await page.waitForTimeout(600);
  const jb=page.getByRole('button',{name:'JSON',exact:true}); if(await jb.count()){ await jb.first().click(); break; } out.retry=(out.retry||0)+1; await page.keyboard.press('Escape'); await page.waitForTimeout(500); }
await page.waitForTimeout(1500);
const t=await page.locator('.cm-content').first().evaluate(c=>c.cmView.view.state.doc.toString());
const c=page.locator('button[aria-label="close modal"]:visible'); if(await c.count()){await c.first().click(); await page.waitForTimeout(500);}
const j=JSON.parse(t); const d=j.embeds&&j.embeds[0]&&j.embeds[0].description; out.first3=typeof d==='string'?d.split('\n').slice(0,3):null; out.lineCount=typeof d==='string'?d.split('\n').length:null; out.embedsLen=j.embeds&&j.embeds.length;
}catch(e){out.exception=String(e).slice(0,300);}
out.errs=errs; return out;
}
