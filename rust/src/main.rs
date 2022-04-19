/*
   -------------------------------------------------

   Simple text adventure
   Author: regexowl
   Updated: 19-04-2022

   -------------------------------------------------

   A simple text adventure written in Rust
   Check https://github.com/regexowl/exploring-languages to see the same adventure in multiple other languages

*/

use std::io::stdin;
use chrono::prelude::*;

// A structure for storing the location and caffeination of the player
struct State {
	location: String,
	cups_of_coffee: i32,
	checked_laptop: bool,
}

// Scans keyboard input to the 'command' variable and converts it to lowercase to eliminiate case sensitivity
fn get_command() -> String {
	let mut action = String::new();
	stdin().read_line(&mut action)
		.ok()
		.expect("Failed to read");
	action = action.trim().to_string();
	action
}

// Prints options based on the location of the player
fn present_options(state: &State) {
	if state.location == "bedroom" {
		in_the_bedroom();
	} else if state.location == "kitchen" {
		in_the_kitchen(&state);
	} else {
		println!("You've got lost in space and time.");
	}
}

// Returns what hour of the day is it right now
fn whats_the_time() -> u32 {
	let dt = Local::now();
	dt.hour()
}

// Prints the prologue of the story
fn wake_up() {
	println!("You wake up with a headache. Sun is pouring through a dirty window.");
	println!("");
	println!("You look around the room and see your laptop, an alarm clock and a door to the kitchen.");
	println!("");
	println!("What would you like to do?");
}

// Prints options when the player is in the bedroom
fn in_the_bedroom() {
	println!("");
	println!(" Type TIME to check time");
	println!(" Type LAPTOP to check your e-mails");
	println!(" Type KITCHEN to go to the kitchen");
	println!(" Type LEAVE to go outside");
	println!("");
}

// Prints options when the player is in the kitchen
fn in_the_kitchen(state: &State) {
	println!("");
	if state.cups_of_coffee <= 4 {
		println!("Type COFFEE to boost your energy");
	}
	println!("Type BACK to go to the living room");
	println!("");
}

// Prints a message when the player chooses non-existent option
fn complete_confusion() {
	println!("You are confused by your own actions.");
}

// Prints a result of player's action and changes state
fn change_state(command: &str, state: &mut State) {
	if state.location == "bedroom" {
		match command {
			"time"=> {
				println!("It is {} o'clock right now.", whats_the_time());
			}
			"kitchen"=> {
				println!("You are now standing next to your beloved coffee machine.");
				state.location = "kitchen".to_string();
			}
			"laptop"=> {
				if state.cups_of_coffee > 0 {
					println!("Huh, it's your time off today!");
					state.checked_laptop = true;
				} else {
					println!("You don't feel like checking your e-mails right now. Maybe you should drink some coffee first.");
				}
			}
			"leave"=> {
				if state.checked_laptop == true {
					println!("You feel sudden urge to go for a walk.");
					state.location = String::from("outside");
				} else {
					println!("You should check your e-mails first. Just to be sure.");
				}
			}
			_=> {
				complete_confusion();
			}
		}
	} else if state.location == "kitchen" {
		match command {
			"back"=> {
				println!("You are back in the living room.");
				state.location = String::from("bedroom");
			}
			"coffee"=> {
				// How much coffee can you possibly drink?
				if state.cups_of_coffee < 3 {
					let mut how_much = String::new();
					if state.cups_of_coffee == 0 {
						how_much = String::from("slightly")
					} else if state.cups_of_coffee == 1 {
						how_much = String::from("even more")
					} else if state.cups_of_coffee == 2 {
						how_much = String::from("very")
					}
					println!("You feel {} awake.", how_much);
				} else if state.cups_of_coffee == 3 {
					println!("You should slow down with the coffee.")
				} else if state.cups_of_coffee == 4 {
					println!("That's it, no more coffee for you!")
				} else {
					println!("Nope.")
				}
				state.cups_of_coffee += 1
			}
			"leave"=> {
				if state.checked_laptop == true {
					state.location = String::from("outside");
				} else {
					println!("You should check your e-mails first. Just to be sure.")
				}
			}
			_=> {
				complete_confusion()
			}
		}
	}
}

// Prints after leaving home
fn go_outside() {
	println!("");
	println!("What a beautiful day.");
	println!("Enjoy!");
	println!("");
	std::process::exit(0);
}

// MAIN
fn main() {

	// Innitialise state
	let mut state = State {
		location: ("bedroom").to_string(),
		cups_of_coffee: 0,
		checked_laptop: false,
	};

	// Print the prologue
	wake_up();

	// Loop through these three until the player chooses to leave:
	while {
		// 1) look at state and present options based on it
		present_options(&state);
		// 2) read player's command
		let command = get_command();
		// 3) change state based on command or print an error
		change_state(&command, &mut state);

		state.location != "outside"
	} {}

	// Print after leaving home
	go_outside();
}
