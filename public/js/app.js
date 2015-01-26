(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ItemsView, module2;

ItemsView = require('./views/items');

this.App = window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Events: {}
};

$(function() {
  var mainView, ref;
  console.log('initializing Backbone...');
  Backbone.history.start();
  mainView = new ItemsView;
  mainView.setElement($('.backbone'));
  mainView.render();
  ref = new Firebase("https://gulp-sandbox.firebaseio.com");
  return ref.authWithPassword({
    email: "test@test.com",
    password: "testtest"
  }, function(error, authData) {
    return console.log(error != null ? authData : 'logged in');
  });
});

console.log('WE are in MAIN.coffee!!!');

module2 = require('./module2');

module2.hello();

exports.foo = function(x) {
  return x * 10;
};



},{"./module2":4,"./views/items":6}],2:[function(require,module,exports){
var Item, Items,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Item = require('./../models/item');

Items = (function(_super) {
  __extends(Items, _super);

  function Items() {
    return Items.__super__.constructor.apply(this, arguments);
  }

  Items.prototype.model = Item;

  Items.prototype.url = 'https://gulp-sandbox.firebaseio.com/items';

  return Items;

})(Backbone.Firebase.Collection);

module.exports = Items;



},{"./../models/item":3}],3:[function(require,module,exports){
var Item,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Item = (function(_super) {
  __extends(Item, _super);

  function Item() {
    return Item.__super__.constructor.apply(this, arguments);
  }

  Item.prototype.defaults = {
    part1: 'Hello',
    part2: 'Backbone'
  };

  return Item;

})(Backbone.Model);

module.exports = Item;



},{}],4:[function(require,module,exports){
console.log('WE are in module2.coffee');

module.exports.hello = function() {
  return console.log('hello from a module yua!');
};



},{}],5:[function(require,module,exports){
var ItemView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ItemView = (function(_super) {
  __extends(ItemView, _super);

  function ItemView() {
    this.unrender = __bind(this.unrender, this);
    this.render = __bind(this.render, this);
    return ItemView.__super__.constructor.apply(this, arguments);
  }

  ItemView.prototype.tagName = 'li';

  ItemView.prototype.events = {
    'click .swap': 'swap',
    'click .delete': 'remove'
  };

  ItemView.prototype.initialize = function() {
    this.model.bind('change', this.render);
    return this.model.bind('remove', this.unrender);
  };

  ItemView.prototype.render = function() {
    $(this.el).html("<span>" + (this.model.get('part1')) + " " + (this.model.get('part2')) + "!</span>\n<span class=\"swap\">swap</span>\n<span class=\"delete\">delete</span>");
    return this;
  };

  ItemView.prototype.unrender = function() {
    return $(this.el).remove();
  };

  ItemView.prototype.swap = function() {
    return this.model.set({
      part1: this.model.get('part2'),
      part2: this.model.get('part1')
    });
  };

  ItemView.prototype.remove = function() {
    return this.model.destroy();
  };

  return ItemView;

})(Backbone.View);

module.exports = ItemView;



},{}],6:[function(require,module,exports){
var Item, ItemView, ItemsCollection, ItemsView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Item = require('./../models/item');

ItemsCollection = require('./../collections/items');

ItemView = require('./item');

ItemsView = (function(_super) {
  __extends(ItemsView, _super);

  function ItemsView() {
    return ItemsView.__super__.constructor.apply(this, arguments);
  }

  ItemsView.prototype.events = {
    'click button': 'addItem'
  };

  ItemsView.prototype.initialize = function() {
    this.collection = new ItemsCollection;
    this.listenTo(this.collection, 'add', this.appendItem);
    return this.counter = 0;
  };

  ItemsView.prototype.render = function() {
    $(this.el).append('<button>Add Item to Collection</button>');
    return $(this.el).append('<ul></ul>');
  };

  ItemsView.prototype.addItem = function() {
    var item;
    this.counter++;
    item = new Item;
    item.set({
      part2: "" + (item.get('part2')) + " " + this.counter
    });
    return this.collection.create(item.attributes);
  };

  ItemsView.prototype.appendItem = function(item) {
    var item_view;
    item_view = new ItemView({
      model: item
    });
    return $('ul').append(item_view.render().el);
  };

  return ItemsView;

})(Backbone.View);

module.exports = ItemsView;



},{"./../collections/items":2,"./../models/item":3,"./item":5}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zYmVhdGgvdG1wL2dpdGh1YnMvR3VscEJvd2VyQnJvd3NlcmlmeS1TZWVkL2FwcC9qcy9tYWluLmNvZmZlZSIsIi9ob21lL3NiZWF0aC90bXAvZ2l0aHVicy9HdWxwQm93ZXJCcm93c2VyaWZ5LVNlZWQvYXBwL2pzL2NvbGxlY3Rpb25zL2l0ZW1zLmNvZmZlZSIsIi9ob21lL3NiZWF0aC90bXAvZ2l0aHVicy9HdWxwQm93ZXJCcm93c2VyaWZ5LVNlZWQvYXBwL2pzL21vZGVscy9pdGVtLmNvZmZlZSIsIi9ob21lL3NiZWF0aC90bXAvZ2l0aHVicy9HdWxwQm93ZXJCcm93c2VyaWZ5LVNlZWQvYXBwL2pzL21vZHVsZTIuY29mZmVlIiwiL2hvbWUvc2JlYXRoL3RtcC9naXRodWJzL0d1bHBCb3dlckJyb3dzZXJpZnktU2VlZC9hcHAvanMvdmlld3MvaXRlbS5jb2ZmZWUiLCIvaG9tZS9zYmVhdGgvdG1wL2dpdGh1YnMvR3VscEJvd2VyQnJvd3NlcmlmeS1TZWVkL2FwcC9qcy92aWV3cy9pdGVtcy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNDQSxJQUFBLGtCQUFBOztBQUFBLFNBQUEsR0FBWSxPQUFBLENBQVEsZUFBUixDQUFaLENBQUE7O0FBQUEsSUFJQyxDQUFBLEdBQUQsR0FBTyxNQUFNLENBQUMsR0FBUCxHQUNMO0FBQUEsRUFBQSxNQUFBLEVBQVEsRUFBUjtBQUFBLEVBQ0EsV0FBQSxFQUFhLEVBRGI7QUFBQSxFQUVBLEtBQUEsRUFBTyxFQUZQO0FBQUEsRUFHQSxPQUFBLEVBQVMsRUFIVDtBQUFBLEVBSUEsTUFBQSxFQUFRLEVBSlI7Q0FMRixDQUFBOztBQUFBLENBWUEsQ0FBRSxTQUFBLEdBQUE7QUFDQSxNQUFBLGFBQUE7QUFBQSxFQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksMEJBQVosQ0FBQSxD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OzttQkFBQTs7R0FGc0IsUUFBUSxDQUFDLEtBSmpDLENBQUE7O0FBQUEsTUE0Qk0sQ0FBQyxPQUFQLEdBQWlCLFNBNUJqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuSXRlbXNWaWV3ID0gcmVxdWlyZSgnLi92aWV3cy9pdGVtcycpXG5cblxuXG5AQXBwID0gd2luZG93LkFwcCA9XG4gIE1vZGVsczoge31cbiAgQ29sbGVjdGlvbnM6IHt9XG4gIFZpZXdzOiB7fVxuICBSb3V0ZXJzOiB7fVxuICBFdmVudHM6IHt9XG5cblxuJCAtPlxuICBjb25zb2xlLmxvZyAnaW5pdGlhbGl6aW5nIEJhY2tib25lLi4uJ1xuXG4gIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKVxuXG4gIG1haW5WaWV3ID0gbmV3IEl0ZW1zVmlld1xuICBtYWluVmlldy5zZXRFbGVtZW50KCQoJy5iYWNrYm9uZScpKVxuICBtYWluVmlldy5yZW5kZXIoKVxuXG5cblxuXG5cblxuXG4gIHJlZiA9IG5ldyBGaXJlYmFzZShcImh0dHBzOi8vZ3VscC1zYW5kYm94LmZpcmViYXNlaW8uY29tXCIpXG5cbiAgcmVmLmF1dGhXaXRoUGFzc3dvcmQgeyBlbWFpbDogXCJ0ZXN0QHRlc3QuY29tXCIsIHBhc3N3b3JkOiBcInRlc3R0ZXN0XCIgfSwgKGVycm9yLCBhdXRoRGF0YSkgLT5cbiAgICBjb25zb2xlLmxvZyBpZiBlcnJvcj8gdGhlbiBhdXRoRGF0YSBlbHNlICdsb2dnZWQgaW4nXG5cblxuICBcblxuICAjIHJlZi5jcmVhdGVVc2VyIHsgZW1haWw6IFwiY3JlYXRlZEB0ZXN0LmNvbVwiLCBwYXNzd29yZDogXCJ0ZXN0dGVzdFwiIH0sIChlcnJvciwgYXV0aERhdGEpIC0+XG4gICMgICBjb25zb2xlLmxvZyBhdXRoRGF0YSB1bmxlc3MgZXJyb3I/XG4gIFxuXG4gICMgcmVmLnJlbW92ZVVzZXIgeyBlbWFpbDogXCJjcmVhdGVkQHRlc3QuY29tXCIsIHBhc3N3b3JkOiBcInRlc3R0ZXN0XCIgfSwgKGVycm9yLCBhdXRoRGF0YSkgLT5cbiAgIyAgIGNvbnNvbGUubG9nIGF1dGhEYXRhIHVubGVzcyBlcnJvcj9cbiAgXG5cblxuXG5cblxuXG5cblxuIyAtLS0tLS0tLS0gb2xkZXIgc3R1ZmYgaWdub3JlIFxuXG5jb25zb2xlLmxvZyAnV0UgYXJlIGluIE1BSU4uY29mZmVlISEhJ1xuXG5tb2R1bGUyID0gcmVxdWlyZSAnLi9tb2R1bGUyJ1xuXG5tb2R1bGUyLmhlbGxvKClcblxuXG5leHBvcnRzLmZvbyA9ICh4KSAtPlxuICB4ICogMTBcblxuI2ZvbygnSGVsbG8sIHdvcmxkISBhYScpXG5cblxuXG5cblxuXG4jICB3aW5kb3cuQXBwLnJvdXRlck1haW4gPSBuZXcgQXBwLlJvdXRlcnMuUmVudGFsVHJhY2tSb3V0ZXIoKVxuIyAgICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydFxuIyAgICAgICBwdXNoU3RhdGU6IHRydWVcbiMgICAgICAgcm9vdDogXCIvYXBwL1wiXG5cblxuXG5cblxuIyBBcHAuaW5pdCgpXG5cblxuIiwiXG5JdGVtID0gcmVxdWlyZSgnLi8uLi9tb2RlbHMvaXRlbScpXG5cbmNsYXNzIEl0ZW1zIGV4dGVuZHMgQmFja2JvbmUuRmlyZWJhc2UuQ29sbGVjdGlvblxuXG5cdG1vZGVsOiBJdGVtXG5cdHVybDogJ2h0dHBzOi8vZ3VscC1zYW5kYm94LmZpcmViYXNlaW8uY29tL2l0ZW1zJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1zIiwiXG5jbGFzcyBJdGVtIGV4dGVuZHMgQmFja2JvbmUuTW9kZWxcblxuXHRkZWZhdWx0czogXG5cdFx0cGFydDE6ICdIZWxsbydcblx0XHRwYXJ0MjogJ0JhY2tib25lJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW0iLCIjIC8qIEBmbG93ICovXG4jIGZ1bmN0aW9uIGZvbyh4KSB7XG4jICAgcmV0dXJuIHggKiAxMDtcbiMgfVxuIyBmb28oJ0hlbGxvLCB3b3JsZCEnKTtcblxuY29uc29sZS5sb2cgJ1dFIGFyZSBpbiBtb2R1bGUyLmNvZmZlZSdcblxuXG5tb2R1bGUuZXhwb3J0cy5oZWxsbyA9ICgpIC0+XG4gIGNvbnNvbGUubG9nICdoZWxsbyBmcm9tIGEgbW9kdWxlIHl1YSEnXG5cbiNmb28oJ0hlbGxvLCB3b3JsZCEgYWEnKSIsImNsYXNzIEl0ZW1WaWV3IGV4dGVuZHMgQmFja2JvbmUuVmlld1xuICBcbiAgdGFnTmFtZTogJ2xpJ1xuXG4gIGV2ZW50czpcbiAgICAnY2xpY2sgLnN3YXAnOiAnc3dhcCdcbiAgICAnY2xpY2sgLmRlbGV0ZSc6ICdyZW1vdmUnXG4gIFxuICBpbml0aWFsaXplOiAtPlxuICAgIEBtb2RlbC5iaW5kICdjaGFuZ2UnLCBAcmVuZGVyXG4gICAgQG1vZGVsLmJpbmQgJ3JlbW92ZScsIEB1bnJlbmRlclxuICBcblxuICByZW5kZXI6ID0+XG4gICAgJChAZWwpLmh0bWwgXCJcIlwiXG4gICAgICA8c3Bhbj4je0Btb2RlbC5nZXQgJ3BhcnQxJ30gI3tAbW9kZWwuZ2V0ICdwYXJ0Mid9ITwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic3dhcFwiPnN3YXA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiPmRlbGV0ZTwvc3Bhbj5cbiAgICBcIlwiXCJcbiAgICBAXG4gIFxuXG4gIHVucmVuZGVyOiA9PlxuICAgICQoQGVsKS5yZW1vdmUoKVxuICBcblxuICBzd2FwOiAtPlxuICAgIEBtb2RlbC5zZXRcbiAgICAgIHBhcnQxOiBAbW9kZWwuZ2V0ICdwYXJ0MidcbiAgICAgIHBhcnQyOiBAbW9kZWwuZ2V0ICdwYXJ0MSdcbiAgXG5cbiAgcmVtb3ZlOiAtPiBAbW9kZWwuZGVzdHJveSgpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBJdGVtVmlldyIsIlxuSXRlbSA9IHJlcXVpcmUoJy4vLi4vbW9kZWxzL2l0ZW0nKVxuSXRlbXNDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi8uLi9jb2xsZWN0aW9ucy9pdGVtcycpXG5JdGVtVmlldyA9IHJlcXVpcmUoJy4vaXRlbScpXG5cbmNsYXNzIEl0ZW1zVmlldyBleHRlbmRzIEJhY2tib25lLlZpZXdcbiAgXG4gIGV2ZW50czogJ2NsaWNrIGJ1dHRvbic6ICdhZGRJdGVtJ1xuXG4gIGluaXRpYWxpemU6IC0+XG4gICAgQGNvbGxlY3Rpb24gPSBuZXcgSXRlbXNDb2xsZWN0aW9uXG4gICAgQC5saXN0ZW5UbyhAY29sbGVjdGlvbiwgJ2FkZCcsIEBhcHBlbmRJdGVtKVxuICAgIEBjb3VudGVyID0gMFxuICBcbiAgcmVuZGVyOiAtPlxuICAgICQoQGVsKS5hcHBlbmQgJzxidXR0b24+QWRkIEl0ZW0gdG8gQ29sbGVjdGlvbjwvYnV0dG9uPidcbiAgICAkKEBlbCkuYXBwZW5kICc8dWw+PC91bD4nXG5cbiAgYWRkSXRlbTogLT5cbiAgICBAY291bnRlcisrXG4gICAgaXRlbSA9IG5ldyBJdGVtXG4gICAgaXRlbS5zZXQgcGFydDI6IFwiI3tpdGVtLmdldCAncGFydDInfSAje0Bjb3VudGVyfVwiXG4gICAgQGNvbGxlY3Rpb24uY3JlYXRlKGl0ZW0uYXR0cmlidXRlcylcbiAgXG4gIGFwcGVuZEl0ZW06IChpdGVtKSAtPlxuICAgIGl0ZW1fdmlldyA9IG5ldyBJdGVtVmlldyhtb2RlbDogaXRlbSlcbiAgICAkKCd1bCcpLmFwcGVuZChpdGVtX3ZpZXcucmVuZGVyKCkuZWwpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBJdGVtc1ZpZXciXX0=
