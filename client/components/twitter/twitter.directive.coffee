'use strict'

angular.module 'fundraiserApp'
.directive 'twitter', ($interval)->
  templateUrl: 'components/twitter/twitter.html'
  restrict: 'EA'
  scope: 
    feed:'='
  link: (scope, element, attrs) ->
