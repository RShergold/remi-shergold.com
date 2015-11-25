class State {

  constructor(path, is_home_scroll_event = false) {
    this.path = path;
    this.is_home_scroll_event = is_home_scroll_event
    this.depth = this.depth_for(path);
  }

  // helpers
  depth_for(path) {
    return (path.match(/(\/[^\/]+)/g) || [] ).length;
  }

  announce() {
    const event = new CustomEvent('onstatechange', {'detail': this});
    document.dispatchEvent(event);
  }
}