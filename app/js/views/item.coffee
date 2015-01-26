class ItemView extends Backbone.View
  
  tagName: 'li'

  events:
    'click .swap': 'swap'
    'click .delete': 'remove'
  
  initialize: ->
    @model.bind 'change', @render
    @model.bind 'remove', @unrender
  

  render: =>
    $(@el).html """
      <span>#{@model.get 'part1'} #{@model.get 'part2'}!</span>
      <span class="swap">swap</span>
      <span class="delete">delete</span>
    """
    @
  

  unrender: =>
    $(@el).remove()
  

  swap: ->
    @model.set
      part1: @model.get 'part2'
      part2: @model.get 'part1'
  

  remove: -> @model.destroy()


module.exports = ItemView