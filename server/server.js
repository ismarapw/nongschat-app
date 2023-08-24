const express = require('express');
const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const session = require('express-session');
const cors = require('cors');
const http = require('http');
const socketIo = require('./socket');

const app = express();
const server = http.createServer(app);
const ALLOWED_PORT = 'http://192.168.43.199:3000'

const socket = new socketIo(server, ALLOWED_PORT);
const io = socket.getIO();

server.listen(3001);

let onlineUser = [];

io.on('connect', (socket) => {
    socket.on('identify_user', (userId) => {
      if (!onlineUser.some((user) => user.userId === userId)) {  
        onlineUser.push({ userId: userId, socketId: socket.id });
      }
      
      socket.join(userId);
      io.emit('update_user_online', onlineUser);
    });

    socket.on('get_user_online', (ack) => {
      ack(onlineUser);
    });

    socket.on('disconnect', () => {
      onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
      io.emit('update_user_online', onlineUser);
    });

    socket.on('user_off', (userId) => {
      onlineUser = onlineUser.filter((user) => user.userId !== userId);
      io.emit('update_user_online', onlineUser);
    })
});
  
app.set('io', io);

app.use(express.static("public"));

app.use(cors({credentials : true, origin : ALLOWED_PORT}));

app.use(express.urlencoded());

app.use(express.json());

app.use(session({secret: 'secret_key', cookie: {maxAge: 30 * 24 * 60 * 60 * 1000}}));

app.use('/user', userRoutes);

app.use('/chat', chatRoutes);



