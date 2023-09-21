package openapi

import (
	"os"

	"github.com/gin-gonic/gin"
)

type CORSMiddleware struct {
	Handler gin.HandlerFunc
}

func _CORSMiddleware() gin.HandlerFunc {
	allowOrigin := "http://localhost:51182"
	if envAllowOrigin := os.Getenv("ACCESS_CONTROL_ALLOW_ORIGIN"); envAllowOrigin != "" {
		allowOrigin = envAllowOrigin
	}

	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", allowOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
	}
}

func NewCORSMiddleware() CORSMiddleware {
	return CORSMiddleware{
		Handler: _CORSMiddleware(),
	}
}
