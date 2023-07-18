import tensorflow as tf

para = {'input': tf.constant([[14.], [24.]], dtype=tf.float32), 'window_size': 1, 'stride': 0, 'magnitude_squared': False}
func = tf.raw_ops.AudioSpectrogram