package openapi

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func Authenticate(authRepo UserAuthRepository, userAuth UserAuth) bool {
	hPassword, err := authRepo.findHashedPasswordFromID(userAuth.UserID)
	if err != nil {
		fmt.Println(err)
		return false
	}

	err = bcrypt.CompareHashAndPassword([]byte(hPassword), []byte(userAuth.Password))
	return err == nil
}

func Register(authRepo UserAuthRepository, userAuth UserAuth) error {
	cost := 10
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userAuth.Password), cost)
	if err != nil {
		return fmt.Errorf("failed to generate bcrypt password %v", err)
	}

	userInfo := UserAuthInfo{
		userAuth.UserID,
		string(hashedPassword),
	}

	if err := authRepo.registerUser(userInfo); err != nil {
		return fmt.Errorf("failed to register user %v", err)
	}

	return nil
}
