const expect = require('expect');
const {Users} = require('./users');

describe("Users", () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
             id: '1',
            name: 'David',
            room: 'One'
        }, {
             id: '2',
            name: 'Mike',
            room: 'Two'
        }, {
             id: '3',
            name: 'John',
            room: 'One'
        }]
    });
    

    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '1234',
            name: 'David',
            room: 'One'
        }

        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for room one', () => {
        
        var names = users.getUsersByRoom('One');

        expect(names).toEqual(['David', 'John']);


    });

    it ('should remove a user', () => {
        var userId = '1';
        var removedUser = users.removeUser(userId);
        expect(removedUser).toEqual({
             id: '1',
            name: 'David',
            room: 'One'
        });
        expect(users.users).toEqual([{
             id: '2',
            name: 'Mike',
            room: 'Two'
        }, {
             id: '3',
            name: 'John',
            room: 'One'
        }])
    });

    it ('should not remove user', () => {
        var userId = '4';
        var removedUser = users.removeUser(userId);
        expect(removedUser).toNotExist();
        expect(users.users).toEqual([{
             id: '1',
            name: 'David',
            room: 'One'
        }, {
             id: '2',
            name: 'Mike',
            room: 'Two'
        }, {
             id: '3',
            name: 'John',
            room: 'One'
        }])
    });

    it ('should find user', () => {
       var userId = '2';
       var user = users.getUser(userId);
       expect(user.id).toBe(userId);
    });

    it ('should not find user', () => {
       var userId = '4';
       var user = users.getUser(userId);
       expect(user).toNotExist();
    });

});