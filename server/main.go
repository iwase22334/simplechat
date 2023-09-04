package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func echo(conn *websocket.Conn) {
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

func main() {
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}

	router := gin.Default()

	router.GET("/:room_id/websocket", func(c *gin.Context) {
		id := c.Param("room_id")
		fmt.Println("room_id:", id)

		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			fmt.Println("failed to connect to server")
			return
		}
		defer conn.Close()
		echo(conn)

	})

	router.Run(":8080")
}
