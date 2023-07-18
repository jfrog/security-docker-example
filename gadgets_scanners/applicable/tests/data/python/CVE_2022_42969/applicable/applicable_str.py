import py

svn = py.path.svnurl(rev=None, path="http://foo.bar/svn")
paths = svn.listdir()
