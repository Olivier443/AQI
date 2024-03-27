# AQI

## Work in Progress

## Purpose of this app
This RESTful api is being developped to enable anybody to fetch weather and quality of air data.
Creating a user account is optional. However, it is giving the possibility to the user to save and edit the data he decided to save (to be further developed).

## Encryption - bcrypt
To be added to the authentication process.

## Database - mongoDB
https://www.mongodb.com/
MongoDB Atlas has been the choosen provider to store the documents in the database.
Several collections will serve the purpose of this API.

## Open Weather Map
https://openweathermap.org/
This is the API being used to fetch weather and quality of air data.
This is also the place where you can get a free key (at least at the time this API was being built).

# RESTful API
This API as been developeed as RESTfull, and the CRUD elements have been used:
Create - POST
Read - GET
Update - PATCH
Delete - DELETE

# Packages used

## Front End
The front end has been developped using React, and Styled-Components for the UI.
The versions of the packages used are listed below:

react": "^18.2.0
react-dom": "^18.2.0
react-router-dom": "^6.22.0
styled-components": "^6.1.8
@fortawesome/fontawesome-free": "^6.5.1

## Back End
NodeJS, and Express JS have been used to build the backend that will enable the access of data between the frontEnd and mongoDB.
The versions of the packages used are listed below:

dotenv": "^16.4.1
express": "^4.18.2
mongodb": "^6.3.0
morgan": "^1.10.0
nodemon": "^3.0.3

# Other
Developer notes have been added through the components.

# How to run this API
Download the files.
Create a client (front end) and server (back end) folders on your computer.
npx create-react-app and yarn or npm can be used.
Install the packages listed above for both the front end and the backend. They can be found on https://www.npmjs.com/
Have a mongoDB Atlas account (https://www.mongodb.com/) ready for use (a limited account was free at the time I built this APP).
Create a .env file to store your MONGO_URI='XXXXXXXXXXX' credentials and REACT_APP_OPEN_WEATHER_MAP=TYPE YOUR FREE KEY
Enjoy the App.

#
Project currently being developed by Olivier Donze

# License
MIT