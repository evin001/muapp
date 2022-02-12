package user

import (
	"context"
	"strconv"
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/errors"
)

var db = utils.DB

type UserService struct{}

func (s UserService) UpdateProfile(userID int, firstName, lastName *string, email, phone string) error {
	var e, p string
	query := "SELECT email, phone FROM users WHERE id = $1"
	err := db.QueryRow(context.Background(), query, userID).Scan(&e, &p)
	if err != nil {
		return nil
	}

	argsLen := 5
	additional := 0
	if email != e {
		additional++
	}
	if phone != p {
		additional++
	}
	args := make([]interface{}, argsLen+additional)
	args[0] = userID
	args[1] = firstName
	args[2] = lastName
	args[3] = email
	args[4] = phone

	query = "UPDATE users SET firstName = $2, lastName = $3, email = $4, phone = $5"
	if email != e {
		argsLen++
		query = query + ", email_verified = $" + strconv.Itoa(argsLen)
		args[argsLen] = false
	}
	if phone != p {
		argsLen++
		query = query + ", phone_verified = $" + strconv.Itoa(argsLen)
		args[argsLen] = false
	}
	query = query + " WHERE id = $1"

	_, err = db.Exec(context.Background(), query, args...)
	if err != nil {
		return err
	}

	return nil
}

func (s UserService) GetUser(email string) (*models.User, string, error) {
	var u = new(models.User)
	var pwd string
	var id int

	query := `
		SELECT email, phone, role, email_verified, phone_verified, first_name, last_name, password, id
		FROM users
		WHERE email = $1
	`
	err := db.QueryRow(context.Background(), query, email).Scan(&u.Email, &u.Phone, &u.Role,
		&u.EmailVerified, &u.PhoneVerified, &u.FirstName, &u.LastName, &pwd, &id)

	if errors.IsEmptyRows(err) {
		return nil, "", errors.UserNotFound
	}
	if err != nil {
		return nil, "", err
	}

	u.ID = strconv.Itoa(id)

	return u, pwd, nil
}

func (s UserService) CreateUser(email, phone, password string, role models.Role) (*models.User, error) {
	var id int

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

func (s UserService) VerifyExistenceUser(email, phone string) (bool, error) {
	var id *int

	query := "SELECT id FROM users WHERE email = $1 OR phone = $2"
	err := db.QueryRow(context.Background(), query, email, phone).Scan(&id)

	if errors.IsEmptyRows(err) {
		return false, nil
	}
	if err != nil {
		return false, err
	}

	return id != nil, nil
}

func (s UserService) CreateSession(userID, refreshToken string, expires int64) error {
	if err := s.ClearSession(userID); err != nil {
		return err
	}

	expiresStr := time.Unix(expires, 0).Format(time.RFC3339)
	query := "INSERT INTO sessions (user_id, refresh_token, expires_in) VALUES ($1, $2, $3)"
	_, err := db.Exec(context.Background(), query, userID, refreshToken, expiresStr)
	if err != nil {
		return err
	}
	return nil
}

func (s UserService) ClearSession(userID string) error {
	query := "DELETE FROM sessions WHERE user_id = $1"
	_, err := db.Exec(context.Background(), query, userID)
	if err != nil {
		return err
	}
	return nil
}

func (s UserService) VerifyExistenceSession(refreshToken string) (bool, error) {
	var id *int

	query := "SELECT id FROM sessions WHERE refresh_token = $1"
	err := db.QueryRow(context.Background(), query, refreshToken).Scan(&id)

	if errors.IsEmptyRows(err) {
		return false, nil
	}
	if err != nil {
		return false, err
	}

	return id != nil, nil
}
