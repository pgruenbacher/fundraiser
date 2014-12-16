'use strict';

var _ = require('lodash');
var Statistic = require('./statistic.model');

// Get list of statistics
exports.index = function(req, res) {
  Statistic.find(function (err, statistics) {
    if(err) { return handleError(res, err); }
    return res.json(200, statistics);
  });
};

// Get a single statistic
exports.show = function(req, res) {
  Statistic.findById(req.params.id, function (err, statistic) {
    if(err) { return handleError(res, err); }
    if(!statistic) { return res.send(404); }
    return res.json(statistic);
  });
};

// Creates a new statistic in the DB.
exports.create = function(req, res) {
  Statistic.create(req.body, function(err, statistic) {
    if(err) { return handleError(res, err); }
    return res.json(201, statistic);
  });
};

// Updates an existing statistic in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Statistic.findById(req.params.id, function (err, statistic) {
    if (err) { return handleError(res, err); }
    if(!statistic) { return res.send(404); }
    var updated = _.merge(statistic, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, statistic);
    });
  });
};

// Deletes a statistic from the DB.
exports.destroy = function(req, res) {
  Statistic.findById(req.params.id, function (err, statistic) {
    if(err) { return handleError(res, err); }
    if(!statistic) { return res.send(404); }
    statistic.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}