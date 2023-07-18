import urllib.request
dat = urllib.request.urlopen('https://raw.githubusercontent.com/tensorflow/tensorflow/1c38ad9b78ffe06076745a1ee00cec42f39ff726/tensorflow/core/lib/gif/testdata/3g_multiframe.gif').read()
import tensorflow as tf
tf.io.decode_gif(dat)