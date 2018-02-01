import * as socketIo from 'socket.io';

export default interface MySocket extends SocketIO.Socket {
    faName: string;
}