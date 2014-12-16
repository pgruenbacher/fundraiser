'use strict'

angular.module 'fundraiserApp'
.controller 'MainCtrl', ($scope, $http, socket,$timeout) ->
  $scope.awesomeThings = []
  $scope.totalFunds=3344500
  $scope.goal=5000000
  $scope.percentGoal=0
  $timeout ->
    $scope.percentGoal=parseInt $scope.totalFunds/$scope.goal * 100
  , 300
  console.log $scope.totalFunds/$scope.goal
  $http.get('/api/things').success (awesomeThings) ->
    $scope.awesomeThings = awesomeThings
    socket.syncUpdates 'thing', $scope.awesomeThings

  $scope.addThing = ->
    return if $scope.newThing is ''
    $http.post '/api/things',
      name: $scope.newThing

    $scope.newThing = ''

  $scope.deleteThing = (thing) ->
    $http.delete '/api/things/' + thing._id

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'thing'
