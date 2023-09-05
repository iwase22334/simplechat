package openapi

import "fmt"

var userAuthInfos = []UserAuthInfo{
	{"user1", "$2y$10$gutlFMq.LPbPFtkVKpU/vuDUVMD0YJ5YDhrSSeSQpRXx7YslHniWC"},
}

type LocalUserAuthRepository struct {
}

func (r LocalUserAuthRepository) findHashedPasswordFromID(UserID string) (string, error) {
	for _, userAuthInfo := range userAuthInfos {
		if userAuthInfo.UserId == UserID {
			return userAuthInfo.HashedPassword, nil
		}
	}
	return "", fmt.Errorf("User not found: %s", UserID)
}
