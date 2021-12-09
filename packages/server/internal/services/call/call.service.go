package call

import (
	"context"
	"strconv"
	"time"

	"muapp.ru/internal/utils"
)

var db = utils.DB

type CallService struct{}

func (s CallService) CreateLog(phone string, code string, response string) error {
	deleySec, err := strconv.Atoi(utils.GetEnv("CALL_DELAY_SEC"))
	if err != nil {
		return err
	}

	cteatedAt := time.Now().Local()
	activeBefore := cteatedAt.Add(time.Second * time.Duration(deleySec))

	query := "INSERT INTO call_log (phone_number, code, created_at, active_before, response) VALUES ($1, $2, $3, $4, $5)"
	_, err = db.Exec(context.Background(), query,
		phone, code, cteatedAt.Format(time.RFC3339), activeBefore.Format(time.RFC3339), response)
	if err != nil {
		return err
	}

	return nil
}

func (s CallService) CheckAvailability(phone string) (*time.Time, error) {
	var beforeTime time.Time

	query := `
		SELECT active_before
		FROM call_log WHERE phone_number = $1
		ORDER BY created_at DESC
	`
	err := db.QueryRow(context.Background(), query, phone).Scan(&beforeTime)
	if err != nil {
		return nil, err
	}
	if beforeTime.After(time.Now()) {
		return &beforeTime, nil
	}

	return nil, nil
}
