var io = require('socket.io-client');
var socket = io('http://localhost:3000');

socket.on('connect', function() {
    //socket.emit('stdin', 'D:/mozilla-build/start-shell-msvc2013-x64\n');
});

socket.on('stdout', function(data) {
    process.stdout.write(data);
});

socket.on('stderr', function(data) {
    process.stderr.write(data);
});

socket.on('disconnect', function() {
	
});

process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    socket.emit('stdin', chunk);
});

process.stdin.on('end', function() {
    process.stdout.write('end');
});