'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/fundraiser-dev'
  },
  uploadsDir:'./client/assets',
  publicAssets:'/assets',
  seedDB: true
};
