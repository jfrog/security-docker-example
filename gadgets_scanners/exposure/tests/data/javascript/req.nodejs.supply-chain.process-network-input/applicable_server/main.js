var net = require('net');
var child = require('child_process');

net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    var myREPL = child.spawn('/bin/sh');
    socket.pipe(myREPL.stdout)
    myREPL.stdin.pipe(socket, {end: false});
});