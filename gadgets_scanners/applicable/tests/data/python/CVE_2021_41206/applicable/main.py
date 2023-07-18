import tensorflow as tf

# Unknown value - BAD call
tf.sparse.split(input())

# Unknown value - BAD call
tf.sparse.split(sp_input=input())
