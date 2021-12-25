package category

import (
	"context"
	"strconv"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils/jwt"
)

type CategoryController struct{}

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

	token := jwt.CtxToken(ctx)
	userID, _ := strconv.Atoi(token.Id)

	category, err := srv.CreateCategory(name, userID, parentID)
	if err != nil {
		return nil, err
	}

	return category, nil
}
