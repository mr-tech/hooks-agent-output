p='src/components/Button.tsx'; s=open(p).read()
old="useEffect(() => { if (autoFocus) localRef.current?.focus(); }, []);"
assert s.count(old)==1
open(p,'w').write(s.replace(old,"useEffect(() => {}, []);"))
