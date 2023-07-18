from Crypto.Cipher import ARC2

arc2 = ARC2.new(b"secret", ARC2.MODE_CBC)
arc2.encrypt(b"secret message..")
