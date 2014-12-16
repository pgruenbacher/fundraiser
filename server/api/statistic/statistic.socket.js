/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Statistic = require('./statistic.model');

exports.register = function(socket) {
  Statistic.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Statistic.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('statistic:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('statistic:remove', doc);
}