package call

import (
	"context"
	"encoding/json"
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/utils/call"
	"muapp.ru/internal/utils/errors"
	"muapp.ru/internal/utils/jwt"
)

type CallController struct{}

func (c CallController) CallPassword(ctx context.Context, phone string) (*models.Call, error) {
	code := call.GenerateCode()
	srv := new(CallService)

	beforeTime, err := srv.CheckAvailability(phone)
	if err != nil {
		return nil, err
	}

	if beforeTime != nil {
		return &models.Call{
			Success: false,
			Type:    models.CallTypeRepeat,
			Time:    int(time.Until(*beforeTime).Seconds()),
		}, nil
	}

	res, err := call.MakeCall(phone, code)
	if err != nil {
		return nil, err
	}
	if res.Result == "error" {
		return nil, errors.CallWrong
	}

	response, err := json.Marshal(&res)
	if err != nil {
		return nil, err
	}

	userID := jwt.GetUserID(ctx)
	err = srv.CreateLog(userID, phone, code, string(response))
	if err != nil {
		return nil, err
	}

	return &models.Call{
		Success: true,
		Type:    models.CallTypeNew,
		Time:    0,
	}, nil
}
