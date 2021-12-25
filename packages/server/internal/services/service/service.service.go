package service

import (
	"context"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
)

var db = utils.DB

type ServiceService struct{}

func (s ServiceService) UpdateService(serviceID, duration, price int) (bool, error) {
	p := utils.MoneyToDBFormat(price)
	query := "UPDATE services SET duration = $1, price = $2 WHERE id = $3"
	res, err := db.Exec(context.Background(), query, duration, p, serviceID)
	if err != nil {
		return false, err
	}
	return res.RowsAffected() > 0, nil
}

func (s ServiceService) GetByID(id int) (*models.Service, error) {
	ms := new(models.Service)
	query := "SELECT id, duration, price, category_id, user_id FROM services WHERE id = $1"
	err := db.QueryRow(context.Background(), query, id).Scan(&ms.ID, &ms.Duration, &ms.Price, &ms.CategoryID, &ms.UserID)
	if errors.IsEmptyRows(err) {
		return nil, errors.ServiceNotFound
	}
	if err != nil {
		return nil, err
	}
	ms.Price = utils.MoneyFromDB(ms.Price)
	return ms, nil
}

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
