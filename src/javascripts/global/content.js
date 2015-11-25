var app = app || {};

app.content = {

  _cache: {},

  init: function() {
    let pages = Array.from(document.querySelectorAll('[data-path]'));
    for ( let page of pages ) {
      this._cache[page.dataset.path] = page.outerHTML;
    }
  },

  get_page: function(path) {

    return new Promise((resolve, reject)=>{
      if (path in this._cache) {
        //return page from cache
        resolve(this._cache[path]);
      } else {
        //return page from server
        var client = new XMLHttpRequest();
        client.open('GET', `http://remi-shergold.com${path}?content_only=true`);
        client.send();
        self = this;
        client.onload = function(){
          if (this.status == 200) {
            self._cache[path] = this.response;
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };
        client.onerror = function(){
          reject(this.statusText);
        };
      }
    });

  }
}