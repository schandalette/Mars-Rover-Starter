const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe('Message class', () => {
    // test 4: throws error if a name is NOT passed into the constructor as the first parameter
    test('throws error if a name is NOT passed into the constructor as the first parameter', () => {
        expect(() => new Message()).toThrow(new Error('Name required.'));
    });

    // test 5: confirms that the constructor sets the name property
    test('constructor sets name', () => {
        // Create variables for name and message to create an object
        const name = 'name';
        const message = new Message(name); // Create a new object
        expect(message.name).toBe(name);
    });

    // test 6: confirms that the constructor sets the commands property
    test('constructor sets commands', () => {
        // Create variables for sample commands to test object creation
        const commands = [new Command('commandType', 'value'), new Command('commandType')];
        const message = new Message('test message', commands); // Create a new object
        expect(message.commands).toBe(commands);
    });
});


