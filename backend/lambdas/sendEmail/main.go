package main

import (
	"context"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/sesv2"
	"github.com/tahatsahin/personal-website/backend/lambdas/sendEmail/internal/app"
	"github.com/tahatsahin/personal-website/backend/lambdas/sendEmail/internal/infra"
)

var (
	sesClient        *sesv2.Client
	SourceEmail      = "contact@tahatsahin.com"
	DestinationEmail = "tahatsahin@gmail.com"
	Subject          = "DO NOT REPLY - Email from tahatsahin.com contact form"
	CharSet          = "UTF-8"
)

func init() {
	region := os.Getenv("AWS_REGION")
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion(region))
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}
	sesClient = sesv2.NewFromConfig(cfg)
}

func main() {
	lambda.Start(app.Handler{
		Sender: infra.SESSender{
			Client:      sesClient,
			FromAddress: SourceEmail,
			ToAddress:   DestinationEmail,
			Subject:     Subject,
			CharSet:     CharSet,
		},
	}.Handle)
}
