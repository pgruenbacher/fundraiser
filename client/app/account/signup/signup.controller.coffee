'use strict'

angular.module 'fundraiserApp'
.controller 'SignupCtrl', ($scope, Auth, $location, $window) ->
  $scope.user = {}
  $scope.errors = {}
  stripe={}

  $scope.register = (form) ->
    $scope.submitted = true

    if form.$valid
      # Account created, redirect to home
      Auth.createUser
        name: $scope.user.name
        email: $scope.user.email
        password: $scope.user.password

      .then ->
        $location.path '/'

      .catch (err) ->
        err = err.data
        $scope.errors = {}

        # Update validity of form fields that match the mongoose errors
        angular.forEach err.errors, (error, field) ->
          form[field].$setValidity 'mongoose', false
          $scope.errors[field] = error.message

  $scope.loginOauth = (provider) ->
    user=$scope.user
    # url=$location.path('/auth/'+provider).search(user)
    url='/auth/'+provider+'/?'+decodeURIComponent($.param(user))
    console.log url;
    # console.log url, user
    $window.location.href = url
