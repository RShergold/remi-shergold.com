
const nav_element = document.getElementById('js-sideNav')
const container_element = document.getElementById('js-sideNavContainer')
const path_map = {}

function init(location) {

  new Waypoint({
    element: container_element,
    handler: (direction) => nav_element.classList.toggle('is-fixed',(direction=='down'))
  })

  const DOM_links = Array.from(nav_element.getElementsByTagName('a'))
  for ( let DOM_link of DOM_links ) {
    const path = DOM_link.getAttribute('href')
    path_map[path] = DOM_link
  }

  location.observe(on_location_change)
}

function on_location_change(location) {

  for (const path in path_map) {
    path_map[path].classList.toggle('is-current', path == location.section)
  }

  //nav_element.classList.toggle('is-fixed', location.is_homepage_banner === false)
}

export default init