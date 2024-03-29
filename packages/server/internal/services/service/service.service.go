package service

import (
	"context"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
)

var db = utils.DB

type ServiceService struct{}

func (s ServiceService) GetAllUserServices(userID int) ([]*models.Service, error) {
	query := `		
		SELECT s.id, s.duration, s.price, s.category_id, s.user_id
		FROM services s 
			INNER JOIN categories c ON s.category_id = c.id 
		WHERE s.user_id = $1
		ORDER BY c.parent_id DESC, c.name
	`
	rows, err := db.Query(context.Background(), query, userID)
	if err != nil {
		return nil, err
	}

	services := []*models.Service{}

	for rows.Next() {
		s := models.Service{}
		err := rows.Scan(&s.ID, &s.Duration, &s.Price, &s.CategoryID, &s.UserID)
		if err != nil {
			return nil, err
		}
		s.Price = utils.MoneyFromDB(s.Price)
		services = append(services, &s)
	}

	return services, nil
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

func (s ServiceService) CountCategory(categoryID int) (int, error) {
	var countCategories int
	query := "SELECT COUNT(*) FROM services WHERE category_id = $1"
	err := db.QueryRow(context.Background(), query, categoryID).Scan(&countCategories)
	if err != nil {
		return 0, err
	}
	return countCategories, nil
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

func (s ServiceService) UpdateService(serviceID, duration, price int) (bool, error) {
	p := utils.MoneyToDBFormat(price)
	query := "UPDATE services SET duration = $1, price = $2 WHERE id = $3"
	res, err := db.Exec(context.Background(), query, duration, p, serviceID)
	if err != nil {
		return false, err
	}
	return res.RowsAffected() > 0, nil
}

func (s ServiceService) DeleteService(serviceID int) (bool, error) {
	query := "DELETE FROM services WHERE id = $1"
	res, err := db.Exec(context.Background(), query, serviceID)
	if err != nil {
		return false, err
	}
	return res.RowsAffected() > 0, nil
}
