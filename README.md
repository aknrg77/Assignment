<p align="center">
   <img src="https://github.com/aknrg77/NODE_CLI/blob/master/assets/node.png" alt="Node.js"/>
</p>

# interview-scheduling-APP

A Simple app that performs normal operations like create/edit/list interviews and have also authorization parameters.

# Set Up Locally

```
1. git clone https://github.com/aknrg77/Interview-Scheduling.git
2. npm install
3. make an .env file
4  paste these items below
    "PORT=
    MONGO_URI=
    MONGO_URI_PRODUCTION=
    SECRET_KEY=
    API_KEY="
5  Add your port local mongo address, atlas mongo address , a secret key for jwt and your sendgrid Api key
6. npm run
```

# Api Requests
1. post /user

    JSON DATA FORMAT
    {
    "email": "sdaasd@gmail.com",
    "name" : "testsecond",
    "type" : "interviewee"
    }

2. get  /user

    Lists all users

3. post /interview

    JSON DATA FORMAT
    {
    "startDate" : "2021-12-29T07:45:44.287Z",
    "endDate" : "2021-12-31T07:45:44.287Z",
    "participants" :["FIfy3C3tU","zVEIqnuBL"]  // Must be uid of users min 2
    }

4. get /interview

    shows all upcoming interviews from Date.now()

5. patch  /interview/:uid     //uid of iterview must be there to edit that particular interview

    JSON DATA FORMAT
    {
        "startDate" : "2021-12-29T07:45:44.287Z"
    }

# Conditions
1. In interview startDate < endDate
2. In post /interview participants array size must be >= 2
3. In post /user name must be only alphabets
4. In post /user email must be valid
5. In patch /interview/:uid  uid must be there
6. creating a interview between already scheduled interview of an user must throw error



# Documentation

1. [JWT](https://www.npmjs.com/package/jsonwebtoken)
2. [Mongoose](https://mongoosejs.com/docs/guide.html)
3. [Sendgrid](https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs)
4. [dotenv](https://www.npmjs.com/package/dotenv)
5. [Express](https://expressjs.com/en/starter/installing.html)
