package middlewares

import (
	"context"
	"net/http"

	"muapp.ru/internal/utils"
)

func AuthHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader != "" {
			tokenString := authHeader[len("Bearer "):]
			if tokenString == "" {
				next.ServeHTTP(w, r)
			} else {
				var ctx context.Context
				if token, err := utils.VerifyToken(tokenString); err != nil {
					ctx = context.WithValue(r.Context(), "token-error", err)
				} else {
					ctx = context.WithValue(r.Context(), "token", token)
				}
				next.ServeHTTP(w, r.WithContext(ctx))
			}
		} else {
			next.ServeHTTP(w, r)
		}
	})
}
