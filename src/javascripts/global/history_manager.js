var app = app || {};

app.history_manager = {

  init: function() {
    //listen for changes to state
    document.addEventListener('onstatechange',function(e){
      const state = e.detail
      if (!state.is_home_scroll_event && window.location.pathname != state.path) {
        history.pushState(null, "title here", state.path);
      }
    });

    //listen for back/next button
    window.addEventListener('popstate', function(event) {
      app.transition.to( new State(document.location.pathname) );
    });
  },

  is_supported: function() {
    return (history.pushState);
  }
}
