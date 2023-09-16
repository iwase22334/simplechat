#!/bin/bash

curl -vi -X GET localhost:8080/api/v1/1/websocket -H "Authorization:Bearer $1"
