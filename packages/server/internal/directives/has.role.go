package directives

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"github.com/golang-jwt/jwt"

	"muapp.ru/graph/models"
	"muapp.ru/internal/middlewares"
	"muapp.ru/internal/utils/errors"
)

func HasRole(ctx context.Context, obj interface{}, next graphql.Resolver, role []*models.Role) (res interface{}, err error) {
	if err := ctx.Value(middlewares.CtxTokenErrorKey); err != nil {
		return nil, fmt.Errorf("%s", err)
	}

	if role != nil {
		access := false
		token := ctx.Value(middlewares.CtxTokenKey).(*jwt.StandardClaims)
		for _, r := range role {
			if !access && r.String() == token.Issuer {
				access = true
			}
		}
		if !access {
			return nil, errors.UserAccessDenied
		}
	}

	return next(ctx)
}
