#!/usr/bin/ruby
=begin
   -------------------------------------------------

   Simple text adventure
   Author: regexowl
   Updated: 23-02-2022

   -------------------------------------------------

   A simple text adventure converted from Go source code to Ruby

=end

# A structure for storing the location and caffeination of the player
State = Struct.new('State', :location, :cupsOfCoffee, :checkedLaptop)

# Scans keyboard input to the 'command' variable and converts it to lowercase to eliminiate case sensitivity
def getCommand()
	action = gets
	action = action.downcase
	return action.strip
end

# Prints options based on the location of the player
def presentOptions(state) 
	if state.location == "Bedroom"  
		inTheBedroom()
	elsif state.location == "Kitchen"  
		inTheKitchen(state)
	else 
		puts "You've got lost in space and time."
	end
end

# Returns what hour of the day is it right now
def whatsTheTime() 
	currentTime = Time.new
	return currentTime.hour
end

# Prints the prologue of the story
def wakeUp() 
	puts "You wake up with a headache. Sun is pouring through a dirty window."
	puts ""
	puts "You look around the room and see your laptop, an alarm clock and a door to the kitchen."
	puts ""
	puts "What would you like to do?"
end

# Prints options when the player is in the bedroom
def inTheBedroom() 
	puts ""
	puts " Type TIME to check time"
	puts " Type LAPTOP to check your e-mails"
	puts " Type KITCHEN to go to the kitchen"
	puts " Type LEAVE to go outside"
	puts ""
end

# Prints options when the player is in the kitchen
def inTheKitchen(state) 
	puts ""
	if state.cupsOfCoffee <= 4
		puts "Type COFFEE to boost your energy"
	end
	puts "Type BACK to go to the living room"
	puts ""
end

# Prints a message when the player chooses non-existent option
def completeConfusion() 
	puts "You are confused by your own actions."
end

# Prints a result of player's action and changes state
def changeState(command, state)
	if state.location == "Bedroom"  
		case command
		when "time"
			puts "It is #{whatsTheTime()} o'clock right now."
		when "kitchen"
			puts "You are now standing next to your beloved coffee machine."
			state.location = "Kitchen" 
		when "laptop"
			if state.cupsOfCoffee > 0 
				puts "Huh, it's your time off today!"
				state.checkedLaptop = true
			else 
				puts "You don't feel like checking your e-mails right now. Maybe you should drink some coffee first."
			end
		when "leave"
			if state.checkedLaptop == true 
				puts "You feel sudden urge to go for a walk."
				state.location = "Outside" 
			else 
				puts "You should check your e-mails first. Just to be sure."
			end
		else
			completeConfusion()
		end
	elsif state.location == "Kitchen"  
		case command 
			when "back"
				puts "You are back in the living room."
				state.location = "Bedroom" 
			when "coffee"
				# How much coffee can you possibly drink?
				if state.cupsOfCoffee < 3 
					case state.cupsOfCoffee 
						when 0
							howMuch = "slightly"
						when 1
							howMuch = "even more"
						when 2
							howMuch = "very"
					end
					puts "You feel #{howMuch} awake."
				elsif state.cupsOfCoffee == 3 
					puts "You should slow down with the coffee."
				elsif state.cupsOfCoffee == 4 
					puts "That's it, no more coffee for you!"
				else 
					puts "Nope."
				end
				state.cupsOfCoffee += 1
			when "leave"
				if state.checkedLaptop == true 
					state.location = "Outside" 
				else
					puts "You should check your e-mails first. Just to be sure."
				end
		else
			completeConfusion()
		end
	end
end

# Prints after leaving home
def goOutside() 
	puts ""
	puts "What a beautiful day."
	puts "Enjoy!"
	puts ""
	exit
end

# MAIN
# Innitialise state
state = State.new("Bedroom", 0, false)

# Print the prologue
wakeUp()

# Loop through these three until the player chooses to leave:
while (state.location != "Outside") 
	# 1) look at state and present options based on it
	presentOptions(state)
	# 2) read player's command
	command = getCommand()
	# 3) change state based on command or print an error
	changeState(command, state)
end

# Print after leaving home
goOutside()
