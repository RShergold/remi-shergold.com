(function(){

  const rotation_frame = document.getElementById('js-scrollRotate');
  const header = document.getElementById('js-header');

  var on_scroll = function() {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    var middle = window.innerHeight / 2.5;

    if (scrollTop > window.innerHeight) return;
    
    var percent = scrollTop / middle;
    var new_degree = 85 * percent;

    if (new_degree < 85) {
      rotation_frame.style.transform = "rotateX(" + new_degree +"deg)";
      rotation_frame.style.opacity = 1 - percent;
    } else {
      rotation_frame.style.transform = "rotateX(85deg)";
      rotation_frame.style.opacity = 0;
    }
  }

  if (rotation_frame) {
    window.addEventListener('scroll', on_scroll);
  }

  //listen for changes to state
  document.addEventListener('onstatechange',function(e){
    //TODO make more fancy
    setTimeout(function() { 
      header.style.display = (e.detail.depth) ? 'none' : 'flex';
    }, 500);
  });
  
}());