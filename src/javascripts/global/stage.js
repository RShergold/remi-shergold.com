var app = app || {};

app.stage = {

  stage_element: document.getElementById('js-stage'),
  pages: {},

  stage_is_clear: false,
  pages_to_append: null,

  init: function() {
    this._update_list_of_pages_on_stage();
  },

  _update_list_of_pages_on_stage: function() {
    this.pages = {};
    const pages = document.querySelectorAll('#js-stage [data-path]');
    for (let i=0; i<pages.length; i++) {
      this.pages[pages[i].dataset.path] = pages[i];
    }
  },

  page_for: function(state) {
    // if on homepage and wanting to scoll to the top, return doc.body
    // if state refers to a page on stage, return that page
    // else return 'undefined'
    return (app.state.is_homepage && state.is_homepage) ? document.body : this.pages[state.path];
  },

  clear: function(transition) {
    app.scroll_manager.destroy_waypoints();
    for (let path in this.pages) {
      this.pages[path].classList.add(transition);
    }
    setTimeout(()=>{
      for (let path in this.pages) {
        this.stage_element.removeChild(this.pages[path]);
        delete this.pages[path];
      }
      this.stage_is_clear = true;
      this._append_pages_when_stage_is_clear();
    },500);

  },

  change_page: function(html, tag_class) {

    const pages = document.createElement('div');
    pages.innerHTML = html;
    for (let i=0; i<pages.children.length; i++) {
      pages.children[i].classList.add(tag_class);
    }
    this._append_pages_when_stage_is_clear(pages.children);
  },

  append_page: function(html) {
    const page_element = document.createElement('div');
    page_element.innerHTML = html;
    this.stage_element.appendChild(page_element.children[0]);
    this._update_list_of_pages_on_stage();
  },

  _append_pages_when_stage_is_clear: function(pages) {

    this.pages_to_append = pages || this.pages_to_append;
    if (this.stage_is_clear && this.pages_to_append) {
      while (this.pages_to_append.length) {
        this.stage_element.appendChild(this.pages_to_append[0]);
      }
      this._update_list_of_pages_on_stage();
      app.scroll_manager.create_waypoints();
      this.pages_to_append = null;
      this.stage_is_clear = false;
    }
  },

  add_status: function(element, position = 0) {
    /*position is where to insert the element
      0 - bottom of stage
      1 - bottom of current post
    */
debugger;

    switch(position) {
    case 1:
        var current_post = this.page_for(app.state),
          left_col = current_post.getElementsByClassName('PostContainer-leftCol')[0]

        left_col.appendChild(element);
        break;
    default:
        this.stage_element.appendChild(element);
}

  }

}




