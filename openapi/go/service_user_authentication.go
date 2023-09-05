package openapi

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type UserAuthInfo struct {
	UserId         string
	HashedPassword string
}

type UserAuthRepository interface {
	findHashedPasswordFromID(data string) (string, error)
}

func Authenticate(uar UserAuthRepository, ua UserAuthentication) bool {
	hPassword, err := uar.findHashedPasswordFromID(ua.UserId)
	if err != nil {
		fmt.Println(err)
		return false
	}

	err = bcrypt.CompareHashAndPassword([]byte(hPassword), []byte(ua.Password))
	return err == nil
}
