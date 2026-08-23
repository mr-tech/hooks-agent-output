// Does the guard's host string name what pg dials, across URL FORMS (not query params)?
const {Client}=require("/usr/local/bin/hooks/website/node_modules/.pnpm/pg@8.11.1/node_modules/pg");
function guard(u){try{const x=new URL(u);return `${x.hostname}:${x.port||"5432"}`}catch{return "(unparseable)"}}
function dial(u){try{const c=new Client({connectionString:u});return c.host+":"+c.port}catch(e){return "THREW"}}
const forms=[
 ["socket: scheme",         "socket:/var/run/postgresql"],
 ["%2f-encoded unix host",  "postgresql://%2Fvar%2Frun%2Fpostgresql/db"],
 ["plain remote (control)", "postgresql://u:p@viaduct.proxy.rlwy.net:12394/db"],
];
let n=0;
for(const [name,u] of forms){const g=guard(u),d=dial(u);const bad=g!==d;if(bad)n++;
console.log(`${bad?"DIVERGE":"  agree"}  ${name.padEnd(26)} guard=${JSON.stringify(g).padEnd(38)} dials=${JSON.stringify(d)}`);}
console.log("\nDIVERGENCES="+n);
