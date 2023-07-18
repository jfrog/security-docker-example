import tensorflow as tf

# Unknown value - BAD call
tf.io.decode_png(input())
# Unknown value - BAD call
tf.io.decode_png(contents=input())