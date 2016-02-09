/*
  location state machine
  Location is made up of two parts
    window_path - window url
    content_path - url of current content

  some changes to the content_path will trigger
  a change to the window_path
*/

class LocationState {

  constructor(path) {
    this.previous = null
    this.current = new Location(path)
    this.current.window_path = path

    this.observers = []
  }

  observe(call_back) {
    //observe any changes to the location state
    this.observers.push(call_back)
  }

  is_admin_area() {
    let is_admin = /\/new$|\/edit$/.test(this.current.content_path)
    if (this.previous) is_admin = is_admin || /\/new$|\/edit$/.test(this.previous.content_path)
    return is_admin
  }
  

  change_to(path, caller = null) {

    this.next = new Location(path)
    this.next.created_by = caller
    this.next.window_path = this._should_update_window_path() ? path : this.current.window_path

    //shift them all along
    this.previous = this.current
    this.current = this.next
    this.next = null

    
    console.log('previous', this.previous)
    console.log('current', this.current)
    if (this._has_changed()) {
      this._notify_observers()
    }
  }

  moved_to_homepage() {
    return this.previous.window_is_home() === false && this.current.window_is_home()
  }

  moved_away_from_homepage() {
    return this.previous.window_is_home() && this.current.window_is_home() === false
  }

  _should_update_window_path() {

    if (this.current.window_is_home() && this.next.content_is_post() == false) {
      return false
    }

    return true
  }

  _has_changed() {
    return (this.current.window_path !== this.previous.window_path
            || this.current.content_path !== this.previous.content_path)
  }

  _notify_observers() {
    for (const observer of this.observers) {
      observer(this);
    }
  }

}


class Location {
  
  constructor(content_path) {
    this.content_path = content_path
    this.window_path = null
  }

  get section() {
    //get content section
    return this.content_path.replace(/^\/([^\/]*).*$/, '/$1');
  }

  content_is_post() {
    return depth_for(this.content_path) === 2
  }

  window_is_section() {
    return depth_for(this.window_path) == 1
  }

  window_is_home() {
    return this.window_path === '/'
  }
}


//helpers
function depth_for(path) {
  return (path.match(/(\/[^\/]+)/g) || [] ).length;
}

export default LocationState