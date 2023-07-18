import tensorflow as tf

func = tf.raw_ops.ParallelConcat
para = {'shape':  0, 'values': [1]}

@tf.function(jit_compile=True)
def test():
   y = func(**para)
   return y

test()