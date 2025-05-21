# VittaHub API

- [VittaHub API](#vittahub-api)
  - [Auth Routes](#auth-routes)
    - [Auth Register](#auth-register)
        - [Auth Pacient Register Request](#auth-pacient-register-request)
        - [Auth Pacient Register Response](#auth-pacient-register-response)
        - [Auth Clinic Register Request](#auth-clinic-register-request)
        - [Auth Clinic Register Response](#auth-clinic-register-response)
    - [Clinic Employee Register](#clinic-employee-register)
        - [Specialist Register Request](#specialist-register-request)
        - [Specialist Register Response](#specialist-register-response)
        - [Employee Register Request](#specialist-register-request)
        - [Employee Register Response](#specialist-register-response)
    - [Auth Login](#auth-login)
        - [Auth Login Request](#auth-login-request)
        - [Auth Login Response](#auth-login-response)
        

## Auth Routes

### Auth Register

#### Auth Pacient Register Request

```js
POST /auth/register/patient
```

```json
{
    "name" : "jose",
    "email": "jose@email.com",
    "password": "MyPassword",
    "password_confirmation" : "MyPassword",
    "role": "patient",
    "birthdate": "05/11/2001",
    "sex": "male",
    "address": {
        "street": "R. Jaime Leonel Chaves",
        "number": "2134",
        "country": "Brazil",
        "city": "Limoeiro Do Norte",
        "zip_code": "6293000"
    },
    "phone_1": "88998765432",
    "phone_2": null,
    "CPF": "36938081042"
}
```

#### Auth Pacient Register Response

```js
201 Created
```

```json
{
    "user": {
        "id" : 17,
        "name" : "jose",
        "email": "jose@email.com",
        "role": "patient",
        "birthdate": "2001-11-05",
        "sex": "male",
        "address": {
            "street": "R. Jaime Leonel Chaves",
            "number": "2134",
            "country": "Brazil",
            "city": "Limoeiro Do Norte",
            "zip_code": "6293000"
        },
        "phone_1": "88998765432",
        "phone_2": null,
        "CPF": "36938081042"
    }
}
```

#### Auth Clinic Register Request

```js
POST /auth/register/clinic
```

```json
{
    "name" : "Clinic Inc.",
    "email": "clinicinc@email.com",
    "password": "MyPassword",
    "password_confirmation" : "MyPassword",
    "role": "clinic",
    "CNPJ": "87263120000160",
    "address": {
        "street": "R. Jaime Leonel Chaves",
        "number": "2134",
        "country": "Brazil",
        "city": "Limoeiro Do Norte",
        "zip_code": "6293000"
    },
    "phone": "88998765432",
    "whatsapp": "88998765432"
}
```

#### Auth Clinic Register Response

```js
201 Created
```

```json
{
    "id": 1,
    "name" : "Clinic Inc.",
    "email": "clinicinc@email.com",
    "role": "clinic",
    "CNPJ": "87263120000160",
    "address": {
        "street": "R. Jaime Leonel Chaves",
        "number": "2134",
        "country": "Brazil",
        "city": "Limoeiro Do Norte",
        "zip_code": "6293000"
    },
    "phone": "88998765432",
    "whatsapp": "88998765432"
}
```

### Clinic Employee Register

#### Specialist Register Request

```js
POST /clinic/specialists
```

```json
{
    "name": "mario",
    "email": "specialist@email.com",
    "password": "MyPassword",
    "password_confirmation" : "MyPassword",
    "role": "specialist",
    "specialist"
    "speciality": "cardiologist",
    "phone": "88998765432"
}
```

#### Specialist Register Response

```js
201 Created
```

```json
{
    "id": 1,
    "clinic_id": 1,
    "name": "mario",
    "email": "specialist@email.com",
    "role": "specialist",
    "speciality": "cardiologist",
    "phone": "88998765432"
}
```

#### Employee Register Request

```js
POST /clinic/employees
```

```json
{
    "name": "luigi",
    "email": "employee@email.com",
    "password": "MyPassword",
    "password_confirmation" : "MyPassword",
    "role": "employee",
    "function": "attendant",
    "phone": "88998765432"
}
```

#### Employee Register Response

```js
201 Created
```

```json
{
    "id": 1,
    "clinic_id": 1,
    "name": "luigi",
    "email": "employee@email.com",
    "role": "employee",
    "function": "attendant",
    "phone": "88998765432"
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
    "role": "patient"
}
```

#### Auth Login Response
```js
200 Ok 
```

```json
{
  "user": {
    "id": 17,
    "email": "myemail@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTc0NzU5NTk4MywiZXhwIjoxNzQ3NjgyMzgzfQ.csh8Q111BTtOg8CrfzGSSV3XtvzPgCpPkU6Z3QRR6QE"
}
```