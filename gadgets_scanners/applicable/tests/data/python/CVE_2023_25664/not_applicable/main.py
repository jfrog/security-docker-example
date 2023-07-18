import tensorflow as tf
import numpy as np

@tf.function(jit_compile=True)
def test():
   print("tf.raw_ops.AvgPoolGrad")

print(test())