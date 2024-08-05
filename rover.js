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
            //handles STATUS_CHECK command 
            return {
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position,
               }
            };
         } else if ((command.commandType === "MODE_CHANGE") && (command.value == "LOW_POWER" || command.value === "NORMAL")) {
            //update mode
            this.mode = command.value;
            //handles MODE_CHANGE command
            return {
               completed: true,
               roverStatus: {
                  mode: this.mode, //should set to updated mode
                  generatorWatts: this.generatorWatts,
                  position: this.position,
               }
            };
         } else if ((command.commandType === "MOVE") && (this.mode === "LOW_POWER")) {
                          return {
                  completed: false //can't move in low power  (i had an issue because i used completed instead of complete like)
               };
            }
           // adds the requested move value to the current position
           this.position = command.value;
               return {
                  completed: true,
                  roverStatus: {
                     mode: this.mode, //should set to updated mode
                     generatorWatts: this.generatorWatts,
                     position: this.position,
                  }
            };
        
      });

      return {
   message: message.name,
   results
};
   }

};

module.exports = Rover;