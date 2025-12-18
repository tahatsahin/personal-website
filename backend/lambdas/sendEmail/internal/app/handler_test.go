package app

import (
	"context"
	"errors"
	"testing"

	"github.com/aws/aws-lambda-go/events"
)

type mockSender struct {
	called bool
	got    ContactRequest
	err    error
}

func (m *mockSender) SendEmail(ctx context.Context, req ContactRequest) error {
	m.called = true
	m.got = req
	return m.err
}

func TestHandle_OK(t *testing.T) {
	ms := &mockSender{}
	h := &Handler{Sender: ms}

	req := events.APIGatewayProxyRequest{
		Body: `{"name":"John Doe","email":"john@example.com","message":"Hello!"}`,
	}

	resp, err := h.Handle(context.Background(), req)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	if resp.StatusCode != 200 {
		t.Fatalf("expected status code 200, got %d", resp.StatusCode)
	}
	if !ms.called {
		t.Fatal("expected sender to be called")
	}
	if ms.got.Name != "John Doe" || ms.got.Email != "john@example.com" || ms.got.Message != "Hello!" {
		t.Fatalf("unexpected contact request: %+v", ms.got)
	}
}

func TestHandle_BadRequest(t *testing.T) {
	ms := &mockSender{}
	h := &Handler{Sender: ms}

	req := events.APIGatewayProxyRequest{
		Body: `{"name":"John Doe","email":"invalid-email","message":"Hello!"}`,
	}

	resp, _ := h.Handle(context.Background(), req)
	if resp.StatusCode != 400 {
		t.Fatalf("expected status code 400, got %d", resp.StatusCode)
	}
}

func TestHandle_MissingFields(t *testing.T) {
	ms := &mockSender{}
	h := &Handler{Sender: ms}

	req := events.APIGatewayProxyRequest{
		Body: `{"name":"","email":"john@example.com","message":"Hello!"}`,
	}

	resp, _ := h.Handle(context.Background(), req)
	if resp.StatusCode != 400 {
		t.Fatalf("expected status code 400, got %d", resp.StatusCode)
	}
}

func TestHandle_SESFailure(t *testing.T) {
	ms := &mockSender{err: errors.New("SES down")}
	h := &Handler{Sender: ms}

	req := events.APIGatewayProxyRequest{
		Body: `{"name":"John Doe","email":"john@example.com","message":"Hello!"}`,
	}

	resp, _ := h.Handle(context.Background(), req)
	if resp.StatusCode != 500 {
		t.Fatalf("expected status code 500, got %d", resp.StatusCode)
	}
	if !ms.called {
		t.Fatal("expected sender to be called")
	}
}
