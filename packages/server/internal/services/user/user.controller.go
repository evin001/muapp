package user

import (
	"fmt"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
)

type UserController struct{}

func (c UserController) CreateUser(email, phone, password string, role models.Role) (*models.User, error) {
	srv := new(UserService)

	exist, err := srv.VerifyExistence(email, phone)
	if err != nil {
		return nil, err
	}
	if exist {
		return nil, fmt.Errorf("A user with this email address or phone number already exists")
	}

	hash, err := utils.HashPassword(password)
	if err != nil {
		return nil, err
	}

	user, err := srv.CreateUser(email, phone, hash, role)
	if err != nil {
		return nil, err
	}

	err = utils.GenTokens(user)
	if err != nil {
		return nil, err
	}

	rtClaims, err := utils.VerifyToken(user.RefreshToken)
	if err != nil {
		return nil, err
	}

	err = srv.CreateSession(user.ID, user.RefreshToken, rtClaims.ExpiresAt)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (c UserController) SignIn(email, password string) (*models.User, error) {
	srv := new(UserService)

	user, hash, err := srv.GetUser(email)
	if err != nil {
		return nil, err
	}

	if ok := utils.CheckPasswordHash(password, hash); !ok {
		return nil, fmt.Errorf("Wrong password please try again")
	}

	err = utils.GenTokens(user)
	if err != nil {
		return nil, err
	}

	rtClaims, err := utils.VerifyToken(user.RefreshToken)
	if err != nil {
		return nil, err
	}

	err = srv.CreateSession(user.ID, user.RefreshToken, rtClaims.ExpiresAt)
	if err != nil {
		return nil, err
	}

	return user, nil
}
