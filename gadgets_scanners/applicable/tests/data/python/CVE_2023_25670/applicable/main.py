import tensorflow as tf

func = tf.raw_ops.QuantizedMatMulWithBiasAndDequantize
para={'a': tf.constant(138, dtype=tf.quint8), 'b': tf.constant(4, dtype=tf.qint8), 'bias': [[31.81644630432129, 47.21876525878906], [109.95201110839844, 152.07968139648438]], 'min_a': 141.5337138686371, 'max_a': [73.84139251708984, 173.15280151367188], 'min_b': [], 'max_b': [[16.128345489501953, 193.26820373535156]], 'min_freezed_output': [], 'max_freezed_output': [115.50032806396484, 156.974853515625], 'Toutput': 1.0, 'transpose_a': True, 'transpose_b': False, 'input_quant_mode': 'MIN_FIRST'}

func(**para)