import { createRequire } from 'module';
const require = createRequire('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/');
export const { chromium } = require('playwright');
import fs from 'fs';
export const D='/usr/local/bin/hooks/agent-output/verification/017/post-deploy/looks';
export const SH='/tmp/claude-1000/-usr-local-bin-hooks-website/dc5f1874-06a0-45fc-a93f-d4d74a3823c9/scratchpad/looks-shots';
export const P='/home/dev/.cache/ms-playwright-mcp/mcp-chrome-313b550';
export const now=()=>new Date().toISOString();
export const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export async function launch(){
  const ctx=await chromium.launchPersistentContext(P,{channel:'chrome',headless:false,viewport:{width:1280,height:900},env:{...process.env,DISPLAY:':0'}});
  return ctx;
}
export const state=()=>JSON.parse(fs.readFileSync(D+'/state.json','utf8'));
export const save=o=>fs.writeFileSync(D+'/state.json',JSON.stringify({...(fs.existsSync(D+'/state.json')?state():{}),...o},null,1));
export function log(f,o){fs.appendFileSync(D+'/'+f,JSON.stringify({t:now(),...o})+'\n');}
export async function guard(page){
  const u=page.url(); const t=await page.evaluate(()=>document.body?.innerText?.slice(0,3000)||'').catch(()=>'');
  const hc=await page.$('iframe[src*="hcaptcha"]');
  if(hc||/discord\.com\/login/.test(u)||/captcha|verify you are human/i.test(t)&&/discord/.test(u)){ console.log('CHALLENGE_OR_LOGIN',u); return u; }
  return null;
}
export async function cookies(page){ if(await page.$('text=Ok, Got it.')) await page.click('text=Ok, Got it.').catch(()=>{}); }
export async function poller(page,tag){
  await page.evaluate(tag=>{window.__ev=[];window.__seen=false;setInterval(()=>{const d=[...document.querySelectorAll('[role=dialog]')].some(x=>/Message Update Detected/.test(x.innerText));if(d&&!window.__seen){window.__seen=true;window.__ev.push({k:'dialog',t:new Date().toISOString()});}if(!d&&window.__seen){window.__seen=false;}
   document.querySelectorAll('[data-sonner-toast]').forEach(e=>{if(!e.__l){e.__l=1;window.__ev.push({k:'toast',t:new Date().toISOString(),x:e.innerText.slice(0,80)});}});},50);},tag);
}
