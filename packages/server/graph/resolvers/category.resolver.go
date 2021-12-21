package resolvers

import (
	"context"
	"fmt"

	"muapp.ru/graph/models"
)

func (r *mutationResolver) CategoryCreate(ctx context.Context, name string, parentID *int) (*models.Category, error) {
	panic(fmt.Errorf("not implemented"))
}
