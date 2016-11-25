var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "John"
        var text = "Hi there"

        var msg = generateMessage("John", "Hi there");
        expect(msg.from).toBe(from);
        expect(msg.text).toBe(text);
        expect(msg.createdAt).toBeA('number');
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var lat= "222";
        var long = "333";
        var from = "David";

        var msg = generateLocationMessage(from, lat, long);
        expect(msg.from).toBe(from);
        expect(msg.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
        expect(msg.createdAt).toBeA('number');
    })
});