package jwt

import (
	"context"
	"fmt"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
)

const (
	AccsessTokenKey = "JWT_ACCESS_TOKEN"
	RefreshTokenKey = "JWT_REFRESH_TOKEN"
)

func GenToken(user *models.User, tokenKey string) (string, error) {
	exp, err := strconv.ParseInt(utils.GetEnv(tokenKey), 10, 64)
	if err != nil {
		return "", nil
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Id:        user.ID,
		ExpiresAt: time.Now().Add(time.Minute * time.Duration(exp)).Unix(),
		Issuer:    string(user.Role),
	})

	key := []byte(utils.GetEnv("JWT_SECRET"))
	return token.SignedString(key)
}

func VerifyToken(tokenString string) (*jwt.StandardClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(utils.GetEnv("JWT_SECRET")), nil
	})

	if token.Valid {
		if claims, ok := token.Claims.(*jwt.StandardClaims); ok && token.Valid {
			return claims, nil
		}
	} else if ve, ok := err.(*jwt.ValidationError); ok {
		if ve.Errors&jwt.ValidationErrorMalformed != 0 {
			return nil, errors.UserTokenWrong
		} else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
			return nil, errors.UserTokenExpired
		}
	}

	return nil, errors.UserTokenHandler
}

func GenTokens(user *models.User) error {
	accessToken, err := GenToken(user, AccsessTokenKey)
	if err != nil {
		return err
	}

	refreshToken, err := GenToken(user, RefreshTokenKey)
	if err != nil {
		return err
	}

	user.AuthToken = accessToken
	user.RefreshToken = refreshToken

	return nil
}

func CtxToken(ctx context.Context) *jwt.StandardClaims {
	return ctx.Value("token").(*jwt.StandardClaims)
}

func GetUserID(ctx context.Context) int {
	token := CtxToken(ctx)
	userID, _ := strconv.Atoi(token.Id)
	return userID
}
