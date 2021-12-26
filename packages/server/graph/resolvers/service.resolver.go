package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"muapp.ru/dataloader"
	"muapp.ru/graph/models"
	"muapp.ru/internal/services/service"
)

func (r *queryResolver) Services(ctx context.Context, userID int) ([]*models.Service, error) {
	ctrl := new(service.ServiceController)
	res, err := ctrl.GetAllUserServices(userID)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

func (r *mutationResolver) ServiceUpdate(ctx context.Context, serviceID int, duration int, price int) (*models.Service, error) {
	ctrl := new(service.ServiceController)
	res, err := ctrl.UpdateService(ctx, serviceID, duration, price)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

func (r *queryResolver) Service(ctx context.Context, id int) (*models.Service, error) {
	ctrl := new(service.ServiceController)
	res, err := ctrl.GetByID(id)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

func (r *mutationResolver) ServiceCreate(ctx context.Context, categoryID int, duration int, price int) (*models.Service, error) {
	ctrl := new(service.ServiceController)
	res, err := ctrl.CreateService(ctx, categoryID, duration, price)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

func (r *serviceResolver) Category(ctx context.Context, obj *models.Service) (*models.Category, error) {
	return dataloader.For(ctx).Categories.Load(obj.CategoryID)
}
