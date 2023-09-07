package openapi

import (
	"fmt"

	"github.com/gorilla/websocket"
)

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
