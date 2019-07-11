// Make connection
var socket = io.connect('http://localhost:5000');

// DOM Query
var user = document.getElementById('user'),
    message = document.getElementById('message'),
    btn = document.getElementById('btn'),
    feedback = document.getElementById('feedback'),
    output = document.getElementById('output');

// Display Origibal data
socket.on('originalData', function (result) {
  result.forEach(function (result) {
    output.innerHTML += "<p>" + "<strong>" + result.user + "</strong>" + ": " + result.message + "</p>";
  });
});
btn.addEventListener('click', function () {

  socket.emit('chat', {
    user: user.value,
    message: message.value
  });

});

  socket.on('chat', function (data) {
    feedback.innerHTML = '';
    output.innerHTML += "<p>" + "<strong>" + data.user + "</strong>" + ": " + data.message + "</p>";
    message.value = null;
});

message.addEventListener('keyup', function () {
  if (message.value !== '') {
    socket.emit('typing', {
      user: user.value,
      message: message.value
    });
  }
  else {
    socket.emit('notyping');
  }
});

socket.on('typing', function (data) {
  feedback.innerHTML = '<em>'+ data.user+ " is typing .." +'</em>';
});

socket.on('notyping', function() {
  feedback.innerHTML = '';
});
