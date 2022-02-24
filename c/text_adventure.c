/*
   -------------------------------------------------

   Simple text adventure
   Author: regexowl
   Updated: 23-02-2022

   -------------------------------------------------

   A simple text adventure converted from Go source code to C programming language

*/

#include<stdio.h>
#include<stdlib.h>
#include<ctype.h>
#include<stdbool.h>
#include<time.h>
#include<string.h>

// Enumeration of locations for the State structure
enum locations{Bedroom, Kitchen, Outside}; 

// A structure for storing the location and caffeination of the player
typedef struct State {
	int location;
	int cupsOfCoffee;
	bool checkedLaptop;
} State;

// Function prototypes
void wakeUp();
void inTheBedroom();
void inTheKitchen(struct State state);

// Prints options based on the location of the player
void presentOptions(struct State state) {
	if (state.location == Bedroom) {
		inTheBedroom();
	} else if (state.location == Kitchen) {
		inTheKitchen(state);
	} else {
		printf("You've got lost in space and time.\n");
	}
}

// Returns what hour of the day is it right now
int whatsTheTime() {
	time_t now = time(NULL);
	struct tm *tm_struct = localtime(&now);
	int hour = tm_struct->tm_hour;
	return hour;
}

// Prints the prologue of the story
void wakeUp() {
	printf("You wake up with a headache. Sun is pouring through a dirty window.\n");
	printf("\n");
	printf("You look around the room and see your laptop, an alarm clock and a door to the kitchen.\n");
	printf("\n");
	printf("What would you like to do?\n");
}

// Prints options when the player is in the bedroom
void inTheBedroom() {
	printf("\n");
	printf(" Type TIME to check time\n");
	printf(" Type LAPTOP to check your e-mails\n");
	printf(" Type KITCHEN to go to the kitchen\n");
	printf(" Type LEAVE to go outside\n");
	printf("\n");
}

// Prints options when the player is in the kitchen
void inTheKitchen(struct State state) {
	printf("\n");
	if (state.cupsOfCoffee <= 4) {
		printf("Type COFFEE to boost your energy\n");
	}
	printf("Type BACK to go to the living room\n");
	printf("\n");
}

// Prints a message when the player chooses non-existent option
void completeConfusion() {
	printf("You are confused by your own actions.\n");
}

// Prints a result of player's action and changes state
void changeState(char * command, struct State *state) {
	if (state->location == Bedroom) {
		if (strcmp(command, "time") == 0) {
			printf("It is %d o'clock right now.\n", whatsTheTime());
		} else if (strcmp(command, "kitchen") == 0) {
			printf("You are now standing next to your beloved coffee machine.\n");
			state->location = Kitchen;
		} else if (strcmp(command, "laptop") == 0) {
			if (state->cupsOfCoffee > 0) {
				printf("Huh, it's your time off today!\n");
				state->checkedLaptop = true;
			} else {
				printf("You don't feel like checking your e-mails right now. Maybe you should drink some coffee first.\n");
			}
		} else if (strcmp(command, "leave") == 0) {
			if (state->checkedLaptop == true) {
				printf("You feel sudden urge to go for a walk.\n");
				state->location = Outside;
			} else {
				printf("You should check your e-mails first. Just to be sure.\n");
			}
		} else {
			completeConfusion();
		}
	} else if (state->location == Kitchen) {
		if (strcmp(command, "back") == 0) {
			printf("You are back in the living room.\n");
			state->location = Bedroom;
		} else if (strcmp(command, "coffee") == 0) {
			// How much coffee can you possibly drink?
			if (state->cupsOfCoffee < 3) {
				if (state->cupsOfCoffee == 0) {
					printf("You feel slightly awake.\n");
				} else if (state->cupsOfCoffee == 1) {
					printf("You feel even more awake.\n");
				} else if (state->cupsOfCoffee == 2) {
					printf("You feel very awake.\n");
				}
			} else if (state->cupsOfCoffee == 3) {
				printf("You should slow down with the coffee.\n");
			} else if (state->cupsOfCoffee == 4) {
				printf("That's it, no more coffee for you!\n");
			} else {
				printf("Nope.\n");
			}
			state->cupsOfCoffee += 1;
		} else if (strcmp(command, "leave") == 0) {
			if (state->checkedLaptop == true) {
				state->location = Outside;
			} else {
				printf("You should check your e-mails first. Just to be sure.\n");
			}
		} else {
			completeConfusion();
		}
	}
}

// Prints after leaving home
void goOutside() {
	printf("\n");
	printf("What a beautiful day.\n");
	printf("Enjoy!\n");
	printf("\n");
	exit(0);
}

// MAIN
int main() {

	// Innitialise state
	State state = {.location = Bedroom, .cupsOfCoffee = 0, .checkedLaptop = false};
	char command[15];

	// Print the prologue
	wakeUp();

	// Loop through these three until the player chooses to leave:
	do {
		// 1) look at state and present options based on it
		presentOptions(state);
		// 2) read player's command and convert it to lowercase
		scanf("%s", command);
		for (int i = 0; i < strlen(command); i++) {
			command[i] = tolower(command[i]);
		}
		// 3) change state based on command or print an error
		changeState(command, &state);
	} while (state.location != Outside);

	// Print after leaving home
	goOutside();
}
