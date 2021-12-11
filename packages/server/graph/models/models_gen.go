// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

import (
	"fmt"
	"io"
	"strconv"
)

type Call struct {
	Time    int    `json:"time"`
	Success bool   `json:"success"`
	Type    string `json:"type"`
}

type User struct {
	ID            string  `json:"id"`
	FirstName     *string `json:"firstName"`
	LastName      *string `json:"lastName"`
	Email         string  `json:"email"`
	Phone         string  `json:"phone"`
	EmailVerified bool    `json:"emailVerified"`
	PhoneVerified bool    `json:"phoneVerified"`
	Role          Role    `json:"role"`
	AuthToken     string  `json:"authToken"`
	RefreshToken  string  `json:"refreshToken"`
}

type CallType string

const (
	CallTypeNew    CallType = "New"
	CallTypeRepeat CallType = "Repeat"
)

var AllCallType = []CallType{
	CallTypeNew,
	CallTypeRepeat,
}

func (e CallType) IsValid() bool {
	switch e {
	case CallTypeNew, CallTypeRepeat:
		return true
	}
	return false
}

func (e CallType) String() string {
	return string(e)
}

func (e *CallType) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = CallType(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid CallType", str)
	}
	return nil
}

func (e CallType) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}

type Role string

const (
	RoleMaster Role = "master"
	RoleClient Role = "client"
)

var AllRole = []Role{
	RoleMaster,
	RoleClient,
}

func (e Role) IsValid() bool {
	switch e {
	case RoleMaster, RoleClient:
		return true
	}
	return false
}

func (e Role) String() string {
	return string(e)
}

func (e *Role) UnmarshalGQL(v interface{}) error {
	str, ok := v.(string)
	if !ok {
		return fmt.Errorf("enums must be strings")
	}

	*e = Role(str)
	if !e.IsValid() {
		return fmt.Errorf("%s is not a valid Role", str)
	}
	return nil
}

func (e Role) MarshalGQL(w io.Writer) {
	fmt.Fprint(w, strconv.Quote(e.String()))
}
