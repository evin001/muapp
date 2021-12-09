package call

import (
	"encoding/json"
	"fmt"
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils/call"
)

type CallController struct{}

func (c CallController) CallPassword(phone string) (*models.Call, error) {
	code := call.GenerateCode()
	srv := new(CallService)

	beforeTime, err := srv.CheckAvailability(phone)
	if err != nil {
		return nil, err
	}

	if beforeTime != nil {
		return &models.Call{
			Success: false,
			Type:    models.CallTypeRepeat.String(),
			Time:    int(beforeTime.Sub(time.Now()).Seconds()),
		}, nil
	}

	res, err := call.MakeCall(phone, code)
	if err != nil {
		return nil, err
	}
	if res.Result == "error" {
		return nil, fmt.Errorf("Can't make call")
	}

	response, err := json.Marshal(&res)
	if err != nil {
		return nil, err
	}

	err = srv.CreateLog(phone, code, string(response))
	if err != nil {
		return nil, err
	}

	return &models.Call{
		Success: true,
		Type:    models.CallTypeNew.String(),
		Time:    0,
	}, nil
}
