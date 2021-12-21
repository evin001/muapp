package category

import (
	"context"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
)

var db = utils.DB

type CategoryService struct{}

func (s CategoryService) CreateCategory(name string, userID int, parentID *int) (*models.Category, error) {
	var id int

	query := "INSERT INTO (name, user_id, parent_id) VALUES ($1, $2, $3) RETURNING id"
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
