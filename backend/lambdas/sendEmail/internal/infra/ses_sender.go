package infra

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/service/sesv2"
	"github.com/aws/aws-sdk-go-v2/service/sesv2/types"
	"github.com/tahatsahin/personal-website/backend/lambdas/sendEmail/internal/app"
)

type SESSender struct {
	Client      *sesv2.Client
	FromAddress string
	ToAddress   string
	Subject     string
	CharSet     string
}

func (s SESSender) SendEmail(ctx context.Context, req app.ContactRequest) error {
	subject := s.Subject
	if subject == "" {
		subject = "DO NOT REPLY - Email from tahatsahin.com contact form"
	}

	textBody := "You have received a new message from your website contact form.\n\n"
	textBody += "Here are the details:\n"
	textBody += "Name: " + req.Name + "\n"
	textBody += "Email: " + req.Email + "\n"
	textBody += "Message:\n" + req.Message + "\n"

	_, err := s.Client.SendEmail(ctx, &sesv2.SendEmailInput{
		FromEmailAddress: &s.FromAddress,
		Destination: &types.Destination{
			ToAddresses: []string{s.ToAddress},
		},
		Content: &types.EmailContent{
			Simple: &types.Message{
				Subject: &types.Content{
					Data:    &subject,
					Charset: &s.CharSet,
				},
				Body: &types.Body{
					Text: &types.Content{
						Data:    &textBody,
						Charset: &s.CharSet,
					},
				},
			},
		},
	})
	return err
}
