
const mobile_header = document.getElementById('js-MobileHeader')
const path_map = {}

var last_scroll_top = 0;
var scrolled_down_to = 0;

function init(location) {

  //highlight correct section when location changes
  const DOM_links = Array.from(mobile_header.getElementsByTagName('a'))
  for ( let DOM_link of DOM_links ) {
    const path = DOM_link.getAttribute('href')
    path_map[path] = DOM_link
  }

  location.observe((location) => {
    for (const path in path_map) {
      path_map[path].classList.toggle('is-current', path == location.current.section)
    }
  })

  //hide or show self when user scrolls
  window.addEventListener('scroll', hide_or_show_self )
  hide_or_show_self()
}

function hide_or_show_self() {

  let scroll_top = window.pageYOffset
  let show_mobile_header = false

  if (scroll_top === 0) {
    //at top of page
    show_mobile_header = true
  
  } if (last_scroll_top < scroll_top) {
    //going down
    show_mobile_header = false
    scrolled_down_to = scroll_top

  } if (last_scroll_top > scroll_top) {
    //going up
    if (scrolled_down_to - 100 > scroll_top) {
      show_mobile_header = true
    }
  }
  last_scroll_top = scroll_top

  mobile_header.classList.toggle('is-visible', show_mobile_header)
}

export default init
