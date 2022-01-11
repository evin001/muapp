package event

import (
	"context"
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils/jwt"
)

type EventController struct{}

func (c EventController) CreateEvent(ctx context.Context, input models.ScheduleEventInput) (*models.ScheduleEvent, error) {
	srv := new(EventService)
	userID := jwt.GetUserID(ctx)
	event, err := srv.CreateEvent(userID, input)
	return event, err
}

func (c EventController) UpdateEvent() {}
