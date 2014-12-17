'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatisticSchema = new Schema({
  name: String,
  totalDonated:Number,
  goal: Number
});

module.exports = mongoose.model('Statistic', StatisticSchema);