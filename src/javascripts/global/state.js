class State {

  constructor() {
    this._current_state = {
      active_path: location.pathname,
      depth: this.depth_for(location.pathname),
      pages: []
    }
    let pages = Array.from(document.querySelectorAll('[data-path]'));
    for ( let page of pages ) {
      this._current_state.pages.push(page.dataset.path);
    }
  }

  create_for(path) {
    var state = {
      active_path: path,
      depth: this.depth_for(path),
      pages: [] 
    }
    switch(state.depth) {
    case 0:
      state.pages = ['/projects','/notes','/about'];
      break;
    case 1:
      state.pages = [path];
      break;
    default:
      state.pages = this._current_state.pages;
      state.pages.push(path);
    }
    return state;
  }

  update_to(new_state) {
    this._current_state = new_state;
    window.history.pushState(new_state, "title here", new_state.active_path);

    const event = new CustomEvent('onstatechange', {'detail': new_state});
    document.dispatchEvent(event);
  }

  get depth() {
    return this._current_state.depth;
  }



  // helpers
  depth_for(path) {
    return (path.match(/(\/[^\/]+)/g) || [] ).length
  }

}