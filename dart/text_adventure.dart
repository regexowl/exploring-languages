/*
   -------------------------------------------------

   Simple text adventure
   Author: regexowl
   Updated: 23-02-2022

   -------------------------------------------------

   A simple text adventure written in Dart
   Check https://github.com/regexowl/exploring-languages to see the same adventure in multiple other languages

*/

import 'dart:io';

// A structure for storing the location and caffeination of the player
class State {
	String location = "";
	int cupsOfCoffee = 0;
	bool checkedLaptop = false;
}

// Scans keyboard input to the 'command' variable and converts it to lowercase to eliminiate case sensitivity
String getCommand() {
	String action = stdin.readLineSync()!;
	action = action.toLowerCase();
	return action;
}

// Prints options based on the location of the player
void presentOptions(State state) {
	if (state.location == "Bedroom") {
		inTheBedroom();
	} else if (state.location == "Kitchen") {
		inTheKitchen(state);
	} else {
		print("You've got lost in space and time.");
	}
}

// Returns what hour of the day is it right now
int whatsTheTime() {
	return DateTime.now().hour;
}

// Prints the prologue of the story
void wakeUp() {
	print("You wake up with a headache. Sun is pouring through a dirty window.");
	print("");
	print("You look around the room and see your laptop, an alarm clock and a door to the kitchen.");
	print("");
	print("What would you like to do?");
}

// Prints options when the player is in the bedroom
void inTheBedroom() {
	print("");
	print(" Type TIME to check time");
	print(" Type LAPTOP to check your e-mails");
	print(" Type KITCHEN to go to the kitchen");
	print(" Type LEAVE to go outside");
	print("");
}

// Prints options when the player is in the kitchen
void inTheKitchen(State state) {
	print("");
	if (state.cupsOfCoffee <= 4) {
		print("Type COFFEE to boost your energy");
	}
	print("Type BACK to go to the living room");
	print("");
}

// Prints a message when the player chooses non-existent option
void completeConfusion() {
	print("You are confused by your own actions.");
}

// Prints a result of player's action and changes state
void changeState(String command, State state) {
	if (state.location == "Bedroom") {
		switch (command) {
		case "time":
			int currentHour = whatsTheTime();
			print("It is ${currentHour} o'clock right now.");
			break;
		case "kitchen":
			print("You are now standing next to your beloved coffee machine.");
			state.location = "Kitchen";
			break;
		case "laptop":
			if (state.cupsOfCoffee > 0) {
				print("Huh, it's your time off today!");
				state.checkedLaptop = true;
			} else {
				print("You don't feel like checking your e-mails right now. Maybe you should drink some coffee first.");
			}
			break;
		case "leave":
			if (state.checkedLaptop == true) {
				print("You feel sudden urge to go for a walk.");
				state.location = "Outside";
			} else {
				print("You should check your e-mails first. Just to be sure.");
			}
			break;
		default:
			completeConfusion();
			break;
		}
	} else if (state.location == "Kitchen") {
		switch (command) {
		case "back":
			print("You are back in the living room.");
			state.location = "Bedroom";
			break;
		case "coffee":
			// How much coffee can you possibly drink?
			if (state.cupsOfCoffee < 3) {
				String howMuch;
				switch (state.cupsOfCoffee) {
				case 0:
					print("You feel slightly awake.");
					break;
				case 1:
					print("You feel even more awake.");
					break;
				case 2:
					print("You feel very awake.");
					break;
				}
			} else if (state.cupsOfCoffee == 3) {
				print("You should slow down with the coffee.");
			} else if (state.cupsOfCoffee == 4) {
				print("That's it, no more coffee for you!");
			} else {
				print("Nope.");
			}
			state.cupsOfCoffee += 1;
			break;
		case "leave":
			if (state.checkedLaptop == true) {
				state.location = "Outside";
			} else {
				print("You should check your e-mails first. Just to be sure.");
			}
			break;
		default:
			completeConfusion();
			break;
		}
	}
}

// Prints after leaving home
void goOutside() {
	print("");
	print("What a beautiful day.");
	print("Enjoy!");
	print("");
	exit(0);
}

// MAIN
void main() {

	// Innitialise state
	var state = State();
	state.location = "Bedroom";
	String command;

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
}
