package main

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"

	"muapp.ru/graph/generated"
	"muapp.ru/graph/resolvers"
	"muapp.ru/internal/directives"
	"muapp.ru/internal/utils"
)

func main() {
	port := utils.GetEnv("SERVER_PORT")

	cfg := generated.Config{Resolvers: &resolvers.Resolver{}}
	cfg.Directives.Binding = directives.Binding

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(cfg))

	http.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
	http.Handle("/graphql", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
