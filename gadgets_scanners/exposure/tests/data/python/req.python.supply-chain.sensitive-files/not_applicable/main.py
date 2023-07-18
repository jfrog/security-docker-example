# We are not reading here /etc/shadow
with open("/etc/localtime") as f:
    x = f.read()