class State {

  constructor(path, is_home_scroll_event = false) {
    this.path = path;
    this.is_home_scroll_event = is_home_scroll_event;
    this.depth = this.depth_for(path);
    this.is_admin_area = /\/(new|edit)$/.test(path);
  }

  get is_homepage() {
    return !this.depth;
  }

  get is_post() {
    return (this.depth == 2);
  }

  announce() {
    const event = new CustomEvent('onstatechange', {'detail': this});
    document.dispatchEvent(event);
  }

  // helpers
  depth_for(path) {
    return (path.match(/(\/[^\/]+)/g) || [] ).length;
  }

}