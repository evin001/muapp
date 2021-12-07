package call

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

	query := "INSERT INTO call_log (phone_number, code, created_at, active_before, response) VALUES ($1, $2, $3, $4, $5)"
	_, err = db.Exec(context.Background(), query,
		phoneNumber, code, cteatedAt.Format(time.RFC3339), activeBefore.Format(time.RFC3339), "{}")
	if err != nil {
		return false, err
	}

	return true, nil
}

func (s CallService) CheckAvailability(phoneNumber string) (*CallModel, error) {
	model := new(CallModel)

	query := `
		SELECT id, phone_number, code, created_at, active_before, response
		FROM call_log WHERE phone_number = $1
		ORDER BY created_at DESC
	`
	err := db.QueryRow(context.Background(), query, phoneNumber).Scan(
		&model.ID,
		&model.PhoneNumber,
		&model.Code,
		&model.CreatedAt,
		&model.ActiveBefore,
		&model.Response,
	)
	if err != nil {
		return nil, err
	}
	if model.ActiveBefore.After(time.Now()) {
		return model, nil
	}

	return nil, nil
}
