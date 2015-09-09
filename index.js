'use strict';

var net = require("net");
var fs = require("fs");
var nameGen = require("tmp");

var server = net.createServer(function(socket) {
  socket.on('data', function(data) {
    var fName = nameGen.file({
        mode: 0x1A4,  // = 110100100 = 0644 octal, not allowed in strict mode
        prefix: "./TCPlog",
        postfix: ".txt"
      },
      function _tmpFile(err, path, fDesc) {
        if (err) return console.log(err);
        var ws = fs.createWriteStream(path);
        console.log(path);
        ws.write(data.toString('utf8'));
        ws.end();
      }
    );
  });
});

server.listen(3000);
