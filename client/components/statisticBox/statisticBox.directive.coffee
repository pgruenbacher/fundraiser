'use strict'

angular.module 'fundraiserApp'
.directive 'statisticBox', ->
  templateUrl: 'components/statisticBox/statisticBox.html'
  restrict: 'EA'
  link: (scope, element, attrs) ->
