package service

import (
	"context"

	"github.com/jackc/pgx/v4"
	"muapp.ru/graph/models"
	"muapp.ru/internal/services/category"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
	"muapp.ru/internal/utils/jwt"
)

type ServiceController struct{}

func (c ServiceController) GetByID(id int) (*models.Service, error) {
	srv := new(ServiceService)
	return srv.GetByID(id)
}

func (c ServiceController) GetAllUserServices(userID int) ([]*models.Service, error) {
	srv := new(ServiceService)
	return srv.GetAllUserServices(userID)
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

func (c ServiceController) DeleteService(ctx context.Context, serviceID int) (bool, error) {
	srv := new(ServiceService)

	s, err := srv.GetByID(serviceID)
	if err != nil {
		return false, err
	}
	userID := jwt.GetUserID(ctx)
	if s.UserID != userID {
		return false, errors.ServiceNotBelongUser
	}

	contCategories, err := srv.CountCategory(s.CategoryID)
	if err != nil {
		return false, err
	}

	tx, err := utils.DB.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return false, err
	}

	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		} else {
			tx.Commit(ctx)
		}
	}()

	res, err := srv.DeleteService(serviceID)
	if contCategories == 1 {
		// Reset category type
		catSrv := new(category.CategoryService)
		err = catSrv.UpdateType(s.CategoryID, models.CategoryTypeFree)
	}

	return res, err
}
