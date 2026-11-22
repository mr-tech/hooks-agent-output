const [b,f]=process.argv.slice(2).map(p=>require(p));
for(let i=0;i<b.length;i++){ if(b[i].parser!=="parseContent"||!b[i].mounted) continue;
 const show=r=>typeof r==="string"?r:r.map(([a,z,s,c])=>`${a}-${z}${s?"S":""}${c?"["+c+"]":""} ${JSON.stringify(b[i].text.slice(a,z))}`).join(" | ");
 const same=JSON.stringify(b[i].ranges)===JSON.stringify(f[i].ranges);
 console.log(JSON.stringify(b[i].text), "len", b[i].text.length, same?"SAME":"DIFF"); console.log("  base:",show(b[i].ranges)); if(!same) console.log("  fix: ",show(f[i].ranges));}
