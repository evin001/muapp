package event

import (
	"context"
	"strconv"
	"strings"
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
)

var db = utils.DB

type EventService struct{}

func (s EventService) GetEventByID(id int) (*models.ScheduleEvent, error) {
	e := new(models.ScheduleEvent)
	query := `
		SELECT id, user_id, color, code, type, date, interval_start, interval_end
		FROM schedule_events
		WHERE id = $1
	`

	var intervalStart, intervalEnd time.Time
	err := db.QueryRow(context.Background(), query, id).Scan(&e.ID, &e.UserID, &e.Color, &e.Code, &e.Type, &e.Date,
		&intervalStart, &intervalEnd)

	if errors.IsEmptyRows(err) {
		return nil, errors.EventNotFound
	}
	if err != nil {
		return nil, err
	}

	e.IntervalStart = intervalStart.Format("15:04")
	e.IntervalEnd = intervalEnd.Format("15:04")

	return e, nil
}

func (s EventService) GetServicesByEvent(eventID int) ([]*int, error) {
	query := "SELECT service_id FROM schedule_events_services WHERE schedule_id = $1"
	row, err := db.Query(context.Background(), query, eventID)
	if err != nil {
		return nil, err
	}

	var services []*int

	for row.Next() {
		var id int
		err := row.Scan(&id)
		if err != nil {
			return nil, err
		}
		services = append(services, &id)
	}

	return services, nil
}

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
