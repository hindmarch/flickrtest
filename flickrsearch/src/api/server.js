'use strict';
/*jshint esversion: 6 */
/* jshint node: true */

/**
 * NOTE:
 * This is a basic server implementation to proxy API calls for the test.
 * Most of the work for this test has been done in Angular.
 *
 * Note that in order for the API to work, the .env file needs to be populated
 * (use default.env as a template)
 */

const express        = require('express');
const app            = express();

const port = 8000;

// Load in api keys etc.
require('dotenv').config();

// Middleware config to allow front end
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer
  next();
});

// Load routes
require ('./app/routes')(app, {});

app.listen(port, () => console.log(`API server started on port ${port}`));

