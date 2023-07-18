import tensorflow as tf
import os
import numpy as np
from tensorflow.python.ops import nn_ops
try:
  arg_0_tensor = tf.random.uniform([3, 30, 50, 3], dtype=tf.float64)
  arg_0 = tf.identity(arg_0_tensor)
  arg_1_0 = 2
  arg_1_1 = 3
  arg_1_2 = 1
  arg_1_3 = 1
  arg_1 = [arg_1_0,arg_1_1,arg_1_2,arg_1_3,]
  arg_2 = True
  arg_3 = True
  seed = 341261001
  out1 = nn_ops.fractional_avg_pool_v2(arg_0,arg_1,arg_2,arg_3,seed=seed,)
  ou2 = nn_ops.fractional_max_pool_v2(arg_0, arg_1, arg_2, arg_3, seed=seed, )
except Exception as e:
  print("Error:"+str(e))