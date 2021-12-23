package category

import (
	"context"
	"strconv"

	"github.com/golang-jwt/jwt"
	"muapp.ru/graph/models"
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

	token := ctx.Value("token").(*jwt.StandardClaims)
	userID, _ := strconv.Atoi(token.Id)

	category, err := srv.CreateCategory(name, userID, parentID)
	if err != nil {
		return nil, err
	}

	return category, nil
}
