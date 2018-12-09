const express = require('express');
const DB = require('./db/index.js');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 3005;

const API = require('./api/index.js');

server.listen(port, () => {
  console.log('chat-server is listening ', port);
});

io.on('connection', (socket) => {
  // console.log('connection', socket);

  socket.on('message-to-server', function (msg) {
    socket.broadcast.emit('message-to-client', msg);
  });
});

API.$event.on('like', function (data) {
  console.log('like', data);
  io.sockets.emit('like-to-client', data);
  // socket.broadcast.emit('like-to-client', data);
});

// socket.broadcast.emit  --- send a message to all except the one sent the message.
// io.sockets.emit  ---  send a message to all sockets connected now.

(async function () {
  await DB.connect();
  
  // const user = await DB.createNewUser();
  // console.log('user', user);
})();


require('./api/index.js');