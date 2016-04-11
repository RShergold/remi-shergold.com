

var banner = document.getElementById('js-banner');
var rotation_frame = document.getElementById('js-scrollRotate')

function init(location) {
  window.addEventListener('scroll', on_scroll )

  location.observe(on_location_changed)
}


//event handlers
function on_scroll() {

  if (scroll_top() > window.innerHeight) return

  const percent = scroll_top() / (window.innerHeight / 2.5)
  const new_degree = 85 * percent

  if (new_degree < 85) {
    rotation_frame.style.transform = "rotateX(" + new_degree +"deg)"
    rotation_frame.style.opacity = 1 - percent
  } else {
    rotation_frame.style.transform = "rotateX(85deg)"
    rotation_frame.style.opacity = 0
  }

}

function on_location_changed(location) {
  
  if (location.moved_away_from_homepage() ) {
    //hide banner
    banner.removeAttribute('data-path')
    banner.style.display = 'none'
  }

  if ( location.moved_to_homepage() ) {
    //show banner
    banner.setAttribute('data-path','/')
    banner.style.display = 'flex'
    banner.classList.add('is-fadingIn')
  }
}

//helpers
function scroll_top() {
  //TODO i'm only targeting new browsers. How much of this do i need these days?
  return (window.pageYOffset !== undefined) 
            ? window.pageYOffset 
            : (document.documentElement || document.body.parentNode || document.body).scrollTop
}

export default init;
