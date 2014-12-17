'use strict'

describe 'Directive: twitter', ->

  # load the directive's module and view
  beforeEach module 'fundraiserApp'
  beforeEach module 'components/twitter/twitter.html'
  element = undefined
  scope = undefined
  beforeEach inject ($rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<twitter></twitter>'
    element = $compile(element) scope
    scope.$apply()
    expect(element.text()).toBe 'this is the twitter directive'

