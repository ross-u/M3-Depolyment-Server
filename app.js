const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose     = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRouter = require('./routes/project-routes');
const taskRouter = require('./routes/task-routes');

const app = express();

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// app.disable('etag');

// MIDDLEWARE SETUP
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// CORS SETTINGS TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(cors({
  origin: ['http://localhost:3000'], // <== this will be the URL of our React app (it will be running on port 3000)
}));

// ROUTES MIDDLEWARE:
app.use('/api', projectRouter);
app.use('/api', taskRouter);


module.exports = app;