
var rotation_frame = document.getElementById('js-scrollRotate')



function init(location) {
  window.addEventListener('scroll', on_scroll )

  location.observe(on_location_changed)
}


//event handlers
function on_scroll() {

  if (scroll_top() > window.innerHeight) return;

  const percent = scroll_top() / (window.innerHeight / 2.5);
  const new_degree = 85 * percent;

  if (new_degree < 85) {
    rotation_frame.style.transform = "rotateX(" + new_degree +"deg)";
    rotation_frame.style.opacity = 1 - percent;
  } else {
    rotation_frame.style.transform = "rotateX(85deg)";
    rotation_frame.style.opacity = 0;
  }

}

function on_location_changed(app_state) {
  //foo
}

//helpers
function scroll_top() {
  return (window.pageYOffset !== undefined) 
            ? window.pageYOffset 
            : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

export default init;