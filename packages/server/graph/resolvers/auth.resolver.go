package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"muapp.ru/graph/models"
	"muapp.ru/internal/services/call"
	"muapp.ru/internal/services/user"
)

func (r *mutationResolver) CallPassword(ctx context.Context, phone string) (*models.Call, error) {
	ctrl := new(call.CallController)
	res, err := ctrl.CallPassword(phone)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

func (r *mutationResolver) UserSignUp(ctx context.Context, email string, phone string, password string) (*models.User, error) {
	ctrl := new(user.UserController)
	user, err := ctrl.CreateUser(email, phone, password, models.RoleMaster)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return user, nil
}

func (r *mutationResolver) UserSignIn(ctx context.Context, email string, password string) (*models.User, error) {
	ctrl := new(user.UserController)
	user, err := ctrl.SignIn(email, password)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return user, nil
}

func (r *mutationResolver) UserRefreshToken(ctx context.Context, refreshToken string) (*models.Tokens, error) {
	ctrl := new(user.UserController)
	tokens, err := ctrl.RefreshToken(refreshToken)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return tokens, nil
}

func (r *mutationResolver) UserUpdateProfile(ctx context.Context, firstName *string, lastName *string, email string, phone string) (*models.User, error) {
	ctrl := new(user.UserController)
	res, err := ctrl.UpdateProfile(ctx, firstName, lastName, email, phone)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}
