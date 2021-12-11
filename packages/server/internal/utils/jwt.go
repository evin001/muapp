package utils

import (
	"fmt"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"

	"muapp.ru/graph/models"
)

const (
	AccsessTokenKey = "JWT_ACCESS_TOKEN"
	RefreshTokenKey = "JWT_REFRESH_TOKEN"
)

func GenToken(user *models.User, tokenKey string) (string, error) {
	exp, err := strconv.ParseInt(GetEnv(tokenKey), 10, 64)
	if err != nil {
		return "", nil
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Id:        user.ID,
		ExpiresAt: time.Now().Add(time.Minute * time.Duration(exp)).Unix(),
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

	if claims, ok := token.Claims.(*jwt.StandardClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, err
}
