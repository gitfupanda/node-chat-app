var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: "Jane@host.com",
        text: "A new message"
    });

});

socket.on('disconnect', function() {
    console.log("disconnected from server");
});

socket.on('newMessage', function(msg) {
    console.log('New message arrived');
    console.log(msg);
});