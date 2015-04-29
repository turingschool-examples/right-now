const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connection', function (socket) {
  console.log('SOMEONE CONNECTED!!! THIS IS GREAT!!!');
  socket.emit('message', { user: 'turingbot', text: 'Hello and welcome to this chatroom.' });
  socket.broadcast.emit('message', { user: 'turingbot', text: 'Someone new has connected.' });

  socket.on('message', function (channel, message) {
    io.sockets.emit('message', message);
  });
});

http.listen(3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});