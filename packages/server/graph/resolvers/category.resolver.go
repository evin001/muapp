package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"muapp.ru/graph/models"
	"muapp.ru/internal/services/category"
)

func (r *mutationResolver) CategoryCreate(ctx context.Context, name string, parentID *int) (*models.Category, error) {
	ctrl := new(category.CategoryController)
	res, err := ctrl.CreateCategory(ctx, name, parentID)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}
