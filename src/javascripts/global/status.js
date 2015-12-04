var app = app || {};

app.status = {

  stage_element: document.getElementById('js-stage'),
  downloading_element: null,

  init: function() {
    this.downloading_element =  document.createElement('span');
    this.downloading_element.innerText = 'Downloading';
    
    document.addEventListener('ondownloadbegin', this._download_begin.bind(this) );
    document.addEventListener('ondownloadfinish', this._download_finished.bind(this) );
  },

  _download_begin: function(e) {
    if (app.state.depth == 2 && e.detail.depth == 2) {
      this.downloading_element.className = 'Status Status--bottom is-downloading';
      this.stage_element.appendChild( this.downloading_element );
      app.scroll_to( this.downloading_element );
    } else {
      this.downloading_element.className = 'Status Status--fullScreen is-downloading';
      this.stage_element.appendChild( this.downloading_element );
    }
    

  },

  _download_finished: function(e) {
    this.stage_element.removeChild( this.downloading_element );
  }
}