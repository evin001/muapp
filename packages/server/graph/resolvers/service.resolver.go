package resolvers

import (
	"context"
	"fmt"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"muapp.ru/graph/models"
	"muapp.ru/internal/services/service"
)

func (r *mutationResolver) ServiceCreate(ctx context.Context, categoryID int, duration int, price int) (*models.Service, error) {
	ctrl := new(service.ServiceController)
	res, err := ctrl.CreateService(ctx, categoryID, duration, price)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

func (r *serviceResolver) Category(ctx context.Context, obj *models.Service) (*models.Category, error) {
	panic(fmt.Errorf("not implemented"))
}
