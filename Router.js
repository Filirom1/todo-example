xx.Router = Backbone.Router.extend({

  initialize: function(){
    this.createAppView();
    this.renderAppView();
  },

  createAppView: function(){
    // Finally, we kick things off by creating the **App**.
    xx.view.app = new xx.view.AppView({el: '#todoapp'});
  },

  renderAppView: function(){
  }

});

$(function(){
  xx.router = new xx.Router();
});
