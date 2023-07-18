from urllib.parse import urlparse

val = get_user_input()

# Applicable: case 1
urlparse(val)

# Applicable: case 2
urlparse(url=val)

# Applicable: case 3
# There appears to be an error in the documentation:
#    https://docs.python.org/3/library/urllib.parse.html
# The argument is actually called url, not urlstring.
# In case this gets fixed in the future, I also added the
# name from documentation (even though it's incorrect).
urlparse(urlstring=val)
