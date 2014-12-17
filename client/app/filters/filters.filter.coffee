'use strict'

angular.module 'fundraiserApp'
.filter 'filters', ->
  (input) ->
    'filters filter: ' + input
.filter 'moment', ->
  (dateString, format)->
      moment(dateString).format(format)