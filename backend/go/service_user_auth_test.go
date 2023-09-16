package openapi

import (
	"testing"
)

func TestRegister(t *testing.T) {
	// Test Reconnect
	t.Run("sequence1", func(t *testing.T) {
		t.Log("start!")

		authRepo := LocalUserAuthRepository{}

		user := UserAuth{
			"testuser",
			"testpassword",
		}

		if Authenticate(authRepo, user) {
			t.Errorf("failed. must be fail to authenticate")
		}

		if err := Register(authRepo, user); err != nil {
			t.Errorf("failed. %v", err)
		}

		if err := Register(authRepo, user); err == nil {
			t.Errorf("failed. must be fail")
		}

		if !Authenticate(authRepo, user) {
			t.Errorf("failed. must be success to authenticate")
		}

	})

}
