'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var Thumbnail = require('./thumbnail.model');
var easyImage = require('easyimage');

// Get list of images
exports.index = function(req, res) {
  Image.find(function (err, images) {
    if(err) { return handleError(res, err); }
    return res.json(200, images);
  });
};

// Get a single image
exports.show = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    return res.json(image);
  });
};

// Creates a new image in the DB.
exports.create = function(req, res) {
  if(req.files){
    if(req.files.file.size > 0){
      easyImage.info('./'+req.files.file.path).then(function(file){
        req.files.file.width=file.width;
        req.files.file.height=file.height;
        var originalImage=new Image(req.files.file);
        originalImage.save(function(err, originalObject) {
          if(err) { return handleError(res, err); }
          easyImage.thumbnail({
            src:'./'+originalObject.path,
            dst:'./client/assets/thumbnails'+originalObject.name,
            width:128,height:128,
            gravity:'Center',
            x:0, y:0
          }).then(function (thumbfile) {
            thumbfile.path='/client/assets/thumbnails'+originalImage.name;
            thumbfile.name=originalImage.name;
            thumbfile._creator=originalObject._id;
            var thumbnail = new Thumbnail(thumbfile);
            thumbnail.save(function(err,thumbnailObject){
              return res.json(201, {thumbnail:thumbnailObject,original:originalObject});
            });
          });
        });
      });
    }
  }
};

// Updates an existing image in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    var updated = _.merge(image, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, image);
    });
  });
};

// Deletes a image from the DB.
exports.destroy = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    image.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}