package directives

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"github.com/go-playground/validator/v10"
)

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func Binding(ctx context.Context, obj interface{}, next graphql.Resolver, constraint string) (res interface{}, err error) {
	val, err := next(ctx)
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	err = validate.Var(val, constraint)
	if err != nil {
		return nil, fmt.Errorf(err.Error())
	}

	return val, nil
}
