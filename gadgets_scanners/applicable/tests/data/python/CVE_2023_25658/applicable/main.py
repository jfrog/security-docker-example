import tensorflow as tf

func = tf.raw_ops.GRUBlockCellGrad

para = {'x': [[21.1, 156.2], [83.3, 115.4]], 'h_prev': array([[136.5],
      [136.6]]), 'w_ru': array([[26.7,  0.8],
      [47.9, 26.1],
      [26.2, 26.3]]), 'w_c': array([[ 0.4],
      [31.5],
      [ 0.6]]), 'b_ru': array([0.1, 0.2 ], dtype=float32), 'b_c': 0x41414141, 'r': array([[0.3],
      [0.4]], dtype=float32), 'u': array([[5.7],
      [5.8]]), 'c': array([[52.9],
      [53.1]]), 'd_h': array([[172.2],
      [188.3 ]])}

func(*para)