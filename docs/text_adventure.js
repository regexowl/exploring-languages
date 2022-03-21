/*
   -------------------------------------------------

   Simple text adventure
   Author: regexowl
   Updated: 10-03-2022

   -------------------------------------------------

   A simple text adventure written in Javascript
   Check https://github.com/regexowl/exploring-languages to see the same adventure in multiple other languages

*/

// A class for storing the location and caffeination of the player
class State {
	constructor(location, cupsOfCoffee, checkedLaptop) {
		this.location = location;
		this.cupsOfCoffee = cupsOfCoffee;
		this.checkedLaptop = checkedLaptop;
	}
}

// Initialization of a new instance of State class
let state = new State("Bedroom", 0, false);

// Function that prints outputs on the page
function jsToHTML(whatNeedsToBeSeen) {
	var story = document.getElementById("theStory");
	story.innerHTML += whatNeedsToBeSeen + "<br>";
}

// Scans keyboard input to the 'action' variable and converts it to lowercase to eliminiate case sensitivity
function getCommand() {
	var action = document.getElementById("userAction").value;
	action = action.toLowerCase();
	return action;
}

// Prints options based on the location of the player
function presentOptions() {
	if (state.location == "Bedroom") {
		inTheBedroom();
	} else if (state.location == "Kitchen") {
		inTheKitchen();
	} else if (state.location == "Outside") {
		goOutside();
	} else {
		jsToHTML("You've got lost in space and time.");
	}
}

// Returns what hour of the day is it right now
function whatsTheTime() {
	let currentDate = new Date();
	let currentHour = currentDate.getHours();
	return currentHour;
}

// The prologue of the story
function wakeUp() {
	const prologue = `
You wake up with a headache. Sun is pouring through a dirty window.
You look around the room and see your laptop, an alarm clock and a door to the kitchen.
		
What would you like to do?`;

	jsToHTML(prologue);
}

// Player's options while in the bedroom
function inTheBedroom() {
	const bedroomChoices = `
  Type TIME to check time
  Type LAPTOP to check your e-mails
  Type KITCHEN to go to the kitchen
  Type LEAVE to go outside
	`;

	jsToHTML(bedroomChoices);
}

// Player's options while in the kitchen
function inTheKitchen() {
	var kitchenChoices;
	if (state.cupsOfCoffee <= 4) {
		kitchenChoices = `
  Type COFFEE to boost your energy
  Type BACK to go to the living room
		`;
	}
	// When player drinks more than four cups of coffee the option for another coffee doesn't print
	else {
		kitchenChoices = `
  Type BACK to go to the living room
		`;
	}

	jsToHTML(kitchenChoices);
}

// Prints a message when the player chooses non-existent option
function completeConfusion() {
	jsToHTML("You are confused by your own actions.");
}

// Prints a result of player's action and changes state
function changeState(command) {
	// While in the bedroom
	if (state.location == "Bedroom") {
		// Based on player's action
		switch (command) {
		case "time":
			jsToHTML("It is " + whatsTheTime() + " o'clock right now.");
			break;
		case "kitchen":
			jsToHTML("You are now standing next to your beloved coffee machine.");
			state.location = "Kitchen";
			document.body.style.backgroundImage = "url('img/kitchen.jpg')";
			break;
		case "laptop":
			if (state.cupsOfCoffee > 0) {
				jsToHTML("Huh, it's your time off today!");
				state.checkedLaptop = true;
			} else {
				jsToHTML("You don't feel like checking your e-mails right now. Maybe you should drink some coffee first.");
			}
			break;
		case "leave":
			if (state.checkedLaptop == true) {
				jsToHTML("You feel sudden urge to go for a walk.");
				state.location = "Outside";
				document.body.style.backgroundImage = "url('img/outside.jpg')";
			} else {
				jsToHTML("You should check your e-mails first. Just to be sure.");
			}
			break;
		default:
			completeConfusion();
			break;
		}
	// While in the kitchen
	} else if (state.location == "Kitchen") {
		// Based on player's action
		switch (command) {
		case "back":
			jsToHTML("You are back in the living room.");
			state.location = "Bedroom";
			document.body.style.backgroundImage = "url('img/bedroom.jpg')";
			break;
		case "coffee":
			// How much coffee can you possibly drink?
			if (state.cupsOfCoffee < 3) {
				var howMuch = "";
				switch (state.cupsOfCoffee) {
				case 0:
					howMuch = "slightly";
					break;
				case 1:
					howMuch = "even more";
					break;
				case 2:
					howMuch = "very";
					document.getElementById("theStory").classList.add("caffeinated");
					break;
				}
				jsToHTML("You feel " + howMuch + " awake.");
			} else if (state.cupsOfCoffee == 3) {
				jsToHTML("You should slow down with the coffee.");
			} else if (state.cupsOfCoffee == 4) {
				jsToHTML("That's it, no more coffee for you!");
				document.getElementById("theStory").classList.add("supercaffeinated");
			} else {
				jsToHTML("Nope.");
			}
			state.cupsOfCoffee += 1;
			break;
		default:
			completeConfusion();
			break;
		}
	}
}

// Prints epilogue and hides the form after leaving the house
function goOutside() {
	const goingForAWAlk = `
What a beautiful day.
Enjoy!`;

	jsToHTML(goingForAWAlk);

	var form = document.getElementById("userForm");
	form.style.display = "none";
	endTheGame();
}

/* 
	Prints prologue to the story and presents player with options
	Called when the window finished loading
*/
function prepareTheGame() {
	// A variable for player's input
	var command;
	// Print the prologue
	wakeUp();
	// Present options based on the location of player
	presentOptions();
}

/*
	Gets an action from player, prints it on the page and calls changeState which prints output based on player's action
	Called on form submit
*/
function madeChoice() {
	command = getCommand();	
	jsToHTML("> " + command);

	// Clears the textbox 
	document.getElementById("userAction").value = "";

	// Print's an output based on player's action and presents options based on location
	changeState(command);
	presentOptions();
	var story = document.getElementById("theStory");
	story.scrollTop = story.scrollHeight;
}

function endTheGame() {
	thankYou = `
Thank you for playing this super simple text adventure!
Would you like to see it implemented in multiple other languages like Go, Python, C and more? Check out <a href="https://github.com/regexowl/exploring-languages" id="myLink">my Language Library repository on GitHub.</a>`;

	jsToHTML(thankYou);
}