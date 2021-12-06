package call

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"muapp.ru/internal/pkg/utils"
)

type CallRequest struct {
	Number    string `json:"number"`
	FlashCall `json:"flashcall"`
}

type FlashCall struct {
	Code string `json:"code"`
}

type CallResponse struct {
	Result string `json:"result"`
	ID     int    `json:"id"`
	Number string `json:"number"`
	Price  string `json:"price"`
	Code   string `json:"code"`
}

type Call struct{}

const CALL_API_URL = "https://voice.mobilgroup.ru/api/voice-password/send/"

func MakeCall(number string, code string) (*CallResponse, error) {
	call := &CallRequest{Number: number, FlashCall: FlashCall{Code: code}}
	query, err := json.Marshal(&call)
	if err != nil {
		return nil, fmt.Errorf("%s", err)
	}

	req, err := http.NewRequest("POST", CALL_API_URL, bytes.NewBuffer(query))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", utils.GetEnv("CALL_API_KEY"))

	client := &http.Client{}
	res, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("%s", err)
	}
	defer res.Body.Close()

	body, _ := ioutil.ReadAll(res.Body)
	if res.StatusCode == 200 {
		var res CallResponse
		err := json.Unmarshal(body, &res)
		if err != nil {
			return nil, fmt.Errorf("%s", err)
		}
		return &res, nil
	}

	return nil, fmt.Errorf("%s", string(body))
}

func GenerateCode() string {
	min, max := 1000, 9999
	rand.Seed(time.Now().UnixNano())
	n := rand.Intn(max-min) + min
	return strconv.Itoa(n)
}
