'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ImageSchema = new Schema({
  name: String,
  mimetype: String,
  extension: String,
  size: Number,
  truncated: Boolean,
  path: String,
  urlPath: String,
  encoding: String,
  originalname: String,
  thumbnails: [{ type: Schema.ObjectId, ref: 'Thumbnail' }]
});

module.exports = mongoose.model('Image', ImageSchema);

