# rabbitmq-test

## create rabbitmq docker cmd
```
docker run -d -e RABBITMQ_NODENAME=rabbit -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=123456 --nam e rabbit -p 8080:15672 -p 8081:5672 rabbitmq:3-management-alpine
```