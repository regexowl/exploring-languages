# About Go
Also sometimes referred to as Golang. Go is an open source programming language syntactically similar to C. The language was developed with an aim to *"eliminate the slowness and clumsiness of software development at Google, and thereby to make the process more productive and scalable"*.

## Projects
- text_adventure.go - simple text adventure that goes through a short story based on the user's input

## Compiling and running
- `go build code.go` compiles the code 
- `go run code.go` executes the code without creating the executable file
- `package main` declaration indicated creation of an executable file, file with this declaration also runs the main fuction automatically

#### Hello World
``` go
package main

import "fmt"

func main() {
   fmt.Println("Hello World!")
}
```
