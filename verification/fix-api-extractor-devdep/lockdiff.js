const [A,B]=process.argv.slice(2);const a=require(A).packages,b=require(B).packages;const ch=[];
for(const k of new Set([...Object.keys(a),...Object.keys(b)])){if(JSON.stringify(a[k])!==JSON.stringify(b[k]))ch.push((a[k]?(b[k]?"~":"-"):"+")+" "+k+" "+((b[k]||a[k]).version||""))}
console.log("changed="+ch.length);console.log(ch.join("\n"));
