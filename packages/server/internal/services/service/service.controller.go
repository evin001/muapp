package service

import (
	"context"

	"muapp.ru/graph/models"
	"muapp.ru/internal/services/category"
	"muapp.ru/internal/utils/jwt"
)

type ServiceController struct{}

func (c ServiceController) CreateService(ctx context.Context, categoryID, duration, price int) (*models.Service, error) {
	srv := new(ServiceService)
	res, err := srv.CreateService(categoryID, duration, price, jwt.GetUserID(ctx))
	if err != nil {
		return nil, err
	}

	catSrv := new(category.CategoryService)
	err = catSrv.UpdateType(categoryID, models.CategoryTypeChild)
	if err != nil {
		return nil, err
	}

	return res, nil
}
