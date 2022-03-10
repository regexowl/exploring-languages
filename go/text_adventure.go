/*
   -------------------------------------------------

   Simple text adventure
   Author: regexowl
   Updated: 22-02-2022

   -------------------------------------------------

   A simple text adventure written in Go
   Check https://github.com/regexowl/exploring-languages to see the same adventure in multiple other languages

*/

package main

import (
	"fmt"
	"os"
	"strings"
	"time"
)

// Enumeration of locations for the State structure
const (
	Bedroom int = iota
	Kitchen
	Outside
)

// A structure for storing the location and caffeination of the player
type State struct {
	location      int
	cupsOfCoffee  int
	checkedLaptop bool
}

// Scans keyboard input to the 'command' variable and converts it to lowercase to eliminiate case sensitivity
func getCommand() string {
	var action string
	fmt.Scan(&action)
	action = strings.ToLower(action)

	return action
}

// Prints options based on the location of the player
func presentOptions(state *State) {
	if state.location == Bedroom {
		inTheBedroom()
	} else if state.location == Kitchen {
		inTheKitchen(state)
	} else {
		fmt.Println("You've got lost in space and time.")
	}
}

// Returns what hour of the day is it right now
func whatsTheTime() int {
	return time.Now().Hour()
}

// Prints the prologue of the story
func wakeUp() {
	fmt.Println("You wake up with a headache. Sun is pouring through a dirty window.")
	fmt.Println("")
	fmt.Println("You look around the room and see your laptop, an alarm clock and a door to the kitchen.")
	fmt.Println("")
	fmt.Println("What would you like to do?")
}

// Prints options when the player is in the bedroom
func inTheBedroom() {
	fmt.Println("")
	fmt.Println(" Type TIME to check time")
	fmt.Println(" Type LAPTOP to check your e-mails")
	fmt.Println(" Type KITCHEN to go to the kitchen")
	fmt.Println(" Type LEAVE to go outside")
	fmt.Println("")
}

// Prints options when the player is in the kitchen
func inTheKitchen(state *State) {
	fmt.Println("")
	if state.cupsOfCoffee <= 4 {
		fmt.Println("Type COFFEE to boost your energy")
	}
	fmt.Println("Type BACK to go to the living room")
	fmt.Println("")
}

// Prints a message when the player chooses non-existent option
func completeConfusion() {
	fmt.Println("You are confused by your own actions.")
}

// Prints a result of player's action and changes state
func changeState(command string, state *State) {
	if state.location == Bedroom {
		switch command {
		case "time":
			fmt.Println("It is", whatsTheTime(), "o'clock right now.")
		case "kitchen":
			fmt.Println("You are now standing next to your beloved coffee machine.")
			state.location = Kitchen
		case "laptop":
			if state.cupsOfCoffee > 0 {
				fmt.Println("Huh, it's your time off today!")
				state.checkedLaptop = true
			} else {
				fmt.Println("You don't feel like checking your e-mails right now. Maybe you should drink some coffee first.")
			}
		case "leave":
			if state.checkedLaptop == true {
				fmt.Println("You feel sudden urge to go for a walk.")
				state.location = Outside
			} else {
				fmt.Println("You should check your e-mails first. Just to be sure.")
			}
		default:
			completeConfusion()
		}
	} else if state.location == Kitchen {
		switch command {
		case "back":
			fmt.Println("You are back in the living room.")
			state.location = Bedroom
		case "coffee":
			// How much coffee can you possibly drink?
			if state.cupsOfCoffee < 3 {
				var howMuch string
				switch state.cupsOfCoffee {
				case 0:
					howMuch = "slightly"
				case 1:
					howMuch = "even more"
				case 2:
					howMuch = "very"
				}
				fmt.Println("You feel", howMuch, "awake.")
			} else if state.cupsOfCoffee == 3 {
				fmt.Println("You should slow down with the coffee.")
			} else if state.cupsOfCoffee == 4 {
				fmt.Println("That's it, no more coffee for you!")
			} else {
				fmt.Println("Nope.")
			}
			state.cupsOfCoffee += 1
		case "leave":
			if state.checkedLaptop == true {
				state.location = Outside
			} else {
				fmt.Println("You should check your e-mails first. Just to be sure.")
			}
		default:
			completeConfusion()
		}
	}
}

// Prints after leaving home
func goOutside() {
	fmt.Println("")
	fmt.Println("What a beautiful day.")
	fmt.Println("Enjoy!")
	fmt.Println("")
	os.Exit(0)
}

// MAIN
func main() {

	// Innitialise state
	state := State{}
	state.location = Bedroom
	var command string

	// Print the prologue
	wakeUp()

	// Loop through these three until the player chooses to leave:
	for ok := true; ok; ok = (state.location != Outside) {
		// 1) look at state and present options based on it
		presentOptions(&state)
		// 2) read player's command
		command = getCommand()
		// 3) change state based on command or print an error
		changeState(command, &state)
	}

	// Print after leaving home
	goOutside()
}
