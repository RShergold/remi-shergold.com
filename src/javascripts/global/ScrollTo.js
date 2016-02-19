
function scroll_to(location) {

  try {
    var element = document.querySelectorAll(`[data-path='${location.current.content_path}']`)[0]
  } catch (err) {
    throw `failed to find content path ${location.current.content_path}`
  }

  const duration = 500, 
    start_pos = document.body.scrollTop,
    end_pos = element.offsetTop,
    distance = end_pos - start_pos,
    start_time = Date.now(),
    end_time = start_time + duration;
  
  const requestAnimFrame = (function(){
    //TODO i'm only targeting new browsers so how much of this do I need?
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
  })();
  
  var animate_frame = function() {

    var now = Date.now(),
      percent = (now - start_time) / duration,
      ease_in = percent * percent,
      new_top = start_pos + (distance * ease_in);
    document.body.scrollTop = new_top;
    
    if (now >= end_time) {
      document.body.scrollTop = end_pos;
    } else {
      requestAnimFrame(animate_frame);
    }
  };
  
  animate_frame();
  
}

export default scroll_to