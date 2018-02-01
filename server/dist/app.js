"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Http = require("http");
var socketIo = require("socket.io");
var app = Http.createServer();
var io = socketIo(app);
app.listen(3000, function () {
    console.log("Bem vindo ao bate papo da TOTVS");
});
io.on('connection', function (socket) {
    var mySocket = socket;
    socket.on('disconnect', function (socket) {
        console.log(mySocket.faName + ' saiu da conversa');
        io.emit('user_exited', mySocket.faName);
    });
    socket.on("register", function (data) {
        mySocket.faName = data;
        io.emit('user_entered', mySocket.faName);
        console.log(mySocket.faName + " entrou na conversa");
    });
    socket.on('message', function (data) {
        console.log(mySocket.faName + ": " + data);
        io.emit('broadcast', {
            name: mySocket.faName,
            message: data
        });
    });
});
