package service

import (
	"context"

	"muapp.ru/graph/models"
	"muapp.ru/internal/services/category"
	"muapp.ru/internal/utils/errors"
	"muapp.ru/internal/utils/jwt"
)

type ServiceController struct{}

func (c ServiceController) GetAllUserServices(userID int) ([]*models.Service, error) {
	srv := new(ServiceService)
	return srv.GetAllUserServices(userID)
}

func (c ServiceController) UpdateService(ctx context.Context, serviceID, duration, price int) (*models.Service, error) {
	srv := new(ServiceService)

	s, err := srv.GetByID(serviceID)
	if err != nil {
		return nil, err
	}

	userID := jwt.GetUserID(ctx)
	if s.UserID != userID {
		return nil, errors.ServiceNotBelongUser
	}

	_, err = srv.UpdateService(serviceID, duration, price)
	if err != nil {
		return nil, err
	}

	s.Price = price
	s.Duration = duration

	return s, nil
}

func (c ServiceController) GetByID(id int) (*models.Service, error) {
	srv := new(ServiceService)
	return srv.GetByID(id)
}

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
