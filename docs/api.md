# VittaHub API

- [VittaHub API](#vittahub-api)
  - [Auth Routes](#auth-routes)
    - [Auth Register](#auth-register)
        - [Auth Register Request](#auth-register-request)
        - [Auth Register Response](#auth-register-response)
    - [Auth Login](#auth-login)
        - [Auth Login Request](#auth-login-request)
        - [Auth Login Response](#auth-login-response)
        

## Auth Routes

### Auth Register

#### Auth Register Request

```js
POST /auth/register
```

```json
{
    "email": "myemail@email.com",
    "password": "MyPassword",
}
```

#### Auth Register Response

```js
201 Created
```

```json
{
    "user": {
        "id": 16,
        "email": "myemail@email.com"
    }
}
```

### Auth Login

#### Auth Login Request
```js
POST /auth/login
```

```json
{
    "email": "myemail@email.com",
    "password": "MyPassword",
}
```

#### Auth Login Response
```js
200 Ok 
```

```json
{
  "user": {
    "id": 16,
    "email": "myemail@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTc0NzU5NTk4MywiZXhwIjoxNzQ3NjgyMzgzfQ.csh8Q111BTtOg8CrfzGSSV3XtvzPgCpPkU6Z3QRR6QE"
}
```