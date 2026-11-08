p='src/utils/hooks/index.ts'; s=open(p).read()
old="""  useEffect(() => {
    if (!delay) {
      setMounted(true);
    } else {
      setTimeout(() => { setMounted(true); }, delay);
    }
  }, []);"""
assert s.count(old)==1
open(p,'w').write(s.replace(old,"  useEffect(() => {}, []);"))
