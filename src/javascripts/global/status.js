var app = app || {};

app.status = {

  //stage_element: document.getElementById('js-stage'),
  element: null,
  message: null,

  init: function() {
    this.create_element()
    document.addEventListener('ondownloadbegin', this._download_begin.bind(this) );
    document.addEventListener('ondownloadfinish', this._download_finished.bind(this) );
  },

  create_element: function() {
    this.element = document.createElement('div');
    this.element.innerHTML = '<i class="Status-icon"></i><span class="Status-message"></span>';
    this.message = this.element.getElementsByClassName('Status-message')[0];
  },

  error: function(error) {
      this.element.classList.remove('is-downloading');
      this.element.classList.add('is-error');
      this.message.innerText = error;
  },

  _download_begin: function(e) {

    this.message.innerText = 'Loading...';
    this.element.className = 'Status is-downloading';

    if (app.state.is_post && e.detail.is_post) {
      // inline status box
      this.element.classList.add('Status--bottom');
      app.stage.add_status(this.element, 1);
      app.scroll_to( this.element );
    } else {
      //center status box
      this.element.classList.add('Status--fullScreen');
      app.stage.add_status(this.element, 0);
    }
    /*
    if (app.state.depth == 2 && e.detail.depth == 2) {
      this.element.className = 'Status Status--bottom is-downloading';
      this.stage_element.appendChild( this.element );
      app.scroll_to( this.element );
    } else {
      this.element.className = 'Status Status--fullScreen is-downloading';
      this.stage_element.appendChild( this.element );
    }*/
  },

  _download_finished: function(e) {
    this.stage_element.removeChild( this.element );
  }
}