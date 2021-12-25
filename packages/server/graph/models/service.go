package models

type Service struct {
	ID         int `json:"id"`
	Duration   int `json:"duration"`
	Price      int `json:"price"`
	CategoryID int `json:"category"`
	UserID     int `json:"userId"`
}
