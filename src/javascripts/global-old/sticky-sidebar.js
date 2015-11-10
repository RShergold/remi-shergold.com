(function() {

  var waypoint = new Waypoint({
    element: document.getElementById('js-stickySidebar'),
    handler: function(direction) {

      var SideNav = this.element.getElementsByClassName('SideNav')[0];
      if (direction == 'down') {
        SideNav.classList.add('is-fixed');
      } else {
        SideNav.classList.remove('is-fixed');
      }
    }
  })

}())