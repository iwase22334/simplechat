package openapi

import (
	"fmt"
	"sync"
)

var (
	userAuthInfos = []UserAuthInfo{
		{"user1", "$2y$10$gutlFMq.LPbPFtkVKpU/vuDUVMD0YJ5YDhrSSeSQpRXx7YslHniWC"},
		{"user2", "$2y$10$0DFh1m9ApinLw5aZvg0JV.oEQQolqgtn0eY0mf.pSPjGxuRK3aKca"},
	}

	mutex sync.Mutex
)

type LocalUserAuthRepository struct {
}

func (r LocalUserAuthRepository) findHashedPasswordFromID(userID string) (string, error) {
	for _, userAuthInfo := range userAuthInfos {
		if userAuthInfo.UserId == userID {
			return userAuthInfo.HashedPassword, nil
		}
	}
	return "", fmt.Errorf("User not found: %s", userID)
}

func isExistUser(userID string) bool {
	for _, userAuthInfo := range userAuthInfos {
		if userAuthInfo.UserId == userID {
			return true
		}
	}
	return false
}

func (r LocalUserAuthRepository) registerUser(authInfo UserAuthInfo) error {
	{
		mutex.Lock()
		defer mutex.Unlock()

		if isExistUser(authInfo.UserId) {
			return fmt.Errorf("User already exists: %s", authInfo.UserId)
		}

		userAuthInfos = append(userAuthInfos, authInfo)
	}

	return nil
}
