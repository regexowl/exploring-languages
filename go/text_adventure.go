/*
   -------------------------------------------------

   Simple text adventure
   Author: regexowl
   Date: 10-02-2022

   -------------------------------------------------

   My first project written in Go

*/

package main

import (
	"fmt"
	"os"
	"strings"
	"time"
)

// A variable for temporary storing of an action taken by the player
var action string

// Variables for keeping an inventory of the player
var cup bool
var coffee bool
var kitchen bool

// Scans keyboard input to the 'action' variable and converts it to uppercase to eliminiate case sensitivity
func getAction() string {
	fmt.Scan(&action)
	action = strings.ToUpper(action)
	return action
}

// Returns what hour of the day is it right now
func whatsTheTime() int {
	return time.Now().Hour()
}

// Prints prologue of the 'story'
func wakeUp() {
	fmt.Println("You wake up with a headache. Sun is pouring through dirty window.")
	fmt.Println("")
	fmt.Println("You look around the room and see your laptop, kitchen and an alarm clock.")
}

// Prints options when the player is in the living room
func inTheLivingRoom() {
	fmt.Println("")
	fmt.Println(" Type TIME to check time")
	fmt.Println(" Type LAPTOP to check your e-mails")
	fmt.Println(" Type KITCHEN to go to the kitchen")
	fmt.Println(" Type SLEEP to go back to sleep")
	fmt.Println("")

	makeChoices(getAction())
}

// Prints options when the player is in the kitchen
func inTheKitchen() {
	fmt.Println("")
	fmt.Println("Type COFFEE for boosting your energy")
	fmt.Println("Type BACK to go to the living room")
	fmt.Println("")

	makeChoices(getAction())
}

// Prints a result of player's action and asks for another action
func makeChoices(action string) {
	switch {
	case action == "BEGIN":
		fmt.Println("What would you like to do?")
	case action == "TIME":
		fmt.Println("It is", whatsTheTime(), "o'clock right now.")
	case action == "LAPTOP" && coffee == true:
		fmt.Println("You have 316 unread messages.")
	case action == "LAPTOP" && coffee == false:
		fmt.Println("You are barely awake.")
	case action == "KITCHEN":
		fmt.Println("You are now standing next to your beloved coffee machine.")
		kitchen = true
		inTheKitchen()
	case action == "COFFEE" && kitchen == true && coffee == false:
		fmt.Println("You feel a slightly more awake.")
		coffee = true
	case action == "COFFEE" && kitchen == true && coffee == true:
		fmt.Println("You've already had a cup.")
	case action == "BACK":
		fmt.Println("You are back in the living room.")
		kitchen = false
	default:
		fmt.Println("You are confused by your own actions.")
	}

	// Until the player chooses to sleep, the scene and makeChoices repeat
	if kitchen == true && action != "SLEEP" {
		inTheKitchen()
	} else if kitchen == false && action != "SLEEP" {
		inTheLivingRoom()
	} else if action == "SLEEP" {
		goToSleep()
	}
}

// Prints epilogue to the 'story'
func goToSleep() {
	fmt.Println("")
	fmt.Println("Your head still hurts, you're going back to sleep.")
	fmt.Println("Good night...")
	fmt.Println("")
	fmt.Println("*       *     *       *")
	fmt.Println("   *        *    *     ")
	fmt.Println(" *      *    * *       ")
	fmt.Println("*   *             *   *")
	os.Exit(0)
}

// MAIN
func main() {
	wakeUp()
	makeChoices("BEGIN")
}
