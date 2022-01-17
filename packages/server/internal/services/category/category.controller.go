package category

import (
	"context"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils/jwt"
)

type CategoryController struct{}

func (c CategoryController) GetByID(id int) (*models.Category, error) {
	srv := new(CategoryService)
	return srv.GetByID(id)
}

func (c CategoryController) GetAll() ([]*models.Category, error) {
	srv := new(CategoryService)
	categories, err := srv.GetAll()
	if err != nil {
		return nil, err
	}
	return categories, nil
}

func (c CategoryController) CreateCategory(ctx context.Context, name string, parentID *int) (*models.Category, error) {
	srv := new(CategoryService)

	category, err := srv.CreateCategory(name, jwt.GetUserID(ctx), parentID)
	if err != nil {
		return nil, err
	}

	return category, nil
}
