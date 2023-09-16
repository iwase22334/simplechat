#!/bin/bash
sudo docker run --rm -v ${PWD}:/project openapitools/openapi-generator-cli generate -i  /project/openapi.yaml -g go-gin-server -o /project
