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
	UserPasswordMismatch     = GenError("Password mismatch")

	CallWrong = GenError("Can't make call")

	ServiceNotFound      = GenError("Service not found")
	ServiceNotBelongUser = GenError("The service does not belong to the user")

	CategoryNotFound = GenError("Category not found")

	EventNotCreated        = GenError("Event not created")
	EventWrongTimeInterval = GenError("Incorrect time interval")
	EventNotBelongUser     = GenError("The event does not belong to the user")
	EventNotFound          = GenError("Event not found")
	EventUserNotFound      = GenError("User events not found")
)

func GenError(err string) error {
	return errors.New(err)
}

func IsEmptyRows(err error) bool {
	return err == pgx.ErrNoRows
}
