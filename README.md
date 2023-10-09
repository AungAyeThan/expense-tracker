<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
 
## Description

Service that provides functionality to track the expenses. 

## Features
:construction: under work in progress. Current available features are as follows:
- user functionality
  - Create user,
  - Login User with JWT Token
- expense tracking functionality
  - Add expense
  - List expenses with filter parameters(category, type)
  - Get expense
  - Delete expense

## Postman collection
Please refer to expense-tracker.postman_collection for more information about the sample request payload.

## Installation
This service requires Mongodb Installation. Make sure you have mongodb installed before starting the service. [Instructions](https://www.mongodb.com/docs/manual/installation/) as follows:

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

