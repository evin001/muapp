package main

import (
	"log"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"muapp.ru/graph"
	"muapp.ru/graph/generated"
	"muapp.ru/internal/pkg"
	"muapp.ru/internal/pkg/directives"
)

func main() {
	port := pkg.GetEnv("SERVER_PORT")

	cfg := generated.Config{Resolvers: &graph.Resolver{}}
	cfg.Directives.Binding = directives.Binding

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(cfg))

	http.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
	http.Handle("/graphql", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
