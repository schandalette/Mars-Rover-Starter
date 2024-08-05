const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
//method receiveMessage(message)
// Param message is an object of the Message class
//Method should return an object with message(string) and result(array of objects)
// position(number, required)
// mode(default to string "NORMAL")
// generatorWatts(default to number 110)

describe("Rover class", function () {

  // 7 tests here! constructor sets position and default values for mode and generatorWatts
  test("constructor sets position and default values for mode and generatorWatts", function () {
    const position = "position";
    const rover = new Rover(position);

    expect(rover.position).toBe(position)
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });

  // test 8 “response returned by receiveMessage contains the name of the message”
  test("response returned by receiveMessage contains the name of the message", function () {
    const commands = [new Command("Move", 10), new Command("STATUS_CHECK")]; // 2 commands in array
    const message = new Message("Test message with two commands", commands) // test message name text
    const rover = new Rover(0); //reseting the rover class
    const response = rover.receiveMessage(message); //veriable for the recieveMessage mode 
    expect(response.message).toBe(message.name)
  });
  // test 9 “response returned by receiveMessage includes two results if two commands are sent in the message”
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    const commands = [new Command("Move", 10), new Command("STATUS_CHECK")]; // 2 commands in array
    const message = new Message('Test message with two commands', commands); // initial message with commands
    const rover = new Rover(0); //reset rover
    const response = rover.receiveMessage(message); //provide response
    expect(response.results.length).toBe(2);
  });
  // test 10 “responds correctly to the status check command”
  test("responds correctly to the status check command", function () {
    const commands = [new Command("STATUS_CHECK")]; // status check command
    const position = 350986
    const message = new Message('Status check', commands); // initial message with commands
    const rover = new Rover(position); //set rover position
    const response = rover.receiveMessage(message); //setting the recieveMessage mode
    const expectedStatus = { mode: "NORMAL", generatorWatts: 110, position }
    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus).toEqual(expectedStatus) //toEqual worked because it is value based equality not strick equality
  });

  // test 11 “responds correctly to the mode change command”
  // The test should check the completed property and rover mode for accuracy.
  // The rover has two modes that can be passed as values to a mode change command: ‘LOW_POWER’ and ‘NORMAL’.
  test("responds correctly to the mode change command", function () {
    const commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    const message = new Message('Status change to low power', commands); // initial message with commands
    const rover = new Rover(0); //set rover position
    const response = rover.receiveMessage(message); //setting the recieveMessage mode
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe("LOW_POWER") //toEqual worked because it is value based equality not strick equality
  });
  // test 12 “responds with a false completed value when attempting to move in LOW_POWER mode”
  // The test should check the completed property for accuracy and confirm that the rover’s position did not change.
  // Use the Rover Modes table for guidance on how to handle move commands in different modes.
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    const startPosition = 87382;
    const rover = new Rover(startPosition); //set rover position'
    rover.mode = "LOW_POWER"
    const commands = [new Command("MOVE", 50)];
    const message = new Message('Move in low power', commands); // message with commands
    const response = rover.receiveMessage(message); //setting the recieveMessage mode
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toBe(startPosition) //
  });
  // test 13 “responds with the position for the move command”
  //A MOVE command will update the rover’s position with the position value in the command.
  test("esponds with the position for the move command", function () {
    const startPosition = 87382;
    const rover = new Rover(startPosition); //set rover position'
    const newPosition = 345
    const commands = [new Command("MOVE", newPosition)];
    const message = new Message('Move in low power', commands)
    const response = rover.receiveMessage(message); //setting the recieveMessage mode
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toBe(newPosition) //

  });
});
