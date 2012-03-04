(function(){ window.JST || (window.JST = {}) 

JST["item-template"] = function anonymous(obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('<div class="todo ', done ? 'done' : '' ,'">\n  <div class="display">\n    <input class="check" type="checkbox" ', done ? 'checked="checked"' : '' ,' />\n    <label class="todo-content">', content ,'</label>\n    <span class="todo-destroy"></span>\n  </div>\n  <div class="edit">\n    <input class="todo-input" type="text" value="', content ,'" />\n  </div>\n</div>\n');}return __p.join('');
};


JST["stats-template"] = function anonymous(obj,_) {
var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(''); if (total) { ;__p.push('\n  <span class="todo-count">\n    <span class="number">', remaining ,'</span>\n    <span class="word">', remaining == 1 ? 'item' : 'items' ,'</span> left.\n  </span>\n'); } ;__p.push('\n'); if (done) { ;__p.push('\n  <span class="todo-clear">\n    <a href="#">\n      Clear <span class="number-done">', done ,'</span>\n      completed <span class="word-done">', done == 1 ? 'item' : 'items' ,'</span>\n    </a>\n  </span>\n'); } ;__p.push('\n');}return __p.join('');
};


})();