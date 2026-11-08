p='src/components/Button.tsx'
s=open(p).read()
old="useEffect(() => { if (autoFocus) localRef.current?.focus(); }, []);"
assert s.count(old)==1
s=s.replace(old,"useEffect(() => {}, []);")
old2="useButton(_props as AriaButtonProps, localRef)"
assert s.count(old2)==1
s=s.replace(old2,"useButton({ ..._props, autoFocus: false } as AriaButtonProps, localRef)")
open(p,'w').write(s)
