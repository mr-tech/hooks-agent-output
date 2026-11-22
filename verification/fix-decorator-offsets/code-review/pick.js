const [bp,fp,...texts]=process.argv.slice(2);const b=require(bp),f=require(fp);
const key=r=>r.parser+"|"+r.mounted+"|"+r.text;const fm=new Map(f.map(r=>[key(r),r]));
for(const r of b){ if(!texts.includes(r.text)||r.parser!==(process.env.P||"parseContent")||!r.mounted)continue; const g=fm.get(key(r));
 const show=x=>x.map(([a,z,s,c])=>`${a}-${z}${s?"S":""}${c?"["+c+"]":""} ${JSON.stringify(r.text.slice(a,z))}`).join(" | ");
 console.log(JSON.stringify(r.text),"len",r.text.length);console.log("  base:",show(r.ranges));console.log("  fix: ",show(g.ranges));}
