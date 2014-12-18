'use strict'

angular.module 'fundraiserApp'
.config ($stateProvider) ->
  $stateProvider.state 'media',
    url: '/admin/media'
    templateUrl: 'app/admin/media/media.html'
    controller: 'MediaCtrl'
