#!/bin/bash

curl -X POST -H "Content-Type: application/json" -d '{"user_id" : "user1" , "password" : "strong_password"}' localhost:8080/api/v1/auth/login
