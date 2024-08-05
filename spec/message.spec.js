const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function () {
    // test 4 “throws error if a name is NOT passed into the constructor as the first parameter”
    test("throws error if a name is NOT passed into the constructor as the first parameter", function () {
        expect(function () { new Message(); }).toThrow(new Error('Name required.'));
    });
    // test 5 test confirms that the constructor in the Message class correctly sets the name property in a new message object
    test("constructor sets name", function () {
        //create variables to for name and message to create object
        let name = "name"
        let message = new Message(name); //create a new object
        expect(message.name).toBe(name); 
    });
    // test 6 This test confirms that the commands property of a new message object contains the data passed in from the Message(name, commands) call.
    test("constructor sets name", function () {
        //create variables to make a sample command type and value to test object creation
        let commands = [new Command("commandType", "value"), new Command("commandType")]; //create an array 
        let message = new Message("test message", commands); //create a new object
        expect(message.commands).toBe(commands);

    });
});

