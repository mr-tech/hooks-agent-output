import {sleep,SH,now,log} from './lib.mjs';
export async function save(page){
 await page.getByRole('button',{name:'File',exact:true}).click(); await sleep(400);
 const dlg=page.locator('[role=dialog]').filter({hasText:'Save as...'});
 await dlg.getByText('Save',{exact:true}).click(); const t=now(); return t;
}
export const content=p=>p.locator('[contenteditable=true][role=textbox]').first();
export async function openContent(page){
  let tb=content(page);
  if(await tb.count()) return tb;
  await page.getByText(/^(Welcome to|uat looks)/).first().click(); await sleep(600);
  return content(page);
}
export async function append(page,txt){const tb=await openContent(page);await tb.click();await page.keyboard.press('Control+End');await page.keyboard.type(txt);}
import fs from 'fs';
import {D,guard,cookies} from './lib.mjs';
export async function login(page,L,hasPrompt){
  await page.goto(page.url()); // noop safety
}
export async function oauthWait(page,L){
  for(let i=0;i<60;i++){
    const u=page.url();
    const g=await guard(page);
    if(g){ L({k:'CHALLENGE_OR_SIGNIN',url:u.split('?')[0]}); fs.writeFileSync(D+'/STOP.txt',u.split('?')[0]); return 'stop'; }
    if(/discord\.com\/oauth2\/authorize|discord\.com\/api\/oauth2\/authorize/.test(u)){
      const b=page.getByRole('button',{name:/Authorize/i}); if(await b.count()){ L({k:'clicking-authorize'}); await b.first().click().catch(()=>{}); }
    }
    if(/^https:\/\/hooks\.gg\//.test(u) && !/api\/auth/.test(u) && i>1) { await sleep(2500); return 'back'; }
    await sleep(1000);
  }
  return 'timeout';
}
