package resolvers

import (
	"context"
	"fmt"

	"muapp.ru/graph/models"
)

func (r *mutationResolver) ServiceCreate(ctx context.Context, categoryID int, duration int, price int) (*models.Service, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *serviceResolver) Category(ctx context.Context, obj *models.Service) (*models.Category, error) {
	panic(fmt.Errorf("not implemented"))
}
