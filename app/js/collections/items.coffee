
Item = require('./../models/item')

class Items extends Backbone.Firebase.Collection

	model: Item
	url: 'https://gulp-sandbox.firebaseio.com/items'

module.exports = Items