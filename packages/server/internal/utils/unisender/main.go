package unisender

import (
	"fmt"
	"net/http"

	"muapp.ru/internal/utils"
)

type Unisender struct {
	ApiUrl             string
	ApiKey             string
	ListIDRegister     string
	TemplateIDRegister string
	SenderName         string
	SenderEmail        string
}

func NewUnisender() *Unisender {
	return &Unisender{
		ApiUrl:             "https://api.unisender.com/ru/api",
		ApiKey:             utils.GetEnv("EMAIL_API_KEY"),
		ListIDRegister:     utils.GetEnv("EMAIL_LIST_ID_REGISTER"),
		TemplateIDRegister: utils.GetEnv("EMAIL_TEMPLATE_ID_REGISTER"),
		SenderName:         utils.GetEnv("EMAIL_SENDER_NAME"),
		SenderEmail:        utils.GetEnv("EMAIL_SENDER_EMAIL"),
	}
}

func request[T any](url string) (*T, error) {
	fmt.Println(url)
	res, err := http.Get(url)
	if err != nil {
		fmt.Println(1, err)
		return nil, err
	}

	defer res.Body.Close()

	decodeRes, err := utils.ParseJson[T](res)
	if err != nil {
		fmt.Println(2, err)
		return nil, err
	}

	fmt.Printf("%+v", decodeRes)

	return decodeRes, nil
}

func (u *Unisender) IsContactInLists(email string) (*IsContactInLists, error) {
	url := fmt.Sprintf(
		"%s/isContactInLists?api_key=%s&email=%s&list_ids=%sLIST_ID&condition=and",
		u.ApiUrl, u.ApiKey, email, u.ListIDRegister,
	)
	return request[IsContactInLists](url)
}

func (u *Unisender) Subscribe(email, name string, code int) (*Subscribe, error) {
	url := fmt.Sprintf(
		"%s/subscribe?format=json&api_key=%s&list_ids=%s&double_optin=3&overwrite=2&fields[email]=%s&fields[Name]=%s&fields[Code]=%d",
		u.ApiUrl, u.ApiKey, u.ListIDRegister, email, name, code,
	)
	return request[Subscribe](url)
}

func (u *Unisender) CreateEmailMessage() (*CreateEmailMessage, error) {
	url := fmt.Sprintf(
		"%s/createEmailMessage?format=json&api_key=%s?list_id=%s&template_id=%s&sender_name=%s&sender_email=%s",
		u.ApiUrl, u.ApiKey, u.ListIDRegister, u.TemplateIDRegister, u.SenderName, u.SenderEmail,
	)
	return request[CreateEmailMessage](url)
}

func (u *Unisender) CreateCampaign(messageID int64, contact string) (*CreateCampaign, error) {
	url := fmt.Sprintf(
		"%s/createCampaign?format=json&api_key=%s&message_id=%d&contacts=%s",
		u.ApiUrl, u.ApiKey, messageID, contact,
	)
	return request[CreateCampaign](url)
}
