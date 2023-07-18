from PIL import Image

with Image.open("test.jpg") as im:
    im.rotate(45).show()

with Image.open(fp="test.jpg") as im:
    im.rotate(45).show()
