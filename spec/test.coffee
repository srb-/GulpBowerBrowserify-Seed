
moduleToTest = require('../app/js/flow2')

describe "OMG a JavaScript Test", ->
  it "should pass", ->
    expect(moduleToTest.timesTen(10)).toBe(100)

  # it "should fail", ->
  #   expect(moduleToTest.timesTen(10)).toBe(900)    
