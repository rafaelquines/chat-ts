import * as Http from 'http';
import * as socketIo from 'socket.io';
import MySocket from './mySocket';
let app = Http.createServer();
let io = socketIo(app);
app.listen(3000, () => {
    console.log("Bem vindo ao bate papo daddd TOTVS");
});

io.on('connection', (socket) => {
    const mySocket = <MySocket>socket;

    socket.on('disconnect', (socket) => {
        console.log(mySocket.faName + ' saiu da conversa');
        io.emit('user_exited', mySocket.faName);
    });

    socket.on("register", (data) => {
        mySocket.faName = data;
        io.emit('user_entered', mySocket.faName);
        console.log(mySocket.faName + " entrou na conversa");
    });

    socket.on('message', (data) => {
        console.log(mySocket.faName + ": " + data);
        io.emit('broadcast', {
            name: mySocket.faName,
            message: data
        });
    })
});

