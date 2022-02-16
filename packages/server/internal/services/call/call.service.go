package call

import (
	"context"
	"time"

	"muapp.ru/internal/utils"
)

var db = utils.DB

type CallService struct{}

func (s CallService) CreateLog(userID int, phone string, code string, response string) error {
	deleySec := utils.GetIntEnv("CALL_DELAY_SEC")

	cteatedAt := time.Now().Local()
	activeBefore := cteatedAt.Add(time.Second * time.Duration(deleySec))

	query := `
		INSERT INTO call_log (phone, code, created_at, active_before, response, user_id)
		VALUES ($1, $2, $3, $4, $5, $6)
	`
	_, err := db.Exec(context.Background(), query,
		phone, code, cteatedAt.Format(time.RFC3339), activeBefore.Format(time.RFC3339), response, userID)
	if err != nil {
		return err
	}

	return nil
}

func (s CallService) CheckAvailability(phone string) (*time.Time, error) {
	var beforeTime time.Time

	query := `
		SELECT active_before
		FROM call_log WHERE phone = $1
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
