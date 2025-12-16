package main

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/sesv2"
	"github.com/aws/aws-sdk-go-v2/service/sesv2/types"
)

type Mail struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

var (
	sesClient        *sesv2.Client
	SourceEmail      = "contact@tahatsahin.com"
	DestinationEmail = "tahatsahin@gmail.com"
	Subject          = "DO NOT REPLY - Email from tahatsahin.com contact form"
	CharSet          = "UTF-8"
	destination      = &types.Destination{
		ToAddresses: []string{DestinationEmail},
		// CcAddresses: []string{"cc@example.com"},
		// BccAddresses: []string{"cc@example.com"},
	}
)

func init() {
	region := os.Getenv("AWS_REGION")
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(region))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}
	sesClient = sesv2.NewFromConfig(cfg)
}

func prepareEmailInput(mail Mail) *sesv2.SendEmailInput {

	// construct email content
	body := "You have received a new message from your website contact form.\n\n"
	body += "Here are the details:\n"
	body += "Name: " + mail.Name + "\n"
	body += "Email: " + mail.Email + "\n"
	body += "Message:\n" + mail.Message + "\n"

	emailContent := &types.EmailContent{
		Simple: &types.Message{
			Subject: &types.Content{
				Data:    &Subject,
				Charset: &CharSet,
			},
			Body: &types.Body{
				Text: &types.Content{
					Data:    &body,
					Charset: &CharSet,
				},
			},
		},
	}

	emailInput := &sesv2.SendEmailInput{
		FromEmailAddress: &SourceEmail,
		Destination:      destination,
		Content:          emailContent,
	}

	return emailInput
}

func handleRequest(ctx context.Context, event events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var mail Mail

	// parse mail from request
	if err := json.Unmarshal([]byte(event.Body), &mail); err != nil {
		log.Printf("failed to unmarshal event: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Invalid request body"}, nil
	}

	// prepare email input
	emailInput := prepareEmailInput(mail)

	// send email
	_, err := sesClient.SendEmail(ctx, emailInput)
	if err != nil {
		log.Printf("failed to send email: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Failed to send email"}, nil
	}

	log.Printf("email sent successfully to %s", DestinationEmail)
	return events.APIGatewayProxyResponse{StatusCode: 200, Body: "Email sent successfully"}, nil
}

func main() {
	lambda.Start(handleRequest)
}
