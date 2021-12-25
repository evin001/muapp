package service

import (
	"context"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
)

var db = utils.DB

type ServiceService struct{}

func (s ServiceService) CreateService(categoryID, duration, price, userID int) (*models.Service, error) {
	var id int

	p := utils.MoneyToDBFormat(price)

	query := "INSERT INTO services (duration, price, category_id, user_id) VALUES ($1, $2, $3, $4) RETURNING id"
	err := db.QueryRow(context.Background(), query, duration, p, categoryID, userID).Scan(&id)

	if err != nil {
		return nil, err
	}

	return &models.Service{
		ID:         id,
		Duration:   duration,
		Price:      price,
		CategoryID: categoryID,
		UserID:     userID,
	}, nil
}
