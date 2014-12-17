'use strict'

angular.module 'fundraiserApp'
.directive 'statisticBox', ($filter)->
  templateUrl: 'components/statisticBox/statisticBox.html'
  restrict: 'EA'
  scope: 
    totalDonated:'@'
    goal:'@'
  link: (scope, element, attrs) ->
    scope.$watch 'totalDonated', ->
      scope.percentGoal=$filter('number')(scope.totalDonated/scope.goal*100,0)
      false
