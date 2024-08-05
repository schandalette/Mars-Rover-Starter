const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {
//test 1
  test("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

// test 2 checks that the constructor in the command class correctly sets the commandType property in the new object.
  test("constructor sets command type", function(){
    //create variables to make a sample command type and value to test object creation
    const commandType = "commandType"
    const command = new Command(commandType) //create a new object
    expect(command.commandType).toBe(commandType)
  });
  // test 3 constructor correctly sets the value property in the new object
  test("constructor sets a value passed in as the 2nd argument", function() {
     //create variables to make a sample command type and value to test object creation
    const commandType = "commandType"
    const value = "value"
    const command = new Command(commandType,value) //create a new object
    expect(command.value).toBe(value)
  });
});

