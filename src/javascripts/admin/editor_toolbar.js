var admin = admin || {};

admin.editor_toolbar = {

  _input_frame: document.getElementById('js-inputFrame'),

  init: function() {
    if ('r_markdown' in window) {
      r_markdown.onchange = r_preview.onchange = r_description.onchange = this._radio_changed.bind(this);
    }
  },

  _radio_changed: function(e) {
    this._input_frame.className = 'Input is-showing-' + e.target.id.slice(2);
  }
}