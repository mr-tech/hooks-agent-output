p='src/app/preview/page.tsx'
s=open(p).read()
old="  } catch {\n    return null;\n  }"
new="  } catch {\n    return {};\n  }"
assert s.count(old)==1
open(p,'w').write(s.replace(old,new))
