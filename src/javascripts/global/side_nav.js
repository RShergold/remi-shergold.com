var app = app || {};

app.side_nav = {

  _nav_element: document.getElementById('js-sideNav'),
  _container_element: document.getElementById('js-sideNavContainer'),
  _path_map: {},

  init: function() {
    new Waypoint({
      element: this._container_element,
      handler: (direction) => this._nav_element.classList.toggle('is-fixed',(direction=='down'))
    })

    const links = Array.from(this._nav_element.getElementsByTagName('a'));
    for ( let link of links ) {
      const path = link.getAttribute('href');
      this._path_map[path] = link;
    }

    document.addEventListener('onstatechange', this._state_changed.bind(this));
  },

  _state_changed: function(e) {
    const new_path = e.detail.path.replace(/^\/([^\/]*).*$/, '/$1'); //get the first part of path
    for ( let path in this._path_map ) {
      this._path_map[path].classList.toggle('is-current', path == new_path)
    }
    if (!e.detail.is_home_scroll_event) {
      this._nav_element.classList.toggle('is-fixed',e.detail.depth)
    }
  }
  
}
