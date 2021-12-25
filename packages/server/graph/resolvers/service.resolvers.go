package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"muapp.ru/graph/models"
)

func (r *mutationResolver) ServiceCreate(ctx context.Context, categoryID int, userID int, duration int, price int) (*models.Service, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *serviceResolver) Category(ctx context.Context, obj *models.Service) (*models.Category, error) {
	panic(fmt.Errorf("not implemented"))
}
