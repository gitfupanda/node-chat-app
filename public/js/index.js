var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

});

socket.on('disconnect', function() {
    console.log("disconnected from server");
});

socket.on('newMessage', function(msg) {
    
    var formattedTime = moment(msg.createdAt).format('hh:mm a');
    
    var li = jQuery('<li></li>');
    li.text(`[${formattedTime}] ${msg.from}: ${msg.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(msg){
    var formattedTime = moment(msg.createdAt).format('hh:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`[${formattedTime}] ${msg.from}: `);
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

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: "Browser",
        text: messageTextbox.val()
    }, function (data){
        messageTextbox.val('')
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function (e) {
    if (!navigator.geolocation){
        return alert('Geolocation not supported');
    }

    locationButton.attr('disabled','disabled').text('Sending ...');
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, function (){
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send Location');
    });

    
});