var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

});

socket.on('disconnect', function() {
    console.log("disconnected from server");
});

socket.on('newMessage', function(msg) {
    
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        timestamp: moment(msg.createdAt).format('hh:mm a')
    });

    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(msg){
    
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: msg.url,
        from: msg.from,
        timestamp: moment(msg.createdAt).format('hh:mm a')
    });

    jQuery('#messages').append(html);
    
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