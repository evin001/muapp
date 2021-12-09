package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"muapp.ru/graph/generated"
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
	user, err := ctrl.Create(email, phone, password, models.RoleMaster)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return user, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
