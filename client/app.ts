import * as socketIoClient from 'socket.io-client';
import * as readline from 'readline';

let myName = '';
let socket = socketIoClient.connect("http://localhost:3000");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
socket.on('connect', function() {
    rl.question('Qual o seu nome? ', (answer) => {
        myName = answer;
        socket.emit('register', answer);
    });

    rl.on('line', (input) => {
        socket.emit('message', input);
    });
});

socket.on('broadcast', (data: any) => {
    if( data.name != myName )
        console.log(data.name + ": " + data.message);
});