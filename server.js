var spawn = require('child_process').spawn;
var server = require('http').createServer();
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    var child = spawn('cmd.exe');

    child.stdout.on('data', function(data) {
        socket.emit('stdout', data);
    })

    child.stderr.on('data', function(data) {
        socket.emit('stderr', data);
    })
    socket.on('stdin', function(data) {
        child.stdin.write(data);
    });
    socket.on('disconnect', function() {
        child.kill();
    });
});

server.listen(3000);