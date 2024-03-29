package main

import (
	"log"
	"net/http"
	"strings"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"

	"muapp.ru/dataloader"
	"muapp.ru/graph/generated"
	"muapp.ru/graph/resolvers"
	"muapp.ru/internal/directives"
	"muapp.ru/internal/middlewares"
	"muapp.ru/internal/utils"
)

func main() {
	port := utils.GetEnv("SERVER_PORT")
	limit := utils.GetIntEnv("COMPLEXITY_LIMIT")

	cfg := generated.Config{Resolvers: &resolvers.Resolver{}}

	cfg.Directives.Binding = directives.Binding
	cfg.Directives.HasRole = directives.HasRole

	c := cors.New(cors.Options{
		AllowedMethods:   []string{"POST"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowedOrigins:   strings.Split(utils.GetEnv("HOST"), " "),
		AllowCredentials: true,
		Debug:            false,
	})

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(cfg))
	srv.Use(extension.FixedComplexityLimit(limit))

	router := http.NewServeMux()

	router.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
	router.Handle("/graphql", middlewares.AuthHandler(c.Handler(srv)))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, dataloader.Middleware(router)))
}
