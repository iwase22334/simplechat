
## Requirements

 - for bcrypt command used in test-script
```
sudo apt-get install apache2-utils
```

## Build && Execute

```
sudo docker build ./ -t openapi
sudo docker run -p 8080:8080 openapi
```
