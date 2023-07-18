import py

z = "https://domain.com"
x = "http://foo.bar/svn"
y = py.path.svnurl(x).listdir()
y = py.path.svnurl(z)
