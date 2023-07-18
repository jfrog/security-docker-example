import tensorflow as tf

# Known value - should not return evidence
tf.io.decode_png("known")
# Unknown value different function - should not return evidence
tf.io.decode_csv(input())