import py

z = py.path.svnurl("known")
x = "http://foo.bar/svn"
with py.path.svnurl(x) as svn:
    z.listdir()
    svn.listdir()
