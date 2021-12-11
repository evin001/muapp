package utils

import (
	"context"
	"fmt"
	"os"
	"strconv"

	"github.com/jackc/pgx/v4/pgxpool"
)

var DB *pgxpool.Pool

const MAX_CONNS = 5

func init() {
	conn := fmt.Sprintf("user=%s password=%s port=%s host=%s dbname=%s sslmode=disable",
		GetEnv("DB_USER"), GetEnv("DB_PASSWORD"), GetEnv("DB_PORT"), GetEnv("DB_HOST"), GetEnv("DB_NAME"))
	config, err := pgxpool.ParseConfig(conn)
	if err != nil {
		fmt.Fprintln(os.Stderr, "Can't parse config:", err)
		os.Exit(1)
	}

	config.MaxConns = MAX_CONNS

	useLog, _ := strconv.ParseBool(GetEnv("USE_LOG"))
	if useLog {
		l, err := NewLogger()
		if err != nil {
			fmt.Errorf(err.Error())
		}
		config.ConnConfig.Logger = l
	}

	DB, err = pgxpool.ConnectConfig(context.Background(), config)
	if err != nil {
		fmt.Fprintln(os.Stderr, "Unable to connect to database:", err)
		os.Exit(1)
	}
}
