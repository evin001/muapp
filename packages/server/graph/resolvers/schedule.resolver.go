package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"muapp.ru/graph/models"
	"muapp.ru/internal/services/schedule/event"
)

func (r *queryResolver) ScheduleEvents(ctx context.Context, userID int, filter models.ScheduleEventsFilter) ([]*models.ScheduleEvent, error) {
	ctrl := new(event.EventController)
	res, err := ctrl.GetEvents(userID, filter)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

func (r *queryResolver) ScheduleEvent(ctx context.Context, id int) (*models.ScheduleEvent, error) {
	ctrl := new(event.EventController)
	res, err := ctrl.GetEventByID(ctx, id)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

func (r *mutationResolver) ScheduleEventCreate(ctx context.Context, input models.ScheduleEventNew) (*models.ScheduleEvent, error) {
	ctrl := new(event.EventController)
	res, err := ctrl.CreateEvent(ctx, input)
	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}
	return res, nil
}

func (r *mutationResolver) ScheduleEventUpdate(
	ctx context.Context,
	input models.ScheduleEventCurrent,
	filter models.ScheduleEventCurrentFilter,
) (bool, error) {
	ctrl := new(event.EventController)
	res, err := ctrl.UpdateEvent(ctx, input, filter)
	if err != nil {
		return false, gqlerror.Errorf(err.Error())
	}
	return res, nil
}
