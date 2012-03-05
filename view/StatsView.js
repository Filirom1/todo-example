xx.view.StatsView = Backbone.View.extend({
  // We will bind this view on the event of this collection
  collection: xx.model.todos,

  // Our template for the line of statistics at the bottom of the app.
  template: JST['stats-template'],

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('all', this.render);
  },
  // Re-rendering the App just means refreshing the statistics -- the rest
  // of the app doesn't change.
  render: function() {
    var done = this.collection.done().length;
    var remaining = this.collection.remaining().length;

    this.$el.html(this.template({
      total:      this.collection.length,
      done:       done,
      remaining:  remaining
    }));
  },
});
