from zipfile import ZipFile

# Create a ZipFile Object and load sample.zip in it
with ZipFile('sampleDir.zip', 'r') as zipObj:
   zipObj.extractall()
