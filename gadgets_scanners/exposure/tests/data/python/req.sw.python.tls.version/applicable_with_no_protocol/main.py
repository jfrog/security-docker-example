import socket
import ssl

s = socket.socket()
wrapped_socket = ssl.wrap_socket(s)