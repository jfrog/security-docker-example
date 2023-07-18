from Crypto.Cipher import AES

aes = AES.new(b"secret12"*2, AES.MODE_CBC)
aes.encrypt(b"secret message..")
# Comment with ARC2 so this file will be scanned
