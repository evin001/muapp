package utils

import (
	"fmt"
	"strconv"

	"github.com/golang-jwt/jwt"

	"muapp.ru/graph/models"
)

type CustomClaims struct {
	ID   int
	Role models.Role
	jwt.StandardClaims
}

func GenToken(user *models.User) (string, error) {
	id, err := strconv.Atoi(user.ID)
	if err != nil {
		return "", err
	}
	exp, err := strconv.ParseInt(GetEnv("JWT_EXPIRES"), 10, 64)
	if err != nil {
		return "", nil
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, CustomClaims{
		id,
		user.Role,
		jwt.StandardClaims{
			ExpiresAt: exp,
		},
	})

	return token.SignedString([]byte(GetEnv("JWT_SECRET")))
}

func VerifyToken(tokenString string) (*CustomClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(GetEnv("JWT_SECRET")), nil
	})

	if claims, ok := token.Claims.(CustomClaims); ok && token.Valid {
		return &claims, nil
	}

	return nil, err
}
