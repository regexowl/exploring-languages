/*
   -------------------------------------------------

   Simple text adventure
   Author: regexowl
   Updated: 23-02-2022

   -------------------------------------------------

   A simple text adventure converted from Go source code to Javascript

*/

// A structure for storing the location and caffeination of the player
class State {
	constructor(location, cupsOfCoffee, checkedLaptop) {
		this.location = location;
		this.cupsOfCoffee = cupsOfCoffee;
		this.checkedLaptop = checkedLaptop;
	}
}

// Scans keyboard input to the 'command' variable and converts it to lowercase to eliminiate case sensitivity
function getCommand() {
	var action = document.getElementById("userAction").value;
	action = action.toLowerCase();

	return action;
}

// Prints options based on the location of the player
function presentOptions(state) {
	if (state.location == "Bedroom") {
		inTheBedroom();
	} else if (state.location == "Kitchen") {
		inTheKitchen(state);
	} else {
		console.log("You've got lost in space and time.");
	}
}

// Returns what hour of the day is it right now
function whatsTheTime() {
	return time.Now().Hour();
}

// Prints the prologue of the story
function wakeUp() {
	console.log("You wake up with a headache. Sun is pouring through a dirty window.");
	console.log("");
	console.log("You look around the room and see your laptop, an alarm clock and a door to the kitchen.");
	console.log("");
	console.log("What would you like to do?");
}

// Prints options when the player is in the bedroom
function inTheBedroom() {
	console.log("");
	console.log(" Type TIME to check time");
	console.log(" Type LAPTOP to check your e-mails");
	console.log(" Type KITCHEN to go to the kitchen");
	console.log(" Type LEAVE to go outside");
	console.log("");
}

// Prints options when the player is in the kitchen
function inTheKitchen(state) {
	console.log("")
	if (state.cupsOfCoffee <= 4) {
		console.log("Type COFFEE to boost your energy")
	}
	console.log("Type BACK to go to the living room")
	console.log("")
}

// Prints a message when the player chooses non-existent option
function completeConfusion() {
	console.log("You are confused by your own actions.")
}

// Prints a result of player's action and changes state
function changeState(command, state) {
	if (state.location == "Bedroom") {
		switch (command) {
		case "time":
			console.log("It is", whatsTheTime(), "o'clock right now.");
		case "kitchen":
			console.log("You are now standing next to your beloved coffee machine.");
			state.location = "Kitchen";
		case "laptop":
			if (state.cupsOfCoffee > 0) {
				console.log("Huh, it's your time off today!");
				state.checkedLaptop = true;
			} else {
				console.log("You don't feel like checking your e-mails right now. Maybe you should drink some coffee first.");
			}
		case "leave":
			if (state.checkedLaptop == true) {
				console.log("You feel sudden urge to go for a walk.");
				state.location = "Outside";
			} else {
				console.log("You should check your e-mails first. Just to be sure.");
			}
		default:
			completeConfusion();
		}
	} else if (state.location == "Kitchen") {
		switch (command) {
		case "back":
			console.log("You are back in the living room.");
			state.location = "Bedroom";
		case "coffee":
			// How much coffee can you possibly drink?
			if (state.cupsOfCoffee < 3) {
				var howMuch = "";
				switch (state.cupsOfCoffee) {
				case 0:
					howMuch = "slightly";
				case 1:
					howMuch = "even more";
				case 2:
					howMuch = "very";
				}
				console.log("You feel", howMuch, "awake.");
			} else if (state.cupsOfCoffee == 3) {
				console.log("You should slow down with the coffee.");
			} else if (state.cupsOfCoffee == 4) {
				console.log("That's it, no more coffee for you!");
			} else {
				console.log("Nope.");
			}
			state.cupsOfCoffee += 1;
		case "leave":
			if (state.checkedLaptop == true) {
				state.location = "Outside";
			} else {
				console.log("You should check your e-mails first. Just to be sure.");
			}
		default:
			completeConfusion();
		}
	}
}

// Prints after leaving home
function goOutside() {
	console.log("");
	console.log("What a beautiful day.");
	console.log("Enjoy!");
	console.log("");
	os.Exit(0);
}

// MAIN
// Innitialise state
let state = new State("Bedroom", 0, false);
state.location = "Bedroom";
var command;

// Print the prologue
wakeUp();
// Loop through these three until the player chooses to leave:
do {
	// 1) look at state and present options based on it
	presentOptions(state);
	// 2) read player's command
	command = getCommand();
	// 3) change state based on command or print an error
	changeState(command, state);
} while (state.location != "Outside");

// Print after leaving home
goOutside();
