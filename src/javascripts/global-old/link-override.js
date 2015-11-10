/*

  THIS IS TEMPORARY

*/

document.onclick = function (e) {
  e = e ||  window.event;
  var element = e.target || e.srcElement;

  while(element.parentNode) {

    if (element.tagName == 'A' && element.getAttribute('href')[0] == '/') {

      get_page(element.href);
      console.log(element.href);
      return false; // prevent default action and stop event propagation
    }


    element = element.parentNode;
  }

};

function get_page(page_url) {

  remove_current_content();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      processAjaxData(xhttp.responseText, page_url);
    }
  }
  xhttp.open('GET', page_url + '?content_only=true', true);
  xhttp.send();
}

 function processAjaxData(response, urlPath){
  var container = document.getElementsByClassName('PageContainer-content')[0];
  container.innerHTML = response;
  container.children[0].classList.add('is-enteringStageRight');
  History.pushState({state:1}, urlPath, urlPath);
 }

function remove_current_content() {
  var container = document.getElementsByClassName('PageContainer-content')[0];
  for (i=0; i < container.children.length; i++) {
    var content_item = container.children[i];
    content_item.classList.add('is-exitingStageLeft');
  }
}

