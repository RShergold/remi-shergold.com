var app = app || {};

app.sideNav = (function(){

  
  const _side_nav_container = document.getElementById('js-sideNavContainer');
  const _side_nav = document.getElementById('js-sideNav');

  //create waypoint
  const waypoint = new Waypoint({
    element: _side_nav_container,
    handler: (direction) => _side_nav.classList.toggle('is-fixed',(direction=='down'))
  })

  //create link map
  var path_map = {};
  const links = Array.from(_side_nav.getElementsByTagName('a'));
  for ( let link of links ) {
    const path = link.getAttribute('href');
    path_map[path] = link;
  }

  //listen for changes to state
  document.addEventListener('onstatechange',function(e){
    const new_path = e.detail.active_path.replace(/^\/([^\/]*).*$/, '/$1'); //get the first part of path
    for ( var path in path_map ) {
      path_map[path].classList.toggle('is-current', path == new_path)
    }
  });

}());