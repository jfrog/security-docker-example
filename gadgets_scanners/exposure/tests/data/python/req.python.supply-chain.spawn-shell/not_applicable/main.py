import pty

pty.fork()
pty.spawn("not_shell")