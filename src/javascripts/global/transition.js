var app = app || {};

app.transition = {

  to: function(new_state) {
    const transition = this._transition_for(app.state.depth, new_state.depth);
    this._do[transition](new_state);
    if (transition != 'home_scroll') {
      app.state = new_state;
      new_state.announce();
    }
  },

  // transitions
  _do: {
    home_scroll: function(new_state) {
      const target = ( new_state.depth ) 
                      ? app.stage.find_page_element_for( new_state.path ) 
                      : document.body;
      app.scroll_to( target );
    },
    post_scroll: function(new_state) {
      console.log('post_scroll');
    },
    fade: function(new_state) {
      app.stage.clear('is-exitingFadingBack');
      app.content.get_page(new_state.path).then(
        (page_html)=> {
          app.stage.add_page(page_html, 'is-enteringFadingForward');
        },
        (error)=> {
          console.log(error);
        }
      );
    },
    back: function(new_state) {
      app.stage.clear('is-exitingStageRight');
      app.content.get_page(new_state.path).then(
        (page_html)=> {
          app.stage.add_page(page_html, 'is-enteringStageLeft');
        },
        (error)=> {
          console.log(error);
        }
      );
    },
    forward: function(new_state) {
      app.stage.clear('is-exitingStageLeft');
      app.content.get_page(new_state.path).then(
        (page_html)=> {
          app.stage.add_page(page_html, 'is-enteringStageRight');
        },
        (error)=> {
          console.log(error);
        }
      );
    }
  },

  // helpers
  _transition_for: function(current_depth, new_depth) {
    let transition_map = {
      0: { 0: 'home_scroll', 1: 'home_scroll', 2: 'forward' },
      1: { 0: 'back', 1: 'fade', 2: 'forward' },
      2: { 0: 'back', 1: 'back', 2: 'post_scroll' }
    }
    return transition_map[current_depth][new_depth];
  }

}
