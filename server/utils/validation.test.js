var expect = require('expect');
var {isRealString} = require('./validation');

describe("isRealString", () => {

    it("should reject non string", () => {
        var nonString = 1234;
        expect(isRealString(nonString)).toBe(false);
    });

    it("should reject string with only white spaces", () =>  {
        var whiteSpaces = "    ";
        expect(isRealString(whiteSpaces)).toBe(false);
    });

    it("should accept a string", () => {
        expect(isRealString("Hello")).toBe(true);
    })

});
