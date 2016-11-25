const http = require('http');
const path = require('path');

const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');

    socket.emit('newMessage', generateMessage("Admin", "Welcome to chat"));

    socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"));
    

    socket.on('createMessage', (msg, callback) => {
        console.log('createMessage', msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback("Message Ack!!!");
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected");
    });

});



server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});





