import tensorflow as tf

f1 = tf.raw_ops.QuantizeAndDequantize
f2 = tf.raw_ops.QuantizeAndDequantizeV2
f3 = tf.raw_ops.QuantizeAndDequantizeV3
f4 = tf.raw_ops.QuantizeAndDequantizeV4
f5 = tf.raw_ops.QuantizeAndDequantizeV4Grad

f1()
f2()
f3()
f4()
f5()