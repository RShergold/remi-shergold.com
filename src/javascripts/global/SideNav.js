
const nav_element = document.getElementById('js-sideNav')
const container_element = document.getElementById('js-sideNavContainer')
const path_map = {}

var trigger_fixed_waypoint = null

function init(location) {

  if (location.current.window_is_home()) {
    add_homepage_waypoint()
  }

  const DOM_links = Array.from(nav_element.getElementsByTagName('a'))
  for ( let DOM_link of DOM_links ) {
    const path = DOM_link.getAttribute('href')
    path_map[path] = DOM_link
  }

  location.observe(on_location_change)
}

function add_homepage_waypoint() {
  trigger_fixed_waypoint = new Waypoint({
    element: container_element,
    handler: (direction) => nav_element.classList.toggle('is-fixed',(direction=='down'))
  })
}

function remove_homepage_waypoint() {
  if (trigger_fixed_waypoint) {
    trigger_fixed_waypoint.destroy()
    trigger_fixed_waypoint = null
  }
}

function on_location_change(location) {

  if ( location.moved_to_homepage() ) {
    nav_element.classList.remove('is-fixed')
    //scrollManager has been notified of location change
    //and is deleting all waypoints. make sure add_homepage_waypoint
    //is called at the end of the stack
    setTimeout( add_homepage_waypoint , 0);
  } 

  if ( location.moved_away_from_homepage() ) {
    remove_homepage_waypoint()
  }

  for (const path in path_map) {
    path_map[path].classList.toggle('is-current', path == location.current.section)
  }

  //nav_element.classList.toggle('is-fixed', location.is_homepage_banner === false)
}

export default init
