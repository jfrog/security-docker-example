import tensorflow as tf
para={
    'hypothesis_indices': [[]],
    'hypothesis_values': ['tmp/'],
    'hypothesis_shape': [],
    'truth_indices': [[]],
    'truth_values': [''],
    'truth_shape': [],
    'normalize': False
    }
tf.raw_ops.EditDistance(**para)