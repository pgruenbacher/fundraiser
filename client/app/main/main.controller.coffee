'use strict'

angular.module 'fundraiserApp'
.controller 'MainCtrl', ($scope, $http, socket,$timeout) ->
  $scope.awesomeThings = []
  $scope.tweets = []
  $scope.statistics={}

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
