package user

import (
	"context"
	"strconv"

	"github.com/jackc/pgx/v4"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
)

var db = utils.DB

type UserService struct{}

func (s UserService) Create(email, phone, password string, role models.Role) (*models.User, error) {
	var id int = 1

	query := `
		INSERT INTO users (email, phone, password, role, email_verified, phone_verified)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id
	`
	emailVerified, phoneVerified := false, false
	err := db.QueryRow(context.Background(), query, email, phone, password, role, emailVerified, phoneVerified).Scan(&id)
	if err != nil {
		return nil, err
	}

	empty := ""

	return &models.User{
		ID:            strconv.Itoa(id),
		FirstName:     &empty,
		LastName:      &empty,
		Email:         email,
		Phone:         phone,
		EmailVerified: emailVerified,
		PhoneVerified: phoneVerified,
		Role:          role,
		AuthToken:     "",
	}, nil
}

func (s UserService) VerifyExistence(email, phone string) (bool, error) {
	var id *int

	query := "SELECT id FROM users WHERE email = $1 OR phone = $2"
	err := db.QueryRow(context.Background(), query, email, phone).Scan(&id)

	if err == pgx.ErrNoRows {
		return false, nil
	}
	if err != nil {
		return false, err
	}

	return id != nil, nil
}