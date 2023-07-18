import tarfile

with tarfile.open("trusted_archive.tar") as tar:
    tar.extractall()

with tarfile.open("trusted_archive.tar") as tar:
    tar.extract("trusted_file")
