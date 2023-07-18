import tensorflow as tf

v = tf.Variable(1)

@tf.function(jit_compile=True)
def test():
   func = tf.raw_ops.LookupTableImportV2
   para={'table_handle': v.handle,'keys': [62.98910140991211, 94.36528015136719], 'values': -919}

   y = func(**para)
   return y