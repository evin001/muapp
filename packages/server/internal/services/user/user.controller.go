package user

import (
	"context"
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
	"muapp.ru/internal/utils/jwt"
)

type UserController struct{}

func (c UserController) UpdateProfile(
	ctx context.Context,
	firstName, lastName *string,
	email, phone string,
) (*models.User, error) {
	srv := new(UserService)
	userID := jwt.GetUserID(ctx)
	err := srv.UpdateProfile(userID, firstName, lastName, email, phone)
	if err != nil {
		return nil, err
	}
	u, _, err := srv.GetUser(email)
	return u, err
}

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

	err = jwt.GenTokens(user)
	if err != nil {
		return nil, err
	}

	rtClaims, err := jwt.VerifyToken(user.RefreshToken)
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

	if err := jwt.GenTokens(user); err != nil {
		return nil, err
	}

	rtClaims, err := jwt.VerifyToken(user.RefreshToken)
	if err != nil {
		return nil, err
	}

	if err := srv.CreateSession(user.ID, user.RefreshToken, rtClaims.ExpiresAt); err != nil {
		return nil, err
	}

	return user, nil
}

func (c UserController) RefreshToken(refreshToken string) (*models.Tokens, error) {
	rtClaims, err := jwt.VerifyToken(refreshToken)
	if err == errors.UserTokenExpired {
		return nil, errors.UserRefreshTokenExpired
	}
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
	err = jwt.GenTokens(&user)
	if err != nil {
		return nil, err
	}

	rtClaimsNew, err := jwt.VerifyToken(refreshToken)
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
