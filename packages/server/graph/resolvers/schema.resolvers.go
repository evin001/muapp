package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"muapp.ru/graph/generated"
	"muapp.ru/internal/services"
	"muapp.ru/internal/utils/call"
)

func (r *mutationResolver) CallPassword(ctx context.Context, phoneNumber string) (bool, error) {
	CallSrv := new(services.CallService)
	code := call.GenerateCode()
	_, err := CallSrv.CreateLog(phoneNumber, code)

	res, err := call.MakeCall(phoneNumber, call.GenerateCode())
	if err != nil {
		return false, gqlerror.Errorf(err.Error())
	}

	if res.Result == "error" {
		return false, nil
	}
	return true, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
