

class Location {

  constructor(path) {
    this.window_path = path
    this.content_path = path
    this.observers = []
  }

  observe(call_back) {
    this.observers.push(call_back)
  }

  get section() {
    //get content section
    return this.content_path.replace(/^\/([^\/]*).*$/, '/$1');
  }

  get depth() {
    //current content depth
    return depth_for(this.content_path)
  }

  get previous_depth() {
    //previous window depth
    return this._previous_window_depth || null
  }

  get is_homepage_banner() {
    return depth_for(this.content_path) === 0
  }

  get is_post() {
    return depth_for(this.content_path) === 3
  }

  change_to(path) {

    if (this.content_path == path) return //path hasn't change

    this._previous_window_depth = depth_for(this.window_path)
    this.content_path = path

    if ( this.transitioned_within_homepage() === false) {
      this.window_path = path;
    }

    this.notify_observers()
  }

  //helpers
  transitioned_within_homepage() {
    const window_is_homepage = (depth_for(this.window_path) === 0)
    return (window_is_homepage && this.is_post === false);
  }

  notify_observers() {
    for (const observer of this.observers) {
      observer(this);
    }
  }

}

//helpers
function depth_for(path) {
  return (path.match(/(\/[^\/]+)/g) || [] ).length;
}

export default Location

