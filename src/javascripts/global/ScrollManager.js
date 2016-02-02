
const waypoints = []
var _location = null;

function init(location) {
  _location = location
  create_waypoints()
}

function create_waypoints() {
  let pages = Array.from(document.querySelectorAll('[data-path]'))
  for ( let page of pages ) {
    waypoints.push(new Waypoint({
      element: page,
      handler: scroll_handler,
      offset: '50%',
      group: 'pages'
    }))
  }
}

function scroll_handler(direction) {
  
  const current_page = (direction == 'down') ? this : this.previous()
  const new_path = current_page.element.dataset.path
  _location.change_to(new_path);
}

export default init