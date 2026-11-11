// Capture console errors/warnings on one /preview URL per side. Usage: node preview_console_read.cjs <urls.json> <key> <playwright dir>
const fs=require('fs');const [, , f, key, pw]=process.argv;const {chromium}=require(pw);
(async()=>{const u=JSON.parse(fs.readFileSync(f,'utf8'))[key];const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true});
for(const side of ['base','tip']){const p=await b.newPage();const msgs=[];p.on('console',m=>{if(['error','warning'].includes(m.type()))msgs.push(m.type()+': '+m.text().slice(0,300))});p.on('pageerror',e=>msgs.push('pageerror: '+String(e).slice(0,300)));
await p.goto(u[side],{waitUntil:'load'});await p.waitForTimeout(4000);console.log(side,key,JSON.stringify(msgs,null,1));await p.close();}
await b.close();})();
