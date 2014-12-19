'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var Thumbnail = require('./thumbnail.model');
var easyImage = require('easyimage');

// Get list of images
exports.index = function(req, res) {
  Image.find({})
  .populate('thumbnails')
  .exec(function (err, images) {
    if(err) { return handleError(res, err); }
    if(req.query){
      if(req.query.type==='editorBrowser'){
        var array=[];
        console.log('populating for editor browser');
        for(var i=0; i<images.length; i++){
          if(typeof images[i].urlPath!=='undefined'){
            array.push({
              image:images[i].urlPath,
              folder:'my images'
            });
            console.log(array[i].image);
          }
          if(typeof images[i].thumbnails[0].urlPath !== 'undefined'){
            console.log('setting thumb');
            array[i].thumb=images[i].thumbnails[0].urlPath;
            console.log(array[i].thumb);
          }
        }
        return res.json(200,array);
      }
    }
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
  var filePath=req.config.uploadsDir;
  var urlPath=req.config.publicAssets;
  if(req.files){
    if(typeof req.files.upload!=='undefined'){
      req.files.file=req.files.upload //For the media upload by ckeditor. quick fix
      console.log('uploaded by ckeditor',req.files.file);
    }
    if(req.files.file.size > 0){
      easyImage.info('./'+req.files.file.path).then(function(file){
        req.files.file.width=file.width;
        req.files.file.height=file.height;
        req.files.file.urlPath=urlPath+'/uploads/'+file.name;
        var originalImage=new Image(req.files.file);
        originalImage.save(function(err, originalObject) {
          console.log('original image object saved');
          if(err) { return handleError(res, err); }
          easyImage.thumbnail({
            src:'./'+originalObject.path,
            dst: filePath+'/thumbnails/'+originalObject.name,
            width:128,height:128,
            gravity:'Center',
            x:0, y:0
          }).then(function (thumbfile) {
            var thumbnail = new Thumbnail(thumbfile);
            thumbnail.urlPath=urlPath+'/thumbnails/'+originalImage.name;
            thumbnail.path=filePath+'/thumbnails/'+originalImage.name;
            thumbnail.name=originalImage.name;
            thumbnail._creator=originalObject._id;
            originalImage.thumbnails.push(thumbnail);
            originalImage.save();
            thumbnail.save(function(err,thumbnailObject){
              //send a text response if it was CKEditor
              if(req.files.upload){return res.end('your image has been uploaded');} 
              return res.json(201, {thumbnail:thumbnailObject,original:originalObject});
            });
          },function(err){
            console.log('easy image thumbnail fail');
            return handleError(res,err);
          });
        },function(err){
          console.log('original image object failure');
          return handleError(res,err);
        });
      },function(err){
        return handleError(res,err);
      });
    }else{
      console.log('req files size not greater than zero');
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