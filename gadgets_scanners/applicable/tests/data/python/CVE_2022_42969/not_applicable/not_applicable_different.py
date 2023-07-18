import py
import sys

x = sys.argv[1]
svn_not_safe = py.path.svnurl(x)

y = "https://foo.bar/svn"
svn_safe = y
paths = svn_safe.listdir()
