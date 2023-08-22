import { io } from 'socket.io-client';

const socketInstance = io('http://192.168.43.199:3001');

export default socketInstance;
