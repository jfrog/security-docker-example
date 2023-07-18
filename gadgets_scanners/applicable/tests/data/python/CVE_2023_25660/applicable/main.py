import tensorflow as tf

tf.raw_ops.Print(input =  tf.constant([1, 1, 1, 1],dtype=tf.int32),
                            data =  [[False, False, False, False], [False], [False, False, False]],
                            message =  'tmp/I',
                            first_n = 100,
                            summarize = 0)