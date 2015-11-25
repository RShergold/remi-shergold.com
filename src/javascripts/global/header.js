var app = app || {};

app.header = {

  _rotation_frame: document.getElementById('js-scrollRotate'),

  init: function() {
    if (this._rotation_frame) {
      window.addEventListener('scroll', this._on_scroll.bind(this) );
    }
    document.addEventListener('onstatechange', this._on_state_change.bind(this) );
  },

  _on_scroll: function() {

    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var middle = window.innerHeight / 2.5;
    if (scrollTop > window.innerHeight) return;
    
    var percent = scrollTop / middle;
    var new_degree = 85 * percent;

    if (new_degree < 85) {
      this._rotation_frame.style.transform = "rotateX(" + new_degree +"deg)";
      this._rotation_frame.style.opacity = 1 - percent;
    } else {
      this._rotation_frame.style.transform = "rotateX(85deg)";
      this._rotation_frame.style.opacity = 0;
    }
  },

  _on_state_change: function(e) {
    if (!e.detail.is_home_scroll_event) {
      //TODO make more fancy
      setTimeout(function() { 
        document.getElementById('js-header').style.display = (e.detail.depth) ? 'none' : 'flex';
      }, 500);
    }
  }

}