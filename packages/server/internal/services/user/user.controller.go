package user

import (
	"fmt"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
)

type UserController struct{}

func (c UserController) Create(email, phone, password string, role models.Role) (*models.User, error) {
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

	user, err := srv.Create(email, phone, hash, role)
	if err != nil {
		return nil, err
	}

	// TODO Auth token

	return user, nil
}
