
var _location = null;

function init(location) {
  _location = location
  create_waypoints()
}

function create_waypoints() {
  let pages = Array.from(document.querySelectorAll('[data-path]'))
  for ( let page of pages ) {
    new Waypoint({
      element: page,
      handler: scroll_handler,
      offset: '50%',
      group: 'pages'
    })
  }
}

function destroy_waypoints() {
  Waypoint.destroyAll()
}

function scroll_handler(direction) {
  const previous = this.previous()
  const current_page = (direction == 'up' && previous) ? previous : this
  const new_path = current_page.element.dataset.path
  _location.change_to(new_path, 'scroll')
}

export default init
export {create_waypoints, destroy_waypoints}