'use strict'

angular.module 'fundraiserApp'
.controller 'MainCtrl', ($scope, $http, socket,$timeout) ->
  $scope.awesomeThings = []
  $scope.tweets = []
  $scope.statistics={}

  $scope.editMode=false;
  $scope.exampleBody='<p>You can edit here</p>'
  $scope.exampleBody2='<p>ANother asdf lkj</p>'

  $http.get('/api/statistics').success (statistics) ->
    console.log 'success statistics',statistics
    $scope.statistics = statistics[0]
    socket.syncUpdates 'statistic', $scope.statistics
  , ->
    console.log 'error'

  socket.syncUpdates 'tweet', $scope.tweets


  $http.get('/api/things').success (awesomeThings) ->
    $scope.awesomeThings = awesomeThings
    socket.syncUpdates 'thing', $scope.awesomeThings

  $scope.addThing = ->
    console.log $scope.tweets
    return if $scope.newThing is ''
    $http.post '/api/things',
      name: $scope.newThing

    $scope.newThing = ''

  $scope.deleteThing = (thing) ->
    $http.delete '/api/things/' + thing._id

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'thing'
    socket.unsyncUpdates 'tweet'
    socket.unsyncUpdates 'statistic'


  $scope.editorOptions =
    language: 'en'
    'skin': 'moono'
    'extraPlugins': 'imagebrowser,mediaembed'
    imageBrowser_listUrl: '/api/images?type=editorBrowser'
    filebrowserBrowseUrl: '/api/files?type=editorBrowser'
    filebrowserImageUploadUrl: '/api/images'
    filebrowserUploadUrl: '/api/files'
    # toolbarLocation: 'bottom'
    toolbar: 'full'
    toolbar_full: [
      name: 'basicstyles'
      items: [ 'Bold', 'Italic', 'Strike', 'Underline' ]
    ,   
      name: 'paragraph'
      items: [ 'BulletedList', 'NumberedList', 'Blockquote' ]
    ,
      name: 'editing' 
      items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ]
    ,
      name: 'links'
      items: [ 'Link', 'Unlink', 'Anchor' ]
    ,
      name: 'tools'
      items: [ 'SpellChecker', 'Maximize' ]
    ,
      name: 'clipboard'
      items: [ 'Undo', 'Redo' ]
    ,
      name: 'styles'
      items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ]
    ,
      name: 'insert'
      items: [ 'Image', 'Table', 'SpecialChar', 'MediaEmbed' ]
    ,
      '/'
    ]
    