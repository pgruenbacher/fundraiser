'use strict'

angular.module 'fundraiserApp'
.controller 'MediaCtrl', ($scope,$modal) ->
  $scope.message = 'Hello'
  $scope.openUploadModal=->
    $modal.open {
      templateUrl:'app/admin/media/modal.html'
      size:'lg'
    }
.controller 'uploadCTRL', ($scope, $rootScope, FileUploader)->
  uploader=$scope.uploader=new FileUploader {
    url:'/api/images'
  }
  uploader.filters.push {
    name: 'customFilter'
    fn: (item,options)->
      this.queue.length<10
    removeAfterUpload: true
  }

  #CALLBACKS

  uploader.onWhenAddingFileFailed (item, filter, options)->
      console.info 'onWhenAddingFileFailed', item, filter, options
  
  uploader.onAfterAddingFile = (fileItem)->

  uploader.onAfterAddingAll = (addedFileItems)->
  uploader.onBeforeUploadItem = (item) ->
  uploader.onProgressItem = (fileItem, progress)->
  uploader.onProgressAll = (progress) ->
  uploader.onSuccessItem = (fileItem, response, status, headers)->
  uploader.onErrorItem = (fileItem, response, status, headers) ->
  uploader.onCancelItem = (fileItem, response, status, headers) ->
  # uploader.onCompleteItem = (fileItem, response, status, headers)->
  #    console.log(fileItem._file.name);

  #    CRUD.image.create({url: fileItem._file.name}, function(response) {
  #     console.log(response);
  #    });
  uploader.onCompleteAll = ()->
    # CRUD.image.find {}, (response)->
    #   if !response.error
    #     allImages = response.response
    #     $rootScope.images = []
    #     $rootScope.images.push allImages