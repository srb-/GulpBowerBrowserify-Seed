
Item = require('./../models/item')
ItemsCollection = require('./../collections/items')
ItemView = require('./item')

class ItemsView extends Backbone.View
  
  events: 'click button': 'addItem'

  initialize: ->
    @collection = new ItemsCollection
    @.listenTo(@collection, 'add', @appendItem)
    @counter = 0
  
  render: ->
    $(@el).append '<button>Add Item to Collection</button>'
    $(@el).append '<ul></ul>'

  addItem: ->
    @counter++
    item = new Item
    item.set part2: "#{item.get 'part2'} #{@counter}"
    @collection.create(item.attributes)
  
  appendItem: (item) ->
    item_view = new ItemView(model: item)
    $('ul').append(item_view.render().el)


module.exports = ItemsView