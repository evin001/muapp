package event

import (
	"context"
	"strconv"
	"strings"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
)

var db = utils.DB

type EventService struct{}

func (s EventService) CreateEvent(userID int, code string, input models.ScheduleEventInput) (*models.ScheduleEvent, error) {
	var id int
	query := `
		INSERT INTO schedule_events (date, interval_start, interval_end, type, color, user_id, code)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id
	`
	err := db.QueryRow(context.Background(),
		query, input.Date, input.IntervalStart, input.IntervalEnd, input.Type, input.Color, userID, code).Scan(&id)
	if err != nil {
		return nil, err
	}

	if err = s.AssignEventWithServices(id, input.Services); err != nil {
		return nil, err
	}

	return &models.ScheduleEvent{
		ID:            id,
		Date:          input.Date,
		IntervalStart: input.IntervalStart,
		IntervalEnd:   input.IntervalEnd,
		Type:          input.Type,
		Color:         input.Color,
		UserID:        userID,
		Code:          code,
	}, nil
}

func (s EventService) AssignEventWithServices(eventID int, services []*int) error {
	if len(services) == 0 {
		return nil
	}

	placeholders := make([]string, len(services))
	args := make([]interface{}, len(services)*2)
	for i, serviceID := range services {
		key := i * 2
		placeholders[i] = "($" + strconv.Itoa(key+1) + ", $" + strconv.Itoa(key+2) + ")"
		args[key] = eventID
		args[key+1] = *serviceID
	}

	query := "INSERT INTO schedule_events_services (schedule_id, service_id) VALUES " + strings.Join(placeholders, ",")
	res, err := db.Exec(context.Background(), query, args...)
	if err != nil {
		return err
	}
	if res.RowsAffected() != int64(len(services)) {
		return errors.EventNotCreated
	}
	return nil
}

func (s EventService) UpdateEvent() {}
