const NEW=/^```(([a-z0-9-]+?)\n+)?\n*([^\n][^]*?)\n*```/i, OLD=/^```(([a-z0-9-]+?)\n+)?\n*([^\n]+?)\n*```/i;
for (const N of [2000,4096,20000,80000]) for (const [name,s] of [['a+newlines','```a'+'\n'.repeat(N)],['a+text','```a'+'b\n'.repeat(N/2)],['a+ticks-no-close','```a'+'\n``'.repeat(N/3)]]) {
  for (const [rn,r] of [['old',OLD],['new',NEW]]) { const t=process.hrtime.bigint(); r.exec(s); const ms=Number(process.hrtime.bigint()-t)/1e6; console.log(`N=${N} ${name} ${rn} ${ms.toFixed(1)}ms`);} }
