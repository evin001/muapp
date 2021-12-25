package errors

import (
	"errors"

	"github.com/jackc/pgx/v4"
)

var (
	UserNotFound             = GenError("User not found")
	UserWrongCredentials     = GenError("Wrong password please try again")
	UserAlreadyExists        = GenError("A user with this email address or phone number already exists")
	UserAccessDenied         = GenError("Access denied")
	UserRefreshTokenExpired  = GenError("Refresh token is expired")
	UserRefreshTokenNotExist = GenError("Refresh token does not exist")
	UserTokenWrong           = GenError("That's not even a token")
	UserTokenExpired         = GenError("Token is expired")
	UserTokenHandler         = GenError("Couldn't handle this token")

	CallWrong = GenError("Can't make call")
)

func GenError(err string) error {
	return errors.New(err)
}

func IsEmptyRows(err error) bool {
	return err == pgx.ErrNoRows
}