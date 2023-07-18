import tensorflow as tf

# Known value - should not return evidence
tf.sparse.split("known")

# Unknown value different function - should not return evidence
tf.sparse.cross_hashed(input())
