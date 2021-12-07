package call

import "time"

type CallModel struct {
	ID           int
	PhoneNumber  string
	Code         string
	CreatedAt    time.Time
	ActiveBefore time.Time
	Response     string
}
