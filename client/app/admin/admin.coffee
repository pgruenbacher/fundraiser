'use strict'

angular.module 'fundraiserApp'
.config ($stateProvider) ->
  $stateProvider
  .state 'admin',
    url: '/admin'
    templateUrl: 'app/admin/admin.html'
    controller: 'AdminCtrl'
