'use strict'

describe 'Directive: ticker', ->

  # load the directive's module
  beforeEach module 'fundraiserApp'
  element = undefined
  scope = undefined
  beforeEach inject ($rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<ticker></ticker>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the ticker directive'
