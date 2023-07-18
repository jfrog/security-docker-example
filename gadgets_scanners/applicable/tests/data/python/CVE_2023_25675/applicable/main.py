import tensorflow as tf

func = tf.raw_ops.Bincount
para={'arr': 6, 'size': 804, 'weights': [52, 351]}

@tf.function(jit_compile=True)
def fuzz_jit():
 y = func(**para)
 return y

print(fuzz_jit())