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

socket.on('newLocationMessage', function(msg){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);

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

var locationButton = jQuery('#send-location');

locationButton.on('click', function (e) {
    if (!navigator.geolocation){
        return alert('Geolocation not supported');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function (){
        alert('Unable to fetch location');
    });

    
});