console.log("running code from application.js")

var socket = io();
socket.on("connect", function() {
  console.log("Connected from the Browser");
});

socket.on('message', function (data) {
  console.log(arguments);
  console.log(data);
});


$("#send-room-1").click(function() {
  console.log("will send message from room1");
  socket.emit("message", "room1", "message from room 1")
});

$("#send-room-2").click(function() {
  console.log("will send message from room2");
  socket.emit("message", "room2", "message from room 2")
});

$("#sub-room-1").click(function() {
  socket.emit("subscribe", "room1");
});

$("#sub-room-2").click(function() {
  socket.emit("subscribe", "room2");
});

$("#un-sub-room-1").click(function() {
  socket.emit("unsubscribe", "room1");
});

$("#un-sub-room-2").click(function() {
  socket.emit("unsubscribe", "room2");
});
