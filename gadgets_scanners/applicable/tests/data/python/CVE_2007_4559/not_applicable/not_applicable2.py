import tarfile
import sys


tar_archive = sys.argv

with tarfile.open(tar_archive) as tar:
    tar.list()

with tarfile.open("aa") as gtar:
    gtar.extractall()
