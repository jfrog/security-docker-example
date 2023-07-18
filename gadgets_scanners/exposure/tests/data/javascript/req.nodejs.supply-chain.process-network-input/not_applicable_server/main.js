var net = require('net');
var child = require('child_process');

net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    var myREPL = child.spawn('/bin/sh');
    myREPL.stdin.write('test');
});