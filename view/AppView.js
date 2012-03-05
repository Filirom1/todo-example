// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
xx.view.AppView = Backbone.View.extend({

  // Instead of generating a new element, bind to the existing skeleton of
  // the App already present in the HTML.
  el: "",

  // Delegated events for creating new items, and clearing completed ones.
  events: {
    "keypress #new-todo":  "createOnEnter",
    "keyup #new-todo":     "showTooltip",
    "click .todo-clear a": "clearCompleted",
    "click .mark-all-done": "toggleAllComplete"
  },

  // We will bind this view on the event of this collection
  collection: xx.model.todos,

  // At initialization we bind to the relevant events on the `this.collection`
  // collection, when items are added or changed. Kick things off by
  // loading any preexisting todos that might be saved in *localStorage*.
  initialize: function() {
    _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');

    this.input = this.$("#new-todo");
    this.allCheckbox = this.$(".mark-all-done")[0];

    this.collection.bind('add',     this.addOne);
    this.collection.bind('reset',   this.addAll);
    this.collection.bind('all',     this.render);

    this.statsView = new xx.view.StatsView({el: this.$('#todo-stats')});
    this.collection.fetch();
  },

  // Refresh checkboxs
  render: function() {
    var remaining = this.collection.remaining().length;
    this.allCheckbox.checked = !remaining;
  },

  // Add a single todo item to the list by creating a view for it, and
  // appending its element to the `<ul>`.
  addOne: function(todo) {
    var view = new xx.view.TodoView({model: todo});
    this.$("#todo-list").append(view.render().el);
  },

  // Add all items in the **this.collection** collection at once.
  addAll: function() {
    this.collection.each(this.addOne);
  },

  // Generate the attributes for a new Todo item.
  newAttributes: function() {
    return {
      content: this.input.val(),
      order:   this.collection.nextOrder(),
      done:    false
    };
  },

  // If you hit return in the main input field, create new **Todo** model,
  // persisting it to *localStorage*.
  createOnEnter: function(e) {
    if (e.keyCode != 13) return;
    this.collection.create(this.newAttributes());
    this.input.val('');
  },

  // Clear all done todo items, destroying their models.
  clearCompleted: function() {
    _.each(this.collection.done(), function(todo){ todo.clear(); });
    return false;
  },

  // Lazily show the tooltip that tells you to press `enter` to save
  // a new todo item, after one second.
  showTooltip: function(e) {
    var tooltip = this.$(".ui-tooltip-top");
    var val = this.input.val();
    tooltip.fadeOut();
    if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
    if (val == '' || val == this.input.attr('placeholder')) return;
    var show = function(){ tooltip.show().fadeIn(); };
    this.tooltipTimeout = _.delay(show, 1000);
  },

  toggleAllComplete: function () {
    var done = this.allCheckbox.checked;
    this.collection.each(function (todo) { todo.save({'done': done}); });
  }

});
