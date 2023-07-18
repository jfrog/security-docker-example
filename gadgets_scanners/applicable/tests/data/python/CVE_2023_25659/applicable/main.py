import tensorflow as tf

func = tf.raw_ops.DynamicStitch
para={'indices': [[0xdeadbeef], [405], [519], [758], [1015]], 'data': [[110.27793884277344], [120.29475402832031], [157.2418212890625], [157.2626953125], [188.45382690429688]]}
y = func(**para)