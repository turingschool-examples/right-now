var socket = io();

var $messages = $('.messages');

function addMessage(message) {
  $(`<p class="message">${message.user}: ${message.text}</p>`).appendTo($messages);
}

socket.on('message', addMessage);

var $usernameInput = $('#username');
var $messageTextInput = $('#message-text');

$('#submit-message').on('click', function () {
  socket.send('message', {
    user: $usernameInput.val(),
    text: $messageTextInput.val()
  });

  $('#submit-message input').val('');
});