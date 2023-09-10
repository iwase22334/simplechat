package openapi

import (
	"fmt"

	"github.com/gorilla/websocket"
)

type MessageQuery struct {
	Data string
}

type SimpleMessage struct {
	Data string
}

type Client struct {
	UserID    string
	SendQueue chan string
}

type ChatAPP struct {
	Clients      []*Client
	RecvQueue    chan string
	ConnQueue    chan *Client
	DisconnQueue chan *Client
}

func NewChatAPP() *ChatAPP {
	return &ChatAPP{
		Clients:      []*Client{},
		ConnQueue:    make(chan *Client),
		DisconnQueue: make(chan *Client),
	}
}

func (c *ChatAPP) Run() {
	for {
		select {
		case client := <-c.ConnQueue:
			c.Append(client)
		case client := <-c.DisconnQueue:
			c.Remove(client)

		}
	}
}

func (c *ChatAPP) Append(client *Client) {
	c.Clients = append(c.Clients, client)
}

func (c *ChatAPP) Remove(client *Client) {
	for i, existingClient := range c.Clients {
		if existingClient == client {
			c.Clients = append(c.Clients[:i], c.Clients[i+1:]...)
			break
		}
	}
}

func ChatEcho(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			fmt.Printf("err = %+v\n", err)
		}

		if messageType != websocket.TextMessage {
			fmt.Println("Unexpected message type")
		}

		fmt.Printf("p = %+v\n", p)
		resp := append([]byte("echo: "), p...)

		conn.WriteMessage(websocket.TextMessage, resp)
	}
}
