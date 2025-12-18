SHELL := /bin/bash


APP_NAME=bootstrap

MYDIR = ./lambdas


.PHONY: tidy test build-sendEmail build-countVisitors zip-sendEmail zip-countVisitors clean help

tidy: ## iterate through all modules and run go mod tidy
	@for file in $(MYDIR)/*; do \
		echo "Tidying $$file"; \
		cd $$file && go mod tidy; \
		cd ../..; \
	done

test: ## iterate through all modules and run go test
	@for file in $(MYDIR)/*; do \
		echo "Testing $$file"; \
		cd $$file && go test ./...; \
		cd ../..; \
	done

build-sendEmail: ## Build Email Sender Lambda binary for amd64
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o $(APP_NAME) $(MYDIR)/sendEmail

build-countVisitors: ## Build Visitor Counter Lambda binary for arm64
	CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -o $(APP_NAME) $(MYDIR)/countVisitors

zip-sendEmail: build-sendEmail ## Build and zip for Lambda
	zip lambda.zip $(APP_NAME)

zip-countVisitors: build-countVisitors ## Build and zip for Lambda
	zip lambda.zip $(APP_NAME)

clean: ## Remove build artifacts
	rm -f $(APP_NAME) lambda.zip

help:
	@echo "Available targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}; {printf " %-15s\t%s\n", $$1, $$2}'
