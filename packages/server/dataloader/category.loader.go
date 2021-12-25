package dataloader

import (
	"context"
	"strconv"
	"strings"
	"time"

	"muapp.ru/graph/models"
)

func NewCategoryLoader(wait time.Duration, maxBatch int) *models.CategoryLoader {
	return models.NewCategoryLoader(models.CategoryLoaderConfig{
		MaxBatch: maxBatch,
		Wait:     wait,
		Fetch: func(keys []int) ([]*models.Category, []error) {
			var errs []error
			placeholders := make([]string, len(keys))
			args := make([]interface{}, len(keys))

			for i, key := range keys {
				placeholders[i] = "$" + strconv.Itoa(i+1)
				args[i] = key
			}

			query :=
				"SELECT id, name, user_id, parent_id, type FROM categories WHERE id IN (" + strings.Join(placeholders, ",") + ")"
			res, err := db.Query(context.Background(), query, args...)
			if err != nil {
				errs = append(errs, err)
				return nil, errs
			}

			categoryByID := map[int]*models.Category{}

			for res.Next() {
				c := models.Category{}
				err := res.Scan(&c.ID, &c.Name, &c.UserID, &c.ParentID, &c.Type)
				if err != nil {
					errs = append(errs, err)
				}
				categoryByID[c.ID] = &c
			}

			categories := make([]*models.Category, len(keys))
			for i, id := range keys {
				categories[i] = categoryByID[id]
			}

			return categories, errs
		},
	})
}
