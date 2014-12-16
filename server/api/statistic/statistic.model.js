'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatisticSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Statistic', StatisticSchema);