package controllers

import (
	"muapp.ru/internal/services"
	"muapp.ru/internal/utils/call"
)

type CallController struct{}

func (c CallController) CallPassword(phoneNumber string) (bool, error) {
	CallSrv := new(services.CallService)
	code := call.GenerateCode()
	_, err := CallSrv.CreateLog(phoneNumber, code)

	res, err := call.MakeCall(phoneNumber, call.GenerateCode())
	if err != nil {
		return false, err
	}

	if res.Result == "error" {
		return false, nil
	}

	return true, nil
}
