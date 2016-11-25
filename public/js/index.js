var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

});

socket.on('disconnect', function() {
    console.log("disconnected from server");
});

socket.on('newMessage', function(msg) {
    console.log('New message arrived');
    console.log(msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
});

socket.emit('createMessage', {
    from: "Frank",
    text: "Hi Server!"
}, function(data){
    console.log(data);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: "Browser",
        text: jQuery('[name=message]').val()
    }, function (data){

    });
});