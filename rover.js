class Rover {
   // Write code here!
   //initializes the rover's properties
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      const results = message.commands.map(command => {
         if (command.commandType === "STATUS_CHECK") {
            // Handles STATUS_CHECK command
            return {
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position,
               }
            };
         } else if (
            command.commandType === "MODE_CHANGE" &&
            (command.value === "LOW_POWER" || command.value === "NORMAL")
         ) {
            // Update mode
            this.mode = command.value;
            // Handles MODE_CHANGE command
            return {
               completed: true
            };
         } else if (command.commandType === "MOVE" && this.mode === "NORMAL") {
            //update postion
            this.position = command.value;
            return {
               completed: true
            };
         } else {
            // can't move in low power
            return{
               completed: false
            };
         }
      });

      return {
         message: message.name,
         results
      };
   }
}

module.exports = Rover;