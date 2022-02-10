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
	"time"
)

// A variable for temporary storing of an action taken by the player
var action string

// Variables for keeping an inventory of the player
var glass bool

// Returns what hour of the day is it right now
func whatsTheTime() int {
	return time.Now().Hour()
}

// Prints prologue of the 'story'
func startYourDay() {
	fmt.Println("You wake up with a headache. Sun is pouring through dirty window.")
	fmt.Println("")
	fmt.Println("You look around the room and see an empty glass, kitchen sink and an alarm clock.")
	fmt.Println("")
	fmt.Println("What would you like to do?")
	fmt.Println(" Type TIME to check time")
	fmt.Println(" Type GLASS to pick up the glass")
	fmt.Println(" Type WATER to go to the sink")
	fmt.Println("")

	// Scans keyboard input to the 'action' variable
	fmt.Scan(&action)
}

// Prints a result of player's action
func makeChoices() {
	switch action {
	case "TIME":
		fmt.Println("It is", whatsTheTime(), "o'clock right now.")
	case "GLASS":
		fmt.Println("You are now holding an empty glass.")
		glass = true
	case "WATER":
		fmt.Println("You are now standing next to the sink.")
	default:
		fmt.Println("You are confused by your own actions.")
	}
}

// Prints epilogue to the 'story'
func goToSleep() {
	fmt.Println("Your head still hurts, you're going back to sleep.")
	fmt.Println("Good night...")
	fmt.Println("")
	fmt.Println("*       *     *       *")
	fmt.Println("   *        *    *     ")
	fmt.Println(" *      *    * *       ")
	fmt.Println("*   *             *   *")
}

// MAIN
func main() {
	startYourDay()
	makeChoices()
	goToSleep()
}
