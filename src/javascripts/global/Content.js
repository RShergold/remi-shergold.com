
var cache = {}

function init_content(stage_element) {
  let pages = Array.from(stage_element.querySelectorAll('[data-path]'));
  for ( let page of pages ) {
    cache[page.dataset.path] = page.outerHTML;
  }
}

function get_page_for(location) {
  const path = location.current.content_path

  return new Promise((resolve, reject)=>{
    if (path in cache) {

      //return page from cache
      resolve(cache[path]);
    } else {

      //return page from server
      var client = new XMLHttpRequest();
      client.open('GET', `http://${window.location.host}${path}?content_only=true`);
      client.send();

      client.onload = function(){
        if (this.status == 200) {
          cache[path] = this.response;
          resolve(this.response);
        } else {
          reject(this.statusText);
        }
      };
      client.onerror = function(e){
        reject('The page can not be downloaded. Try refreshing.');
      };
    }
  });
}

export {init_content, get_page_for, }
