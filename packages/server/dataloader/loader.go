package dataloader

import (
	"context"
	"net/http"
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
)

const loadersKey = "dataloaders"

var db = utils.DB

type Loaders struct {
	Categories *models.CategoryLoader
}

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ldrs := Loaders{}

		maxBatch := 100
		wait := 250 * time.Microsecond

		ldrs.Categories = NewCategoryLoader(wait, maxBatch)

		dlCtx := context.WithValue(r.Context(), loadersKey, ldrs)
		next.ServeHTTP(w, r.WithContext(dlCtx))
	})
}

func For(ctx context.Context) Loaders {
	return ctx.Value(loadersKey).(Loaders)
}
