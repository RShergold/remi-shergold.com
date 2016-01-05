var admin = admin || {};

admin.textarea_min_height = {

  init: function() {
    var textareas = document.querySelectorAll('textarea[data-min-height]');
    for (var i=0; i<textareas.length; i++) {
      textareas[i].oninput = this._textarea_changed;
      this._textarea_changed.bind(textareas[i])();
    }
  },

  _textarea_changed: function(e) {
    this.style.height = '1px';
    var min_height = this.dataset.minHeight,
      new_height = (this.scrollHeight > min_height) ? this.scrollHeight : min_height;
    this.style.height = new_height + 'px';
  }
}