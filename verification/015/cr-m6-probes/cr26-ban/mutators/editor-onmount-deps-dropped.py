p='src/components/DiscordMessageEditor/index.tsx'; s=open(p).read()
old="useEffect(() => { onMount?.(); }, []);"
assert s.count(old)==1
open(p,'w').write(s.replace(old,"useEffect(() => { onMount?.(); });"))
