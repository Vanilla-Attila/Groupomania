const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Sequelize } = require('sequelize');
const config = path.resolve('./config', 'config.json')
const PostRoute = require('./Routes/postRoute');
const userRoutes = require('./Routes/user');
const models = require('./Models')
const app = express();

const sequelize = new Sequelize('database_development', 'postgres', '121212', {
  host: 'localhost',
  dialect: 'postgres'
});

try {
  sequelize.authenticate();
  // models.sequelize.sync({ force: true }).then(
  //   console.log("table sync success")
  // );
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

app.use('/api/post', PostRoute);
app.use('/api/auth', userRoutes);

// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/api/posts', postsRoute);
// app.use('/api/auth', userRoutes);


// exporting app (we can access to it from outside this js file)
module.exports = app;