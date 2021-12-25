package service

import (
	"muapp.ru/graph/models"
)

type ServiceController struct{}

func (c ServiceController) CreateService(categoryID, duration, price int) (*models.Service, error) {
	// srv := new(ServiceService)
	// srv.CreateService()
	return nil, nil
}
