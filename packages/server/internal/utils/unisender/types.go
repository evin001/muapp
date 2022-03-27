package unisender

type IsContactInLists struct {
	Result bool `json:"result"`
}

type Subscribe struct {
	Result SubscribeResult `json:"result"`
}

type SubscribeResult struct {
	PersonID int64 `json:"person_id"`
}

type CreateEmailMessage struct {
	Result CreateEmailMessageResult `json:"result"`
}

type CreateEmailMessageResult struct {
	MessageID int64 `json:"message_id"`
}

type CreateCampaign struct {
	Result CreateCampaignResult `json:"result"`
}

type CreateCampaignResult struct {
	CampaignID int64                `json:"campaign_id"`
	Status     CreateCampaignStatus `json:"status"`
	Count      int                  `json:"count"`
}

type CreateCampaignStatus = string

const (
	Scheduled   CreateCampaignStatus = "scheduled"
	WaitsCensor                      = "waits_censor"
)
