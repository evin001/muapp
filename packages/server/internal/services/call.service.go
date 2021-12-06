package services

import (
	"context"
	"strconv"
	"time"

	"muapp.ru/internal/utils"
)

var db = utils.DB

type CallService struct{}

func (s CallService) CreateLog(phoneNumber string, code string) (bool, error) {
	deleySec, err := strconv.Atoi(utils.GetEnv("CALL_DELAY_SEC"))
	if err != nil {
		return false, err
	}

	cteatedAt := time.Now().Local()
	activeBefore := cteatedAt.Add(time.Second * time.Duration(deleySec))

	_, err = db.Exec(
		context.Background(),
		"INSERT INTO call_log (phone_number, code, created_at, active_before, response) VALUES ($1, $2, $3, $4, $5)",
		phoneNumber, code, cteatedAt.Format(time.RFC3339), activeBefore.Format(time.RFC3339), "{}",
	)
	if err != nil {
		return false, err
	}

	return true, nil
}
