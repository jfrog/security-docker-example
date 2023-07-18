import py

x = "https://foo.bar/svn"
svn = py.path.svnurl(x)
paths = svn.listdir()
