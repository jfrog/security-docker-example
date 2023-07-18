from multiprocessing.connection import Listener

address = "0.0.0.0"

with Listener(address, authkey=b"secret password") as listener:
    with listener.accept() as conn:
        conn.recv()
