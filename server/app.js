/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var multer  = require('multer');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
//Pass configuration through the requests
app.use(function(req,res,next){
  // Assign the config to the req object
  req.config = config;
  // Call the next function in the pipeline (your controller actions).
  return next();
});
//Muler Upload Settings
app.use(multer({ 
  dest: config.uploadsDir+'/uploads/',
  rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadData: function (file, data) {
    //console.log(data.length + ' of ' + file.fieldname + ' arrived')
  },
  onFilesLimit: function () {
    console.log('Crossed file limit!')
  },
  onFieldsLimit: function () {
    console.log('Crossed fields limit!')
  },
  limits: {
    fieldNameSize: 100,
    files: 5,
    fields: 12
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
  }
}));

var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;