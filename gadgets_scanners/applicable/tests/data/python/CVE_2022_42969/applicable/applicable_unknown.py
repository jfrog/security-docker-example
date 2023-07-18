import py
import sys

x = sys.argv[1]
svn = py.path.svnurl(x)
paths = svn.listdir()
