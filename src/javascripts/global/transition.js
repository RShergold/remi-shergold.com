var app = app || {};

app.transition = {

  to: function(new_state) {

    const page_on_stage = app.stage.page_for( new_state );
    if (page_on_stage) {
      app.scroll_to( page_on_stage );
    } else {
      const transition = this._transition_for( new_state );
      if (transition.append_and_scroll) {
        this._append_and_scroll_to( new_state );
      } else {
        this._clear_stage_and_load( new_state, transition );
      }
    }
  },

  _transition_for: function(new_state) {
    const transition_map = {
      0: {
        2: {fade_out_class: 'is-exitingStageLeft', fade_in_class: 'is-enteringStageRight'}
      },
      1: {
        0: {fade_out_class: 'is-exitingStageRight', fade_in_class: 'no-animation'},
        1: {fade_out_class: 'is-exitingFadingBack', fade_in_class: 'is-enteringFadingForward'},
        2: {fade_out_class: 'is-exitingStageLeft', fade_in_class: 'is-enteringStageRight'}
      },
      2: {
        0: {fade_out_class: 'is-exitingStageRight', fade_in_class: 'is-enteringStageLeft'},
        1: {fade_out_class: 'is-exitingStageRight', fade_in_class: 'is-enteringStageLeft'},
        2: {append_and_scroll: true}
      }
    }
    return transition_map[app.state.depth][new_state.depth];
  },

  _clear_stage_and_load: function(new_state, transition) {
    app.stage.clear( transition.fade_out_class );
    app.content.get_page_for(new_state).then(
      (page_html)=> {
        app.state = new_state;
        new_state.announce();
        app.stage.change_page(page_html, transition.fade_in_class);
      },
      (error)=> {
        app.status.error(error);
        console.log(error);
      }
    );
  },

  _append_and_scroll_to: function(new_state) {
    app.content.get_page_for(new_state).then(
      (page_html)=> {
        app.stage.append_page(page_html);
        app.scroll_to( app.stage.page_for( new_state ) );
      },
      (error)=> {
        app.status.error(error);
        console.log(error);
      }
    );
  }

}
