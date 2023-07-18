from zipfile import ZipFile

# Create a ZipFile Object and load sample.zip in it
print("extractall")
with ZipFile('sampleDir.zip', 'r') as zipObj:
   zipObj.extract("filename", "outfilename")
