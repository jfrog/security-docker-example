from PIL import Image
import sys

with Image.open(fp=sys.argv[1]) as im:
    im.rotate(45).show()
