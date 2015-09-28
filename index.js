const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const redis = require('redis');
const client = redis.createClient();
client.subscribe("community");

client.on("message", function (channel, message) {
  io.sockets.emit("gamenight", {user: "socket", text: message})
});

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});

io.on("connection", function(socket) {
  console.log("Someone Connected!");

  socket.on("subscribe", function(room) {
    console.log("client subscribed to room: ", room);
    socket.join(room);
  });

  socket.on("unsubscribe", function(room) {
    console.log("client unsubscribed to room: ", room);
    socket.leave(room);
  });

  socket.on("message", function(room, message) {
    console.log("will emit message to room: ", room)
    io.sockets.in(room).emit("message", message);
  });

});
