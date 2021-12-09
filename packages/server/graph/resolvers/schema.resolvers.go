package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"muapp.ru/graph/generated"
	"muapp.ru/graph/models"
)

func (r *mutationResolver) CallPassword(ctx context.Context, phone string) (*models.Call, error) {
	ctrl := new(call.CallController)
	res, err := ctrl.CallPassword(phone)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
