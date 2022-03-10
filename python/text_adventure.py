'''
   -------------------------------------------------

   Simple text adventure
   Author: regexowl
   Updated: 23-02-2022

   -------------------------------------------------

   A simple text adventure written in Python
   Check https://github.com/regexowl/exploring-languages to see the same adventure in multiple other language

'''

import enum
from datetime import datetime

# Enumeration of locations for the State structure
class Locations(enum.Enum): 
	Bedroom = 0
	Kitchen = 1
	Outside = 2

# Scans keyboard input to the 'command' variable and converts it to lowercase to eliminiate case sensitivity
def getCommand():
	action = input().lower()
	return action

def whatsTheTime():
	timeNow = datetime.now()
	return timeNow.hour

# Prints options based on the location of the player
def presentOptions(state):
	if state["location"] == "Bedroom":
		inTheBedroom()
	elif state["location"] == "Kitchen":
		inTheKitchen(state)
	else:
		print("You've got lost in space and time.")

# Prints the prologue of the story
def wakeUp():
	print("You wake up with a headache. Sun is pouring through a dirty window.")
	print("")
	print("You look around the room and see your laptop, an alarm clock and a door to the kitchen.")
	print("")
	print("What would you like to do?")

# Prints options when the player is in the bedroom
def inTheBedroom():
	print("")
	print(" Type TIME to check time")
	print(" Type LAPTOP to check your e-mails")
	print(" Type KITCHEN to go to the kitchen")
	print(" Type LEAVE to go outside")
	print("")

# Prints options when the player is in the kitchen
def inTheKitchen(state):
	print("")
	if state["cupsOfCoffee"] <= 4:
		print("Type COFFEE to boost your energy")
	print("Type BACK to go to the living room")
	print("")

# Prints a message when the player chooses non-existent option
def completeConfusion():
	print("You are confused by your own actions.")

# Prints a result of player's action and changes state
def changeState(command, state):
	if state["location"] == "Bedroom":
		if command == "time":
			print("It is {} o'clock right now.".format(whatsTheTime()))
		elif command == "kitchen":
			print("You are now standing next to your beloved coffee machine.")
			state["location"] = "Kitchen"
		elif command == "laptop":
			if state["cupsOfCoffee"] > 0:
				print("Huh, it's your time off today!")
				state["checkedLaptop"] = True
			else:
				print("You don't feel like checking your e-mails right now. Maybe you should drink some coffee first.")
		elif command == "leave":
			if state["checkedLaptop"] == True:
				print("You feel sudden urge to go for a walk.")
				state["location"] = "Outside"
			else:
				print("You should check your e-mails first. Just to be sure.")
		else:
			completeConfusion()
	elif state["location"] == "Kitchen":
		if command == "back":
			print("You are back in the living room.")
			state["location"] = "Bedroom"
		elif command == "coffee":
			# How much coffee can you possibly drink?
			if state["cupsOfCoffee"] < 3:
				if state["cupsOfCoffee"] == 0:
					howMuch = "slightly"
				elif state["cupsOfCoffee"] == 1:
					howMuch = "even more"
				elif state["cupsOfCoffee"] == 2:
					howMuch = "very"
				print("You feel", howMuch, "awake.")
			elif state["cupsOfCoffee"] == 3:
				print("You should slow down with the coffee.")
			elif state["cupsOfCoffee"] == 4:
				print("That's it, no more coffee for you!")
			else:
				print("Nope.")
			state["cupsOfCoffee"] += 1
		elif command == "leave":
			if state["checkedLaptop"] == True:
				state["location"] = "Outside"
			else:
				print("You should check your e-mails first. Just to be sure.")
		else:
			completeConfusion()

# Prints after leaving home
def goOutside():
	print("")
	print("What a beautiful day.")
	print("Enjoy!")
	print("")
	quit()

# MAIN
def main():

	# Innitialise 'state' dictionary
	state = {"location": "Bedroom", "cupsOfCoffee": 0, "checkedLaptop": False}

	# Print the prologue
	wakeUp()

	# Loop through these three until the player chooses to leave:
	while (state["location"] != "Outside"):
		# 1) look at state and present options based on it
		presentOptions(state)
		# 2) read player's command
		command = getCommand()
		# 3) change state based on command or print an error
		changeState(command, state)

	# Print after leaving home
	goOutside()

if __name__ == "__main__":
	main()