from paramiko import RSAKey

key = RSAKey()
key.write_private_key_file()

NOT_PKey_instance = {}
NOT_PKey_instance.write_private_key_file()