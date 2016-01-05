var admin = admin || {};

admin.markdown_ajax = {

  _preview_button: document.getElementById('js-getMarkdownPreview'),
  _markdown_input: document.getElementById('js-markdown'),
  _preview_frame: document.getElementById('js-preview'),

  init: function() {
    if (this._preview_button) {
      this._preview_button.onmouseenter = this._get_preview.bind(this);
    }
  },

  _get_preview: function(e) {
    var data = new FormData();
    data.append('markdown', this._markdown_input.value);

    var xhr = new XMLHttpRequest();
    xhr.onload = this._preview_downloaded.bind(this);
    xhr.open('POST', '/ajax/markdown', true);
    xhr.send(data);
  },

  _preview_downloaded: function(e) {
    this._preview_frame.innerHTML = e.srcElement.responseText;
    var code_blocks = admin.markdown_ajax._preview_frame.getElementsByTagName('code');
    for (var i=0; code_blocks.length; i++) {
      hljs.highlightBlock(code_blocks[i]);
    }
  }
}