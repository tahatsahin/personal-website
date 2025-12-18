package app

import (
	"context"
	"encoding/json"
	"log"
	"strings"

	"github.com/aws/aws-lambda-go/events"
)

type Request = events.APIGatewayProxyRequest
type Response = events.APIGatewayProxyResponse

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

type EmailSender interface {
	SendEmail(ctx context.Context, req ContactRequest) error
}

type Handler struct {
	Sender EmailSender
}

var headers = map[string]string{
	"Access-Control-Allow-Origin":  "https://tahatsahin.com",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Allow-Methods": "POST,OPTIONS",
}

func (h Handler) Handle(ctx context.Context, req Request) (Response, error) {
	var body ContactRequest

	if err := json.Unmarshal([]byte(req.Body), &body); err != nil {
		log.Printf("failed to unmarshal request body: %v", err)
		return Response{
			StatusCode: 400,
			Headers:    headers,
			Body:       "Invalid request body",
		}, nil
	}

	body.Name = strings.TrimSpace(body.Name)
	body.Email = strings.TrimSpace(body.Email)
	body.Message = strings.TrimSpace(body.Message)

	if body.Name == "" || body.Email == "" || body.Message == "" {
		return Response{
			StatusCode: 400,
			Headers:    headers,
			Body:       "Name, email, and message are required fields",
		}, nil
	}

	if !strings.Contains(body.Email, "@") {
		return Response{
			StatusCode: 400,
			Headers:    headers,
			Body:       "Invalid email address",
		}, nil
	}

	if err := h.Sender.SendEmail(ctx, body); err != nil {
		return Response{
			StatusCode: 500,
			Headers:    headers,
			Body:       "Failed to send email",
		}, nil
	}
	return Response{
		StatusCode: 200,
		Headers:    headers,
		Body:       "Email sent successfully",
	}, nil
}
