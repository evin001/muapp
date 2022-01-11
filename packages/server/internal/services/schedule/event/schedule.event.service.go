package event

import (
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
)

var db = utils.DB

type EventService struct{}

func (s EventService) CreateEvent(userID int, input models.ScheduleEventInput) (*models.ScheduleEvent, error) {
	query := "INSERT INTO"
}

func (s EventService) UpdateEvent() {}
