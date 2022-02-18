In this project;

You can create JWT based authentication using access and refresh tokens,
then you can store the refresh Token and blacklisted access tokens in Redis while saving the user's data to mongoDB.

### Technologies I use:

- NodeJS => express
- Redis
- MongoDB
- JWT

#### Create environment file (.env) for jwt, redis and mongodb configuration information and change its content as follows.

```
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_TIME=
JWT_REFRESH_TIME=

REDIS_HOST=
REDIS_PORT=

MONGO_CONN_STRING=
```
#### you can easily test the apis created in the project here
https://www.postman.com/mavibaris/workspace/public/collection/16085875-9fb6d4fb-2525-4cdf-bff2-1a819890b061
