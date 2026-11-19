async (page) => {
 const reqs=[]; const h=r=>{ if(r.method()!=='GET') reqs.push([new Date().toISOString(), r.method(), r.url().replace(/\?.*/,'')]); }; page.on('request',h);
 await page.evaluate(() => { if(window.__dlg) return; window.__dlg = []; let last=''; setInterval(()=>{ const d=[...document.querySelectorAll('[role=dialog]')].filter(e=>e.getBoundingClientRect().width>0&&e.innerText.trim()&&!/Save as/.test(e.innerText)).map(e=>e.innerText.trim().slice(0,50)); const t=[...document.querySelectorAll('[data-sonner-toast]')].map(e=>'TOAST:'+e.innerText.trim().slice(0,50)); const s=JSON.stringify([...d,...t]); if(s!==last){last=s; window.__dlg.push([new Date().toISOString(), d, t]);} },50); });
 await page.getByRole('button',{name:/^Welcome to Hooks.gg, the/}).click();
 await page.waitForTimeout(500); await page.locator('[contenteditable=true][role=textbox]').first().click(); await page.keyboard.press('Control+End'); await page.keyboard.type('pA1',{delay:20});
 const landed = await page.evaluate(()=>document.activeElement.innerText.slice(-12)); if(!/pA[12]$/.test(landed.trim())) return {aborted:'typed text not landed', landed};
 await page.getByRole('button',{name:'File',exact:true}).click();
 const save = page.locator('[role=dialog]',{hasText:'Save as...'}).getByText('Save',{exact:true});
 await save.waitFor();
 const preClick = new Date().toISOString();
 await save.click();
 await page.evaluate(() => { window.__saveAt=new Date().toISOString(); setTimeout(() => { const i=document.querySelector('input[aria-label="Message Name"]'); const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set; set.call(i, i.value+'x'); i.dispatchEvent(new Event('input',{bubbles:true})); window.__editAt=new Date().toISOString(); }, 30); });
 await page.waitForTimeout(10000);
 page.off('request',h);
 return await page.evaluate((x)=>({x, name:document.querySelector('input[aria-label="Message Name"]')?.value, editAt:window.__editAt, dlg:window.__dlg}), {landed,preClick,reqs});
}
