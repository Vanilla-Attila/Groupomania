const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const {
  Sequelize
} = require('sequelize');
const config = path.resolve('./config', 'config.json')
const PostRoute = require('./Routes/postRoute');
const userRoutes = require('./Routes/user');
const commentRoutes = require('./Routes/commentRoute');
const likeRoutes = require('./Routes/likesRoute');
const models = require('./Models');
const sequelize = require('./database/connection');
const app = express();


// db connection 
require('./database/connection')
// sequelize.sync({
//   force: false,
//   alter: true
// })


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
app.use('/api/comment', commentRoutes);
app.use('/api/Like', likeRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use('/api/posts', postsRoute);
// app.use('/api/auth', userRoutes);


// exporting app (we can access to it from outside this js file)
module.exports = app;