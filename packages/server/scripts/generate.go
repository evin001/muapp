package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	cmd := exec.Command("gqlgen", "generate")

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Start()
	if err != nil {
		fmt.Printf("Something went wrong: %s", err.Error())
		return
	}

	fmt.Println("Generation completed successfully!")
}
