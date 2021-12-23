package category

import (
	"context"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
)

var db = utils.DB

type CategoryService struct{}

func (s CategoryService) GetAll() ([]*models.Category, error) {
	query := "SELECT id, name, parent_id, user_id FROM categories ORDER BY name"
	row, err := db.Query(context.Background(), query)
	if err != nil {
		return nil, err
	}

	categories := []*models.Category{}

	for row.Next() {
		c := models.Category{}
		err := row.Scan(&c.ID, &c.Name, &c.ParentID, &c.UserID)
		if err != nil {
			return nil, err
		}
		categories = append(categories, &c)
	}

	return categories, nil
}

func (s CategoryService) CreateCategory(name string, userID int, parentID *int) (*models.Category, error) {
	var id int

	query := "INSERT INTO categories (name, user_id, parent_id) VALUES ($1, $2, $3) RETURNING id"
	err := db.QueryRow(context.Background(), query, name, userID, parentID).Scan(&id)
	if err != nil {
		return nil, err
	}

	return &models.Category{
		ID:       id,
		Name:     name,
		ParentID: parentID,
		UserID:   userID,
	}, nil
}
