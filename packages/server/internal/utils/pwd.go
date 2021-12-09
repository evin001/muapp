package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(pwd string) (string, error) {
	cost := bcrypt.DefaultCost + bcrypt.MinCost
	hash, err := bcrypt.GenerateFromPassword([]byte(pwd), cost)
	return string(hash), err
}

func CheckPasswordHash(pwd, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(pwd))
	return err == nil
}
