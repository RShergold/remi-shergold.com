var app = app || {};

app.scroll_manager = {

  waypoints: [],

  init: function() {
    this.create_waypoints();
  },

  create_waypoints: function() {
    let pages = Array.from(document.querySelectorAll('[data-path]'));
    for ( let page of pages ) {
      this.waypoints.push(new Waypoint({
        element: page,
        handler: this._scroll_handler,
        offset: '50%',
        group: 'pages'
      }));
    }
  },

  destroy_waypoints: function() {
    for (let waypoint of this.waypoints) {
      waypoint.destroy();
    }
  },

  _scroll_handler: function(direction) {
    if (app.state.is_admin_area) return;
    const current_page = (direction == 'down') ? this : this.previous();
    if (current_page && current_page.element.dataset.path != app.state.path) {
      const new_state = new State( current_page.element.dataset.path, !app.state.depth );
      new_state.announce();
    }
  }

}
