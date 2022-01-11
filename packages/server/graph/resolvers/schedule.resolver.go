package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"muapp.ru/graph/models"
	"muapp.ru/internal/services/schedule/event"
)

func (r *mutationResolver) ScheduleEventCreate(ctx context.Context, input models.ScheduleEventInput) (*models.ScheduleEvent, error) {
	ctrl := new(event.EventController)
	res, err := ctrl.CreateEvent(ctx, input)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}
