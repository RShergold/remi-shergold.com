
import transition_to from './Transition'

var _location = null;

function init(location) {
  _location = location
  document.addEventListener("click", on_click)
}

function on_click(e) {
  e = e ||  window.event
  var element = e.target || e.srcElement

  while(element.parentNode) {
    if (element.tagName == 'A' && element.getAttribute('href')[0] == '/') {
      
      const new_path = element.getAttribute('href')
      _location.change_to(new_path, 'click')

      if (_location.is_admin_area() === false) {
        e.preventDefault()
        transition_to(_location)
      }
      
      break;
    }
    element = element.parentNode
  }
}

export default init
