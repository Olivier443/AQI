'use strict';

const express = require('express');
const morgan = require('morgan');
const { signupAccount } = require('./handlers/signupAccount');
const { signinAccount } = require('./handlers/signinAccount');
const { recMyWeather } = require('./handlers/recMyWeather');
const { weatherReport } = require('./handlers/weatherReport');
const { delWeather } = require('./handlers/delWeather');

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // User create his account
  .post("/signup", signupAccount)

  // User sign in his account
  .post("/signin", signinAccount)

  // User saves his weather data in his account
  .post("/recmyweather", recMyWeather)

  // User saves his weather data in his account
  .get("/weather/report/:currentUser", weatherReport)

  // User deletes his weather data in his account
  .delete("/weather/report/del/:weatherDataId", delWeather)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));