package event

import (
	"context"
	"fmt"
	"math"
	"time"

	"github.com/jackc/pgx/v4"
	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
	"muapp.ru/internal/utils/jwt"
)

const EVENT_CODE_LENGTH = 12

type EventController struct{}

type eventDateHandler func(time.Time, int) time.Time

func (c EventController) GetEvents(ctx context.Context, userID int, filter models.ScheduleEventsFilter) ([]*models.ScheduleEvent, error) {
	srv := new(EventService)
	if userID != jwt.GetUserID(ctx) {
		return nil, errors.EventNotBelongUser
	}
	return srv.GetEvents(userID, filter)
}

func (c EventController) GetEventByID(ctx context.Context, id int) (*models.ScheduleEvent, error) {
	srv := new(EventService)

	event, err := srv.GetEventByID(id)
	if err != nil {
		return nil, err
	}
	if event.UserID != jwt.GetUserID(ctx) {
		return nil, errors.EventNotBelongUser
	}

	services, err := srv.GetServicesByEvent(id)
	if err != nil {
		return nil, err
	}
	event.Services = services

	return event, nil
}

func (c EventController) CreateEvent(
	ctx context.Context,
	input models.ScheduleEventNew,
) (*models.ScheduleEvent, error) {
	srv := new(EventService)
	userID := jwt.GetUserID(ctx)

	if input.IntervalStart > input.IntervalEnd {
		return nil, errors.EventWrongTimeInterval
	}

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

	createEventsByType := func(envKey string, handler eventDateHandler) error {
		for i := 0; i < utils.GetIntEnv(envKey); i++ {
			e := input
			e.Date = handler(e.Date, i)
			if _, err := srv.CreateEvent(userID, code, e); err != nil {
				return err
			}
		}
		return nil
	}

	switch event.Type {
	case models.ScheduleEventTypeDaily:
		createEventsByType("EVENT_DAILY", func(t time.Time, i int) time.Time {
			return t.AddDate(0, 0, i+1)
		})
	case models.ScheduleEventTypeWeekly:
		createEventsByType("EVENT_WEEKLY", func(t time.Time, i int) time.Time {
			return t.AddDate(0, 0, (i+1)*7)
		})
	case models.ScheduleEventTypeMonthly:
		createEventsByType("EVENT_MONTHLY", func(t time.Time, i int) time.Time {
			tYear, tMonth, _ := t.Date()
			firstOfMonth := time.Date(tYear, tMonth, 1, 0, 0, 0, 0, time.Now().Location())
			nextMonth := firstOfMonth.AddDate(0, i+1, 0)
			lastOfMonth := nextMonth.AddDate(0, 1, -1)

			// Set the first day on the same day of the week next month
			sourceWeekday := int(t.Weekday())
			nextWeekday := int(nextMonth.Weekday())
			if sourceWeekday != nextWeekday {
				var offset int
				if nextWeekday > sourceWeekday {
					offset = 7 - (nextWeekday - sourceWeekday)
				} else {
					offset = sourceWeekday - nextWeekday
				}
				nextMonth = nextMonth.AddDate(0, 0, offset)
			}

			// Set up the same week next month
			week := int(math.Ceil(float64(t.Day())/7.0)) - 1
			isOverflow := lastOfMonth.Day() < nextMonth.Day()+week*7
			if isOverflow {
				week--
			}
			if week > 0 {
				nextMonth = nextMonth.AddDate(0, 0, 7*week)
			}

			return nextMonth
		})
	case models.ScheduleEventTypeWeekday:
		j := 1
		createEventsByType("EVENT_WEEKDAY", func(t time.Time, i int) time.Time {
			date := t.AddDate(0, 0, i+j)
			fmt.Println(i, j, date.Format(time.RFC3339), int(date.Weekday()))
			for int(date.Weekday()) == 0 || int(date.Weekday()) == 6 {
				j++
				date = t.AddDate(0, 0, i+j)
			}
			return date
		})
	}

	return event, err
}

func (c EventController) UpdateEvent(
	ctx context.Context,
	input models.ScheduleEventCurrent,
	filter models.ScheduleEventCurrentFilter,
) (bool, error) {
	if input.IntervalStart > input.IntervalEnd {
		return false, errors.EventWrongTimeInterval
	}

	srv := new(EventService)
	userID := jwt.GetUserID(ctx)

	tx, err := utils.DB.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return false, err
	}
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		} else {
			tx.Commit(ctx)
		}
	}()

	if filter.ID != nil {
		return srv.UpdateEventByID(input, *filter.ID, userID)
	}

	return srv.UpdateManyEvents(input, filter, userID)
}

func (c EventController) DeleteEvent(
	ctx context.Context,
	filter models.ScheduleEventCurrentFilter,
) (bool, error) {
	srv := new(EventService)
	userID := jwt.GetUserID(ctx)

	tx, err := utils.DB.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return false, err
	}
	defer func() {
		if err != nil {
			tx.Rollback(ctx)
		} else {
			tx.Commit(ctx)
		}
	}()

	if filter.ID != nil {
		return srv.DeleteEventByID(*filter.ID, userID)
	}

	return srv.DeleteManyEvents(filter, userID)
}
