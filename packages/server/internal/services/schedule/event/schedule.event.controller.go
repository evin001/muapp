package event

import (
	"context"

	"github.com/jackc/pgx/v4"
	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/jwt"
)

const EVENT_CODE_LENGTH = 12

type EventController struct{}

func (c EventController) CreateEvent(ctx context.Context, input models.ScheduleEventInput) (*models.ScheduleEvent, error) {
	srv := new(EventService)
	userID := jwt.GetUserID(ctx)

	tx, err := utils.DB.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return nil, err
	}
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		} else {
			tx.Commit(ctx)
		}
	}()

	code := utils.RandStringBytesMaskImprSrcUnsafe(EVENT_CODE_LENGTH)
	event, err := srv.CreateEvent(userID, code, input)
	if err != nil {
		return nil, err
	}

	switch event.Type {
	case models.ScheduleEventTypeDaily:
		for i := 0; i < utils.GetIntEnv("EVENT_DAILY"); i++ {
			e := input
			e.Date = e.Date.AddDate(0, 0, i+1)
			if _, err := srv.CreateEvent(userID, code, e); err != nil {
				return nil, err
			}
		}
	case models.ScheduleEventTypeWeekly:
	case models.ScheduleEventTypeMonthly:
	case models.ScheduleEventTypeWeekday:
	}

	return event, err
}

func (c EventController) UpdateEvent() {}
