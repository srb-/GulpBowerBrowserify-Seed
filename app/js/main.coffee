
ItemsView = require('./views/items')



@App = window.App =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  Events: {}


$ ->
  console.log 'initializing Backbone...'

  Backbone.history.start()

  mainView = new ItemsView
  mainView.setElement($('.backbone'))
  mainView.render()







  ref = new Firebase("https://gulp-sandbox.firebaseio.com")

  ref.authWithPassword { email: "test@test.com", password: "testtest" }, (error, authData) ->
    console.log if error? then authData else 'logged in'


  

  # ref.createUser { email: "created@test.com", password: "testtest" }, (error, authData) ->
  #   console.log authData unless error?
  

  # ref.removeUser { email: "created@test.com", password: "testtest" }, (error, authData) ->
  #   console.log authData unless error?
  








# --------- older stuff ignore 

console.log 'WE are in MAIN.coffee!!!'

module2 = require './module2'

module2.hello()


exports.foo = (x) ->
  x * 10

#foo('Hello, world! aa')






#  window.App.routerMain = new App.Routers.RentalTrackRouter()
#     Backbone.history.start
#       pushState: true
#       root: "/app/"





# App.init()


