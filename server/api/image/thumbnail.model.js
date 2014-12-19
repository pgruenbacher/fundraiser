'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var ThumbnailSchema=new Schema({
  _creator : { type: Schema.ObjectId, ref: 'Image' },
  name: String,
  mimetype: String,
  extension: String,
  size: Number,
  truncated: Boolean,
  path: String,
  urlPath:String,
  encoding: String,
  originalname: String
});

module.exports = mongoose.model('Thumbnail',ThumbnailSchema);