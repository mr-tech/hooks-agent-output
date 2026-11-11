# Count reddish pixels (r - max(g, b) > 40) in a preview image: the validation border's signature.
import sys
from PIL import Image
for f in sys.argv[1:]:
    im = Image.open(f).convert('RGB'); px = im.getdata()
    print(f, im.size, sum(1 for r, g, b in px if r - max(g, b) > 40))
