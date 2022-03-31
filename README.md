This project is done to show my knowledge of back-end web technologies, specifically in Node.js, REST APIs, and decoupled services (microservices).

# Node.js Challenge

### Description
This is a simple API with Node.js that allow users to query [stock quotes](https://www.investopedia.com/terms/s/stockquote.asp). It is scaffolded with two Express apps.

The project consists of two separate services:

* A user-facing API that receive requests from registered users asking for quote information.
* An internal stock service that queries external APIs to retrieve the requested quote information


## Minimum requirements
### API service

* ✅ Endpoints in the API service should require authentication (no anonymous requests should be allowed). Each request should be authenticated via Basic Authentication.
  * ✅ To register a user the API service must receive a request with an email address, user role and return a randomized password, like this:

    Request example:

    `POST /register`

    ```json
      { "email": "johndoe@contoso.com", "role": "user" }  //role could be user/admin
    ```

    Response example:

    `POST /register`

    ```json
      { "email": "johndoe@contoso.com", "password": "bda5d07453dfde4440803cfcdec48d92" }
    ```
* ✅ When a user requests a stock quote (calls the stock endpoint in the api service), if it exists, it should be saved and related to that user in the database.
  * ✅ The response returned by the API service should be like this:

    `GET /stock?q=aapl.us`

    ```json
      {
        "name": "APPLE",
        "symbol": "AAPL.US",
        "open": 123.66,
        "high": 123.66,
        "low": 122.49,
        "close": 123,
        "date" : "2021-04-01"
      }
    ```
  * ✅ A user can get their history of queries made to the api service by hitting the history endpoint. The endpoint should return the list of entries saved in the database, showing the latest entries first:

    `GET /history`

    ```javascript
    [
        {"date": "2021-04-01T19:20:30Z", "name": "APPLE", "symbol": "AAPL.US", "open": "123.66", "high": 123.66, "low": 122.49, "close": "123"},
        {"date": "2021-03-25T11:10:55Z", "name": "APPLE", "symbol": "AAPL.US", "open": "121.10", "high": 123.66, "low": 122, "close": "122"},
    ```
* ✅ A super user (and only super users) can hit the stats endpoint, which will return the top 5 most requested stocks:

  ✅ (This endpoint will validate the user's role)

  `GET /stats`

  ```json
  [
      {"stock": "aapl.us", "times_requested": 5},
      {"stock": "msft.us", "times_requested": 2},
* ✅ All endpoint responses should be in JSON format.

### Stock service

* ✅ Assume this is an internal service, so requests to endpoints in this service don't need to be authenticated.
* ✅ When a stock request is received, this service should query an external API to get the stock information. For this challenge, use this API: `https://stooq.com/q/l/?s={stock_code}&f=sd2t2ohlcvn&h&e=csv`.
* ✅ Note that `{stock_code}` above is a parameter that should be replaced with the requested stock code.

## Architecture

![Architecture Diagram](https://git.jobsity.com/jobsity/node-challenge/-/blob/master/architecture.png)

1. ✅  A user makes a request asking for Nasdaq's current Stock quote: `GET /stock?q=ndq`
2. ✅ The API service calls the stock service to retrieve the requested stock information
3. ✅ The stock service delegates the call to the external API, parses the response and returns the information back to the API service.
4. ✅ The API service saves the response from the stock service in the database.
5. ✅ The data is formatted and returned to the user.

## Bonuses

The following features are optional to implement, but if you do, you'll be ranked higher in our evaluation process.

* ✅ Add unit tests for the services.
* Add contract/integration tests for the API service.
* ✅ Use JWT instead of basic authentication for endpoints.
* Use containers to orchestrate the services.
* ✅ Use OpenAPI/Swagger to document the API.
* ✅ Add endpoint to reset user password sending an email with the new password.


### Instructions
- Download the project as zip or clone this repository using git
- Open a terminal in the repository root folder
- Install dependencies: cd api-service; npm install and cd stock-service; npm install
- Start the api service: cd stock-service; npm start;
- Start the stock service: cd stock-service; npm start; (On a separate terminal)
- You need nodejs and mongodb running on the server
- For running the test: cd api-service; npm test;


### Stack and technologies used
- NodeJs latest version
    - Express
    - Pug
- MongoDb
    - Mongoose
- Testing
    - Mocha
    - Chai
- Others
    - Nodemailer 
    - Joi
    - Dotenv 
    - axios
    - npm



### Additional notes
 - You can follow the link sent in the password-reset email, it will open a pug view connected to the backend
 - The authenticated routes use a bearer token
 - API service is running by default on port 3001
 - Stock service is running by default on port 3002
 - .env file contains connections string
 - Everiting mark with a ✅ is done, except the OpenApi that is partially done because of the time
 - Integration test are missing because of the time
 - Docker is missing because of the time
