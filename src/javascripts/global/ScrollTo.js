
function scroll_to(location) {

  var element;

  //location can be an element or a location object
  if (location.hasOwnProperty("current")) {
    try {
      element = document.querySelectorAll(`[data-path='${location.current.content_path}']`)[0]
    } catch (err) {
      throw `failed to find content path ${location.current.content_path}`
    }
  } else {
    element = location
  }


  const duration = 500, 
    start_pos = window.scrollY,
    end_pos = element.offsetTop,
    distance = end_pos - start_pos,
    start_time = Date.now(),
    end_time = start_time + duration;
  
  var animate_frame = function() {

    var now = Date.now(),
      percent = (now - start_time) / duration,
      ease_in = percent * percent,
      new_top = start_pos + (distance * ease_in);

    window.scrollTo(0, new_top)
    if (now >= end_time) {
      window.scrollTo(0, end_pos)
    } else {
      requestAnimationFrame(animate_frame);
    }
  };
  
  animate_frame();
  
}

export default scroll_to