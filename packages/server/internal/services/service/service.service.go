package service

import (
	"context"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
)

var db = utils.DB

type ServiceService struct{}

func (s ServiceService) CreateService(duration, price, categoryID, userID int) (*models.Service, error) {
	var id int
	query := "INSERT INTO services (duration, price, category_id, user_id) VALUES ($1, $2, $3, $4) RETURNING id"
	err := db.QueryRow(context.Background(), query, duration, utils.MoneyToDBFormat(price), categoryID, userID).Scan(&id)
	if err != nil {
		return nil, err
	}
	return nil, nil
}
