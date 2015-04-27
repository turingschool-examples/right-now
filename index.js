const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

http.listen(3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});