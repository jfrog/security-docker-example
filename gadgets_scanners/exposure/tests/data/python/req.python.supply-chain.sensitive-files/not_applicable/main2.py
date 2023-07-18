def shadow_hash():
    """
    Generates a salted hash suitable for /etc/shadow.

    crypt_salt : None
        Salt to be used in the generation of the hash. If one is not
        provided, a random salt will be generated.

    password : None
        Value to be salted and hashed. If one is not provided, a random
        password will be generated.

    algorithm : sha512
        Hash algorithm to use.

    CLI Example:

    .. code-block:: bash

        salt '*' random.shadow_hash 'My5alT' 'MyP@asswd' md5
    """
    return True