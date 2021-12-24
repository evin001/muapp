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

	categoryType := models.CategoryTypeFree
	if parentID != nil {
		categoryType = models.CategoryTypeChild
		s.UpdateType(*parentID, models.CategoryTypeParent)
	}

	query := "INSERT INTO categories (name, user_id, parent_id, type) VALUES ($1, $2, $3, $4) RETURNING id"
	err := db.QueryRow(context.Background(), query, name, userID, parentID, categoryType).Scan(&id)
	if err != nil {
		return nil, err
	}

	return &models.Category{
		ID:       id,
		Name:     name,
		ParentID: parentID,
		UserID:   userID,
		Type:     categoryType,
	}, nil
}

func (s CategoryService) UpdateType(id int, categoryType models.CategoryType) error {
	var ct models.CategoryType

	query := "SELECT category_tye FROM categories WHERE id = $1"
	err := db.QueryRow(context.Background(), query, id).Scan(&ct)
	if err != nil {
		return err
	}
	if ct == categoryType {
		return nil
	}

	query = "UPDATE categories SET category_type = $1 WHERE id = $2"
	_, err = db.Exec(context.Background(), query, categoryType, id)
	if err != nil {
		return err
	}
	return nil
}
