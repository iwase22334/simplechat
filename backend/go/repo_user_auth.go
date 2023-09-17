package openapi

type UserAuthInfo struct {
	UserId         string
	HashedPassword string
}

type UserAuthRepository interface {
	findHashedPasswordFromID(data string) (string, error)
	registerUser(authInfo UserAuthInfo) error
}
