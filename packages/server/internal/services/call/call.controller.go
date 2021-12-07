package call

import (
	"muapp.ru/graph/models"
	"muapp.ru/internal/utils/call"
)

type CallController struct{}

func (c CallController) CallPassword(phoneNumber string) (*models.Call, error) {
	code := call.GenerateCode()
	srv := new(CallService)

	model, err := srv.CheckAvailability(phoneNumber)
	if err != nil {
		return nil, err
	}

	if model != nil {
		return &models.Call{
			Success: false,
			Type:    models.CallTypeRepeat.String(),
			Time:    0, // TODO Calc
		}, nil
	}

	_, err = srv.CreateLog(phoneNumber, code)

	// res, err := call.MakeCall(phoneNumber, code)
	if err != nil {
		return nil, err
	}

	// if res.Result == "error" {
	// 	return nil, nil
	// }

	return &models.Call{
		Success: true,
		Type:    models.CallTypeNew.String(),
		Time:    0,
	}, nil
}
