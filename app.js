const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const messageModel = require('../Socket.io Play/models/message.js');


// Connect to database
mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true });
mongoose.connection.once('open', function () {
  console.log('Connection has been made');
}).on('error', function (error) {
  console.log('There is an error: ', error);
});


// Construct app
var app = express();
var server = app.listen(5000, function () {
  console.log("I'm listening to port: 5000");
});

// Static files
app.use(express.static('public'));


// Deal with socket

var io = socket(server);

io.on('connection', function (socket) {
  console.log('connection made: ', socket.id);
  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
    // Save Message to database
    var newMessage = new messageModel({
      user: data.user,
      message: data.message
    });
    newMessage.save();
  });

  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });

  socket.on('notyping', function () {
    socket.broadcast.emit('notyping');
  });

  //Finding Records
  messageModel.find().then(function (result) {
    io.sockets.emit('originalData', result);
  });

});
