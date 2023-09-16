package openapi

import (
	"bytes"
	"testing"
)

func TestStartAPP(t *testing.T) {
	// Test Reconnect
	t.Run("sequence1", func(t *testing.T) {
		t.Log("start!")

		c := NewChatAPP()
		c.StartAPP()

		t.Log("app started!")

		client1 := NewClient("user1")
		client2 := NewClient("user2")
		c.ConnQueue <- client1
		c.ConnQueue <- client2

		t.Log("client registered")

		client1.RecvQueue <- []byte("message1")
		client2.RecvQueue <- []byte("message2")

		t.Log("message send")
		if v := <-client1.SendQueue; !bytes.Equal(v, []byte("user1: message1")) {
			t.Errorf("failed. %v", string(v))
		}
		if v := <-client1.SendQueue; !bytes.Equal(v, []byte("user2: message2")) {
			t.Errorf("failed. %v", string(v))
		}
		if v := <-client2.SendQueue; !bytes.Equal(v, []byte("user1: message1")) {
			t.Errorf("failed. %v", string(v))
		}
		if v := <-client2.SendQueue; !bytes.Equal(v, []byte("user2: message2")) {
			t.Errorf("failed. %v", string(v))
		}

		c.DisconnQueue <- client2
		client1.RecvQueue <- []byte("message3")
		if v := <-client1.SendQueue; !bytes.Equal(v, []byte("user1: message3")) {
			t.Errorf("failed. %v", string(v))
		}

		client3 := NewClient("user2")
		c.ConnQueue <- client3
		client3.RecvQueue <- []byte("message4")
		if v := <-client1.SendQueue; !bytes.Equal(v, []byte("user2: message4")) {
			t.Errorf("failed. %v", string(v))
		}
		if v := <-client3.SendQueue; !bytes.Equal(v, []byte("user2: message4")) {
			t.Errorf("failed. %v", string(v))
		}

	})

}
