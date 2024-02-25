# Project API Documentation

## Introduction

This documentation provides details on the API endpoints, request parameters, and expected responses for the Node.js application managing merchandise and user authentication.

## Project Structure

- `src`: Source code directory.
    - `app`: Application setup.
    - `config`: Configuration files.
    - `controllers`: Request handlers.
    - `middlewares`: Middleware functions.
    - `models`: Database models.
    - `routes`: Route definitions.
    - `services`: Business logic.
    - `types`: TypeScript interfaces.
    - `utils`: Utility functions.
- `docker-compose.yml`, `Dockerfile`: Docker configurations.
- `package.json`, `package-lock.json`: NPM configurations.
- `.env`: Environment variables (not committed).
- `start.sh`: Shell script to start the application.
- `tsconfig.json`: TypeScript configuration.

## API Endpoints

### Merchandise Endpoints

#### List Merchandise

`GET /merchandise`

Request Parameters:

- `limit`: Number of items to return.
- `offset`: Number of items to skip.
- `sortBy`: Field to sort by.
- `sortOrder`: Order to sort (`asc` or `desc`).
- `search`: Search term.

Response:

```json
{
    "status": "success",
    "message": "Data fetched successfully",
    "data": [
        {
            "_id": "65db890d73d5f2001327db14",
            "productId": 53,
            "name": "Product 53",
            "price": 88.67,
            "createdAt": "2024-02-25T18:37:52.930Z",
            "updatedAt": "2024-02-25T18:37:52.930Z"
        }
    ]
}
```


#### Get Merchandise by ID
`GET /merchandise/:productId`

Response:

```json
{
    "status": "success",
    "message": "Data fetched successfully",
    "data": {
        "_id": "65db890d73d5f2001327db14",
        "productId": 53,
        "name": "Product 53",
        "price": 88.67,
        "createdAt": "2024-02-25T18:37:52.930Z",
        "updatedAt": "2024-02-25T18:37:52.930Z"
    }
}
```

#### Add Merchandise
`POST /merchandise`

Request Body:

```json
{
    "productId": 53,
    "name": "Product 53",
    "price": 88.67
}
```

Response:

```json
{
    "status": "success",
    "message": "Data added successfully",
    "data": {
        "_id": "65db890d73d5f2001327db14",
        "productId": 53,
        "name": "Product 53",
        "price": 88.67,
        "createdAt": "2024-02-25T18:37:52.930Z",
        "updatedAt": "2024-02-25T18:37:52.930Z"
    }
}
```


#### Update Merchandise
`PUT /merchandise/:productId`

Request Body:

```json
{
    "name": "Product 53",
    "price": 88.67
}
```

Response:

```json
{
    "status": "success",
    "message": "Data updated successfully",
    "data": {
        "_id": "65db890d73d5f2001327db14",
        "productId": 53,
        "name": "Product 53",
        "price": 88.67,
        "createdAt": "2024-02-25T18:37:52.930Z",
        "updatedAt": "2024-02-25T18:37:52.930Z"
    }
}
```


#### Delete Merchandise
`DELETE /merchandise/:productId`

Response:

```json
{
  "status": "success",
  "message": "Data deleted successfully",
  "data": []
}
```



### User Authentication Endpoints

#### Get User
`GET /users/:userId`

Response:

```json
{
    "status": "success",
    "data": {
        "_id": "65db890d73d5f2001327db47",
        "userId": 1,
        "username": "user1",
        "password": "password1",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJ1c2VyMSIsImlhdCI6MTcwODg4NjI3MiwiZXhwIjoxNzA5MDU5MDcyfQ.nn7eWTfwY8SQMLeUXcozDMZ1sbNoBX1C77myx9KWaz0",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJ1c2VyMSIsImlhdCI6MTcwODg4NjI3MiwiZXhwIjoxNzA5NDkxMDcyfQ.cawAQmFv8BK11Q6H_89ryX5SglyfHNjnTwFkoG_rOFo",
        "createdAt": "2024-02-25T18:38:05.989Z",
        "updatedAt": "2024-02-25T18:38:05.989Z",
        "__v": 0
    },
    "message": "Data fetched successfully"
}
```


#### Refresh Token
`POST /users/token/refresh`

Request Body:

```json
{
    "refreshToken": "User's Refresh Token"
} 
```

Response:

```json
{
  "status": "success",
  "data": {
    "newToken": "Newly generated access token"
  },
  "message": "Token refreshed successfully"
}
```



### Authentication Middleware

Protected endpoints require an access-token header:

```http request
--header 'access-token: YOUR_ACCESS_TOKEN'
```


## Prerequisites

- Docker
- Docker Compose
- Node.js v14


## Getting Started


Command to build and run the application using Docker and Docker Compose:

```sh
. ./start.sh
```


## Fetching and Refreshing Tokens

To fetch tokens, use 

`GET /users/:userId`

To refresh an expired access token, use

`POST /users/token/refresh`
