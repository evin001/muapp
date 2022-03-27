package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

func ParseJson[T any](res *http.Response) (*T, error) {
	body, _ := ioutil.ReadAll(res.Body)
	if res.StatusCode == 200 {
		var res T
		err := json.Unmarshal(body, &res)
		if err != nil {
			return nil, fmt.Errorf("%s", err)
		}
		return &res, nil
	}
	return nil, fmt.Errorf(res.Status)
}
