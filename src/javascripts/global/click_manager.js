var app = app || {};

app.click_manager = {

  init: function() {
    document.addEventListener("click", this.on_click);
  },

  on_click: function(e) {
    e = e ||  window.event;
    var element = e.target || e.srcElement;

    while(element.parentNode) {
      if (element.tagName == 'A' && element.getAttribute('href')[0] == '/') {
        e.preventDefault();
        const path = element.getAttribute('href');
        app.transition.to( new State(path) );
        break;
      }
      element = element.parentNode;
    }
  }

}
