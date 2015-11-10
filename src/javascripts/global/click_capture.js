
var app = app || {};

app.click_capture = (function(){

  document.onclick = function (e) {
    e = e ||  window.event;
    var element = e.target || e.srcElement;

    while(element.parentNode) {
      if (element.tagName == 'A' && element.getAttribute('href')[0] == '/') {
        var new_path = element.getAttribute('href');
        app.transition_page.to(new_path);
        return false; // prevent default action and stop event propagation
      }
      element = element.parentNode;
    }
  };

}());