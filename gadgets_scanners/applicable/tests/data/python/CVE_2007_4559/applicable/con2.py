import tarfile
import sys


tar_archive = sys.argv

with tarfile.open(tar_archive) as tar:
    for member in tar.getmembers():
        tar.extract(member)
