package user

import (
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
)

type UserController struct{}

func (c UserController) CreateUser(email, phone, password string, role models.Role) (*models.User, error) {
	srv := new(UserService)

	exist, err := srv.VerifyExistenceUser(email, phone)
	if err != nil {
		return nil, err
	}
	if exist {
		return nil, errors.UserAlreadyExists
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
		return nil, errors.UserWrongCredentials
	}

	if err := utils.GenTokens(user); err != nil {
		return nil, err
	}

	rtClaims, err := utils.VerifyToken(user.RefreshToken)
	if err != nil {
		return nil, err
	}

	if err := srv.CreateSession(user.ID, user.RefreshToken, rtClaims.ExpiresAt); err != nil {
		return nil, err
	}

	return user, nil
}

func (c UserController) RefreshToken(refreshToken string) (*models.Tokens, error) {
	rtClaims, err := utils.VerifyToken(refreshToken)
	if err != nil {
		return nil, err
	}
	if rtClaims.ExpiresAt < time.Now().Unix() {
		return nil, errors.UserRefreshTokenExpired
	}

	srv := new(UserService)

	exist, err := srv.VerifyExistenceSession(refreshToken)
	if err != nil {
		return nil, err
	}
	if !exist {
		return nil, errors.UserRefreshTokenNotExist
	}

	user := models.User{
		ID:   rtClaims.Id,
		Role: models.Role(rtClaims.Issuer),
	}
	err = utils.GenTokens(&user)
	if err != nil {
		return nil, err
	}

	rtClaimsNew, err := utils.VerifyToken(refreshToken)
	if err != nil {
		return nil, err
	}
	if err := srv.CreateSession(user.ID, user.RefreshToken, rtClaimsNew.ExpiresAt); err != nil {
		return nil, err
	}

	return &models.Tokens{
		AuthToken:    user.AuthToken,
		RefreshToken: user.RefreshToken,
	}, nil
}
