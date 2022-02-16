package call

import (
	"context"
	"encoding/json"
	"time"

	"muapp.ru/graph/models"
	"muapp.ru/internal/services/user"
	"muapp.ru/internal/utils"
	"muapp.ru/internal/utils/call"
	"muapp.ru/internal/utils/errors"
	"muapp.ru/internal/utils/jwt"
)

type CallController struct{}

func (c CallController) CallPassword(ctx context.Context, phone string) (*models.Call, error) {
	userID := jwt.GetUserID(ctx)
	usrv := new(user.UserService)
	user, _, err := usrv.GetUser(user.EmailOrID{ID: &userID})
	if err != nil {
		return nil, err
	}
	if user.PhoneVerified {
		return nil, errors.UserPhoneAlreadyVerified
	}

	code := call.GenerateCode()
	srv := new(CallService)

	beforeTime, err := srv.CheckAvailability(phone)
	if err != nil && !errors.IsEmptyRows(err) {
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

	err = srv.CreateLog(userID, phone, code, string(response))
	if err != nil {
		return nil, err
	}

	return &models.Call{
		Success: true,
		Type:    models.CallTypeNew,
		Time:    utils.GetIntEnv("CALL_DELAY_SEC"),
	}, nil
}
