package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"muapp.ru/graph/generated"
	"muapp.ru/internal/pkg"
)

func (r *mutationResolver) CallPassword(ctx context.Context, phone string) (*bool, error) {
	res, err := pkg.MakeCall(phone, pkg.GenerateCode())
	if err != nil {
		return nil, err
	}
	fmt.Printf("%+v", res)
	return nil, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
