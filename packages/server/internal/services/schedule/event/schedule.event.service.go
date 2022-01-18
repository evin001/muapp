package event

import (
	"context"
	"fmt"
	"reflect"
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

func (s EventService) CreateEvent(userID int, code string, input models.ScheduleEventNew) (*models.ScheduleEvent, error) {
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

func (s EventService) UpdateEventByID(input models.ScheduleEventCurrent, eventID, userID int) (bool, error) {
	query := `
		UPDATE schedule_event
		SET interval_start = $3, interval_end = $4, color = $5
		WHERE id = $1 AND user_id = $2
	`
	res, err := db.Exec(context.Background(), query, eventID, userID,
		input.IntervalStart, input.IntervalEnd, input.Color)
	if errors.IsEmptyRows(err) {
		return false, errors.EventUserNotFound
	}
	if err != nil {
		return false, err
	}

	if err = s.DeleteEventServices(eventID); err != nil {
		return false, err
	}

	if input.Services != nil {
		err = s.AssignEventWithServices(eventID, input.Services)
		if err != nil {
			return false, err
		}
	}

	return res.RowsAffected() > 0, err
}

func (s EventService) DeleteEventServices(eventID int) error {
	query := "DELETE FROM schedule_events_services WHERE schedule_id = $1"
	_, err := db.Exec(context.Background(), query, eventID)
	if err != nil && !errors.IsEmptyRows(err) {
		return err
	}
	return nil
}

func (s EventService) UpdateManyEvents(
	input models.ScheduleEventCurrent,
	filter models.ScheduleEventCurrentFilter,
	userID int,
) (bool, error) {
	query := "SELECT id FROM WHERE user_id = $1 AND code = $2 AND date >= $3"
	row, err := db.Query(context.Background(), query, userID, filter.Code, filter.FromDate)
	if errors.IsEmptyRows(err) {
		return false, errors.EventUserNotFound
	}
	if err != nil {
		return false, err
	}

	var events []int

	for row.Next() {
		var eventID int
		err := row.Scan(&eventID)
		if err != nil {
			return false, err
		}
		events = append(events, eventID)
	}

	const countInputKeys = 3
	fmt.Println("Count fields:", reflect.TypeOf(models.ScheduleEventCurrent{}).NumField())
	placeholders := make([]string, len(events))
	args := make([]interface{}, len(events)+countInputKeys)

	args[0] = input.IntervalStart
	args[1] = input.IntervalEnd
	args[2] = input.Color

	for i, eventID := range events {
		key := i + countInputKeys + 1
		placeholders[i] = "($" + strconv.Itoa(key) + ", $1, $2, $3)"
		args[key-1] = eventID
	}

	query = `
		UPDATE schedule_event AS e
		SET			
		 	interval_start = ev.interval_start,
		  interval_end = ev.interval_end,
			color = ev.color
		FROM (VALUES` + strings.Join(placeholders, ",") +
		`) AS ev(id, data, interval_start, interval_end, color)
		WHERE ev.id = e.id
	`
	res, err := db.Exec(context.Background(), query, args...)
	if err != nil {
		return false, nil
	}

	if err = s.DeleteManyEventServices(events); err != nil {
		return false, nil
	}

	// TODO Update services

	return int(res.RowsAffected()) == len(events), nil
}

func (s EventService) DeleteManyEventServices(events []int) error {
	placeholders := make([]string, len(events))
	args := make([]interface{}, len(events))

	for i, eventID := range events {
		placeholders[i] = "$" + strconv.Itoa(i+1)
		args[i] = eventID
	}

	query := "DELETE FROM schedule_events_services WHERE schedule_id IN (" + strings.Join(placeholders, ",") + ")"
	_, err := db.Exec(context.Background(), query, args...)
	if err != nil && !errors.IsEmptyRows(err) {
		return err
	}

	return nil
}
