package dataloader

import (
	"context"
	"fmt"
	"strings"
	"time"

	"muapp.ru/graph/models"
)

func NewCategoryLoader(wait time.Duration, maxBatch int) *models.CategoryLoader {
	return models.NewCategoryLoader(models.CategoryLoaderConfig{
		MaxBatch: maxBatch,
		Wait:     wait,
		Fetch: func(keys []int) ([]*models.Category, []error) {
			fmt.Printf("%v", keys)

			placeholders := make([]string, len(keys))
			args := make([]interface{}, len(keys))

			for i := 0; i < len(keys); i++ {
				placeholders[i] = "?"
				args[i] = i
			}
			fmt.Printf("\n p: %v, a: %v", placeholders, args)
			query :=
				"SELECT id, name, user_id, parent_id, type FROM categories WHERE id IN (" + strings.Join(placeholders, ",") + ")"
			res, _ := db.Query(context.Background(), query, args...)

			categoryByID := map[int]*models.Category{}

			for res.Next() {
				c := models.Category{}
				err := res.Scan(&c.ID, &c.Name, &c.UserID, &c.ParentID, &c.Type)
				if err != nil {
					panic(err)
				}
				categoryByID[c.ID] = &c
			}

			categories := make([]*models.Category, len(keys))
			for i, id := range keys {
				categories[i] = categoryByID[id]
			}

			return categories, nil
		},
	})
}
