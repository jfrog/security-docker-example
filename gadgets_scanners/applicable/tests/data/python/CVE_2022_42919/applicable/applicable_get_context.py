import multiprocessing as mp
import sys


def foo(q):
    q.put("hello")


if __name__ == "__main__":
    ctx = mp.get_context(sys.argv[1])
    q = ctx.Queue()
    p = ctx.Process(target=foo, args=(q,))
    p.start()
    print(q.get())
    p.join()
