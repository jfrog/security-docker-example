from Crypto.Cipher import AES

key = 'key'
cipher = AES.new(key, AES.MODE_EAX)