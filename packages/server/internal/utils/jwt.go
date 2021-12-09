package utils

import (
	"fmt"
	"strconv"

	"github.com/golang-jwt/jwt"

	"muapp.ru/graph/models"
)

func GenToken(user *models.User) (string, error) {
	exp, err := strconv.ParseInt(GetEnv("JWT_EXPIRES"), 10, 64)
	if err != nil {
		return "", nil
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Id:        user.ID,
		ExpiresAt: exp,
		Issuer:    string(user.Role),
	})

	key := []byte(GetEnv("JWT_SECRET"))
	return token.SignedString(key)
}

func VerifyToken(tokenString string) (*jwt.StandardClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(GetEnv("JWT_SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.StandardClaims); ok && token.Valid {
		return &claims, nil
	}

	return nil, err
}
