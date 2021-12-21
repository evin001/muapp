package directives

import (
	"context"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
	"github.com/golang-jwt/jwt"

	"muapp.ru/graph/models"
)

func HasRole(ctx context.Context, obj interface{}, next graphql.Resolver, role []*models.Role) (res interface{}, err error) {
	if err := ctx.Value("token-error"); err != nil {
		return nil, fmt.Errorf("%s", err)
	}

	if role != nil {
		access := false
		token := ctx.Value("token").(*jwt.StandardClaims)
		for _, r := range role {
			if !access && r.String() == token.Issuer {
				access = true
			}
		}
		if !access {
			return nil, fmt.Errorf("Access denied")
		}
	}

	return next(ctx)
}
