package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"muapp.ru/graph/generated"
	"muapp.ru/internal/pkg/call"
)

func (r *mutationResolver) CallPassword(ctx context.Context, number string) (*bool, error) {
	res, err := call.MakeCall(number, call.GenerateCode())
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	response := true
	if res.Result == "error" {
		response = false
	}
	return &response, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
