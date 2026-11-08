p='src/components/Button.tsx'
s=open(p).read()
old="useButton(_props as AriaButtonProps, localRef)"
assert s.count(old)==1
open(p,'w').write(s.replace(old,"useButton({ ..._props, autoFocus: false } as AriaButtonProps, localRef)"))
