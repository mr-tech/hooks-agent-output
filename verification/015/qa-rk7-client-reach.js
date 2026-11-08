// Type-only imports (import type / export type / braces of only `type X`) are erased and skipped.
// Transitive import reachability from client roots ('use client' files, src/pages non-api .tsx) to modules
// that read a non-NEXT_PUBLIC_ server key from ~/env.mjs. Static `import ... from` / `import()` / export-from only.
const fs=require('fs'),path=require('path');const R=process.argv[2];
const all=[];(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory()){if(e.name!=='__tests__'&&e.name!=='node_modules')w(p);}else if(/\.(tsx?|mjs|js)$/.test(e.name))all.push(p);}})(path.join(R,'src'));
const res=(from,spec)=>{let b;if(spec.startsWith('~/'))b=path.join(R,'src',spec.slice(2));else if(spec.startsWith('bot/'))b=path.join(R,spec);else if(spec.startsWith('.'))b=path.resolve(path.dirname(from),spec);else return null;
 for(const c of [b,b+'.ts',b+'.tsx',b+'.mjs',b+'.js',path.join(b,'index.ts'),path.join(b,'index.tsx')])if(fs.existsSync(c)&&fs.statSync(c).isFile())return c;return null;};
const typeOnly=t=>{if(/^(import|export)\s+type\s/.test(t))return true;const m=t.match(/^(?:import|export)\s*\{([^}]*)\}\s*from/);if(!m)return false;const parts=m[1].split(",").map(x=>x.trim()).filter(Boolean);return parts.length>0&&parts.every(x=>/^type\s/.test(x));};
const deps=f=>{const s=fs.readFileSync(f,'utf8');const out=[];for(const m of s.matchAll(/(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)|^import\s+['"]([^'"]+)['"]/gm)){if(typeOnly(m[0]))continue;const r=res(f,m[1]||m[2]||m[3]);if(r)out.push(r);}return out;};
const serverKey=f=>{const s=fs.readFileSync(f,'utf8');if(!/env\.mjs/.test(s))return false;return [...s.matchAll(/env\.([A-Z_]+)/g)].some(m=>!m[1].startsWith('NEXT_PUBLIC_')&&m[1]!=='NODE_ENV');};
const roots=all.filter(f=>/^['"]use client['"]/m.test(fs.readFileSync(f,'utf8').slice(0,200))||(/src\/pages\//.test(f)&&!/src\/pages\/api\//.test(f)));
const seen=new Map();const q=roots.map(r=>[r,null]);while(q.length){const [f,p]=q.shift();if(seen.has(f))continue;seen.set(f,p);for(const d of deps(f))if(!seen.has(d))q.push([d,f]);}
const rel=f=>path.relative(R,f);console.log('roots',roots.length,'reachable',seen.size);
const ctl=path.join(R,'src/constants/index.ts');console.log('positive control constants/index.ts reachable:',seen.has(ctl));
for(const f of all.filter(serverKey)){if(seen.has(f)){const chain=[];let c=f;while(c){chain.push(rel(c));c=seen.get(c);}console.log('REACHABLE server-key module:',chain.join(' <- '));}else console.log('not reachable:',rel(f));}
