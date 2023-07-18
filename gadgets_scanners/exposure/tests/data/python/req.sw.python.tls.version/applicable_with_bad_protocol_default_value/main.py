import socket
import ssl

def open_ssl_socket(ssl_version=ssl.PROTOCOL_TLSv1):
    s = socket.socket()
    return ssl.wrap_socket(s, ssl_version=ssl_version)
