"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIoClient = require("socket.io-client");
var readline = require("readline");
var myName = '';
var socket = socketIoClient.connect("http://localhost:3000");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
socket.on('connect', function () {
    rl.question('Qual o seu nome? ', function (answer) {
        myName = answer;
        socket.emit('register', answer);
    });
    rl.on('line', function (input) {
        socket.emit('message', input);
    });
});
socket.on('broadcast', function (data) {
    if (data.name != myName)
        console.log(data.name + ": " + data.message);
});
