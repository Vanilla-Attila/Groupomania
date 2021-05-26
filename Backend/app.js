const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Sequelize } = require('sequelize');
// const saucesRoute = require('./routes/saucesRoute');
// const userRoutes = require('./routes/user');

const app = express();

const sequelize = new Sequelize('Groupomania', 'postgres', '121212', {
  host: 'localhost',
  dialect: 'postgres'
});

try {
  sequelize.authenticate();
  console.log('Successfully connected to Postgresql database!');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// CORS - Cross Origin Resource Sharing, Allows all requests from all origins to access API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Convert the body to json object because we are receiving json from frontend
app.use(bodyParser.json());

// Set static folder and files
// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/api/sauces', saucesRoute);
// app.use('/api/auth', userRoutes);


// exporting app (we can access to it from outside this js file)
module.exports = app;